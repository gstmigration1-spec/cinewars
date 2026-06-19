import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendPredictionScoredEmail } from "@/lib/email";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
    export async function POST(request: Request) {
  try {
   
    const { movieId, predictionType } = await request.json();
    

    // Get scored predictions
    const { data: predictions, error } = await supabase
      .from("movie_predictions")
      .select(`
        user_id,
        predicted_value,
        actual_value,
        accuracy,
        points
      `)
      .eq("movie_id", movieId)
      .eq("prediction_type", predictionType)
      .eq("status", "scored");
    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    for (const prediction of predictions || []) {

      // Get user's email and username
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, email")
        .eq("id", prediction.user_id)
        .single();

      if (!profile?.email) continue;

      // Send email
      const result = await sendPredictionScoredEmail({
        email: profile.email,
        username: profile.username,
        movie: movieId,
        predicted: prediction.predicted_value,
        actual: prediction.actual_value,
        accuracy: prediction.accuracy,
        points: prediction.points,
      });
      
    }

    return NextResponse.json({
      success: true,
      emailsSent: predictions?.length || 0,
    });

  } catch (err) {
   

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}