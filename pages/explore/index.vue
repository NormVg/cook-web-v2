<template>
  <BasicPage :is-page="true">
    <ExploreHeader />

    <!-- Empty State -->
    <div v-if="rawTemplatesPublicList.length === 0" class="empty-state-container">
      <div class="empty-state">
        <div class="empty-content">
          <div class="empty-icon">—</div>
          <h2>No templates yet</h2>
          <p>Be the first to share</p>
        </div>
        <NuxtLink to="/app" class="create-link">
          Create template
        </NuxtLink>
      </div>
    </div>

    <!-- Templates Content -->
    <template v-else>
      <ExploreFeatured :items="feturedList" />
      <ExploreCategory
        name="FEATURED TEMPLATES"
        :items="FeaturedTemplates"
      />
    </template>
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

const feturedList = ref([])
const FeaturedTemplates = ref([])

const rawTemplatesPublicList = await useListPublicTemplate();

if (rawTemplatesPublicList.length > 0) {
  const publicTemplatesListRaw = rawTemplatesPublicList.map(item => ({
    name: `@${item.category}/${item.name}`,
    type: 'template',
    items: item.stack,
    link: `/template?uid=${item.id}`,
    downloads: item.downloads || 0
  }));

  feturedList.value = publicTemplatesListRaw
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 5);

  FeaturedTemplates.value = publicTemplatesListRaw
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 8);
}
</script>

<style scoped>
.empty-state-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  padding: 20px 20px 40px;
  margin-top: -60px;
}

.empty-state {
  text-align: center;
  max-width: 400px;
  opacity: 0;
  animation: fadeIn 0.6s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.empty-content {
  margin-bottom: 40px;
}

.empty-icon {
  font-size: 72px;
  font-weight: 200;
  color: var(--fg2);
  margin-bottom: 24px;
  opacity: 0.5;
  letter-spacing: 8px;
}

.empty-state h2 {
  font-size: 24px;
  font-weight: 500;
  margin: 0 0 8px 0;
  color: var(--fg);
  letter-spacing: -0.5px;
}

.empty-state p {
  font-size: 14px;
  color: var(--fg2);
  margin: 0;
  font-weight: 300;
  opacity: 0.7;
}

.create-link {
  display: inline-block;
  padding: 10px 24px;
  color: var(--fg);
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 400;
  text-decoration: none;
  transition: all 0.2s ease;
  letter-spacing: 0.3px;
}

.create-link:hover {
  border-color: var(--fg);
  background-color: rgba(255, 255, 255, 0.03);
}

@media (max-width: 640px) {
  .empty-state-container {
    min-height: 60vh;
  }

  .empty-icon {
    font-size: 60px;
  }

  .empty-state h2 {
    font-size: 20px;
  }

  .empty-state p {
    font-size: 13px;
  }

  .create-link {
    font-size: 12px;
    padding: 9px 20px;
  }
}
</style>
