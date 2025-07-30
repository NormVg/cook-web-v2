<script setup>
import { motion } from 'motion-v';
import HomeTerminal from './HomeTerminal.vue';
import MyBtn from './MyBtn.vue';

</script>

<template>
  <div id="hero-box">
    <span>

    <motion.h1
        :initial="{ opacity: 0, y: 80, scale: 1, filter: 'blur(12px)' }"
        :animate="{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }"
        :transition="{ type: 'spring', stiffness: 120, damping: 14, delay: 0.40 }"
        :in-view-options="{ once: true }"
    >COOK</motion.h1>

    <motion.h3
    :initial="{ opacity: 0, y: 80, scale: 1, filter: 'blur(12px)' }"
    :animate="{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }"
    :transition="{ type: 'spring', stiffness: 120, damping: 14, delay: 0.70 }"
    :in-view-options="{ once: true }"

    >CODE COOKING FOR LAZY DEVELOPERS</motion.h3>

    <motion.p
    :initial="{ opacity: 0, y: 80, scale: 1, filter: 'blur(12px)' }"
    :animate="{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }"
    :transition="{ type: 'spring', stiffness: 120, damping: 14, delay: 1 }"
    :in-view-options="{ once: true }"
    >
      A everyday CLI tool for you, like a swiss army knife?
      But for the developers.
    </motion.p>

    <motion.div id="waitlist-btn"
    :initial="{ opacity: 0, x: -80, scale: 1, filter: 'blur(12px)' }"
    :animate="{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }"
    :transition="{ type: 'spring', stiffness: 120, damping: 14, delay: 1.2 }"
    :in-view-options="{ once: true }"

    >
      <!-- WAITLIST -->
      <MyBtn color="green" :callback="() => scrollToElement('#waitlist-box')">
        WAITLIST
      </MyBtn>
    </motion.div>

    </span>

    <HomeTerminal/>

  </div>
</template>

<style scoped>

/* #hero-box{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
} */

#hero-box{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  padding: 20px;

  /* flex-direction: column; */
}

/* #hero-box span{
  border: 1px solid salmon;
} */

h1{
  font-size: 80px;
  margin: 10px;
  color: whitesmoke;
  text-shadow: 0 0 20px var(--white), 0 0 40px var(--white), 0 0 60px var(--green);
  /* margin-top: 50px; */
}

h3{
  font-size: 25px;
  margin: 10px;
  font-weight: 400;
  color: var(--green);
  font-family: var(--term-font);
}

p{
  font-size: 18px;
  font-family: var(--term-font);
  margin-left: 10px;

}

#waitlist-btn{
  margin-bottom: 50px;
margin-top: 50px;
margin-left: 20px;

}

/* #waitlist-btn{
  border: 2px solid var(--green);
  border-radius: 7px;
  padding: 10px;
  color: var(--green);
  font-weight: 600;
  margin-bottom: 50px;
  transition: all 200ms ease-in-out;
}



#waitlist-btn:hover{
  background-color: var(--green);
  color: var(--bg);
} */


@media (max-width: 640px) {

#hero-box{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0;
  padding: 0px;

}

h3{
  text-align: center;

}

h1{

  margin-top: 50px;
  text-align: center;
}

p{
  text-align: center;
}

#waitlist-btn{
  /* border: 1px solid salmon; */
  display: flex;
  justify-content: center;
  align-items: center;
}


}

</style>
