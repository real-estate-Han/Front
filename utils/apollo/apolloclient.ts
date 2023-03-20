import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { GET_CLUSTER_DATA } from "./gqls";

// export async function getClusterData() {
//   const { data, error } = await useQuery(GET_CLUSTER_DATA, { ssr: true });
//   return { data, error };
// }
export const client = new ApolloClient({
  uri: "https://port-0-back-6g2llfc38w4i.sel3.cloudtype.app/graphql",
  cache: new InMemoryCache(),
  ssrMode: true,
});
