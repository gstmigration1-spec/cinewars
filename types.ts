export interface Movie {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  releaseDate: string;
  genre: string[];
  synopsis: string;
  expectedOpening: string;
  expectedLifetime: string;
  sentimentScore: number; // 1-100
  totalPredictions: number;
  trustBreakdown: {
    bullish: number;
    bearish: number;
  };
}

export interface Prediction {
  id: string;
  username: string;
  avatar: string;
  movieTitle: string;
  type: "Opening Weekend" | "Lifetime Worldwide";
  predictedValue: string;
  actualValue?: string;
  status: "PENDING" | "HIT" | "MISS";
  timestamp: string;
  leverageScore: number;
}

export interface LeaderboardUser {
  rank: number;
  username: string;
  avatar: string;
  trustScore: number;
  accuracy: number;
  streak: number;
  type: "Bull" | "Bear" | "Sniper" | "Hype Merchant";
}