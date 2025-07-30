<script setup>

const props = defineProps({
  head: {
    default: "Code Snippet",
    type: String,
  },
  sub: {
    default:
      "Store, reuse, and share code snippets both locally and publicly. Speed up your coding with ready-made solutions.",
    type: String,
  },
  index:{
    default:0
  },
  soon:{
    default:false
  }
});

const delaya = computed(() => `${props.index * 100}ms`  );


import { useInView } from 'motion-v'
import ConstructionTape from '../common/ConstructionTape.vue';


const domRef = ref()
const isInView = useInView(domRef,{ once: true })


const myclass = computed(()=>{


  if (isInView.value === true){
    return "in-view-card"
  }else{
    return "no-in-view-card"
  }
})


</script>

<template>
<div  id="card-feature-box" ref="domRef" :class="myclass" :style="{animationDelay:delaya}">
  <div id="cf-icon">
    <slot></slot>
  </div>
  <div id="cf-head">{{ props.head }}</div>
  <div id="cf-sub">{{ props.sub }}</div>
  <div id="cf-ribbon" v-if="props.soon">

    <ConstructionTape/>
  </div>
</div>
</template>

<style scoped>

#cf-ribbon{
  margin-top: auto;
  margin-bottom: 20px;
  width: 100%;
}

@keyframes fadeBlurUp {
  0% {
    opacity: 0;
    transform: translateY(40px);
    filter: blur(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}


.in-view-card{
animation: fadeBlurUp 0.6s ease-out forwards;
}

#card-feature-box {
    will-change: transform, opacity, filter;
  background-color: var(--bg2);

  border: 1px solid var(--border);
  border-radius: 10px;
  width: 250px;
  aspect-ratio: 300/280;
  padding: 10px;
  padding-top: 30px;
  display: flex;
  justify-content: flex-start;

  align-items: flex-start;
  flex-direction: column;
  gap: 15px;

  transition: all 200ms ease-in-out;
    opacity: 0;

}

#card-feature-box:hover {
  transform: translateY(-5px);
  border: 1px solid var(--white);
}

/* #cf-icon{
  border: 1px solid salmon;
} */

#cf-head {
  /* border: 1px solid salmon; */
  font-size: 25px;
  font-weight: 600;
  color: whitesmoke;
}

#cf-sub {
  /* border: 1px solid salmon; */
  font-size: 15px;
  font-weight: 500;
  font-family: var(--term-font);
}



@media (max-width: 640px) {
  #card-feature-box {
    width: 280px;
  }
}
</style>
