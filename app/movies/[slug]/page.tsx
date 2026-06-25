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
  const [replyText, setReplyText] = useState<Record<string, string>>({});
const [replies, setReplies] = useState<Record<string, any[]>>({});
const [predictionReplies, setPredictionReplies] =
  useState<Record<string, any[]>>({});

const [predictionReplyText, setPredictionReplyText] =
  useState<Record<string, string>>({});
  const [showPredictionReplies, setShowPredictionReplies] =
  useState<Record<string, boolean>>({});
  const [reactionCounts, setReactionCounts] =
  useState<Record<
    string,
    { agree: number; disagree: number }
  >>({});
  const [likedDebates, setLikedDebates] = useState<any>({});
  const [openingPrediction, setOpeningPrediction] = useState("");
  const [communityPredictions, setCommunityPredictions] = useState<any[]>([]);
  const [predictionReactions, setPredictionReactions] = useState<any>({});
const [lifetimePrediction, setLifetimePrediction] = useState("");
const [predictionLoading, setPredictionLoading] = useState(false);
const [showShareButton, setShowShareButton] = useState(false);
const [currentPredictionIds, setCurrentPredictionIds] = useState<string[]>([]);
const [shared, setShared] = useState(false);
const [openingResult, setOpeningResult] = useState<any>(null);
const [openingPredictors, setOpeningPredictors] = useState(0);
const [sharedOpeningValue, setSharedOpeningValue] = useState("");
const [sharedLifetimeValue, setSharedLifetimeValue] = useState("");
const movieSchema = {
  "@context": "https://schema.org",
  "@type": "Movie",
  name: movieTitle,
  url: `https://www.thecinewars.com/movies/${slug}`,
  description: `${movieTitle} box office prediction, opening day collection prediction, lifetime collection prediction and fan debates on CineWars.`,
};

  const fetchDebates = async () => {
    const { data } = await supabase
      .from("movie_debates")
      .select("*")
      .eq("movie_id", slug)
      .order("created_at", { ascending: false });

    if (data) {
  setDebates(data);

  const { data: replyData } = await supabase
    .from("debate_replies")
    .select("*")
    .order("created_at", { ascending: true });

  const groupedReplies: Record<string, any[]> = {};

  (replyData || []).forEach((reply) => {
    if (!groupedReplies[reply.debate_id]) {
      groupedReplies[reply.debate_id] = [];
    }

    groupedReplies[reply.debate_id].push(reply);
  });

  setReplies(groupedReplies);
}
  };
  const fetchReactions = async () => {
  const { data } = await supabase
    .from("debate_reactions")
    .select("*");

  if (!data) return;

  const grouped: any = {};

data.forEach((reaction) => {
  if (!grouped[reaction.debate_id]) {
    grouped[reaction.debate_id] = {
      agree: 0,
      disagree: 0,
    };
  }

  if (reaction.reaction_type === "disagree") {
    grouped[reaction.debate_id].disagree++;
  } else {
    grouped[reaction.debate_id].agree++;
  }
});

setReactionCounts(grouped);
};
const fetchPredictions = async () => {
  const { data: predictions } = await supabase
    .from("movie_predictions")
    .select("*")
    .eq("movie_id", slug);

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username");

  const merged =
    predictions?.map((prediction) => ({
      ...prediction,
      username:
        profiles?.find(
          (p) => p.id === prediction.user_id
        )?.username || "Unknown",
    })) || [];

  setCommunityPredictions(merged);
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
const fetchPredictionReplies = async () => {
  const { data } = await supabase
    .from("prediction_replies")
    .select("*")
    .order("created_at", {
      ascending: true,
    });

  const grouped: Record<string, any[]> = {};

  (data || []).forEach((reply) => {
    if (!grouped[reply.prediction_id]) {
      grouped[reply.prediction_id] = [];
    }

    grouped[reply.prediction_id].push(reply);
  });

  setPredictionReplies(grouped);
};
const fetchPredictionReactions = async () => {
  const { data } = await supabase
    .from("prediction_reactions")
    .select("*");

  if (!data) return;

  const grouped: any = {};

  data.forEach((reaction) => {
    if (!grouped[reaction.prediction_id]) {
      grouped[reaction.prediction_id] = {
        like: 0,
        dislike: 0,
      };
    }

    if (reaction.reaction_type === "dislike") {
      grouped[reaction.prediction_id].dislike++;
    } else {
      grouped[reaction.prediction_id].like++;
    }
  });

  setPredictionReactions(grouped);
  
};
const handlePredictionReaction = async (
  predictionId: string,
  ownerId: string,
  reactionType: "like" | "dislike"
) => {
  let sessionId = localStorage.getItem(
    "cinewars_prediction_session"
  );
  

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    localStorage.setItem(
      "cinewars_prediction_session",
      sessionId
    );
  }

  await supabase
    .from("prediction_reactions")
    .upsert(
      {
        prediction_id: predictionId,
        session_id: sessionId,
        reaction_type: reactionType,
      },
      {
        onConflict: "prediction_id,session_id",
      }
    );
    const {
  data: { user },
} = await supabase.auth.getUser();

if (
  user &&
  ownerId &&
  ownerId !== user.id
) {
  const { data: profile } =
    await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

  await supabase
  .from("notifications")
  .insert([
    {
      user_id: ownerId,
      message:
        reactionType === "like"
          ? `${profile?.username || "Someone"} liked your prediction`
          : `${profile?.username || "Someone"} disliked your prediction`,
      link: `/movies/${slug}`,
    },
  ]);}fetchPredictionReactions();
};
const handlePredictionReplySubmit = async (
  predictionId: string
) => {
  const message =
    predictionReplyText[predictionId]?.trim();

  if (!message) return;

  const {
  data: { user },
} = await supabase.auth.getUser();

const { data: profile } = await supabase
  .from("profiles")
  .select("username")
  .eq("id", user?.id)
  .single();

await supabase
  .from("prediction_replies")
  .insert([
    {
      prediction_id: predictionId,
      username:
        profile?.username || "Anonymous",
      message,
    },
  ]);
  setPredictionReplyText((prev) => ({
    ...prev,
    [predictionId]: "",
  }));

  await fetchPredictionReplies();
};
 useEffect(() => {
  fetchDebates();
fetchReactions();
fetchResults();
fetchPredictions();
fetchPredictionReactions();
fetchPredictionReplies();

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
    table: "prediction_reactions",
  },
  () => {
    fetchPredictionReactions();
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
const handleReplySubmit = async (
  debateId: string
) => {
  const message =
    replyText[debateId]?.trim();

  if (!message) return;

  await supabase
    .from("debate_replies")
    .insert([
      {
        debate_id: debateId,
        username: "Anonymous",
        message,
      },
    ]);

  setReplyText((prev) => ({
    ...prev,
    [debateId]: "",
  }));

  await fetchDebates();
};
const handleReaction = async (
  debateId: string,
  reactionType: "agree" | "disagree"
) => {
  console.log("reaction clicked");
  console.log(debateId, reactionType);
  console.log("BEFORE INSERT");
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
      reaction_type: reactionType,
    },
  ]);

