import Link from "next/link";
import { Gift, Trophy, ScrollText } from "lucide-react";

export default function ChampionshipBanner() {
  return (
    <section
      id="championship"
      className="mt-4 rounded-2xl border border-[#3a241a] bg-gradient-to-br from-[#120908] via-[#0b0807] to-black p-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-lg md:text-2xl font-black uppercase text-white">
            🏆 CineWars Championship
          </h2>

          <p className="mt-1 text-xs md:text-sm text-neutral-400">
            Season 1 LIVE • Predict Box Office • Earn CinePoints
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">

          <div className="flex items-center gap-2 rounded-full border border-[#fbbf24]/20 bg-[#150d0b] px-3 py-2">
            <Gift className="h-4 w-4 text-[#fbbf24]" />
            <span className="text-xs font-bold text-[#fbbf24]">
              Rewards ₹1000
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#38bdf8]/20 bg-[#091019] px-3 py-2">
            <Trophy className="h-4 w-4 text-[#38bdf8]" />
            <span className="text-xs font-bold text-[#38bdf8]">
              🟢 LIVE
            </span>
          </div>

          <Link
            href="/rules"
            className="flex items-center gap-2 rounded-full border border-[#7c3aed]/20 bg-[#120a1f] px-3 py-2 transition hover:border-[#7c3aed]/40"
          >
            <ScrollText className="h-4 w-4 text-[#c084fc]" />
            <span className="text-xs font-bold text-[#c084fc]">
              Championship Rules →
            </span>
          </Link>

        </div>

      </div>
      <div className="mt-3 text-center md:text-left">
  <a
    href="https://x.com/TheCinewars"
    target="_blank"
    rel="noopener noreferrer"
    className="text-xs text-neutral-400 hover:text-[#fbbf24] transition"
  >
    🐦 Follow @TheCineWars on X for reward eligibility
  </a>
</div>
    </section>
  );
}
