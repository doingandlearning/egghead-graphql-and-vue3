import { ref, computed } from "vue";

export default function () {
  const count = ref(0);

  const increment = () => count.value++;

  const doubleCount = computed(() => count.value * 2);

  return { count, doubleCount, increment };
}
