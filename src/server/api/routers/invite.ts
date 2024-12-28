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

  getUserInvites: publicProcedure
    .input(z.object({ userId: z.string(), comptitionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const invites = await ctx.db.inviteToken.findMany({
        where: {
          userId: input.userId,
          team: {
            competitionId: input.comptitionId,
          },
        },
        include: {
          team: true,
          user: true,
        },
      });

      return invites;
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

      if (!(await ctx.db.inviteToken.findUnique({ where: { token: token } }))) {
        return false;
      }

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

      // // Need to delete all the useless invites of user of a competition one he joins a team in it
      // await ctx.db.inviteToken.deleteMany({
      //   where: {
      //     userId: userId,
      //     team: {
      //       competitionId: team.competitionId,
      //     }
      //   }
      // })

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
