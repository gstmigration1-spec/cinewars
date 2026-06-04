"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ArchivePage() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const loadArchive = async () => {
      const { data, error } = await supabase
        .from("movie_results")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(error);
        return;
      }

      const grouped = new Map();

      data?.forEach((row) => {
        if (!grouped.has(row.movie_id)) {
          grouped.set(row.movie_id, {
            movie_id: row.movie_id,
            opening_day: null,
            lifetime: null,
          });
        }

        const movie = grouped.get(row.movie_id);

        if (row.prediction_type === "opening_day") {
          movie.opening_day = row.actual_value;
        }

        if (row.prediction_type === "lifetime") {
          movie.lifetime = row.actual_value;
        }
      });

      setMovies(Array.from(grouped.values()));
    };

    loadArchive();
  }, []);

  return (
    <main className="min-h-screen bg-[#050303] text-white p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-black text-orange-400 mb-8">
          Movie Archive
        </h1>

        {movies.length === 0 ? (
          <div className="text-neutral-500">
            No archived movies yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {movies.map((movie) => (
              <Link
                key={movie.movie_id}
                href={`/archive/${movie.movie_id}`}
                className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-6 hover:border-orange-500 transition"
              >
                <h2 className="text-2xl font-black mb-4">
                  {movie.movie_id
                    .split("-")
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                    )
                    .join(" ")}
                </h2>

                <div className="space-y-2 text-sm">

                  <div>
                    Opening Day:
                    <span className="ml-2 font-bold text-orange-400">
                      {movie.opening_day ?? "-"}
                    </span>
                  </div>

                  <div>
                    Lifetime:
                    <span className="ml-2 font-bold text-orange-400">
                      {movie.lifetime ?? "-"}
                    </span>
                  </div>

                </div>
              </Link>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}