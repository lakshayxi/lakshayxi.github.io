import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { siteConfig } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: `${siteConfig.fullName} - Portfolio`,
  title: {
    default: `${siteConfig.fullName} - Portfolio`,
    template: `%s - ${siteConfig.fullName}`,
  },
  description: siteConfig.bio.intro,
  alternates: {
    canonical: `${siteConfig.basePath}/`,
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.basePath}/`,
      siteName: `${siteConfig.fullName} - Portfolio`,
      title: `${siteConfig.fullName} - Portfolio`,
    description: siteConfig.bio.intro,
    images: [
      {
        url: `${siteConfig.basePath}/og.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.fullName} - Data science, research, and systems`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.fullName} - Portfolio`,
    description: siteConfig.bio.intro,
    images: [`${siteConfig.basePath}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: `${siteConfig.basePath}/lakshay-saini.png`,
    shortcut: `${siteConfig.basePath}/lakshay-saini.png`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-reading antialiased" suppressHydrationWarning>
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
