"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;
  
  

  const [predictionCount, setPredictionCount] = useState(0);
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
    <p className="text-3xl font-black">0%</p>
  </div>

  <div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-6">
    <p className="text-neutral-400 text-sm">Trust Score</p>
    <p className="text-3xl font-black">0</p>
  </div>

  <div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-6">
    <p className="text-neutral-400 text-sm">Rank</p>
    <p className="text-3xl font-black">#-</p>
  </div>

</div>
      </div>
    </main>
  );
}