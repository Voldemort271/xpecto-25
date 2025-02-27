import { object, z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { sendPaymentVerifyingEmail } from "@/lib/email";
import { $Enums, Size } from "@prisma/client";

export const merchOrderRouter = createTRPCRouter({
  updateMerchOrder : publicProcedure
    .input(
      z.object({
        verified: z.boolean(),
        paymentId: z.string(),
        userId: z.string(),
        merchId: z.string(),
        paymentProof: z.string(),
        price: z.number(),
        quantity: z.number(),
        size: z.string()
      }
    )
)
   
   
    .mutation(async ({ ctx, input }) => {
      const { verified, paymentId,quantity,size, price,merchId } = input;

      try {

        const merch = await ctx.db.merch.findFirst({
            where: {
              id: merchId
              }
            });

        // return await ctx.db.merchOrder.create({
        //   data: {
        //         paymentId: paymentId,
        //         quantity: quantity,
        //         size:size as $Enums.Size,
        //         totalPrice:price,
        //         verified: verified,
        //         paymentProof: input.paymentProof,
        //         merchId:merchId,
        //         userId:input.userId
        //         },
        //       })
        await ctx.db.merch.update({
            where: {
              id: merchId,
            },
            data: {
              orders: {
                create: {
                  paymentId: paymentId,
                  verified: verified,
                  paymentProof: input.paymentProof,
                  quantity: quantity,
                  totalPrice: price,
                  size: size as $Enums.Size,
                  userId:input.userId,
                  },
                },
                stock:(merch?.stock??0)-quantity
              },
          })
        }
          catch (e) {
            throw new Error("Payment ID already exists");
          }
        
        }),

   

  searchEvents: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      const { query } = input;

      // Querying EventDetails with filters on name and description
      const events = await ctx.db.eventDetails.findMany({
        where: {
          OR: [
            {
              name: { contains: query, mode: "insensitive" }, // Filter by event name
            },
            {
              description: { contains: query, mode: "insensitive" }, // Filter by event description
            },
          ],
        },
        include: {
          competition: true,
          expos: true,
          pronite: true,
          regPlans: true,
          sponsors: true,
          workshops: true,
          registrations: true,
        },
      });

      return events;
    }),

  getOfflinePlans: publicProcedure.query(async ({ ctx }) => {
    // Querying EventDetails with filters on name and description
    const event = await ctx.db.eventDetails.findUnique({
      where: {
        id: "universaleve",
      },
      include: {
        regPlans: true,
      },
    });

    return event;
  }),
});
