import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject, useQuery } from '@apollo/client';
import { GET_CLUSTER_DATA } from './gqls';
import { setContext } from '@apollo/client/link/context';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : 'http://localhost:8080/graphql',
});

const authLink = setContext((_, { headers }) => {
  // ssr 일떄 window는 undefined이니 오류발생  예외처리해줘야한다.
  const token = typeof window !== 'undefined' && localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});
// export const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
//   ssrMode: true,
// });

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}
export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(pageProps: any) {
  const store = useMemo(() => initializeApollo(pageProps), [pageProps]);
  return store;
}
