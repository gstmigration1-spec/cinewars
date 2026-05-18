"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Flame, 
  ShieldCheck, 
  Target, 
  TrendingUp, 
  Users, 
  Calendar, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Award, 
  Zap, 
  ArrowRight,
  MessageSquare,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Film,
  X,
  Skull,
  Eye,
  TrendingDown
} from "lucide-react";

// ==========================================
// 1. UPDATED DATA ENGINE WITH NOVEL IDENTITIES
// ==========================================

const mockMovies = [
  {
    id: "cw-1",
    title: "King",
    poster: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&q=80",
    releaseDate: "Dec 24, 2026",
    genre: "Action Thriller",
    synopsis: "The massive action-packed gangster return of Shah Rukh Khan alongside Suhana Khan, directed by Sujoy Ghosh.",
    expectedOpening: "₹78.0 Cr",
    expectedLifetime: "₹850 Cr",
    hypeScore: 95,
    totalPredictions: 64200,
    fanSentiment: "Overwhelming Hype",
    communityConfidence: "High"
  },
  {
    id: "cw-2",
    title: "Batwara 1947",
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=1200&q=80",
    releaseDate: "Aug 13, 2026",
    genre: "Period Drama",
    synopsis: "An intense Partition-era historical epic starring Sunny Deol, tracking a family caught across fracturing borders.",
    expectedOpening: "₹42.5 Cr",
    expectedLifetime: "₹380 Cr",
    hypeScore: 79,
    totalPredictions: 28415,
    fanSentiment: "Highly Anticipated",
    communityConfidence: "Moderate"
  },
  {
    id: "cw-3",
    title: "Coolie",
    poster: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&q=80",
    releaseDate: "Oct 02, 2026",
    genre: "Mass Masala",
    synopsis: "Rajinikanth teams up with Lokesh Kanagaraj for a high-octane, stylish action entertainer.",
    expectedOpening: "₹65.0 Cr",
    expectedLifetime: "₹600 Cr",
    hypeScore: 92,
    totalPredictions: 41900,
    fanSentiment: "Mass Madness",
    communityConfidence: "High"
  },
  {
    id: "cw-4",
    title: "Spirit",
    poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    releaseDate: "Nov 12, 2026",
    genre: "Cop Action Noir",
    synopsis: "Prabhas portrays a fierce, no-nonsense cop in Sandeep Reddy Vanga's dark, gritty action saga.",
    expectedOpening: "₹85.0 Cr",
    expectedLifetime: "₹900 Cr",
    hypeScore: 88,
    totalPredictions: 53100,
    fanSentiment: "Dark & Edgy Hype",
    communityConfidence: "High"
  }
];

const mockBoxOfficeCalls = [
  {
    id: "call-1",
    username: "ReviewRaja",
    avatar: "👑",
    userType: "Critic Hunter",
    movieTitle: "King",
    predictionType: "Opening Day",
    predictedValue: "₹76.5 Cr",
    actualValue: "₹78.0 Cr",
    accuracy: 98.1,
    status: "AGED WELL",
    timestamp: "2 hours ago"
  },
  {
    id: "call-2",
    username: "HypeMerchant",
    avatar: "🔥",
    userType: "Hype Detector",
    movieTitle: "Awarapan 2",
    predictionType: "Lifetime India",
    predictedValue: "₹150 Cr",
    actualValue: "₹45 Cr",
    accuracy: 30.0,
    status: "AGED BADLY",
    timestamp: "2 days ago"
  },
  {
    id: "call-3",
    username: "BoxOfficeSniper",
    avatar: "🎯",
    userType: "Weekend Sniper",
    movieTitle: "Batwara 1947",
    predictionType: "Opening Weekend",
    predictedValue: "₹120 Cr",
    status: "PENDING",
    timestamp: "Just now"
  }
];

