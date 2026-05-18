"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, Zap, AlertTriangle, HelpCircle, Award, Flame } from "lucide-react";

interface Badge {
  id: string;
  label: string;
  icon: string;
  rarity: "Legendary" | "Epic" | "Rare" | "Common";
  description: string;
}

interface TrustScoreProps {
  username: string;
  trustIQ: number;            // 0 - 1000 (Predictive Authority Score)
  accuracyRate: number;       // 0 - 100%
  hypeMerchantScore: number;  // 0 - 100% (How much they rely on pure hype vs analytics)
  biasTrend: number;          // -50 (Extreme Bear) to +50 (Extreme Bull)
  badges: Badge[];
}

export default function PredictorTrustScore({ data }: { data: TrustScoreProps }) {
  // Map bias values to human-readable structural designations
  const getBiasLabel = (val: number) => {
    if (val > 25) return { text: "Permabull", color: "text-emerald-400" };
    if (val > 5) return { text: "Leaning Bullish", color: "text-emerald-500/80" };
    if (val < -25) return { text: "Permabear", color: "text-rose-500" };
    if (val < -5) return { text: "Leaning Bearish", color: "text-rose-400/80" };
    return { text: "Mathematical Neutral", color: "text-cyan-400" };
  };

  const biasInfo = getBiasLabel(data.biasTrend);

  return (
    <div className="glass-card w-full max-w-xl rounded-2xl border border-neutral-900 bg-neutral-950 p-6 space-y-8 relative overflow-hidden shadow-2xl">
      {/* Background Decorative Energy Lines */}
      <div className="absolute -right-24 -top-24 w-72 h-72 bg-gradient-to-br from-red-600/10 to-orange-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />

      {/* HEADER SECTION: Trust IQ Core Metric */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-neutral-900">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 block">Predictive Identity</span>
          <h2 className="text-2xl font-black text-white uppercase tracking-wide">@{data.username}</h2>
        </div>
        
        {/* Trust IQ Cyber Badge */}
        <div className="flex items-center gap-3 bg-neutral-900/60 border border-neutral-800/80 p-3 rounded-xl shadow-inner relative group">
          <ShieldCheck className="w-8 h-8 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)] animate-pulse" />
          <div>
            <span className="text-[9px] text-neutral-500 font-black uppercase tracking-widest block">Trust Authority IQ</span>
            <span className="text-xl font-black font-mono tracking-wide text-white bg-gradient-to-r from-white to-neutral-400 text-transparent bg-clip-text">
              {data.trustIQ}
            </span>
          </div>
        </div>
      </div>

      {/* CORE METRICS MATRIX LAYER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Metric A: Accuracy Rate */}
        <div className="bg-neutral-900/30 border border-neutral-900/80 p-4 rounded-xl space-y-2">
          <div className="flex items-center space-x-2 text-neutral-400">
            <Target className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-black uppercase tracking-wider">Projection Accuracy</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black font-mono text-emerald-400 tracking-tighter">{data.accuracyRate}%</span>
            {data.accuracyRate >= 80 && (
              <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded font-bold uppercase">Apex Elite</span>
            )}
          </div>
        </div>

        {/* Metric B: Hype Merchant Index */}
        <div className="bg-neutral-900/30 border border-neutral-900/80 p-4 rounded-xl space-y-2">
          <div className="flex items-center space-x-2 text-neutral-400">
            <Flame className="w-4 h-4 text-red-500" />
            <span className="text-xs font-black uppercase tracking-wider">Hype Merchant Index</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black font-mono text-red-500 tracking-tighter">{data.hypeMerchantScore}%</span>
            <span className="text-[9px] text-neutral-500 font-semibold">
              {data.hypeMerchantScore > 75 ? "Hype over Logic" : data.hypeMerchantScore > 40 ? "Balanced Trader" : "Cold Analyst"}
            </span>
          </div>
        </div>
      </div>

      {/* THE BIAS TREND SLIDER METRIC */}
      <div className="space-y-3 bg-neutral-900/20 p-4 rounded-xl border border-neutral-900">
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
          <span className="text-neutral-500">Structural Bias Tendency</span>
          <span className={`font-black ${biasInfo.color}`}>{biasInfo.text}</span>
        </div>
        
        {/* Custom Visual Slider Field */}
        <div className="relative h-2 w-full bg-neutral-900 rounded-full border border-neutral-800/60 p-[1px]">
          {/* Neutral Center Reference Anchor */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-neutral-700 z-10" />
          
          {/* Dynamic Floating Indicator Core */}
          <motion.div 
            initial={{ left: "50%" }}
            animate={{ left: `${50 + data.biasTrend}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute -top-1 w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 -translate-x-1/2 shadow-[0_0_10px_rgba(239,68,68,0.7)] z-20 border border-white/20"
          />
        </div>
        
        <div className="flex justify-between text-[9px] text-neutral-600 font-black uppercase tracking-widest pt-1">
          <span>Bear Sector (-50)</span>
          <span>True Balanced (0)</span>
          <span>Bull Sector (+50)</span>
        </div>
      </div>

      {/* EARNED REPUTATION BADGES CAROUSEL */}
      <div className="space-y-3.5">
        <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-orange-500" /> Vault Badge Accolades
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {data.badges.map((badge) => (
            <div 
              key={badge.id}
              className="bg-neutral-950/60 border border-neutral-900 p-3 rounded-xl flex flex-col items-center text-center space-y-1.5 hover:border-neutral-800 transition duration-200 relative group"
            >
              <span className="text-2xl drop-shadow-md transform group-hover:scale-110 transition duration-300">{badge.icon}</span>
              <span className="text-[10px] font-black text-white truncate max-w-full leading-tight">{badge.label}</span>
              
              {/* Rarity Tag */}
              <span className={`text-[8px] font-black uppercase tracking-tight px-1.5 py-0.2 rounded-sm ${
                badge.rarity === "Legendary" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                badge.rarity === "Epic" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                badge.rarity === "Rare" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                "bg-neutral-900 text-neutral-500"
              }`}>
                {badge.rarity}
              </span>

              {/* Cinematic Micro-Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-40 p-2 bg-neutral-900 text-[9px] text-neutral-400 rounded-lg border border-neutral-800 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 shadow-2xl font-medium">
                {badge.description}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
const predictorTrustSample = {
  username: "CinematicSniper",
  trustIQ: 894,
  accuracyRate: 88.7,
  hypeMerchantScore: 24, // Low hype index implies pure mathematical tracking
  biasTrend: -8,         // Slightly favors bearish adjustments on structural IP
  badges: [
    {
      id: "b-1",
      label: "Sniper Sight",
      icon: "🎯",
      rarity: "Legendary" as const,
      description: "Hit 5 consecutive box office projections with less than 1.5% margin error."
    },
    {
      id: "b-2",
      label: "Streak Master",
      icon: "🔥",
      rarity: "Epic" as const,
      description: "Maintained a positive accuracy score streak across 10 trading locks."
    },
    {
      id: "b-3",
      label: "Bust Spotter",
      icon: "🐻",
      rarity: "Rare" as const,
      description: "Accurately called out 3 major over-hyped franchise blockbusters that crashed."
    },
    {
      id: "b-4",
      label: "Day 1 Vault",
      icon: "💾",
      rarity: "Common" as const,
      description: "Charter community member with verified predictions logged since system inception."
    }
  ]
};