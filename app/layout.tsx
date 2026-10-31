import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import ServiceWorkerRegistration from "./service-worker-registration";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "OnneGram",
  description: "Aplicativo Gratis com prompts prontos para copiar",
  applicationName: "OnneGram",
  appleWebApp: {
    capable: true,
    title: "OnneGram",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/icon/icon-onne-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon/icon-onne-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon/icon-onne-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-br"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
