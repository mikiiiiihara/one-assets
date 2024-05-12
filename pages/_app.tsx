import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>One Assets</title>
        <meta
          name="description"
          content="This is a web service that can manage assets."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes"
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
