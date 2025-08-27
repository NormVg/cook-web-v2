<template>
  <div class="menu-container" ref="containerRef">
    <button class="menu-button" @click="toggle">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="12" cy="5" r="1"></circle>
        <circle cx="12" cy="19" r="1"></circle>
      </svg>
    </button>

    <teleport to="body">
      <div v-if="isOpen" class="menu-overlay" @click="close">
        <div
          class="menu-dropdown"
          :style="menuStyle"
          @click.stop
        >
          <div
            v-for="item in items"
            :key="item.id"
            :class="item.id === 'delete'? 'menu-item menu-item-red' : 'menu-item'"
            @click="handleClick(item)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [
      { id: 'edit', label: 'Edit', action: 'edit' },
      { id: 'delete', label: 'Delete', action: 'delete' }
    ]
  },
  comp:{
    default:undefined
  }
})

const emit = defineEmits(['action'])

const isOpen = ref(false)
const containerRef = ref(null)

const menuStyle = computed(() => {
  if (!isOpen.value || !containerRef.value) return {}

  const rect = containerRef.value.getBoundingClientRect()
  const menuWidth = 150
  const menuHeight = props.items.length * 40 + 8

  let left = rect.right - menuWidth
  let top = rect.bottom + 4

  // Keep menu in viewport
  if (left < 10) left = 10
  if (left + menuWidth > window.innerWidth) left = window.innerWidth - menuWidth - 10
  if (top + menuHeight > window.innerHeight) top = rect.top - menuHeight - 4
  if (top < 10) top = 10

  return {
    position: 'fixed',
    left: `${left}px`,
    top: `${top}px`,
    zIndex: 9999
  }
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const handleClick = (item) => {
  emit('action', {action:item.action,item:props.comp})
  close()
}
</script>

<style scoped>
.menu-container {
  position: relative;
}

.menu-button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-button:hover {
  color: #fff;
  background: #333;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998;
  background: transparent;
}

.menu-dropdown {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  min-width: 120px;
  animation: slideIn 0.15s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.menu-item {
  padding: 10px 12px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.15s ease;
}

.menu-item-red{
  color: var(--pink);
}

.menu-item:hover {
  background: #2a2a2a;
}

.menu-item:first-child {
  border-radius: 6px 6px 0 0;
}

.menu-item:last-child {
  border-radius: 0 0 6px 6px;
}
</style>
