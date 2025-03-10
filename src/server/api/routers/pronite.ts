import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const proniteRouter = createTRPCRouter({
  createPronite: publicProcedure
    .input(
      z.object({
        max_capacity: z.number(),
        ticket_price: z.number(),
        begin_time: z.date(),
        description: z.string(),
        venue: z.string(),
        end_time: z.null(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const eventDetails = await ctx.db.eventDetails.create({
        data: {
          begin_time: new Date(input.begin_time),
          end_time: new Date(),
          name: input.name,
          description: input.description,
          venue: input.venue,
          slug: input.name.toLowerCase().replace(/ /g, "-"),
          cover: "",
        },
      });
      return ctx.db.pronite.create({
        data: {
          proniteDetailsId: eventDetails.id,
          max_capacity: input.max_capacity,
          ticket_price: input.ticket_price,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }),

  getPronite: publicProcedure.query(async ({ ctx }) => {
    const pronites = await ctx.db.pronite.findMany({
      include: {
        proniteDetails: {
          include: { regPlans: true },
        },
      },
    });
    return pronites;
  }),

  getProniteBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const pronites = await ctx.db.pronite.findFirst({
        where: {
          proniteDetails: {
            slug: input.slug,
          },
        },
        include: {
          proniteDetails: {
            include: { regPlans: true },
          },
        },
      });
      return pronites ?? null;
    }),

    getPastPronites: publicProcedure
    .input(z.object({ date: z.string() }))
    .query(async ({ ctx, input }) => {
      const pastPronites = await ctx.db.pronite.findMany({
        where: {
          proniteDetails: {
            end_time: {
              lte: new Date(input.date),
            },
          },
        },
        include: {
          proniteDetails: {
            include: { regPlans: true },
          },
        },
        orderBy: {
          proniteDetails: {
            end_time: "desc",
          },
        },
      });
      return pastPronites;
    }),

  getUpcomingPronites: publicProcedure
    .input(z.object({ date: z.string() }))
    .query(async ({ ctx, input }) => {
      const upcomingPronites = await ctx.db.pronite.findMany({
        where: {
          proniteDetails: {
            begin_time: {
              gt: new Date(input.date),
            },
          },
        },
        include: {
          proniteDetails: {
            include: { regPlans: true },
          },
        },
        orderBy: {
          proniteDetails: {
            begin_time: "asc",
          },
        },
      });
      return upcomingPronites;
    }),

  getOngoingPronites: publicProcedure
    .input(z.object({ date: z.string() }))
    .query(async ({ ctx, input }) => {
      const ongoingPronites = await ctx.db.pronite.findMany({
        where: {
          proniteDetails: {
            begin_time: {
              lte: new Date(input.date),
            },
            end_time: {
              gte: new Date(input.date),
            },
          },
        },
        include: {
          proniteDetails: {
            include: { regPlans: true },
          },
        },
        orderBy: {
          proniteDetails: {
            begin_time: "desc",
          },
        },
      });
      return ongoingPronites;
    }),
});
