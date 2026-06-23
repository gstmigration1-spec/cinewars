import { Gift, Trophy } from "lucide-react";

export default function ChampionshipBanner() {
  return (
    <section
      id="championship"
      className="mt-4 rounded-2xl border border-[#3a241a] bg-gradient-to-br from-[#120908] via-[#0b0807] to-black p-4"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        
        <div>
          <h2 className="text-lg md:text-2xl font-black uppercase text-white">
            🏆 CineWars Championship
          </h2>

          <p className="mt-1 text-xs md:text-sm text-neutral-400">
            Season 1 LIVE • Predict Box Office • Earn CinePoints
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          
          <div className="flex items-center gap-2 rounded-full border border-[#fbbf24]/20 bg-[#150d0b] px-3 py-2">
            <Gift className="h-4 w-4 text-[#fbbf24]" />
            <span className="text-xs font-bold text-[#fbbf24]">
              Rewards ₹500
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#38bdf8]/20 bg-[#091019] px-3 py-2">
            <Trophy className="h-4 w-4 text-[#38bdf8]" />
            <span className="text-xs font-bold text-[#38bdf8]">
              🟢 LIVE
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
