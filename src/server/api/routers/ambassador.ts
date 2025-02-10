import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const ambassadorRouter = createTRPCRouter({
  getAmbassador: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const ambassador = await ctx.db.ambassador.findUnique({
        where: {
          userId: input.userId,
        },
        include: {
          contingents: true,
        },
      });
      return ambassador;
    }),

  acceptAmbassadorInvite: publicProcedure
    .input(z.object({ token: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({
        data: {
          role: "ambassador",
          ambassador: {
            create: {
              token: input.token,
            },
          },
        },
        where: {
          id: input.userId,
        },
      });

      return true;
    }),

  findToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ ctx, input }) => {
      const reg = await ctx.db.ambassador.findUnique({
        where: {
          token: input.token,
        },
      });

      return reg ? true : false;
    }),

  getTopAmbassadors: publicProcedure
    .query(async ({ ctx }) => {
      const ambassadors = await ctx.db.ambassador.findMany({
        include: {
          user: true,
          contingents: true,
        },
      });

      const topAmbassadors = ambassadors
        .sort((a, b) => b.contingents.length - a.contingents.length)

      return topAmbassadors;
    }),
});
