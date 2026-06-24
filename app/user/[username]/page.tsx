"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [recentPredictions, setRecentPredictions] = useState<any[]>([]);
  
  const getBadges = (
  trustScore: number,
  accuracy: number,
  predictionCount: number,
  rank?: number
) => {
  const badges = [];

  if (accuracy >= 90 && predictionCount >= 5)
    badges.push("🎯 Oracle");

  if (trustScore >= 50)
    badges.push("🦈 Box Office Shark");

  if (predictionCount >= 10)
    badges.push("🎬 Veteran");

  if (rank === 1)
    badges.push("👑 Top Predictor");

  if (predictionCount >= 25)
    badges.push("🏆 Prediction Master");

  return badges;
};


 const [predictionCount, setPredictionCount] = useState(0);
const [trustScore, setTrustScore] = useState(0);
const [avgAccuracy, setAvgAccuracy] = useState(0);
const [rank, setRank] = useState<number | null>(null);
const badges = getBadges(
  trustScore,
  avgAccuracy,
  predictionCount,
  rank || undefined
);
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
const totalCinePoints =
  predictions?.reduce(
    (sum, prediction) => sum + (prediction.points || 0),
    0
  ) || 0;

setTrustScore(totalCinePoints);

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
  const scoredPredictions =
  predictions?.filter(
    (p) => p.status === "scored"
  ) || [];

setRecentPredictions(
  scoredPredictions
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 5)
);
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
        <div className="flex flex-wrap gap-2 mt-4">
  {badges.map((badge) => (
    <div
      key={badge}
      className="px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-sm"
    >
      {badge}
    </div>
  ))}
</div>
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
    <p className="text-neutral-400 text-sm">CinePoints</p>
    <p className="text-3xl font-black text-orange-400">
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
<div className="mt-10">
  <h2 className="text-2xl font-black mb-4">
    Recent Scored Predictions
  </h2>

  {recentPredictions.length === 0 ? (
    <div className="text-neutral-500">
      No scored predictions yet.
    </div>
  ) : (
    <div className="grid md:grid-cols-2 gap-4">
      {recentPredictions.map((prediction) => (
        <div
          key={prediction.id}
          className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-5"
        >
          <div className="font-bold text-lg">
            {prediction.movie_id
  .split("-")
  .map(
  (word: string) =>
    word.charAt(0).toUpperCase() +
    word.slice(1)
)
  .join(" ")}
          </div>

          <div className="text-neutral-400 text-sm mb-3">
            {prediction.prediction_type === "opening_day"
  ? "Opening Day"
  : "Lifetime"}
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4">
            <div>
              <div className="text-neutral-500 text-xs">
                Predicted
              </div>
              <div>{prediction.predicted_value}</div>
            </div>

            <div>
              <div className="text-neutral-500 text-xs">
                Actual
              </div>
              <div>{prediction.actual_value}</div>
            </div>

            <div>
              <div className="text-neutral-500 text-xs">
                Accuracy
              </div>
              <div>{prediction.accuracy}%</div>
            </div>

            <div>
              <div className="text-neutral-500 text-xs">
                CinePoints
              </div>
              <div>{prediction.points}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
      </div>
    </main>
  );
}