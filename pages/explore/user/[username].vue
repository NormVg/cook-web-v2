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
          <p class="user-rank">{{ userRank }}</p>
        </div>
        <div class="user-stats">
          <div class="stat-item">
            <span class="stat-value">{{ publicTemplates.length }}</span>
            <span class="stat-label">templates</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">{{ totalDownloads }}</span>
            <span class="stat-label">downloads</span>
          </div>
        </div>
      </div>

      <!-- Templates Section -->
      <div class="templates-section" v-if="publicTemplates.length > 0">
        <h3 class="section-heading">Templates</h3>
        <div class="templates-grid">
          <ExploreCard
            v-for="template in publicTemplates"
            :key="template.id"
            :name="`@${template.category}/${template.name}`"
            :type="template.category"
            :items="template.stack"
            :link="`/template?uid=${template.id}`"
          />
        </div>
      </div>

      <div v-else class="no-templates">
        <div class="empty-content">
          <div class="empty-icon">—</div>
          <p>No public templates</p>
        </div>
      </div>

      <!-- Tech Stack Section -->
      <div class="tech-stack-section" v-if="publicTemplates.length > 0 && uniqueTechStack.length > 0">
        <h3 class="tech-stack-heading">Technologies</h3>
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

const userRank = computed(() => {
  const templateCount = publicTemplates.value.length;
  const downloads = totalDownloads.value;

  // Calculate rank based on templates and downloads
  if (templateCount === 0) {
    return 'Explorer';
  } else if (templateCount === 1 && downloads < 10) {
    return 'First Timer';
  } else if (templateCount < 3 && downloads < 50) {
    return 'Beginner Cook';
  } else if (templateCount < 5 && downloads < 100) {
    return 'Home Cook';
  } else if (templateCount < 10 && downloads < 500) {
    return 'Amateur Chef';
  } else if (templateCount < 15 && downloads < 1000) {
    return 'Sous Chef';
  } else if (templateCount < 25 && downloads < 5000) {
    return 'Head Chef';
  } else if (templateCount < 50 && downloads < 10000) {
    return 'Executive Chef';
  } else if (templateCount >= 50 || downloads >= 10000) {
    return 'Master Chef';
  } else {
    return 'Skilled Cook';
  }
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
  width: 100%;
  margin: 0 auto;
  padding: 60px 40px;
  box-sizing: border-box;
  overflow-x: hidden;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 60px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--border);
  width: 100%;
  box-sizing: border-box;
}

.user-avatar {
  flex-shrink: 0;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--pink), var(--green));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 600;
  color: var(--bg);
}

.user-info {
  flex: 1;
}

.username {
  font-size: 28px;
  font-weight: 400;
  margin: 0 0 4px 0;
  color: var(--fg);
  letter-spacing: -0.5px;
}

.user-rank {
  font-size: 14px;
  color: var(--fg2);
  margin: 0;
  font-weight: 300;
  opacity: 0.7;
  font-style: italic;
}

.user-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-left: auto;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: right;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background-color: var(--border);
  opacity: 0.5;
}

.stat-value {
  font-size: 24px;
  font-weight: 300;
  color: var(--fg);
  letter-spacing: -1px;
}

.stat-label {
  font-size: 11px;
  color: var(--fg2);
  text-transform: lowercase;
  letter-spacing: 0.3px;
  font-weight: 300;
  opacity: 0.6;
}

.templates-section {
  margin-bottom: 60px;
  width: 100%;
  box-sizing: border-box;
}

.section-heading {
  font-size: 18px;
  font-weight: 300;
  color: var(--fg);
  margin: 0 0 20px 0;
  letter-spacing: -0.3px;
  text-transform: lowercase;
  opacity: 0.9;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
}

.no-templates {
  padding: 80px 20px;
  text-align: center;
}

.empty-content {
  max-width: 300px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 48px;
  font-weight: 200;
  color: var(--fg2);
  margin-bottom: 12px;
  opacity: 0.3;
  letter-spacing: 4px;
}

.empty-content p {
  font-size: 13px;
  color: var(--fg2);
  margin: 0;
  font-weight: 300;
  opacity: 0.6;
}

.tech-stack-section {
  margin-bottom: 60px;
  width: 100%;
  box-sizing: border-box;
}

.tech-stack-heading {
  font-size: 14px;
  font-weight: 400;
  margin: 0 0 16px 0;
  color: var(--fg);
  letter-spacing: 0.5px;
  opacity: 0.8;
}

.tech-stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  width: 100%;
  box-sizing: border-box;
}

.tech-item {
  padding: 5px 10px;
  font-size: 12px;
  color: var(--fg2);
  background-color: transparent;
  border: 1px solid var(--border);
  border-radius: 3px;
  transition: all 0.15s ease;
  cursor: default;
  font-weight: 300;
  opacity: 0.7;
}

.tech-item:hover {
  opacity: 1;
  border-color: var(--fg2);
}

@media (max-width: 768px) {
  .user-profile-container {
    padding: 40px 20px;
  }

  .templates-section {
    margin-bottom: 40px;
  }

  .user-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding-bottom: 30px;
  }

  .avatar-circle {
    width: 64px;
    height: 64px;
    font-size: 28px;
  }

  .username {
    font-size: 24px;
  }

  .user-stats {
    width: 100%;
    justify-content: flex-start;
    margin-left: 0;
    gap: 20px;
  }

  .stat-item {
    text-align: left;
  }

  .stat-value {
    font-size: 20px;
  }

  .stat-label {
    font-size: 10px;
  }

  .templates-grid {
    grid-template-columns: 1fr;
  }

  .no-templates {
    padding: 60px 20px;
  }

  .tech-item {
    font-size: 11px;
    padding: 4px 9px;
  }
}
</style>
