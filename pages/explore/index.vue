<template>
  <BasicPage :is-page="isPage">
    <ExploreHeader />
    <ExploreFeatured :items="feturedList"/>

    <ExploreCategory
      name="FEATURED TEMPLATES"
      :items="FeaturedTemplates"
    />
<!--
    <ExploreCategory
      name="Popular Meals"
      :items="[
        { name: 'Meal 1', type: 'meal', items: ['item 1', 'item 2', 'item 3'] },
        { name: 'Meal 2', type: 'meal', items: ['item A', 'item B', 'item C'] },
        { name: 'Meal 3', type: 'meal', items: ['item X', 'item Y', 'item Z'] }
      ]"
    /> -->
  </BasicPage>
</template>

<script setup>
import { ref } from 'vue';
import BasicPage from '~/components/base/BasicPage.vue';
import ExploreFeatured from '~/components/explore/ExploreFeatured.vue';
import ExploreHeader from '~/components/explore/ExploreHeader.vue';
import ExploreCategory from '~/components/explore/ExploreCategory.vue';
import { useGetPublicTemplate } from '~/composable/useGetPublicTemplate';
import { useListPublicTemplate } from '~/composable/useListPublicTemplate';

const isPage = ref(true);

const feturedList = ref([])
const FeaturedTemplates = ref([])


const rawTemplatesPublicList = await useListPublicTemplate();
console.log(rawTemplatesPublicList);


const publicTemplatesListRaw = rawTemplatesPublicList.map(item => ({
  name: `@${item.category}/${item.name}`,
  type: 'template',
  items: item.stack,
  link: `/template?uid=${item.id}`
}));

feturedList.value = publicTemplatesListRaw
  .sort((a, b) => b.downloads - a.downloads)
  .slice(0, 5);

FeaturedTemplates.value = publicTemplatesListRaw
  .sort((a, b) => b.downloads - a.downloads)
  .slice(0, 8);

</script>

<style scoped>
/* styles go here */
</style>
