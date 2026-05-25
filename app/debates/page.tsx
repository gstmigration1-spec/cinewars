"use client";

import { MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
const mockDebates = [
  {
    id: "deb-1",
    title: "Will Word of Mouth (WOM) save Spirit if the critic reviews are mixed?",
    fandoms: "Prabhas Fans vs Elite Critics",
    replies: 342,
    agreeCount: 812,
    hotTake: "SRK fans are underestimating WOM impact. Vanga's tracks don't need critics. The raw energy will carry it to ₹900 Cr single-handedly."
  },
  {
    id: "deb-2",
    title: "Can 'Coolie' beat the lifetime collection of 'Jailer' in Tamil Nadu?",
    fandoms: "Thalaivar Army vs General Trackers",
    replies: 512,
    agreeCount: 1045,
    hotTake: "Coolie will crush opening records. Lokesh's direction plus Rajini's swag means Jailer's records are getting shattered in week one."
  },
  {
    id: "deb-3",
    title: "This take aged badly: 'Sunny Deol won't replicate Gadar 2 hype with Batwara 1947'",
    fandoms: "Nostalgia Believers vs Modernists",
    replies: 189,
    agreeCount: 423,
    hotTake: "Critics missed what audience wanted. People completely underestimated the mass pull of Rajkumar Santoshi pairing with Sunny."
  },
  {
    id: "deb-4",
    title: "How animal changed mass cinema psychology and tracking behavior",
    fandoms: "Cinema Cult vs Traditional Trackers",
    replies: 294,
    agreeCount: 651,
    hotTake: "Animal changed mass cinema psychology. Post-Animal, dark grit has high target opening multipliers that systems can't predict."
  }
];

export default function DebatesPage() {
  return (
    <div className="min-h-screen bg-[#050303] text-white p-8">
      
        {/* DEBATE INTERACTIVE DISCUSSION AREA */}
        <section id="banter" className="space-y-6">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-wider flex items-center gap-2 text-white text-display">
              💬 Movie Debate Culture Pit
            </h2>
            <p className="text-xs text-neutral-500 font-medium">Lively fan comments and heated reviewer arguments. Settle outcomes with accuracy ratings.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockDebates.map((debate) => (
              <div key={debate.id} className="bg-neutral-950 border border-[#38231e] rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-25 text-neutral-800">
                  <MessageCircle className="w-16 h-16" />
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-orange-400 font-bold">
                    <span>👥 Target Faction: {debate.fandoms}</span>
                    <span className="bg-[#0c0807] px-2 py-0.5 rounded border border-[#2d1b18] text-neutral-400">{debate.replies} Replies</span>
                  </div>
                  <h3 className="text-lg font-black uppercase text-white leading-tight tracking-wide text-display">{debate.title}</h3>
                </div>

                <div className="bg-[#0a0605]/90 border border-[#2d1b18] rounded-xl p-3.5 border-l-2 border-l-[#e63917]">
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#e63917] bg-[#e63917]/10 px-2 py-0.5 rounded border border-[#e63917]/20 block w-fit mb-2 font-bold">Featured Argument</span>
                  <p className="text-xs italic text-neutral-300 font-medium leading-relaxed">"{debate.hotTake}"</p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#170f0d] border border-[#34201c] hover:border-[#f97316]/40 rounded-xl text-[10px] font-black uppercase tracking-wider text-neutral-300 transition font-bold">
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" /> Align with Take ({debate.agreeCount})
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#170f0d] border border-[#34201c] hover:border-[#e63917]/40 rounded-xl text-[10px] font-black uppercase tracking-wider text-neutral-300 transition font-bold">
                    <ThumbsDown className="w-3.5 h-3.5 text-red-500" /> Dispute Accuracy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

    </div>
  );
}