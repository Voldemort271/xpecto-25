import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import crypto from "crypto";

export const teamRouter = createTRPCRouter({
  
    findTeamByName: publicProcedure
      .input(z.object({ name: z.string() }))
      .query(async ({ ctx, input }) => {
        const team = await ctx.db.team.findUnique({
          where: {
            name: input.name,
          },
        });
        return team;
      }),
  
    findTeamByUsers: publicProcedure
      .input(z.object({ users: z.array(z.string()), type: z.string() }))
      .query(async ({ ctx, input }) => {
        const users = input.users;
        let team = await ctx.db.team.findFirst({
          where: {
            AND: [
              { type: input.type },
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
          type: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { leaderId, invitees, name, type } = input;
  
        const team = await ctx.db.team.create({
          data: {
            leaderId: leaderId,
            name: name,
            type: type,
            team_members: {
              connect: [{ id: leaderId }],
            },
            invitations: {
              create: [...invitees].map((invitee) => ({
                token: crypto.randomBytes(32).toString("hex"),
                userId: invitee,
              })),
            },
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
  