import { Gift, Trophy, Coins } from "lucide-react";

export default function ChampionshipBanner() {
  return (
    <section
      id="championship"
      className="mt-8 rounded-3xl border border-[#3a241a] bg-gradient-to-br from-[#120908] via-[#0b0807] to-black p-5 md:p-8"
    >

      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-black uppercase text-white">
          🏆 CineWars Championship
        </h2>

        <p className="mt-2 text-sm md:text-base text-neutral-400">
          Season 1 is LIVE. Predict the biggest movies and climb the ultimate box office leaderboard.
        </p>
      </div>


      {/* Reward + Status */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="rounded-2xl border border-[#fbbf24]/20 bg-[#150d0b] p-5 text-center">

          <Gift className="mx-auto h-8 w-8 text-[#fbbf24]" />

          <h3 className="mt-3 text-sm font-black uppercase text-[#fbbf24]">
            Season Rewards
          </h3>

          <p className="mt-2 text-lg font-bold text-white">
            PVR Vouchers up to ₹500
          </p>

        </div>


        <div className="rounded-2xl border border-[#38bdf8]/20 bg-[#091019] p-5 text-center">

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


      {/* How It Works */}
      <div className="mt-8">

        <h3 className="text-center text-xs md:text-sm font-black uppercase tracking-widest text-[#fbbf24]">
          How It Works
        </h3>


        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">

          <div className="rounded-xl border border-[#2d1b18] bg-black/40 p-4 text-center">
            <div className="text-2xl">🎯</div>
            <p className="mt-2 text-xs font-bold text-white">
              Predict Opening Day & Lifetime
            </p>
          </div>


          <div className="rounded-xl border border-[#2d1b18] bg-black/40 p-4 text-center">
            <Coins className="mx-auto h-7 w-7 text-[#fbbf24]" />
            <p className="mt-2 text-xs font-bold text-white">
              Earn CinePoints
            </p>
          </div>


          <div className="rounded-xl border border-[#2d1b18] bg-black/40 p-4 text-center">
            <Trophy className="mx-auto h-7 w-7 text-[#38bdf8]" />
            <p className="mt-2 text-xs font-bold text-white">
              Climb Rankings
            </p>
          </div>


          <div className="rounded-xl border border-[#2d1b18] bg-black/40 p-4 text-center">
            <div className="text-2xl">🎁</div>
            <p className="mt-2 text-xs font-bold text-white">
              Win Rewards
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}