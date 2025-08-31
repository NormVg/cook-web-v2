<template>
  <div class="explore-category">
    <div class="ec-head">{{ props.name }}</div>
    <div class="ec-body">
      <ExploreCard v-for="(item, index) in props.items" :key="index" :name="item.name" :type="item.type" :items="item.items" :link="item.link"/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: 'Category Name'
  },
  items: {
    type: Array,
    default:[]
  }
})

</script>

<style scoped>

.explore-category{
  margin-top: 50px;
}

.ec-head{
  font-size: 20px;
  margin-bottom: 15px;
  margin-left: 10px;
}

.ec-body{
  margin-left: 20px;
  display: flex;
  flex-wrap: wrap;
  /* gap: 10px; */
  padding-bottom: 10px;
  padding-left: 10px;
}
</style>
