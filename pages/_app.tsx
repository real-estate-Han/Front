import { ThemeProvider } from '@emotion/react';
import { Themes } from '@styles/themes';
import type { AppProps } from 'next/app';
import { GlobalStyles } from '@styles/global';
import { Global } from '@emotion/react';
import { Layout } from '@components/Layout';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@utils/apollo/apolloclient';

const App = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={Themes.dark}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Global styles={GlobalStyles} />
      </ThemeProvider>
    </ApolloProvider>
  );
};
export default App;
