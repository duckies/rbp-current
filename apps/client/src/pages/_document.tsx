import { Head, Html, Main, NextScript } from "next/document"
import Script from "next/script"

const wowheadScript = `var wowhead_tooltips = {"colorlinks": false, "iconizelinks": true, "renamelinks": false};`

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&amp;family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&amp;family=DM+Serif+Display:ital@0;1&amp;display=swap"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script id="wowhead" dangerouslySetInnerHTML={{ __html: wowheadScript }} />
        <Script strategy="lazyOnload" src="https://wow.zamimg.com/js/tooltips.js" />
      </Head>
      <body className="bg-white text-black dark:bg-surface-800 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
