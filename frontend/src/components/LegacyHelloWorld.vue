<template>
  <h1>Legacy: {{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
import useCount from "../composables/useCount";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const { count, doubleCount, increment } = useCount();

    return { count, doubleCount, increment };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
