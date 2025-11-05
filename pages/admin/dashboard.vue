<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <div class="header-left">
        <h1>admin</h1>
        <div class="header-subtitle">cook dashboard</div>
      </div>
      <button @click="handleLogout" class="logout-button">
        <span>logout</span>
      </button>
    </div>

    <div class="dashboard-content">
      <!-- Navigation Tabs -->
      <div class="tabs">
        <button
          @click="activeTab = 'files'"
          :class="['tab', { active: activeTab === 'files' }]"
        >
          <span class="tab-icon">📦</span>
          <span class="tab-label">files</span>
        </button>
        <button
          @click="activeTab = 'waitlist'"
          :class="['tab', { active: activeTab === 'waitlist' }]"
        >
          <span class="tab-icon">👥</span>
          <span class="tab-label">waitlist</span>
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon">📦</span>
            <span class="stat-label">database files</span>
          </div>
          <div class="stat-value">{{ dbFiles.length }}</div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-icon">☁️</span>
            <span class="stat-label">appwrite files</span>
          </div>
          <div class="stat-value">{{ appwriteFiles.length }}</div>
        </div>

        <div class="stat-card danger">
          <div class="stat-header">
            <span class="stat-icon">⚠️</span>
            <span class="stat-label">unlisted</span>
          </div>
          <div class="stat-value">{{ unlistedFiles.length }}</div>
        </div>

        <div class="stat-card success">
          <div class="stat-header">
            <span class="stat-icon">✨</span>
            <span class="stat-label">waitlist</span>
          </div>
          <div class="stat-value">{{ waitlistUsers.length }}</div>
        </div>
      </div>

      <!-- File Management Section -->
      <div v-show="activeTab === 'files'" class="action-section">
        <div class="section-header">
          <h2>file management</h2>
          <button
            @click="scanFiles"
            class="action-button"
            :disabled="isScanning"
          >
            <span v-if="!isScanning">scan files</span>
            <span v-else>scanning...</span>
          </button>
        </div>

        <!-- Unlisted Files List -->
        <div v-if="unlistedFiles.length > 0" class="unlisted-section">
          <div class="unlisted-header">
            <h3>unlisted files — {{ unlistedFiles.length }}</h3>
            <button
              @click="deleteAllUnlisted"
              class="action-button danger"
              :disabled="isDeleting"
            >
              <span v-if="!isDeleting">delete all</span>
              <span v-else>deleting...</span>
            </button>
          </div>

          <div class="files-list">
            <div
              v-for="file in unlistedFiles"
              :key="file.$id"
              class="file-item"
            >
              <div class="file-info">
                <div class="file-id">{{ file.$id }}</div>
                <div class="file-meta">
                  <span>Size: {{ formatSize(file.sizeOriginal) }}</span>
                  <span>Created: {{ formatDate(file.$createdAt) }}</span>
                </div>
              </div>
              <button
                @click="deleteSingleFile(file.$id)"
                class="delete-button"
                :disabled="deletingFiles.includes(file.$id)"
              >
                <span v-if="!deletingFiles.includes(file.$id)">delete</span>
                <span v-else>...</span>
              </button>
            </div>
          </div>
        </div>

        <div v-else-if="scanned && unlistedFiles.length === 0" class="empty-state">
          <div class="empty-icon">✓</div>
          <h3>all clean</h3>
          <p>no unlisted files found</p>
        </div>

        <div v-else class="empty-state">
          <div class="empty-icon">—</div>
          <h3>scan for files</h3>
          <p>click scan to find unlisted files</p>
        </div>
      </div>

      <!-- Waitlist Section -->
      <div v-show="activeTab === 'waitlist'" class="waitlist-section">
        <div class="section-header">
          <h2>waitlist users</h2>
          <button
            @click="fetchWaitlist"
            class="action-button"
            :disabled="isLoadingWaitlist"
          >
            <span v-if="!isLoadingWaitlist">refresh</span>
            <span v-else>loading...</span>
          </button>
        </div>

        <div v-if="waitlistUsers.length > 0" class="waitlist-filters">
          <div class="filter-group">
            <label>filter</label>
            <select v-model="waitlistFilter" class="filter-select">
              <option value="all">all types</option>
              <option value="beginner">beginner</option>
              <option value="intermediate">intermediate</option>
              <option value="advance">advanced</option>
            </select>
          </div>
          <div class="filter-group">
            <label>search</label>
            <input
              v-model="waitlistSearch"
              type="text"
              placeholder="search by email..."
              class="search-input"
            />
          </div>
        </div>

        <div v-if="filteredWaitlist.length > 0" class="waitlist-table-container">
          <table class="waitlist-table">
            <thead>
              <tr>
                <th>#</th>
                <th>email</th>
                <th>type</th>
                <th>date</th>
                <th>time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in filteredWaitlist" :key="user.id">
                <td class="index-cell">{{ index + 1 }}</td>
                <td class="email-cell">{{ user.email }}</td>
                <td>
                  <span class="type-badge" :class="user.type">
                    {{ user.type }}
                  </span>
                </td>
                <td class="date-cell">{{ formatDate(user.datetime) }}</td>
                <td class="time-cell">{{ formatTime(user.datetime) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else-if="isLoadingWaitlist" class="empty-state">
          <div class="empty-icon">⟳</div>
          <h3>loading...</h3>
          <p>fetching waitlist data</p>
        </div>

        <div v-else-if="!isLoadingWaitlist && waitlistUsers.length === 0" class="empty-state">
          <div class="empty-icon">—</div>
          <h3>no users yet</h3>
          <p>waitlist is empty</p>
        </div>

        <div v-else-if="!isLoadingWaitlist && filteredWaitlist.length === 0" class="empty-state">
          <div class="empty-icon">—</div>
          <h3>no results</h3>
          <p>try adjusting filters</p>
        </div>
      </div>

      <!-- Log Section -->
      <div v-if="logs.length > 0" class="log-section">
        <h3>activity log</h3>
        <div class="logs">
          <div v-for="(log, index) in logs" :key="index" class="log-item" :class="log.type">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

definePageMeta({
  layout: false,
  middleware: 'admin-auth'
});

const activeTab = ref('files');
const dbFiles = ref([]);
const appwriteFiles = ref([]);
const isScanning = ref(false);
const isDeleting = ref(false);
const deletingFiles = ref([]);
const scanned = ref(false);
const logs = ref([]);

// Waitlist state
const waitlistUsers = ref([]);
const isLoadingWaitlist = ref(false);
const waitlistFilter = ref('all');
const waitlistSearch = ref('');

const unlistedFiles = computed(() => {
  if (!scanned.value) return [];

  const dbFileIds = new Set(dbFiles.value.map(f => f.pointer));
  return appwriteFiles.value.filter(file => !dbFileIds.has(file.$id));
});

const filteredWaitlist = computed(() => {
  let filtered = waitlistUsers.value;

  // Filter by type
  if (waitlistFilter.value !== 'all') {
    filtered = filtered.filter(user => user.type === waitlistFilter.value);
  }

  // Filter by search
  if (waitlistSearch.value.trim()) {
    const search = waitlistSearch.value.toLowerCase();
    filtered = filtered.filter(user =>
      user.email.toLowerCase().includes(search)
    );
  }

  return filtered;
});

const addLog = (message, type = 'info') => {
  const time = new Date().toLocaleTimeString();
  logs.value.unshift({ time, message, type });
  if (logs.value.length > 50) logs.value.pop();
};

const scanFiles = async () => {
  isScanning.value = true;
  addLog('Starting file scan...', 'info');

  try {
    // Fetch DB files
    const { data: dbData } = await useFetch('/api/admin/files/db-list');
    dbFiles.value = dbData.value?.data || [];
    addLog(`Found ${dbFiles.value.length} files in database`, 'success');

    // Fetch Appwrite files
    const { data: awData } = await useFetch('/api/admin/files/appwrite-list');
    appwriteFiles.value = awData.value?.data || [];
    addLog(`Found ${appwriteFiles.value.length} files in Appwrite`, 'success');

    scanned.value = true;
    const unlistedCount = unlistedFiles.value.length;

    if (unlistedCount > 0) {
      addLog(`Found ${unlistedCount} unlisted files`, 'warning');
    } else {
      addLog('No unlisted files found', 'success');
    }
  } catch (error) {
    addLog('Error scanning files: ' + error.message, 'error');
  } finally {
    isScanning.value = false;
  }
};

const deleteSingleFile = async (fileId) => {
  if (!confirm(`Are you sure you want to delete file ${fileId}?`)) return;

  deletingFiles.value.push(fileId);
  addLog(`Deleting file ${fileId}...`, 'info');

  try {
    const { data, error } = await useFetch('/api/admin/files/delete', {
      method: 'POST',
      body: { fileId }
    });

    if (error.value || data.value?.status !== 200) {
      throw new Error(data.value?.message || 'Failed to delete file');
    }

    // Remove from local list
    appwriteFiles.value = appwriteFiles.value.filter(f => f.$id !== fileId);
    addLog(`Successfully deleted file ${fileId}`, 'success');
  } catch (error) {
    addLog(`Error deleting file ${fileId}: ${error.message}`, 'error');
  } finally {
    deletingFiles.value = deletingFiles.value.filter(id => id !== fileId);
  }
};

const deleteAllUnlisted = async () => {
  const count = unlistedFiles.value.length;
  if (!confirm(`Are you sure you want to delete all ${count} unlisted files? This cannot be undone.`)) return;

  isDeleting.value = true;
  addLog(`Starting bulk delete of ${count} files...`, 'info');

  let successCount = 0;
  let errorCount = 0;

  for (const file of unlistedFiles.value) {
    try {
      const { data, error } = await useFetch('/api/admin/files/delete', {
        method: 'POST',
        body: { fileId: file.$id }
      });

      if (error.value || data.value?.status !== 200) {
        throw new Error('Failed to delete');
      }

      successCount++;
      addLog(`Deleted ${file.$id} (${successCount}/${count})`, 'success');

      // Remove from local list
      appwriteFiles.value = appwriteFiles.value.filter(f => f.$id !== file.$id);
    } catch (error) {
      errorCount++;
      addLog(`Failed to delete ${file.$id}`, 'error');
    }
  }

  addLog(`Bulk delete completed: ${successCount} deleted, ${errorCount} failed`, 'info');
  isDeleting.value = false;
};

const fetchWaitlist = async () => {
  isLoadingWaitlist.value = true;
  addLog('Fetching waitlist users...', 'info');

  try {
    const { data, error } = await useFetch('/api/waitlist/list');

    if (error.value) {
      throw new Error(error.value?.message || 'Failed to fetch');
    }

    console.log('Waitlist API Response:', data.value);

    // The API returns { status: { data: [] } }
    waitlistUsers.value = data.value?.status?.data || [];
    addLog(`Loaded ${waitlistUsers.value.length} waitlist users`, 'success');
  } catch (error) {
    console.error('Waitlist fetch error:', error);
    addLog('Error fetching waitlist: ' + error.message, 'error');
  } finally {
    isLoadingWaitlist.value = false;
  }
};

const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatType = (type) => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const handleLogout = () => {
  localStorage.removeItem('admin_token');
  navigateTo('/admin');
};

onMounted(() => {
  addLog('Admin dashboard loaded', 'info');
  fetchWaitlist();
});

useHead({
  title: 'Admin Dashboard - Cook',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
});
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background: linear-gradient(to bottom, #0a0a0a 0%, #000000 100%);
  color: #ffffff;
  padding: 60px 24px;
}

.dashboard-header {
  max-width: 1400px;
  margin: 0 auto 60px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;
  background-color: transparent;
  border: none;
  border-radius: 0;
}

.header-content h1 {
  font-size: 40px;
  font-weight: 300;
  margin: 0 0 8px 0;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.header-content p {
  font-size: 14px;
  font-weight: 300;
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
}

.logout-button {
  padding: 10px 18px;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 400;
  transition: all 0.2s ease;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
}

.dashboard-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.tabs {
  display: flex;
  gap: 2px;
  margin-bottom: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tab {
  padding: 16px 0;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  font-size: 13px;
  font-weight: 300;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 24px 0 0;
}

.tab .tab-icon {
  font-size: 16px;
  opacity: 0.7;
}

.tab:hover {
  color: rgba(255, 255, 255, 0.7);
}

.tab.active {
  background-color: transparent;
  color: #ffffff;
  border-bottom-color: #00f5a0;
}

.tab.active .tab-icon {
  opacity: 1;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.stat-card {
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.2s ease;
}

.stat-card:hover {
  background-color: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}

.stat-card.danger {
  border-color: rgba(255, 0, 0, 0.2);
  background-color: rgba(255, 0, 0, 0.04);
}

.stat-card.info {
  border-color: rgba(0, 245, 160, 0.2);
  background-color: rgba(0, 245, 160, 0.04);
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-icon {
  font-size: 18px;
  opacity: 0.5;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: lowercase;
  letter-spacing: 0;
  margin: 0;
  font-weight: 300;
}

.stat-value {
  font-size: 36px;
  font-weight: 300;
  color: #ffffff;
  letter-spacing: -1px;
}

.action-section {
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 300;
  margin: 0;
  color: #ffffff;
}

.action-button {
  padding: 10px 20px;
  background: linear-gradient(135deg, rgba(0, 245, 160, 0.08) 0%, rgba(0, 245, 160, 0.04) 100%);
  color: #00f5a0;
  border: 1px solid rgba(0, 245, 160, 0.2);
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.action-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.action-button:hover:not(:disabled)::before {
  left: 100%;
}

.action-button:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(0, 245, 160, 0.15) 0%, rgba(0, 245, 160, 0.08) 100%);
  border-color: rgba(0, 245, 160, 0.4);
  color: #00f5a0;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 245, 160, 0.15);
}

.action-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.action-button.danger {
  background: linear-gradient(135deg, rgba(255, 68, 68, 0.08) 0%, rgba(255, 68, 68, 0.04) 100%);
  color: #ff4444;
  border-color: rgba(255, 68, 68, 0.2);
}

.action-button.danger:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(255, 68, 68, 0.15) 0%, rgba(255, 68, 68, 0.08) 100%);
  border-color: rgba(255, 68, 68, 0.4);
  box-shadow: 0 4px 12px rgba(255, 68, 68, 0.15);
}

.unlisted-section {
  margin-top: 32px;
}

.unlisted-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.unlisted-header h3 {
  font-size: 16px;
  font-weight: 300;
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
}

.delete-all-button {
  padding: 8px 16px;
  background-color: rgba(255, 0, 0, 0.03);
  border: 1px solid rgba(255, 0, 0, 0.25);
  color: rgba(255, 68, 68, 0.9);
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  transition: all 0.2s ease;
}

.delete-all-button:hover:not(:disabled) {
  background-color: rgba(255, 0, 0, 0.08);
  border-color: rgba(255, 0, 0, 0.4);
  color: #ff4444;
}

.delete-all-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 500px;
  overflow-y: auto;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.file-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.12);
}

.file-info {
  flex: 1;
}

.file-id {
  font-family: 'SF Mono', 'Monaco', monospace;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  font-weight: 300;
}

.file-meta {
  display: flex;
  gap: 16px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 300;
}

.delete-button {
  padding: 6px 14px;
  background-color: rgba(255, 0, 0, 0.03);
  border: 1px solid rgba(255, 0, 0, 0.2);
  color: rgba(255, 68, 68, 0.85);
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 400;
  transition: all 0.2s ease;
}

.delete-button:hover:not(:disabled) {
  background-color: rgba(255, 0, 0, 0.08);
  border-color: rgba(255, 0, 0, 0.35);
  color: #ff4444;
}

.delete-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.no-unlisted,
.scan-prompt {
  text-align: center;
  padding: 80px 24px;
}

.success-icon,
.scan-icon {
  font-size: 32px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.no-unlisted h3,
.scan-prompt h3 {
  font-size: 16px;
  font-weight: 300;
  margin: 0 0 8px 0;
  color: rgba(255, 255, 255, 0.7);
}

.no-unlisted p,
.scan-prompt p {
  color: rgba(255, 255, 255, 0.4);
  font-weight: 300;
  font-size: 13px;
  margin: 0;
}

.log-section {
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 32px;
}

.log-section h3 {
  font-size: 16px;
  font-weight: 300;
  margin: 0 0 24px 0;
  color: #ffffff;
}

.logs {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 300px;
  overflow-y: auto;
  font-family: 'SF Mono', 'Monaco', monospace;
  font-size: 12px;
}

.log-item {
  padding: 10px 14px;
  background-color: rgba(255, 255, 255, 0.03);
  border-left: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 3px;
}

.log-item.success {
  border-left-color: #00f5a0;
  background-color: rgba(0, 245, 160, 0.05);
}

.log-item.error {
  border-left-color: #ff4444;
  background-color: rgba(255, 0, 0, 0.05);
}

.log-item.warning {
  border-left-color: #ffaa00;
  background-color: rgba(255, 170, 0, 0.05);
}

.log-time {
  color: rgba(255, 255, 255, 0.4);
  margin-right: 12px;
  font-weight: 300;
}

.log-message {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
}

/* Waitlist Section */
.waitlist-section {
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 32px;
}

.waitlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.waitlist-header h2 {
  font-size: 20px;
  font-weight: 300;
  margin: 0;
  color: #ffffff;
}

.waitlist-filters {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  text-transform: lowercase;
}

.filter-select,
.search-input {
  padding: 10px 14px;
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  font-weight: 400;
  transition: all 0.2s ease;
}

.filter-select:focus,
.search-input:focus {
  outline: none;
  border-color: rgba(0, 245, 160, 0.4);
  background-color: rgba(255, 255, 255, 0.06);
}

.waitlist-table-container {
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
}

.waitlist-table {
  width: 100%;
  border-collapse: collapse;
}

.waitlist-table thead {
  background-color: rgba(255, 255, 255, 0.04);
}

.waitlist-table th {
  padding: 16px;
  text-align: left;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: lowercase;
  letter-spacing: 0;
  font-weight: 400;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.waitlist-table tbody tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background-color 0.2s ease;
}

.waitlist-table tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.04);
}

