<template>
  <motion.div class="terminal"
    :initial="{ opacity: 0, x: 0, scale: 1, filter: 'blur(12px)' }"
    :animate="{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }"
    :transition="{ type: 'spring', stiffness: 120, damping: 14 ,delay:0.2}"
    :in-view-options="{ once: true }"

  >
    <div class="terminal-content">
      <div class="command-line" v-for="(line, index) in visibleLines" :key="index">
        <template v-if="line.type === 'command'">
          <span class="prompt">$</span>
          <span class="command">{{ line.text }}</span>
        </template>
        <template v-else-if="line.type === 'output'">
          <span class="output" :class="line.class">{{ line.text }}</span>
        </template>
        <template v-else-if="line.type === 'list'">
          <ul class="recipe-list">
            <li v-for="(item, i) in line.items" :key="i">{{ item }}</li>
          </ul>
        </template>
        <template v-else-if="line.type === 'success'">
          <span class="success-icon">✓</span>
          <span class="success-text">{{ line.text }}</span>
        </template>
        <template v-else-if="line.type === 'link'">
          <span class="arrow-icon">➜</span>
          <span class="link-label">{{ line.label }}:</span>
          <span class="link-url">{{ line.url }}</span>
        </template>
      </div>
      <div class="cursor-line" v-if="isTyping">
        <span class="prompt">$</span>
        <span class="command">{{ currentCommand }}</span>
        <span class="cursor"></span>
      </div>
      <div class="replay-container" v-if="animationComplete">
        <button class="replay-button" @click="replayAnimation">
          <span class="replay-icon">↻</span> Replay
        </button>
      </div>
    </div>
  </motion.div>
</template>

<script setup>
import { motion } from 'motion-v'
import { ref, onMounted } from 'vue'

const lines = [
  { type: 'command', text: 'cook --version' },
  { type: 'output', text: 'COOK CLI v0.1.0-alpha', class: 'version' },
  { type: 'command', text: 'cook list recipes' },
  { type: 'list', items: [
    '• @react/vite',
    '• @react/mongo-express-bun',
    '• @Nuxt/primeui-pinia-betterauth',
    '• @Next/shadcn-zustand-authjs',
    '• @py/typer-rich',
    '• @py/fastapi-auth-mongo',
    '• @py/steamlit-huggingface-torch',
    '• @go/cobra-bubble',
    '• @go/fiber-auth-postgres'
  ]},
  { type: 'command', text: 'cook prep @go/cobra-bubble' },
  { type: 'success', text: 'Recipe ready! Estimated cooking time: 15 sec' },
  { type: 'command', text: 'cook run serve' },
  { type: 'link', label: 'Local', url: 'http://localhost:3000/' }
]

const visibleLines = ref([])
const currentCommand = ref('')
const currentLineIndex = ref(0)
const currentCharIndex = ref(0)
const isTyping = ref(true)
const animationComplete = ref(false)

const typingSpeed = 50
const commandPause = 500
const outputPause = 800

function animateNextLine() {
  if (currentLineIndex.value >= lines.length) {
    animationComplete.value = true
    return
  }

  const currentLine = lines[currentLineIndex.value]

  if (currentLine.type === 'command') {
    // Animate typing the command
    isTyping.value = true
    typeCommand(currentLine.text)
  } else {
    // Show output immediately
    isTyping.value = false
    visibleLines.value.push(currentLine)

    // Determine pause based on line type
    let pause = outputPause
    if (currentLine.type === 'list') {
      pause = 1000 // Longer pause for lists
    }

    setTimeout(() => {
      currentLineIndex.value++
      animateNextLine()
    }, pause)
  }
}

function typeCommand(command) {
  if (currentCharIndex.value < command.length) {
    currentCommand.value = command.substring(0, currentCharIndex.value + 1)
    currentCharIndex.value++

    setTimeout(() => {
      typeCommand(command)
    }, typingSpeed)
  } else {
    // Command typing finished
    setTimeout(() => {
      visibleLines.value.push({ type: 'command', text: currentCommand.value })
      currentCommand.value = ''
      currentCharIndex.value = 0
      currentLineIndex.value++
      isTyping.value = false
      animateNextLine()
    }, commandPause)
  }
}

function replayAnimation() {
  // Reset all state
  visibleLines.value = []
  currentCommand.value = ''
  currentLineIndex.value = 0
  currentCharIndex.value = 0
  isTyping.value = true
  animationComplete.value = false

  // Start animation again
  animateNextLine()
}

function startAnimation() {
  setTimeout(() => {
    animateNextLine()
  }, 400)
  return
}

onMounted(() => {
  startAnimation()
})
</script>

<style scoped>
.terminal {
  background-color: #1a1a1a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);

  font-family: var(--term-font);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  margin-right: 30px;
  border: 1px solid var(--white);
  border-radius: 5px;
  padding: 20px;
  width: 50%;
  min-height: 480px;
  overflow: hidden;
  position: relative;
}

.terminal-content {
  height: 100%;
  overflow-y: auto;
}

.command-line {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
  align-items: flex-start;
}

.prompt {
  color: var(--green);
  margin-right: 10px;
}

.command {
  color: var(--green);
}

.output {
  color: var(--green);
  margin-left: 10px;
}

.version {
  color: var(--white);
  font-weight: bold;
}

.recipe-list {
  color: var(--green);
  list-style-type: none;
  margin: 0;
  padding: 0 0 0 10px;
  width: 100%;
}

.recipe-list li {
  margin-bottom: 4px;
}

.success-icon {
  color: var(--green);
  margin-right: 10px;
}

.success-text {
  color: var(--white);
}

.arrow-icon {
  color: var(--green);
  margin-right: 10px;
}

.link-label {
  color: var(--white);
  margin-right: 10px;
}

.link-url {
  color: var(--green);
}

.cursor-line {
  display: flex;
  margin-bottom: 8px;
}

.cursor {
  background-color: var(--white);
  display: inline-block;
  width: 8px;
  height: 16px;
  margin-left: 2px;
  animation: blink 1s step-end infinite;
}

.replay-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  width: 100%;
}

.replay-button {
  background-color: #2c2c2c;
  border: 1px solid var(--white);
  border-radius: 4px;
  color: var(--white);
  cursor: pointer;
  font-family: var(--term-font);
  font-size: 12px;
  padding: 6px 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.replay-button:hover {
  background-color: #3c3c3c;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.replay-icon {
  font-size: 14px;
  margin-right: 6px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}


@media (max-width: 640px) {

.terminal{
  margin:30px;
  width: calc(100% - 110px);

}
}
</style>
