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
        price: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { verified, paymentId, userId, regPlanId, eventId, POC, price } = input;

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

        if (!verified) await sendPaymentVerifyingEmail(input.email, input.paymentId ?? "free", price);

        return true;
      }
      catch (e) {
        throw new Error("Payment ID already exists");
      }
    }),

  getOfflinePlans: publicProcedure.query(async ({ ctx }) => {
    const event = await ctx.db.eventDetails.findUnique({
      where: { id: "universaleve" },
      include: { regPlans: true },
    });
    return event;
  }),

  searchEvents: publicProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const { query } = input;

      // console.time(`searchEvents:${query}:query`);
      const events = await ctx.db.eventDetails.findMany({
        where: {
          name: {
            contains: query, // Uses GIN trigram index with ILIKE under the hood
            mode: "insensitive", // Case-insensitive search
          },
        },
        select: {
          id: true,
          name: true,
          slug: true,
          competition: { select: { id: true } },
          workshops: { select: { id: true } },
          pronite: { select: { id: true } },
          expos: { select: { id: true } },
        },
        take: 20, // Limit results
      });
      // console.timeEnd(`searchEvents:${query}:query`);

      // console.time(`searchEvents:${query}:mapping`);
      const result = events.map((event) => ({
        id: event.id,
        name: event.name,
        slug: event.slug,
        type: event.competition?.id
          ? "competition"
          : event.workshops?.id
          ? "workshop"
          : event.pronite?.id
          ? "pronite"
          : event.expos?.id
          ? "expos"
          : "event",
      }));
      // console.timeEnd(`searchEvents:${query}:mapping`);

      return result;
    }),
  // Procedure to fetch user's registered events
  getUserRegisteredEvents: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const registrations = await ctx.db.registration.findMany({
        where: { userId },
        select: { eventId: true },
      });

      return registrations;
    }),

  getAllEvents: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.eventDetails.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),
});
