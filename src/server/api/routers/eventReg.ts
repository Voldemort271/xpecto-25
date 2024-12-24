import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const eventRegRouter = createTRPCRouter({
  // Competition Functions :
  getAllCompetitions: publicProcedure.query(async ({ ctx }) => {
    const competitions = await ctx.db.competition.findMany({
      include: {
        competitionDetails: true,
      },
    });
    return competitions;
  }),

  getCompByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const competition = await ctx.db.competition.findFirst({
        where: {
          competitionDetails: {
            name: input.name,
          },
        },
        include: {
          competitionDetails: true,
        },
      });
      return competition ?? null;
    }),

  registerInCompetition: publicProcedure
    .input(
      z.object({
        teamId: z.string(),
        competitionId: z.string(),
        submissions: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { teamId, competitionId, submissions } = input;
      const competitor = await ctx.db.competitor.create({
        data: {
          team: {
            connect: { id: teamId },
          },
          competition: {
            connect: { id: competitionId },
          },
          submissions: submissions,
        },
        include: {
          team: true,
          competition: true,
        },
      });
      return competitor;
    }),

  teamRegistered: publicProcedure
    .input(z.object({ teamName: z.string(), compId: z.string() }))
    .query(async ({ ctx, input }) => {
      const exists = await ctx.db.competitor.findFirst({
        where: {
          AND: [
            { competitionId: input.compId },
            { team: { name: input.teamName } },
          ],
        },
      });
      if (exists) {
        return true;
      } else {
        return false;
      }
    }),

  // Pronite Functions :
  getAllPronites: publicProcedure.query(async ({ ctx }) => {
    const pronites = await ctx.db.pronite.findMany({
      include: {
        proniteDetails: true,
      },
    });
    return pronites;
  }),

  getProniteByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const pronite = await ctx.db.pronite.findFirst({
        where: {
          proniteDetails: {
            name: input.name,
          },
        },
        include: {
          proniteDetails: true,
        },
      });
      return pronite;
    }),

  registerInPronite: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        proniteId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const proniteReg = await ctx.db.user.update({
        where: {
          id: input.userId,
        },
        data: {
          pronites: {
            connect: { id: input.proniteId },
          },
        },
        include: {
          pronites: true,
        },
      });
      return proniteReg;
    }),

  userInPronite: publicProcedure
    .input(z.object({ email: z.string(), proniteId: z.string() }))
    .query(async ({ ctx, input }) => {
      const exists = await ctx.db.user.findFirst({
        where: {
          email: input.email,
          pronites: {
            some: {
              id: input.proniteId,
            },
          },
        },
      });
      
      if (exists) {
        return true;
      } else {
        return false;
      }
    }),

  // // Event Functions :
  // getAllEvents: publicProcedure.query(async ({ ctx }) => {
  //   const events = await ctx.db.event.findMany({
  //     include: {
  //       eventDetails: true,
  //     },
  //   });
  //   return events;
  // }),

  getEventByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.event.findFirst({
        where: {
          eventDetails: {
            name: input.name,
          },
        },
        include: {
          eventDetails: true,
        },
      });
      return event;
    }),

  registerInEvent: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        eventId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const eventReg = await ctx.db.user.update({
        where: {
          id: input.userId,
        },
        data: {
          events: {
            connect: { id: input.eventId },
          },
        },
        include: {
          events: true,
        },
      });
      return eventReg;
    }),

  userInEvent: publicProcedure
    .input(z.object({ email: z.string(), eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const exists = await ctx.db.user.findFirst({
        where: {
          email: input.email,
          events: {
            some: {
              id: input.eventId,
            },
          },
        },
      });
      if (exists) {
        return true;
      } else {
        return false;
      }
    }),
});
