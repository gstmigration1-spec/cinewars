"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ArchiveMoviePage() {
  const params = useParams();
  const movieId = params.movieId as string;

  const [results, setResults] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  

  useEffect(() => {
    const loadData = async () => {
      const { data: resultData } = await supabase
        .from("movie_results")
        .select("*")
        .eq("movie_id", movieId);

      const { data: predictionData } = await supabase
        .from("movie_predictions")
        .select("*")
        .eq("movie_id", movieId);
         

      setResults(resultData || []);
      setPredictions(predictionData || []);
    };
    

    loadData();
  }, [movieId]);

  const openingDay = results.find(
    (r) => r.prediction_type === "opening_day"
  );

  const lifetime = results.find(
    (r) => r.prediction_type === "lifetime"
  );

  const scoredPredictions = predictions.filter(
    (p) => p.accuracy !== null
  );

  const averageAccuracy =
    scoredPredictions.length > 0
      ? (
          scoredPredictions.reduce(
            (sum, p) => sum + Number(p.accuracy),
            0
          ) / scoredPredictions.length
        ).toFixed(2)
      : "0";

  const bestPrediction =
    scoredPredictions.length > 0
      ? Math.max(
          ...scoredPredictions.map((p) =>
            Number(p.accuracy)
          )
        )
      : 0;
const openingPredictions = predictions.filter(
  (p) => p.prediction_type === "opening_day"
);

const lifetimePredictions = predictions.filter(
  (p) => p.prediction_type === "lifetime"
);

const avgOpeningPrediction =
  openingPredictions.length > 0
    ? (
        openingPredictions.reduce(
          (sum, p) => sum + Number(p.predicted_value),
          0
        ) / openingPredictions.length
      ).toFixed(0)
    : "-";

const avgLifetimePrediction =
  lifetimePredictions.length > 0
    ? (
        lifetimePredictions.reduce(
          (sum, p) => sum + Number(p.predicted_value),
          0
        ) / lifetimePredictions.length
      ).toFixed(0)
    : "-";
  return (
    <main className="min-h-screen bg-[#050303] text-white p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-black mb-8">
          {movieId
            .split("-")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
            )
            .join(" ")}
        </h1>

        <div className="grid md:grid-cols-4 gap-4 mb-8">

          <div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-6">
            <p className="text-neutral-400 text-sm">
              Opening Day
            </p>
            <p className="text-3xl font-black">
              {openingDay?.actual_value || "-"}
            </p>
          </div>

          <div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-6">
            <p className="text-neutral-400 text-sm">
              Lifetime
            </p>
            <p className="text-3xl font-black">
              {lifetime?.actual_value || "-"}
            </p>
          </div>

          <div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-6">
            <p className="text-neutral-400 text-sm">
              Total Predictions
            </p>
            <p className="text-3xl font-black">
              {predictions.length}
            </p>
          </div>

          <div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-6">
            <p className="text-neutral-400 text-sm">
              Avg Accuracy
            </p>
            <p className="text-3xl font-black">
              {averageAccuracy}%
            </p>
          </div>

        </div>

        <div className="bg-[#120908] border border-[#2d1b18] rounded-2xl p-6">

          <h2 className="text-2xl font-black mb-4">
            Prediction Stats
          </h2>

          <div className="space-y-3">
<div className="border-b border-[#2d1b18] pb-3">
  <div className="font-bold text-white">
    Opening Day
  </div>

  <div className="mt-1 text-neutral-300">
    Predicted:
    <span className="text-orange-400 ml-2 font-bold">
      ₹{avgOpeningPrediction} Cr
    </span>
  </div>

  <div className="text-neutral-300">
    Actual:
    <span className="text-white ml-2 font-bold">
      ₹{openingDay?.actual_value || "-"} Cr
    </span>
  </div>
</div>

<div className="pt-1">
  <div className="font-bold text-white">
    Lifetime
  </div>

  <div className="mt-1 text-neutral-300">
    Predicted:
    <span className="text-orange-400 ml-2 font-bold">
      ₹{avgLifetimePrediction} Cr
    </span>
  </div>

  <div className="text-neutral-300">
    Actual:
    <span className="text-white ml-2 font-bold">
      ₹{lifetime?.actual_value || "-"} Cr
    </span>
  </div>
</div>
            <div>
              Best Accuracy:
              <span className="text-orange-400 ml-2 font-bold">
                {bestPrediction}%
              </span>
            </div>

            <div>
              Scored Predictions:
              <span className="text-orange-400 ml-2 font-bold">
                {scoredPredictions.length}
              </span>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}