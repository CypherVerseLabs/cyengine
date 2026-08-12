import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Basic Info*/}
        <meta charSet="utf-8" />
        <meta name="language" content="english" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="content-type" content="text/html" />
        <title>cyengine</title>
        {/* SEO tags */}
        <meta name="author" content="www.cypherverse.space" />
        <meta
          name="description"
          content="An npm library that provides a standardized reality for the future of the 3D Web."
        />
        <meta
          name="keywords"
          content="cypherverse, cyengine, 3d, webxr, 3d website, framework, npm"
        />
        <meta name="distribution" content="web" />
        {/* open graph */}
        <meta property="og:url" content="https://www.cyengine.io" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="cyengine" />
        <meta
          property="og:description"
          content="An npm library that provides a standardized reality for the future of the 3D Web."
        />
        <meta property="og:image" content="/android-chrome-512x512.ico" />
        {/* icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.ico"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
