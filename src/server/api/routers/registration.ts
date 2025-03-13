import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  sendPaymentRejectionEmail,
  sendRegistrationConfirmationEmail,
} from "@/lib/email";
import cloudinary from "@/lib/cloudinary";

export const registrationtRouter = createTRPCRouter({
  checkUserRegisteration: publicProcedure
    .input(z.object({ userId: z.string(), eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId, eventId } = input;
      const reg = await ctx.db.registration.findUnique({
        where: {
          userId_eventId: {
            userId: userId,
            eventId: eventId,
          },
        },
        include: {
          plan: true,
        },
      });

      return reg;
    }),

  getUserRegisteredEvents: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const registrations = await ctx.db.registration.findMany({
        where: { userId: input.userId },
        include: { event: true }, // Include event details
      });
      return registrations;
    }),

  getUnverifiedRegistrations: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const acceptableUsers = process.env.ADMINS?.split(", ");

      if (!acceptableUsers?.includes(input)) {
        return [];
      }

      const registrations = await ctx.db.registration.findMany({
        where: {
          verified: false,
        },
        include: {
          plan: true,
          user: true,
          event: true,
        },
      });

      return registrations;
    }),

  verifyRegistration: publicProcedure
    .input(z.object({ registrationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Update the registration record in db to verified & accomodation becomes true if event was universaleve
      // Send registerer an email regarding registration confirmation. Add proper contacts in the email.

      const reg = await ctx.db.registration.update({
        where: {
          id: input.registrationId,
        },
        data: {
          verified: true,
        },
        include: {
          user: true,
          event: true,
        },
      });

      if (reg.eventId === process.env.UNIVERSAL_EVENT_ID) {

        if (reg.planId === 'tier2' || reg.planId === 'tier3') {
          await ctx.db.registration.create({
            data: {
              userId: reg.userId,
              eventId: "cm7zogqkv000c11hs42wvo8ic",
              planId: "cm7zogqkv000d11hsqxw1nwgl",
              paymentId: `sub-${reg.paymentId}`,
              paymentProof: reg.paymentProof,
              verified: true,
            },
          })
        }


        await ctx.db.user.update({
          where: {
            id: reg.userId,
          },
          data: {
            accomodation: true,
          },
        });

        //Updating tier of POC

        const poc = await ctx.db.ambassador.findUnique({
          where: {
            id: reg.user.POCId!,
          },
          include: {
            contingents: true,
          },
        });

        if (poc) {
          const contingentLength = poc.contingents.length;

          let newTier = poc.tier;
          if (contingentLength > 31) {
            newTier = 'gold';
          } else if (contingentLength > 23) {
            newTier = 'silver';
          } else if (contingentLength > 15) {
            newTier = 'bronze';
          }

          if (newTier !== poc.tier) {
            await ctx.db.ambassador.update({
              where: {
                id: poc.id,
              },
              data: {
                tier: newTier,
              },
            });
          }
        }
      }

      await sendRegistrationConfirmationEmail(reg.user.email, reg.event.name);

      return reg;
    }),

  rejectRegistration: publicProcedure
    .input(z.object({ registrationId: z.string(), reason: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Delete the registration record from db
      // Send registerer an email regarding registration cancellation. Take reason as input and add it in the email. Add proper contacts in the email.
      // Delete payment proof from cloudinary

      const reg = await ctx.db.registration.delete({
        where: {
          id: input.registrationId,
        },
        include: {
          user: true,
          event: true,
        },
      });

      if (reg.eventId === process.env.UNIVERSAL_EVENT_ID) {
        await ctx.db.user.update({
          where: {
            id: reg.userId,
          },
          data: {
            POC: {
              disconnect: true,
            },
          },
        });
      }

      await sendPaymentRejectionEmail(reg.user.email, input.reason, reg.event.name);

      await cloudinary.uploader.destroy(reg.paymentProof);

      return reg;
    }),
});
