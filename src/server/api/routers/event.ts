import Razorpay from "razorpay";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import crypto from "crypto";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

export const eventRouter = createTRPCRouter({
  // createOrder: publicProcedure
  //   .input(
  //     z.object({
  //       amount: z.number(), // Amount in INR
  //       currency: z.string().default("INR"),
  //     }),
  //   )
  //   .mutation(async ({ input }) => {
  //     const { amount, currency } = input;

  //     if (amount === 0) {
  //       throw new Error("Amount cannot be zero.");
  //     }

  //     try {
  //       const order = await razorpay.orders.create({
  //         amount: amount * 100, // Convert to paise
  //         currency,
  //       });

  //       return { orderId: order.id };
  //     } catch (error) {
  //       console.error("Error creating Razorpay order:", error);
  //       throw new Error("Failed to create payment order.");
  //     }
  //   }),

  // verifyPayment: publicProcedure
  //   .input(
  //     z.object({
  //       razorpayPaymentId: z.string(),
  //       razorpayOrderId: z.string(),
  //       razorpaySignature: z.string(),
  //     }),
  //   )
  //   .mutation(async ({ input }) => {
  //     const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = input;

  //     const body = `${razorpayOrderId}|${razorpayPaymentId}`;
  //     const expectedSignature = crypto
  //       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
  //       .update(body)
  //       .digest("hex");

  //     if (expectedSignature === razorpaySignature) {
  //       // Payment is valid
  //       return { success: true };
  //     } else {
  //       // Invalid signature
  //       return { success: false };
  //     }
  //   }),

  addUserToEvent: publicProcedure
    .input(
      z.object({
        paymentId: z.string(),
        userId: z.string(),
        regPlanId: z.string(),
        eventId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { paymentId, userId, regPlanId, eventId } = input;

      await ctx.db.user.update({
        where: {
          id: userId,
        },
        data: {
          regEvents: {
            create: {
              paymentId: paymentId,
              plan: {
                connect: {
                  id: regPlanId,
                },
              },
              event: {
                connect: {
                  id: eventId,
                },
              },
            },
          },
        },
      });

      return true;
    }),

  checkUserRegisteration: publicProcedure
    .input(z.object({ userId: z.string(), eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId, eventId } = input;
      const reg = await ctx.db.registration.findUnique({
        where: {
          userId_eventId: {
            userId: userId,
            eventId: eventId,
          },
        },
        include: {
          plan: true,
        }
      });

      return reg;
    }),
});
