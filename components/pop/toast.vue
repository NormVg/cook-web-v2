<template>
  <div v-if="props.isToastVisible" class="toast">
    <div class="toast-content">
      <slot>

      </slot>
      <button class="close-btn" @click="handleClose">
        <CircleX :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { CircleX } from 'lucide-vue-next'
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  isToastVisible: {
    type: Boolean,
    required: true,
    default: false
  }
})

const emit = defineEmits(['onclose'])


const handleClose = () => {
  emit('onclose', false)
}
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  min-width: 280px;
  max-width: 90vw;
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid var(--border);
  backdrop-filter: blur(3px); /* Less blur */
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 0;
  display: flex;
  align-items: center;
  animation: fadeIn 0.3s;
}

.toast-content {
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.close-btn {
  background: transparent;
  border: none;
  color: #fff;
  padding: 4px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255,255,255,0.15);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}
</style>
