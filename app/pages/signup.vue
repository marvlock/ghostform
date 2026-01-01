<script setup lang="ts">
const email = ref('')
const password = ref('')
const otp = ref('')
const step = ref('signup') // 'signup' or 'verify'
const loading = ref(false)
const error = ref('')
const success = ref('')

async function handleSignup() {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    success.value = 'Verification code sent to your email!'
    step.value = 'verify'
  } catch (err: any) {
    error.value = err.data?.message || 'Failed to sign up'
  } finally {
    loading.value = false
  }
}

async function handleVerify() {
  const { checkAuth } = useAuth()
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    await $fetch('/api/auth/verify-otp', {
      method: 'POST',
      body: { email: email.value, otp: otp.value }
    })
    success.value = 'Account created successfully! Redirecting...'
    await checkAuth()
    setTimeout(async () => {
      await navigateTo('/forms')
    }, 1500)
  } catch (err: any) {
    error.value = err.data?.message || 'Invalid verification code'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-left">
        <div class="auth-card">
          <h1>GhostForm</h1>
          <p class="subtitle">Create your account</p>

          <div v-if="error" class="error-message">{{ error }}</div>
          <div v-if="success" class="success-message">{{ success }}</div>

          <form v-if="step === 'signup'" @submit.prevent="handleSignup" class="auth-form">
            <div class="form-group">
              <label>Email</label>
              <input v-model="email" type="email" required placeholder="you@example.com" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input v-model="password" type="password" required placeholder="••••••••" minlength="8" />
              <small>At least 8 characters</small>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Sending...' : 'Sign Up' }}
            </button>
          </form>

          <form v-if="step === 'verify'" @submit.prevent="handleVerify" class="auth-form">
            <div class="form-group">
              <label>Verification Code</label>
              <input v-model="otp" type="text" required placeholder="000000" maxlength="6" pattern="[0-9]{6}" />
              <small>Enter the 6-digit code sent to {{ email }}</small>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Verifying...' : 'Verify' }}
            </button>
            <button type="button" @click="step = 'signup'" class="btn btn-secondary">
              Back
            </button>
          </form>

          <p class="auth-footer">
            Already have an account? <NuxtLink to="/login">Log in</NuxtLink>
          </p>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-image"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  height: 100vh;
  max-height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  padding: 0;
  background-color: var(--bg-color);
  overflow: hidden;
  box-sizing: border-box;
}

.auth-container {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 0;
  width: 100%;
  align-items: stretch;
  height: 100vh;
  box-sizing: border-box;
}

.auth-left {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
}

.auth-right {
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.auth-image {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background-image: url('https://2lyfanvqy9.ufs.sh/f/ocSxC2zlR1ZuztzEeWqDIOHFQRo3StmxwCNcLqXTn9Gb0riK');
  background-repeat: repeat;
  background-size: cover;
  background-position: center;
  border-radius: 0;
}

@media (max-width: 968px) {
  .auth-container {
    grid-template-columns: 1fr;
    gap: 0;
    height: auto;
    min-height: 100vh;
  }
  
  .auth-page {
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
  }
  
  .auth-left {
    padding: 20px;
    min-height: calc(100vh - 200px);
  }
  
  .auth-right {
    order: -1;
    height: 200px;
    min-height: 200px;
  }
  
  .auth-image {
    height: 200px;
    min-height: 200px;
  }
  
  .auth-card {
    padding: 20px;
    max-width: 100%;
  }
  
  h1 {
    font-size: 24px;
  }
  
  .subtitle {
    font-size: 13px;
    margin-bottom: 20px;
  }
  
  .auth-form {
    gap: 14px;
  }
  
  input {
    font-size: 16px;
    padding: 10px 14px;
  }
  
  small {
    font-size: 11px;
  }
  
  .btn {
    padding: 10px 20px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .auth-left {
    padding: 16px;
    min-height: calc(100vh - 150px);
  }
  
  .auth-right {
    height: 150px;
    min-height: 150px;
  }
  
  .auth-image {
    height: 150px;
    min-height: 150px;
  }
  
  .auth-card {
    padding: 16px;
    border-radius: 12px;
  }
  
  h1 {
    font-size: 22px;
    margin-bottom: 4px;
  }
  
  .subtitle {
    font-size: 12px;
    margin-bottom: 18px;
  }
  
  .auth-form {
    gap: 12px;
  }
  
  label {
    font-size: 13px;
  }
  
  input {
    font-size: 16px;
    padding: 10px 12px;
  }
  
  small {
    font-size: 10px;
  }
  
  .btn {
    padding: 10px 18px;
    font-size: 14px;
  }
  
  .error-message,
  .success-message,
  .auth-footer {
    font-size: 12px;
  }
  
  .auth-footer {
    margin-top: 12px;
  }
}

.auth-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  overflow: hidden;
}

h1 {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 6px;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 24px;
  font-size: 14px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  color: var(--text-color);
  font-size: 14px;
}

input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 16px;
  font-family: "Space Grotesk", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
  transition: border-color 0.2s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: var(--accent-color);
}

small {
  font-size: 12px;
  color: var(--text-secondary);
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(139, 92, 246, 0.4);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px 0 rgba(139, 92, 246, 0.5);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: transparent;
  color: var(--text-color);
  border: 2px solid var(--border-color);
}

.btn-secondary:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 13px;
}

.success-message {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 13px;
}

.auth-footer {
  text-align: center;
  margin-top: 16px;
  color: var(--text-secondary);
  font-size: 14px;
}

.auth-footer a {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 600;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>

