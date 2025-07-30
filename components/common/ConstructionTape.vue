<script setup>
</script>

<template>
  <div class="construction-tape"></div>
</template>

<style scoped>
.construction-tape {
  min-width: 200px;
  height: 12px;
  background: repeating-linear-gradient(
    45deg,
    var(--bg),
    var(--bg) 6px,
    var(--bg2) 6px,
    var(--bg2) 12px
  );
  position: relative;
  overflow: hidden;
  border-radius: 2px;
}

.construction-tape::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    var(--bg3),
    var(--bg3) 6px,
    var(--bg2) 6px,
    var(--bg2) 12px
  );
  animation: tapeScroll 4s linear infinite;
}

@keyframes tapeScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
