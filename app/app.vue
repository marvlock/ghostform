<script setup lang="ts">
const { user, isAuthenticated, logout, loading: authLoading } = useAuth()
const route = useRoute()

const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/signup' || route.path === '/forgot-password'
})

const showAuthContent = computed(() => !authLoading.value && isAuthenticated.value)
const showGuestContent = computed(() => !authLoading.value && !isAuthenticated.value)
const isMounted = ref(false)
const isScrolled = ref(false)

onMounted(() => {
  isMounted.value = true
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', handleScroll)
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})

onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null
    if (!target || !target.closest) return
    if (!target.closest('.profile-menu')) {
      showProfileMenu.value = false
    }
    if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-toggle')) {
      showMobileMenu.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})

useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/ghostform-logo.svg' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap' }
  ]
})

const showProfileMenu = ref(false)
const showDeleteConfirm = ref(false)
const showMobileMenu = ref(false)

watch(() => route.path, () => {
  showProfileMenu.value = false
  showMobileMenu.value = false
})

function handleLogout() {
  logout()
  showProfileMenu.value = false
}

const notification = ref({ show: false, message: '', type: 'success' as 'success' | 'error' })

function showNotification(message: string, type: 'success' | 'error' = 'success') {
  notification.value = { show: true, message, type }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

async function handleDeleteAccount() {
  try {
    await $fetch('/api/auth/delete-account', { method: 'DELETE' })
    showDeleteConfirm.value = false
    showProfileMenu.value = false
    await logout()
  } catch (error: any) {
    showNotification(error.data?.message || 'Failed to delete account', 'error')
  }
}

onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null
    if (!target || !target.closest) return
    if (!target.closest('.profile-menu')) {
      showProfileMenu.value = false
    }
    if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-toggle')) {
      showMobileMenu.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    
    <!-- Navigation -->
    <nav 
      v-if="!isAuthPage" 
      class="navbar" 
      :class="{ 
        'is-scrolled': isScrolled
      }"
      key="main-navbar"
    >
      <div class="container">
        <div class="nav-content">
          <NuxtLink to="/" class="logo" @click="showMobileMenu = false">
            <img src="/ghostform-logo.svg" alt="GhostForm" class="logo-image" />
            <span class="logo-text">GhostForm</span>
          </NuxtLink>
          
          <div class="nav-links-center">
            <NuxtLink v-if="showAuthContent" to="/forms" @click="showProfileMenu = false; showMobileMenu = false">My Forms</NuxtLink>
            <NuxtLink to="/#features" @click="showProfileMenu = false; showMobileMenu = false">Features</NuxtLink>
            <NuxtLink to="/docs" @click="showProfileMenu = false; showMobileMenu = false">Documentation</NuxtLink>
          </div>
          
          <div class="nav-links-right">
            <!-- Authenticated User Menu -->
            <template v-if="showAuthContent">
              <div class="profile-menu desktop-profile">
                <button 
                  @click="showProfileMenu = !showProfileMenu" 
                  class="profile-button"
                >
                  <span class="profile-avatar">{{ user?.email?.charAt(0).toUpperCase() }}</span>
                  <span class="profile-email">{{ user?.email }}</span>
                  <svg class="profile-chevron" :class="{ 'open': showProfileMenu }" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                
                <div v-if="showProfileMenu" class="profile-dropdown">
                  <div class="profile-dropdown-header">
                    <div class="profile-dropdown-avatar">{{ user?.email?.charAt(0).toUpperCase() }}</div>
                    <div class="profile-dropdown-email">{{ user?.email }}</div>
                  </div>
                  <div class="profile-dropdown-divider"></div>
                  <NuxtLink to="/forms" class="profile-dropdown-item" @click="showProfileMenu = false">
                    My Forms
                  </NuxtLink>
                  <div class="profile-dropdown-divider"></div>
                  <button @click="handleLogout" class="profile-dropdown-item">
                    Log Out
                  </button>
                  <button @click="showDeleteConfirm = true; showProfileMenu = false" class="profile-dropdown-item profile-dropdown-item-danger">
                    Delete Account
                  </button>
                </div>
              </div>
              
              <button 
                @click.stop="showMobileMenu = !showMobileMenu" 
                class="mobile-menu-toggle"
                aria-label="Toggle menu"
              >
                <svg v-if="!showMobileMenu" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </template>
            
            <!-- Guest Menu -->
            <template v-else-if="showGuestContent">
              <div class="desktop-auth">
                <NuxtLink to="/login" class="nav-auth">Log In</NuxtLink>
                <NuxtLink to="/signup" class="nav-auth btn-nav">Get Started</NuxtLink>
              </div>
              
              <button 
                @click.stop="showMobileMenu = !showMobileMenu" 
                class="mobile-menu-toggle"
                aria-label="Toggle menu"
              >
                <svg v-if="!showMobileMenu" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </template>
            
            <!-- Loading state placeholder to prevent hydration mismatch -->
            <template v-else>
              <div class="nav-links-right-placeholder"></div>
            </template>
          </div>
          
          <!-- Mobile Menu -->
          <div v-if="showMobileMenu" class="mobile-menu">
            <template v-if="showAuthContent">
              <div class="mobile-menu-profile">
                <div class="mobile-menu-avatar">{{ user?.email?.charAt(0).toUpperCase() }}</div>
                <div class="mobile-menu-email">{{ user?.email }}</div>
              </div>
              <div class="mobile-menu-divider"></div>
            </template>
            
            <NuxtLink v-if="showAuthContent" to="/forms" class="mobile-menu-item" @click="showMobileMenu = false">
              My Forms
            </NuxtLink>
            <NuxtLink to="/#features" class="mobile-menu-item" @click="showMobileMenu = false">
              Features
            </NuxtLink>
            <NuxtLink to="/docs" class="mobile-menu-item" @click="showMobileMenu = false">
              Documentation
            </NuxtLink>
            
            <template v-if="showAuthContent">
              <div class="mobile-menu-divider"></div>
              <button @click="handleLogout" class="mobile-menu-item mobile-menu-button">
                Log Out
              </button>
              <button @click="showDeleteConfirm = true; showMobileMenu = false" class="mobile-menu-item mobile-menu-button mobile-menu-item-danger">
                Delete Account
              </button>
            </template>
            
            <template v-else-if="showGuestContent">
              <div class="mobile-menu-divider"></div>
              <NuxtLink to="/login" class="mobile-menu-item mobile-menu-button mobile-menu-item-primary" @click="showMobileMenu = false">
                Log In
              </NuxtLink>
            </template>
          </div>
          
          <!-- Delete Account Confirmation Modal -->
          <div v-if="showDeleteConfirm" class="modal-overlay" @click="showDeleteConfirm = false">
            <div class="modal-content" @click.stop>
              <h3>Delete Account</h3>
              <p class="modal-description">Are you sure you want to delete your account? This action cannot be undone.</p>
              <div class="modal-warning-box">
                <p class="modal-warning-title">This will permanently delete:</p>
                <ul class="modal-list">
                  <li>Your account and profile</li>
                  <li>All your forms</li>
                  <li>All form submissions</li>
                </ul>
              </div>
              <div class="modal-actions">
                <button @click="showDeleteConfirm = false" class="btn btn-secondary">Cancel</button>
                <button @click="handleDeleteAccount" class="btn btn-danger">Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Page Content -->
    <NuxtPage />
    
    <div v-if="notification.show" class="notification-overlay" @click="notification.show = false">
      <div class="notification-modal" :class="notification.type" @click.stop>
        <div class="notification-icon">
          <svg v-if="notification.type === 'success'" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class="notification-message">{{ notification.message }}</p>
        <button @click="notification.show = false" class="notification-close">OK</button>
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Ankar-inspired: near-black backgrounds, clean whites, monochrome accents */
  --bg-color: #ffffff;
  --bg-dark: #0a0a0f;
  --bg-dark-secondary: #111118;
  --text-color: #0a0a0f;
  --text-color-dark: #f5f5f7;
  --text-secondary: #6b6b80;
  --text-secondary-dark: rgba(245, 245, 247, 0.6);
  --border-color: #e8e8ec;
  --border-color-dark: rgba(255, 255, 255, 0.1);
  --accent-color: #0a0a0f;
  --accent-hover: #1f1f2e;
  --section-bg: #f5f5f7;
  --card-bg: #ffffff;
  --card-bg-dark: #16161f;
  --nav-bg: rgba(10, 10, 15, 0.85);
  --nav-border: rgba(255, 255, 255, 0.08);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.12);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--bg-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 24px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }
}

