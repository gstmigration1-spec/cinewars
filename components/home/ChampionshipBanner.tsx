import { Gift, Trophy } from "lucide-react";

export default function ChampionshipBanner() {
  return (
    <section
      id="championship"
      className="mt-6 rounded-3xl border border-[#3a241a] bg-gradient-to-br from-[#120908] via-[#0b0807] to-black p-4 md:p-5"
    >

      <div className="text-center">
        <h2 className="text-xl md:text-3xl font-black uppercase text-white">
          🏆 CineWars Championship
        </h2>

        <p className="mt-1 text-xs md:text-sm text-neutral-400">
          Season 1 is LIVE. Predict the biggest movies and climb the ultimate box office leaderboard.
        </p>
      </div>


      {/* Reward + Status */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">

        <div className="rounded-2xl border border-[#fbbf24]/20 bg-[#150d0b] p-5 text-center">

          <Gift className="mx-auto h-8 w-8 text-[#fbbf24]" />

          <h3 className="mt-3 text-sm font-black uppercase text-[#fbbf24]">
            Season Rewards
          </h3>

          <p className="mt-2 text-lg font-bold text-white">
            PVR Vouchers up to ₹500
          </p>

        </div>


        <div className="rounded-2xl border border-[#38bdf8]/20 bg-[#091019] p-4 text-center">

          <Trophy className="mx-auto h-8 w-8 text-[#38bdf8]" />

          <h3 className="mt-3 text-sm font-black uppercase text-[#38bdf8]">
            Championship Status
          </h3>

          <p className="mt-2 text-lg font-bold text-white">
            🟢 LIVE
          </p>

          <p className="text-xs text-neutral-400 mt-2">
            Ends after final box office results of all championship movies.
          </p>

        </div>

      </div>


      

    </section>
  );
}