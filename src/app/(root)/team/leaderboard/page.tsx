"use client";

import { CircleUser, Trophy, Users, Medal } from "lucide-react";
import { Award, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { useCurrentUser } from "@/lib/utils";
import Link from "next/link";

export default function LeaderboardPage() {
  const { data: sortedAmbassadors, isLoading } =
    api.ambassador.getTopAmbassadors.useQuery();
  const { CurrentUser } = useCurrentUser();
  const { data: currentUserAmbassador } = api.ambassador.getAmbassador.useQuery(
    {
      userId: CurrentUser?.id ?? "",
    },
  );

  function getUserRank(userId: string) {
    const rank =
      (sortedAmbassadors?.findIndex((item) => item.userId === userId) ?? -1) +
      1;
    return rank;
  }

  const currentUserRank = getUserRank(CurrentUser?.id ?? "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const RankIcon = ({ rank }: { rank: number }) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-300" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <Star className="h-6 w-6 text-indigo-400" />;
    }
  };

  return (
    <div>
      {CurrentUser ? (
        <div className="bg-[#161616] p-6">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Hero Section */}
            <div className="mt-32 space-y-4 text-center lg:mt-24">
              <h1 className="text-4xl font-bold sm:text-5xl">
                Campus Ambassador Leaderboard
              </h1>
              <p className="text-md">
                Track your performance and compete with other ambassadors
              </p>
            </div>
            {CurrentUser.role !== "ambassador" && (
              <div className="text-center text-lg text-gray-300">
                You are not an ambassador. Become one to compete. <Link href={'/ambassador'} className="underline">Click here to
                become a campus ambassador</Link>
              </div>
            )}
            {/* Current User Stats */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="flex items-center space-x-4 p-6">
                <Trophy className="h-12 w-12" />
                <div>
                  <p className="text-lg font-medium">Your Rank</p>
                  <h2 className="text-3xl font-bold">#{currentUserRank}</h2>
                </div>
              </Card>

              <Card className="flex items-center space-x-4 p-6">
                <Users className="h-12 w-12" />
                <div>
                  <p className="text-lg font-medium">Total Contingents</p>
                  <h2 className="text-3xl font-bold">
                    {currentUserAmbassador?.contingents.length}
                  </h2>
                </div>
              </Card>

              <Card className="flex items-center space-x-4 p-6">
                <CircleUser className="h-12 w-12" />
                <div>
                  <p className="text-lg font-medium">Ambassador Status</p>
                  <h2 className="text-lg font-semibold">
                    {currentUserAmbassador?.tier.toLocaleUpperCase()}
                  </h2>
                </div>
              </Card>
            </div>

            {/* Recent Contingents */}
            {currentUserAmbassador?.contingents &&
            currentUserAmbassador.contingents.length > 0 ? (
              <Card className="p-6">
                <h3 className="mb-4 text-2xl font-semibold">
                  Your Recent Contingents
                </h3>
                <div className="space-y-4">
                  {currentUserAmbassador?.contingents
                    .slice(0, 3)
                    .map((contingent, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg p-4"
                      >
                        <div>
                          <h4 className="font-medium">{contingent.name}</h4>
                          <p className="text-sm">
                            {contingent?.role} members •{" "}
                            {new Date(
                              contingent.createdAt,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <Users className="h-5 w-5" />
                      </div>
                    ))}
                </div>
              </Card>
            ) : (
              <Card className="p-6">
                <p className="text-2xl">
                  Add Contingents to see recent Contingents here.
                </p>
              </Card>
            )}

            {/* Global Leaderboard */}
            <div className="px-3 py-8 sm:px-6 sm:py-12 lg:px-8">
              <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6 flex flex-col items-center justify-center sm:mb-10">
                  <div className="mb-2 flex items-center sm:mb-4">
                    <Users className="mr-2 h-6 w-6 text-indigo-400 sm:mr-3 sm:h-8 sm:w-8" />
                    <h1 className="text-3xl font-bold text-gray-100">
                      Ambassador Rankings
                    </h1>
                  </div>
                </div>

                {/* Top 3 Podium */}
                <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-10 sm:grid-cols-3 sm:gap-4">
                  {sortedAmbassadors?.slice(0, 3).map((ambassador) => {
                    const userAmbassador = ambassador.user;
                    return (
                      <div
                        key={ambassador.id}
                        className={`relative ${
                          getUserRank(ambassador?.userId) === 1
                            ? "sm:order-2 sm:-translate-y-4 sm:transform"
                            : getUserRank(ambassador?.userId) === 2
                              ? "sm:order-1"
                              : "sm:order-3"
                        }`}
                      >
                        <div
                          className={`rounded-xl border bg-gray-800 p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-6 ${
                            CurrentUser.id === ambassador.userId
                              ? "border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                              : "border-gray-700"
                          } `}
                        >
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                            <RankIcon rank={getUserRank(ambassador?.userId)} />
                          </div>
                          <div className="mt-3 text-center">
                            <h3
                              className={`mb-2 text-lg font-semibold sm:text-xl ${
                                CurrentUser.id === ambassador.userId
                                  ? "text-indigo-400"
                                  : "text-gray-100"
                              } `}
                            >
                              {userAmbassador?.name}
                            </h3>
                            <span className="rounded-full border border-gray-600 bg-gray-700 px-3 py-1 text-sm text-gray-300">
                              {ambassador.token}
                            </span>
                            <div className="mt-3 sm:mt-4">
                              <div className="text-2xl font-bold text-indigo-400">
                                {ambassador.contingents.length}
                              </div>
                              <div className="text-sm text-gray-400">
                                Contingents
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Remaining Rankings */}
                <div className="space-y-3 sm:space-y-4">
                  {sortedAmbassadors?.slice(3, 10).map((ambassador) => {
                    const userAmbassador = ambassador.user;
                    return (
                      <div
                        key={ambassador.id}
                        className={`rounded-lg border bg-gray-800 p-4 transition-all duration-200 hover:bg-gray-700/50 ${
                          CurrentUser.id === ambassador.userId
                            ? "border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                            : "border-gray-700"
                        } `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="flex-shrink-0">
                              <span
                                className={`inline-flex h-8 w-8 items-center justify-center rounded-full border sm:h-10 sm:w-10 ${
                                  CurrentUser.id === ambassador.userId
                                    ? "border-indigo-500 bg-indigo-900/50"
                                    : "border-gray-600 bg-gray-700"
                                } `}
                              >
                                <span
                                  className={`text-lg font-semibold ${
                                    CurrentUser.id === ambassador.userId
                                      ? "text-indigo-300"
                                      : "text-gray-300"
                                  } `}
                                >
                                  {getUserRank(ambassador?.userId)}
                                </span>
                              </span>
                            </div>
                            <div>
                              <h3
                                className={`text-base font-medium sm:text-lg ${
                                  CurrentUser.id === ambassador.userId
                                    ? "text-indigo-400"
                                    : "text-gray-100"
                                } `}
                              >
                                {userAmbassador?.name}
                              </h3>
                              <span className="text-sm text-gray-400">
                                {ambassador.token}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-indigo-400 sm:text-xl">
                              {ambassador.contingents.length}
                            </div>
                            <div className="text-sm text-gray-400">
                              Contingents
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-48 text-4xl">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
