"use client";

import { motion } from "framer-motion";
import { Flame, ShieldCheck, TrendingUp, TrendingDown, Users, Calendar } from "lucide-react";

interface MovieCardProps {
  title: string;
  poster: string;
  backdrop: string;
  releaseDate: string;
  expectedOpening: string;
  sentimentScore: number; // 0 to 100
  totalPredictions: number;
  bullishPercent: number;
  bearishPercent: number;
  avgTrustScore: number;
}

// VARIATION 1: The Futures Ticket (Horizontal Layout)
export function MovieFuturesTicket({ movie }: { movie: MovieCardProps }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, borderColor: "rgba(249, 115, 22, 0.3)" }}
      transition={{ duration: 0.3 }}
      className="glass-card relative overflow-hidden rounded-2xl border border-neutral-900 bg-gradient-to-r from-neutral-950 via-neutral-900/40 to-neutral-950 p-5 flex flex-col sm:flex-row gap-6 shadow-2xl group"
    >
      {/* Background Glow Effect */}
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-red-500/5 blur-[80px] rounded-full pointer-events-none transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Poster Asset */}
      <div className="w-full sm:w-28 h-40 rounded-xl overflow-hidden relative border border-neutral-800/80 shrink-0 shadow-lg">
        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Analytics Dashboard Grid */}
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl font-black uppercase tracking-wide text-white group-hover:text-orange-400 transition-colors duration-200 truncate max-w-[280px]">
              {movie.title}
            </h3>
            <span className="flex items-center gap-1 text-[11px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" /> {movie.avgTrustScore} IQ
            </span>
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-neutral-500 font-semibold mb-3">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {movie.releaseDate}</span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {movie.totalPredictions.toLocaleString()} Vaulted</span>
          </div>
        </div>

        {/* Dynamic Sentiment Arena */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
            <span className="text-orange-500 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> Bullish ({movie.bullishPercent}%)</span>
            <span className="text-neutral-500 flex items-center gap-0.5">Bearish ({movie.bearishPercent}%) <TrendingDown className="w-3 h-3" /></span>
          </div>
          <div className="h-2 w-full bg-neutral-950 rounded-full overflow-hidden border border-neutral-900 p-[2px]">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${movie.bullishPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.4)]"
            />
          </div>
        </div>

        {/* Financial Metrics Row */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-neutral-900">
          <div>
            <span className="text-[9px] text-neutral-500 block uppercase font-black tracking-widest">Expected Opening</span>
            <span className="text-base font-black bg-gradient-to-r from-white to-neutral-400 text-transparent bg-clip-text font-mono">{movie.expectedOpening}</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-neutral-500 block uppercase font-black tracking-widest">Hype Velocity</span>
            <span className="text-base font-black text-orange-500 flex items-center justify-end gap-1">
              <Flame className="w-4 h-4 fill-orange-500" /> {movie.sentimentScore}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


// VARIATION 2: The Cinematic Arena (Vertical Poster Card Layout)
export function MovieArenaCard({ movie }: { movie: MovieCardProps }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, borderColor: "rgba(239, 68, 68, 0.25)" }}
      transition={{ duration: 0.3 }}
      className="glass-card overflow-hidden rounded-2xl border border-neutral-900/80 bg-neutral-950 flex flex-col h-full group shadow-xl"
    >
      {/* Visual Backdrop Hub */}
      <div className="relative h-44 w-full bg-neutral-900 overflow-hidden shrink-0">
        <img src={movie.backdrop} alt={movie.title} className="object-cover w-full h-full opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
        
        {/* Floating Metrics */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-neutral-800 flex items-center gap-1.5 shadow-md">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] font-black uppercase text-neutral-300 tracking-wider">{movie.avgTrustScore} Trust IQ</span>
        </div>
      </div>

      {/* Dynamic Floating Poster Interface */}
      <div className="px-5 pb-5 pt-2 flex-1 flex flex-col justify-between relative">
        <div className="absolute -top-16 right-5 w-20 h-28 rounded-xl overflow-hidden border border-neutral-800 shadow-2xl z-10 hidden sm:block">
          <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-4">
          <div className="pr-0 sm:pr-24">
            <h3 className="text-lg font-black uppercase text-white tracking-wide leading-tight group-hover:text-red-500 transition-colors duration-200 line-clamp-1">
              {movie.title}
            </h3>
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider flex items-center gap-1 mt-1">
              <Calendar className="w-3 h-3" /> {movie.releaseDate}
            </span>
          </div>

          {/* Dual Multi-Tier Sentiment System */}
          <div className="space-y-1.5 bg-neutral-900/30 p-3 rounded-xl border border-neutral-900/60">
            <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
              <span className="text-emerald-400 flex items-center gap-0.5"><TrendingUp className="w-2.5 h-2.5" /> Bull {movie.bullishPercent}%</span>
              <span className="text-rose-500 flex items-center gap-0.5">Bear {movie.bearishPercent}% <TrendingDown className="w-2.5 h-2.5" /></span>
            </div>
            <div className="h-1.5 w-full bg-neutral-950 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${movie.bullishPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-emerald-500 via-orange-500 to-rose-500 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Predictive Metadata Footing */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-neutral-900 text-center items-center">
          <div className="bg-neutral-900/40 p-2 rounded-xl border border-neutral-900/80">
            <span className="text-[8px] text-neutral-500 block uppercase font-black tracking-widest">Consensus Floor</span>
            <span className="text-xs font-black text-white font-mono">{movie.expectedOpening}</span>
          </div>
          <div className="bg-neutral-900/40 p-2 rounded-xl border border-neutral-900/80">
            <span className="text-[8px] text-neutral-500 block uppercase font-black tracking-widest">Hype Engine</span>
            <span className="text-xs font-black text-orange-500 flex items-center justify-center gap-0.5">
              <Flame className="w-3.5 h-3.5 fill-orange-500" /> {movie.sentimentScore}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
