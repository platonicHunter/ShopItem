// app/manifest.ts
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NatChanung Shop",
    short_name: "NC Shop",
    description: "Shop Item Price & Merchant Management App",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    // Richer PWA Install UI (Screenshots Warning ရှင်းရန်)
    screenshots: [
      {
        src: "/shop_icon.png",
        sizes: "384×290",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/shop_icon.png",
        sizes: "384×290",
        type: "image/png",
      },
    ],
  };
}
