import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const expoRouter = createTRPCRouter({
  createExpo: publicProcedure
    .input(
      z.object({
        begin_time: z.date(),
        description: z.string(),
        venue: z.string(),
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
      return ctx.db.expos.create({
        data: {
          exposDetailsId: eventDetails.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }),

  getExpo: publicProcedure.query(async ({ ctx }) => {
    const expo = await ctx.db.expos.findMany({
      include: { exposDetails: { include: { regPlans: true } } },
    });
    return expo;
  }),

  getExpoBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const expo = await ctx.db.expos.findFirst({
        where: {
          exposDetails: {
            slug: input.slug,
          },
        },
        include: {
          exposDetails: {
            include: { regPlans: true },
          },
        },
      });
      return expo ?? null;
    }),
});
