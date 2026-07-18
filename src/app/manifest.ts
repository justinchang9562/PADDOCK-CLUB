import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PADDOCK CLUB",
    short_name: "PADDOCK",
    description: "Bilingual Formula 1 data and reference platform",
    start_url: "/zh",
    display: "standalone",
    background_color: "#f5f5f7",
    theme_color: "#f5f5f7",
  };
}
