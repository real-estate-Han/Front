import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { GlobalStyles } from '@styles/global';
import { Global } from '@emotion/react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@utils/apollo/apolloclient';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Themes } from '@styles/themes';
import { Layout } from '@components/Layout';
import * as gtag from '../lib/gtag';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps.initialApolloState);
  // GA 설정 시작
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <title>한세일부동산</title>
        <meta
          name="description"
          content="파주시 부동산, 토지, 민통선 토지, 공장-창고 등 매물 보유중입니다. 031-954-6300 으로연락바랍니다."
        />
      </Head>
      {/* GA 설정 시작 */}
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
      <ApolloProvider client={client}>
        <ThemeProvider theme={Themes.dark}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Global styles={GlobalStyles} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};
export default App;
