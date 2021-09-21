import 'tailwindcss/tailwind.css'
import Head from 'next/head'
function Robes({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>
        {`
          body {
            background: #000000e0;
            color: white;
            overflow-x: hidden;
          }
        `}
      </style>
      <Head>
        <title>adventureclub.market</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Garamond:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <meta property="og:url" content="https://adventureclub.market" />
        <meta property="og:title" content="adventureclub.market" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta
          property="og:description"
          content="See the prices for interesting Adventure Card Starter Decks"
        />
      </Head>
    </>
  )
}

export default Robes
