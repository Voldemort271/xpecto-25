import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const workshopRouter = createTRPCRouter({
  createWorkshop: publicProcedure
    .input(
      z.object({
        // max_capacity: z.number(),
        // ticket_price: z.number(),
        begin_time: z.date() ,
        description:z.string(),
        venue:z.string(),
        end_time:z.null(),
        name:z.string(),
        workshopDetails:z.string()
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
        return ctx.db.workshops.create({
          data: {
            workshopDetailsId:eventDetails.id,
            // max_capacity: input.max_capacity,
            // ticket_price: input.ticket_price,
            createdAt: new Date(), 
            updatedAt: new Date(), 
          },
        });
        
      }),
  

    

   getWorkshop: publicProcedure
   
    .query(async ({ ctx }) => {
      const workshop = await ctx.db.workshops.findMany({
      
      
       include:{ workshopDetails:true}
      });
      return workshop;
      
    }),

    getWorkshopBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const workshop = await ctx.db.workshops.findFirst({
        where: {
          workshopDetails: {
            slug: input.slug,
          },
        },
        include: {
          workshopDetails: {
            include: { regPlans: true },
          },
        },
      });
      console.log(input.slug);
      return workshop ?? null;
    }),
  })
 