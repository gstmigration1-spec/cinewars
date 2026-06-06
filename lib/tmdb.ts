const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function getTrendingMovies() {
  const res = await fetch(
  `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=IN`
);

  if (!res.ok) {
    console.log(await res.text());
    throw new Error("Failed to fetch TMDB movies");
  }

  const data = await res.json();
  const filtered = data.results.filter(
  (movie: any) =>
    movie.original_language === "hi" ||
    movie.original_language === "ta" ||
    movie.original_language === "te" ||
    movie.original_language === "ml" ||
    movie.original_language === "kn"
);

return filtered;

}

