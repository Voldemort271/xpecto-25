'use client';

import { CircleUser, Trophy, Users, Medal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { api } from '@/trpc/react';
import { useEffect } from 'react';
import { useCurrentUser } from '@/lib/utils';

// Mock data - replace with actual API data
// const leaderboardData = [
//   { id: 1, name: 'Alex Johnson', rank: 1, contingents: 45, college: 'MIT' },
//   { id: 2, name: 'Sarah Williams', rank: 2, contingents: 38, college: 'Stanford' },
//   { id: 3, name: 'Michael Chen', rank: 3, contingents: 32, college: 'Harvard' },
//   { id: 4, name: 'Emma Davis', rank: 4, contingents: 29, college: 'Berkeley' },
//   { id: 5, name: 'James Wilson', rank: 5, contingents: 25, college: 'CalTech' },
// ];




// const currentUser = {
//   name: 'Alex Johnson',
//   rank: 1,
//   contingents: 45,
//   recentContingents: [
//     { name: 'Team Alpha', members: 5, date: '2024-03-20' },
//     { name: 'Tech Innovators', members: 8, date: '2024-03-18' },
//     { name: 'Digital Squad', members: 6, date: '2024-03-15' },
//   ],
// };

export default function  LeaderboardPage() {
  
  
  
  const { data: leaderboardData, isLoading } = api.ambassador.getTopAmbassadors.useQuery();
  const { CurrentUser } = useCurrentUser();

  const { data: ambassador } = api.ambassador.getAmbassador.useQuery({
    userId: CurrentUser?.id ?? "",
  });
  
  useEffect(() => {
    console.log('Leaderboard Data:', leaderboardData);
    console.log('Current User :', CurrentUser);
  }, [leaderboardData, CurrentUser]);

  if (isLoading){
    return <div>Loading...</div>
  }
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-500';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-amber-600';
      default:
        return 'text-slate-700';
    }
  };

  return (
    <div>
      {CurrentUser && CurrentUser.role === "ambassador" ?  (
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 mt-32 lg:mt-24">
              <h1 className="text-5xl font-bold">Campus Ambassador Leaderboard</h1>
              <p className="text-md">
                Track your performance and compete with other ambassadors
              </p>
            </div>
  
            {/* Current User Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 flex items-center space-x-4">
                <Trophy className="w-12 h-12" />
                <div>
                  <p className="text-md font-medium">Your Rank</p>
                  {/* <h2 className="text-3xl font-bold">#{currentUser.rank}</h2> */}
                </div>
              </Card>
  
              <Card className="p-6 flex items-center space-x-4">
                <Users className="w-12 h-12" />
                <div>
                  <p className="text-md font-medium">Total Contingents</p>
                  <h2 className="text-3xl font-bold">{}</h2>
                </div>
              </Card>
  
              <Card className="p-6 flex items-center space-x-4">
                <CircleUser className="w-12 h-12" />
                <div>
                  <p className="text-md font-medium">Ambassador Status</p>
                  <h2 className="text-lg font-semibold">Gold Tier</h2>
                </div>
              </Card>
            </div>
  
            {/* Recent Contingents */}
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-4">Your Recent Contingents</h3>
              <div className="space-y-4">
                {/* {currentUser.recentContingents.map((contingent, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{contingent.name}</h4>
                      <p className="text-sm">
                        {contingent.members} members • {contingent.date}
                      </p>
                    </div>
                    <Users className="w-5 h-5" />
                  </div>
                ))} */}
              </div>
            </Card>
  
            {/* Global Leaderboard */}
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-6">Global Rankings</h3>
              <div className="">
                <table className="w-full">
                  <thead>
                    <tr className="">
                      <th className="p-4 text-left text-lg font-semibold w-20">Rank</th>
                      <th className="p-4 text-left text-lg font-semibold">Ambassador</th>
                      {/* <th className="p-4 text-left text-lg font-semibold hidden sm:block">College</th> */}
                      <th className="p-4 text-right text-lg font-semibold">Contingents</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {leaderboardData && leaderboardData.map((ambassador, index) => (
                      <tr
                        key={ambassador.id}
                        // className={`group transition-colors hover:bg-gray-300 ${
                        //   ambassador.name === currentUser.name ? 'bg-slate-300' : ''
                        // }`}z
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            {index + 1 <= 3 ? (
                              <Medal className={`w-5 h-5 ${getRankColor(index)}`} />
                            ) : null}
                            <span className={`font-medium ${getRankColor(index + 1)}`}>
                              #{index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                              <CircleUser className="w-5 h-5" />
                            </div>
                            <span className="font-medium">{ambassador.token}</span>
                          </div>
                        </td>
                        {/* <td className="py-4 text-muted-foreground hidden sm:block">{ambassador.college}</td> */}
                        <td className="py-4 text-right">
                          <span className="inline-flex items-center gap-1 font-semibold">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            {ambassador.contingents.length}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      ) : (

        <div className='p-48 text-4xl'>
          <p>You are not ambassador. Become an ambassador to see this page.</p>
        </div>
      )
      }
    </div>
  );
}