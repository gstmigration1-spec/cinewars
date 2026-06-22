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
];

  return (
    <section className="text-white">
      

      <div className="grid md:grid-cols-3 gap-3">
        {steps.map((step) => (
          <div
            key={step.title}
            className="rounded-xl border border-[#2d1b18] bg-[#120908] p-3 text-center"
          >
            <div className="text-3xl mb-2">
              {step.icon}
            </div>

            <h3 className="font-black text-base">
              {step.title}
            </h3>

            <p className="text-xs text-neutral-400 mt-1">
              {step.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-purple-500/30 bg-purple-900/10 p-3">
        <h3 className="font-black text-purple-300 mb-3">
          Key Championship Rules
        </h3>

        <ul className="space-y-1 text-xs text-neutral-300">
          {highlights.map((rule) => (
            <li key={rule}>
              {rule}
            </li>
          ))}
        </ul>
        <a
  href="https://x.com/TheCinewars"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex mt-3 text-sm font-bold text-purple-300 hover:text-purple-200 transition"
>
  🐦 Follow @TheCineWars on X for reward eligibility
</a>
      </div>

      <div className="mt-3 text-center">
        <Link
          href="/rules"
          className="
            inline-block
            rounded-xl
            bg-gradient-to-r
            from-[#facc15]
            to-[#f59e0b]
            px-5
            py-2.5
            text-xs
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