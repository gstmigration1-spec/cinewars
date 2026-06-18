import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;

  const movieTitle = slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");

  const { data: movie } = await supabase
  .from("movies")
  .select("poster")
  .eq("slug", slug)
  .single();
  const poster = movie?.poster || "";

  const title = movieTitle;
  const description = `${movieTitle} box office prediction, opening day collection prediction, lifetime collection forecast and fan debates. Predict ${movieTitle} collections and compare opinions with movie fans on CineWars.`;

  return {
    title,
    description,
    keywords: [
  `${movieTitle} box office prediction`,
  `${movieTitle} opening day collection prediction`,
  `${movieTitle} lifetime collection prediction`,
  `${movieTitle} box office forecast`,
  `${movieTitle} fan debates`,
],
alternates: {
  canonical: `https://www.thecinewars.com/movies/${slug}`,
},
    openGraph: {
      title,
      description,
      siteName: "CineWars",
      type: "website",
      url: `https://www.thecinewars.com/movies/${slug}`,
      images: poster
        ? [
            {
              url: poster,
              width: 500,
              height: 750,
              alt: movieTitle,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: poster ? [poster] : [],
    },
  };
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
