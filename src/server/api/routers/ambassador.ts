import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const ambassadorRouter = createTRPCRouter({
  getAmbassador: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const ambassador = await ctx.db.ambassador.findFirst({
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
});
