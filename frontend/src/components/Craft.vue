<script setup>
defineProps({
  craft: Object,
});
</script>
<template>
  <li :class="craft.owner ? 'owned' : 'for-sale'">
    <router-link :to="`/craft/${craft.id}`">
      {{ craft.name }}
      <span v-if="craft.owner"
        >is owned by {{ craft.owner.firstName }}
        {{ craft.owner.lastName }}.</span
      >
      <span v-else>
        is available to buy and costs ${{ craft.price.toLocaleString("uk") }}.
      </span>
    </router-link>
  </li>
</template>

<style scoped>
.owned {
  background: rgba(20, 20, 20, 0.3);
}

.for-sale {
  font-weight: 800;
}

li {
  border: 1px black solid;
  border-radius: 4px;
  padding: 6px;
}

a {
  text-decoration: none;
  color: black;
}
</style>
