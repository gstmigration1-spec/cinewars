"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Flame, 
  ShieldCheck, 
  Target, 
  TrendingUp, 
  Zap, 
  Share2, 
  ThumbsUp, 
  ThumbsDown, 
  Film, 
  Activity,
  MessageCircle,
  Award,
  Users,
  Trophy,
  Frown,
  TrendingDown,
  HelpCircle,
  Clock
} from "lucide-react";

// =========================================================================
// HARDCODED CINEMATIC PROFILE DATA ENGINE FOR EXPERT USER PROFILE
// =========================================================================

const userProfileData = {
  username: "CinemaSniper",
  avatar: "🎯",
  titleRole: "Weekend Sniper",
  trustScore: 945,
  accuracyRate: 89.4,
  streakCount: 7,
  bannerImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
  
  // Community Reputation Stats
  followers: "18.4K",
  debateWins: 142,
  trendingAccuracy: "+4.2%",
  credibilityRating: "Elite Elite",

  // Trust Score Breakdown Metrics
  breakdown: {
    consistency: { percentage: 94, desc: "Minimal variance between calls across multiple genres" },
    openingDay: { percentage: 91, desc: "High precision modeling on Day 1 local circuits" },
    audienceAlignment: { percentage: 88, desc: "Perfect calibration tracking crowd sentiment shifts" },
    longTermReliability: { percentage: 85, desc: "Accurate forecasting on lifetime hold multipliers" }
  },

  // Big Record Hits & Volatile Misses
  biggestHit: {
    movie: "Coolie",
    prediction: "₹65.0 Cr Opening",
    actual: "₹67.2 Cr Actual",
    metric: "96.7% Dead-on Match",
    quote: "Called Lokesh Kanagaraj mass metric velocity down to the exact screen allocation margin."
  },
  worstMiss: {
    movie: "Animal",
    prediction: "₹50.0 Cr Opening",
    actual: "₹63.8 Cr Actual",
    metric: "-27.6% Deficit Volatility",
    quote: "Completely underestimated Sandeep Vanga's viral multi-generational single-screen shock breakout."
  },

  // Historical Prediction Logs
  history: [
    { id: "h-1", movie: "Batwara 1947", callType: "Opening Weekend", predicted: "₹120 Cr", actual: "₹124 Cr", status: "AGED WELL", accuracy: "96.7%", accent: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" },
    { id: "h-2", movie: "Drishyam 3", callType: "Lifetime India", predicted: "₹340 Cr", actual: "₹355 Cr", status: "AGED WELL", accuracy: "95.8%", accent: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" },
    { id: "h-3", movie: "Awarapan 2", callType: "Lifetime Worldwide", predicted: "₹150 Cr", actual: "₹45 Cr", status: "MISSED", accuracy: "30.0%", accent: "text-red-400 border-red-500/20 bg-red-500/5" }
  ],

  // Badges Earned
  badges: [
    { id: "b-1", label: "Opening Day Oracle", icon: "🔮", color: "border-amber-500/30 text-amber-400 bg-amber-500/10", desc: "Correctly forecast 5 Day 1 records within 2% variance margins." },
    { id: "b-2", label: "Critic Hunter", icon: "⚔️", color: "border-red-500/30 text-red-400 bg-red-500/10", desc: "Successfully inverted 10 premium critic calls overridden by crowd response." },
    { id: "b-3", label: "Box Office Beast", icon: "🦁", color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10", desc: "Maintained a continuous 75%+ tracking accuracy for 3 consecutive months." },
    { id: "b-4", label: "Hype Detector", icon: "📡", color: "border-orange-500/30 text-orange-400 bg-orange-500/10", desc: "Flagged three multi-franchise sequels whose initial tracks suffered mass decline." }
  ],

  // Viral Community Hot Takes
  hotTakes: [
    { id: "t-1", text: "Elite reviewers fundamentally misread mass masala psychology. Coolie will clear its entire Tamil Nadu target layout inside 72 hours flat.", fire: 1420, chatter: 245 },
    { id: "t-2", text: "Spirit's pre-sales velocity is tracking completely asymmetrical. Vanga doesn't need standard press circuits—the raw dark grit index is bulletproof.", fire: 984, chatter: 112 }
  ]
};

const mockLiveActivity = [
  "⚡ @CinemaSniper projection accuracy index updated to 89.4%",
  "🏆 Oracle Gold badge unlocked for King box office accuracy",
  "🔥 @CinemaSniper just entered the Spirit vs Critics debate arena",
  "📈 Track Record Score scaling upward across global standings"
];

// =========================================================================
// MAIN EXPORT PROFILE PAGE ARCHITECTURE Component: app/user/[username]/page.tsx
// =========================================================================

export default function UserReputationProfilePage() {
  const params = useParams();
  const username = params?.username ? String(params.username) : userProfileData.username;
  const [tickerIdx, setTickerIdx] = useState(0);
  const [fireVotes, setFireVotes] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIdx((prev) => (prev + 1) % mockLiveActivity.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const triggerReaction = (id: string) => {
    setFireVotes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div className="min-h-screen bg-[#050303] text-[#f5f5f7] antialiased selection:bg-[#ff3c00] selection:text-white pb-24 relative overflow-x-hidden">
      
      {/* FJALLA CONDENSED TYPOGRAPHY ENGINE & LUXURY THEATER OVERLAYS */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fjalla+One&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        body {
          background-color: #050303;
          color: #f5f5f7;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        .text-display {
          font-family: 'Fjalla One', sans-serif;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .glass-card {
          background: linear-gradient(145deg, rgba(22, 15, 14, 0.95) 0%, rgba(10, 7, 7, 0.99) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(249, 115, 22, 0.14);
          box-shadow: 0 16px 48px 0 rgba(0, 0, 0, 0.95);
        }

        .lobby-projector-glow {
          box-shadow: 0 0 100px rgba(230, 57, 23, 0.12), inset 0 0 40px rgba(249, 115, 22, 0.04);
        }

        .warm-projector-flare {
          background: radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.15) 0%, rgba(230, 57, 23, 0.04) 60%, transparent 100%);
        }
      `}</style>

      {/* HORIZONTAL PROFILE STATUS MARQUEE */}
      <div className="bg-[#110a09] border-b border-[#2b1815] h-10 flex items-center relative overflow-hidden select-none px-4 z-40">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600 shadow-[0_0_8px_#f97316]" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#f97316]">Reputation Feed:</span>
          </div>
          <div className="w-full pl-4 overflow-hidden h-5 relative flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={tickerIdx}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-[11px] font-bold text-neutral-300 tracking-wide absolute"
              >
                {mockLiveActivity[tickerIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* CORE WRAPPER FLOW HUB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* 1. PREMIUM COHESIVE PROFILE HERO PASSPORT */}
        <section className="relative rounded-3xl overflow-hidden border border-[#2d1a17] bg-gradient-to-b from-[#160f0e] via-[#050303] to-[#050303] shadow-2xl lobby-projector-glow">
          <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" style={{ backgroundImage: `url(${userProfileData.bannerImage})` }} />
          <div className="absolute inset-0 warm-projector-flare pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050303] via-[#050303]/60 to-transparent" />

          <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-20">
            
            {/* Identity Group */}
            <div className="flex items-center space-x-4 sm:space-x-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-[#e63917] to-[#f97316] rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-[0_0_25px_rgba(249,115,22,0.35)] select-none shrink-0">
                {userProfileData.avatar}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl sm:text-5xl font-black text-white text-display leading-none">
                    @{username}
                  </h1>
                  <span className="bg-[#f97316]/10 border border-[#f97316]/30 text-[10px] font-black uppercase tracking-widest text-[#f97316] px-2.5 py-1 rounded-md font-bold shrink-0">
                    {userProfileData.titleRole}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 font-medium">
                  Ecosystem Status: <span className="text-amber-400 font-bold">{userProfileData.badgeText}</span>
                </p>
              </div>
            </div>

            {/* Core Snapshot Tracker Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 bg-[#0a0706]/80 border border-[#231513] p-4 rounded-2xl min-w-[280px] sm:min-w-[360px] font-mono shadow-inner relative group">
              <div className="text-center border-r border-[#1a100f] pr-1">
                <Target className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
                <span className="text-[8px] text-neutral-500 block uppercase font-sans font-black tracking-widest">Accuracy</span>
                <span className="text-sm sm:text-base font-black text-emerald-400">{userProfileData.accuracyRate}%</span>
              </div>
              <div className="text-center border-r border-[#1a100f] px-1">
                <ShieldCheck className="w-4 h-4 text-white mx-auto mb-1.5" />
                <span className="text-[8px] text-neutral-500 block uppercase font-sans font-black tracking-widest">Trust Score</span>
                <span className="text-sm sm:text-base font-black text-white">{userProfileData.trustScore}</span>
              </div>
              <div className="text-center pl-1">
                <Zap className="w-4 h-4 text-orange-500 mx-auto mb-1.5 animate-pulse" />
                <span className="text-[8px] text-neutral-500 block uppercase font-sans font-black tracking-widest">Hot Streak</span>
                <span className="text-[10px] font-sans font-black text-orange-400 uppercase leading-none block pt-0.5">{userProfileData.streakCount} Wins</span>
              </div>
            </div>

          </div>
        </section>

        {/* 7. COMMUNITY REPUTATION COUNTERS PANEL SECTION */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Network Followers", value: userProfileData.followers, icon: <Users className="w-4 h-4 text-neutral-400" /> },
            { label: "Debate Pit Wins", value: userProfileData.debateWins, icon: <Trophy className="w-4 h-4 text-amber-500" /> },
            { label: "Trending Accuracy MoM", value: userProfileData.trendingAccuracy, icon: <TrendingUp className="w-4 h-4 text-emerald-400" /> },
            { label: "Fan Credibility Tier", value: userProfileData.credibilityRating, icon: <Award className="w-4 h-4 text-[#ef4444]" /> }
          ].map((item, i) => (
            <div key={i} className="bg-neutral-950 border border-[#231513] rounded-xl p-4 flex items-center justify-between shadow-lg">
              <div className="space-y-0.5">
                <span className="text-[9px] text-neutral-500 uppercase font-black tracking-wider block">{item.label}</span>
                <span className="text-lg font-black uppercase text-white font-mono tracking-tight">{item.value}</span>
              </div>
              <div className="bg-[#0c0807] border border-[#1f1412] p-2 rounded-lg shadow-inner">
                {item.icon}
              </div>
            </div>
          ))}
        </section>

        {/* PRIMARY SPLIT HUB LAYOUT MATRICES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-12">
            
            {/* 2. DYNAMIC TRUST SCORE BREAKDOWN SECTION */}
            <div className="bg-neutral-950 border border-[#2d1b18] rounded-3xl p-6 space-y-5 shadow-xl relative">
              <div>
                <h2 className="text-2xl font-black text-white text-display flex items-center gap-2">
                  📊 Track Record Accuracy Breakdown
                </h2>
                <p className="text-xs text-neutral-500 font-medium">Calibrated performance vector summaries across distinct film segments.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {Object.entries(userProfileData.breakdown).map(([key, item]) => (
                  <div key={key} className="bg-[#0c0807] border border-[#231512] p-4 rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-black uppercase tracking-wider text-neutral-300 block">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <p className="text-[11px] text-neutral-500 font-medium leading-tight">{item.desc}</p>
                    </div>
                    <span className="text-2xl font-black font-mono text-emerald-400 shrink-0 bg-neutral-950 border border-[#211513] px-2.5 py-1 rounded-lg">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. COMPREHENSIVE BOX OFFICE PREDICTION HISTORY */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-white text-display flex items-center gap-2">
                📜 Active Box Office Call Log
              </h2>

              <div className="space-y-3.5">
                {userProfileData.history.map((h) => {
                  const isAgedWell = h.status === "AGED WELL";
                  return (
                    <div key={h.id} className="bg-neutral-950 border border-[#231512] rounded-2xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 relative overflow-hidden group shadow-md hover:border-neutral-800 transition">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-black uppercase text-display text-white tracking-wide">{h.movie}</h3>
                          <span className={`text-[9px] font-black border px-2.5 py-0.5 rounded-full uppercase tracking-wider ${h.accent}`}>
                            {isAgedWell ? "✓ " : "✕ "} {h.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs font-mono text-neutral-400">
                          <span>Circuit Type: <strong className="text-neutral-500 font-sans font-bold uppercase tracking-wide">{h.callType}</strong></span>
                          <span>Call Slip: <strong className="text-white font-normal">{h.predicted}</strong></span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center p-2.5 sm:p-0 bg-[#0c0807] sm:bg-transparent border border-[#231512] sm:border-0 rounded-xl font-mono shrink-0">
                        <span className="text-[8px] text-neutral-500 block uppercase font-sans font-black tracking-widest">Accuracy Matching</span>
                        <span className={`text-xl font-black ${isAgedWell ? "text-emerald-400" : "text-red-400"}`}>{h.accuracy}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 6. COMMUNITY VIRAL HOT TAKES SECTOR */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-white text-display flex items-center gap-2">
                🗣️ Viral Discourse takes
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userProfileData.hotTakes.map((take) => (
                  <div key={take.id} className="bg-neutral-950 border border-[#231513] rounded-2xl p-4 flex flex-col justify-between space-y-4 shadow-lg border-l-2 border-l-[#e63917]">
                    <p className="text-xs sm:text-sm text-neutral-300 italic font-medium leading-relaxed">
                      "{take.text}"
                    </p>
                    <div className="flex items-center justify-between text-[10px] border-t border-[#1a1110] pt-2.5 text-neutral-500 font-black uppercase tracking-wider">
                      <button onClick={() => triggerReaction(take.id)} className="flex items-center gap-0.5 text-orange-500 text-[11px] font-mono">
                        <Flame className="w-3.5 h-3.5 fill-current" /> Fire ({take.fire + (fireVotes[take.id] || 0)})
                      </button>
                      <span className="flex items-center gap-0.5 font-sans"><MessageCircle className="w-3 h-3" /> {take.chatter} Comments</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* =========================================================================
              SIDE COLUMNS: ACCLAIM BADGE SHOWCASE & HIGH IMPACT HITS MATRIX
             ========================================================================= */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* 4. BIGGEST HITS & WORST MISSES COMPONENT */}
            <div className="bg-neutral-950 border border-[#2d1b18] rounded-3xl p-5 space-y-4 shadow-xl">
              <h3 className="text-lg font-black uppercase tracking-wide text-white text-display border-b border-[#2d1b18] pb-2">
                Volatility Records
              </h3>

              {/* Peak Hit */}
              <div className="bg-[#121a15] border border-emerald-500/10 p-4 rounded-2xl space-y-2 relative overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">Apex Projection Hit</span>
                  <span className="text-xs font-mono font-black text-emerald-400">{userProfileData.biggestHit.metric}</span>
                </div>
                <div>
                  <h4 className="text-base font-black uppercase text-white text-display">{userProfileData.biggestHit.movie}</h4>
                  <p className="text-[10px] font-mono text-neutral-400">{userProfileData.biggestHit.prediction} • {userProfileData.biggestHit.actual}</p>
                </div>
                <p className="text-[11px] text-neutral-400 leading-normal font-medium italic">"{userProfileData.biggestHit.quote}"</p>
              </div>

              {/* Peak Miss */}
              <div className="bg-[#1c1212] border border-red-500/10 p-4 rounded-2xl space-y-2 relative overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded">Peak Volatility Deficit</span>
                  <span className="text-xs font-mono font-black text-red-400">{userProfileData.worstMiss.metric}</span>
                </div>
                <div>
                  <h4 className="text-base font-black uppercase text-white text-display">{userProfileData.worstMiss.movie}</h4>
                  <p className="text-[10px] font-mono text-neutral-400">{userProfileData.worstMiss.prediction} • {userProfileData.worstMiss.actual}</p>
                </div>
                <p className="text-[11px] text-neutral-400 leading-normal font-medium italic">"{userProfileData.worstMiss.quote}"</p>
              </div>
            </div>

            {/* 5. VERIFIABLE ACCLAIM REPUTATION BADGES SHOWCASE */}
            <div className="bg-neutral-950 border border-[#2d1b18] rounded-3xl p-5 space-y-4 shadow-xl">
              <div>
                <h3 className="text-lg font-black uppercase tracking-wide text-white text-display">Accolade Milestones</h3>
                <p className="text-[10px] text-neutral-500 font-semibold uppercase">Verified capabilities earned via computational precision.</p>
              </div>

              <div className="space-y-3">
                {userProfileData.badges.map((badge) => (
                  <div key={badge.id} className="bg-[#0c0807] border border-[#231512] p-3 rounded-xl flex items-start space-x-3 group hover:border-neutral-800 transition">
                    <span className="text-2xl bg-neutral-950 border border-neutral-800 p-1.5 rounded-lg group-hover:scale-105 transition shrink-0 shadow-inner">
                      {badge.icon}
                    </span>
                    <div className="space-y-0.5">
                      <span className={`text-[9px] font-black uppercase tracking-wider border px-1.5 py-0.2 rounded block w-fit ${badge.color}`}>
                        {badge.label}
                      </span>
                      <p className="text-[10px] text-neutral-400 font-medium leading-tight">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}