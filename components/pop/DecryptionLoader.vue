<script setup>
import logoSvg from "~/assets/img/logo.svg"

const props = defineProps({
  isLoadingVisible: {
    type: Boolean,
    default: true,
  },
})

const logs = [
  ">> Initializing Core Modules...",
  ">> Verifying Signatures...",
  ">> Decrypting Protocol Stack...",
  ">> Loading Assets & Routes...",
  ">> Establishing Connection...",
  ">> Rendering UI Interface...",
  ">> Boot Complete. Executing CookCLI...",
]
</script>

<template>
  <Transition>
    <div v-if="props.isLoadingVisible" class="decryption-loader">
      <!-- Logo Pulse -->
      <!-- <img :src="logoSvg" alt="cook-logo-svg" class="logo-pulse" /> -->

      <!-- Fake Terminal Feed -->
      <div class="terminal-feed">
        <div v-for="line in logs" :key="line" class="terminal-line">
          <span class="prefix">▌</span>{{ line }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
span {
  color: #00ff94;
}

.decryption-loader {
  position: fixed;
  color: #00ff94;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0d0d0d;
  backdrop-filter: blur(5px);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.logo-pulse {
  height: 60px;
  animation: pulse 1.8s ease-in-out infinite;
  margin-bottom: 32px;
  z-index: 100;
}

.terminal-feed {
  font-family: 'Fira Code', monospace;
  color: #00ff94;
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  max-width: 90%;
  width: 100%;
  max-height: 240px;
  /* overflow: hidden; */
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: fadeIn 1s ease;
  padding: 0 clamp(12px, 5vw, 24px);
  text-shadow: 0 0 6px rgba(0, 255, 148, 0.2);
  line-height: 1.5;
  word-break: break-word;
}

.terminal-line {
  white-space: nowrap;
  opacity: 0;
  animation: typeIn 0.6s ease forwards;
}
.terminal-line:nth-child(1) { animation-delay: 0.1s }
.terminal-line:nth-child(2) { animation-delay: 0.6s }
.terminal-line:nth-child(3) { animation-delay: 1.1s }
.terminal-line:nth-child(4) { animation-delay: 1.6s }
.terminal-line:nth-child(5) { animation-delay: 2.1s }
.terminal-line:nth-child(6) { animation-delay: 2.6s }
.terminal-line:nth-child(7) { animation-delay: 3.1s }

.prefix {
  color: #00ff94;
  margin-right: 10px;
}

/* Animations */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.6; }
}

@keyframes typeIn {
  to { opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
