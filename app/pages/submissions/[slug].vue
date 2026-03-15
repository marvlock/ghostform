<script setup lang="ts">
const { isAuthenticated, checkAuth, loading: authLoading } = useAuth()
const route = useRoute()
const slug = route.params.slug as string

const form = ref<any>(null)
const submissions = ref<any[]>([])
const loading = ref(true)
const error = ref('')

await checkAuth()

if (process.client) {
  onMounted(async () => {
    if (!isAuthenticated.value) {
      await checkAuth()
      if (!isAuthenticated.value) {
        await navigateTo('/login')
      }
    }
  })
} else {
  if (!isAuthenticated.value) {
    await navigateTo('/login')
  }
}

try {
  form.value = await $fetch(`/api/forms/${slug}`)
  const rawSubmissions = await $fetch(`/api/submissions/${slug}`)
  
  submissions.value = rawSubmissions.map((sub: any) => ({
    ...sub,
    data: sub.data || {}
  }))
} catch (err: any) {
  if (err.statusCode === 401 || err.statusCode === 403) {
    await navigateTo('/login')
  } else if (err.statusCode === 404) {
    error.value = 'Form not found'
  } else {
    error.value = err.data?.message || 'Failed to load submissions'
  }
} finally {
  loading.value = false
}

function formatDateTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

function exportJSON() {
  const dataStr = JSON.stringify(submissions.value, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${form.value?.slug || 'submissions'}-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function getFieldLabel(fieldId: string) {
  if (!form.value?.fields) return fieldId
  const field = form.value.fields.find((f: any) => f.id === fieldId)
  return field?.label || fieldId
}
</script>

<template>
  <div class="submissions-page">
    <div class="container">
      <div class="page-header">
        <div class="header-main">
          <NuxtLink to="/forms" class="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Dashboard
          </NuxtLink>
          <h1 class="page-title">{{ form?.name || 'Submissions' }}</h1>
          <p class="page-subtitle">{{ submissions.length }} secure declarations received.</p>
        </div>
        <div class="header-actions">
          <button v-if="submissions.length > 0" @click="exportJSON" class="btn btn-subtle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Export Dataset
          </button>
        </div>
      </div>

      <div v-if="loading" class="state-container">
        <div class="spinner"></div>
        <p>Decrypting records...</p>
      </div>

      <div v-else-if="error" class="state-container error">
        <p>{{ error }}</p>
      </div>

      <div v-else-if="submissions.length === 0" class="state-container empty">
        <div class="empty-icon">∅</div>
        <h2>No submissions yet</h2>
        <p>This endpoint is ready to receive data.</p>
        <NuxtLink :to="`/form/${slug}`" class="btn btn-primary" target="_blank">Test Endpoint</NuxtLink>
      </div>

      <div v-else class="submissions-stack">
        <div v-for="(submission, index) in submissions" :key="submission.id" class="submission-card">
          <div class="card-header">
            <span class="sub-id">#{{ submissions.length - index }}</span>
            <span class="sub-date">{{ formatDateTime(submission.createdAt) }}</span>
          </div>
          
          <div class="card-content">
            <div v-if="submission.data && Object.keys(submission.data).length > 0" class="data-grid">
              <div v-for="(value, fieldId) in submission.data" :key="fieldId" class="data-item">
                <span class="data-label">{{ getFieldLabel(fieldId) }}</span>
                <div class="data-value">
                  <span v-if="Array.isArray(value)">{{ value.join(', ') }}</span>
                  <span v-else-if="value === null || value === undefined" class="is-empty">Empty</span>
                  <span v-else>{{ String(value) }}</span>
                </div>
              </div>
            </div>
            <p v-else class="no-data">Payload delivered (No field data captured).</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.submissions-page {
  min-height: 100vh;
  padding: 80px 0;
  background-color: #fcfcfd;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 64px;
}

@media (max-width: 768px) {
  .page-header { flex-direction: column; align-items: flex-start; gap: 24px; }
}

.back-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b6b80;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.back-link:hover { color: #000; }

.page-title {
  font-family: "Playfair Display", serif;
  font-size: 40px;
  font-weight: 700;
  color: #000;
  letter-spacing: -0.02em;
}

.page-subtitle {
  color: #6b6b80;
  font-size: 16px;
  margin-top: 4px;
}

/* ─── State Containers ─────────────────────────────────────── */
.state-container {
  text-align: center;
  padding: 100px 0;
  color: #6b6b80;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #f0f0f2;
  border-top-color: #000;
  border-radius: 50%;
  margin: 0 auto 16px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.empty-icon {
  font-size: 40px;
  color: #e8e8ec;
  margin-bottom: 24px;
}

.empty h2 { color: #000; margin-bottom: 12px; }

/* ─── Submission Stack ─────────────────────────────────────── */
.submissions-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.submission-card {
  background: white;
  border: 1px solid #e8e8ec;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.2s;
}

.submission-card:hover {
  border-color: #000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
}

.card-header {
  background: #fcfcfd;
  padding: 16px 24px;
  border-bottom: 1px solid #e8e8ec;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sub-id {
  font-size: 13px;
  font-weight: 700;
  color: #000;
}

.sub-date {
  font-size: 13px;
  color: #6b6b80;
  font-weight: 500;
}

.card-content {
  padding: 24px;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.data-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.data-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #a1a1aa;
}

.data-value {
  font-size: 15px;
  color: #000;
  background: #f9f9fb;
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.5;
  word-break: break-all;
}

.is-empty { color: #d4d4d8; font-style: italic; }

.no-data {
  color: #6b6b80;
  font-style: italic;
  font-size: 14px;
}

.btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.btn-primary { background: #000; color: #fff; }
.btn-primary:hover { background: #1f1f2e; }

.btn-subtle { background: #f4f4f5; color: #18181b; }
.btn-subtle:hover { background: #e4e4e7; }
</style>
