"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Flame, 
  ShieldCheck, 
  Calendar, 
  Sparkles, 
  Share2, 
  ThumbsUp, 
  ThumbsDown, 
  Film, 
  Activity,
  MessageSquare,
  Zap,
  ChevronRight
} from "lucide-react";

// =========================================================================
// 1. DATA ENGINE (THEMATICAL FILMS & INTERNETDiscourse DATA)
// =========================================================================

const movieDetailData = {
  title: "King",
  // High-fidelity cinematic assets mirroring high-stakes theatrical moody presentation
  poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=80",
  backdrop: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&q=80",
  releaseDate: "Dec 24, 2026",
  genre: "Action Thriller",
  synopsis: "The massive action-packed gangster return of Shah Rukh Khan alongside Suhana Khan, directed by Sujoy Ghosh and action-designed by Lokesh Kanagaraj.",
  expectedOpening: "₹78.0 Cr",
  expectedLifetime: "₹850 Cr",
  hypeScore: 95,
  totalPredictions: 64200,
  activeDebates: 1420,
  fanSentiment: "Overwhelming Hype",
  criticScore: "3.5/5",
  audienceHype: "91%",
  disconnectTag: "CRITICS MISSED THE MASS PULL",
  consensusText: "Critics called the structural scripting formulaic entertainment. Audiences and local box office trackers are forecasting record-breaking single-screen footfalls."
};

const pollOptionsInit = [
  { id: "p1", label: "₹40–50 Cr Day 1", percent: 12, votes: 7704 },
  { id: "p2", label: "₹50–70 Cr Day 1", percent: 26, votes: 16692 },
  { id: "p3", label: "₹70–90 Cr Day 1", percent: 54, votes: 34668 },
  { id: "p4", label: "₹90 Cr+ Day 1", percent: 8, votes: 5136 }
];

const mockPredictionWars = [
  {
    id: "pw-1",
    predictor: "CinemaSniper",
    avatar: "🎯",
    role: "Weekend Sniper",
    call: "₹82 Cr",
    emojiLabel: "🔥 CROWD FAVORITE",
    badgeStyle: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    argument: "Multiplex pre-sales curves mirror historical holiday records. Advance booking track volumes are completely vertical."
  },
  {
    id: "pw-2",
    predictor: "ReviewRaja",
    avatar: "👑",
    role: "Critic Hunter",
    call: "₹58 Cr",
    emojiLabel: "😬 TOO LOW",
    badgeStyle: "bg-red-500/10 text-red-400 border-red-500/20",
    argument: "Non-holiday framing creates capacity restrictions for late-night shows. High mass traction but tracking ceiling limits apply."
  },
  {
    id: "pw-3",
    predictor: "MassOracle",
    avatar: "🔥",
    role: "Opening Day Oracle",
    call: "₹95 Cr",
    emojiLabel: "🚀 VIRAL TAKE",
    badgeStyle: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    argument: "Single-screen mass revival configurations are being radically underestimated by city-centric traditional trade metrics."
  }
];

const mockTrendingTakes = [
  { id: "t-1", user: "TrackerGuru", avatar: "📊", role: "Trade Tracker", comment: "SRK mass pull is being completely underestimated again. Multiplex occupancy is targeting close to 94% across early morning 6 AM slots.", fireCount: 1240, replies: 189, viralLabel: "🔥 FAN FAVORITE" },
  { id: "t-2", user: "LokeVerseFan", avatar: "⚡", role: "Weekend Sniper", comment: "The trailer impact scores generated unmatched ground buzz outside metros. Tier-2 center ticket counters are completely locked.", fireCount: 942, replies: 112, viralLabel: "⚠️ TOO EARLY TO CALL" },
  { id: "t-3", user: "WomSpecialist", avatar: "🍿", role: "WOM Specialist", comment: "Critics completely missed what the audience wanted. Post-teaser trajectory demonstrates that dark grit has higher hold multipliers.", fireCount: 712, replies: 64, viralLabel: "💀 AGED BADLY" }
];

const mockLiveFeed = [
  "🔥 @MassPredictor just locked a ₹88 Cr Opening Day call",
  "💬 King vs Coolie lifetime debate volume surging (+240% velocity)",
  "⚡ @BoxOfficeBeast prediction accuracy upgraded to elite tier",
  "📈 General tracking audience alignment metrics shifting upward",
  "🔒 Pre-sales tracking locks verified across 4,200 screens"
];

// =========================================================================
// 2. RENDERING ARCHITECTURE COMPONENT
// =========================================================================

