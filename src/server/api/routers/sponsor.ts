import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const sponsorRouter = createTRPCRouter({
  getAllEvents: publicProcedure.query(async ({ ctx }) => {
    const allEvents = await ctx.db.eventDetails.findMany();
    return allEvents;
  }),

  createSponsor: publicProcedure
    .input(
      z.object({
        name: z.string(),
        logo: z.string(),
        eventIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, logo, eventIds } = input;
      const sponser = await ctx.db.sponsor.create({
        data: {
          name: name,
          logo: logo,
          tier: "",
          events: {
            connect: eventIds.map((ele) => {
              return { id: ele };
            }),
          },
        },
      });
      return sponser;
    }),

  getSponsor: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const sponser = await ctx.db.sponsor.findMany({
        where: {
          id: {
            contains: input.id,
          },
        },
        include: {
          events: true,
        },
      });
      return sponser;
    }),

  getSponsorBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const sponser = await ctx.db.sponsor.findFirst({
        where: {
          name: {
            equals: input.slug.replaceAll("-", " "),
            mode: "insensitive",
          },
        },
        include: {
          events: true,
        },
      });
      return sponser;
    }),
});
