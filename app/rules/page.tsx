export default function RulesPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-10 md:px-8">

      {/* Hero */}
      <div className="text-center max-w-4xl mx-auto">

        <p className="text-[#fbbf24] font-black uppercase tracking-widest">
          🏆 Official Rulebook
        </p>

        <h1 className="mt-3 text-4xl md:text-6xl font-black uppercase bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          CineWars Championship Rules
        </h1>

        <p className="mt-5 text-neutral-400 text-lg">
          Predict accurately. Earn CinePoints. Reach 1000.
          Finish Top 3. Win Rewards.
        </p>

      </div>


      {/* Reward Goal */}
      <section className="mt-12 rounded-3xl border border-[#fbbf24]/30 bg-[#120908] p-6 md:p-8 max-w-5xl mx-auto">

        <h2 className="text-2xl font-black text-[#fbbf24]">
          🏆 Championship Goal
        </h2>

        <ul className="mt-4 space-y-3 text-neutral-300">
          <li>✅ Finish in the Top 3 of the Monthly Leaderboard</li>
          <li>✅ Score 1000+ CinePoints</li>
          <li>✅ Complete predictions for at least 5 Championship movies</li>
          <li>✅ Follow the official CineWars X handle until winners are announced</li>
        </ul>

        <p className="mt-5 text-red-300 font-semibold">
          If no fan reaches 1000 CinePoints, no monthly reward will be awarded.
        </p>

      </section>


      {/* Box Office Standard */}
      <section className="mt-8 max-w-5xl mx-auto rounded-3xl border border-[#2d1b18] bg-[#090505] p-6">

        <h2 className="text-xl font-black text-purple-400">
          🎬 Box Office Standard
        </h2>

        <p className="mt-3 text-neutral-300">
          All predictions are based only on India Net Box Office collections.
        </p>

        <ul className="mt-3 space-y-2 text-neutral-400">
          <li>✅ Opening Day India Net Collection</li>
          <li>✅ Lifetime India Net Collection</li>
          <li>❌ Worldwide Gross is not considered</li>
          <li>❌ Overseas Collection is not considered</li>
          <li>❌ India Gross Collection is not considered</li>
        </ul>

      </section>


      {/* Scoring Tables */}
      <section className="mt-8 max-w-5xl mx-auto grid md:grid-cols-2 gap-6">


        <div className="rounded-3xl border border-[#fbbf24]/30 bg-[#120908] p-6">

          <h3 className="text-xl font-black text-[#fbbf24]">
            🎯 Opening Day (Max 100)
          </h3>

          <div className="mt-4 space-y-2 text-sm">

            <p>Exact Prediction — 100</p>
            <p>Within 5% — 95</p>
            <p>Within 10% — 85</p>
            <p>Within 15% — 70</p>
            <p>Within 20% — 50</p>
            <p>More than 20% — 0</p>

          </div>

        </div>


        <div className="rounded-3xl border border-purple-500/30 bg-purple-950/20 p-6">

          <h3 className="text-xl font-black text-purple-300">
            🎬 Lifetime (Max 150)
          </h3>

          <div className="mt-4 space-y-2 text-sm">

            <p>Exact Prediction — 150</p>
            <p>Within 5% — 140</p>
            <p>Within 10% — 125</p>
            <p>Within 15% — 105</p>
            <p>Within 20% — 80</p>
            <p>More than 20% — 0</p>

          </div>

        </div>

      </section>


      {/* Bonuses */}
      <section className="mt-8 max-w-5xl mx-auto rounded-3xl border border-[#2d1b18] bg-[#090505] p-6">

        <h2 className="text-2xl font-black text-[#fbbf24]">
          ⚡ Bonus CinePoints
        </h2>


        <div className="mt-5 space-y-3">

          <p>
            ⏳ Predict 20–15 days before release:
            <span className="text-[#fbbf24] font-bold"> +20 CinePoints</span>
          </p>

          <p>
            ⏳ Predict 14–6 days before release:
            <span className="text-[#fbbf24] font-bold"> +15 CinePoints</span>
          </p>

          <p>
            🐦 Share your prediction on X before lock and tag CineWars:
            <span className="text-purple-400 font-bold"> +5 CinePoints</span>
          </p>

        </div>

      </section>


      {/* Lock Rules */}
      <section className="mt-8 max-w-5xl mx-auto rounded-3xl border border-red-500/30 bg-red-950/10 p-6">

        <h2 className="text-2xl font-black text-red-300">
          🔒 Prediction Lock Rules
        </h2>

        <ul className="mt-4 space-y-3 text-neutral-300">
          <li>Only one prediction edit is allowed.</li>
          <li>The edit must happen before 5 days of release.</li>
          <li>All predictions lock 5 days before release.</li>
          <li>No new predictions or changes are allowed after lock.</li>
        </ul>

      </section>


      {/* Tie Breaker */}
      <section className="mt-8 mb-10 max-w-5xl mx-auto rounded-3xl border border-purple-500/30 bg-purple-950/20 p-6">

        <h2 className="text-xl font-black text-purple-300">
          🥇 Tie Breakers
        </h2>

        <ol className="mt-4 space-y-2 text-neutral-300">
          <li>1. More exact predictions wins</li>
          <li>2. More Championship movies predicted wins</li>
          <li>3. Earlier average prediction date wins</li>
        </ol>

      </section>

    </main>
  );
}