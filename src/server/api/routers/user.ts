import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getCollFromEmail } from "@/lib/utils";
import cloudinary from "@/lib/cloudinary";
import { createClerkClient } from "@clerk/nextjs/server";
import { env } from "@/env";
import { $Enums } from "@prisma/client";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        contact: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (!existingUser) {
        const csv = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/allUnivs.csv`)
          .then((res) => res.text())
          .catch((err) => {
            console.error("Error fetching allUnivs.csv:", err);
            return "";
          });

        const colName = getCollFromEmail(input.email, csv);
        return ctx.db.user.create({
          data: {
            name: input.name,
            email: input.email,
            college_name: colName,
            contact: input.contact,
            accomodation: colName === "Indian Institute of Technology, Mandi",
          },
        });
      } else {
        return existingUser;
      }
    }),

  updateUser: publicProcedure // You can change to privateProcedure if authentication is required
    .input(
      z.object({
        userId: z.string(),
        contact: z.string().optional(), // Allow optional updates
        college_name: z.string().optional(), // Allow optional updates
        size: z.string().optional(), // Allow optional updates
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, contact, college_name } = input;

      const updatedUser = await ctx.db.user.update({
        where: { id: userId },
        data: {
          contact: contact, // Update contact if provided
          college_name: college_name, // Update college_name if provided
          size: input.size as $Enums.Size,
        },
      });

      return updatedUser;
    }),

  addToClerk: publicProcedure
    .input(z.object({ clerkId: z.string(), dbId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedUser = await clerk.users.updateUser(input.clerkId, {
          externalId: input.dbId,
        });

        return { success: true, updatedUser };
      } catch (error) {
        console.error("Failed to update externalId:", error);
        throw new Error("Failed to update externalId");
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

  searchCompUsers: publicProcedure
    .input(
      z.object({
        query: z.string(),
        invitees: z.string().array(),
        competitionId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const users = await ctx.db.user.findMany({
        where: {
          regEvents: {
            some: {
              event: {
                competition: {
                  id: input.competitionId,
                },
              },
            },
          },
          teams: {
            none: {
              competitionId: input.competitionId,
            },
          },
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
          // Should delete all sent invitations
          await ctx.db.team.update({
            where: { id: teamId },
            data: {
              invitations: {
                deleteMany: {},
              },
            },
          });
          // If there are no team_members left, delete the team
          await ctx.db.team.delete({
            where: { id: teamId },
          });
          return { message: "Team deleted as there are no members left" };
        }
      }

      return team;
    }),

  getUserByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });
      return user;
    }),

  uploadImageToFolder: publicProcedure
    .input(z.object({ base64: z.string(), folderName: z.string() })) // Expect a Base64 image
    .mutation(async ({ input }) => {
      try {
        const result = await cloudinary.uploader.upload(input.base64, {
          folder: input.folderName,
        });

        return {
          success: true,
          publicId: result.public_id,
          url: result.secure_url,
        };
      } catch (error) {
        console.error(error);
        return { success: false, message: "Upload failed" };
      }
    }),

  deleteImage: publicProcedure
    .input(z.object({ publicId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        await cloudinary.uploader.destroy(input.publicId);
        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false, message: "Deletion failed" };
      }
    }),
});
