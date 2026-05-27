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

  useEffect(() => {
    fetchDebates();
  }, []);

  const handlePost = async () => {
    if (!message.trim()) return;

    setLoading(true);

    await supabase.from("movie_debates").insert([
      {
        movie_id: slug,
        username: "Anonymous",
        message,
      },
    ]);

    setMessage("");

    await fetchDebates();

    setLoading(false);
  };

  return (
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

          {debates.map((debate) => (

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

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}