.waitlist-table tbody tr:last-child {
  border-bottom: none;
}

.waitlist-table td {
  padding: 16px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 400;
}

.email-cell {
  font-family: 'SF Mono', 'Monaco', monospace;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
}

.type-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 300;
  text-transform: lowercase;
  border: 1px solid;
}

.type-badge.beginner {
  background-color: rgba(0, 245, 160, 0.05);
  color: #00f5a0;
  border-color: rgba(0, 245, 160, 0.2);
}

.type-badge.intermediate {
  background-color: rgba(255, 200, 0, 0.05);
  color: #ffcc00;
  border-color: rgba(255, 200, 0, 0.2);
}

.type-badge.advance {
  background-color: rgba(255, 0, 110, 0.05);
  color: #ff006e;
  border-color: rgba(255, 0, 110, 0.2);
}

.no-waitlist {
  text-align: center;
  padding: 80px 24px;
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.no-waitlist h3 {
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.7);
}

.no-waitlist p {
  font-size: 13px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
}

/* Empty State Styles */
.empty-state {
  text-align: center;
  padding: 80px 24px;
}

.empty-state .empty-icon {
  font-size: 32px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.empty-state h3 {
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.7);
}

.empty-state p {
  font-size: 13px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}

/* Loading Animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.empty-state .empty-icon:has-text("⟳") {
  animation: spin 1s linear infinite;
}

/* Scrollbar Styling */
.files-list::-webkit-scrollbar,
.logs::-webkit-scrollbar {
  width: 6px;
}

.files-list::-webkit-scrollbar-track,
.logs::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 3px;
}

.files-list::-webkit-scrollbar-thumb,
.logs::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.files-list::-webkit-scrollbar-thumb:hover,
.logs::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* Responsive Design */
@media (max-width: 768px) {
  .admin-dashboard {
    padding: 40px 16px;
  }

  .dashboard-header {
    flex-direction: column;
    gap: 20px;
    text-align: left;
    margin-bottom: 40px;
  }

  .header-content h1 {
    font-size: 32px;
  }

  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .unlisted-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .file-item {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .file-meta {
    flex-direction: column;
    gap: 6px;
  }

  .tabs {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .tab {
    white-space: nowrap;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .waitlist-filters {
    flex-direction: column;
  }

  .filter-group {
    min-width: 100%;
  }

  .waitlist-table {
    font-size: 12px;
  }

  .waitlist-table th,
  .waitlist-table td {
    padding: 12px 10px;
  }
}
</style>
