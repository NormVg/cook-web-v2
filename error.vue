<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  error: Object
});

const errorCode = ref('404');
const errorTitle = ref('Page not found');
const errorMessage = ref("The page you're looking for doesn't exist");

onMounted(() => {
  if (props.error) {
    errorCode.value = props.error.statusCode || '404';

    if (props.error.statusCode === 500) {
      errorTitle.value = 'Server error';
      errorMessage.value = 'Something went wrong on our end';
    } else if (props.error.statusCode === 403) {
      errorTitle.value = 'Access denied';
      errorMessage.value = "You don't have permission to access this page";
    } else if (props.error.statusCode === 401) {
      errorTitle.value = 'Unauthorized';
      errorMessage.value = 'Please log in to access this page';
    }
  }
});

const handleError = () => clearError({ redirect: '/' });

definePageMeta({
  layout: false
});

useHead({
  title: `${errorCode.value} - Cook`,
});
</script>

<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-content">
        <div class="error-code">{{ errorCode }}</div>
        <h1>{{ errorTitle }}</h1>
        <p>{{ errorMessage }}</p>
        <div class="error-actions">
          <NuxtLink to="/" class="error-link primary">
            Return home
          </NuxtLink>
          <button @click="handleError" class="error-link secondary">
            Clear error
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg2, #0a0a0a);
  padding: 20px;
}

.error-container {
  max-width: 500px;
  width: 100%;
}

.error-content {
  text-align: center;
  opacity: 0;
  animation: fadeIn 0.6s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.error-code {
  font-size: 120px;
  font-weight: 200;
  color: var(--fg, #ffffff);
  margin-bottom: 16px;
  letter-spacing: -4px;
  line-height: 1;
  opacity: 0.3;
}

.error-content h1 {
  font-size: 24px;
  font-weight: 500;
  margin: 0 0 8px 0;
  color: var(--fg, #ffffff);
  letter-spacing: -0.5px;
}

.error-content p {
  font-size: 14px;
  color: var(--fg2, #a0a0a0);
  margin: 0 0 32px 0;
  font-weight: 300;
  opacity: 0.7;
}

.error-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.error-link {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 400;
  text-decoration: none;
  transition: all 0.2s ease;
  letter-spacing: 0.3px;
  cursor: pointer;
}

.error-link.primary {
  color: var(--fg, #ffffff);
  border: 1px solid var(--border, #333);
  background-color: transparent;
}

.error-link.primary:hover {
  border-color: var(--fg, #ffffff);
  background-color: rgba(255, 255, 255, 0.03);
}

.error-link.secondary {
  color: var(--fg2, #a0a0a0);
  border: 1px solid transparent;
  background-color: transparent;
}

.error-link.secondary:hover {
  color: var(--fg, #ffffff);
  border-color: var(--border, #333);
}

@media (max-width: 640px) {
  .error-code {
    font-size: 90px;
  }

  .error-content h1 {
    font-size: 20px;
  }

  .error-content p {
    font-size: 13px;
  }

  .error-link {
    font-size: 12px;
    padding: 9px 20px;
  }

  .error-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
