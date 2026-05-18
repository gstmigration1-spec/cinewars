import { Movie, Prediction, LeaderboardUser } from "@/types";

export const mockMovies: Movie[] = [
  {
    id: "cw-1",
    title: "Batwara 1947", // Historically tracked as Lahore 1947
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=1200&q=80",
    releaseDate: "Aug 13, 2026",
    genre: ["Period", "Drama", "Action"],
    synopsis: "An intense Partition-era historical epic starring Sunny Deol, directed by Rajkumar Santoshi, and produced by Aamir Khan, tracking a family caught in cross-border borders.",
    expectedOpening: "₹42.5 Cr",
    expectedLifetime: "₹380 Cr",
    sentimentScore: 79,
    totalPredictions: 28415,
    trustBreakdown: { bullish: 68, bearish: 32 }
  },
  {
    id: "cw-2",
    title: "King",
    poster: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&q=80",
    releaseDate: "Dec 24, 2026",
    genre: ["Action", "Crime", "Thriller"],
    synopsis: "The massive action-packed gangster return of Shah Rukh Khan alongside Suhana Khan, directed by Sujoy Ghosh and action-designed by Siddharth Anand.",
    expectedOpening: "₹78.0 Cr",
    expectedLifetime: "₹850 Cr",
    sentimentScore: 95,
    totalPredictions: 64200,
    trustBreakdown: { bullish: 89, bearish: 11 }
  },
  {
    id: "cw-3",
    title: "Alpha",
    poster: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&q=80",
    releaseDate: "Jul 10, 2026",
    genre: ["Spy", "Action", "Suspense"],
    synopsis: "YRF Spy Universe's first female-led asset featuring Alia Bhatt and Sharvari as deadly super-agents battling global espionage syndicates.",
    expectedOpening: "₹35.5 Cr",
    expectedLifetime: "₹310 Cr",
    sentimentScore: 84,
    totalPredictions: 19540,
    trustBreakdown: { bullish: 72, bearish: 28 }
  },
  {
    id: "cw-4",
    title: "Drishyam 3",
    poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    releaseDate: "Oct 16, 2026",
    genre: ["Mystery", "Thriller", "Drama"],
    synopsis: "The highly anticipated multi-state simultaneous conclusion to India's ultimate crime-coverup franchise starring Ajay Devgn as Vijay Salgaonkar.",
    expectedOpening: "₹28.0 Cr",
    expectedLifetime: "₹340 Cr",
    sentimentScore: 89,
    totalPredictions: 31220,
    trustBreakdown: { bullish: 81, bearish: 19 }
  },
  {
    id: "cw-5",
    title: "Awarapan 2",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
    releaseDate: "Nov 13, 2026",
    genre: ["Romance", "Action", "Noir"],
    synopsis: "A long-awaited reboot of the tragic underworld love story, centered around high stakes, broken loyalties, and a iconic haunting soundtrack landscape.",
    expectedOpening: "₹12.5 Cr",
    expectedLifetime: "₹95 Cr",
    sentimentScore: 67,
    totalPredictions: 8940,
    trustBreakdown: { bullish: 54, bearish: 46 }
  }
];
export const mockPredictions: Prediction[] = [
  {
    id: "p1",
    username: "TradeSniper",
    avatar: "🔥",
    movieTitle: "King",
    type: "Opening Weekend",
    predictedValue: "₹82 Cr",
    actualValue: "₹78 Cr",
    status: "HIT",
    timestamp: "2 days ago",
    leverageScore: 96
  }
];

export const mockLeaderboard = [
  {
    rank: 1,
    username: "TradeSniper",
    avatar: "🔥",
    trustScore: 96,
    accuracy: 91,
    streak: 12,
    type: "Sniper"
  },
  {
    rank: 2,
    username: "BoxOfficeKing",
    avatar: "🚀",
    trustScore: 92,
    accuracy: 87,
    streak: 8,
    type: "Bull"
  }
];