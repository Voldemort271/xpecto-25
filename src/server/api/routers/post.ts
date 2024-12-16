import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import crypto from "crypto";

import fs from "fs";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),

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
              organisations: true,
              competitions: true,
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

  getCollNameFromEmail: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      const csv: string[] = fs
        .readFileSync("../../../../public/allUnivs.csv")
        .toString()
        .split("\n");

      const domains: string[] = [];

      for (const line of csv) {
        const vals: string[] = line.split(",");
        const link: string = vals[vals.length - 3]!; //third last element of each row which is the url

        let domain = "";

        for (const s of link) {
          if (s == '"') {
            continue;
          }
          domain += s;
          domain = domain.trim();
          if (domain == "http://" || domain == "https://" || domain == "www.") {
            domain = "";
          }
        }
        if (domain.includes("/")) {
          domain = domain.slice(0, domain.indexOf("/"));
        }
        if (domain != "") {
          domains.push(domain);
        }
      }

      const n: number = input.indexOf("@") + 1;
      const domain: string = input.slice(n, input.length);
      if (!domains.includes(domain)) {
        return "Individual";
      }
      return domain.split(".")[0];
    }),
});
