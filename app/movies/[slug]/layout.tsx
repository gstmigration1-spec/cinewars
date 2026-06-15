import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const movieTitle = params.slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");

  return {
    title: `${movieTitle} | CineWars`,
    description: `Predict the box office performance of ${movieTitle} on CineWars.`,

    openGraph: {
      title: `${movieTitle} | CineWars`,
      description: `Predict the box office performance of ${movieTitle} on CineWars.`,
      type: "website",
      url: `https://www.thecinewars.com/movies/${params.slug}`,
      siteName: "CineWars",
    },

    twitter: {
      card: "summary",
      title: `${movieTitle} | CineWars`,
      description: `Predict the box office performance of ${movieTitle} on CineWars.`,
    },
  };
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
