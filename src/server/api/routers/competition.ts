import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const competitionRouter = createTRPCRouter({
  createCompetition: publicProcedure
    .input(
      z.object({
        max_team_size: z.number(),
        min_team_size: z.number(),
        prizepool: z.number(),
        begin_time: z.date(),
        end_time: z.date(),
        name: z.string(),
        description: z.string(),
        venue: z.string(),
        levels: z.string(),
        rules: z.string(),
        problem_statement: z.string(),
        regPlans: z
          .object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            price: z.string(),
            labelling: z.string(),
          })
          .array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.competition.create({
        data: {
          competitionDetails: {
            create: {
              begin_time: new Date(input.begin_time),
              end_time: input.end_time,
              name: input.name,
              description: input.description,
              venue: input.venue,
              slug: input.name.toLowerCase().replace(/ /g, "-"),
              cover: "",
              regPlans: {
                createMany: {
                  data: input.regPlans.map((regPlan) => ({
                    name: regPlan.name,
                    description: regPlan.description,
                    price: parseInt(regPlan.price),
                    labelling: regPlan.labelling,
                  })),
                },
              },
            },
          },
          max_team_size: input.max_team_size,
          min_team_size: input.min_team_size,
          createdAt: new Date(),
          prizepool: input.prizepool,
          teams: undefined,
          updatedAt: new Date(),
          // levels: input.levels,
          // problem_statement: input.problem_statement,
          // rules: input.rules,
        },
      });
    }),

  getCompetitions: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.competition.findMany({
      include: {
        competitionDetails: {
          include: { regPlans: true, tags: true },
        },
      },
      orderBy: { 
        competitionDetails:{
          begin_time: "asc" },
        },
    });
  }),

  getCompBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const competition = await ctx.db.competition.findFirst({
        where: {
          competitionDetails: {
            slug: input.slug,
          },
        },
        include: {
          competitionDetails: {
            include: { regPlans: true, tags: true },
          },
        },
      });
      console.log(input.slug);
      return competition ?? null;
    }),
});
