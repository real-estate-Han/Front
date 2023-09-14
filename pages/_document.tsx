import { Global } from '@emotion/react';
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { GlobalStyles } from '@styles/global';

const Document = () => {
  const srcURL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer`;

  return (
    <Html lang="en">
      <Head>
        {/* 스크립트로 카카오맵 데이터 받아오기 */}
        <Script
          strategy="beforeInteractive"
          type="text/javascript"
          src={srcURL}
        />
        <meta
          name="naver-site-verification"
          content="ae0ed43bfa70207984a9bea85bf9abf2037a9bef"
        />
        <Global styles={GlobalStyles} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
export default Document;
