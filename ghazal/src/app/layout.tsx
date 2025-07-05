import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Inter, Cormorant_Garamond, Montserrat, Crimson_Text } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

// Existing Geist fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// New fonts
const inter = Inter({ subsets: ["latin"] })
const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-heading",
})

const montserrat = Montserrat({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-body",
})

const crimson = Crimson_Text({
  weight: ["400"],
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-accent",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${montserrat.variable} ${crimson.variable}`}
    >
      <body className={`${inter.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
