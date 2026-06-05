"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MessageCircle } from "lucide-react";

export default function DebatesPage() {
  const [debates, setDebates] = useState<any[]>([]);

  useEffect(() => {
    const loadDebates = async () => {
      const { data } = await supabase
        .from("movie_debates")
        .select("*")
        .order("created_at", { ascending: false });

      setDebates(data || []);
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
          {debates.map((debate) => (
            <div
              key={debate.id}
              className="bg-neutral-950 border border-[#38231e] rounded-2xl p-5 space-y-4 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 opacity-25 text-neutral-800">
                <MessageCircle className="w-16 h-16" />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-orange-400">
                  <span>{debate.movie_id}</span>

                  <span className="bg-[#0c0807] px-2 py-1 rounded border border-[#2d1b18] text-neutral-400">
                    {new Date(
                      debate.created_at
                    ).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-black text-white">
                  @{debate.username}
                </h3>
              </div>

              <div className="bg-[#0a0605]/90 border border-[#2d1b18] rounded-xl p-4 border-l-2 border-l-[#e63917]">
                <p className="text-sm text-neutral-300">
                  {debate.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}