<script setup>
import { gql } from "@apollo/client/core";
import { useQuery, useResult } from "@vue/apollo-composable";
import { useRoute } from "vue-router";
import { ref } from "vue";

import UpdateCraftForm from "./UpdateCraftForm.vue";

const craftQuery = gql`
  query ($id: ID) {
    Craft(id: $id) {
      id
      name
      type
      brand
      price
      age
      owner {
        id
        firstName
        lastName
      }
    }
  }
`;
const route = useRoute();

const { result, refetch } = useQuery(craftQuery, { id: route.params.id });

const craft = useResult(result, null, (data) => data.Craft);

const showModal = ref(false);

function handleRefresh() {
  showModal.value = false;
  refetch();
}

const errorMessage = ref("");
function handleError() {
  errorMessage.value = "There was an error, reverting values."
}
</script>

<template>
  <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

  <h2>{{ craft?.name }} made by {{ craft?.brand }}</h2>

  <p>This craft is {{ craft?.age }} months old and costs ${{ craft?.price }}.</p>

  <p v-if="craft?.owner">
    This craft is owned by {{ craft.owner.firstName }}
    {{ craft.owner.lastName }}.
  </p>
  <p v-else>This craft is available for purchase.</p>

  <button @click="showModal = !showModal">Update</button>
  <div v-if="showModal" class="modal">
    <div class="modal-inner">
      <UpdateCraftForm
        :craft="craft"
        @close="showModal = !showModal"
        @updated="handleRefresh()"
        @error="handleError()"
      />
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 400px;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: white;
  box-shadow: 0 0 60px 10px rgba(0, 0, 0, 0.9);
}

.modal-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px 50px 20px 20px;
  overflow: auto;
}

.error {
  border: 1px solid;
  margin: 10px 0px;
  padding: 15px 10px 15px 50px;
  color: #d8000c;
  background-color: #ffbaba;
}
</style>
