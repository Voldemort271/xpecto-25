import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

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

  getUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany();
    return users;
  }),

  createTeam: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      console.log("********************************************");
      console.log(input);
      console.log("Inko team me daalna");

      await ctx.db.team.create({
        data: {
          leaderId: input[0]!,
        },
      });
    }),
});
