import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const expoRouter = createTRPCRouter({
  createExpo: publicProcedure
    .input(
      z.object({
        // max_capacity: z.number(),
        // ticket_price: z.number(),
        begin_time: z.date() ,
        description:z.string(),
        venue:z.string(),
        end_time:z.null(),
        name:z.string(),
        exposDetails:z.string()
      }),
    )
    .mutation(async ({ ctx, input })=> {
        
        const eventDetails=await ctx.db.eventDetails.create({
          data:
          {
            begin_time:new Date(input.begin_time),
            end_time:new Date(),
            name:input.name,
            description:input.description,
            venue:input.venue,
          }

        });
        return ctx.db.expos.create({
          data: {
            exposDetailsId:eventDetails.id,
            // max_capacity: input.max_capacity,
            // ticket_price: input.ticket_price,
            createdAt: new Date(), 
            updatedAt: new Date(), 
            name:input.name
          },
        });
        
      }),
  

    

   getExpo: publicProcedure
   
    .query(async ({ ctx }) => {
      const expo = await ctx.db.expos.findMany({
      
      
       include:{ exposDetails:true}
      });
      return expo;
      
    }),

  getExpoByName: publicProcedure
  .input(z.object({ name: z.string() }))
  .query(async ({ ctx, input }) => {
    const expo = await ctx.db.expos.findFirst({
      where: {
        exposDetails: {
          name: input.name,
        },
      },
      include: {
        exposDetails: {
          include: { regPlans: true },
        },
      },
    });
    console.log(input.name);
    return expo ?? null;
  }),
});
 