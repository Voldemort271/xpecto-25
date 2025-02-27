import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const merchRouter = createTRPCRouter({
  getMerch: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.merch.findMany({
        include: {
            
          }
    });
  }),

    
});
