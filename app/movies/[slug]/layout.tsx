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
  const title = `TEST-${movieTitle} | CineWars`;

  return {
    title: `${movieTitle} | CineWars`,
    description: `Predict the box office performance of ${movieTitle} on CineWars.`,
  };
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
