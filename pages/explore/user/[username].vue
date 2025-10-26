<template>
  <BasicPage :is-page="isPage">
    <div class="user-profile-container">
      <!-- User Header -->
      <div class="user-header">
        <div class="user-avatar">
          <div class="avatar-circle">
            {{ userInitials }}
          </div>
        </div>
        <div class="user-info">
          <h1 class="username">@{{ username }}</h1>
          <p class="user-name">{{ userDetails?.name || 'Cook User' }}</p>
          <div class="user-stats">
            <div class="stat-item">
              <span class="stat-value">{{ publicTemplates.length }}</span>
              <span class="stat-label">Public Templates</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ totalDownloads }}</span>
              <span class="stat-label">Total Downloads</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Templates Section -->
      <div class="templates-section">
        <div class="section-header">
          <h2>Public Templates</h2>
          <span class="template-count">{{ publicTemplates.length }} templates</span>
        </div>

        <div v-if="publicTemplates.length > 0" class="templates-grid">
          <ExploreCard
            v-for="template in publicTemplates"
            :key="template.id"
            :name="`@${template.category}/${template.name}`"
            :type="template.category"
            :items="template.stack"
            :link="`/template?uid=${template.id}`"
          />
        </div>

        <div v-else class="no-templates">
          <div class="empty-state">
            <div class="empty-icon">📦</div>
            <h3>No public templates yet</h3>
            <p>This user hasn't published any templates yet.</p>
          </div>
        </div>
      </div>

      <!-- Tech Stack Section -->
      <div class="tech-stack-section" v-if="publicTemplates.length > 0 && uniqueTechStack.length > 0">
        <div class="tech-stack-header">
          <h3>Tech Stack</h3>
          <span class="tech-count">{{ uniqueTechStack.length }} technologies</span>
        </div>
        <div class="tech-stack-list">
          <span
            v-for="tech in uniqueTechStack"
            :key="tech"
            class="tech-item"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </BasicPage>
</template>

<script setup>
import { ref, computed } from 'vue';
import BasicPage from '~/components/base/BasicPage.vue';
import ExploreCard from '~/components/explore/ExploreCard.vue';
import { useGetUserPublicTemplates } from '~/composable/useGetUserPublicTemplates';

const route = useRoute();
const username = ref(route.params.username);
const isPage = ref(true);
const publicTemplates = ref([]);
const userDetails = ref(null);

// Fetch user details
const fetchUserDetails = async () => {
  try {
    const { data } = await useFetch(`/api/v2/user/get-by-user?username=${username.value}`);
    if (data.value?.data && data.value.data.length > 0) {
      userDetails.value = data.value.data[0];
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
};

// Fetch public templates
const fetchPublicTemplates = async () => {
  try {
    const templates = await useGetUserPublicTemplates(username.value);
    publicTemplates.value = templates || [];
    if (templates.length === 0) {
      isPage.value = false;
    }
  } catch (error) {
    console.error('Error fetching templates:', error);
    isPage.value = false;
  }
};

// Computed properties
const userInitials = computed(() => {
  if (userDetails.value?.name) {
    return userDetails.value.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  return username.value.slice(0, 2).toUpperCase();
});

const totalDownloads = computed(() => {
  return publicTemplates.value.reduce((sum, template) => sum + (template.downloads || 0), 0);
});

const uniqueTechStack = computed(() => {
  const stack = new Set();
  publicTemplates.value.forEach(template => {
    template.stack?.forEach(tech => stack.add(tech));
  });
  return Array.from(stack).slice(0, 30); // Limit to 30 technologies
});

// Fetch data on mount
await Promise.all([fetchUserDetails(), fetchPublicTemplates()]);

// SEO
useHead({
  title: `@${username.value} - Cook Templates`,
  meta: [
    { name: 'description', content: `Explore public templates by @${username.value} on Cook` }
  ]
});
</script>

<style scoped>
.user-profile-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

.user-header {
  display: flex;
  gap: 30px;
  margin-bottom: 50px;
  padding: 30px;
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 15px;
}

.user-avatar {
  flex-shrink: 0;
}

.avatar-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--pink), var(--green));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  color: var(--bg);
}

.user-info {
  flex: 1;
}

.username {
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: var(--fg);
}

.user-name {
  font-size: 18px;
  color: var(--fg2);
  margin: 0 0 20px 0;
}

.user-stats {
  display: flex;
  gap: 40px;
  margin-top: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--green);
}

.stat-label {
  font-size: 14px;
  color: var(--fg2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.templates-section {
  margin-bottom: 50px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--border);
}

.section-header h2 {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: var(--fg);
}

.template-count {
  font-size: 16px;
  color: var(--fg2);
  background-color: var(--bg);
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid var(--border);
}

.templates-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.no-templates {
  padding: 60px 20px;
}

.empty-state {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 24px;
  margin: 0 0 10px 0;
  color: var(--fg);
}

.empty-state p {
  font-size: 16px;
  color: var(--fg2);
  margin: 0;
}

.tech-stack-section {
  margin-bottom: 50px;
}

.tech-stack-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.tech-stack-header h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--fg);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tech-count {
  font-size: 13px;
  color: var(--fg2);
  opacity: 0.7;
}

.tech-stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-item {
  padding: 6px 12px;
  font-size: 13px;
  color: var(--fg2);
  background-color: transparent;
  border: 1px solid var(--border);
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: default;
}

.tech-item:hover {
  border-color: var(--fg2);
  color: var(--fg);
}

@media (max-width: 768px) {
  .user-profile-container {
    padding: 20px 15px;
  }

  .user-header {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }

  .user-avatar {
    margin: 0 auto;
  }

  .avatar-circle {
    width: 100px;
    height: 100px;
    font-size: 40px;
  }

  .username {
    font-size: 28px;
  }

  .user-stats {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .templates-grid {
    justify-content: center;
  }

  .tech-stack-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
