<script setup lang="ts">
const { checkAuth } = useAuth()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  error.value = ''
  loading.value = true

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    await checkAuth()
    await navigateTo('/forms')
  } catch (err: any) {
    error.value = err.data?.message || 'Failed to log in'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-split">
      <!-- Left side: Form -->
      <div class="auth-form-side">
        <div class="auth-content">
          <h1 class="auth-title">Welcome back</h1>
          <p class="auth-subtitle">Continue to your privacy dashboard</p>

          <div v-if="error" class="error-box">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
              <circle cx="8" cy="8" r="7" stroke-width="1.5"/>
              <path d="M8 5v4M8 11h.01" stroke-width="2" stroke-linecap="round"/>
            </svg>
            {{ error }}
          </div>

          <form @submit.prevent="handleLogin" class="auth-form">
            <div class="field-group">
              <label for="email">Email address</label>
              <input 
                id="email"
                v-model="email" 
                type="email" 
                required 
                placeholder="marvlock.dev@gmail.com" 
                :disabled="loading"
              />
            </div>
            
            <div class="field-group">
              <div class="label-row">
                <label for="password">Password</label>
                <NuxtLink to="/forgot-password" class="label-link">Forgot?</NuxtLink>
              </div>
              <input 
                id="password"
                v-model="password" 
                type="password" 
                required 
                placeholder="••••••••" 
                :disabled="loading"
              />
            </div>

            <button type="submit" class="btn-auth-primary" :disabled="loading">
              {{ loading ? 'Authenticating...' : 'Sign In' }}
            </button>
          </form>

          <p class="auth-footer">
            Don't have an account? <NuxtLink to="/signup">Start for free</NuxtLink>
          </p>
        </div>
      </div>

      <!-- Right side: Visual -->
      <div class="auth-visual-side">
        <div class="visual-glow-1"></div>
        <div class="visual-glow-2"></div>
        <div class="visual-quote">
          <span class="quote-mark">“</span>
          <p>Privacy is not an option, and it shouldn't be the price we pay for just getting on the internet.</p>
          <span class="quote-author">Gary Kovacs</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
}

.auth-split {
  display: flex;
  width: 100%;
}

/* ─── Form Side ───────────────────────────────────────────── */
.auth-form-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  max-width: 640px;
}

.auth-content {
  margin: auto 0;
  width: 100%;
  max-width: 400px;
  align-self: center;
}

.auth-title {
  font-family: "Playfair Display", serif;
  font-size: 36px;
  font-weight: 700;
  color: #000;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.auth-subtitle {
  color: #6b6b80;
  font-size: 16px;
  margin-bottom: 40px;
}

.error-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #fff5f5;
  border: 1px solid #feb2b2;
  color: #c53030;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 24px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  font-size: 14px;
  font-weight: 600;
  color: #000;
}

.label-link {
  font-size: 13px;
  color: #6b6b80;
  text-decoration: none;
}

.label-link:hover {
  color: #000;
}

input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #e8e8ec;
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  transition: all 0.2s;
  background: #f9f9fb;
}

input:focus {
  outline: none;
  border-color: #000;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.03);
}

.btn-auth-primary {
  margin-top: 12px;
  background: #000;
  color: #fff;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-auth-primary:hover:not(:disabled) {
  background: #1f1f2e;
  transform: translateY(-1px);
}

.btn-auth-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 32px;
  text-align: center;
  font-size: 14px;
  color: #6b6b80;
}

.auth-footer a {
  color: #000;
  text-decoration: none;
  font-weight: 600;
}

.auth-footer a:hover {
  text-decoration: underline;
}

/* ─── Visual Side ─────────────────────────────────────────── */
.auth-visual-side {
  flex: 1;
  background-color: #0a0a0f;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px;
  overflow: hidden;
}

@media (max-width: 968px) {
  .auth-visual-side { display: none; }
}

.visual-glow-1 {
  position: absolute;
  top: -10%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #ff6b00 0%, transparent 70%);
  opacity: 0.1;
  filter: blur(80px);
}

.visual-glow-2 {
  position: absolute;
  bottom: -10%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #00d4ff 0%, transparent 70%);
  opacity: 0.1;
  filter: blur(80px);
}

.visual-quote {
  position: relative;
  z-index: 10;
  max-width: 440px;
  color: #fff;
}

.quote-mark {
  font-family: "Playfair Display", serif;
  font-size: 80px;
  line-height: 1;
  opacity: 0.2;
  position: absolute;
  top: -40px;
  left: -30px;
}

.visual-quote p {
  font-size: 24px;
  line-height: 1.6;
  font-weight: 400;
  margin-bottom: 24px;
}

.quote-author {
  font-size: 16px;
  font-weight: 600;
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
</style>
