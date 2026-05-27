export function calculateHype(votes: {
  flop: number;
  expectations: number;
  records: number;
}) {
  const score =
    votes.records * 3 +
    votes.expectations * 1 -
    votes.flop * 2;

  let fanSentiment = "Weak Buzz";

  if (score >= 120) {
    fanSentiment = "Historic Hype";
  } else if (score >= 80) {
    fanSentiment = "Explosive Buzz";
  } else if (score >= 40) {
    fanSentiment = "Growing Buzz";
  }

  const normalizedScore = Math.max(
    15,
    Math.min(98, score)
  );

  return {
    hypeScore: normalizedScore,
    fanSentiment,
  };
}