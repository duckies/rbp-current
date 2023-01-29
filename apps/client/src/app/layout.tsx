import { DM_Mono as FontMono, Inter as FontSans } from "@next/font/google"
import { cn } from "utils/cn"

import { Providers } from "components/Providers"
import Script from "next/script"
import "styles/global.css"

type RootLayoutProps = {
  children: React.ReactNode
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = FontMono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const wowheadScript = `var wowhead_tooltips = {"colorlinks": false, "iconizelinks": true, "renamelinks": false};`

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en">
        <head>
          <script id="wowhead" dangerouslySetInnerHTML={{ __html: wowheadScript }} />
          <Script strategy="lazyOnload" src="https://wow.zamimg.com/js/tooltips.js" />
        </head>
        <body
          className={cn(
            "bg-surface-900 font-sans text-slate-50",
            fontSans.variable,
            fontMono.variable
          )}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </>
  )
}
