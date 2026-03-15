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
    <div class="auth-split">
      <!-- Left side: Form -->
      <div class="auth-form-side">
        <div class="auth-content">
          <h1 class="auth-title">{{ step === 'signup' ? 'Get started' : 'Verify email' }}</h1>
          <p class="auth-subtitle">
            {{ step === 'signup' ? 'Create your privacy-first account' : `Enter the 6-digit code sent to ${email}` }}
          </p>

          <div v-if="error" class="message-box error">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
              <circle cx="8" cy="8" r="7" stroke-width="1.5"/>
              <path d="M8 5v4M8 11h.01" stroke-width="2" stroke-linecap="round"/>
            </svg>
            {{ error }}
          </div>

          <div v-if="success" class="message-box success">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
              <path d="M3 8l3 3 7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ success }}
          </div>

          <!-- Signup Step -->
          <form v-if="step === 'signup'" @submit.prevent="handleSignup" class="auth-form">
            <div class="field-group">
              <label for="email">Work email</label>
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
              <label for="password">Password</label>
              <input 
                id="password"
                v-model="password" 
                type="password" 
                required 
                placeholder="At least 8 characters" 
                minlength="8"
                :disabled="loading"
              />
            </div>

            <button type="submit" class="btn-auth-primary" :disabled="loading">
              {{ loading ? 'Creating Account...' : 'Continue' }}
            </button>
          </form>

          <!-- Verify Step -->
          <form v-if="step === 'verify'" @submit.prevent="handleVerify" class="auth-form">
            <div class="field-group">
              <label for="otp">Verification Code</label>
              <input 
                id="otp"
                v-model="otp" 
                type="text" 
                required 
                placeholder="000000" 
                maxlength="6" 
                pattern="[0-9]{6}"
                :disabled="loading"
                class="otp-input"
              />
            </div>

            <button type="submit" class="btn-auth-primary" :disabled="loading">
              {{ loading ? 'Verifying...' : 'Complete Signup' }}
            </button>
            <button type="button" @click="step = 'signup'" class="btn-link" :disabled="loading">
              Back to edit email
            </button>
          </form>

          <p class="auth-footer">
            Already have an account? <NuxtLink to="/login">Sign in</NuxtLink>
          </p>
        </div>
      </div>

      <!-- Right side: Visual -->
      <div class="auth-visual-side">
        <div class="visual-glow-1"></div>
        <div class="visual-glow-2"></div>
        <div class="visual-quote">
          <span class="quote-mark">“</span>
          <p>Security is a process, not a product. And privacy is the foundation of that process.</p>
          <span class="quote-author">Bruce Schneier</span>
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
  line-height: 1.5;
}

.message-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 24px;
}

.message-box.error {
  background-color: #fff5f5;
  border: 1px solid #feb2b2;
  color: #c53030;
}

.message-box.success {
  background-color: #f0fff4;
  border: 1px solid #9ae6b4;
  color: #276749;
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

label {
  font-size: 14px;
  font-weight: 600;
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

.otp-input {
  text-align: center;
  font-size: 24px;
  letter-spacing: 0.5em;
  font-weight: 700;
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

.btn-link {
  background: none;
  border: none;
  color: #6b6b80;
  font-size: 14px;
  cursor: pointer;
  margin-top: 8px;
}

.btn-link:hover {
  color: #000;
  text-decoration: underline;
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
  background: radial-gradient(circle, #ff6a00 0%, transparent 75%);
  opacity: 0.1;
  filter: blur(80px);
}

.visual-glow-2 {
  position: absolute;
  bottom: -10%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #00d4ff 0%, transparent 75%);
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
