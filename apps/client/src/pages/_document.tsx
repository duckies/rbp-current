import { render } from '@master/css/render';
import type { DocumentContext } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { StyleSheet } from '@master/css';

const initScript = 'document.documentElement.classList.add(localStorage.getItem("theme") || "dark");';

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
        <script id="init-script" dangerouslySetInnerHTML={{ __html: initScript }} />
        <script dangerouslySetInnerHTML={{ __html: 'window.MasterCSSManual=true' }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const { css } = render((await ctx.renderPage()).html, { StyleSheet });
  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: (
      <>
        <style id="master-css">{css}</style>
        {initialProps.styles}
      </>
    ),
  };
};