/* ─── Navbar ────────────────────────────────────────────────── */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
  background-color: rgba(13, 13, 18, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.navbar.is-scrolled {
  padding: 12px 0;
  background-color: rgba(13, 13, 18, 0.75);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transition: opacity 0.2s;
}

.logo:hover {
  opacity: 0.8;
}

.logo-image {
  height: 28px;
  width: auto;
  display: block;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: white;
  letter-spacing: -0.03em;
  line-height: 1;
}

.nav-links-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-links-center a {
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links-center a::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: white;
  transition: width 0.3s ease;
}

.nav-links-center a:hover::after,
.nav-links-center a.router-link-active::after {
  width: 100%;
}

.nav-links-center a:hover,
.nav-links-center a.router-link-active {
  color: white;
}

.nav-links-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-auth {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-auth:hover {
  color: white;
}

.btn-nav {
  background: white;
  color: black;
  padding: 8px 24px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.3s ease;
}

.btn-nav:hover {
  background: #f0f0f0;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
}



/* ─── Profile menu ──────────────────────────────────────────── */
.profile-menu {
  position: relative;
}

.profile-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
  font-size: 13px;
  font-weight: 500;
}

.profile-button:hover {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.profile-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--bg-dark);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
}

.profile-email {
  font-weight: 500;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
}

