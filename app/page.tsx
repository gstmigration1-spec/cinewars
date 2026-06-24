"use client";

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import ChampionshipBanner from "@/components/home/ChampionshipBanner";
import ChampionshipMovies from "@/components/home/ChampionshipMovies";


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
  MessageCircle,
  Trophy,
  Search,
  Bell,
} from "lucide-react";

// ==========================================
// 1. DATA LAYERS REFINE: HIGH-ACCURACY PROFILES (75%+)
// ==========================================











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
  const [liveFeed, setLiveFeed] = useState<any[]>([]);
  const marqueeItems = liveFeed.map(
  (item) => item.text
);

  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  
  const [championshipMovies, setChampionshipMovies] = useState<any[]>([]);
  const [dailyChallenge, setDailyChallenge] = useState<any>(null);
  const [dailyPrediction, setDailyPrediction] = useState("");
  const [dailySubmitted, setDailySubmitted] = useState(false);
  const [streak, setStreak] = useState<any>(null);
  const [provenPredictions, setProvenPredictions] = useState<any[]>([]);
  const [terribleMisses, setTerribleMisses] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [bestCalls, setBestCalls] = useState<any[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const [showNotifications, setShowNotifications] =
  
  useState(false);
  const now = new Date();

const previousMonth = new Date(
  now.getFullYear(),
  now.getMonth() - 1,
  1
);

const previousMonthName = previousMonth.toLocaleString(
  "default",
  {
    month: "long",
  }
);
  useEffect(() => {
  const loadCurrentUser = async () => {
    const {
  data: { user },
} = await supabase.auth.getUser();



if (!user) return;
const { data, error } = await supabase
  .from("profiles")
  .select("id, username, welcome_seen")
  .eq("id", user.id)
  .single();
    if (data) {
  setCurrentUser(data);

  const { data: notificationsData } =
    await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_read", false);

  setNotifications(
    notificationsData || []
  );

  if (!data.welcome_seen) {
    setShowWelcomeModal(true);
  }
}

  };

  loadCurrentUser();
}, []);
useEffect(() => {
  const loadStreak = async () => {
    if (!currentUser?.id) return;

    const { data } = await supabase
      .from("daily_streaks")
      .select(
        "current_streak,best_streak"
      )
      .eq("user_id", currentUser.id)
      .single();

    if (data) {
      setStreak(data);
    }
  };

  loadStreak();
}, [currentUser]);
  const [movieSearch, setMovieSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  
  const [heroStats, setHeroStats] = useState({
  predictions: 0,
  debates: 0,
  members: 0,
  votes: 0,
});
const mostDebatedMovie =
  [...trendingMovies].sort(
    (a, b) => (b.debateCount || 0) - (a.debateCount || 0)
  )[0];
async function fetchMovies() {
  try {
    const { data: championship } = await supabase
  .from("movies")
  .select("*")
  .eq("is_championship", true)
  .eq(
    "championship_season",
    "July 2026 Championship"
  );

console.log("CHAMPIONSHIP DATA:", championship);

setChampionshipMovies(championship || []);

    const { data: movies } = await supabase
  .from("movies")
  .select("*")
  .eq("status", "active");

const dbMovies = movies;


/*
const { data, error } = await supabase
  .from("movies")
  .upsert(
    movies.map((movie: any) => ({
      movie_id: movie.title
        .toLowerCase()
        .replace(/\s+/g, "-"),

      tmdb_id: movie.id,

      title: movie.title,

      overview: movie.overview,

      backdrop: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : null,

      language: movie.original_language,

      release_date: movie.release_date,

      status: "active",
    })),
    {
      onConflict: "movie_id",
    }
  );

*/


    const { data: votes } = await supabase
      .from("movie_votes")
      .select("movie_id, vote_type");
      const { data: debates } = await supabase
  .from("movie_debates")
  .select("movie_id");

    const enhancedMovies = (movies || []).map((movie: any) => {
      const movieVotes =
  votes?.filter(
    (vote) =>
      String(vote.movie_id) === String(movie.tmdb_id)
  ) || [];

      const flop = movieVotes.filter(
        (v) => v.vote_type === "Will Flop"
      ).length;

      const expectations = movieVotes.filter(
        (v) => v.vote_type === "Meet Expectations"
      ).length;

      const records = movieVotes.filter(
        (v) => v.vote_type === "Crush Records"
      ).length;
      
      const debateCount = debates?.filter(
  (debate: any) =>
    debate.movie_id ===
    movie.title.toLowerCase().replace(/\s+/g, "-")
).length || 0;
      
      const totalVotes =
  flop + expectations + records;
  

const flopPercent =
  totalVotes > 0
    ? Math.round((flop / totalVotes) * 100)
    : 0;

const expectationsPercent =
  totalVotes > 0
    ? Math.round((expectations / totalVotes) * 100)
    : 0;

const recordsPercent =
  totalVotes > 0
    ? Math.round((records / totalVotes) * 100)
    : 0;

      const score =
        records * 25 +
        expectations * 15 -
        flop * 10;

      let fanSentiment = "Weak Buzz";

      if (score >= 120) {
        fanSentiment = "Historic Hype";
      } else if (score >= 80) {
        fanSentiment = "Explosive Buzz";
      } else if (score >= 40) {
        fanSentiment = "Growing Buzz";
      }

      const hypeScore = Math.max(
  15,
  Math.min(98, score)
);



      return {
  ...movie,
  poster:
  movie.poster || "",

  hypeScore,
  fanSentiment,
  totalPredictions: movieVotes.length,
        debateCount,
        voteBreakdown: {
  flop: flopPercent,
  expectations: expectationsPercent,
  records: recordsPercent,
},
        communityConfidence:
          movieVotes.length > 50
            ? "High"
            : movieVotes.length > 20
            ? "Moderate"
            : "Early Buzz",
      };
    });

    const sortedMovies = enhancedMovies.sort(
  (a: any, b: any) => {
    const scoreA =
  a.hypeScore * 2 +
  a.totalPredictions * 3 +
  a.debateCount * 3;

const scoreB =
  b.hypeScore * 2 +
  b.totalPredictions * 1.5 +
  b.debateCount * 4;

    return scoreB - scoreA;
  }
);
const { data: challenge } = await supabase
  .from("daily_challenges")
  .select(`
    *,
    movies (
      title,
      poster
    )
  `)
  .eq("status", "active")
  .order("challenge_date", { ascending: false })
  .limit(1)
  .single();

setDailyChallenge(challenge);
setTrendingMovies(sortedMovies);
  } catch (error) {
    console.error("TMDB fetch failed:", error);
  }
}

useEffect(() => {
  fetchMovies();

  const loadProvenPredictions = async () => {
  const { data: predictions } = await supabase
    .from("movie_predictions")
    .select("*")
    
    .eq("status", "scored")
    .order("accuracy", {
      ascending: false,
    })
    .limit(6);
    

  if (!predictions) return;
  

  const userIds = predictions.map((p) => p.user_id);
  const movieIds = predictions.map((p) => p.movie_id);

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username")
    .in("id", userIds);

  const { data: movies } = await supabase
  .from("movies")
  .select("movie_id, title")
  .in("movie_id", movieIds);

  const merged = predictions.map((prediction) => ({
    ...prediction,
    username:
      profiles?.find(
        (profile) => profile.id === prediction.user_id
      )?.username || "Anonymous",
      

    movieTitle:
  movies?.find(
    (movie) => movie.movie_id === prediction.movie_id
  )?.title || prediction.movie_id,
  }));
  const scoredCalls = merged.filter(
  (call) =>
    call.accuracy !== null &&
    call.actual_value !== null
);

const bullsEyeCalls = scoredCalls.filter(
  (call) => Number(call.accuracy) >= 70
);

const terribleMissCalls = scoredCalls.filter(
  (call) => Number(call.accuracy) < 40
);

  setProvenPredictions(bullsEyeCalls);

setTerribleMisses(terribleMissCalls);
const now = new Date();

const previousMonth = new Date(
  now.getFullYear(),
  now.getMonth() - 1,
  1
);

const previousMonthCalls = scoredCalls.filter(
  (call) => {
    if (!call.scored_at) return false;

    if (Number(call.accuracy) < 70)
      return false;

    const scored = new Date(call.scored_at);

    return (
      scored.getMonth() === previousMonth.getMonth() &&
      scored.getFullYear() ===
        previousMonth.getFullYear()
    );
  }
);
console.log("Previous Month Calls", previousMonthCalls);
console.log("Count", previousMonthCalls.length);
setBestCalls(
  [...previousMonthCalls]
    .sort(
      (a, b) =>
        Number(b.accuracy) -
        Number(a.accuracy)
    )
    .slice(0, 1)
);
};
const loadLeaderboard = async () => {
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*");

  if (!profiles) return;

  const leaderboardData = [];

  for (const profile of profiles) {
    const { data: predictions } = await supabase
      .from("movie_predictions")
      .select("points, accuracy")
      .eq("user_id", profile.id);

    const { data: streak } = await supabase
  .from("daily_streaks")
  .select("total_streak_bonus")
  .eq("user_id", profile.id)
  .single();

const trustScore =
  (
    predictions?.reduce(
      (sum, p) => sum + (p.points || 0),
      0
    ) || 0
  ) +
  (streak?.total_streak_bonus || 0);

    const scored =
      predictions?.filter(
        (p) => p.accuracy !== null
      ) || [];

    const accuracy =
      scored.length > 0
        ? scored.reduce(
            (sum, p) => sum + Number(p.accuracy),
            0
          ) / scored.length
        : 0;

    leaderboardData.push({
      username: profile.username,
      trustScore,
      accuracy: Number(accuracy.toFixed(2)),
    });
  }

  leaderboardData.sort(
    (a, b) => b.trustScore - a.trustScore
  );

  setLeaderboard(
    leaderboardData.slice(0, 6)
  );
};
const loadLiveFeed = async () => {
  const { data: predictions } = await supabase
    .from("movie_predictions")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(6);

  if (!predictions) return;

  const userIds = predictions.map(
    (p) => p.user_id
  );

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username")
    .in("id", userIds);

  const feed = predictions.map((prediction) => {
    const username =
      profiles?.find(
        (profile) =>
          profile.id === prediction.user_id
      )?.username || "Anonymous";

    return {
      id: prediction.id,
      text:
        prediction.status === "scored"
          ? `@${username} scored ${prediction.accuracy}% accuracy`
          : `@${username} ${
              prediction.prediction_type === "opening_day"
                ? "Opening Day"
                : "Lifetime"
            } call: ₹${prediction.predicted_value} Cr for ${prediction.movie_id}`,
      type:
        prediction.status === "scored"
          ? "scored"
          : "prediction",
    };
  });

  setLiveFeed(feed);
};
const loadHeroStats = async () => {
  const [
    { count: predictions },
    { count: debates },
    { count: members },
    { count: votes },
  ] = await Promise.all([
    supabase
      .from("movie_predictions")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("movie_debates")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("movie_votes")
      .select("*", { count: "exact", head: true }),
  ]);

  setHeroStats({
    predictions: predictions || 0,
    debates: debates || 0,
    members: members || 0,
    votes: votes || 0,
  });
};
loadHeroStats();
  loadProvenPredictions();
  loadLeaderboard();
  loadLiveFeed();
}, []);
useEffect(() => {
  const searchMovies = async () => {
    if (movieSearch.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const { data } = await supabase
      .from("movies")
      .select("movie_id,title")
      .ilike("title", `%${movieSearch}%`)
      .limit(8);

    setSearchResults(data || []);
  };

  const timer = setTimeout(searchMovies, 300);

  return () => clearTimeout(timer);
}, [movieSearch]);
const handlePulseVote = async (movieId: string, option: string) => {
  setPredictionPulse(prev => ({
    ...prev,
    [movieId]: option
  }));
  

  const sessionId =
    localStorage.getItem("cinewars_session") ||
    crypto.randomUUID();

  localStorage.setItem("cinewars_session", sessionId);

  await supabase
  .from("movie_votes")
  .insert([
    {
      movie_id: movieId,
      vote_type: option,
      session_id: sessionId,
    },
  ]);



await fetchMovies();
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
  const getLevel = (trustScore: number) => {
  if (trustScore >= 1000)
    return { name: "Oracle", icon: "👑" };

  if (trustScore >= 500)
    return { name: "Expert", icon: "🦈" };

  if (trustScore >= 250)
    return { name: "Tracker", icon: "🎯" };

  if (trustScore >= 100)
    return { name: "Analyst", icon: "📈" };

  return { name: "Rookie", icon: "🎬" };
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
const submitDailyPrediction = async () => {
  const now = new Date();

const lockTime = new Date();
lockTime.setHours(19, 0, 0, 0);

if (now > lockTime) {
  alert(
    "Daily Challenge is locked after 7:00 PM"
  );
  return;
}
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login first");
    return;
  }

  const { error } = await supabase
    .from("daily_predictions")
    .upsert(
      {
        user_id: user.id,
        movie_id: dailyChallenge.movie_id,
        prediction_date: dailyChallenge.challenge_date,
        predicted_collection: Number(dailyPrediction),
      },
      {
        onConflict:
          "user_id,movie_id,prediction_date",
      }
    );

  if (error) {
    alert(error.message);
    return;
  }
const { error: streakError } = await supabase.rpc(
  "update_daily_streak",
  {
    p_user_id: user.id,
    p_prediction_date:
      dailyChallenge.challenge_date,
  }
);

if (streakError) {
  console.log(
  "STREAK ERROR",
  JSON.stringify(streakError, null, 2)
);
}
  setDailySubmitted(true);
  alert("Prediction Locked!");
};
  return (
  
    <><div className="min-h-screen pt-16 md:pt-0 bg-[#050303] text-[#f5f5f7] antialiased selection:bg-[#d43f00] selection:text-white pb-28 md:pb-0 relative overflow-x-hidden font-sans">
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
      <nav className="sticky top-0 z-50 w-full border-b border-[#fbbf24]/20 bg-black/75 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
  <img
    src="/posters/logo.png"
    alt="CineWars"
    className="h-12 md:h-14 w-auto drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]"
  />

  <div className="leading-none">
    <span className="block text-display text-xl md:text-3xl font-black bg-gradient-to-r from-[#fde047] via-[#f59e0b] to-[#d97706] bg-clip-text text-transparent">
      CineWars
    </span>

    <span className="hidden md:block mt-1 text-[9px] tracking-[0.25em] uppercase text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.7)] font-bold">
      Fan Championship
    </span>
  </div>
</div>

          <div className="hidden md:flex items-center space-x-5 text-sm font-black uppercase tracking-[0.15em]">
            {[
  { label: "Predictions", href: "#trending" },
  { label: "Rankings", href: "/leaderboard" },
  { label: "Debates", href: "/debates" },
  { label: "Archive", href: "/archive" },
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
          <div className="hidden md:block relative">
  <input
    type="text"
    value={movieSearch}
    onChange={(e) => setMovieSearch(e.target.value)}
    placeholder="Search movies..."
    className="w-60 rounded-full border border-[#fbbf24]/25 bg-[#120908]/80 px-5 py-2.5 text-sm text-white placeholder:text-neutral-500 backdrop-blur-md transition-all duration-300 focus:outline-none focus:border-[#fbbf24] focus:shadow-[0_0_18px_rgba(251,191,36,0.45)]"
  />

  {searchResults.length > 0 && (
    <div className="absolute top-14 left-0 w-72 rounded-2xl border border-[#fbbf24]/20 bg-black/95 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden z-50">
      {searchResults.map((movie: any) => (
        <Link
          key={movie.movie_id}
          href={`/movies/${movie.title.toLowerCase().replace(/\s+/g, "-")}`}
          onClick={() => setMovieSearch("")}
          className="block px-4 py-3 text-sm text-neutral-100 hover:text-[#fbbf24] hover:bg-[#fbbf24]/10 transition border-b border-neutral-900 last:border-0"
        >
          {movie.title}
        </Link>
      ))}
    </div>
  )}
</div>

          <button
  onClick={() =>
    setShowNotifications(
      !showNotifications
    )
  }
  className="relative mr-1"
>
  <Bell className="w-5 h-5 text-white" />

  {notifications.length > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
      {notifications.length}
    </span>
  )}
</button>
{showNotifications && (
  <div className="absolute right-20 top-12 w-80 rounded-xl bg-neutral-900 border border-neutral-800 shadow-xl overflow-hidden z-50">

    <div className="px-4 py-3 border-b border-neutral-800 font-black text-sm">
      Notifications
    </div>

    {notifications.length === 0 ? (
      <div className="px-4 py-6 text-center text-neutral-500 text-sm">
        No notifications yet
      </div>
    ) : (
     notifications.map((notification) => (
  <Link
  key={notification.id}
  href={notification.link || "#"}
  className="block px-4 py-3 border-b border-neutral-800 hover:bg-neutral-800 text-sm"
>
  {notification.message}
</Link>
))
    )}
  </div>
)}
            <div className="relative">
  <motion.button
    onClick={() => {
      if (currentUser?.username) {
        setShowDropdown(!showDropdown);
      } else {
  document
    .getElementById("movies")
    ?.scrollIntoView({
      behavior: "smooth",
    });
}
    }}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.98 }}
    className="relative group overflow-hidden bg-gradient-to-r from-[#facc15] via-[#f59e0b] to-[#ea580c] text-[9px] md:text-[11px] font-black uppercase tracking-wider px-3 md:px-5 py-2.5 md:py-3 rounded-xl text-black shadow-[0_0_20px_rgba(251,191,36,0.45)] hover:shadow-[0_0_30px_rgba(251,191,36,0.8)] transition-all duration-300"
  >
    {currentUser?.username ? (
      <span className="tracking-wide">
  👑 @{currentUser.username}
</span>
    ) : (
      <span className="flex items-center gap-1.5">
        Join Arena
        <Zap className="w-3.5 h-3.5 fill-current text-black" />
      </span>
    )}
  </motion.button>

  {showDropdown && currentUser?.username && (
    <div className="absolute right-0 mt-3 w-44 rounded-2xl bg-[#120908]/95 backdrop-blur-xl border border-[#fbbf24]/25 shadow-[0_0_25px_rgba(0,0,0,0.8)] overflow-hidden">
     <button
  onClick={() => {
    window.location.href = `/user/${currentUser.username}`;
  }}
  className="block w-full text-left px-4 py-3 text-neutral-300 hover:text-[#fbbf24] hover:bg-[#fbbf24]/10 transition"
>
  Profile
</button>

      <button
        onClick={async () => {
          localStorage.removeItem("guestUsername");

await supabase.auth.signOut();

window.location.reload();
        }}
        className="w-full text-left px-4 py-3 text-red-400 hover:bg-neutral-800"
      >
        Logout
      </button>
    </div>
  )}
</div>          
        </div>
      </nav>

      {/* CORE WRAPPER HUB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 md:space-y-20 relative z-10">
        <HeroSection />

<ChampionshipBanner />

{dailyChallenge && (
<section className="mt-4 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-[#051015] via-[#07131a] to-[#051015] p-4">

<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

  <div className="flex flex-wrap items-center gap-3">

    <h2 className="text-lg font-black uppercase text-cyan-400">
      🎯 Daily Challenge
    </h2>

    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 font-black text-white">
      {dailyChallenge.movies?.title || dailyChallenge.movie_id}
    </span>

    <span className="text-sm text-neutral-300">
      🔥 {streak?.current_streak || 0} Day Streak
    </span>

    <span className="text-sm text-neutral-300">
      🏆 Best {streak?.best_streak || 0}
    </span>

    <span className="text-sm text-amber-300 font-medium">
  🎁 Weekly Streak Bonus: +20 Points
</span>

  </div>

  {!dailySubmitted ? (
    <div className="flex gap-2 w-full md:w-auto">

      <input
        type="number"
        value={dailyPrediction}
        onChange={(e) => setDailyPrediction(e.target.value)}
        placeholder="₹ Cr"
        className="flex-1 md:w-32 rounded-xl border border-cyan-500/20 bg-black/50 px-3 py-2 text-center"
      />

      <button
        onClick={submitDailyPrediction}
        className="rounded-xl bg-cyan-500 px-4 py-2 font-black text-black whitespace-nowrap"
      >
        Predict
      </button>

    </div>
  ) : (
    <div className="rounded-xl bg-green-500/10 px-4 py-2 text-sm font-bold text-green-400">
      {new Date().getHours() < 19
        ? "✏️ Submitted"
        : "🔒 Locked"}
    </div>
  )}

</div>

</section>
)}

<ChampionshipMovies 
  movies={championshipMovies}
/>

        {/* HERO AREA WITH HIGH-FIDELITY LUXURY LIGHTING */}
        {false && (
<div className="pt-6 md:pt-4">
          <section className="relative rounded-3xl p-5 sm:p-6 md:p-10">

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

            <div className="grid lg:grid-cols-[1fr_560px] gap-10 items-start">  

  <div>

    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-[#3b82f6]/10 text-[#f97316] uppercase tracking-widest border border-[#f97316]/20 mb-6 font-bold">
                <Flame className="w-3.5 h-3.5 fill-[#f97316]" /> Movie prediction credibility tracking
              </span>

              {/* 1. RESTORE ORIGINAL TAGLINE EXACTLY */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none mb-6 text-display text-white">

                Track predictions. <br />
                Rate credibility. <br />
                <span className="bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#60a5fa] text-transparent bg-clip-text drop-shadow-[0_4px_25px_rgba(59,130,246,0.45)]">
                  Settle movie debates.
                </span>
              </h1>

              {/* SUPPORTING COPY */}
              <p className="max-w-2xl mx-auto text-neutral-300 text-xs sm:text-[13px] md:text-base leading-relaxed font-medium leading-relaxed mb-6">
                Fans predict. Critics react. Trackers call the numbers. CineWars remembers who holds the ultimate box office accuracy rating and resolves the internet's loudest movie debates.
              </p>

              {/* HERO SECTION CLEAR INTERACTIVE CTAs */}
              <div className="flex flex-wrap justify-center gap-4 mb-6 relative z-20">
                <motion.a
                  whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 30px rgba(59,130,246,0.55)" }}
                  whileTap={{ scale: 0.97 }}
                  href="#trending"
                  className="px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest bg-gradient-to-r from-[#2563eb] to-[#38bdf8] text-white shadow-[0_4px_25px_rgba(230,57,23,0.4)] flex items-center gap-2 font-bold transition-all duration-200"
                >
                  Join the Arena <Zap className="w-4 h-4 fill-current text-amber-300" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, backgroundColor: "#2b1814" }}
                  whileTap={{ scale: 0.97 }}
                  href="#trending"
                  className="px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest bg-[#1a0f0d] border border-[#fbbf24]/40 text-[#fbbf24] hover:bg-[#fbbf24] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.12)]"
                >
                  Explore Predictions
                </motion.a>
              </div>

              {/* 1. STATS BAR CARDS & 2. RE-STYLED SENTENCE CASE LABELS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-1 border-t border-[#341d19]">
               {[
  {
    count: heroStats.predictions.toLocaleString(),
    label: "Predictions Made",
  },
  {
    count: heroStats.debates.toLocaleString(),
    label: "Debates Created",
  },
  {
    count: heroStats.members.toLocaleString(),
    label: "Community Members",
  },
  {
    count: heroStats.votes.toLocaleString(),
    label: "Votes Cast",
  },
].map((stat, idx) => (
                  <div key={idx} className="bg-gradient-to-b from-[#0d1424] to-[#0a1020] border border-[#1e3a8a] rounded-xl p-2 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/0 to-[#fbbf24]/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="block text-2xl font-black text-white tracking-tight text-display">
                      {stat.count}
                    </span>
                    <span className="block text-[11px] text-neutral-400 font-medium tracking-wide mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
</div>
<div className="flex justify-end items-start pt-0">
  {false && mostDebatedMovie && (
  
   <Link
  href={`/movies/${mostDebatedMovie.title
    .toLowerCase()
    .replace(/\s+/g, "-")}`}
  onClick={() => {
    console.log("CARD CLICKED");
  }}
  className="group w-full max-w-[560px] cursor-pointer"
>
      <div className="rounded-3xl border border-[#2d1b18] bg-[#120908] px-7 pb-7 pt-4 shadow-[0_0_40px_rgba(249,115,22,0.08)] hover:border-orange-500/50 hover:scale-[1.01] transition-all duration-300">

        <div className="text-sm uppercase tracking-[0.15em] text-[#fbbf24] font-black pb-4">
          🔥 Most Debated Right Now
        </div>

        <div className="flex gap-8 items-start mt-1">

  <img
    src={mostDebatedMovie.poster}
    alt={mostDebatedMovie.title}
    className="w-72 h-[430px] rounded-2xl object-contain border border-[#3b1f17] shadow-xl bg-black"
  />

  <div className="flex-1 pt-6">

  <h3 className="text-4xl font-black text-white text-display leading-none">
    {mostDebatedMovie.title}
  </h3>

  <p className="text-neutral-500 mt-4 text-base">
   Currently leading the biggest fan debate
  </p>

  <div className="border-t border-[#2a1a16] my-8"></div>

  <div className="space-y-6">

    <div className="flex items-center justify-between">
      <span className="px-3 py-2 rounded-xl text-neutral-300 transition-all duration-300 hover:text-[#fbbf24] hover:bg-[#fbbf24]/10 hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">
        Debates
      </span>

      <span className="text-orange-400 text-2xl font-black">
        {mostDebatedMovie.debateCount || 0}
      </span>
    </div>

    <div className="flex items-center justify-between">
      <span className="px-3 py-2 rounded-xl text-neutral-300 transition-all duration-300 hover:text-[#fbbf24] hover:bg-[#fbbf24]/10 hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">
        Predictions
      </span>

      <span className="text-cyan-400 text-2xl font-black">
        {mostDebatedMovie.totalPredictions || 0}
      </span>
    </div>

  </div>

</div>
</div>
       

      </div>
    </Link>
  )}
</div>


            </div>


            {/* LIVE TICKER BELOW HERO */}
            <div className="absolute bottom-0 left-0 right-0 h-9 bg-[#080505] border-t border-[#2d1b18] flex items-center overflow-hidden z-10 select-none pointer-events-none">
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
)}
        
      {false && (<div className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#120908] border border-[#2d1b18] text-xs text-white font-semibold tracking-wide shadow-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
          </span>

          <span>
  <strong className="text-orange-400">
    {(trendingMovies as any)?.[0]?.debateCount || 0} fans
  </strong>{" "}
  debating
  <span className="text-white font-bold">
    {" "}
    {(trendingMovies as any)?.[0]?.title?.toUpperCase() || "MOVIES"}{" "}
  </span>
  right now
</span>
        </div>)}
        {/* 3. IMPROVED LIVE PULSE FEED SECTION WITH GLOW & PULSING DOT */}
        <section className="space-y-4 bg-gradient-to-r from-[#170e0d] to-[#0c0807] border border-[#341d19] rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2.5">
              <div className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 shadow-[0_0_10px_#38bdf8]" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
              </div>
              <h2 className="text-xs font-black uppercase tracking-widest text-white font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-sky-400" /> What's Trending Now
              </h2>
            </div>
            <span className="text-[9px] uppercase tracking-wider bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded border border-emerald-500/20 font-black">
              Live Fan Arena
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
        {false && (
<section className="space-y-5">

          <div className="flex items-end justify-between">
            <div>
              <div className="h-px bg-gradient-to-r from-transparent via-[#7f1d1d] to-transparent mb-6" />
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.15em] bg-gradient-to-r from-[#facc15] via-[#fde047] to-[#f59e0b] bg-clip-text text-transparent text-display">
🔥 Hot Upcoming Releases
</h2>

              <p className="text-xs text-neutral-500 mt-1">
                The internet’s most anticipated upcoming movie battles.
              </p>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">

            {trendingMovies.slice(0, 8).map((movie: any) => (

                <Link
                  key={movie.id}
                  href={`/movies/${movie.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="min-w-[180px] max-w-[180px] group"
                >

                  <div className="relative overflow-hidden rounded-2xl border border-[#2d1b18] bg-[#140707] transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-1">

                    <img
  src={movie.poster}
  alt={movie.title}
  className="w-full h-[260px] object-cover transition-transform duration-500 group-hover:scale-105"
/>

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-3">

                      <h3 className="text-sm font-black text-white uppercase line-clamp-2 text-display">
                        {movie.title}
                      </h3>

                      <p className="text-[10px] text-neutral-400 mt-1">
                        {movie.releaseDate || movie.release_date}
                      </p>

                      <div className="mt-2 flex items-center justify-between">

                        <span
                          className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${movie.hypeScore >= 75
                              ? "bg-cyan-500/20 text-cyan-300"
                              : movie.hypeScore >= 40
                                ? "bg-amber-500/20 text-amber-300"
                                : "bg-red-500/20 text-red-300"}`}
                        >
                          {movie.hypeScore >= 75
                            ? "Explosive Buzz"
                            : movie.hypeScore >= 40
                              ? "Strong Momentum"
                              : "Weak Buzz"}
                        </span>

                        <span className="text-[10px] text-white font-black">
                          {movie.hypeScore}%
                        </span>

                      </div>
                    </div>
                  </div>

                </Link>
              ))}

          </div>
        </section>)}
       {false && (
<section id="trending" className="space-y-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.15em] bg-gradient-to-r from-[#facc15] via-[#fde047] to-[#f59e0b] bg-clip-text text-transparent text-display">

                
                🔥 Hot Box Office Calls
              </h2>
              <p className="text-xs text-neutral-500 font-medium">Fandoms are fiercely debating these upcoming titles. Where do you stand?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingMovies.slice(0, 4).map((movie: any, index) => (
              
              
              <div key={movie.id} className="glass-card rounded-2xl overflow-hidden border border-[#1f2c3d] bg-neutral-950 flex flex-col h-full group shadow-xl transition-all duration-500 hover:border-sky-400/40 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(56,189,248,0.10)]">
                {/* Backdrop Layer */}
                <div className="relative min-h-[200px] md:h-60 w-full flex items-center justify-center overflow-hidden bg-[#1c110f] overflow-hidden shrink-0">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="object-contain w-full h-full max-h-[240px] md:max-h-full transition-all duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050303]/65 via-[#050303]/20 to-transparent" />

                  <div className="absolute top-4 left-4 flex flex-col gap-2">

                    {/* Trending Rank */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-lg shadow-[0_0_20px_rgba(249,115,22,0.35)] border border-orange-300/20">
                      <span className="text-[10px] font-black uppercase tracking-wider text-white">
                        #{index + 1} Trending
                      </span>
                    </div>

                    {/* Confidence Badge */}
                    <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#2d1b18] flex items-center gap-1.5 shadow-md">
                      <span className="text-[10px] font-black uppercase text-orange-300 tracking-wider">
                        Confidence: {movie.communityConfidence}
                      </span>
                    </div>

                  </div>
                  <div className="absolute bottom-4 left-4 space-y-2">

                    <div className="flex items-center gap-2 flex-wrap">

                      <span className="text-[9px] font-black uppercase bg-[#e63917] text-white px-2 py-0.5 rounded font-bold">
                        {movie.genre}
                      </span>

                      <span className="text-xs text-neutral-300 font-bold">
                        {movie.releaseDate || movie.release_date}
                      </span>

                    </div>

                    <div className="flex items-center gap-2 flex-wrap">

                      {movie.totalPredictions >= 25 && (
                        <span className="text-[9px] font-black uppercase px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/20">
                          🚀 Rising Fast
                        </span>
                      )}

                      {movie.hypeScore >= 75 && (
                        <span className="text-[9px] font-black uppercase px-2 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/20">
                          🔥 Fan War Active
                        </span>
                      )}

                    </div>

                  </div>
                </div>

                {/* Content Dashboard Area */}
                <div className="p-3 md:p-4 justify-between space-y-4">
                  <div>
                    <Link href={`/movies/${movie.title.toLowerCase().replace(/\s+/g, "-")}`}>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-normal text-white mb-2 text-display group-hover:text-orange-400 transition-colors">
                        {movie.title}
                      </h3>
                    </Link>

                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      {movie.synopsis || movie.overview}
                    </p>
                  </div>

                  {/* FLAME-BASED IGNITION BAR HYPE METER */}
                  <div className="space-y-2 bg-[#211412]/40 p-3 rounded-xl">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest font-bold">
                      <span className="text-[#f97316] flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-[#f97316] animate-pulse" /> Hype Ignition Level ({movie.hypeScore}%)
                      </span>
                      <span className="px-3 py-2 rounded-xl text-neutral-300 transition-all duration-300 hover:text-[#fbbf24] hover:bg-[#fbbf24]/10 hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">Sentiment: {movie.fanSentiment}</span>
                    </div>
                    <div className="h-3 w-full bg-[#050303] rounded-full overflow-hidden border border-[#492d27] p-[2px] relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${movie.hypeScore}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className={`h-full rounded-full relative overflow-hidden ${movie.hypeScore < 50
                            ? "bg-gradient-to-r from-red-900 via-red-700 to-red-500 shadow-[0_0_30px_rgba(239,68,68,0.95)]"
                            : movie.hypeScore < 75
                              ? "bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-400 shadow-[0_0_30px_rgba(251,191,36,0.95)]"
                              : "bg-gradient-to-r from-emerald-500 via-cyan-400 to-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.95)]"}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-[#0a0605]/40 p-4 rounded-xl text-center font-mono relative overflow-hidden">

                    <div className="border-r border-[#2d1b18]">
                      <span className="text-[9px] text-neutral-500 block uppercase font-black tracking-widest mb-1">
                        Total Predictions
                      </span>

                      <span className="text-base font-black text-white">
                        {movie.totalPredictions || 0}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] text-neutral-500 block uppercase font-black tracking-widest mb-1">
                        Community Verdict
                      </span>

                      <span
                        className={`text-sm font-black uppercase tracking-wide ${movie.hypeScore >= 75
                            ? "text-cyan-400"
                            : movie.hypeScore >= 40
                              ? "text-amber-400"
                              : "text-red-400"}`}
                      >
                        {movie.hypeScore >= 75
                          ? "🔥 Explosive Buzz"
                          : movie.hypeScore >= 40
                            ? "⚡ Strong Momentum"
                            : "🚨 Weak Buzz"}
                      </span>
                    </div>

                  </div>
                  <div className="grid grid-cols-2 gap-2">
  <Link
    href={`/movies/${movie.title.toLowerCase().replace(/\s+/g, "-")}`}
className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1a0f0d] border border-[#fbbf24]/40 text-[#fbbf24] text-[10px] font-black uppercase tracking-[0.15em] hover:bg-[#fbbf24] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.12)]"
  >
    Debate
  </Link>

  <Link
    href={`/movies/${movie.title.toLowerCase().replace(/\s+/g, "-")}`}
    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-500 text-white text-[10px] font-black uppercase tracking-[0.15em] hover:scale-[1.01] transition-all duration-300"
  >
    🎯 Predict
  </Link>
</div>
                  <div className="space-y-2 bg-[#120908]/50 border border-[#2d1b18] rounded-xl p-3">

                    <div className="flex items-center justify-between text-[9px] uppercase tracking-widest font-black text-neutral-500">
                      <span>Community Split</span>
                      <span>{movie.totalPredictions || 0} Votes</span>
                    </div>

                    <div className="space-y-2">

                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-cyan-400 font-bold">
                            🚀 Crush Records
                          </span>
                          <span className="text-white font-black">
                            {movie.voteBreakdown?.records || 0}%
                          </span>
                        </div>

                        <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-sky-400"
                            style={{
                              width: `${movie.voteBreakdown?.records || 0}%`,
                            }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-amber-400 font-bold">
                            ⚡ Meet Expectations
                          </span>
                          <span className="text-white font-black">
                            {movie.voteBreakdown?.expectations || 0}%
                          </span>
                        </div>

                        <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-400"
                            style={{
                              width: `${movie.voteBreakdown?.expectations || 0}%`,
                            }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-red-400 font-bold">
                            🚨 Will Flop
                          </span>
                          <span className="text-white font-black">
                            {movie.voteBreakdown?.flop || 0}%
                          </span>
                        </div>

                        <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-red-700 to-red-500"
                            style={{
                              width: `${movie.voteBreakdown?.flop || 0}%`,
                            }} />
                        </div>
                      </div>

                    </div>
                  </div>
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
                            className={`py-2 px-1 rounded-lg text-[9px] font-black uppercase tracking-wider text-center border transition ${isSelected
                                ? opt === "Will Flop"
                                  ? "bg-gradient-to-r from-red-900 via-red-700 to-red-500 text-white border-transparent shadow-[0_0_22px_rgba(239,68,68,0.75)] font-bold"
                                  : opt === "Meet Expectations"
                                    ? "bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-400 text-black border-transparent shadow-[0_0_22px_rgba(251,191,36,0.7)] font-bold"
                                    : "bg-gradient-to-r from-emerald-500 via-cyan-400 to-sky-400 text-white border-transparent shadow-[0_0_22px_rgba(56,189,248,0.7)] font-bold"
                                : "bg-neutral-950 border-[#2d1b18] text-neutral-500 hover:text-neutral-300 hover:border-neutral-700"}`}
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
)}


        {/* 6. REDESIGNED USER IDENTITY SPACING PLATFORM & 7. STRUCTURAL INFO FOOTNOTE */}
      {false && (
<section className="space-y-5">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 border-b border-[#2d1b18] pb-3">
    <div>
      <h3 className="text-[11px] font-black uppercase tracking-widest text-[#f97316] mb-1 font-bold">
        Accuracy Spotlights
      </h3>

      <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.15em] bg-gradient-to-r from-[#facc15] via-[#fde047] to-[#f59e0b] bg-clip-text text-transparent text-display">
        WHO'S ACTUALLY GETTING IT RIGHT?
      </h2>

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
            {leaderboard.slice(0,3).map((user, index) => (
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(249,115,22,0.35)" }}
                key={index + 1}
                className="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-5 relative overflow-hidden group shadow-2xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl border border-[#2d1b18] bg-[#0e0a09] flex items-center justify-center text-orange-400 font-black">
  {index + 1}
</div>
                    <div>
  <h4 className="text-sm font-black text-white">
  <Link
    href={`/user/${user.username}`}
    className="hover:text-orange-400 transition-colors"
  >
    @{user.username}
  </Link>
</h4>
  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f97316] block mt-0.5">
    {getLevel(user.trustScore).icon} {getLevel(user.trustScore).name}
  </span>
</div>
                  </div>
<span className="text-xs font-mono font-black text-neutral-500 bg-neutral-900/60 px-2 py-0.5 rounded border border-neutral-800">
  Rank #{index + 1}
</span>                </div>

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
  <span>
    {user.trustScore >= 50
      ? "🦈 Box Office Shark"
      : "🎬 Rising Predictor"}
  </span>

  <span className="text-[9px] uppercase tracking-wider border px-2.5 py-1 rounded-lg font-black shrink-0 border-orange-500/30 text-orange-400">
    {user.accuracy >= 90
      ? "Oracle"
      : user.accuracy >= 75
      ? "Verified"
      : "Active"}
  </span>
</div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center pt-6">
            <Link
              href="/leaderboard"
              className="px-6 py-3 rounded-xl border border-orange-500/30 text-orange-400 font-black uppercase tracking-widest hover:bg-orange-500/10 transition"
            >
              View Full Rankings →
            </Link>
          </div>

        </section>)}
        
        {false && (
<section className="space-y-5">

          <div className="flex items-end justify-between">
            <div>
              <div className="h-px bg-gradient-to-r from-transparent via-[#7f1d1d] to-transparent mb-6" />
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.15em] bg-gradient-to-r from-[#facc15] via-[#fde047] to-[#f59e0b] bg-clip-text text-transparent text-display">
  🔥 Most Active Fan Wars
</h2>

              <p className="text-xs text-neutral-500 mt-1">
                Movies generating the internet’s loudest fandom battles right now.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {[...trendingMovies]
              .sort(
                (a: any, b: any) => (b.debateCount || 0) -
                  (a.debateCount || 0)
              )
              .slice(0, 3)
              .map((movie: any, index) => (

                <Link
                  key={movie.id}
                  href={`/movies/${movie.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group"
                >

                  <div className="relative overflow-hidden rounded-2xl border border-[#4a1d1d] bg-[#140707] p-5 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1">

                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-start justify-between relative z-10">

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-orange-400 font-black mb-2">
                          #{index + 1} Fan War
                        </p>

                        <h3 className="text-xl font-bold text-white tracking-wide leading-tight">
                          {movie.title}
                        </h3>

                        <p className="text-xs text-neutral-500 mt-2">
                          {movie.debateCount || 0} active debates
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-3xl">🔥</span>
                      </div>

                    </div>

                    <div className="mt-5 h-2 rounded-full bg-black/40 overflow-hidden">

                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                        style={{
                          width: `${Math.min(
                            100,
                            (movie.debateCount || 0) * 8
                          )}%`,
                        }} />

                    </div>

                  </div>

                </Link>

              ))}

          </div>

        </section>)}
        {/* MOVIE PREDICTIONS GRID */}
        
      
        

        {/* PROVEN PREDICTIONS SECTION */}
        <section id="calls" className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl tracking-wider flex items-center gap-2 text-[#fbbf24] text-display">
  <div className="h-px bg-gradient-to-r from-transparent via-[#7f1d1d] to-transparent mb-8" />
  🎯 Hit The Bull's Eye
</h2>

<p className="text-xs text-neutral-500 font-medium">
  The community members who came closest to nailing the final box office outcome.
</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {provenPredictions.map((call) => {
              const isAgedWell = call.status === "AGED WELL";
              const isAgedBadly = call.status === "AGED BADLY";
              const isPending = call.status === "PENDING";

              return (
                <div key={call.id} className="glass-card relative rounded-2xl border border-[#3e2622] bg-neutral-950 overflow-hidden shadow-2xl flex flex-col justify-between group transition hover:translate-y-[-4px] hover:border-[#5d3933]">
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#f97316]/20 to-transparent" />

                                      <div className="p-5 space-y-5 relative z-10">
  <div className="flex items-center justify-between">
    <div>
      <Link
  href={`/user/${call.username}`}
  className="text-xs font-black text-white block hover:text-orange-400"
>
  @{call.username}
</Link>
      <span className="text-[9px] border px-2 py-0.5 rounded font-black uppercase tracking-wider text-orange-400 border-orange-500/30">
        {call.prediction_type}
      </span>
    </div>

    <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border bg-neutral-900 text-neutral-400 border-neutral-800">
      {call.status}
    </span>
  </div>

  <div>
    <h3 className="text-lg font-bold text-white mt-1.5 tracking-wide">
      {call.movieTitle}
    </h3>
  </div>

  <div className="bg-[#0c0807]/90 border border-[#2d1b18] rounded-xl p-3 grid grid-cols-2 gap-2 text-center font-mono">
    <div className="border-r border-[#2d1b18] pr-1">
      <span className="text-[8px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5">
        Predicted
      </span>

      <span className="text-sm font-black text-white">
        ₹{call.predicted_value}
      </span>
    </div>

    <div className="pl-1">
      <span className="text-[8px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5">
        Actual
      </span>

      <span className="text-sm font-black text-white">
        ₹{call.actual_value}
      </span>
    </div>
  </div>

  <div className="flex items-center justify-between border-t border-[#2d1b18] pt-3">
    <span className="text-[9px] text-neutral-500 font-black uppercase tracking-wider">
      Accuracy
    </span>

    <span className="text-xl font-black font-mono text-emerald-400">
      {call.accuracy?.toFixed(2)}%
    </span>
  </div>
</div>

                  <div className="relative h-4 w-full flex items-center justify-between pointer-events-none px-1 bg-transparent">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0c0807] border-r border-[#2d1b18] -ml-2 z-20" />
                    <div className="w-full border-t border-dashed border-[#2d1b18]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0c0807] border-l border-[#2d1b18] -mr-2 z-20" />
                  </div>

                  <div className="bg-[#0e0a09] px-4 py-3 flex items-center justify-between border-t border-[#2d1b18] text-[10px] text-neutral-500 font-medium rounded-b-2xl">
  <span>
    Points: <strong className="text-white">{call.points}</strong>
  </span>

  <button
  onClick={async () => {
    const shareText = `🚨 BOX OFFICE ORACLE ALERT 🚨

🏆 VERIFIED CALL

🎬 ${
  (call.movieTitle || call.movie_id)
    ?.split("-")
    .map(
      (word: string) => 
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ")
}

💰 Predicted: ₹${call.predicted_value} Cr
🎯 Actual: ₹${call.actual_value} Cr

⚡ Accuracy: ${call.accuracy?.toFixed(2)}%

👤 @${call.username} nailed this prediction.

Think you can predict better?

🔥 Join CineWars:
https://www.thecinewars.com/user/${call.username}`;
    if (navigator.share) {
      await navigator.share({
        title: "CineWars Best Call",
        text: shareText,
      });
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("Copied to clipboard!");
    }
  }}
  className="flex items-center space-x-1 font-black uppercase text-neutral-300 hover:text-white transition group/share font-bold"
>
  <Share2 className="w-3 h-3 text-orange-500 group-hover/share:scale-110 transition" />
  <span>Share Verified Call</span>
</button>
</div>  
                  </div>
              );
            })}
          </div>
        </section>
<section className="space-y-6">
  <div>
    <h2 className="text-2xl md:text-3xl tracking-wider flex items-center gap-2 text-[#fbbf24] text-display">
     <div className="h-px bg-gradient-to-r from-transparent via-[#7f1d1d] to-transparent mb-8" />
      💀 Terrible Misses
    </h2>

    <p className="text-xs text-neutral-500 font-medium">
      The predictions that missed the mark by a mile.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {terribleMisses.map((call) => {
      return (
        <div
          key={call.id}
          className="glass-card relative rounded-2xl border border-red-900/40 bg-neutral-950 overflow-hidden shadow-2xl flex flex-col justify-between group transition hover:translate-y-[-4px] hover:border-red-500/50"
        >
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

          <div className="p-5 space-y-5 relative z-10">

            <div className="flex items-center justify-between">
              <div>
                <Link
                  href={`/user/${call.username}`}
                  className="text-xs font-black text-white block hover:text-red-400"
                >
                  @{call.username}
                </Link>

                <span className="text-[9px] border px-2 py-0.5 rounded font-black uppercase tracking-wider text-red-400 border-red-500/30">
                  {call.prediction_type}
                </span>
              </div>

              <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border bg-neutral-900 text-red-400 border-red-500/20">
                MISS
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mt-1.5 tracking-wide">
                {call.movieTitle}
              </h3>
            </div>

            <div className="bg-[#0c0807]/90 border border-[#2d1b18] rounded-xl p-3 grid grid-cols-2 gap-2 text-center font-mono">

              <div className="border-r border-[#2d1b18] pr-1">
                <span className="text-[8px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5">
                  Predicted
                </span>

                <span className="text-sm font-black text-white">
                  ₹{call.predicted_value}
                </span>
              </div>

              <div className="pl-1">
                <span className="text-[8px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5">
                  Actual
                </span>

                <span className="text-sm font-black text-white">
                  ₹{call.actual_value}
                </span>
              </div>

            </div>

            <div className="flex items-center justify-between border-t border-[#2d1b18] pt-3">
              <span className="text-[9px] text-neutral-500 font-black uppercase tracking-wider">
                Accuracy
              </span>

              <span className="text-xl font-black font-mono text-red-400">
                {call.accuracy?.toFixed(2)}%
              </span>
            </div>

          </div>

          <div className="bg-[#0e0a09] px-4 py-3 flex items-center justify-between border-t border-[#2d1b18] text-[10px] text-neutral-500 font-medium rounded-b-2xl">
            <span>
              Points: <strong className="text-white">{call.points}</strong>
            </span>

            <span className="text-red-400 font-black uppercase tracking-wider">
              💀 Terrible Miss
            </span>
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
              <h2 className="text-2xl md:text-3xl tracking-wider flex items-center gap-2 text-[#fbbf24] text-display">
  <div className="h-px bg-gradient-to-r from-transparent via-[#7f1d1d] to-transparent mb-8" />
  🏆 {previousMonthName} Call Of The Month
</h2>
<p className="text-xs text-neutral-500 font-medium">
  Updated during the first week of every month based on the highest-rated verified prediction from the previous month.
</p>
              <p className="text-xs text-neutral-500 font-medium">
  The most accurate box office predictions made by the CineWars community.
</p>
            </div>
<span className="text-[10px] px-2 py-1 bg-orange-500/10 text-orange-400 rounded-lg border border-orange-500/20 font-black uppercase tracking-widest">
  Hall Of Fame 🏆
</span>          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestCalls.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4, borderColor: "rgba(239, 68, 68, 0.35)" }}
                className="bg-neutral-950 border border-[#38231e] rounded-2xl overflow-hidden flex flex-col justify-between p-5 space-y-4 shadow-xl relative group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-[50px] pointer-events-none rounded-full" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Link
  href={`/user/${item.username}`}
  className="text-[9px] font-black uppercase tracking-widest text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded border border-[#2d1b18] font-bold hover:text-orange-400 transition-colors"
>
  @{item.username}
</Link>
                    <span className="text-[9px] font-black bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 uppercase tracking-wide font-bold">
                      {item.accuracy}%
                    </span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-wide text-white group-hover:text-orange-400 transition-colors text-display">
                    {item.movieTitle || item.movie_id}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#0c0807]/80 rounded-xl p-3 border border-[#2d1b18] text-center items-center font-mono">
                  <div className="border-r border-neutral-800/80 pr-1">
                    <span className="text-[8px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5 font-bold">Predicted</span>
                    <span className="text-xs font-black text-red-400 line-clamp-1">₹{item.predicted_value} Cr</span>
                  </div>
                  <div className="pl-1">
                    <span className="text-[8px] text-neutral-500 font-black uppercase tracking-widest block mb-0.5 font-bold">Actual</span>
                    <span className="text-xs font-black text-emerald-400 line-clamp-1 uppercase tracking-wider">₹{item.actual_value} Cr</span>
                  </div>
                </div>

                <div className="text-xs text-neutral-400 font-medium leading-relaxed bg-[#1c110e]/40 border border-[#2d1b18] p-3 rounded-xl">
  Accuracy: <span className="text-emerald-400 font-black">
    {Number(item.accuracy).toFixed(2)}%
  </span>
  {" • "}
  Points Earned: <span className="text-orange-400 font-black">
    {item.points}
  </span>
</div>
                <div className="pt-2 border-t border-[#2d1b18] flex justify-between items-center text-[10px]">
  <span className="text-neutral-500 font-bold">
    Trust Score Impact
  </span>

  <span className="text-orange-400 font-black">
    +{item.points} Points
  </span>
</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* DEBATE INTERACTIVE DISCUSSION AREA */}

        {/* GLOBAL STANDINGS */}


       
      </div>
<section className="max-w-6xl mx-auto px-6 pt-2 pb-10">
  <div className="rounded-3xl border border-[#2d1b18] bg-[#120908]/70 p-8">

    <h2 className="text-3xl font-black text-white mb-5">
      🎬 About CineWars
    </h2>

    <p className="text-neutral-300 text-lg leading-relaxed mb-4 max-w-4xl">
      CineWars is India's fan-driven movie box office prediction platform where cinema lovers predict opening day collections, lifetime numbers, and debate upcoming Bollywood and South Indian films.
    </p>

    <p className="text-neutral-400 text-lg leading-relaxed max-w-4xl">
  Compare predictions, build your credibility score, join fan wars, earn CinePoints, climb the leaderboard and prove who truly understands the box office.
</p>

<a
  href="https://x.com/TheCinewars"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex mt-6 rounded-xl border border-purple-500/40 px-5 py-3 text-purple-300 hover:bg-purple-500/10 transition font-bold"
>
  Follow us on 𝕏
</a>

  </div>
</section>      {/* FOOTER */}
      <footer className="w-full border-t border-[#2d1b18] mt-16 bg-neutral-950/50 py-5">

  <div className="max-w-6xl mx-auto px-6 text-center">

    <div>
      <h3 className="text-white font-black text-lg">
        CineWars
      </h3>

      <p className="text-sm text-neutral-400">
        India's fan championship for box office predictions.
      </p>
    </div>


  </div>


</footer>
      {/* MOBILE INTERACTION NAVIGATION */}
      <div className="fixed bottom-4 left-3 right-3 z-50 md:hidden">
        <div className="flex items-center justify-between rounded-2xl border border-neutral-700 bg-black px-5 py-3 shadow-2xl">

          <a href="#trending" className="flex flex-col items-center text-orange-500">
            <Flame className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase">Pulse</span>
          </a>

          <a href="/leaderboard" className="flex flex-col items-center text-neutral-300">
            <Trophy className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase">Ranks</span>
          </a>

          <a href="/debates" className="flex flex-col items-center text-neutral-300">
            <MessageCircle className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase">Debates</span>
          </a>

          <a
  href="#"
  onClick={() => setShowSearch(true)}
  className="flex flex-col items-center text-neutral-300"
>
  <Search className="w-5 h-5" />
  <span className="text-[10px] font-bold uppercase">Search</span>
</a>

        </div>
      </div>

    </div>
    
    <AnimatePresence>
  {showSearch && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-black/80 flex items-start justify-center p-4"
      onClick={() => setShowSearch(false)}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md mt-20 rounded-2xl border border-neutral-800 bg-neutral-950 p-4"
      >
        <input
          type="text"
          value={movieSearch}
          onChange={(e) => setMovieSearch(e.target.value)}
          placeholder="Search movies..."
          className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-white focus:outline-none"
        />

        <div className="mt-3 max-h-80 overflow-y-auto">
          {searchResults.map((movie: any) => (
            <Link
              key={movie.movie_id}
              href={`/movies/${movie.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              onClick={() => {
                setShowSearch(false);
                setMovieSearch("");
              }}
              className="block px-4 py-3 text-white border-b border-neutral-800 hover:bg-neutral-900"
            >
              {movie.title}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )}
 </AnimatePresence>

<AnimatePresence>
  {showWelcomeModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-[#120908] border border-[#2d1b18] rounded-3xl p-8 text-center">

      <div className="text-5xl mb-4">🎬</div>

      <h2 className="text-2xl font-black text-white mb-4">
        Welcome to CineWars
      </h2>

      <div className="space-y-3 text-neutral-300 text-sm">
        <p>🔥 Predict box office collections</p>
        <p>💬 Join fan wars & debates</p>
        <p>🏆 Build your Trust Score</p>
        <p>📈 Climb the rankings</p>
      </div>

      <button
        onClick={async () => {
          if (currentUser) {
            await supabase
              .from("profiles")
              .update({
                welcome_seen: true,
              })
              .eq("id", currentUser.id);
          }

          setShowWelcomeModal(false);
        }}
        className="mt-6 w-full bg-orange-500 hover:bg-orange-400 transition-colors rounded-xl py-3 font-black uppercase tracking-wider text-white"
      >
        Start Predicting
      </button>

    </div>
  </div>
)}
  

  {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                Join CineWars
              </h2>

              <p className="text-neutral-400 mb-6">
                Enter the arena as a member or continue as a guest.
              </p>

              <a
                href="/auth"
                className="block w-full text-center bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl mb-3"
              >
                Continue with Google
              </a>

              <button
                onClick={() => {
                  window.location.href = "/username";
                } }
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 rounded-xl"
              >
                Continue as Guest
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence></>
  
  );
}

