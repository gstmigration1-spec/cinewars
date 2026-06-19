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
  return await resend.emails.send({
    from: "CineWars <noreply@thecinewars.com>",
    to: email,
    subject: "🎯 Your CineWars prediction has been scored!",

 html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #111;">

<h1 style="color:#f97316;">
🎯 Your CineWars Prediction Has Been Scored!
</h1>

<p>
Hi <strong>@${username}</strong>,
</p>

<p>
Your prediction for <strong>${movie}</strong> has been officially scored on CineWars.
</p>

<hr />

<h3>📊 Your Result</h3>

<p>
🎯 <strong>Your Prediction:</strong> ₹${predicted} Cr
</p>

<p>
🎬 <strong>Actual Collection:</strong> ₹${actual} Cr
</p>

<p>
⭐ <strong>Accuracy:</strong> ${accuracy.toFixed(2)}%
</p>

<p>
🪙 <strong>CinePoints Earned:</strong> +${points}
</p>

<hr />

<h3>🏆 Keep Climbing The CineWars Arena</h3>

<p>
Every prediction brings you closer to becoming a CineWars Champion.
</p>

<ul>
<li>🔥 Make more predictions</li>
<li>🔥 Earn more CinePoints</li>
<li>🔥 Improve your accuracy</li>
<li>🔥 Compete for rewards & vouchers</li>
</ul>

<div style="text-align:center; margin:30px 0;">
<a 
href="https://www.thecinewars.com"
style="
background:#f97316;
color:white;
padding:14px 24px;
text-decoration:none;
border-radius:8px;
font-weight:bold;
display:inline-block;
">
🎬 Enter The Arena
</a>
</div>

<p>
New movie battles are waiting for you. Think you can beat other predictors?
</p>

<p>
See you inside the arena! 🔥
</p>

<hr />

<p style="color:#666; font-size:13px;">
By Fans. For Fans.<br/>
<strong>Team CineWars</strong>
</p>

</div>
`
  });
}
