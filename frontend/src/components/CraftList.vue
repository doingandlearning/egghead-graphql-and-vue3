<script setup>
import { useQuery, useResult } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";

import Craft from "./Craft.vue";

const craftQuery = gql`
  query($offset: Int) {
    Crafts(offset:$offset) {
      edges {
        name
        id
        type
        price
        age
        owner {
          id
          firstName
          lastName
        }
      }
    }
  }
`;


const { result, fetchMore } = useQuery(craftQuery, () => ({ offset: 0 }));
const data = useResult(result, null, (data) => data.Crafts.edges);

function loadMore() {
  console.log(data.value.length)
  fetchMore({
    variables: {
      offset: data.value.length
    },
    // updateQuery: (previousResult, { fetchMoreResult }) => {
    //   if (!fetchMoreResult) return;
    //   return {
    //     Crafts: {
    //       __typename: "CraftsResult",
    //       edges: previousResult.Crafts.edges.concat(fetchMoreResult.Crafts.edges)
    //     }
    //   }
    // }
  })
}

</script>

<template>
  <h2>Current Crafts</h2>
  <ul>
    <Craft v-for="craft in data" :key="craft.id" :craft="craft" />
  </ul>
  <button @click="loadMore()">Load more</button>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 8px;
  row-gap: 8px;
  padding: 0;
}

li {
  list-style: none;
}
</style>
