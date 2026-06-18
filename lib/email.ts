import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function sendPredictionScoredEmail({
  email,
  username,
  movie,
  predicted,
  actual,
  accuracy,
  points,
}: {
  email: string;
  username: string;
  movie: string;
  predicted: number;
  actual: number;
  accuracy: number;
  points: number;
}) {
  await resend.emails.send({
    from: "CineWars <onboarding@resend.dev>",
    to: email,
    subject: "🎯 Your CineWars prediction has been scored!",

    html: `
      <h2>🎬 Prediction Verified!</h2>

      <p>Hello ${username},</p>

      <p>Your prediction for <strong>${movie}</strong> has been scored.</p>

      <hr />

      <p>🎯 Your Prediction: ₹${predicted} Cr</p>
      <p>🎬 Actual Collection: ₹${actual} Cr</p>
      <p>📊 Accuracy: ${accuracy.toFixed(2)}%</p>
      <p>🏆 Points Earned: +${points}</p>

      <br />

      <a href="https://www.thecinewars.com">
        Enter the Arena 🔥
      </a>

      <br /><br />

      <p>By Fans. For Fans.</p>
      <p>— Team CineWars</p>
    `,
  });
}