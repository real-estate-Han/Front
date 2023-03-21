import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { GET_CLUSTER_DATA } from "./gqls";
import { setContext } from "@apollo/client/link/context";
const httpLink = createHttpLink({
  uri: "https://port-0-back-6g2llfc38w4i.sel3.cloudtype.app/graphql",
});

const token1 =
  "Barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE5YjY1NjhjZmVhZGE5YjNkOGI2MmUiLCJlbWFpbCI6Imduc3BvcGVAbmF2ZXIuY29tIiwiaWF0IjoxNjc5NDA2NzA1LCJleHAiOjE2Nzk0MjQ3MDV9.jZnoMo7XDEvHhbZvEtEuPD_y66D1yHHS1lHvq1ZLF9A";
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : token1,
    },
  };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  ssrMode: true,
});
