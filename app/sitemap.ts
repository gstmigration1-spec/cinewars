import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://thecinewars.com",
      lastModified: new Date(),
    },
    {
      url: "https://thecinewars.com/archive",
      lastModified: new Date(),
    },
    {
      url: "https://thecinewars.com/debates",
      lastModified: new Date(),
    },
    {
      url: "https://thecinewars.com/leaderboard",
      lastModified: new Date(),
    },
  ];
}
