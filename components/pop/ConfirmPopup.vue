<template>
  <teleport to="body">
    <div v-if="modelValue" class="confirm-overlay" @click="handleOverlayClick">
      <div class="confirm-popup" @click.stop>
        <div class="confirm-header">
          <h3 class="confirm-title">{{ title }}</h3>
        </div>

        <div class="confirm-body">
          <p class="confirm-message">{{ message }}</p>
        </div>

        <div class="confirm-actions">
          <button class="cancel-button" @click="handleCancel">
            {{ cancelText }}
          </button>
          <button class="confirm-button" @click="handleConfirm">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Confirm Action'
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?'
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const handleConfirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
}

const handleCancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    handleCancel()
  }
}
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.confirm-popup {
  background-color: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  width: 90%;
  max-width: 400px;
  animation: slideIn 0.2s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.confirm-header {
  padding: 20px 20px 0 20px;
}

.confirm-title {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.025em;
}

.confirm-body {
  padding: 16px 20px;
}

.confirm-message {
  color: #a1a1aa;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}

.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 0 20px 20px 20px;
}

.cancel-button {
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #333333;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
}

.cancel-button:hover {
  background-color: #2a2a2a;
}

.confirm-button {
  background-color: #ffffff;
  color: #000000;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
}

.confirm-button:hover {
  background-color: #e5e5e5;
}

/* Mobile responsive */
@media (max-width: 480px) {
  .confirm-popup {
    margin: 20px;
  }

  .confirm-actions {
    flex-direction: column;
  }

  .confirm-actions button {
    width: 100%;
  }
}
</style>
