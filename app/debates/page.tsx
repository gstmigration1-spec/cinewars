"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function DebatesPage() {
  const [debates, setDebates] = useState<any[]>([]);
  const [groupedDebates, setGroupedDebates] = useState<any>({});

  useEffect(() => {
    const loadDebates = async () => {
      const { data, error } = await supabase
  .from("movie_debates")
  .select("*")
  .order("created_at", { ascending: false });

const { data: movies } = await supabase
  .from("movies")
  .select("movie_id, title");

const movieMap: any = {};

movies?.forEach((movie) => {
  movieMap[movie.movie_id] = movie.title;

  const slug = movie.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  movieMap[slug] = movie.title;
});
      setDebates(data || []);

const grouped: any = {};

(data || []).forEach((debate: any) => {
  const movieTitle = debate.movie_id
  .split("-")
  .map(
    (word: string) =>
      word.charAt(0).toUpperCase() + word.slice(1)
  )
  .join(" ");
  
  if (!grouped[movieTitle]) {
    grouped[movieTitle] = [];
  }

  grouped[movieTitle].push(debate);
});

setGroupedDebates(grouped);
    };

    loadDebates();
  }, []);

  return (
    <div className="min-h-screen bg-[#050303] text-white p-8">
      <section className="space-y-6">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-wider flex items-center gap-2 text-white text-display">
            💬 Movie Debate Culture Pit
          </h2>

          <p className="text-xs text-neutral-500 font-medium">
            Real community debate comments from CineWars.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(groupedDebates).map(
  ([movieTitle, movieDebates]: any) => (
    <div
      key={movieTitle}
      className="lg:col-span-2 bg-[#0c0807] border border-[#2d1b18] rounded-2xl p-6"
    >
      <Link
  href={`/movies/${movieDebates[0].movie_id}`}
>
  <h3 className="text-2xl font-black text-orange-400 mb-5 hover:text-orange-300 cursor-pointer transition">
    🎬 {movieTitle}
  </h3>
</Link>

      <div className="space-y-4">
        {movieDebates.map((debate: any) => (
          <div
            key={debate.id}
            className="bg-neutral-950 border border-[#38231e] rounded-xl p-4"
          >
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-orange-400">
              <Link href={`/user/${debate.username}`}
  className="text-orange-400 hover:text-orange-300 cursor-pointer underline"
>
  @{debate.username}
</Link>

              <span className="bg-[#0c0807] px-2 py-1 rounded border border-[#2d1b18] text-neutral-400">
                {new Date(
                  debate.created_at
                ).toLocaleDateString()}
              </span>
            </div>

            <p className="mt-3 text-sm text-neutral-300">
              {debate.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
)}       </div>
      </section>
    </div>
  );
}