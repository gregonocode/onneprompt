import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "OnneGram",
    short_name: "OnneGram",
    description: "Aplicativo Gratis com prompts prontos para copiar.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#1a1a1a",
    theme_color: "#1a1a1a",
    icons: [
      {
        src: "/icon/icon-onne-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon/icon-onne-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
