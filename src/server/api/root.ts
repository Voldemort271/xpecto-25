import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { userRouter } from "./routers/user";
import { teamRouter } from "./routers/team";
import { inviteRouter } from "./routers/invite";
import { competitionRouter } from "./routers/competition";
import { proniteRouter } from "./routers/pronite";
import { eventRouter } from "./routers/event";
import { expoRouter } from "./routers/expos";
import { workshopRouter } from "./routers/workshop";
import { sponsorRouter } from "./routers/sponsor";
import { registrationtRouter } from "./routers/registration";
import { ambassadorRouter } from "./routers/ambassador";
import { merchRouter } from "./routers/merch";
import { merchOrderRouter } from "./routers/merchorder";
import { memberRouter } from "./routers/member";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  team: teamRouter,
  invite: inviteRouter,
  user: userRouter,
  competition: competitionRouter,
  pronite: proniteRouter,
  expo: expoRouter,
  workshop: workshopRouter,
  event: eventRouter,
  sponsor: sponsorRouter,
  registration: registrationtRouter,
  ambassador: ambassadorRouter,
  merch: merchRouter,
  merchOrder:merchOrderRouter,
  member: memberRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
