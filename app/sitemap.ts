import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://thecinewars.com";

  const { data: movies } = await supabase
    .from("movies")
    .select("movie_id");

  const movieUrls =
    movies?.map((movie) => ({
      url: `${baseUrl}/movies/${movie.movie_id}`,
      lastModified: new Date(),
    })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/debates`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/leaderboard`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/rules`,
      lastModified: new Date(),
    },

    ...movieUrls,
  ];
}