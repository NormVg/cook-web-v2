<template>
  <div id="explore-fetured">
    <div id="ef-head">FEATURED MEALS</div>

    <div id="ef-marquee">
        <NuxtMarquee :auto-fill="true" :pause-on-hover="true" :gradient="true" gradient-color="#1A1A1A" :gradient-width="100">
      <ExploreCard v-for="(item, index) in props.items" :key="index" :name="item.name" :type="item.type" :items="item.items" :link="item.link"/>


  </NuxtMarquee>

    </div>
  </div>
</template>

<script  setup>
import ExploreCard from './ExploreCard.vue';

const props = defineProps({
  items:{
    default:[],
    type:Array
  }
})

</script>

<style scoped>
#ef-head{
  font-size: 20px;
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>
