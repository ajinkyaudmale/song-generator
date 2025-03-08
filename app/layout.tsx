import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "AI Song Generator",
    template: "%s | AI Song Generator"
  },
  description: "Create unique songs in multiple languages using AI, powered by Hugging Face's Mistral-7B-Instruct model. Generate lyrics in the style of your favorite artists.",
  generator: "Next.js",
  applicationName: "AI Song Generator",
  referrer: "origin-when-cross-origin",
  keywords: ["AI", "Song Generator", "Music", "Lyrics", "Artificial Intelligence", "Mistral", "Hugging Face"],
  authors: [{ name: "AI Song Generator Team" }],
  creator: "AI Song Generator Team",
  publisher: "AI Song Generator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    title: "AI Song Generator",
    description: "Create unique songs in multiple languages using AI",
    url: "https://your-domain.com",
    siteName: "AI Song Generator",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "AI Song Generator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Song Generator",
    description: "Create unique songs in multiple languages using AI",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://your-domain.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'