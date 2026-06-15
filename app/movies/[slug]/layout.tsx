import type { Metadata } from "next";

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
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
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
