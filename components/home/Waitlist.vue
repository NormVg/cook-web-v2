<script setup>
import {  motion } from 'motion-v';

const email = ref("");

const selected = ref(1);

const cstyle = computed(() => {
  if (selected.value === 0) {
    return [{ opacity: 1 }, { opacity: 0 }, { opacity: 0 }];
  } else if (selected.value === 1) {
    return [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }];
  } else if (selected.value === 2) {
    return [{ opacity: 0 }, { opacity: 0 }, { opacity: 1 }];
  }
});

const isWaiting = ref(false);
const showSuccess = ref(false);
const errorMessage = ref("");

const changeSelected = (param) => {
  selected.value = param;
};

const waitlistJoin = async () => {
  // Prevent multiple submissions
  if (isWaiting.value) {
    return;
  }

  if (!email.value.trim()) {
    errorMessage.value = "Please enter a valid email address.";
    setTimeout(() => errorMessage.value = "", 3000);
    return;
  }

  isWaiting.value = true;
  errorMessage.value = "";

  try {
    const types = ["beginner", "intermediate", "advance"];
    const selectedType = types[selected.value];

    const data = await $fetch("/api/waitlist/add", {
      method: "POST",
      body: { email: email.value, type: selectedType },
    });

    console.log(data);

    // Show success message
    showSuccess.value = true;

    // Reset form
    email.value = "";
    selected.value = 1;

    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);

  } catch (error) {
    console.error("Waitlist submission error:", error);
    errorMessage.value = error.data?.msg || "Failed to join waitlist. Please try again.";
    setTimeout(() => errorMessage.value = "", 3000);
  } finally {
    isWaiting.value = false;
  }
};

</script>

<template>

  <motion.div id="waitlist-box"
    :initial="{ opacity: 0,   filter: 'blur(15px)' }"
    :while-in-view="{ opacity: 1,  filter: 'blur(0px)' }"
    :in-view-options="{ once: true , amount:0.9}"

  >
    <h2>JOIN THE WAITLIST</h2>

    <!-- Success Message -->
    <Transition name="slide-down">
      <div v-if="showSuccess" class="success-message">
        <span class="success-icon">✓</span>
        <span>Welcome aboard! Check your email for confirmation.</span>
      </div>
    </Transition>

    <!-- Error Message -->
    <Transition name="slide-down">
      <div v-if="errorMessage" class="error-message">
        <span class="error-icon">⚠</span>
        <span>{{ errorMessage }}</span>
      </div>
    </Transition>

    <motion.div id="email-box"
    :initial="{ opacity: 0, }"
    :while-in-view="{ opacity: 1}"
    :in-view-options="{ once: true,amount:1 }"
    :transition="{delay:0.7}"

    >
      <div>email <span>$</span></div>
      <input type="text" v-model="email" />
    </motion.div>

    <div id="check-box">
      <motion.div class="check-item" @click="changeSelected(0);"

    :initial="{ opacity: 0, y:-10, }"
    :while-in-view="{ opacity: 1,y:0 }"
    :in-view-options="{ once: true,amount:1 }"
    :transition="{delay:.8}"
      >
        <span id="wait-select" :style="cstyle[0]">></span> [A] Beginner (I burn
        water)
      </motion.div>

      <motion.div class="check-item" @click="changeSelected(1);"
      :initial="{ opacity: 0, y:-10, }"
    :while-in-view="{ opacity: 1,y:0 }"
    :in-view-options="{ once: true,amount:1 }"
    :transition="{delay:0.9}"
      >
        <span id="wait-select" :style="cstyle[1]">></span> [B] Intermediate (I
        can follow recipes)
      </motion.div>

      <motion.div class="check-item" @click="changeSelected(2);"

      :initial="{ opacity: 0, y:-10, }"
    :while-in-view="{ opacity: 1,y:0 }"
    :in-view-options="{ once: true,amount:1 }"
    :transition="{delay:1}"
      >
        <span id="wait-select" :style="cstyle[2]">></span> [C] Advanced (I
        experiment with recipes)
      </motion.div>
    </div>

    <div
      id="join-btn"
      @click="waitlistJoin()"
      :class="{ 'submitting': isWaiting, 'disabled': isWaiting }"
    >
      <span v-if="!isWaiting">JOIN</span>
      <span v-else class="button-loader">
        <span class="spinner"></span>
        JOINING...
      </span>
    </div>
  </motion.div>

</template>

<style scoped>
#waitlist-box {
  background-color: var(--bg2);
  margin: 50px auto;
  /* width: 50vw; */
  padding: 20px 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  margin-top: 200px;
  margin-bottom: 200px;

  border-radius: 5px;
}

#join-btn {
  width: 90%;
  border: 1px solid var(--green);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px;
  border-radius: 3px;
  font-size: 18px;
  color: var(--green);
  transition: all ease-in-out 200ms;
  user-select: none;
  cursor: pointer;
}

#join-btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

#join-btn.submitting {
  background-color: var(--green);
  color: var(--bg);
}

.button-loader {
  display: flex;
  align-items: center;
  gap: 10px;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid var(--bg);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

#join-btn:hover:not(.disabled){
  background-color: var(--green);
  color: var(--bg2);

}


#join-btn:active{
  letter-spacing: 5px;
}

h2 {
  font-size: 30px;
  color: var(--green);
}

#check-box{
  width: 90%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 25px;
  cursor: pointer;
  font-family: var(--term-font);


}

#wait-select{
  transition: all ease-in-out 200ms;
}

#email-box{
  width: 90%;
  font-family: var(--term-font);
}

#email-box input {
  width: 100%;

  background-color: var(--bg2);
  border: none;
  border-bottom: 3px solid var(--green);
  font-family: var(--font);
  color: whitesmoke;
  font-size: 20px;
  margin-top: 10px;
}

#email-box input:focus {
  background-color: var(--bg2);
  border: none;
  outline: none;
  border-bottom: 3px dotted var(--green);
}

#wait-select{
  color: var(--green);
}

/* Success Message */
.success-message {
  width: 90%;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 245, 160, 0.1);
  border: 1px solid var(--green);
  border-radius: 8px;
  padding: 14px 18px;
  color: var(--green);
  font-size: 14px;
  font-weight: 500;
}

.success-icon {
  width: 24px;
  height: 24px;
  background: var(--green);
  color: var(--bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
}

/* Error Message */
.error-message {
  width: 90%;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 0, 110, 0.1);
  border: 1px solid var(--pink);
  border-radius: 8px;
  padding: 14px 18px;
  color: var(--pink);
  font-size: 14px;
  font-weight: 500;
}

.error-icon {
  width: 24px;
  height: 24px;
  background: var(--pink);
  color: var(--bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
}

/* Transitions */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 640px) {

#waitlist-box{
  width: 90%;
  padding: 10px
}

h2{
  font-size: 25px;
}

.check-item{
  font-size: 14px;
  font-weight: 800;
}


#check-box{
  width: 100%;
gap: 20px;

}

}

</style>
