<script setup>
import { gql } from "@apollo/client/core";
import { useMutation } from "@vue/apollo-composable";
import { reactive } from "vue";

const props = defineProps({
  craft: Object,
});

const updateMutation = gql`
  mutation (
    $name: String
    $type: String
    $brand: String
    $price: String
    $age: Int
    $id: ID!
  ) {
    updateCraft(
      name: $name
      type: $type
      brand: $brand
      price: $price
      age: $age
      id: $id
    ) {
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

const { mutate: updateCraft, onError } = useMutation(updateMutation, () => {
  return {
    variables: {
      id: updateFields.id,
      name: updateFields.name,
      type: updateFields.type,
      brand: updateFields.brand,
      age: Number(updateFields.age),
      price: updateFields.price,
    },
    optimisticResponse: {
      updateCraft: {
        ...updateFields
      }
    }
  };
});

onError(() => {
  emit("error");
})

const emit = defineEmits(["close", "updated", "error"]);

let updateFields = reactive({ ...props.craft });

async function handleSubmit(e) {
  emit("close");
  await updateCraft();
  emit("updated");
}
</script>

<template>
  <div>{{ errorMessage }}</div>
  <form @submit.prevent>
    <div class="form-field">
      <label for="craftName">Name of craft:</label>
      <input id="craftName" v-model="updateFields.name" />
    </div>
    <div class="form-field">
      <label for="craftType">Type of craft:</label>
      <input id="craftType" v-model="updateFields.type" />
    </div>
    <div class="form-field">
      <label for="craftBrand">Brand of craft:</label>
      <input id="craftBrand" v-model="updateFields.brand" />
    </div>
    <div class="form-field">
      <label for="craftAge">Age of craft:</label>
      <input id="craftAge" v-model="updateFields.age" />
    </div>
    <div class="form-field">
      <label for="craftPrice">Price of craft:</label>
      <input id="craftPrice" v-model="updateFields.price" />
    </div>
    <button @click="emit('close')">Cancel</button>
    <button @click="handleSubmit()">Update</button>
  </form>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;

  margin-right: 30px;
  margin-bottom: 8px;
  align-items: center;
}

label {
  margin-bottom: 4px;
}

button {
  margin: 4px;
}
</style>
