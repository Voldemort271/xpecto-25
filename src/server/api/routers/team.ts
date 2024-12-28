import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import crypto from "crypto";
import { error } from "console";

export const teamRouter = createTRPCRouter({
  findTeamByNameComp: publicProcedure
    .input(z.object({ name: z.string(), competitionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const team = await ctx.db.team.findUnique({
        where: {
          name_competitionId: {
            name: input.name,
            competitionId: input.competitionId,
          },
        },
        include: {
          leader: true,
          team_members: true,
          invitations: true,
        },
      });
      return team;
    }),

  findTeamOfUser: publicProcedure
    .input(z.object({ userId: z.string(), competitionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const team = await ctx.db.team.findFirst({
        where: {
          competitionId: input.competitionId,
          team_members: { some: { id: input.userId } },
        },
        include: {
          leader: true,
          team_members: true,
          invitations: true,
        },
      });
      return team;
    }),

  findTeamByUsers: publicProcedure
    .input(z.object({ users: z.array(z.string()), competitionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const users = input.users;
      let team = await ctx.db.team.findFirst({
        where: {
          AND: [
            { competitionId: input.competitionId },
            ...users.map((userId) => ({
              OR: [
                { team_members: { some: { id: userId } } },
                { invitations: { some: { userId: userId } } },
              ],
            })),
          ],
        },
        include: {
          leader: true,
          team_members: true,
          invitations: true,
        },
      });
      if (
        (team ? team.team_members.length : 0) +
          (team ? team?.invitations.length : 0) !==
        users.length
      ) {
        team = null;
      }
      return team;
    }),

  createTeam: publicProcedure
    .input(
      z.object({
        leaderId: z.string(),
        invitees: z.array(z.string()),
        name: z.string().min(1),
        compeitionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { leaderId, invitees, name, compeitionId } = input;

      const team = await ctx.db.team.create({
        data: {
          competitionId: compeitionId,
          leaderId: leaderId,
          name: name,
          team_members: {
            connect: [{ id: leaderId }],
          },
          invitations: {
            create: invitees.map((invitee) => ({
              token: crypto.randomBytes(32).toString("hex"),
              userId: invitee,
            })),
          },
          submissions: "",
        },
        include: {
          leader: true,
          invitations: {
            include: {
              user: true,
            },
          },
        },
      });

      return team;
    }),

  sendTeamInvites: publicProcedure
    .input(
      z.object({
        teamId: z.string(),
        invitees: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { teamId, invitees } = input;
      if (teamId === "") {
        return error("Team not found");
      }
      const team = await ctx.db.team.update({
        where: {
          id: teamId,
        },
        data: {
          invitations: {
            create: invitees.map((invitee) => ({
              token: crypto.randomBytes(32).toString("hex"),
              userId: invitee,
            })),
          },
          submissions: "",
        },
        include: {
          leader: true,
          invitations: {
            include: {
              user: true,
            },
          },
        },
      });

      return team;
    }),
});
