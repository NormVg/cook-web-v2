<template>
  <div :class="boxClass">
    <NuxtLink :to="link">
      <component :is="icon" size="20"/>
      {{ name }}
    </NuxtLink>
  </div>
</template>

<script setup>
import { SearchSlash } from "lucide-vue-next";
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: "Item 0",
  },
  link: {
    type: String,
    default: "/",
  },
  currentLink: {
    type: String,
    default: "",
  },
  icon: {
    type: [Object, Function],
    default: () => SearchSlash,
  },
})

const boxClass = computed(() => {
  return props.currentLink === props.link ? "sbl-item onLink" : "sbl-item"
})
</script>

<style scoped>
a {
  text-decoration: none;
}

.sbl-item {
  border-bottom: 2px solid transparent;
  transition: all ease-in-out 300ms;
  font-size: 20px;
  margin-bottom: 5px;
}

.sbl-item:hover {
  border-bottom: 2px solid var(--red);
}

.onLink {
  border-bottom: 2px solid var(--red);
}
</style>