const mockRealityChecks = [
  {
    id: "rc-1",
    type: "CRITIC DISCONNECT",
    movieTitle: "Action Dhamaka",
    leftLabel: "CRITIC SCORE",
    leftValue: "4.5 / 5 Stars",
    rightLabel: "AUDIENCE RESPONSE",
    rightValue: "REJECTED",
    status: "CRITICS WRONG",
    banterText: "Elite critics called it a 'nuanced artistic triumph'. Mass audiences left theatres in 15 minutes."
  },
  {
    id: "rc-2",
    type: "UNDERESTIMATED MASS",
    movieTitle: "Nostalgia Returns",
    leftLabel: "TRADE PREDICTION",
    leftValue: "₹18 Cr Opening",
    rightLabel: "ACTUAL OPENING",
    rightValue: "₹47 Cr",
    status: "FANS KNEW IT",
    banterText: "Trade analysts relied on spreadsheets. Fandom ground-swells triggered 4 AM historical crowds."
  },
  {
    id: "rc-3",
    type: "HYPE COLLAPSE",
    movieTitle: "Mega Sequel 4",
    leftLabel: "PRE-RELEASE TAG",
    leftValue: "'Disaster Loading'",
    rightLabel: "ACTUAL RESULT",
    rightValue: "BLOCKBUSTER",
    status: "AGED TERRIBLY",
    banterText: "Viral cancel campaigns trended for months. Movie counters completely shattered historic tracking targets."
  }
];

const mockDebates = [
  {
    id: "deb-1",
    title: "Will Word of Mouth (WOM) save Spirit if the critic reviews are mixed?",
    fandoms: "Prabhas Fans vs Elite Critics",
    replies: 342,
    hotTake: "Vanga's tracks don't need critics. The raw energy will carry it to ₹800 Cr single-handedly."
  },
  {
    id: "deb-2",
    title: "Can 'Coolie' beat the lifetime collection of 'Jailer' in Tamil Nadu?",
    fandoms: "Thalaivar Army vs General Trackers",
    replies: 512,
    hotTake: "Lokesh's direction plus Rajini's swag means Jailer's records are getting shattered in week one."
  },
  {
    id: "deb-3",
    title: "This take aged badly: 'Sunny Deol won't replicate Gadar 2 hype with Batwara 1947'",
    fandoms: "Nostalgia Believers vs Modernists",
    replies: 189,
    hotTake: "People completely underestimated the mass pull of Rajkumar Santoshi pairing with Sunny."
  }
];

const mockLeaderboard = [
  { rank: 1, username: "CinemaSniper", avatar: "🎯", trustScore: 945, accuracy: 89.4, streak: 7, badge: "Opening Day Oracle" },
  { rank: 2, username: "ReviewRaja", avatar: "👑", trustScore: 890, accuracy: 84.1, streak: 4, badge: "Box Office Beast" },
  { rank: 3, username: "TrackerGuru", avatar: "📊", trustScore: 825, accuracy: 79.8, streak: 12, badge: "Trade Tracker" },
  { rank: 4, username: "FandomFiend", avatar: "🔥", trustScore: 610, accuracy: 52.3, streak: -1, badge: "Mass Predictor" },
];

const trustSpotlight = {
  topPredictors: [
    { name: "CinemaSniper", role: "Opening Day Oracle", score: 945, metric: "89.4% Box Office Accuracy" },
    { name: "TrackerGuru", role: "Trade Tracker", score: 825, metric: "Near-perfect Opening Day streaks" }
  ],
  reviewerCredibility: [
    { name: "ReviewRaja", role: "Critic Hunter", score: 890, metric: "High audience alignment rating" },
    { name: "FilmiFunda", role: "WOM Specialist", score: 780, metric: "Consistent word-of-mouth forecasting" }
  ]
};

const marqueeItems = [
  "KING Hype Meter ↑ 89%",
  "Spirit debate volume surging 🔥",
  "Coolie fan wars trending 👥",
  "Drishyam 3 prediction accuracy 91% 🎯",
  "War 3 opening predictions exploding 💥",
  "Welcome To The Jungle tracking collapsed 📉"
];

// ==========================================
// 2. MAIN COMPONENT EXPORT ARCHITECTURE
// ==========================================

