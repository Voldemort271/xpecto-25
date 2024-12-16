import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const inviteRouter = createTRPCRouter({
    searchInvite: publicProcedure
      .input(z.object({ token: z.string() }))
      .query(async ({ ctx, input }) => {
        console.log(input.token);
        const invite = await ctx.db.inviteToken.findUnique({
          where: {
            token: input.token,
          },
          include: {
            team: true,
            user: true,
          },
        });
  
        if (!invite) {
          throw new Error("Invite not Found");
        }
  
        return invite;
      }),
  
    acceptTeamInvite: publicProcedure
      .input(
        z.object({
          token: z.string(),
          teamId: z.string(),
          userId: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { teamId, userId, token } = input;
  
        const team = await ctx.db.team.update({
          where: { id: teamId },
          data: {
            invitations: {
              delete: {
                token: token,
              },
            },
            team_members: {
              connect: { id: userId },
            },
          },
          include: {
            leader: true,
            team_members: true,
          },
        });
  
        return team;
      }),
  
    deleteTeamInvite: publicProcedure
      .input(
        z.object({
          token: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { token } = input;
  
        const res = await ctx.db.inviteToken.delete({
          where: { token: token },
        });
  
        return res;
      }),
  });
  