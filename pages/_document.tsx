import { Global } from '@emotion/react';
import { GlobalStyles } from '@styles/global';
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
export default function Document() {
  const srcURL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer`;
  return (
    <Html lang="en">
      <Head>
        <Script strategy="beforeInteractive" src={srcURL}></Script>
        <Global styles={GlobalStyles} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