export default function CineWarsHomepage() {
  const [predictionPulse, setPredictionPulse] = useState<Record<string, string>>({});
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  const handlePulseVote = (movieId: string, option: string) => {
    setPredictionPulse(prev => ({ ...prev, [movieId]: option }));
  };

  const handleAiBanter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setLoadingAi(true);
    setTimeout(() => {
      const q = aiQuestion.toLowerCase();
      if (q.includes("king")) {
        setAiResponse("🤖 [AI CINE-ANALYST]: Shah Rukh Khan's collaboration with Sujoy Ghosh has massive tracking momentum. With the current fan sentiment standing at 'Overwhelming Hype', crossing ₹1000 Cr isn't just possible—it's the baseline target if word-of-mouth holds through weekend one!");
      } else if (q.includes("coolie")) {
        setAiResponse("🤖 [AI CINE-ANALYST]: Calling 'Coolie' overhyped is a dangerous take in the fan arena! The Lokesh Kanagaraj cinematic universe effect paired with Rajinikanth's stardom gives it an ironclad Hype Meter of 92%. It's built for viral social media footprint.");
      } else if (q.includes("spirit")) {
        setAiResponse("🤖 [AI CINE-ANALYST]: Historically, Sandeep Reddy Vanga's cinema thrives on intense audience debates. Strong word-of-mouth won't just save Spirit; it will completely override mixed critic scores, as seen with previous Vanga tracking profiles.");
      } else {
        setAiResponse("🤖 [AI CINE-ANALYST]: Fandom trends analyzed. The community confidence for your query indicates high volatility. Check the live Hype Meter and lock in your prediction pulse before the official box office tracking closes!");
      }
      setLoadingAi(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050506] text-[#f5f5f7] antialiased selection:bg-red-500 selection:text-white font-sans pb-16 md:pb-0 relative overflow-x-hidden">
      
      {/* GLOBAL GLASSMORPHISM STYLES */}
      <style jsx global>{`
        .glass-card {
          background: rgba(18, 18, 20, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* NAVIGATION BAR WITH PREMIUM EMBEDDED ACTION HUB */}
      <nav className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-neutral-950/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-2xl font-black uppercase tracking-wider bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text drop-shadow-[0_2px_15px_rgba(239,68,68,0.3)]">
            <Film className="w-6 h-6 text-red-500" />
            <span>CineWars</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-xs font-black uppercase tracking-wider text-neutral-400">
            <a href="#trending" className="hover:text-white transition">Trending Predictions</a>
            <a href="#trust" className="hover:text-white transition">Trust Scores</a>
            <a href="#calls" className="hover:text-white transition">Box Office Calls</a>
            <a href="#reality-check" className="hover:text-white transition">Critics Corner</a>
            <a href="#banter" className="hover:text-white transition">Fan Banter</a>
            <a href="#leaderboard" className="hover:text-white transition">Rankings</a>
          </div>
          
          {/* IMPROVED HIGH-FIDELITY ARENA CTA */}
          <motion.button 
            whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(239,68,68,0.45)" }}
            whileTap={{ scale: 0.98 }}
            className="relative group overflow-hidden bg-gradient-to-r from-red-600 to-orange-500 text-xs font-black uppercase tracking-widest px-5 py-3 rounded-xl text-white shadow-[0_0_15px_rgba(239,68,68,0.25)] transition-all duration-300"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-red-500 to-orange-400 blur-sm opacity-40 group-hover:opacity-80 transition duration-300 animate-pulse-slow" />
            <span className="relative z-10 flex items-center gap-1.5">
              Join The Arena <Zap className="w-3.5 h-3.5 fill-current" />
            </span>
          </motion.button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-28">
        
        {/* 1. HERO AREA WITH DYNAMIC AMBIENT PHYSICS */}
        <section className="relative overflow-hidden rounded-3xl bg-neutral-950/40 border border-neutral-900/60 p-6 sm:p-8 md:p-16 text-center shadow-2xl">
          
          {/* Animated Atmospheric Glow Elements */}
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.25, 0.15],
              x: ["-50%", "-48%", "-50%"]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-gradient-to-b from-red-600/20 via-orange-500/5 to-transparent blur-[120px] rounded-full pointer-events-none" 
          />
          <motion.div 
            animate={{ 
              y: [0, -15, 0],
              x: [0, 10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-20 top-10 w-72 h-72 bg-orange-600/5 blur-[90px] rounded-full pointer-events-none"
          />

          {/* Core Text Vector Wrapper */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-orange-500/10 text-orange-500 uppercase tracking-widest border border-orange-500/20 mb-6 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
              <Flame className="w-3.5 h-3.5 fill-orange-500" /> The Ultimate Cinema Fandom Arena
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-none mb-6">
              Where Movie Debates <br />
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text">
                Get Settled For Real.
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-neutral-400 text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-8">
              “The social arena to track predictions, rate credibility, and settle movie debates.” Stop shouting into the void—lock in your box office calls, prove your movie IQ, and track your fandom's collective wisdom.
            </p>
            
            {/* Interactive Hero Actions */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <motion.a 
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#trending" 
                className="px-8 py-4 rounded-xl font-black uppercase text-xs tracking-wider bg-gradient-to-r from-red-600 to-orange-500 hover:opacity-95 transition shadow-[0_4px_25px_rgba(239,68,68,0.35)] flex items-center gap-2 text-white"
              >
                Explore Predictions <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.03, backgroundColor: "rgba(38,38,38,0.8)" }}
                whileTap={{ scale: 0.98 }}
                href="#leaderboard" 
                className="px-8 py-4 rounded-xl font-black uppercase text-xs tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-300 transition"
              >
                View Rankings
              </motion.a>
            </div>

            {/* INTEGRATED PREMIUM SOCIAL PROOF COUNTERS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 border-t border-neutral-900/80">
              {[
                { count: "2.1M", metric: "Predictions Locked" },
                { count: "480K", metric: "Fan Debates" },
                { count: "92K", metric: "Ranked Predictors" },
                { count: "14K", metric: "Credibility Reviews" }
              ].map((stat, i) => (
                <div key={i} className="bg-neutral-950/40 border border-neutral-900/60 rounded-xl p-3 sm:p-4 text-center relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="block text-2xl sm:text-3xl font-black bg-gradient-to-r from-white via-neutral-200 to-neutral-400 text-transparent bg-clip-text font-mono tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                    {stat.count}
                  </span>
                  <span className="block text-[10px] text-neutral-500 uppercase font-black tracking-widest mt-1">
                    {stat.metric}
                  </span>
                </div>
              ))}
            </div>

          </motion.div>

          {/* DYNAMIC PLATFORM ACTIVITY MARQUEE TICKER */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-neutral-950 border-t border-neutral-900 flex items-center overflow-hidden z-10 select-none">
            <div className="flex w-full overflow-hidden whitespace-nowrap relative">
              <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-neutral-400 items-center animate-marquee">
                {/* Duplicate items inside ticker loop to guarantee smooth looping bounds */}
                {[...marqueeItems, ...marqueeItems].map((item, index) => (
                  <span key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* 2. TRENDING MOVIE PREDICTIONS */}
        <section id="trending" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-wider flex items-center gap-2 text-white">
                🔥 Trending Box Office Pulse
              </h2>
              <p className="text-xs text-neutral-500 font-medium">Fandoms are fiercely debating these titles. Where do you stand?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockMovies.map((movie) => (
              <div key={movie.id} className="glass-card rounded-2xl overflow-hidden border border-neutral-900/80 bg-neutral-950 flex flex-col h-full group shadow-xl transition-all duration-300 hover:border-neutral-800">
                {/* Backdrop Container */}
                <div className="relative h-48 w-full bg-neutral-900 overflow-hidden shrink-0">
                  <img src={movie.backdrop} alt={movie.title} className="object-cover w-full h-full opacity-30 group-hover:opacity-40 transition-all duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-neutral-800 flex items-center gap-1.5 shadow-md">
                    <span className="text-[10px] font-black uppercase text-orange-400 tracking-wider">Confidence: {movie.communityConfidence}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[9px] font-black uppercase bg-red-600 text-white px-2 py-0.5 rounded mr-2">{movie.genre}</span>
                    <span className="text-xs text-neutral-300 font-bold">{movie.releaseDate}</span>
                  </div>
                </div>

                {/* Content Details Grid */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-2xl font-black uppercase text-white tracking-wide mb-1 group-hover:text-orange-400 transition-colors">{movie.title}</h3>
                    <p className="text-xs text-neutral-400 font-medium leading-relaxed">{movie.synopsis}</p>
                  </div>

                  {/* Hype Progress Indicators */}
                  <div className="space-y-1.5 bg-neutral-900/30 p-3 rounded-xl border border-neutral-900/60">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-orange-500 flex items-center gap-1">⚡ Hype Meter ({movie.hypeScore}%)</span>
                      <span className="text-neutral-400 font-bold">Sentiment: {movie.fanSentiment}</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-950 rounded-full overflow-hidden border border-neutral-900 p-[1px]">
                      <div className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.4)]" style={{ width: `${movie.hypeScore}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-neutral-900/50 p-3 rounded-xl border border-neutral-900 text-center">
                    <div className="border-r border-neutral-900">
                      <span className="text-[9px] text-neutral-500 block uppercase font-black tracking-widest mb-0.5">Expected Opening</span>
                      <span className="text-base font-black text-white font-mono">{movie.expectedOpening}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-neutral-500 block uppercase font-black tracking-widest mb-0.5">Expected Lifetime</span>
                      <span className="text-base font-black text-orange-500 font-mono">{movie.expectedLifetime}</span>
                    </div>
                  </div>

                  {/* Interactivity Section */}
                  <div className="pt-2 space-y-2">
                    <span className="text-[10px] text-neutral-400 uppercase font-black tracking-widest block">Your Prediction Pulse:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {["Will Flop", "Meet Expectations", "Crush Records"].map((opt) => {
                        const isSelected = predictionPulse[movie.id] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handlePulseVote(movie.id, opt)}
                            className={`py-2 px-1 rounded-lg text-[9px] font-black uppercase tracking-wider text-center border transition ${
                              isSelected
                                ? "bg-gradient-to-r from-red-600 to-orange-500 border-transparent text-white shadow-[0_0_15px_rgba(249,115,22,0.25)]"
                                : "bg-neutral-950 border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:border-neutral-700"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. TRUST SCORE SECTION WITH NOVEL GAMIFIED IDENTITIES */}
        <section id="trust" className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-orange-500/10 text-orange-500 uppercase tracking-widest border border-orange-500/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Credibility Index
            </div>
            <h2 className="text-3xl font-black uppercase tracking-wide text-white">Fandom Trust Scores</h2>
            <p className="text-sm text-neutral-400 font-medium leading-relaxed">
              “Trust Score reflects how accurate and reliable a predictor, reviewer, or analyst has been over time.”
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Baseless claims drop accuracy indices instantly. Reviewers and mass trackers maintain dedicated profiles to safeguard their tracking rank.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Top Predictors Panel */}
            <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-black uppercase tracking-wider text-orange-400 flex items-center gap-2">
                🎯 Top Predictors & Trackers
              </h3>
              <div className="space-y-3">
                {trustSpotlight.topPredictors.map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-neutral-900/40 border border-neutral-900">
                    <div>
                      <span className="text-xs font-bold text-white block">@{p.name}</span>
                      <span className="text-[10px] text-orange-500 font-black uppercase tracking-wider">{p.role}</span>
                    </div>
                    <span className="text-xs font-black bg-orange-500/10 border border-orange-500/20 text-orange-400 px-2 py-1 rounded-lg">{p.score} Score</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviewer Credibility Panel */}
            <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-black uppercase tracking-wider text-red-400 flex items-center gap-2">
                ✍️ Reviewer & Creator Credibility
              </h3>
              <div className="space-y-3">
                {trustSpotlight.reviewerCredibility.map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-neutral-900/40 border border-neutral-900">
                    <div>
                      <span className="text-xs font-bold text-white block">@{p.name}</span>
                      <span className="text-[10px] text-red-400 font-black uppercase tracking-wider">{p.role}</span>
                    </div>
                    <span className="text-xs font-black bg-red-500/10 border border-red-500/20 text-red-400 px-2 py-1 rounded-lg">{p.score} Score</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. BOX OFFICE CALLS SECTION WITH NOVEL IDENTITIES */}
        <section id="calls" className="space-y-6">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-wider flex items-center gap-2 text-white">
              🎬 Verifiable Box Office Calls
            </h2>
            <p className="text-xs text-neutral-500 font-medium">Slips are locked on our timeline. Let's see whose computational predictions held their tracking targets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockBoxOfficeCalls.map((call) => {
              const isAgedWell = call.status === "AGED WELL";
              const isAgedBadly = call.status === "AGED BADLY";
              const isPending = call.status === "PENDING";

              return (
                <div key={call.id} className="glass-card relative rounded-2xl border border-neutral-900 bg-neutral-950 overflow-hidden shadow-2xl flex flex-col group transition hover:translate-y-[-4px]">
                  <div className="p-5 flex-1 space-y-5 relative">
                    
                    {/* User Metadata Profile Block */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">{call.avatar}</span>
                        <div>
                          <span className="text-xs font-black text-white block">@{call.username}</span>
                          <span className="text-[9px] text-orange-500 font-extrabold uppercase tracking-wider bg-orange-500/5 px-1.5 py-0.5 rounded border border-orange-500/10">{call.userType}</span>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border bg-neutral-900 text-neutral-400 border-neutral-800">
                        {isAgedWell && <ThumbsUp className="w-3 h-3 text-emerald-400" />}
                        {isAgedBadly && <ThumbsDown className="w-3 h-3 text-red-500" />}
                        {call.status}
                      </span>
                    </div>

                    {/* Target Fields */}
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                        {call.predictionType}
                      </span>
                      <h3 className="text-lg font-black uppercase text-white mt-1.5 truncate">{call.movieTitle}</h3>
                    </div>

                    {/* Data Matrices */}
                    <div className="bg-neutral-900/40 border border-neutral-900 rounded-xl p-3 grid grid-cols-2 gap-2 text-center font-mono">
                      <div className="border-r border-neutral-900 pr-1">
                        <span className="text-[8px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5">Fan Prediction</span>
                        <span className="text-sm font-black text-white">{call.predictedValue}</span>
                      </div>
                      <div className="pl-1">
                        <span className="text-[8px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5">Actual Result</span>
                        <span className="text-sm font-black text-white">
                          {isPending ? "Tracking..." : call.actualValue}
                        </span>
                      </div>
                    </div>

                    {!isPending && call.accuracy && (
                      <div className="flex items-center justify-between border-t border-neutral-900 pt-3">
                        <span className="text-[9px] text-neutral-500 font-black uppercase tracking-wider">Prediction Accuracy</span>
                        <span className={`text-xl font-black font-mono ${isAgedWell ? "text-emerald-400" : "text-red-500"}`}>{call.accuracy}%</span>
                      </div>
                    )}
                  </div>

                  {/* Edge Spacing */}
                  <div className="relative h-4 w-full flex items-center justify-between pointer-events-none px-1 bg-transparent">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#050506] border-r border-neutral-900 -ml-2 z-20" />
                    <div className="w-full border-t border-dashed border-neutral-800" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#050506] border-l border-neutral-900 -mr-2 z-20" />
                  </div>

                  <div className="bg-neutral-950 px-4 py-3 flex items-center justify-between border-t border-neutral-900/60 text-[10px] text-neutral-500 font-medium">
                    <span>{call.timestamp}</span>
                    <button className="flex items-center space-x-1 font-black uppercase text-neutral-300 hover:text-white transition">
                      <Share2 className="w-3 h-3 text-orange-500" />
                      <span>Share Call</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. NOVEL VIRAL HUB: "CRITICS GOT IT WRONG" CRITICS CORNER HUB */}
        <section id="reality-check" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-wider flex items-center gap-2 text-white">
                ⚠️ Critics Got It Wrong (Reality Check)
              </h2>
              <p className="text-xs text-neutral-500 font-medium">When elitist narratives completely collided head-on with aggregate fan reality metrics.</p>
            </div>
            <span className="text-[10px] px-2 py-1 bg-red-500/10 text-red-500 rounded-lg border border-red-500/20 font-black uppercase tracking-widest">Viral Arena 🔥</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockRealityChecks.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -4, borderColor: "rgba(239, 68, 68, 0.35)" }}
                className="bg-neutral-950 border border-neutral-900/80 rounded-2xl overflow-hidden flex flex-col justify-between p-5 space-y-4 shadow-xl relative group"
              >
                {/* Background Shadow Flare Mapping */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-[50px] pointer-events-none rounded-full" />
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                      {item.type}
                    </span>
                    <span className="text-[9px] font-black bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 uppercase tracking-wide">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-wide text-white group-hover:text-red-400 transition-colors duration-300">
  {item.movieTitle}
</h3>
                </div>

                {/* Conflict Score Breakdown Grid */}
                <div className="grid grid-cols-2 gap-2 bg-neutral-900/40 rounded-xl p-3 border border-neutral-900 text-center items-center">
                  <div className="border-r border-neutral-800/80 pr-1">
                    <span className="text-[8px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5">{item.leftLabel}</span>
                    <span className="text-xs font-black text-red-400 line-clamp-1">{item.leftValue}</span>
                  </div>
                  <div className="pl-1">
                    <span className="text-[8px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5">{item.rightLabel}</span>
                    <span className="text-xs font-black text-emerald-400 line-clamp-1 uppercase tracking-wider">{item.rightValue}</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 font-medium leading-relaxed bg-neutral-900/20 border border-neutral-900/60 p-3 rounded-xl italic">
                  "{item.banterText}"
                </p>

                <div className="pt-2 border-t border-neutral-900/60 flex justify-between items-center text-[10px]">
                  <span className="text-neutral-600 font-bold">14.5K Fans Disagreed</span>
                  <button className="flex items-center gap-1 font-black uppercase text-orange-400 hover:text-orange-300 transition tracking-wider">
                    Settle Debate <MessageSquare className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. FAN BANTER / DEBATE SECTION */}
        <section id="banter" className="space-y-6">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-wider flex items-center gap-2 text-white">
              💬 Trending Fan Wars & Debates
            </h2>
            <p className="text-xs text-neutral-500 font-medium">The public forums are heating up. Settle these arguments with tracking data backing.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mockDebates.map((debate) => (
              <div key={debate.id} className="bg-neutral-950 border border-neutral-900 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-neutral-800 transition shadow-lg">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-wide text-orange-400">
                    <span>👥 {debate.fandoms}</span>
                    <span className="bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">{debate.replies} Replies</span>
                  </div>
                  <h3 className="text-base font-black uppercase text-white leading-snug tracking-wide">{debate.title}</h3>
                </div>

                <div className="bg-neutral-900/40 border border-neutral-900 rounded-xl p-3 relative">
                  <span className="absolute -top-2 left-3 bg-red-600 text-[8px] font-black uppercase tracking-widest px-1.5 rounded text-white">Featured Take</span>
                  <p className="text-xs italic text-neutral-400 font-medium leading-relaxed pt-1">"{debate.hotTake}"</p>
                </div>

                <button className="w-full text-center bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-300 transition">
                  Enter Debate Pit
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 7. LEADERBOARD SECTION WITH NEW USER ARCHETYPES */}
        <section id="leaderboard" className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-wider text-white flex items-center gap-2">
                🏆 Global Fandom Leaderboard
              </h2>
              <p className="text-xs text-neutral-500 font-medium">Rankings of elite movie prediction wizards and verified community trackers.</p>
            </div>
            <button className="hidden sm:flex items-center gap-1 text-xs font-black uppercase tracking-wider text-orange-400 hover:text-orange-300 transition">
              View All Rankings <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="glass-card rounded-2xl border border-neutral-900 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-950 border-b border-neutral-900 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                    <th className="p-4 text-center w-16">Rank</th>
                    <th className="p-4">Predictor</th>
                    <th className="p-4">Earned Identity Accolade</th>
                    <th className="p-4 text-right">Prediction Accuracy</th>
                    <th className="p-4 text-right">Trust Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900/40 text-xs font-medium text-neutral-300">
                  {mockLeaderboard.map((user) => (
                    <tr key={user.rank} className="hover:bg-neutral-900/20 transition-colors">
                      <td className="p-4 text-center font-black">
                        {user.rank === 1 ? (
                          <span className="bg-amber-500/10 border border-amber-500/30 rounded-full px-2 py-0.5 text-amber-400 text-[10px]">#1</span>
                        ) : user.rank === 2 ? (
                          <span className="bg-slate-400/10 border border-slate-400/30 rounded-full px-2 py-0.5 text-slate-300 text-[10px]">#2</span>
                        ) : (
                          `#${user.rank}`
                        )}
                      </td>
                      <td className="p-4 font-bold text-white flex items-center space-x-2">
                        <span className="text-lg">{user.avatar}</span>
                        <span>@{user.username}</span>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
                          {user.badge}
                        </span>
                      </td>
                      <td className="p-4 text-right font-black text-emerald-400 font-mono text-sm">
                        {user.accuracy}%
                        {user.streak > 5 && <Zap className="inline w-3 h-3 text-orange-500 fill-orange-500 ml-1" />}
                      </td>
                      <td className="p-4 text-right font-black text-white font-mono tracking-wide">{user.trustScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 8. AI CINE-ANALYST ASSISTANT HUB */}
        <section id="ai-analyst" className="glass-card rounded-3xl border border-red-500/10 p-6 md:p-10 relative overflow-hidden bg-gradient-to-tr from-neutral-950 via-neutral-900/20 to-black shadow-2xl">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-orange-500/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black bg-orange-500/10 text-orange-500 uppercase border border-orange-500/20 tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Fandom Predictive Intelligence Engine
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              Consult the AI Cine-Analyst
            </h2>
            <p className="text-sm text-neutral-400 font-medium leading-relaxed">
              Test viral fan hypotheses instantly. Query deep learning tracking trends, fan alignment indexes, and historical word-of-mouth forecasting vectors to evaluate upcoming blockbuster performance trends.
            </p>

            <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-wider">
              <button onClick={() => setAiQuestion("Can King cross ₹1000 Cr?")} className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition">“Can King cross ₹1000 Cr?”</button>
              <button onClick={() => setAiQuestion("Is Coolie overhyped?")} className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition">“Is Coolie overhyped?”</button>
              <button onClick={() => setAiQuestion("Will WOM save Spirit?")} className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition">“Will WOM save Spirit?”</button>
            </div>

            <form onSubmit={handleAiBanter} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input 
                type="text" 
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Ask Machine Logic: 'Will word of mouth rescue Spirit at the box office?'" 
                className="flex-1 bg-neutral-950 rounded-xl px-4 py-3.5 text-sm text-white border border-neutral-800 focus:outline-none focus:border-orange-500 font-medium transition" 
              />
              <button 
                type="submit"
                disabled={loadingAi}
                className="px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-black font-black uppercase text-xs tracking-wider rounded-xl transition shrink-0 disabled:opacity-50"
              >
                {loadingAi ? "Analyzing Trend..." : "Analyze Hype Velocity"}
              </button>
            </form>

            <AnimatePresence>
              {aiResponse && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-neutral-950/80 border border-neutral-900 rounded-xl p-4 mt-4 font-mono text-[11px] text-neutral-300 leading-relaxed border-l-2 border-l-orange-500 shadow-inner"
                >
                  {aiResponse}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="w-full border-t border-neutral-900 mt-24 bg-neutral-950/40 py-8 text-center text-xs text-neutral-600 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 CineWars Hub. All calculations represent social fan predictions. No cash prizes or actual financial assets involved.</p>
          <p className="text-[10px] text-neutral-700 font-mono">Fandom credibility indices monitored across historic cinema data parameters.</p>
        </div>
      </footer>

      {/* MOBILE SCREEN BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass-card bg-neutral-950/80 backdrop-blur-lg border-t border-neutral-900 py-2.5 px-6 flex justify-between items-center md:hidden rounded-t-2xl">
        <a href="#" className="flex flex-col items-center justify-center space-y-1 flex-1 text-orange-500">
          <Flame className="w-5 h-5 fill-orange-500/20" />
          <span className="text-[9px] font-black uppercase tracking-tight">Pulse</span>
        </a>
        <a href="#trust" className="flex flex-col items-center justify-center space-y-1 flex-1 text-neutral-500 hover:text-white">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-tight">Trust IQ</span>
        </a>
        <a href="#calls" className="flex flex-col items-center justify-center space-y-1 flex-1 text-neutral-500 hover:text-white">
          <Award className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-tight">Calls</span>
        </a>
        <a href="#reality-check" className="flex flex-col items-center justify-center space-y-1 flex-1 text-neutral-500 hover:text-white">
          <AlertTriangle className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-tight">Checks</span>
        </a>
      </div>

    </div>
  );
}