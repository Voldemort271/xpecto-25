import {  z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
export const competitionRouter = createTRPCRouter({
  createCompetition: publicProcedure
    .input(
      z.object({
        max_team_size: z.number(),
        min_team_size: z.number(),
        organizers: z.any(),
        prizepool: z.number() || 1000,
        sponsors: z.any() || null,
        teams: z.any() || null,
        begin_time: z.date() ,
        end_time:z.date() ,
        name:z.string(),
        description:z.string(),
        venue:z.string(),
        levels:z.string(),
        rules:z.string(),
        problem_statement:z.string()
      }),
    )
    .mutation(async ({ ctx, input })=> {
        
        const eventDetails=await ctx.db.eventDetails.create({
          data:
          {
            begin_time:new Date(input.begin_time),
            end_time:input.end_time,
            name:input.name,
            description:input.description,
            venue:input.venue,
          }

        });
        return ctx.db.competition.create({
          data: {
            competitionDetailsId:eventDetails.id,
            max_team_size: input.max_team_size,
            min_team_size: input.min_team_size,
            createdAt: new Date(),
            organizers:  undefined, 
            prizepool: input.prizepool,
            sponsors: undefined,
            teams: undefined,
            updatedAt: new Date(), 
            levels:input.levels,
            problem_statement:input.problem_statement,
            rules:input.rules

          },
        });
        
      }),
  

    

   getCompetitions: publicProcedure
   
    .query(async ({ ctx }) => {
      const competitions = await ctx.db.competition.findMany({
      
      
       include:{ competitionDetails:true}
      });
      return competitions;
      
    })
  })
 