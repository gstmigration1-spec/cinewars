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
  .or(
    `movie_id.eq.${slug},title.ilike.${movieTitle}`
  )
  .single();

  const poster = movie?.poster || "";

  const title = `${movieTitle} | CineWars`;
  const description = `Predict the box office performance of ${movieTitle} on CineWars.`;

  return {
    title,
    description,

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
