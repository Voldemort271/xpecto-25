import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  sendMerchConfirmationEmail,
  sendMerchPaymentRejectionEmail,
  sendMerchPaymentVerifyingEmail,
} from "@/lib/email";
import cloudinary from "@/lib/cloudinary";

const merchOrderInput = z.object({
  userId: z.string(),
  merchId: z.string(),
  quantity: z.number().min(1),
  size: z.enum(["S", "M", "L", "XL", "XXL"]), // Validate size
  paymentId: z.string(),
  paymentProof: z.string(),
  eventId: z.string() 
});



export const registrationRouter = createTRPCRouter({
  // Existing procedures...

  createMerchOrder: publicProcedure
    .input(merchOrderInput)
    .mutation(async ({ ctx, input }) => {
      const { userId, merchId, quantity, size, paymentId, paymentProof,eventId } = input;

      // Check if user's profile is complete
      const user = await ctx.db.user.findUnique({
        where: { id: userId },
      });
      
      if (!user?.contact || !size) {
        throw new Error("Please complete your profile (contact and size) before placing a merch order.");
      }

      // Fetch the merch item
      const merch = await ctx.db.merch.findUnique({
        where: { id: merchId },
      });

      if (!merch || merch.stock < quantity) {
        throw new Error("Merch item is out of stock or unavailable.");
      }
      

      const previousOrders = await ctx.db.merchOrder.findMany({
        where: {
          userId,
          merchId,
        },
      }); 

      // Calculate total price with membership discount
      let totalPrice = merch.price * quantity;

      

      async function getMembershipDiscount(eventId: string): Promise<number | null> {
        // Fetch the user's membership details (you may need to adjust this based on your schema)
        const regs = await ctx.db.registration.findMany({
          where: {
            eventId: eventId,
          },
          include: {
            user: true,
            event: true,
          },
        });
        
        const isUniversalEvent = regs.some(r => r.event?.id === process.env.UNIVERSAL_EVENT_ID);
        if (!isUniversalEvent) {
          return null;
        }
        
        
        // Define discount based on membership type
        // have to see the universal_event_id of basic/bronze ,gold and silver plan default:None
        const prices = regs.map((reg) => {
          switch (reg.event?.id) {
            case "bronze":
              return 200;
            default:
              return 500;
          }
        });
        
        const totalDiscount = prices.reduce((acc, price) => acc + price, 0);

        return totalDiscount;
      }
      // Apply membership discount (if applicable)
      if (previousOrders.length === 0) {
        const membershipDiscount = await getMembershipDiscount(eventId);
        if (membershipDiscount) {
          totalPrice -= membershipDiscount;
        }
      }

      // Create the merch order
      const order = await ctx.db.merchOrder.create({
        data: {
          userId,
          merchId,
          quantity,
          size,
          totalPrice,
          paymentId,
          paymentProof,
        },
      });

      // Update merch stock
      await ctx.db.merch.update({
        where: { id: merchId },
        data: { stock: merch.stock - quantity },
      });
      
      await sendMerchPaymentVerifyingEmail(user.email, paymentId,totalPrice);
      return order;
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
  
        // Update merch stock (restore the stock)
        await ctx.db.merch.update({
          where: { id: order.merchId },
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
        await sendMerchPaymentRejectionEmail(order.user.email, reason,order.merch.name);
  
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
        await sendMerchConfirmationEmail(order.user.email, order.merch.name);
  
        return verifiedOrder;
      }),
});

