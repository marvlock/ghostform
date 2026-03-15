<script setup lang="ts">
const email = ref('')
const otp = ref('')
const newPassword = ref('')
const step = ref('request') // 'request' or 'reset'
const loading = ref(false)
const error = ref('')
const success = ref('')

async function handleRequestReset() {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value }
    })
    success.value = 'Verification code sent if your account exists.'
    step.value = 'reset'
  } catch (err: any) {
    error.value = err.data?.message || 'Failed to send reset code'
  } finally {
    loading.value = false
  }
}

async function handleResetPassword() {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: {
        email: email.value,
        otp: otp.value,
        newPassword: newPassword.value
      }
    })
    success.value = 'Password reset successfully! Redirecting...'
    setTimeout(() => {
      navigateTo('/login')
    }, 2000)
  } catch (err: any) {
    error.value = err.data?.message || 'Failed to reset password'
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
        <div class="auth-nav">
          <NuxtLink to="/" class="auth-logo">
            <img src="/ghostform-logo.svg" alt="GhostForm" />
          </NuxtLink>
        </div>

        <div class="auth-content">
          <h1 class="auth-title">Recovery</h1>
          <p class="auth-subtitle">
            {{ step === 'request' ? 'Restore access to your account' : `Enter the code sent to ${email}` }}
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

          <!-- Request Step -->
          <form v-if="step === 'request'" @submit.prevent="handleRequestReset" class="auth-form">
            <div class="field-group">
              <label for="email">Associated email</label>
              <input 
                id="email"
                v-model="email" 
                type="email" 
                required 
                placeholder="marvlock.dev@gmail.com" 
                :disabled="loading"
              />
            </div>

            <button type="submit" class="btn-auth-primary" :disabled="loading">
              {{ loading ? 'Sending...' : 'Send Recovery Code' }}
            </button>
          </form>

          <!-- Reset Step -->
          <form v-if="step === 'reset'" @submit.prevent="handleResetPassword" class="auth-form">
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
            
            <div class="field-group">
              <label for="newPassword">New Password</label>
              <input 
                id="newPassword"
                v-model="newPassword" 
                type="password" 
                required 
                placeholder="Min 8 characters" 
                minlength="8"
                :disabled="loading"
              />
            </div>

            <button type="submit" class="btn-auth-primary" :disabled="loading">
              {{ loading ? 'Resetting...' : 'Update Password' }}
            </button>
            <button type="button" @click="step = 'request'" class="btn-link" :disabled="loading">
              Back to request
            </button>
          </form>

          <p class="auth-footer">
            Remembered? <NuxtLink to="/login">Sign in</NuxtLink>
          </p>
        </div>
      </div>

      <!-- Right side: Visual -->
      <div class="auth-visual-side">
        <div class="visual-glow-1"></div>
        <div class="visual-glow-2"></div>
        <div class="visual-quote">
          <span class="quote-mark">“</span>
          <p>The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards.</p>
          <span class="quote-author">Gene Spafford</span>
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

.auth-nav {
  margin-bottom: 80px;
}

.auth-logo img {
  height: 28px;
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