export default function MovieBattlegroundPage() {
  const [pollOptions, setPollOptions] = useState(pollOptionsInit);
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);
  const [activeFeedIdx, setActiveFeedIdx] = useState(0);
  const [userLikes, setUserLikes] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeedIdx((prev) => (prev + 1) % mockLiveFeed.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const handleVote = (id: string) => {
    if (selectedPoll) return;
    setSelectedPoll(id);
    setPollOptions(prev => prev.map(opt => {
      if (opt.id === id) {
        return { ...opt, votes: opt.votes + 1 };
      }
      return opt;
    }));
  };

  return (
    <div className="min-h-screen bg-[#060404] text-[#f5f5f7] antialiased selection:bg-[#ff3c00] selection:text-white pb-24 relative overflow-x-hidden">
      
      {/* 5. FJALLA ONE & LUXURY CINEMA OVERLAYS */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fjalla+One&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        body {
          background-color: #060404;
          color: #f5f5f7;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        .text-display {
          font-family: 'Fjalla One', sans-serif;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .glass-card {
          background: linear-gradient(145deg, rgba(22, 14, 13, 0.96) 0%, rgba(10, 7, 7, 0.99) 100%);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(249, 115, 22, 0.16);
          box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.95);
        }

        .luxury-theater-glow {
          box-shadow: 0 0 100px rgba(239, 68, 68, 0.1), inset 0 0 40px rgba(249, 115, 22, 0.04);
        }
        
        .deep-projector-flare {
          background: radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.18) 0%, rgba(230, 57, 23, 0.04) 65%, transparent 100%);
        }
      `}</style>

      {/* 5. ELEGANT LIVE ACTIVITY STREAM */}
      <div className="bg-[#0b0807] border-b border-[#1c1210] h-11 flex items-center relative overflow-hidden select-none px-4 z-40">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-2.5 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600 shadow-[0_0_8px_#f97316]" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#f97316] font-sans">Arena Activity:</span>
          </div>
          <div className="w-full pl-4 overflow-hidden h-5 relative flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeFeedIdx}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="text-xs font-bold text-neutral-400 tracking-wide absolute font-sans"
              >
                {mockLiveFeed[activeFeedIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* 1. CINEMATIC HERO DESIGN BLOCK WITH STYLIZED MODY OVERLAYS */}
        <section className="relative rounded-3xl overflow-hidden border border-[#2d1a17] bg-gradient-to-b from-[#18110f] via-[#060404] to-[#060404] shadow-2xl luxury-theater-glow">
          <div className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none transform scale-102 filter blur-[2px]" style={{ backgroundImage: `url(${movieDetailData.backdrop})` }} />
          <div className="absolute inset-0 deep-projector-flare pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060404] via-[#060404]/80 to-transparent" />

          <div className="relative z-10 p-6 sm:p-10 md:p-14 flex flex-col md:flex-row items-center md:items-end gap-8 pt-28 md:pt-40">
            
            {/* Poster Card with zoom interactions */}
            <motion.div 
              whileHover={{ scale: 1.04, rotate: -0.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-44 md:w-52 h-64 md:h-76 rounded-2xl overflow-hidden border-2 border-[#3e2622] shadow-2xl bg-neutral-900 shrink-0 relative group"
            >
              <img src={movieDetailData.poster} alt={movieDetailData.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
            </motion.div>

            {/* Title Typographic Hierarchy */}
            <div className="flex-1 text-center md:text-left space-y-4 w-full">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-[10px] font-bold bg-[#e63917] px-3 py-1 rounded text-white tracking-widest uppercase shadow-md">{movieDetailData.genre}</span>
                <span className="text-xs text-neutral-400 font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#f97316]" /> Releasing {movieDetailData.releaseDate}
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white text-display leading-none tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                {movieDetailData.title}
              </h1>
              
              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-medium leading-relaxed font-sans">
                {movieDetailData.synopsis}
              </p>

              {/* 4. PREMIUM IGNITION HYPE METER */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 max-w-xl text-left font-sans">
                <div className="bg-[#0e0a09]/90 border border-[#2d1b18] rounded-xl p-3.5 shadow-inner">
                  <span className="block text-[9px] text-neutral-500 uppercase font-black tracking-widest mb-1.5 font-bold">Hype Ignition Level</span>
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl font-black text-orange-500 font-mono">{movieDetailData.hypeScore}%</span>
                    <div className="flex-1 h-2 bg-[#050303] rounded-full overflow-hidden border border-[#211513] p-[1px]">
                      <div className="h-full bg-gradient-to-r from-[#e63917] via-[#f97316] to-[#f5a60b] rounded-full shadow-[0_0_10px_#f97316]" style={{ width: `${movieDetailData.hypeScore}%` }} />
                    </div>
                  </div>
                </div>

                <div className="bg-[#0e0a09]/90 border border-[#2d1b18] rounded-xl p-3.5 flex flex-col justify-center text-center">
                  <span className="text-[9px] text-neutral-500 block uppercase font-black tracking-widest mb-1 font-bold">Fan Sentiment</span>
                  <span className="text-xs font-black text-white uppercase tracking-wider">{movieDetailData.fanSentiment}</span>
                </div>

                <div className="bg-[#0e0a09]/90 border border-[#2d1b18] rounded-xl p-3.5 flex flex-col justify-center text-center">
                  <span className="text-[9px] text-neutral-500 block uppercase font-black tracking-widest mb-1 font-bold">Active Calls</span>
                  <span className="text-sm font-black text-amber-400 font-mono">{movieDetailData.totalPredictions.toLocaleString()}</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* INTERACTIVITY FEED PLACEMENT COHESION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pt-4">
          
          {/* LEFT CONTENT BLOCK */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* OPENING DAY POLL TERMINAL */}
            <div className="bg-neutral-950 border border-[#2d1b18] rounded-3xl p-6 space-y-6 shadow-xl relative overflow-hidden">
              <div>
                <h2 className="text-2xl font-black text-white text-display flex items-center gap-2">
                  🎯 Day 1 Prediction Floor Poll
                </h2>
                <p className="text-xs text-neutral-500 font-medium font-sans">Lock your initial benchmark call. Accuracy ratings resolve when tracking panels seal.</p>
              </div>

              <div className="space-y-3.5 font-sans">
                {pollOptions.map((opt) => {
                  const isSelected = selectedPoll === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleVote(opt.id)}
                      disabled={selectedPoll !== null}
                      className="w-full relative overflow-hidden rounded-xl bg-[#0c0807] border border-[#231512] hover:border-[#3d221d] transition-colors p-4 text-left block group disabled:cursor-default"
                    >
                      <div 
                        className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                          isSelected 
                            ? "bg-gradient-to-r from-[#e63917]/25 to-[#f97316]/10 border-r-2 border-r-[#f97316]" 
                            : selectedPoll !== null ? "bg-neutral-900/20" : "bg-neutral-900/10"
                        }`}
                        style={{ width: selectedPoll !== null ? `${opt.percent}%` : "0%" }}
                      />

                      <div className="relative z-10 flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                        <span className={`transition ${isSelected ? "text-orange-400 font-bold" : "text-white"}`}>{opt.label}</span>
                        {selectedPoll !== null && (
                          <span className="font-mono text-neutral-300 transition">
                            {opt.percent}% <span className="text-[10px] text-neutral-600 font-sans">({opt.votes.toLocaleString()} calls)</span>
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. PREDICTION WARS SECTION (DRAMATIC EMOTIONAL DISAGREEMENT) */}
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-wider text-white text-display">
                  ⚔️ Prediction Clash Terminal
                </h2>
                <p className="text-xs text-neutral-500 font-medium font-sans">Loud tracking profiles clashing directly on opening benchmarks.</p>
              </div>

              <div className="space-y-4">
                {mockPredictionWars.map((war) => (
                  <div key={war.id} className="bg-neutral-950 border border-[#2b1816] rounded-2xl p-5 space-y-4 shadow-xl group hover:border-[#422622] transition duration-200">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-[#1f1412] pb-3">
                      <div className="flex items-center space-x-3.5">
                        <span className="text-xl bg-[#0c0807] p-2 rounded-xl border border-neutral-800">{war.avatar}</span>
                        <div>
                          <span className="text-xs font-black text-white block">@{war.predictor}</span>
                          <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider font-sans">{war.role}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 justify-between sm:justify-end">
                        {/* Emotional Tone Badging Labels */}
                        <span className={`text-[10px] font-black uppercase tracking-widest border px-3 py-1 rounded-xl font-sans ${war.badgeStyle}`}>
                          {war.emojiLabel}
                        </span>
                        <span className="text-lg font-black font-mono text-white bg-gradient-to-r from-[#e63917] to-[#f97316] px-4 py-1 rounded-xl shadow-md font-bold">
                          {war.call}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed bg-[#0c0807]/50 p-3.5 rounded-xl italic font-sans">
                      "{war.argument}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. VIRAL INTERNET-NATIVE FAN DEBATE FEED */}
            <div className="space-y-5">
              <h2 className="text-2xl font-black uppercase tracking-wider text-white text-display">
                💬 Trending Fandom Discourse
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {mockTrendingTakes.map((take) => (
                  <div key={take.id} className="bg-neutral-950 border border-[#231513] rounded-2xl p-5 flex flex-col justify-between space-y-5 hover:border-neutral-800 transition shadow-xl relative overflow-hidden group">
                    <div className="space-y-3 font-sans">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#f97316]">
                        <span className="flex items-center gap-1">👤 @{take.user} <strong className="text-neutral-500 font-sans font-medium">({take.role})</strong></span>
                        <span className="text-[9px] bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-400 font-bold">
                          {take.viralLabel}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed italic">
                        "{take.comment}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] border-t border-[#1f1412] pt-3 text-neutral-400 font-black uppercase tracking-wider font-sans">
                      <button onClick={() => handleLike(take.id)} className="flex items-center gap-1 hover:text-white transition text-orange-500 font-mono font-bold">
                        <Flame className="w-3.5 h-3.5 fill-current" /> 
                        <span>Fire ({take.fireCount + (userLikes[take.id] || 0)})</span>
                      </button>
                      <span className="flex items-center gap-1 text-neutral-500"><MessageSquare className="w-3.5 h-3.5" /> {take.replies} Replies</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMNS */}
          <div className="lg:col-span-1 space-y-6 font-sans">
            
            {/* CRITICS VS AUDIENCE DEBATE BREAKDOWN */}
            <div className="bg-neutral-950 border border-[#2d1b18] rounded-3xl p-5 space-y-5 shadow-xl">
              <h3 className="text-lg font-black uppercase tracking-wide text-white text-display border-b border-[#2d1b18] pb-2">
                Critics vs Audience Disconnect
              </h3>

              <div className="grid grid-cols-2 gap-3 text-center font-mono">
                <div className="bg-[#160f0d] border border-[#2d1b18] p-3.5 rounded-xl">
                  <span className="text-[8px] text-neutral-500 block uppercase font-sans mb-1 font-bold tracking-wider">Critics Score</span>
                  <span className="text-base font-black text-red-400">{movieDetailData.criticScore}</span>
                </div>
                <div className="bg-[#160f0d] border border-[#2d1b18] p-3.5 rounded-xl">
                  <span className="text-[8px] text-neutral-500 block uppercase font-sans mb-1 font-bold tracking-wider">Audience Hype</span>
                  <span className="text-base font-black text-emerald-400">{movieDetailData.audienceHype}</span>
                </div>
              </div>

              <div className="bg-[#0c0807] border border-[#231512] rounded-xl p-3.5 text-xs leading-relaxed font-medium text-neutral-400 relative">
                <span className="absolute -top-2 left-3 bg-[#e63917] text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded text-white font-bold">
                  {movieDetailData.disconnectTag}
                </span>
                <p className="pt-1.5 leading-relaxed">"{movieDetailData.consensusText}"</p>
              </div>
            </div>

            {/* SCREENSHOT CARD EMBED RECEIPT */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#f97316] font-bold px-1">Your Active Receipt Stub</h3>
              
              <div className="glass-card relative rounded-3xl border border-[#3e2622] bg-neutral-950 overflow-hidden shadow-2xl flex flex-col justify-between group p-6 space-y-5 luxury-projector-glow transition-transform duration-300 hover:scale-[1.01]">
                <div className="absolute inset-0 bg-cover bg-center opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url(${movieDetailData.backdrop})` }} />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest">
                    <span className="text-neutral-500 font-mono">CINEWARS SLIP HUB V.2</span>
                    <span className="text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded font-bold">PENDING MATCH</span>
                  </div>

                  <div className="border-t border-b border-[#2d1b18] py-3.5">
                    <span className="text-[8px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 font-bold">Opening Call</span>
                    <h4 className="text-3xl font-black uppercase text-white mt-1.5 text-display tracking-wide">{movieDetailData.title}</h4>
                  </div>

                  <div className="bg-[#0c0807] border border-[#231512] p-4 rounded-xl text-center">
                    <span className="text-[8px] text-neutral-500 block uppercase font-black tracking-widest mb-1.5 font-bold">Your Locked Target Slips</span>
                    <span className="text-sm font-black text-white font-mono bg-[#160f0d] border border-[#2d1b18] px-4 py-1.5 rounded-lg inline-block">
                      {selectedPoll ? pollOptions.find(o => o.id === selectedPoll)?.label.split(' ')[0] : "Awaiting Floor Selection"}
                    </span>
                  </div>
                </div>

                {/* Ticket serration cuts */}
                <div className="relative h-4 w-full flex items-center justify-between pointer-events-none px-1 bg-transparent">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#060404] border-r border-[#2d1b18] -ml-8 z-20" />
                  <div className="w-full border-t border-dashed border-[#2d1b18]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#060404] border-l border-[#2d1b18] -mr-8 z-20" />
                </div>

                <div className="flex items-center justify-between text-[10px] text-neutral-500 font-bold pt-1">
                  <span className="font-mono text-neutral-600">ID: CINE-SLIP-9942</span>
                  <button className="flex items-center gap-1.5 bg-[#140e0d] border border-[#2d1b18] px-3.5 py-2 rounded-xl text-neutral-300 hover:text-white transition font-bold shadow-md">
                    <Share2 className="w-3.5 h-3.5 text-orange-500" /> Share Slips
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}