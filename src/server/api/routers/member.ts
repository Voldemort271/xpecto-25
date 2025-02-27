import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Org } from "@prisma/client";

export const memberRouter = createTRPCRouter({
  getMembers: publicProcedure.query(async ({ ctx }) => {
    const members = await ctx.db.member.findMany();
    return members;
  }),

  getFirstMemberByOrg: publicProcedure
    .input(z.object({ org: z.nativeEnum(Org).optional() })) 
    .query(async ({ ctx, input }) => {
      const members = await ctx.db.member.findMany();
      const member = await ctx.db.member.findFirst({
        where: {
          org: input.org,
        },
      });
      if (!member) {
        throw new Error("Member not found");
      }

      const index = members.findIndex(m => m.id === member.id);

      return { member, index };

    }),
});
