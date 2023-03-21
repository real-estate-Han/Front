import { ThemeProvider } from "@emotion/react";
import { Themes } from "@styles/themes";
import type { AppProps } from "next/app";
import { GlobalStyles } from "@styles/global";
import { Global } from "@emotion/react";
import { Layout } from "@components/Layout";
import { ApolloProvider } from "@apollo/client";
import { client } from "@utils/apollo/apolloclient";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={Themes["dark"]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Global styles={GlobalStyles} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
