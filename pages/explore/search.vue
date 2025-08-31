<template>
  <BasicPage :is-page="isPage">
    <SearchHeader v-model:search-temp="searchTemplates"/>

    <SearchNF v-if="searchTemplates.length === 0"/>
    <SearchRes v-else :no-res="searchTemplates.length"/>
    <div class="box-card">

      <SearchCard v-for="item in searchTemplates" :key="item" :name="`@${item.item.category}/${item.item.name}`" :items="item.item.stack" :version="item.item.version" :author="item.item.author" :published="item.item.date" :downloads="item.item.downloads" :link="`/template?uid=${item.item.id}`"/>
    </div>
  </BasicPage>
</template>

<script setup>
import { ref } from 'vue';
import BasicPage from '~/components/base/BasicPage.vue';

import SearchHeader from '~/components/explore/SearchHeader.vue';
import SearchCard from '~/components/explore/SearchCard.vue';
import SearchNF from '~/components/explore/SearchNF.vue';
import SearchRes from '~/components/explore/SearchRes.vue';

const isPage = ref(true);

const route = useRoute();

route.query.q ? isPage.value = true : isPage.value = false


const searchTemplates = ref([])



</script>

<style scoped>
.box-card{
  min-height: 50vh;
}
/* styles go here */
</style>
