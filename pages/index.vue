<script setup>
import CircleImg from "~/assets/img/circle-bg.png"
import BasicFooter from "~/components/base/BasicFooter.vue";
import About from "~/components/home/About.vue";

import Features from "~/components/home/Features.vue";

const isInitLoad = ref(true);


import Header from "~/components/home/Header.vue";
import Hero from "~/components/home/Hero.vue";
import Waitlist from "~/components/home/Waitlist.vue";
import HomeLoader from "~/components/pop/HomeLoader.vue";



// import PopLoaderScreen from "~/components/pop/PopLoaderScreen.vue";



onMounted(() => {
  setInterval(() => {

    isInitLoad.value = false;
  }, 1000);


});

</script>

<template>
<div v-if="!isInitLoad">

  <img :src="CircleImg" class="img1" alt="img1">
  <img :src="CircleImg" class="img2" alt="img2">


  <Header  />
  <Hero/>
  <Waitlist/>
  <Features/>
  <About/>

  <!-- <Footer/> -->
   <div class="footer">

     <BasicFooter/>
   </div>


</div>


  <Transition>
    <HomeLoader v-if="isInitLoad"/>
  </Transition>

</template>

<style scoped>




img{
  z-index: -10px;
  position: fixed;
  opacity: 0.5;
}

.img1{
  height: 250px;
  right: -125px;
  top: 100px;
  animation: rotate 20s ease-in-out  infinite ;

}


.img2{
  height: 200px;
  left: -80px;
  bottom: -40px;
  animation: rotate 15s ease-in-out  infinite ;

}

/*
div{
cursor:url('~/assets/img/my.cur'),  0 0, auto;;

} */


.footer{
/* border: 1px solid salmon; */
/* background-color: var(--bg2); */
display: flex;
align-items: center;
justify-content: center;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
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

