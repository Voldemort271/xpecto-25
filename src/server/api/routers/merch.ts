import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  sendMerchConfirmationEmail,
  sendMerchPaymentRejectionEmail,
  sendMerchPaymentVerifyingEmail,
} from "@/lib/email";
import type { $Enums } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";

// const merchOrderInput = z.object({
//   userId: z.string(),
//   merchId: z.string(),
//   quantity: z.number().min(1),
//   size: z.enum(["S", "M", "L", "XL", "XXL"]), // Validate size
//   paymentId: z.string(),
//   paymentProof: z.string(),
//   eventId: z.string(),
// });

export const merchRouter = createTRPCRouter({
  getMerch: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.merch.findMany({
      include: {},
    });
  }),

  getUnverifiedMerch: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const acceptableUsers = process.env.ADMINS?.split(", ");

      if (!acceptableUsers?.includes(input)) {
        return [];
      }

      const merch = await ctx.db.merchOrder.findMany({
        where: {
          verified: false,
        },
        include: {
          merch: true,
          user: true,
        },
      });

      return merch;
    }),

  getUserMerchOrders: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const orders = await ctx.db.merchOrder.findMany({
        where: { userId: input.userId },
        include: { merch: true },
      });
      return orders;
    }), //using userMerchOrders to see if the user has previously ordered the merch if orders is empty then give discount otherwise no discount

  getAvailableMerch: publicProcedure.query(async ({ ctx }) => {
    const merch = await ctx.db.merch.findMany({
      where: { stock: { gt: 0 } },
    });
    return merch;
  }),

  rejectMerchOrder: publicProcedure
    .input(z.object({ merchId: z.string(), reason: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { merchId, reason } = input;

      // Fetch the merch order
      const order = await ctx.db.merchOrder.findUnique({
        where: { id: merchId },
        include: { user: true, merch: true },
      });

      if (!order) {
        throw new Error("Order not found.");
      }

      // Delete the order
      await ctx.db.merchOrder.delete({
        where: { id: merchId },
      });

      const merchIds = (order.merch as Array<{ id: string }>).map((m) => m.id);

      // Update merch stock (restore the stock)
      await ctx.db.merch.updateMany({
        where: { id: { in: merchIds } },
        data: { stock: { increment: order.quantity } },
      });

      // Delete payment proof from Cloudinary
      if (order.paymentProof) {
        const publicId = order.paymentProof.split("/").pop()?.split(".")[0]; // Extract public ID from URL
        if (publicId) {
          await cloudinary.uploader.destroy(`payment-proofs/${publicId}`);
        }
      }

      // Send payment rejection email
      await sendMerchPaymentRejectionEmail(
        order.user.email,
        reason,
        `(${(order.merch as Array<{ name: string }>).map((m) => m.name).join(", ")})x${order.quantity}`,
      );

      return { success: true };
    }),

  verifyMerchOrder: publicProcedure
    .input(z.object({ orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { orderId } = input;

      // Fetch the merch order
      const order = await ctx.db.merchOrder.findUnique({
        where: { id: orderId },
        include: { user: true, merch: true },
      });

      if (!order) {
        throw new Error("Order not found.");
      }

      // Verify the order
      const verifiedOrder = await ctx.db.merchOrder.update({
        where: { id: orderId },
        data: { verified: true },
      });

      // Send merch registration confirmation email
      await sendMerchConfirmationEmail(
        order.user.email,
        `(${(order.merch as Array<{ name: string }>).map((m) => m.name).join(", ")})x${order.quantity}`,
      );

      return verifiedOrder;
    }),

  updateMerchOrder: publicProcedure
    .input(
      z.object({
        verified: z.boolean(),
        paymentId: z.string(),
        userId: z.string(),
        merchIds: z.string().array(),
        paymentProof: z.string(),
        price: z.number(),
        quantity: z.number(),
        sizes: z.string().array(),
      }),
    )

    .mutation(async ({ ctx, input }) => {
      const { verified, paymentId, quantity, sizes, price, merchIds } = input;

      try {
        await ctx.db.merch.updateMany({
          where: {
            id: {
              in: merchIds,
            },
          },
          data: {
            stock: {
              decrement: quantity,
            },
          },
        });

        const order = await ctx.db.merchOrder.create({
          data: {
            paymentId: paymentId,
            verified: verified,
            paymentProof: input.paymentProof,
            quantity: quantity,
            totalPrice: price,
            sizes: sizes as $Enums.Size[],
            userId: input.userId,
            merch: {
              connect: merchIds.map((id) => ({ id })),
            },
          },
          include: {
            user: true,
          },
        });
        await sendMerchPaymentVerifyingEmail(
          order.user.email,
          order.paymentId,
          order.totalPrice,
        );
      } catch (e) {
        throw new Error("Payment ID already exists");
      }
    }),

  checkMerchStock: publicProcedure
    .input(
      z.object({
        merchIds: z.string().array(),
        quantity: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { merchIds, quantity } = input;
      const merch = await ctx.db.merch.findMany({
        where: {
          id: {
            in: merchIds,
          },
        },
      });

      const outOfStock = merch
        .filter((m) => m.stock < quantity)
        .map((m) => m.id);

      return {
        outOfStock,
      };
    }),
});
