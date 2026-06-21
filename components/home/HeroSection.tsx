import Link from "next/link";
import { Trophy, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#3a241a] bg-gradient-to-br from-[#0b0807] via-[#120908] to-black px-4 py-6 md:px-8 md:py-12">

      {/* Background Glow */}
      <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#f97316]/20 blur-[120px]" />

      <div className="relative grid items-center gap-10 md:grid-cols-2">

        {/* Trophy */}
        <div className="flex justify-center md:order-2">
          <div className="rounded-full border border-[#fbbf24]/30 bg-[#1a0f0d] p-5 md:p-7 shadow-[0_0_50px_rgba(251,191,36,0.25)]">
            <Trophy className="h-16 w-16 md:h-28 md:w-28 text-[#fbbf24]" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center md:text-left md:order-1">

          <h1 className="mt-3 text-3xl md:text-5xl font-black uppercase leading-none text-white">
            Predict Box Office.
            <br />
            Rule The Fan Arena.
            <br />
            Win Rewards.
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
