<template>
  <Transition name="fade">

    <div v-if="props.isLoadingVisible" class="loading-toast">
      <div class="loading-toast-content">
        <slot>
          <span class="loader"></span>
          <span class="message">Loading...</span>
        </slot>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, Transition } from 'vue'

const props = defineProps({
  isLoadingVisible: {
    type: Boolean,
    default: true, // toast can be globally disabled
  },

})
</script>

<style scoped>
.loading-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  min-width: 200px;
  max-width: 90vw;
  background: rgba(30, 30, 30, 0.85);
  border: 1px solid var(--border);
  backdrop-filter: blur(4px);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out;
}

.loading-toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
}

.loader {
  width: 18px;
  height: 18px;
  border: 3px solid rgba(255,255,255,0.2);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.message {
  font-size: 0.95rem;
  font-weight: 500;
  color: white;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