.profile-chevron {
  transition: transform 0.2s;
  flex-shrink: 0;
  opacity: 0.5;
}

.profile-chevron.open {
  transform: rotate(180deg);
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  min-width: 220px;
  z-index: 1000;
  overflow: hidden;
  padding: 8px;
}

.profile-dropdown-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px 12px;
}

.profile-dropdown-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--bg-dark);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 17px;
  flex-shrink: 0;
}

.profile-dropdown-email {
  font-weight: 500;
  color: var(--text-color);
  font-size: 13px;
  text-align: center;
  word-break: break-all;
}

.profile-dropdown-divider {
  height: 1px;
  background: var(--border-color);
  margin: 4px 0;
}

.profile-dropdown-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 9px 12px;
  background: transparent;
  border: none;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  text-decoration: none;
  text-align: left;
  border-radius: var(--radius-sm);
  font-family: "Inter", -apple-system, sans-serif;
}

.profile-dropdown-item:hover {
  background: var(--section-bg);
}

.profile-dropdown-item-danger {
  color: #e53e3e !important;
}

.profile-dropdown-item-danger:hover {
  background: rgba(229, 62, 62, 0.08) !important;
}

/* ─── Modal ─────────────────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.modal-overlay::-webkit-scrollbar { display: none; }

.modal-content {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 36px;
  max-width: 480px;
  width: 100%;
  box-shadow: var(--shadow-lg);
  margin: auto;
  flex-shrink: 0;
  position: relative;
}

.modal-content h3 {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 26px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.modal-description {
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.65;
  margin-bottom: 24px;
}

.modal-warning-box {
  background: var(--section-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 20px;
  margin-bottom: 24px;
}

.modal-warning-title {
  font-weight: 600;
  color: var(--text-color);
  font-size: 14px;
  margin-bottom: 12px;
}

.modal-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.modal-list li {
  color: var(--text-secondary);
  font-size: 14px;
  padding: 6px 0 6px 18px;
  position: relative;
  line-height: 1.5;
}

.modal-list li::before {
  content: "–";
  position: absolute;
  left: 0;
  color: var(--text-secondary);
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.modal-actions .btn {
  padding: 11px 24px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: "Inter", -apple-system, sans-serif;
}

.modal-actions .btn-secondary {
  background: transparent;
  color: var(--text-color);
  border: 1.5px solid var(--border-color);
}

.modal-actions .btn-secondary:hover {
  border-color: var(--text-color);
  background: var(--section-bg);
}

.modal-actions .btn-danger {
  background: #0a0a0f;
  color: white;
}

.modal-actions .btn-danger:hover {
  background: #1f1f2e;
  transform: translateY(-1px);
}

/* ─── Mobile menu toggle ────────────────────────────────────── */
.mobile-menu-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #ffffff;
  padding: 6px;
  border-radius: var(--radius-sm);
  transition: background 0.2s, border-color 0.2s;
  z-index: 101;
}

