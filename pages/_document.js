import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {

  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" data-backend-url={`${process.env.BASE_URL}`} data-frontend-url={`${process.env.FRONTEND_URL}`} id="mainifest-json" />
        <script src="/mainifest.js" />
      </Head>
      <body >
        <link rel="stylesheet" href={`${process.env.BASE_URL}css/dynamic-color.css`} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
