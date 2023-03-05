import { useEffect, useLayoutEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Themes } from '@styles/themes';
import type { AppProps } from 'next/app';
import { GlobalStyles } from '@styles/global';
import { Global } from '@emotion/react';
import { Layout } from '@components/Layout';
declare global {
  interface Window {
    kakao: any;
  }
}
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={Themes['dark']}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Global styles={GlobalStyles} />
    </ThemeProvider>
  );
}