.mobile-menu-toggle:hover {
  background: rgba(255, 255, 255, 0.08);
}

.desktop-profile { display: flex; }

.desktop-auth {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-lg);
  padding: 16px 20px;
  z-index: 100;
  animation: slideDown 0.18s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.mobile-menu-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
}

.mobile-menu-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--bg-dark);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 15px;
  flex-shrink: 0;
}

.mobile-menu-email {
  font-weight: 500;
  color: var(--text-color);
  font-size: 14px;
  word-break: break-all;
}

.mobile-menu-divider {
  height: 1px;
  background: var(--border-color);
  margin: 10px 0;
}

.mobile-menu-item {
  display: block;
  padding: 11px 0;
  color: var(--text-color);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-family: "Inter", -apple-system, sans-serif;
}

.mobile-menu-item:hover {
  color: var(--text-secondary);
}

.mobile-menu-button {
  padding: 11px 16px;
  border-radius: var(--radius-sm);
  margin-top: 6px;
  text-align: center;
}

.mobile-menu-item-primary {
  background: var(--bg-dark);
  color: white !important;
}

.mobile-menu-item-primary:hover {
  background: #1f1f2e !important;
  color: white !important;
}

.mobile-menu-item-danger {
  color: #e53e3e !important;
}

.mobile-menu-item-danger:hover {
  background: rgba(229, 62, 62, 0.08);
}

@media (max-width: 968px) {
  .nav-links-center { display: none; }
  .logo { gap: 10px; }
  .logo-image { height: 24px; }
  .logo-text { font-size: 17px; }
  .nav-content { min-height: 44px; }
  .mobile-menu-toggle { display: flex; align-items: center; justify-content: center; }
  .desktop-profile { display: none; }
  .desktop-auth { display: none; }
  .mobile-menu { display: block; }
  .profile-dropdown { right: -20px; }
}

@media (max-width: 768px) {
  .navbar { padding: 14px 0; }
  .navbar.is-scrolled { padding: 10px 0; }
  .logo-text { font-size: 16px; }
  .nav-links-right { gap: 8px; }
  .mobile-menu-toggle { padding: 8px; }
}

@media (max-width: 420px) {
  .logo-text { font-size: 15px; }
}

/* ─── Notification ──────────────────────────────────────────── */
.notification-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  animation: fadeIn 0.2s ease-out;
}

.notification-modal {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 36px;
  max-width: 380px;
  width: 100%;
  box-shadow: var(--shadow-lg);
  text-align: center;
  animation: slideUp 0.25s ease-out;
}

.notification-modal.success { border-color: #22c55e; }
.notification-modal.error { border-color: #ef4444; }

.notification-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  background: var(--section-bg);
  color: var(--text-color);
}

.notification-modal.success .notification-icon { background: rgba(34,197,94,0.1); color: #22c55e; }
.notification-modal.error .notification-icon   { background: rgba(239,68,68,0.1); color: #ef4444; }

.notification-message {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 24px;
  line-height: 1.5;
}

.notification-close {
  background: var(--bg-dark);
  color: white;
  border: none;
  padding: 11px 32px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: "Inter", -apple-system, sans-serif;
}

.notification-close:hover {
  background: #1f1f2e;
  transform: translateY(-1px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(16px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
</style>
