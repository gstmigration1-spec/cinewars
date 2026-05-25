"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
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
  Activity,
  MessageCircle
} from "lucide-react";

// ==========================================
// 1. DATA LAYERS REFINE: HIGH-ACCURACY PROFILES (75%+)
// ==========================================

const mockMovies = [
  {
    id: "cw-1",
    title: "King",
    poster: "/posters/king.png",
    backdrop: "/posters/king.png",
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
title: "Ramayana",
poster: "/posters/ramayana.png",
backdrop: "/posters/ramayana.png",
releaseDate: "Diwali 2026",
genre: "Mythological Epic",
synopsis: "An ambitious large-scale cinematic retelling of the Ramayana with war, emotion, and mythology at massive scale.",
expectedOpening: "₹90.0 Cr",
expectedLifetime: "₹1200 Cr",
hypeScore: 98,
totalPredictions: 118200,
fanSentiment: "Historic Hype",
communityConfidence: "Very High",
  },
  {
    id: "cw-4",
    title: "Spirit",
    poster: "/posters/Spirit.png",
    backdrop: "/posters/Spirit.png",
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
    timestamp: "2 hours ago",
    trustScore: 890,
    badgeType: "critic-killer",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80"
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
    timestamp: "2 days ago",
    trustScore: 610,
    badgeType: "general",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80"
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
    timestamp: "Just now",
    trustScore: 945,
    badgeType: "oracle",
    backdrop: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=600&q=80"
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
    banterText: "Elite critics called it a 'nuanced artistic triumph'. Early audience reactions looked mixed despite strong advance bookings."
  },
  {
    id: "rc-2",
    type: "UNDERESTIMATED MASS",
    movieTitle: "Nostalgia Returns",
    leftLabel: "TRACK RECORD",
    leftValue: "₹18 Cr Opening",
    rightLabel: "ACTUAL OPENING",
    rightValue: "₹47 Cr",
    status: "TRACKERS WRONG",
    banterText: "Industry trackers relied on standard spreadsheets. Fandom ground-swells triggered 4 AM historical crowds."
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

// FILTERED TO ONLY SHOW HIGH CREDIBILITY 75%+ PROFILES
const mockLeaderboard = [
  { rank: 1, username: "CinemaSniper", avatar: "🎯", trustScore: 945, accuracy: 89.4, streak: 7, badge: "Opening Day Oracle", role: "Weekend Sniper", badgeType: "oracle", recentCall: "Coolie ₹65Cr Day 1" },
  { rank: 2, username: "ReviewRaja", avatar: "👑", trustScore: 890, accuracy: 84.1, streak: 4, badge: "Verified Critic Killer", role: "Critic Hunter", badgeType: "critic-killer", recentCall: "King ₹78Cr Call" },
  { rank: 3, username: "TrackerGuru", avatar: "📊", trustScore: 825, accuracy: 79.8, streak: 12, badge: "Data Tracker Elite", role: "Trade Tracker", badgeType: "tracker", recentCall: "Spirit ₹85Cr Pulse" },
  { rank: 4, username: "MassOracle", avatar: "🎬", trustScore: 785, accuracy: 76.2, streak: 3, badge: "Fan Favorite Oracle", role: "Mass Predictor", badgeType: "fan-favorite", recentCall: "Batwara ₹45Cr Call" }
];

const trustSpotlight = {
  topPredictors: [
    { name: "CinemaSniper", role: "Opening Day Oracle", score: 945, metric: "89.4% Box Office Accuracy Index", avatar: "🎯" },
    { name: "TrackerGuru", role: "Trade Tracker", score: 825, metric: "Near-perfect Box Office Accuracy Rating", avatar: "📊" }
  ],
  reviewerCredibility: [
    { name: "ReviewRaja", role: "Critic Hunter", score: 890, metric: "High Audience Alignment Rating", avatar: "👑" },
    { name: "FilmiFunda", role: "WOM Specialist", score: 780, metric: "Reviewer Reliability Index", avatar: "🍿" }
  ]
};

const marqueeItems = [
  "KING box office accuracy index surging to 95% 🔥",
  "Coolie reviewer reliability index trending across communities 👥",
  "Drishyam 3 prediction trust score rising exponentially 🎯",
  "Spirit track record score exploding over tracking boundaries 💥",
  "WAR 3 opening day audience alignment ratings locked by 12K creators 📈",
  "Alpha critic credibility score tracking upwards 📉"
];

const mockLiveFeed = [
  { id: 1, text: "@MassTracker locked ₹62 Cr for War 3", type: "lock" },
  { id: 2, text: "@RajniEmpire box office accuracy rating upgraded to 91% 👍", type: "upgrade" },
  { id: 3, text: "Coolie reviewer reliability index crossed 12K votes", type: "debate" },
  { id: 4, text: "Spirit audience alignment score exploding 🔥", type: "war" },
  { id: 5, text: "@BoxOfficeGuru hit 4 accurate box office calls in a row", type: "streak" },
  { id: 6, text: "Reviewer reliability score shifting for King 🍿", type: "shift" }
];

const floatingReactions = [
  { emoji: "🔥", x: "12%", y: "25%", delay: 0 },
  { emoji: "🎯", x: "85%", y: "15%", delay: 1.5 },
  { emoji: "🍿", x: "8%", y: "65%", delay: 3 },
  { emoji: "💯", x: "88%", y: "55%", delay: 4.5 }
];

// ==========================================
// 2. STYLING SYSTEM ENHANCEMENTS
// ==========================================

export default function CineWarsHomepage() {
  const [predictionPulse, setPredictionPulse] = useState<Record<string, string>>({});
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);
  const [liveFeed, setLiveFeed] = useState(mockLiveFeed);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveFeed((prev) => {
        const copy = [...prev];
        const first = copy.shift();
        if (first) copy.push(first);
        return copy;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handlePulseVote = (movieId: string, option: string) => {
    setPredictionPulse(prev => ({ ...prev, [movieId]: option }));
  };

  // 5. REVENUE BADGE DECORATOR FUNCTION FOR BALANCED HUES
  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "oracle":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]"; // Gold
      case "critic-killer":
        return "bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]"; // Deep Red
      case "tracker":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]"; // Teal
      case "fan-favorite":
        return "bg-orange-500/10 text-orange-400 border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.1)]"; // Amber
      default:
        return "bg-neutral-800 text-neutral-400 border-neutral-700"; // General Predictor
    }
  };

  const handleAiBanter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setLoadingAi(true);
    setTimeout(() => {
      const q = aiQuestion.toLowerCase();
      if (q.includes("king")) {
        setAiResponse("🎬 [AI CINE-ANALYST]: Shah Rukh Khan's collaboration with Sujoy Ghosh has massive tracking momentum. With the current critic credibility baseline standing at 'Overwhelming Hype', crossing ₹1000 Cr isn't just possible—it's the baseline target if audience alignment holds through weekend one!");
      } else if (q.includes("coolie")) {
        setAiResponse("🎬 [AI CINE-ANALYST]: Calling 'Coolie' overhyped violates historical Lokesh Kanagaraj analytics! The tracking metric effect paired with Rajinikanth's stardom gives it an ironclad Box Office Accuracy Index of 92%. It's built for verifiable footprint records.");
      } else if (q.includes("spirit")) {
        setAiResponse("🎬 [AI CINE-ANALYST]: Historically, Sandeep Reddy Vanga's cinema triggers high critic disconnect. Strong audience alignment rating won't just rescue Spirit; it will completely override mixed reviewer reliability indices, as verified by previous data profiles.");
      } else {
        setAiResponse("🎬 [AI CINE-ANALYST]: Track record metrics analyzed. The prediction trust score for your query indicates high variance. Check the live Hype Ignition Level and lock in your box office call before the official tracking window closes!");
      }
      setLoadingAi(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050303] text-[#f5f5f7] antialiased selection:bg-[#d43f00] selection:text-white pb-16 md:pb-0 relative overflow-x-hidden font-sans">
      
      {/* 8. FJALLA ONE TYPOGRAPHY ENGINE & REFINED PALETTE BACKGROUND */}
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
          box-shadow: 0 10px 28px 0 rgba(0, 0, 0, 0.65);
        }

        .cinema-glow-container {
          box-shadow: 0 0 60px rgba(56, 189, 248, 0.08), inset 0 0 40px rgba(249, 115, 22, 0.04);
        }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        
        .premium-amber-flare {
          background: radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.15) 0%, rgba(230, 57, 23, 0.04) 60%, transparent 100%);
        }
      `}</style>

      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 w-full border-b border-[#231512] bg-[#050303]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-2xl font-black uppercase tracking-wider bg-gradient-to-r from-[#e63917] via-[#f97316] to-[#f5a60b] text-transparent bg-clip-text drop-shadow-[0_4px_12px_rgba(230,57,23,0.5)]">
            <Film className="w-6 h-6 text-[#e63917]" />
            <span className="text-display text-3xl">CineWars</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-neutral-400">
            {[
              { label: "Predictions", href: "#trending" },
              { label: "Rankings", href: "#leaderboard" },
              { label: "Debates", href: "#banter" }
            ].map((item, idx) => (
              <a 
                key={idx}
                href={item.href} 
                className="relative px-5 py-2 rounded-lg transition-all duration-200 hover:text-white hover:bg-neutral-900/40 group tracking-widest font-bold"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-1 left-5 right-5 h-[2px] bg-[#f97316] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center shadow-[0_0_10px_#f97316]" />
              </a>
            ))}
          </div>
          
          <motion.a 
            href="#trending"
            whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(249,115,22,0.5)" }}
            whileTap={{ scale: 0.98 }}
            className="relative group overflow-hidden bg-gradient-to-r from-[#e63917] to-[#f97316] text-[11px] font-black uppercase tracking-widest px-5 py-3 rounded-xl text-white shadow-[0_4px_15px_rgba(230,57,23,0.3)] transition-all duration-300 font-bold"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Join Arena <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
            </span>
          </motion.a>
        </div>
      </nav>

      {/* CORE WRAPPER HUB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20 md:space-y-28 relative z-10">
        
        {/* HERO AREA WITH HIGH-FIDELITY LUXURY LIGHTING */}
        <div className="pt-4">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#160f0e] via-[#050303] to-[#050303] border border-[#2d1a17] p-6 sm:p-8 md:p-16 text-center shadow-2xl cinema-glow-container">
            
            {/* Animated Projector Flares */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050303]/90 via-[#050303]/40 to-transparent" />
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.45, 0.3],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-[#f97316]/12 via-[#e63917]/3 to-transparent blur-[150px] rounded-full pointer-events-none" />

            {/* Floating Social Community Reactions */}
            {floatingReactions.map((reaction, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 0.7, 0], y: [-10, -40, -75] }}
                transition={{ duration: 6, repeat: Infinity, delay: reaction.delay, ease: "easeInOut" }}
                className="absolute hidden sm:block text-xl pointer-events-none filter drop-shadow-[0_2px_10px_rgba(249,115,22,0.35)]"
                style={{ left: reaction.x, top: reaction.y }}
              >
                {reaction.emoji}
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-[#f97316]/10 text-[#f97316] uppercase tracking-widest border border-[#f97316]/20 mb-6 font-bold">
                <Flame className="w-3.5 h-3.5 fill-[#f97316]" /> Movie prediction credibility tracking
              </span>
              
              {/* 1. RESTORE ORIGINAL TAGLINE EXACTLY */}
              <h1 className="text-[2.5rem] sm:text-6xl md:text-8xl font-black uppercase tracking-tight leading-none mb-6 text-display text-white">
              
                Track predictions. <br />
                Rate credibility. <br />
                <span className="bg-gradient-to-r from-[#e63917] via-[#f97316] to-[#f5a60b] text-transparent bg-clip-text drop-shadow-[0_4px_25px_rgba(249,115,22,0.4)]">
                  Settle movie debates.
                </span>
              </h1>
              
              {/* SUPPORTING COPY */}
              <p className="max-w-2xl mx-auto text-neutral-400 text-xs sm:text-[13px] md:text-base font-medium leading-relaxed mb-10">
                Fans predict. Critics react. Trackers call the numbers. CineWars remembers who holds the ultimate box office accuracy rating and resolves the internet's loudest movie debates.
              </p>
              
              {/* HERO SECTION CLEAR INTERACTIVE CTAs */}
              <div className="flex flex-wrap justify-center gap-4 mb-12 relative z-20">
                <motion.a 
                  whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 30px rgba(230,57,23,0.55)" }}
                  whileTap={{ scale: 0.97 }}
                  href="#trending" 
                  className="px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest bg-gradient-to-r from-[#e63917] to-[#f97316] text-white shadow-[0_4px_25px_rgba(230,57,23,0.4)] flex items-center gap-2 font-bold transition-all duration-200"
                >
                  Join the Arena <Zap className="w-4 h-4 fill-current text-amber-300" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05, backgroundColor: "#2b1814" }}
                  whileTap={{ scale: 0.97 }}
                  href="#trending" 
                  className="px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest bg-[#1a0f0d] border border-[#422621] text-neutral-300 font-bold transition-all duration-200"
                >
                  Explore Predictions
                </motion.a>
              </div>

              {/* 1. STATS BAR CARDS & 2. RE-STYLED SENTENCE CASE LABELS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#341d19]">
                {[
                  { count: "2.1M", label: "Predictions made" },
                  { count: "480K", label: "Debates settled" },
                  { count: "92K", label: "Active members" },
                  { count: "14K", label: "Credibility reviews" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-[#1b100e] border-2 border-[#492822] rounded-2xl p-4 text-center relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.6)] group transition-all duration-300 hover:border-[#f97316]/50">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#f97316]/0 to-[#f97316]/4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="block text-3xl sm:text-4xl font-black text-white tracking-tight text-display">
                      {stat.count}
                    </span>
                    <span className="block text-[13px] text-neutral-400 font-medium tracking-wide mt-1.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

            </motion.div>

            {/* LIVE TICKER BELOW HERO */}
            <div className="absolute bottom-0 left-0 right-0 h-9 bg-[#080505] border-t border-[#2d1b18] flex items-center overflow-hidden z-10 select-none">
              <div className="flex w-full overflow-hidden whitespace-nowrap relative">
                <div className="flex gap-10 text-[9px] font-black uppercase tracking-widest text-neutral-400 items-center animate-marquee font-bold">
                  {[...marqueeItems, ...marqueeItems].map((item, index) => (
                    <span key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] shadow-[0_0_8px_#f97316]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
<div className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#120908] border border-[#2d1b18] text-xs text-neutral-300 font-semibold tracking-wide shadow-lg">
  <span className="relative flex h-2.5 w-2.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
  </span>

  <span>
    <strong className="text-orange-400">14,382 fans</strong> debating
    <span className="text-white font-bold"> RAMAYANA </span>
    right now
  </span>
</div>
        {/* 3. IMPROVED LIVE PULSE FEED SECTION WITH GLOW & PULSING DOT */}
        <section className="space-y-4 bg-gradient-to-r from-[#170e0d] to-[#0c0807] border border-[#341d19] rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2.5">
              <div className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 shadow-[0_0_10px_#38bdf8]" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-400 shadow-[0_0_8px_#38bdf8]" />  
              </div>
              <h2 className="text-xs font-black uppercase tracking-widest text-white font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-sky-400" /> What's Trending Right Now
              </h2>
            </div>
            <span className="text-[9px] uppercase tracking-wider bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded border border-emerald-500/20 font-black">
              Live Platform Pulse
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <AnimatePresence mode="popLayout">
              {liveFeed.slice(0, 3).map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  className="p-3 rounded-xl bg-[#090605] border border-[#2b1916] text-xs font-semibold text-neutral-300 flex items-center space-x-2.5 transition duration-300 hover:border-[#f97316]/30"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e63917] shrink-0 shadow-[0_0_6px_#e63917]" />
                  <p className="truncate text-neutral-300 font-medium">{item.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* 6. REDESIGNED USER IDENTITY SPACING PLATFORM & 7. STRUCTURAL INFO FOOTNOTE */}
        <section className="space-y-5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 border-b border-[#2d1b18] pb-3">
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-[#f97316] mb-1 font-bold">Accuracy Spotlights</h3>
              <h2 className="text-3xl font-black uppercase tracking-wider text-white text-display">WHO’S ACTUALLY GETTING IT RIGHT?</h2>
              <p className="text-sm text-neutral-400 mt-2">
  Fans, critics, reviewers, and trackers ranked by long-term prediction accuracy.
</p>
            </div>
            <div className="text-right max-w-md bg-[#120908] border border-[#301c19] p-2.5 rounded-xl">
              <p className="text-[11px] text-neutral-400 font-medium leading-normal">
                ℹ️ <strong className="text-neutral-200">System Calibration:</strong> Accuracy reflects precision hit rate on final collections. Trust Score measures consistency, long-term performance, and community credibility weighting.
              </p>
            </div>
          </div>

          {/* Expanded Card spacing to reduce layout congestion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {mockLeaderboard.map((user) => (
              <motion.div 
                whileHover={{ y: -4, borderColor: "rgba(249,115,22,0.35)" }}
                key={user.rank}
                className="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-5 relative overflow-hidden group shadow-2xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <span className="text-2xl bg-[#0e0a09] p-2.5 rounded-xl border border-[#2d1b18] shadow-inner group-hover:scale-105 transition">
                      {user.avatar}
                    </span>
                    <div>
                      <h4 className="text-sm font-black text-white">@{user.username}</h4>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f97316] block mt-0.5 font-bold">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-neutral-500 bg-neutral-900/60 px-2 py-0.5 rounded border border-neutral-800">Rank #{user.rank}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-[#0a0605]/80 border border-[#2d1b18] p-3 rounded-xl text-center">
                  <div>
                    <span className="text-[9px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5 font-bold">Accuracy</span>
                    <span className="text-sm font-black font-mono text-emerald-400">{user.accuracy}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5 font-bold">Trust Score</span>
                    <span className="text-sm font-black font-mono text-white">{user.trustScore}</span>
                  </div>
                </div>

                {/* 5. MULTI-CATEGORY DECORATED SPECIFIC ACCLAIM BADGES */}
                <div className="text-[11px] border-t border-[#2d1b18] pt-3 flex items-center justify-between text-neutral-400 gap-2">
                  <span className="truncate">Recent: <strong className="text-neutral-200 font-medium">{user.recentCall}</strong></span>
                  <span className={`text-[9px] uppercase tracking-wider border px-2.5 py-1 rounded-lg font-black shrink-0 ${getBadgeStyle(user.badgeType)}`}>
                    {user.badge}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MOVIE PREDICTIONS GRID */}
        <section id="trending" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-wider flex items-center gap-2 text-white text-display">
                🔥 Hot Box Office Calls
              </h2>
              <p className="text-xs text-neutral-500 font-medium">Fandoms are fiercely debating these upcoming titles. Where do you stand?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockMovies.map((movie) => (
              <div key={movie.id} className="glass-card rounded-2xl overflow-hidden border border-[#1f2c3d] bg-neutral-950 flex flex-col h-full group shadow-xl transition-all duration-500 hover:border-sky-400/40 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(56,189,248,0.10)]">
                {/* Backdrop Layer */}
                <div className="relative min-h-[320px] md:h-72 w-full flex items-center justify-center overflow-hidden bg-[#1c110f] overflow-hidden shrink-0">
                  <img
  src={movie.backdrop}
  alt={movie.title}
  className="object-contain w-full h-full max-h-[300px] md:max-h-full transition-all duration-700 ease-out"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050303]/65 via-[#050303]/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#2d1b18] flex items-center gap-1.5 shadow-md">
                    <span className="text-[10px] font-black uppercase text-orange-300 tracking-wider">Confidence: {movie.communityConfidence}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[9px] font-black uppercase bg-[#e63917] text-white px-2 py-0.5 rounded mr-2 font-bold">{movie.genre}</span>
                    <span className="text-xs text-neutral-300 font-bold">{movie.releaseDate}</span>
                  </div>
                </div>

                {/* Content Dashboard Area */}
                <div className="p-4 md:p-5 justify-between space-y-6">
                  <div>
                    <Link href={`/movies/${movie.title.toLowerCase().replace(/\s+/g, "-")}`}>
    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-normal text-white mb-2 text-display group-hover:text-orange-400 transition-colors">
      {movie.title}
    </h3>
  </Link>

  <p className="text-[11px] text-neutral-500 leading-relaxed">
    {movie.synopsis}
  </p>
                  </div>

                  {/* FLAME-BASED IGNITION BAR HYPE METER */}
                  <div className="space-y-2 bg-[#211412]/40 p-3 rounded-xl">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest font-bold">
                      <span className="text-[#f97316] flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-[#f97316] animate-pulse" /> Hype Ignition Level ({movie.hypeScore}%)
                      </span>
                      <span className="text-neutral-400">Sentiment: {movie.fanSentiment}</span>
                    </div>
                    <div className="h-3 w-full bg-[#050303] rounded-full overflow-hidden border border-[#492d27] p-[2px] relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${movie.hypeScore}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#e63917] via-[#f97316] to-[#f5a60b] rounded-full shadow-[0_0_15px_rgba(249,115,22,0.6)] relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-[#0a0605]/40 p-4 rounded-xl text-center font-mono relative overflow-hidden">
                    <div className="border-r border-[#2d1b18]">
                      <span className="text-[9px] text-neutral-500 block uppercase font-black tracking-widest mb-0.5 font-bold">Expected Opening</span>
                      <span className="text-base font-black text-white">{movie.expectedOpening}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-neutral-500 block uppercase font-black tracking-widest mb-0.5 font-bold">Expected Lifetime</span>
                      <span className="text-base font-black text-orange-300">{movie.expectedLifetime}</span>
                    </div>
                  </div>
                   <Link
  href={`/movies/${movie.title.toLowerCase().replace(/\s+/g, "-")}`}
  className="flex items-center justify-center gap-2 py
  -2.5 rounded-xl bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#fb923c] text-white text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.01] transition-all duration-300 shadow-[0_10px_30px_rgba(249,115,22,0.18)] hover:shadow-[0_12px_35px_rgba(56,189,248,0.14)]">
  View Debate <ArrowRight className="w-3.5 h-3.5" />
</Link>
                  {/* Voting Elements */}
                  <div className="pt-2 space-y-2">
                    <span className="text-[10px] text-neutral-400 uppercase font-black tracking-widest block font-bold">Your Provem Calls:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {["Will Flop", "Meet Expectations", "Crush Records"].map((opt) => {
                        const isSelected = predictionPulse[movie.id] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handlePulseVote(movie.id, opt)}
                            className={`py-2 px-1 rounded-lg text-[9px] font-black uppercase tracking-wider text-center border transition ${
                              isSelected
                                ? "bg-gradient-to-r from-[#e63917] to-[#f97316] border-transparent text-white shadow-[0_0_15px_rgba(249,115,22,0.25)] font-bold"
                                : "bg-neutral-950 border-[#2d1b18] text-neutral-500 hover:text-neutral-300 hover:border-neutral-700"
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

        {/* TRUST SCORE SECTION */}
        <section id="trust" className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-orange-500/10 text-orange-500 uppercase tracking-widest border border-orange-500/20 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Track Record Score
            </div>
            <h2 className="text-4xl font-black uppercase tracking-wide text-white text-display">Prediction Trust Scores</h2>
            <p className="text-sm text-neutral-400 font-medium leading-relaxed">
              “Prediction Trust Score reflects how accurate and reliable a critic, reviewer, analyst, tracker, or creator has been over time.”
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Baseless claims and extreme bias drop individual tracking ratings instantly. Trackers and prediction creators preserve their verified scores by keeping their calls closely aligned with actual results.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-950 border border-[#2d1b18] rounded-2xl p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-black uppercase tracking-wider text-orange-400 flex items-center gap-2 font-bold">
                🎯 Critic Credibility Score
              </h3>
              <div className="space-y-3">
                {trustSpotlight.topPredictors.map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-[#1c1210]/50 border border-[#38231f]">
                    <div className="flex items-center space-x-2">
                      <span className="text-base">{p.avatar}</span>
                      <div>
                        <Link href={`/user/${p.name.toLowerCase()}`}>
  <span className="text-xs font-bold text-white block hover:text-orange-400 transition">
    @{p.name}
  </span>
</Link>
                        <span className="text-[10px] text-orange-500 font-black uppercase tracking-wider font-bold">{p.role}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black bg-orange-500/10 border border-orange-500/20 text-orange-400 px-2 py-1 rounded-lg font-mono">{p.score} IQ</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-950 border border-[#2d1b18] rounded-2xl p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#e63917] flex items-center gap-2 font-bold">
                ✍️ Reviewer Reliability Index
              </h3>
              <div className="space-y-3">
                {trustSpotlight.reviewerCredibility.map((p, idx) => (
                  <div
  key={idx}
  className="flex justify-between items-center p-3 rounded-xl border border-[#2a1208] bg-[#120908]"
>
  <div className="flex items-center space-x-2">
    <span className="text-base">{p.avatar}</span>

    <div>
      <Link href={`/user/${p.name.toLowerCase()}`}>
        <span className="text-xs font-bold text-white block hover:text-orange-400 transition">
          @{p.name}
        </span>
      </Link>

      <span className="text-[10px] text-[#f97316] font-black uppercase tracking-wide">
        {p.role}
      </span>
    </div>
  </div>

  <span className="text-xs font-black bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-full text-red-400">
    {p.score}
  </span>
</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROVEN PREDICTIONS SECTION */}
        <section id="calls" className="space-y-6">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-wider flex items-center gap-2 text-white text-display">
              🎬 Proven Predictions
            </h2>
            <p className="text-xs text-neutral-500 font-medium">Screenshot-ready performance sheets tracking who hit the mark and whose claims fell flat.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockBoxOfficeCalls.map((call) => {
              const isAgedWell = call.status === "AGED WELL";
              const isAgedBadly = call.status === "AGED BADLY";
              const isPending = call.status === "PENDING";

              return (
                <div key={call.id} className="glass-card relative rounded-2xl border border-[#3e2622] bg-neutral-950 overflow-hidden shadow-2xl flex flex-col justify-between group transition hover:translate-y-[-4px] hover:border-[#5d3933]">
                  <div className="absolute inset-0 bg-cover bg-center opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url(${call.backdrop})` }} />
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#f97316]/20 to-transparent" />

                  <div className="p-5 space-y-5 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <span className="text-xl bg-[#0e0a09] p-1.5 rounded-lg border border-[#2d1b18]">{call.avatar}</span>
                        <div>
                          <Link href={`/user/${call.username.toLowerCase()}`}>
  <span className="text-xs font-black text-white block hover:text-orange-400 transition">
    @{call.username}
  </span>
</Link>
                          <span className={`text-[9px] border px-2 py-0.2 rounded font-black uppercase tracking-wider ${getBadgeStyle(call.badgeType)}`}>{call.userType}</span>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border bg-neutral-900 text-neutral-400 border-neutral-800">
                        {isAgedWell && <ThumbsUp className="w-3 h-3 text-emerald-400" />}
                        {isAgedBadly && <ThumbsDown className="w-3 h-3 text-red-500" />}
                        {call.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 font-bold">
                        {call.predictionType}
                      </span>
                      <h3 className="text-xl font-black uppercase text-white mt-1.5 truncate text-display">{call.movieTitle}</h3>
                    </div>

                    <div className="bg-[#0c0807]/90 border border-[#2d1b18] rounded-xl p-3 grid grid-cols-2 gap-2 text-center font-mono">
                      <div className="border-r border-[#2d1b18] pr-1">
                        <span className="text-[8px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5 font-bold">Box Office Call</span>
                        <span className="text-sm font-black text-white">{call.predictedValue}</span>
                      </div>
                      <div className="pl-1">
                        <span className="text-[8px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5 font-bold">Actual Result</span>
                        <span className="text-sm font-black text-white">
                          {isPending ? "Tracking..." : call.actualValue}
                        </span>
                      </div>
                    </div>

                    {!isPending && call.accuracy && (
                      <div className="flex items-center justify-between border-t border-[#2d1b18] pt-3">
                        <span className="text-[9px] text-neutral-500 font-black uppercase tracking-wider font-bold">Audience Alignment Score</span>
                        <span className="text-xl font-black font-mono text-emerald-400">{call.accuracy}%</span>
                      </div>
                    )}
                  </div>

                  <div className="relative h-4 w-full flex items-center justify-between pointer-events-none px-1 bg-transparent">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0c0807] border-r border-[#2d1b18] -ml-2 z-20" />
                    <div className="w-full border-t border-dashed border-[#2d1b18]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0c0807] border-l border-[#2d1b18] -mr-2 z-20" />
                  </div>

                  <div className="bg-[#0e0a09] px-4 py-3 flex items-center justify-between border-t border-[#2d1b18] text-[10px] text-neutral-500 font-medium rounded-b-2xl">
                    <span>Reliability Score: <strong className="text-white font-mono">{call.trustScore}</strong></span>
                    <button className="flex items-center space-x-1 font-black uppercase text-neutral-300 hover:text-white transition group/share font-bold">
                      <Share2 className="w-3 h-3 text-orange-500 group-hover/share:scale-110 transition" />
                      <span>Share Call</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. CRITICS GOT IT WRONG PANEL */}
        <section id="reality-check" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-wider flex items-center gap-2 text-white text-display">
                CRITICS GOT IT WRONG
              </h2>
              <p className="text-xs text-neutral-500 font-medium">Moments where reviewer reliability index parameters completely collapsed under general audience tracking tracks.</p>
            </div>
            <span className="text-[10px] px-2 py-1 bg-red-500/10 text-red-500 rounded-lg border border-red-500/20 font-black uppercase tracking-widest font-bold">Pulse Arena 🔥</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockRealityChecks.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -4, borderColor: "rgba(239, 68, 68, 0.35)" }}
                className="bg-neutral-950 border border-[#38231e] rounded-2xl overflow-hidden flex flex-col justify-between p-5 space-y-4 shadow-xl relative group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-[50px] pointer-events-none rounded-full" />
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded border border-[#2d1b18] font-bold">
                      {item.type}
                    </span>
                    <span className="text-[9px] font-black bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 uppercase tracking-wide font-bold">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-wide text-white group-hover:text-orange-400 transition-colors text-display">
                    {item.movieTitle}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#0c0807]/80 rounded-xl p-3 border border-[#2d1b18] text-center items-center font-mono">
                  <div className="border-r border-neutral-800/80 pr-1">
                    <span className="text-[8px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5 font-bold">{item.leftLabel}</span>
                    <span className="text-xs font-black text-red-400 line-clamp-1">{item.leftValue}</span>
                  </div>
                  <div className="pl-1">
                    <span className="text-[8px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5 font-bold">{item.rightLabel}</span>
                    <span className="text-xs font-black text-emerald-400 line-clamp-1 uppercase tracking-wider">{item.rightValue}</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 font-medium leading-relaxed bg-[#1c110e]/40 border border-[#2d1b18] p-3 rounded-xl italic">
                  "{item.banterText}"
                </p>

                <div className="pt-2 border-t border-[#2d1b18] flex justify-between items-center text-[10px]">
                  <span className="text-neutral-600 font-bold">14.5K Claims Disagreed</span>
                  <button className="flex items-center gap-1 font-black uppercase text-orange-400 hover:text-orange-300 transition tracking-wider font-bold">
                    Settle Debate <MessageSquare className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

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

        {/* GLOBAL STANDINGS */}
        <section id="leaderboard" className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-wider flex items-center gap-2 text-white text-display">
                🏆 Global Box Office Accuracy Rankings
              </h2>
              <p className="text-xs text-neutral-500 font-medium">Verified leaderboard tracking structural projection accuracy records over time.</p>
            </div>
            <button className="hidden sm:flex items-center gap-1 text-xs font-black uppercase tracking-wider text-orange-400 hover:text-orange-300 transition font-bold">
              View All Standings <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="glass-card rounded-2xl border border-[#2d1b18] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-950 border-b border-[#2d1b18] text-[10px] font-black uppercase tracking-widest text-neutral-500 font-bold">
                    <th className="p-4 text-center w-16">Rank</th>
                    <th className="p-4">Verified Forecaster</th>
                    <th className="p-4">Calibration Milestone</th>
                    <th className="p-4 text-right">Box Office Accuracy Index</th>
                    <th className="p-4 text-right">Prediction Trust Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2d1b18] text-xs font-medium text-neutral-300">
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
                        <span>@{<Link href={`/user/${user.username.toLowerCase()}`}>
  @{user.username}
</Link>}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border ${getBadgeStyle(user.badgeType)}`}>
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

        {/* AI CINE ANALYST HUB */}
        <section id="ai-analyst" className="glass-card rounded-3xl border border-red-500/10 p-6 md:p-10 relative overflow-hidden bg-gradient-to-tr from-[#0b0807] via-[#1c1210]/30 to-black shadow-2xl">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-orange-500/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black bg-orange-500/10 text-orange-500 uppercase border border-orange-500/20 tracking-wider font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Predictive Credibility Intelligence Engine
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tight text-white text-display">
              Consult the AI Box Office Analyst
            </h2>
            <p className="text-sm text-neutral-400 font-medium leading-relaxed">
              Verify trailing hypotheses against empirical parameters. Query deep tracking metrics, reviewer reliability profiles, and historical audience alignment scores to isolate accurate box office forecasts.
            </p>

            <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-wider font-bold">
              <button onClick={() => setAiQuestion("Can King cross ₹1000 Cr?")} className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-[#2d1b18] text-neutral-400 hover:text-white transition">“Can King cross ₹1000 Cr?”</button>
              <button onClick={() => setAiQuestion("Is Coolie overhyped?")} className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-[#2d1b18] text-neutral-400 hover:text-white transition">“Is Coolie overhyped?”</button>
              <button onClick={() => setAiQuestion("Will WOM save Spirit?")} className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-[#2d1b18] text-neutral-400 hover:text-white transition">“Will WOM save Spirit?”</button>
            </div>

            <form onSubmit={handleAiBanter} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input 
                type="text" 
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Query data: 'Will word of mouth rescue Spirit at the box office?'" 
                className="flex-1 bg-neutral-950 rounded-xl px-4 py-3.5 text-sm text-white border border-[#2d1b18] focus:outline-none focus:border-orange-500 font-medium transition" 
              />
              <button 
                type="submit"
                disabled={loadingAi}
                className="px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-black font-black uppercase text-xs tracking-wider rounded-xl transition shrink-0 disabled:opacity-50 font-bold"
              >
                {loadingAi ? "Auditing parameters..." : "Analyze Track Records"}
              </button>
            </form>

            <AnimatePresence>
              {aiResponse && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-neutral-950/80 border border-[#2d1b18] rounded-xl p-4 mt-4 font-mono text-[11px] text-neutral-300 leading-relaxed border-l-2 border-l-orange-500 shadow-inner"
                >
                  {aiResponse}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="w-full border-t border-[#2d1b18] mt-24 bg-neutral-950/40 py-8 text-center text-xs text-neutral-600 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 CineWars Hub. All data represent gamified movie prediction tracker metrics inside cinematic social networks. No financial components involved.</p>
          <p className="text-[10px] text-neutral-700 font-mono">Reviewer reliability index tracking managed across aggregate historical indicators.</p>
        </div>
      </footer>

      {/* MOBILE INTERACTION NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass-card bg-[#050303]/95 backdrop-blur-xl border-t border-neutral-900 py-2.5 px-6 flex justify-between items-center md:hidden rounded-t-2xl">
        <a href="#" className="flex flex-col items-center justify-center space-y-1 flex-1 text-orange-500">
          <Flame className="w-5 h-5 fill-orange-500/20" />
          <span className="text-[9px] font-black uppercase tracking-tight font-bold">Pulse</span>
        </a>
        <a href="#trust" className="flex flex-col items-center justify-center space-y-1 flex-1 text-neutral-500 hover:text-white">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-tight font-bold">Accuracy</span>
        </a>
        <a href="#calls" className="flex flex-col items-center justify-center space-y-1 flex-1 text-neutral-500 hover:text-white">
          <Award className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-tight font-bold">Proven Calls</span>
        </a>
        <a href="#reality-check" className="flex flex-col items-center justify-center space-y-1 flex-1 text-neutral-500 hover:text-white">
          <AlertTriangle className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-tight font-bold">Track Record</span>
        </a>
      </div>

    </div>
  );
}

