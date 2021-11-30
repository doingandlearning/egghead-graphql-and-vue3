import { createApp, provide, h } from "vue";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";

import router from "./router";

import App from "./App.vue";

const httpLink = createHttpLink({ uri: "http://localhost:3000/graphql" });

const cache = new InMemoryCache({
  typePolicies: {
    CraftsResult: {
      fields: {
        edges: {
          merge(existing, incoming) {
            if (!existing) return incoming;
            console.log(existing, incoming);
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const defaultClient = new ApolloClient({
  link: httpLink,
  cache,
});

createApp({
  setup() {
    provide(DefaultApolloClient, defaultClient);
  },
  render: () => h(App),
})
  .use(router)
  .mount("#app");
