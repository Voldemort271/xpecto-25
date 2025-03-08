import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const sponsorRouter = createTRPCRouter({
  getAllEvents: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.eventDetails.findMany();
  }),

  createSponsor: publicProcedure
    .input(
      z.object({
        name: z.string(),
        title: z.string(),
        logo: z.string().optional(),
        website: z.string(),
        // eventIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, logo, title, website } = input;
      return await ctx.db.sponsor.create({
        data: {
          name: name,
          logo: logo ?? "",
          title: title,
          website: website,
          // events: {
          //   connect: eventIds.map((ele) => {
          //     return { id: ele };
          //   }),
          // },
        },
      });
    }),

  getSponsor: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.sponsor.findMany({
        where: {
          id: {
            contains: input.id,
          },
        },
        // include: {
        //   events: true,
        // },
      });
    }),

  getSponsorBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.sponsor.findFirst({
        where: {
          name: {
            equals: input.slug.replaceAll("-", " "),
            mode: "insensitive",
          },
        },
        // include: {
        //   events: true,
        // },
      });
    }),
});
