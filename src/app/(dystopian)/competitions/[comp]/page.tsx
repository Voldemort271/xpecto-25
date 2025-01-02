"use client";

import CompetitionDetailsBox from "@/components/(dystopian)/(competitions)/competition-details-box";
import CompTeamBox from "@/components/(dystopian)/(competitions)/competition-team-box";

import { useCurrentUser } from "@/lib/utils";
import { api } from "@/trpc/react";
import React, { use } from "react";
import { motion } from "motion/react";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";

const Page = ({ params }: { params: Promise<{ comp: string }> }) => {
  const { CurrentUser } = useCurrentUser();

  const compName = use(params).comp.replaceAll("%20", " ");
  const { data: comp } = api.competition.getCompByName.useQuery({
    name: compName,
  });
  const { data: plan } = api.event.checkUserRegisteration.useQuery(
    {
      userId: CurrentUser?.id ?? "",
      eventId: comp?.competitionDetailsId ?? "",
    },
    {
      enabled: !!CurrentUser && !!comp,
    },
  );
  const { data: regTeam } = api.team.findTeamOfUser.useQuery(
    {
      userId: CurrentUser?.id ?? "",
      competitionId: comp?.id ?? "",
    },
    {
      enabled: !!CurrentUser && !!comp,
    },
  );

  const regStatus = !!plan;

  return (
    <>
      {comp && (
        <div className="flex w-screen flex-col items-center justify-center gap-12 p-12 xl:flex-row">
          <CompetitionDetailsBox
            comp={comp}
            regStatus={regStatus}
            regTeam={regTeam}
          />
          {regStatus && <CompTeamBox regTeam={regTeam} comp={comp} />}
        </div>
      )}

      <motion.div
        className={`flex h-16 w-full flex-row items-center overflow-hidden border-t-2 border-amber-50 bg-neutral-900 text-4xl font-normal uppercase text-amber-50`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="flex h-full w-full cursor-none flex-col items-center justify-center"
          initial={{ translateY: -50, opacity: 0 }}
          whileInView={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.125 }}
        >
          <MarqueeContainer
            text={[
              "you have reached the end",
              "that's all we have for now",
              "you have reached the end",
              "that's all we have for now",
            ]}
            delay={1}
          />
        </motion.span>
      </motion.div>
    </>
  );
};

export default Page;
