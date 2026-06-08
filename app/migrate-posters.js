require("dotenv").config({ path: ".env.local" });

const { createClient } = require("@supabase/supabase-js");
const { v2: cloudinary } = require("cloudinary");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function migratePosters() {
  const { data: movies, error } = await supabase
    .from("movies")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  for (const movie of movies) {
    try {
      console.log(`Uploading ${movie.title}...`);

      const upload = await cloudinary.uploader.upload(movie.poster, {
        folder: "cinewars-posters",
        public_id: movie.movie_id,
      });

      const { data: updatedRows, error: updateError } = await supabase
  .from("movies")
  .update({
    poster: upload.secure_url,
  })
  .eq("id", movie.id)
  .select();

if (updateError) {
  console.error(updateError);
} else {
  console.log(`✓ Updated ${movie.title}`);
  console.log("UPDATED ROW:", updatedRows);
}
    } catch (err) {
      console.error(`Failed: ${movie.title}`);
      console.error(err);
    }
  }

  console.log("Migration Complete");
}

migratePosters();