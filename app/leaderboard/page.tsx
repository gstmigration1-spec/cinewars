"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type LeaderboardUser = {
  username: string;
  trustScore: number;
  accuracy: number;
  predictionCount: number;
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] =
    useState<LeaderboardUser[]>([]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*");

      if (!profiles) return;

      const leaderboardData: LeaderboardUser[] = [];

      for (const profile of profiles) {
        const { data: predictions } = await supabase
          .from("movie_predictions")
.select("points, accuracy")
.eq("user_id", profile.id);
        const trustScore =
          predictions?.reduce(
            (sum, p) => sum + (p.points || 0),
            0
          ) || 0;

        const scoredPredictions =
  predictions?.filter(
    (p) => p.accuracy !== null
  ) || [];

const accuracy =
  scoredPredictions.length > 0
    ? scoredPredictions.reduce(
        (sum, p) => sum + Number(p.accuracy),
        0
      ) / scoredPredictions.length
    : 0;

leaderboardData.push({
  username: profile.username,
  trustScore,
  accuracy: Number(accuracy.toFixed(2)),
  predictionCount: predictions?.length || 0,
});
      }

      leaderboardData.sort(
        (a, b) => b.trustScore - a.trustScore
      );

      setLeaderboard(leaderboardData);
    };

    loadLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl font-black text-orange-500 mb-8">
  CineWars Leaderboard
</h1>

      {leaderboard.map((user, index) => (
        <div
  key={user.username}
  className={`mb-4 rounded-2xl border p-5 transition-all ${
    index === 0
      ? "border-yellow-500 bg-yellow-500/10"
      : index === 1
      ? "border-neutral-400 bg-neutral-400/10"
      : index === 2
      ? "border-orange-700 bg-orange-700/10"
      : "border-[#2d1b18] bg-[#120908]"
  }`}
>
          <div className="flex justify-between items-center">
  <div>
    <Link
  href={`/user/${user.username}`}
  className="font-black text-lg hover:text-orange-400"
>
  {index === 0
    ? "#1"
    : index === 1
    ? "#2"
    : index === 2
    ? "#3"
    : `#${index + 1}`}

  {" "}@{user.username}
</Link>

    <div className="text-sm text-neutral-400">
      {user.predictionCount} Predictions
    </div>
  </div>

  <div className="text-right">
    <div className="text-2xl font-black text-orange-400">
  {user.trustScore} Pts
</div>

    <div className="text-sm text-neutral-400">
      {user.accuracy}%
    </div>
  </div>
</div>
        </div>
      ))}
    </div>
  );
}