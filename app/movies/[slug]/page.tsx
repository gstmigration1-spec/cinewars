"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function MovieDebatePage() {
  const params = useParams();

  const slug = params.slug as string;

  const movieTitle = slug
    .split("-")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  const [message, setMessage] = useState("");
  const [debates, setDebates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [reactionCounts, setReactionCounts] = useState<any>({});
  const [likedDebates, setLikedDebates] = useState<any>({});
  const [openingPrediction, setOpeningPrediction] = useState("");
const [lifetimePrediction, setLifetimePrediction] = useState("");
const [predictionLoading, setPredictionLoading] = useState(false);
const [openingResult, setOpeningResult] = useState<any>(null);
const [openingPredictors, setOpeningPredictors] = useState(0);

  const fetchDebates = async () => {
    const { data } = await supabase
      .from("movie_debates")
      .select("*")
      .eq("movie_id", slug)
      .order("created_at", { ascending: false });

    if (data) {
      setDebates(data);
    }
  };
  const fetchReactions = async () => {
  const { data } = await supabase
    .from("debate_reactions")
    .select("*");

  if (!data) return;

  const grouped: any = {};

  data.forEach((reaction) => {
    grouped[reaction.debate_id] =
      (grouped[reaction.debate_id] || 0) + 1;
  });

  setReactionCounts(grouped);
};
const fetchResults = async () => {
  const { data: result } = await supabase
    .from("movie_results")
    .select("*")
    .eq("movie_id", slug)
    .eq("prediction_type", "opening_day")
    .maybeSingle();

  setOpeningResult(result);

  const { count } = await supabase
    .from("movie_predictions")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("movie_id", slug)
    .eq("prediction_type", "opening_day");

  setOpeningPredictors(count || 0);
};
 useEffect(() => {
  fetchDebates();
fetchReactions();
fetchResults();
  const channel = supabase
  .channel("movie-debates-realtime")

  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "movie_debates",
      filter: `movie_id=eq.${slug}`,
    },
    () => {
      fetchDebates();
    }
  )

  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "debate_reactions",
    },
    () => {
      fetchReactions();
    }
  )

