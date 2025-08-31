<template>
  <div class="e-card" :title="props.name" @click="openLink(props.link)">
    <div class="ecard-head">
      <div class="ecard-name" :title="props.name">{{props.name}}</div>
      <div class="ecard-type" :title="props.type">{{props.type}}</div>

    </div>
    <div class="ecards-body" >
      <div v-for="(item, index) in props.items" :key="index" class="ecard-item">{{item}}</div>
    </div>
</div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: '@nuxt/nuxt-pinia-dizzle'
  },
  type: {
    type: String,
    default: 'template'
  },
  items: {
    type: Array,
    default: () => ['item 1', 'item 2', 'item 3', 'item 2', 'item 3']
  },
  link:{
    type: String,
    default: 'template'
  }
});

const openLink = (url) => {
  if (url) {
    window.open(url, '_blank');
  }}
</script>

<style scoped>
.e-card{
  background-color: var(--bg);
  /* aspect-ratio: 300 / 100; */
  width: 270px;
  height: 90px;
  border-radius: 10px;
  border: 1px solid var(--border);
  margin-right: 10px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.e-card:hover{
  border: 1px solid var(--fg2);
}

.ecard-head{
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px;

  padding-top: 15px;
}

.ecard-name{
  font-weight: 600;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ecard-type{
  font-size: 13px;
  color: var(--pink);
  padding: 2px 5px;
  border-radius: 7px;
  border: 1px solid var(--pink);
  font-weight: 300;
  margin-left: 5px;
}

.ecards-body{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  padding: 10px;

  padding-top: 5px;
  overflow-x: auto;
  scrollbar-width: none;
  }



.ecard-item{
  background-color: var(--bg2);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;

}

</style>
