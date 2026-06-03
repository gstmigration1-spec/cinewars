"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;
  
  

 const [predictionCount, setPredictionCount] = useState(0);
const [trustScore, setTrustScore] = useState(0);
const [avgAccuracy, setAvgAccuracy] = useState(0);
const [rank, setRank] = useState<number | null>(null);
  useEffect(() => {
  const loadProfile = async () => {
  const { data: profile, error } = await supabase
  .from("profiles")
  .select("*")
  .ilike("username", username)
  .maybeSingle();



if (!profile) return;

    const { data: predictions, error: predictionError } = await supabase
  .from("movie_predictions")
  .select("*")
  .eq("user_id", profile.id);



setPredictionCount(predictions?.length || 0);
const totalPoints =
  predictions?.reduce(
    (sum, prediction) => sum + (prediction.points || 0),
    0
  ) || 0;

setTrustScore(totalPoints);

const scoredPredictions =
  predictions?.filter(
    (prediction) => prediction.accuracy !== null
  ) || [];

const averageAccuracy =
  scoredPredictions.length > 0
    ? scoredPredictions.reduce(
        (sum, prediction) =>
          sum + Number(prediction.accuracy),
        0
      ) / scoredPredictions.length
    : 0;

setAvgAccuracy(Number(averageAccuracy.toFixed(2)));
const { data: profiles } = await supabase
  .from("profiles")
  .select("*");

if (profiles) {
  const rankings = [];

  for (const p of profiles) {
    const { data: preds } = await supabase
      .from("movie_predictions")
      .select("points")
      .eq("user_id", p.id);

    const total =
      preds?.reduce(
        (sum, row) => sum + (row.points || 0),
        0
      ) || 0;

    rankings.push({
      username: p.username,
      points: total,
    });
  }

  rankings.sort(
    (a, b) => b.points - a.points
  );

  const userRank =
    rankings.findIndex(
      (r) =>
        r.username.toLowerCase() ===
        profile.username.toLowerCase()
    ) + 1;

  setRank(userRank);
}
  };

  loadProfile();
}, [username]);
  

  return (
    <main className="min-h-screen bg-[#050303] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black">
          @{username}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

  <div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-6">
  <p className="text-neutral-400 text-sm">Predictions</p>
  <p className="text-3xl font-black">{predictionCount}</p>
</div>

  <div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-6">
    <p className="text-neutral-400 text-sm">Accuracy</p>
    <p className="text-3xl font-black">
  {avgAccuracy}%
</p>
  </div>

  <div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-6">
    <p className="text-neutral-400 text-sm">Trust Score</p>
    <p className="text-3xl font-black">
  {trustScore}
</p>
  </div>

  <div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-6">
    <p className="text-neutral-400 text-sm">Rank</p>
    <p className="text-3xl font-black">
  #{rank || "-"}
</p>
  </div>

</div>
      </div>
    </main>
  );
}