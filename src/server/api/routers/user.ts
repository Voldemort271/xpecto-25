import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";


export const userRouter = createTRPCRouter({
    createUser: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          clerkId: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const existingUser = await ctx.db.user.findUnique({
          where: { clerkId: input.clerkId },
        });
        console.log(existingUser);
  
        if (!existingUser) {
          return ctx.db.user.create({
            data: {
              name: input.name,
              email: input.email,
              clerkId: input.clerkId,
            },
          });
        } else {
          return existingUser;
        }
      }),
  
    getUserTeams: publicProcedure
      .input(z.object({ userId: z.string() }))
      .query(async ({ ctx, input }) => {
        const userTeams = await ctx.db.user.findUnique({
          where: {
            id: input.userId,
          },
          select: {
            teams: {
              include: {
                leader: true,
                team_members: true,
              },
            },
          },
        });
        return userTeams ? userTeams.teams : [];
      }),
  
    getUserInvites: publicProcedure
      .input(z.object({ userId: z.string() }))
      .query(async ({ ctx, input }) => {
        const userInvites = await ctx.db.user.findUnique({
          where: {
            id: input.userId,
          },
          select: {
            invites: {
              include: {
                team: true,
                user: true,
              },
            },
          },
        });
        return userInvites ? userInvites.invites : [];
      }),
  
    searchUsers: publicProcedure
      .input(z.object({ query: z.string(), invitees: z.string().array() }))
      .query(async ({ ctx, input }) => {
        const users = await ctx.db.user.findMany({
          where: {
            email: {
              contains: input.query,
            },
            id: {
              notIn: input.invitees,
            },
          },
        });
        return users;
      }),
  
  
    deleteUserFromTeam: publicProcedure
      .input(
        z.object({
          teamId: z.string(),
          userId: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { teamId, userId } = input;
  
        // Disconnect the user from team_members
        const team = await ctx.db.team.update({
          where: { id: teamId },
          data: {
            team_members: {
              disconnect: { id: userId },
            },
          },
          include: {
            leader: true,
            team_members: true,
          },
        });
  
        // If the user was the leader, update the leaderId
        if (team.leaderId === userId) {
          if (team.team_members.length > 0) {
            // Set the leaderId to the first person in team_members
            await ctx.db.team.update({
              where: { id: teamId },
              data: {
                leaderId: team.team_members[0]!.id,
              },
            });
          } else {
            // If there are no team_members left, delete the team
            await ctx.db.team.delete({
              where: { id: teamId },
            });
            return { message: "Team deleted as there are no members left" };
          }
        }
  
        return team;
      }),
  });
  