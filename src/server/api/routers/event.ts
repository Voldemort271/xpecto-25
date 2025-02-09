import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { sendPaymentVerifyingEmail } from "@/lib/email";

export const eventRouter = createTRPCRouter({
  addUserToEvent: publicProcedure
    .input(
      z.object({
        verified: z.boolean(),
        paymentId: z.string().optional(),
        userId: z.string(),
        regPlanId: z.string(),
        eventId: z.string(),
        paymentProof: z.string(),
        email: z.string(),
        POC: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { verified, paymentId, userId, regPlanId, eventId, POC } = input;

      try {
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
                verified: verified,
                paymentProof: input.paymentProof,
                event: {
                  connect: {
                    id: eventId,
                  },
                },
              },
            },
          },
        });
  
        if (POC) {
          await ctx.db.user.update({
            where: {
              id: userId,
            },
            data: {
              POC: {
                connect: {
                  token: POC,
                },
              },
            },
          });
        }
  
        if (!verified) await sendPaymentVerifyingEmail(input.email);
  
        return true;
      }
      catch (error) {
        console.error("Probably paymentId already exists:", error);
        return false;
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
