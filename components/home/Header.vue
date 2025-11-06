<script setup>
import logo from "~/assets/img/logo.svg";
import { useInView, motion } from "motion-v"
// import { scrollToElement } from "~/utils/scrollView.js";


</script>

<template>
  <motion.div id="header-box">
    <motion.img :src="logo" alt="cook logo"

    :initial="{ opacity: 0, y:-50,  filter: 'blur(12px)' }"
    :animate="{ opacity: 1,y:0,  filter: 'blur(0px)' }"
    :transition="{  delay: 0.1, duration:0.3 }"
    />

    <motion.div id="nav-box"
    :initial="{ opacity: 0, y: -50,  filter: 'blur(15px)' }"
        :animate="{ opacity: 1, y: 0,  filter: 'blur(0px)' }"
        :transition="{  delay: 0.2 , duration:0.3}"
    >
       <NuxtLink to="https://github.com/TheAlphaOnes/cook-cli">
        <div class="nav-item">CLI</div>
      </NuxtLink>

      <NuxtLink to="/app">
      <div class="nav-item">APP</div>
      </NuxtLink>

      <NuxtLink to="/explore">
        <div class="nav-item">EXPLORE</div>
      </NuxtLink>

      <div class="nav-item" @click="scrollToElement('#feature-section')">FEATURES</div>



      <!-- <NuxtLink to="/login">
      <div class="nav-item loginBtn">LOGIN</div>
      </NuxtLink> -->
    </motion.div>
  </motion.div>
</template>

<style scoped>
a {
  text-decoration: none;
}

#header-box {
  /* border: 1px solid salmon; */
  padding: 10px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

#header-box img {
  height: 50px;
}

#nav-box {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 20px;
}

.nav-item {
  padding: 5px 10px;
  transition: 200ms all ease-in-out;
  font-weight: 500;
  cursor: pointer;
}

.nav-item:hover {
  background-color: var(--green);
  color: var(--bg);
}

.loginBtn {
  border: 1px solid var(--green);
  border-radius: 5px;
  color: var(--green);
}

@media (max-width: 640px) {
  .nav-item {
    font-size: 14px;
  }
}
</style>
