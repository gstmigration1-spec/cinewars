"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
export default function AdminPage() {
  const [movieId, setMovieId] = useState("");
  const [predictionType, setPredictionType] =
    useState("opening_day");
  const [actualValue, setActualValue] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const checkAdmin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    
setCurrentUser(profile);
    setLoading(false);
  };

  checkAdmin();
}, []);
  const saveResult = async () => {
  const { error } = await supabase
  
  
  .from("movie_results")
  .upsert(
    {
      movie_id: movieId,
      prediction_type: predictionType,
      actual_value: Number(actualValue),
    },
    {
      onConflict: "movie_id,prediction_type",
    }
  );
  if (error) {
    alert(error.message);
    return;
  }
  console.log("MOVIE ID:", movieId);
console.log("TYPE:", predictionType);
console.log("ACTUAL:", Number(actualValue));
const { data, error: rpcError } = await supabase.rpc(
  "score_predictions",
  {
    p_movie_id: movieId,
    p_prediction_type: predictionType,
    p_actual_value: Number(actualValue),
  }
);
if (rpcError) {
  alert(rpcError.message);
  console.error(rpcError);
  return;
}

console.log("RPC DATA:", data);
console.log("RPC ERROR:", rpcError);



alert("Result saved successfully");

  setMovieId("");
  setActualValue("");
};
if (loading) {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      Loading...
    </div>
  );
}

if (
  !currentUser ||
  currentUser.username?.toLowerCase() !== "mafiamovie"
) {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-red-500">
        Access Denied
      </h1>
    </div>
  );
}
  return (
    <main className="min-h-screen bg-[#050303] text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-black text-orange-400 mb-8">
          Admin Panel
        </h1>

        <div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-6 space-y-4">

          <input
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            placeholder="Movie ID (e.g. monkey-in-a-cage)"
            className="w-full bg-black/40 border border-[#2d1b18] rounded-xl p-4"
          />

          <select
            value={predictionType}
            onChange={(e) =>
              setPredictionType(e.target.value)
            }
            className="w-full bg-black/40 border border-[#2d1b18] rounded-xl p-4"
          >
            <option value="opening_day">
              Opening Day
            </option>

            <option value="lifetime">
              Lifetime
            </option>
          </select>

          <input
            type="number"
            value={actualValue}
            onChange={(e) =>
              setActualValue(e.target.value)
            }
            placeholder="Actual Collection"
            className="w-full bg-black/40 border border-[#2d1b18] rounded-xl p-4"
          />

          <button
  onClick={saveResult}
  className="bg-orange-500 hover:bg-orange-400 px-6 py-3 rounded-xl font-black uppercase"
>
  Save Result
</button>

        </div>

      </div>
    </main>
  );
}