.on(
  "postgres_changes",
  {
    event: "*",
    schema: "public",
    table: "debate_reactions",
  },
  () => {
    fetchReactions();
  }
)

    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };

}, []);

  const handlePost = async () => {
  if (!message.trim()) return;

  setLoading(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login to post a debate");
    setLoading(false);
    return;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  await supabase.from("movie_debates").insert([
    {
      movie_id: slug,
      username: profile?.username || "Anonymous",
      message,
    },
  ]);

  setMessage("");

  await fetchDebates();

  setLoading(false);
};
const handleReaction = async (debateId: string) => {
  console.log("reaction clicked");
  if (likedDebates[debateId]) return;

  let sessionId =
    localStorage.getItem("cinewars_reaction_session");

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    localStorage.setItem(
      "cinewars_reaction_session",
      sessionId
    );
  }

  const { error } = await supabase
    .from("debate_reactions")
    .insert([
      {
        debate_id: debateId,
        session_id: sessionId,
      },
    ]);

  if (error) {
    // duplicate like ignored
    if (error.code === "23505") {
      return;
    }

    console.log(error);
    return;
  }
setLikedDebates((prev: any) => ({
  ...prev,
  [debateId]: true,
}));
  fetchReactions();
}; const handlePredictionSubmit = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login to submit predictions");
    return;
  }

  if (!openingPrediction && !lifetimePrediction) {
    alert("Enter at least one prediction");
    return;
  }

  setPredictionLoading(true);

  try {
    if (openingPrediction) {
      await supabase
  .from("movie_predictions")
  .update({
    predicted_value: Number(openingPrediction),
  })
  .eq("user_id", user.id)
  .eq("movie_id", slug)
  .eq("prediction_type", "opening_day");
    }

    if (lifetimePrediction) {
      await supabase.from("movie_predictions").upsert(
  {
    user_id: user.id,
    movie_id: slug,
    prediction_type: "lifetime",
    predicted_value: Number(lifetimePrediction),
  },
  {
    onConflict: "user_id,movie_id,prediction_type",
  }
);
    }

    alert("Prediction submitted!");

    setOpeningPrediction("");
    setLifetimePrediction("");
  } catch (error) {
    console.error(error);
    alert("Failed to submit prediction");
  }

  setPredictionLoading(false);
}; return (
    <main className="min-h-screen bg-[#050303] text-white px-4 py-10">

  <div className="max-w-3xl mx-auto space-y-8">

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[#2d1b18] bg-[#120908] text-sm font-black text-orange-400 hover:border-orange-500/40 hover:bg-[#1a0f0d] transition-all"
      >
        ← Back to CineWars
      </Link>

      <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-orange-400 font-black">
              CineWars Debate Arena
            </p>

          <h1 className="text-4xl md:text-6xl font-black uppercase leading-none">
            {movieTitle}
          </h1>

          <p className="text-neutral-400 max-w-xl">
            Fans are actively debating this movie’s hype,
            box office potential, and trailer impact.
          </p>
          {openingResult && (
  <div className="bg-[#120908] border border-green-700 rounded-2xl p-5 mt-6">
    <div className="text-green-400 font-black uppercase text-sm mb-2">
      Official Opening Day Result
    </div>

    <div className="text-4xl font-black">
      ₹{openingResult.actual_value} Cr
    </div>

    <div className="text-neutral-400 mt-2">
      {openingPredictors} Predictors
    </div>
  </div>
)}
        </div>

        <div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-4 space-y-4">
<div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-4 space-y-4">

  <h2 className="text-2xl font-black uppercase text-orange-400 text-center">
  🎯 Box Office Predictions
</h2>

  <input
    type="number"
    value={openingPrediction}
    onChange={(e) => setOpeningPrediction(e.target.value)}
    placeholder="Opening Day Collection (Cr)"
    className="w-full bg-black/40 border border-[#2d1b18] rounded-xl p-4 outline-none text-sm"
  />

  <input
    type="number"
    value={lifetimePrediction}
    onChange={(e) => setLifetimePrediction(e.target.value)}
    placeholder="Lifetime Collection (Cr)"
    className="w-full bg-black/40 border border-[#2d1b18] rounded-xl p-4 outline-none text-sm"
  />

  <button
  onClick={handlePredictionSubmit}
  disabled={predictionLoading}
  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition-all duration-300 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white shadow-md shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {predictionLoading
    ? "Submitting..."
    : "🚀 Submit Prediction"}
</button>

</div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Drop your take..."
            className="w-full bg-black/40 border border-[#2d1b18] rounded-xl p-4 outline-none resize-none h-28 text-sm"
          />

          <button
            onClick={handlePost}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-400 transition-colors px-5 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white"
          >
            {loading ? "Posting..." : "Post Take"}
          </button>

        </div>

        <div className="space-y-4">

          {debates.length === 0 && (
            <div className="text-neutral-500 text-sm border border-dashed border-[#2d1b18] rounded-xl p-6 text-center">
              No debates yet. Start the first fan war.
            </div>
          )}

          {[...debates]
  .sort(
    (a, b) =>
      (reactionCounts[b.id] || 0) -
      (reactionCounts[a.id] || 0)
  )
  .map((debate) => (

            <div
              key={debate.id}
              className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-4"
            >

              <div className="flex items-center justify-between mb-3">

                <span className="text-xs uppercase tracking-wider text-orange-300 font-black">
                  @{debate.username}
                </span>

                <span className="text-[10px] text-neutral-500">
                  {new Date(
                    debate.created_at
                  ).toLocaleString()}
                </span>

              </div>

              <p className="text-sm leading-relaxed text-neutral-200">
  {debate.message}
</p>

<div
  onClick={() => handleReaction(debate.id)}
  className="mt-4 text-xs font-black uppercase tracking-wider text-orange-300 hover:text-orange-200 transition-colors cursor-pointer"
>
  👍 Support Take ({reactionCounts[debate.id] || 0})
</div>

</div>
          ))}

        </div>

      </div>

    </main>
  );
}