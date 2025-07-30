<template>
  <div ref="cursor" class="custom-cursor">$</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

const cursor = ref(null);

const moveCursor = (e) => {
  const x = e.clientX;
  const y = e.clientY;
  cursor.value.style.transform = `translate3d(${x}px, ${y}px, 0)`;
};

onMounted(() => {
  document.addEventListener("mousemove", moveCursor);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousemove", moveCursor);
});
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 15px;
  height: 25px;
  background-color: var(--red);
  pointer-events: none;
  transform: translate3d(-50%, -50%, 0);
  z-index: 9999;
  transition: transform 0.1s ease-out;
  animation: blink 0.6s steps(2, start) infinite;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-left: 5px;
  color: var(--bg);
}

@keyframes blink {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
