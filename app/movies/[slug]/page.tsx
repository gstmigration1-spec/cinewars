"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

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

 useEffect(() => {
  fetchDebates();
  fetchReactions();

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

    await supabase.from("movie_debates").insert([
      {
        movie_id: slug,
        username:
  "Fan#" +
  Math.floor(Math.random() * 10000),
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
};  return (
    <main className="min-h-screen bg-[#050303] text-white px-4 py-10">

      <div className="max-w-3xl mx-auto space-y-8">

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
        </div>

        <div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-4 space-y-4">

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
                  {debate.username}
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