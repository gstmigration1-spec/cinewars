import Link from "next/link";
import { Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#3a241a] bg-gradient-to-br from-[#0b0807] via-[#120908] to-black px-4 py-6 md:px-8 md:py-12">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/3 h-80 w-80 rounded-full bg-purple-700/20 blur-[140px]" />

<div className="absolute top-10 right-20 h-72 w-72 rounded-full bg-orange-500/20 blur-[130px]" />

      <div className="relative grid items-center gap-10 md:grid-cols-2">

        {/* Trophy */}
        <div className="flex justify-center md:order-2">
          <div className="relative flex flex-col items-center justify-center p-4 md:p-6">
            <img
  src="/images/champion-trophy.png"
  alt="CineWars Champion Trophy"
  className="
    relative z-10
    w-40 md:w-64
    object-contain
    drop-shadow-[0_0_40px_rgba(251,191,36,0.8)]
  "
/>

            <div className="mt-4 text-center">
  <p className="text-[10px] md:text-xs tracking-[0.3em] text-[#fbbf24] uppercase font-black">
    🏆 CINEWARS CHAMPION
  </p>

  <p className="mt-1 text-sm md:text-base font-black text-white">
    SEASON 1 • LIVE 
  </p>
</div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center md:text-left md:order-1">

          <h1 className="mt-2 text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tight">

  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500 drop-shadow-[0_3px_10px_rgba(255,255,255,0.35)]">
    Predict Box Office.
  </span>

  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#ffe066] via-[#fbbf24] to-[#ea580c] drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]">
    Rule The Fan Arena.
  </span>

  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#e879f9] via-[#c026d3] to-[#7e22ce] drop-shadow-[0_0_25px_rgba(192,38,211,0.8)]">
    Win Rewards.
  </span>

</h1>

          <p className="mt-5 text-sm md:text-lg text-neutral-300 max-w-xl">
            Make opening day and lifetime box office predictions,
            earn CinePoints, climb the leaderboard, and prove your
            box office instincts in the ultimate fan championship.
          </p>

          {/* CTA Buttons */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">

            <Link
              href="#championship"
              className="rounded-xl bg-gradient-to-r from-[#facc15] to-[#f59e0b] px-5 py-2.5 text-sm font-black uppercase tracking-wider text-black flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_25px_rgba(251,191,36,0.35)]"
            >
              Enter The Arena
              <Zap className="h-4 w-4 text-black fill-black" />
            </Link>

            <Link
              href="/leaderboard"
              className="rounded-xl border border-[#fbbf24]/40 bg-[#1a0f0d] px-5 py-2.5 text-sm font-black uppercase tracking-wider text-[#fbbf24] flex items-center justify-center hover:bg-[#fbbf24] hover:text-black transition-all duration-300"
            >
              View Leaderboard
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}
