<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-card">
        <h1 class="login-title">Admin Login</h1>
        <p class="login-subtitle">Cook Admin Dashboard</p>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="Enter username"
              autocomplete="username"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter password"
              autocomplete="current-password"
              required
            />
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <button type="submit" class="login-button" :disabled="isLoading">
            <span v-if="!isLoading">Login</span>
            <span v-else>Logging in...</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: false
});

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    const { data, error } = await useFetch('/api/admin/auth', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    });

    if (error.value || data.value?.status !== 200) {
      errorMessage.value = data.value?.message || 'Invalid credentials';
      isLoading.value = false;
      return;
    }

    // Store admin session
    localStorage.setItem('admin_token', data.value.data.token);

    // Redirect to dashboard
    navigateTo('/admin/dashboard');
  } catch (err) {
    errorMessage.value = 'An error occurred. Please try again.';
    isLoading.value = false;
  }
};

// Check if already logged in
onMounted(() => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    navigateTo('/admin/dashboard');
  }
});

useHead({
  title: 'Admin Login - Cook',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
});
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 450px;
}

.login-card {
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 15px;
  padding: 50px 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.login-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: var(--fg);
  text-align: center;
}

.login-subtitle {
  font-size: 16px;
  color: var(--fg2);
  margin: 0 0 40px 0;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: var(--fg);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input {
  padding: 14px 16px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--fg);
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--green);
  background-color: rgba(255, 255, 255, 0.08);
}

.error-message {
  padding: 12px 16px;
  background-color: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 8px;
  color: #ff4444;
  font-size: 14px;
  text-align: center;
}

.login-button {
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  background-color: var(--green);
  color: var(--bg);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.login-button:hover:not(:disabled) {
  background-color: var(--pink);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .login-card {
    padding: 40px 30px;
  }

  .login-title {
    font-size: 28px;
  }
}
</style>
