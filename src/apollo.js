import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { notifyGlobalError } from "./lib/errorService";

const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || "http://localhost:4000/";

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
  credentials: "same-origin",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  let messages: string[] = [];

  if (graphQLErrors) {
    graphQLErrors.forEach((err) => {
      const m = err.message || JSON.stringify(err);
      messages.push(m);
    });
  }

  if (networkError) {
    messages.push(networkError.message || String(networkError));
  }

  if (messages.length) {
    notifyGlobalError(messages.join("\n"));
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});
