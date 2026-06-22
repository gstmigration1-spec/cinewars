import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      icon: "🎯",
      title: "Predict Box Office",
      text: "Predict Opening Day & Lifetime India Net collections for Championship movies.",
    },
    {
      icon: "🏆",
      title: "Earn CinePoints",
      text: "Earn points for accuracy, early predictions and sharing your predictions on X.",
    },
    {
      icon: "👑",
      title: "Become Champion",
      text: "Reach 1000 CinePoints, finish in the Top 3 and win monthly rewards.",
    },
  ];

  const highlights = [
    "🎬 India Net collections only",
    "📅 Minimum 5 movies required",
    "🔒 One edit allowed until 5 days before release",
    "🐦 Follow CineWars on X for reward eligibility",
  ];

  return (
    <section className="text-white">
      <div className="mb-8 text-center">
        <p className="text-purple-400 text-sm font-black uppercase tracking-widest">
          ⚡ Championship Guide
        </p>

        <h2 className="text-3xl md:text-4xl font-black uppercase bg-gradient-to-r from-purple-400 to-purple-700 bg-clip-text text-transparent">
          How CineWars Works
        </h2>

        <p className="text-neutral-400 mt-3">
          Predict. Earn. Climb. Become the ultimate box office champion.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {steps.map((step) => (
          <div
            key={step.title}
            className="rounded-2xl border border-[#2d1b18] bg-[#120908] p-6 text-center"
          >
            <div className="text-4xl mb-3">
              {step.icon}
            </div>

            <h3 className="font-black text-lg">
              {step.title}
            </h3>

            <p className="text-sm text-neutral-400 mt-2">
              {step.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-purple-500/30 bg-purple-900/10 p-5">
        <h3 className="font-black text-purple-300 mb-3">
          Key Championship Rules
        </h3>

        <ul className="space-y-2 text-sm text-neutral-300">
          {highlights.map((rule) => (
            <li key={rule}>
              {rule}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 text-center">
        <Link
          href="/rules"
          className="
            inline-block
            rounded-xl
            bg-gradient-to-r
            from-[#facc15]
            to-[#f59e0b]
            px-6
            py-3
            text-sm
            font-black
            uppercase
            text-black
          "
        >
          📜 View Full Championship Rules
        </Link>
      </div>
    </section>
  );
}