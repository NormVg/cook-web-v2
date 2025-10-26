<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1>Admin Dashboard</h1>
      <button @click="handleLogout" class="logout-button">Logout</button>
    </div>

    <div class="dashboard-content">
      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📦</div>
          <div class="stat-info">
            <div class="stat-label">Total Files in DB</div>
            <div class="stat-value">{{ dbFiles.length }}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">☁️</div>
          <div class="stat-info">
            <div class="stat-label">Total Files in Appwrite</div>
            <div class="stat-value">{{ appwriteFiles.length }}</div>
          </div>
        </div>

        <div class="stat-card danger">
          <div class="stat-icon">🗑️</div>
          <div class="stat-info">
            <div class="stat-label">Unlisted Files</div>
            <div class="stat-value">{{ unlistedFiles.length }}</div>
          </div>
        </div>
      </div>

      <!-- Actions Section -->
      <div class="action-section">
        <div class="section-header">
          <h2>File Management</h2>
          <button
            @click="scanFiles"
            class="scan-button"
            :disabled="isScanning"
          >
            <span v-if="!isScanning">🔍 Scan Files</span>
            <span v-else>⏳ Scanning...</span>
          </button>
        </div>

        <!-- Unlisted Files List -->
        <div v-if="unlistedFiles.length > 0" class="unlisted-section">
          <div class="unlisted-header">
            <h3>Unlisted Files ({{ unlistedFiles.length }})</h3>
            <button
              @click="deleteAllUnlisted"
              class="delete-all-button"
              :disabled="isDeleting"
            >
              <span v-if="!isDeleting">🗑️ Delete All Unlisted</span>
              <span v-else>⏳ Deleting...</span>
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
                <span v-if="!deletingFiles.includes(file.$id)">Delete</span>
                <span v-else>...</span>
              </button>
            </div>
          </div>
        </div>

        <div v-else-if="scanned && unlistedFiles.length === 0" class="no-unlisted">
          <div class="success-icon">✅</div>
          <h3>All Clean!</h3>
          <p>No unlisted files found in Appwrite.</p>
        </div>

        <div v-else class="scan-prompt">
          <div class="scan-icon">🔍</div>
          <h3>Scan for Unlisted Files</h3>
          <p>Click the "Scan Files" button to find files in Appwrite that are not listed in the database.</p>
        </div>
      </div>

      <!-- Log Section -->
      <div v-if="logs.length > 0" class="log-section">
        <h3>Activity Log</h3>
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

const dbFiles = ref([]);
const appwriteFiles = ref([]);
const isScanning = ref(false);
const isDeleting = ref(false);
const deletingFiles = ref([]);
const scanned = ref(false);
const logs = ref([]);

const unlistedFiles = computed(() => {
  if (!scanned.value) return [];

  const dbFileIds = new Set(dbFiles.value.map(f => f.pointer));
  return appwriteFiles.value.filter(file => !dbFileIds.has(file.$id));
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

const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};

const handleLogout = () => {
  localStorage.removeItem('admin_token');
  navigateTo('/admin');
};

onMounted(() => {
  addLog('Admin dashboard loaded', 'info');
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
  background-color: #0a0a0a;
  color: var(--fg);
  padding: 20px;
}

.dashboard-header {
  max-width: 1400px;
  margin: 0 auto 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.dashboard-header h1 {
  font-size: 28px;
  margin: 0;
  color: var(--fg);
}

.logout-button {
  padding: 10px 20px;
  background-color: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color: #ff4444;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.logout-button:hover {
  background-color: rgba(255, 0, 0, 0.2);
}

.dashboard-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.stat-card {
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 25px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.stat-card.danger {
  border-color: rgba(255, 0, 0, 0.3);
  background-color: rgba(255, 0, 0, 0.05);
}

.stat-icon {
  font-size: 40px;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: var(--fg2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--fg);
}

.action-section {
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.section-header h2 {
  font-size: 22px;
  margin: 0;
}

.scan-button {
  padding: 12px 24px;
  background-color: var(--green);
  color: var(--bg);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.scan-button:hover:not(:disabled) {
  background-color: var(--pink);
}

.scan-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.unlisted-section {
  margin-top: 20px;
}

.unlisted-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border);
}

.unlisted-header h3 {
  font-size: 18px;
  margin: 0;
  color: #ff4444;
}

.delete-all-button {
  padding: 10px 20px;
  background-color: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color: #ff4444;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.delete-all-button:hover:not(:disabled) {
  background-color: rgba(255, 0, 0, 0.2);
}

.delete-all-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 500px;
  overflow-y: auto;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.file-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.file-info {
  flex: 1;
}

.file-id {
  font-family: monospace;
  font-size: 14px;
  color: var(--fg);
  margin-bottom: 5px;
}

.file-meta {
  display: flex;
  gap: 20px;
  font-size: 12px;
  color: var(--fg2);
}

.delete-button {
  padding: 8px 16px;
  background-color: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color: #ff4444;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.delete-button:hover:not(:disabled) {
  background-color: rgba(255, 0, 0, 0.2);
}

.delete-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.no-unlisted,
.scan-prompt {
  text-align: center;
  padding: 60px 20px;
}

.success-icon,
.scan-icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.no-unlisted h3,
.scan-prompt h3 {
  font-size: 22px;
  margin: 0 0 10px 0;
}

.no-unlisted p,
.scan-prompt p {
  color: var(--fg2);
  margin: 0;
}

.log-section {
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 30px;
}

.log-section h3 {
  font-size: 18px;
  margin: 0 0 20px 0;
}

.logs {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 13px;
}

.log-item {
  padding: 8px 12px;
  background-color: rgba(255, 255, 255, 0.02);
  border-left: 3px solid var(--border);
  border-radius: 4px;
}

.log-item.success {
  border-left-color: var(--green);
  background-color: rgba(76, 175, 80, 0.1);
}

.log-item.error {
  border-left-color: #ff4444;
  background-color: rgba(255, 0, 0, 0.1);
}

.log-item.warning {
  border-left-color: orange;
  background-color: rgba(255, 165, 0, 0.1);
}

.log-time {
  color: var(--fg2);
  margin-right: 10px;
}

.log-message {
  color: var(--fg);
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .section-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .unlisted-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .file-item {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .file-meta {
    flex-direction: column;
    gap: 5px;
  }
}
</style>
