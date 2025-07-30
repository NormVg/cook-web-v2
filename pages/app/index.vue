<template>
  <Transition name="fade">
    <DecryptionLoader v-if="isLoader" />
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { navigateTo } from '#app'
import DecryptionLoader from '~/components/pop/DecryptionLoader.vue'

const isLoader = ref(true)
let hideLoaderTimeout = null
let navigateTimeout = null

onMounted(() => {
  // First timeout: hide loader
  hideLoaderTimeout = setTimeout(() => {
    isLoader.value = false

    // Second timeout: navigate after fade
    navigateTimeout = setTimeout(() => {
      navigateTo('/app/template')
    }, 200) // after fade
  }, 3800)
})

onUnmounted(() => {
  clearTimeout(hideLoaderTimeout)
  clearTimeout(navigateTimeout)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
