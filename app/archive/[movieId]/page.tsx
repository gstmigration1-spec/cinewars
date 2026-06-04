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