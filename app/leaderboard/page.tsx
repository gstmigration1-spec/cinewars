"use client";

import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";

const mockLeaderboard = [
  { rank: 1, username: "CinemaSniper", avatar: "🎯", trustScore: 945, accuracy: 89.4, streak: 7, badge: "Opening Day Oracle", role: "Weekend Sniper", badgeType: "oracle", recentCall: "Coolie ₹65Cr Day 1" },
  { rank: 2, username: "ReviewRaja", avatar: "👑", trustScore: 890, accuracy: 84.1, streak: 4, badge: "Verified Critic Killer", role: "Critic Hunter", badgeType: "critic-killer", recentCall: "King ₹78Cr Call" },
  { rank: 3, username: "TrackerGuru", avatar: "📊", trustScore: 825, accuracy: 79.8, streak: 12, badge: "Data Tracker Elite", role: "Trade Tracker", badgeType: "tracker", recentCall: "Spirit ₹85Cr Pulse" },
  { rank: 4, username: "MassOracle", avatar: "🎬", trustScore: 785, accuracy: 76.2, streak: 3, badge: "Fan Favorite Oracle", role: "Mass Predictor", badgeType: "fan-favorite", recentCall: "Batwara ₹45Cr Call" }
];

const getBadgeStyle = (type: string) => {
  switch (type) {
    case "oracle":
      return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    case "critic-killer":
      return "bg-red-500/10 text-red-400 border-red-500/30";
    case "tracker":
      return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
    case "fan-favorite":
      return "bg-orange-500/10 text-orange-400 border-orange-500/30";
    default:
      return "bg-neutral-800 text-neutral-400 border-neutral-700";
  }
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#050303] text-white p-6">

      <section id="leaderboard" className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-wider flex items-center gap-2 text-white text-display">
              🏆 Global Box Office Accuracy Rankings
            </h2>

            <p className="text-xs text-neutral-500 font-medium">
              Verified leaderboard tracking structural projection accuracy records over time.
            </p>
          </div>

          <button className="hidden sm:flex items-center gap-1 text-xs font-black uppercase tracking-wider text-orange-400 hover:text-orange-300 transition font-bold">
            View All Standings <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="rounded-2xl border border-[#2d1b18] overflow-hidden shadow-2xl bg-neutral-950">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-950 border-b border-[#2d1b18] text-[10px] font-black uppercase tracking-widest text-neutral-500">
                  <th className="p-4 text-center w-16">Rank</th>
                  <th className="p-4">Verified Forecaster</th>
                  <th className="p-4">Calibration Milestone</th>
                  <th className="p-4 text-right">Box Office Accuracy Index</th>
                  <th className="p-4 text-right">Prediction Trust Score</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#2d1b18] text-xs font-medium text-neutral-300">
                {mockLeaderboard.map((user) => (
                  <tr key={user.rank} className="hover:bg-neutral-900/20 transition-colors">

                    <td className="p-4 text-center font-black">
                      {user.rank === 1 ? (
                        <span className="bg-amber-500/10 border border-amber-500/30 rounded-full px-2 py-0.5 text-amber-400 text-[10px]">
                          #1
                        </span>
                      ) : user.rank === 2 ? (
                        <span className="bg-slate-400/10 border border-slate-400/30 rounded-full px-2 py-0.5 text-slate-300 text-[10px]">
                          #2
                        </span>
                      ) : (
                        `#${user.rank}`
                      )}
                    </td>

                    <td className="p-4 font-bold text-white flex items-center space-x-2">
                      <span className="text-lg">{user.avatar}</span>

                      <Link
                        href={`/user/${user.username.toLowerCase()}`}
                        className="hover:text-orange-400 transition"
                      >
                        @{user.username}
                      </Link>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border ${getBadgeStyle(user.badgeType)}`}>
                        {user.badge}
                      </span>
                    </td>

                    <td className="p-4 text-right font-black text-emerald-400 font-mono text-sm">
                      {user.accuracy}%

                      {user.streak > 5 && (
                        <Zap className="inline w-3 h-3 text-orange-500 ml-1" />
                      )}
                    </td>

                    <td className="p-4 text-right font-black text-white font-mono tracking-wide">
                      {user.trustScore}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>
    </div>
  );
}