console.log("AFTER INSERT");
console.log("INSERT ERROR:", error);

if (error) {
    // duplicate like ignored
    if (error.code === "23505") {
      return;
    }
await fetchReactions();
    console.log(error);
    return;
  }
setLikedDebates((prev: any) => ({
  ...prev,
  [debateId]: true,
}));
  fetchReactions();
}; const handleSharePrediction = async () => {
  const hashtags = movieTitle
    .split(" ")
    .map((word) => `#${word.replace(/[^a-zA-Z0-9]/g, "")}`)
    .join(" ");

  const shareText = `⚔️ My ${movieTitle} prediction is LOCKED!

🎬 Opening Day: ₹${sharedOpeningValue || "-"} Cr
🎬 Lifetime: ₹${sharedLifetimeValue || "-"} Cr

Think I'm wrong?

Challenge me on CineWars 👇

${hashtags} #BoxOffice #CineWars`;

  const shareUrl = `${window.location.origin}/movies/${slug}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: `${movieTitle} Prediction`,
        text: shareText,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(
        `${shareText}\n\n${shareUrl}`
      );

      alert(
        "Share text copied! Paste it on X, WhatsApp or anywhere you like."
      );
    }

    // Give bonus only once
    for (const id of currentPredictionIds) {
      const { data: prediction } = await supabase
        .from("movie_predictions")
        .select("points, shared_on_x")
        .eq("id", id)
        .single();

      if (prediction && !prediction.shared_on_x) {
        await supabase
          .from("movie_predictions")
          .update({
            shared_on_x: true,
            share_bonus: 10,
            points: (prediction.points || 0) + 10,
          })
          .eq("id", id);
      }
    }

    setShared(true);
    alert("🎉 +10 CinePoints awarded for sharing!");
  } catch (error: any) {
    // User cancelled share
    if (error?.name !== "AbortError") {
      alert("Sharing failed. Please try again.");
    }
  }
};
const handlePredictionSubmit = async () => {
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
  setCurrentPredictionIds([]);
setShared(false);

  try {
    if (openingPrediction) {
  const { data } = await supabase
    .from("movie_predictions")
    .upsert(
      {
        user_id: user.id,
        movie_id: slug,
        prediction_type: "opening_day",
        predicted_value: Number(openingPrediction),
      },
      {
        onConflict: "user_id,movie_id,prediction_type",
      }
    )
    .select();

  if (data?.[0]) {
    setCurrentPredictionIds((prev) => [
      ...prev,
      data[0].id,
    ]);
  }
}

    if (lifetimePrediction) {
  const { data } = await supabase
    .from("movie_predictions")
    .upsert(
      {
        user_id: user.id,
        movie_id: slug,
        prediction_type: "lifetime",
        predicted_value: Number(lifetimePrediction),
      },
      {
        onConflict: "user_id,movie_id,prediction_type",
      }
    )
    .select();

  if (data?.[0]) {
    setCurrentPredictionIds((prev) => [
      ...prev,
      data[0].id,
    ]);
  }
}

    alert("Prediction submitted!");
    setShowShareButton(true);
setSharedOpeningValue(openingPrediction);
setSharedLifetimeValue(lifetimePrediction);
    setOpeningPrediction("");
    setLifetimePrediction("");
  } catch (error) {
    console.error(error);
    alert("Failed to submit prediction");
  }

  setPredictionLoading(false);
}; return (
    <main className="min-h-screen bg-[#050303] text-white px-4 py-10">
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(movieSchema),
  }}
/>

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
<div className="flex gap-3 flex-wrap"></div>
  <button
  
  onClick={handlePredictionSubmit}
  disabled={predictionLoading}
  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition-all duration-300 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-white shadow-md shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {predictionLoading
    ? "Submitting..."
    : "🚀 Submit Prediction"}
</button>
{showShareButton && (
  <button
    onClick={handleSharePrediction}
    disabled={shared}
    className="ml-3 bg-[#120908] border border-[#2d1b18] hover:border-blue-500 transition-all duration-300 px-5 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-blue-400 disabled:opacity-50"
  >
    {shared
      ? "✅ Shared +10 CinePoints"
      : "𝕏 Share & Earn +10"}
  </button>
)}
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
<div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-5">

  <h2 className="text-2xl font-black text-orange-400 mb-4">
    🎯 Community Predictions
  </h2>

  <div className="space-y-3">

    {communityPredictions.length === 0 ? (
      <div className="text-neutral-500">
        No predictions yet.
      </div>
    ) : (
      Object.values(
  communityPredictions.reduce((acc: any, prediction) => {
    if (!acc[prediction.user_id]) {
      acc[prediction.user_id] = {
  user_id: prediction.user_id,
  username: prediction.username,
  openingDay: null,
  lifetime: null,
  openingPredictionId: null,
  lifetimePredictionId: null,
  openingPredictionOwnerId: null,
  lifetimePredictionOwnerId: null,
};
    }

    if (
      prediction.prediction_type ===
      "opening_day"
    ) {
      acc[prediction.user_id].openingDay =
  prediction.predicted_value;

acc[prediction.user_id].openingPredictionId =
  prediction.id;
  acc[prediction.user_id].openingPredictionOwnerId =
  prediction.user_id;
    }

    if (
      prediction.prediction_type ===
      "lifetime"
    ) {
      acc[prediction.user_id].lifetime =
  prediction.predicted_value;

acc[prediction.user_id].lifetimePredictionId =
  prediction.id;
  acc[prediction.user_id].lifetimePredictionOwnerId =
  prediction.user_id;
    }

    return acc;
  }, {})
).map((prediction: any) => (
  <div
    key={prediction.user_id}
    className="border border-[#2d1b18] rounded-xl p-4"
  >
    <Link
      href={`/user/${prediction.username}`}
      className="font-black text-orange-400 hover:underline"
    >
      @{prediction.username}
    </Link>

    <div className="mt-3 space-y-2">

      {prediction.openingDay && (
        <div>
          <div className="text-neutral-400 text-sm">
            Opening Day
          </div>

          <div className="text-xl font-black text-white">
            ₹{prediction.openingDay} Cr
            <div className="flex gap-2 mt-2">

  <button
    onClick={() =>
  handlePredictionReaction(
    prediction.openingPredictionId,
    prediction.openingPredictionOwnerId,
    "like"
  )
}
    className="px-2 py-1 rounded bg-green-500/10 border border-green-500/30 text-green-400 text-xs"
  >
    👍{" "}
    {predictionReactions[
      prediction.openingPredictionId
    ]?.like || 0}
  </button>

  <button
    onClick={() =>
      handlePredictionReaction(
  prediction.openingPredictionId,
  prediction.openingPredictionOwnerId,
  "dislike"
)
    }
    className="px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs"
  >
    👎{" "}
    {predictionReactions[
      prediction.openingPredictionId
    ]?.dislike || 0}
  </button>

</div>
          </div>
        </div>
      )}
      {prediction.lifetime && (
        <div>
          <div className="text-neutral-400 text-sm">
            Lifetime
          </div>

          <div className="text-xl font-black text-white">
            ₹{prediction.lifetime} Cr
            <div className="flex gap-2 mt-2">

  <button
  onClick={() =>
    handlePredictionReaction(
      prediction.lifetimePredictionId,
      prediction.lifetimePredictionOwnerId,
      "like"
    )
  }
    className="px-2 py-1 rounded bg-green-500/10 border border-green-500/30 text-green-400 text-xs"
  >
    👍{" "}
    {predictionReactions[
      prediction.lifetimePredictionId
    ]?.like || 0}
  </button>

  <button
    onClick={() =>
      handlePredictionReaction(
  prediction.lifetimePredictionId,
  prediction.lifetimePredictionOwnerId,
  "dislike"
)
    }
    className="px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs"
  >
    👎{" "}
    {predictionReactions[
      prediction.lifetimePredictionId
    ]?.dislike || 0}
  </button>

</div>
          </div>
        </div>
      )}
      
      <div className="mt-3 space-y-2">
  {(predictionReplies[
    prediction.lifetimePredictionId || prediction.openingPredictionId
  ] || []).map((reply) => (
    <div
      key={reply.id}
      className="ml-2 border-l border-[#38231e] pl-3 text-sm text-neutral-300"
    >
      <div className="text-orange-400 text-xs font-bold">
        @{reply.username}
      </div>

      <div>{reply.message}</div>
    </div>
  ))}

  <div className="flex gap-2">
    <input
      value={
        predictionReplyText[
          prediction.lifetimePredictionId || prediction.openingPredictionId
        ] || ""
      }
      onChange={(e) =>
        setPredictionReplyText((prev) => ({
          ...prev,
          [prediction.lifetimePredictionId || prediction.openingPredictionId]:
            e.target.value,
        }))
      }
      placeholder="Reply to prediction..."
      className="flex-1 bg-black border border-[#38231e] rounded px-3 py-2 text-sm"
    />

    <button
      onClick={() =>
        handlePredictionReplySubmit(
          prediction.lifetimePredictionId || prediction.openingPredictionId
        )
      }
      className="px-3 py-2 rounded bg-orange-600 text-white text-sm font-bold"
    >
      Reply
    </button>
  </div>

</div>

 
      
      
      

    </div>
  </div>
))
    )}

  </div>

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
      ((reactionCounts[b.id]?.agree || 0) +
 (reactionCounts[b.id]?.disagree || 0)) -

((reactionCounts[a.id]?.agree || 0) +
 (reactionCounts[a.id]?.disagree || 0))
  )
  .map((debate) => (

            <div
              key={debate.id}
              className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-4"
            >

              <div className="flex items-center justify-between mb-3">

                
  <Link
  href={`/user/${debate.username}`}
  className="text-xs uppercase tracking-wider text-orange-300 font-black hover:text-orange-200 underline"
>
  @{debate.username}
</Link>


                <span className="text-[10px] text-neutral-500">
                  {new Date(
                    debate.created_at
                  ).toLocaleString()}
                </span>

              </div>

              <p className="text-sm leading-relaxed text-neutral-200">
  {debate.message}
</p>

<div className="mt-4 flex gap-3">

  <button
    onClick={() =>
      handleReaction(debate.id, "agree")
    }
    className="px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-black uppercase"
  >
    👍 Agree ({reactionCounts[debate.id]?.agree || 0})
  </button>

  <button
    onClick={() =>
      handleReaction(debate.id, "disagree")
    }
    className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-black uppercase"
  >
    👎 Disagree ({reactionCounts[debate.id]?.disagree || 0})
  </button>

</div>
<div className="mt-4 space-y-2">
  {(replies[debate.id] || []).map((reply) => (
    <div
      key={reply.id}
      className="ml-4 border-l border-[#38231e] pl-3 text-sm text-neutral-300"
    >
      <div className="text-orange-400 text-xs font-bold">
        @{reply.username}
      </div>
      <div>{reply.message}</div>
    </div>
  ))}

  <div className="flex gap-2 mt-2">
    <input
      value={replyText[debate.id] || ""}
      onChange={(e) =>
        setReplyText((prev) => ({
          ...prev,
          [debate.id]: e.target.value,
        }))
      }
      placeholder="Reply..."
      className="flex-1 bg-black border border-[#38231e] rounded px-3 py-2 text-sm"
    />

    <button
      onClick={() =>
        handleReplySubmit(debate.id)
      }
      className="px-3 py-2 rounded bg-orange-600 text-white text-sm font-bold"
    >
      Reply
    </button>
  </div>
</div>
</div>
          ))}

        </div>

      </div>

    </main>
  );
}
