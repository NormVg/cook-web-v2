<template>
  <div class="search-res-header">
    <div class="results-count">
      {{ props.noRes }} results found
    </div>
  </div>
</template>

<script setup>

// Replace with actual count from your data
const props = defineProps({
  noRes:{
    type:Number,
    default:10,
  }
})
</script>

<style scoped>
.search-res-header {
  display: flex;
  align-items: center;
  padding: 16px 0;
}

.results-count {
  font-size: 15px;
  text-decoration: underline;
  margin-right: auto;
}
</style>
