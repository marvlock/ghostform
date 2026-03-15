<script setup lang="ts">
const route = useRoute()
const activeSection = ref(route.hash ? route.hash.substring(1) : 'getting-started')
const showMobileSidebar = ref(false)

const sections = [
  { id: 'getting-started', title: 'Initialization' },
  { id: 'form-builder', title: 'Field Engine' },
  { id: 'embedding', title: 'Integration' },
  { id: 'api-reference', title: 'API Specification' },
  { id: 'rate-limiting', title: 'Security' },
  { id: 'examples', title: 'Implementations' }
]

onMounted(() => {
  if (route.hash) {
    activeSection.value = route.hash.substring(1)
    scrollToSection(route.hash.substring(1))
  }
  setupScrollObserver()
})

function scrollToSection(sectionId: string) {
  activeSection.value = sectionId
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  showMobileSidebar.value = false
}

function getSectionTitle(sectionId: string) {
  return sections.find((section) => section.id === sectionId)?.title || 'Documentation'
}

function setupScrollObserver() {
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
        if (window.history.replaceState) {
          window.history.replaceState(null, '', `#${entry.target.id}`)
        }
      }
    })
  }, observerOptions)

  sections.forEach((section) => {
    const element = document.getElementById(section.id)
    if (element) {
      observer.observe(element)
    }
  })

  onUnmounted(() => {
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.unobserve(element)
      }
    })
  })
}
</script>

<template>
  <div class="docs-page">
    <div class="container">
      <button
        class="docs-mobile-toggle"
        type="button"
        @click="showMobileSidebar = !showMobileSidebar"
        :aria-expanded="showMobileSidebar"
        aria-controls="docs-sidebar"
        aria-label="Toggle documentation sidebar"
      >
        <span class="docs-mobile-toggle-label">Sections</span>
        <svg v-if="!showMobileSidebar" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M4 7h16"/>
          <path d="M4 12h16"/>
          <path d="M4 17h16"/>
        </svg>
        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M18 6L6 18"/>
          <path d="M6 6l12 12"/>
        </svg>
      </button>

      <div
        v-if="showMobileSidebar"
        class="docs-sidebar-overlay"
        @click="showMobileSidebar = false"
      ></div>

      <div class="docs-layout">
        <!-- Sidebar Navigation -->
        <aside id="docs-sidebar" class="docs-sidebar" :class="{ open: showMobileSidebar }">
          <div class="docs-sidebar-header">
            <span>Documentation</span>
            <button class="docs-sidebar-close" type="button" @click="showMobileSidebar = false" aria-label="Close documentation sidebar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M18 6L6 18"/>
                <path d="M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <nav class="docs-nav">
            <div class="nav-label">Documentation</div>
            <a
              v-for="section in sections"
              :key="section.id"
              :href="`#${section.id}`"
              :class="['nav-item', { active: activeSection === section.id }]"
              @click.prevent="scrollToSection(section.id)"
            >
              {{ section.title }}
            </a>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="docs-content">
          <!-- Getting Started -->
          <section id="getting-started" class="docs-section">
            <h1 class="docs-h1">Initialization</h1>
            <p class="docs-lead">Welcome to the GhostForm engine. This specification outlines the deployment and configuration of secure form endpoints.</p>

            <h2 class="docs-h2">The Foundation</h2>
            <div class="stepper">
              <div class="step-item">
                <span class="step-line"></span>
                <span class="step-marker">01</span>
                <div>
                  <h3>Provision Identity</h3>
                  <p>Initialize a secure account to manage your form infrastructure.</p>
                </div>
              </div>
              <div class="step-item">
                <span class="step-line"></span>
                <span class="step-marker">02</span>
                <div>
                  <h3>Construct Endpoint</h3>
                  <p>Design your schema using the Field Engine to define data requirements.</p>
                </div>
              </div>
              <div class="step-item">
                <span class="step-marker">03</span>
                <div>
                  <h3>Deploy anywhere</h3>
                  <p>Integrate your form using our simple copy-paste snippets or REST API.</p>
                </div>
              </div>
            </div>

            <h2 class="docs-h2">Global Parameters</h2>
            <div class="params-table">
              <div class="param-row">
                <div class="param-name">Success Message</div>
                <div class="param-desc">Visual confirmation payload for terminal users.</div>
              </div>
              <div class="param-row">
                <div class="param-name">Redirect URL</div>
                <div class="param-desc">Post-submission navigation destination.</div>
              </div>
              <div class="param-row">
                <div class="param-name">Security Limit</div>
                <div class="param-desc">Submission frequency control per unique IP.</div>
              </div>
            </div>
          </section>

          <!-- Form Builder -->
          <section id="form-builder" class="docs-section">
            <h1 class="docs-h1">Field Engine</h1>
            <p>The core schema engine supports multi-typed field definitions with server-side integrity checks.</p>

            <div class="type-grid">
              <div class="type-card">
                <h4>Short Text</h4>
                <p>Singular string inputs with length constraints.</p>
              </div>
              <div class="type-card">
                <h4>Encryption Email</h4>
                <p>Validated identity strings.</p>
              </div>
              <div class="type-card">
                <h4>Data Buffer</h4>
                <p>Long-form contextual text content.</p>
              </div>
              <div class="type-card">
                <h4>Selection Index</h4>
                <p>Enumerable options for structured data.</p>
              </div>
            </div>
          </section>

          <!-- Integration -->
          <section id="embedding" class="docs-section">
            <h1 class="docs-h1">Integration</h1>
            <p>Embed GhostForm into any frontend in minutes. Use direct HTML form posts for static sites or JSON requests for app-driven flows.</p>

            <h2 class="docs-h2">HTML Form Integration</h2>
            <div class="code-container">
              <div class="code-header">POST /api/submit/:slug (HTML)</div>
              <pre class="code-block"><code>&lt;form action="https://your-domain.com/api/submit/contact-form" method="POST"&gt;
  &lt;input type="text" name="full_name" required /&gt;
  &lt;input type="email" name="email" required /&gt;
  &lt;button type="submit"&gt;Send&lt;/button&gt;
&lt;/form&gt;</code></pre>
            </div>

            <h2 class="docs-h2">JavaScript Integration</h2>
            <div class="code-container">
              <div class="code-header">POST /api/submit/:slug (JSON)</div>
              <pre class="code-block"><code>const response = await fetch('/api/submit/contact-form', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    full_name: 'Jane Doe',
    email: 'jane@example.com',
    message: 'Hello from web app'
  })
})

const result = await response.json()</code></pre>
            </div>

            <ul class="docs-list">
              <li>Use HTML mode for zero-JavaScript sites and static deployments.</li>
              <li>Use JSON mode when you need custom UI validation or SPA workflows.</li>
              <li>Configure Redirect URL in Global Settings for post-submit navigation.</li>
            </ul>
          </section>

          <!-- API Reference -->
          <section id="api-reference" class="docs-section">
            <h1 class="docs-h1">API Specification</h1>
            <p>GhostForm provides a RESTful interface for headless form management and data retrieval.</p>

            <h2 class="docs-h2">Endpoint Retrieval</h2>
            <div class="code-container">
              <div class="code-header">GET /api/forms</div>
              <pre class="code-block"><code>[
  {
    "id": "GF_9x7z...",
    "slug": "contact-secure",
    "status": "active",
    "fields": [...]
  }
]</code></pre>
            </div>

            <h2 class="docs-h2">Submission Transmission</h2>
            <div class="code-container">
              <div class="code-header">POST /api/submit/:slug</div>
              <pre class="code-block"><code>{ 
  "full_name": "Identity Unknown", 
  "payload": "Data String" 
}</code></pre>
            </div>
          </section>

          <!-- Rate Limiting -->
          <section id="rate-limiting" class="docs-section">
            <h1 class="docs-h1">Security Layer</h1>
            <p>Industrial grade protection against automated submission attempts.</p>
            <div class="security-card">
              <div class="security-shield">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div class="security-info">
                <h3>Rate Limiting Spec</h3>
                <p>Limits are non-negotiable and enforced at the server foundation. Each IP identity inherits a unique rolling allocation based on your configuration.</p>
              </div>
            </div>

            <h2 class="docs-h2">Security Controls</h2>
            <div class="params-table">
              <div class="param-row">
                <div class="param-name">Server Validation</div>
                <div class="param-desc">Every submission is validated on the server even if client-side checks are bypassed.</div>
              </div>
              <div class="param-row">
                <div class="param-name">Rate Limiting</div>
                <div class="param-desc">Per-IP submission thresholds reduce spam and abuse on public endpoints.</div>
              </div>
              <div class="param-row">
                <div class="param-name">Form Status Control</div>
                <div class="param-desc">Pause forms instantly from the dashboard without changing embed code.</div>
              </div>
            </div>

            <ul class="docs-list">
              <li>Keep rate limits enabled for internet-facing forms.</li>
              <li>Use strict required fields only where necessary to reduce friction and bot noise.</li>
              <li>Monitor submissions regularly and pause compromised forms immediately.</li>
            </ul>
          </section>

          <!-- Implementations -->
          <section id="examples" class="docs-section">
            <h1 class="docs-h1">Implementations</h1>
            <p>Reference implementation patterns for common use-cases across marketing sites, product onboarding, and internal operations.</p>

            <div class="type-grid implementation-grid">
              <div class="type-card">
                <h4>Landing Page Lead Form</h4>
                <p>Use HTML embed with Redirect URL to thank-you page for simple acquisition flows.</p>
              </div>
              <div class="type-card">
                <h4>SaaS Onboarding Form</h4>
                <p>Use JSON submit to trigger custom UI states, then route users with app-level logic.</p>
              </div>
              <div class="type-card">
                <h4>Support Intake Pipeline</h4>
                <p>Use required fields, category select options, and rate limiting to prevent spam bursts.</p>
              </div>
              <div class="type-card">
                <h4>Internal Ops Requests</h4>
                <p>Use hidden fields for routing metadata and export submissions as JSON for automation.</p>
              </div>
            </div>

            <h2 class="docs-h2">Quick Implementation Checklist</h2>
            <ul class="docs-list">
              <li>Define fields with clear labels and minimal required inputs.</li>
              <li>Choose HTML or JSON integration based on your frontend stack.</li>
              <li>Set Success Message and optional Redirect URL in Global Settings.</li>
              <li>Enable rate limits before production launch.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.docs-page {
  min-height: 100vh;
  padding: 100px 0;
  background-color: #fcfcfd;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.docs-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 80px;
  align-items: flex-start;
}

.docs-mobile-toggle {
  display: none;
}

.docs-sidebar-overlay {
  display: none;
}

.docs-sidebar-header {
  display: none;
}

@media (max-width: 1024px) {
  .docs-layout { grid-template-columns: 1fr; }
  .docs-sidebar { position: static; margin-bottom: 40px; }
}

/* ─── Sidebar ──────────────────────────────────────────────── */
.docs-sidebar {
  position: sticky;
  top: 100px;
}

.docs-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #a1a1aa;
  margin-bottom: 24px;
  padding: 0 12px;
}

.nav-item {
  padding: 10px 12px;
  color: #6b6b80;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s;
}

.nav-item:hover { color: #000; background: #f4f4f5; }

.nav-item.active {
  color: #000;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  font-weight: 700;
}

/* ─── Content ──────────────────────────────────────────────── */
.docs-content {
  max-width: 760px;
  min-width: 0;
}

.docs-section {
  margin-bottom: 120px;
  scroll-margin-top: 100px;
}

.docs-h1 {
  font-family: "Playfair Display", serif;
  font-size: 48px;
  font-weight: 700;
  color: #000;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.docs-h2 {
  font-family: "Playfair Display", serif;
  font-size: 28px;
  font-weight: 700;
  color: #000;
  margin-top: 64px;
  margin-bottom: 24px;
}

.docs-lead {
  font-size: 18px;
  color: #6b6b80;
  line-height: 1.6;
  margin-bottom: 48px;
}

.docs-section p {
  font-size: 16px;
  color: #6b6b80;
  line-height: 1.8;
  margin-bottom: 24px;
}

.docs-list {
  margin: 24px 0 0;
  padding-left: 22px;
  color: #6b6b80;
}

.docs-list li {
  margin-bottom: 10px;
  line-height: 1.7;
}

/* ─── Components ────────────────────────────────────────────── */
.stepper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 40px 0;
}

.step-item {
  display: flex;
  gap: 24px;
  position: relative;
  padding-bottom: 32px;
}

.step-item > div {
  min-width: 0;
}

.step-marker {
  width: 32px;
  height: 32px;
  background: #000;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.step-line {
  position: absolute;
  left: 15px;
  top: 32px;
  bottom: 0px;
  width: 2px;
  background: #f0f0f2;
  z-index: 1;
}

.step-item h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
.step-item p { margin: 0; font-size: 15px; line-height: 1.6; }

.params-table {
  background: white;
  border: 1px solid #e8e8ec;
  border-radius: 16px;
  overflow: hidden;
}

.param-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-gap: 24px;
  padding: 20px 24px;
  border-bottom: 1px solid #f4f4f5;
}

.param-row:last-child { border-bottom: none; }

.param-name { font-weight: 700; font-size: 14px; }
.param-desc { color: #6b6b80; font-size: 14px; }

.type-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 32px 0;
}

.type-card {
  padding: 24px;
  background: white;
  border: 1px solid #e8e8ec;
  border-radius: 16px;
}

.type-card h4 { font-size: 16px; font-weight: 700; margin-bottom: 8px; }
.type-card p { font-size: 14px; margin: 0; line-height: 1.5; }

.implementation-grid {
  margin-top: 24px;
}

.code-container {
  background: #0a0a0f;
  border-radius: 16px;
  overflow: hidden;
  margin: 24px 0;
}

.code-header {
  padding: 12px 24px;
  background: #16161f;
  color: #a1a1aa;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.code-block {
  padding: 24px;
  margin: 0;
  color: #fcfcfd;
  font-family: "Monaco", "Menlo", monospace;
  font-size: 14px;
  line-height: 1.6;
  overflow-x: auto;
}

.security-card {
  display: flex;
  gap: 24px;
  background: white;
  border: 1px solid #e8e8ec;
  padding: 32px;
  border-radius: 20px;
}

.security-shield {
  width: 48px;
  height: 48px;
  background: #f4f4f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  flex-shrink: 0;
}

.security-info h3 { font-size: 18px; font-weight: 700; margin-bottom: 12px; }
.security-info p { margin: 0; }

@media (max-width: 1024px) {
  .docs-page {
    padding: 92px 0 72px;
  }

  .container {
    padding: 0 24px;
  }

  .docs-layout {
    gap: 36px;
  }

  .docs-sidebar {
    position: sticky;
    top: 76px;
    z-index: 20;
    background: #fcfcfd;
    padding: 10px 0;
    margin-bottom: 8px;
  }

  .docs-nav {
    flex-direction: row;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 6px;
    scrollbar-width: thin;
  }

  .nav-label {
    display: none;
  }

  .nav-item {
    white-space: nowrap;
    border: 1px solid #e8e8ec;
    background: #ffffff;
    flex: 0 0 auto;
  }

  .docs-content {
    max-width: 100%;
    padding-top: 10px;
  }

  .docs-section {
    margin-bottom: 88px;
    scroll-margin-top: 150px;
  }
}

@media (max-width: 768px) {
  .docs-page {
    padding: 84px 0 56px;
  }

  .docs-mobile-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    margin-bottom: 14px;
    padding: 12px 14px;
    background: #ffffff;
    border: 1px solid #e8e8ec;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    position: relative;
    z-index: 20;
  }

  .docs-mobile-toggle-label {
    letter-spacing: 0.01em;
  }

  .docs-mobile-toggle[aria-expanded="true"] {
    opacity: 0;
    pointer-events: none;
  }

  .docs-sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 95;
  }

  .docs-sidebar {
    position: fixed;
    top: 72px;
    left: 0;
    bottom: 0;
    width: min(300px, 86vw);
    background: #ffffff;
    border-right: 1px solid #e8e8ec;
    padding: 14px 12px 18px;
    margin-bottom: 0;
    z-index: 110;
    transform: translateX(-105%);
    transition: transform 0.22s ease;
    overflow-y: auto;
  }

  .docs-sidebar.open {
    transform: translateX(0);
  }

  .docs-sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 6px 10px;
    margin-bottom: 8px;
    border-bottom: 1px solid #f1f1f4;
    font-size: 12px;
    font-weight: 700;
    color: #6b7280;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .docs-sidebar-close {
    border: none;
    background: transparent;
    color: #6b7280;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .docs-sidebar-close:hover {
    background: #f3f4f6;
    color: #111827;
  }

  .docs-nav {
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow: visible;
    padding-bottom: 0;
  }

  .nav-item {
    width: 100%;
    text-align: left;
    padding: 10px 12px;
    border: none;
    border-left: 2px solid transparent;
    border-radius: 0;
    background: transparent;
  }

  .nav-item.active {
    background: transparent;
    box-shadow: none;
    border-left-color: #000;
    padding-left: 14px;
  }

  .nav-item:hover {
    background: #f4f4f5;
    border-radius: 8px;
    border-left-color: transparent;
  }

  .container {
    padding: 0 16px;
  }

  .docs-content {
    padding-top: 0;
  }

  .docs-section {
    margin-bottom: 72px;
    scroll-margin-top: 90px;
  }

  .docs-h1 {
    font-size: 36px;
    margin-bottom: 16px;
  }

  .docs-h2 {
    font-size: 24px;
    margin-top: 40px;
    margin-bottom: 16px;
  }

  .docs-lead {
    font-size: 17px;
    margin-bottom: 32px;
  }

  .docs-section p {
    font-size: 15px;
    line-height: 1.7;
    margin-bottom: 18px;
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  .step-item {
    gap: 16px;
    padding-bottom: 24px;
  }

  .step-item > div {
    width: 100%;
  }

  .step-item h3 {
    font-size: 16px;
  }

  .step-item p {
    font-size: 14px;
  }

  .param-row {
    grid-template-columns: 1fr;
    grid-gap: 8px;
    padding: 16px;
  }

  .type-grid {
    grid-template-columns: 1fr;
  }

  .type-card {
    padding: 18px;
  }

  .code-header {
    padding: 10px 14px;
    font-size: 10px;
  }

  .code-container {
    max-width: 100%;
    border-radius: 14px;
  }

  .code-block {
    padding: 14px;
    font-size: 12px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .security-card {
    flex-direction: column;
    gap: 14px;
    padding: 20px;
    border-radius: 16px;
  }

  .security-info {
    min-width: 0;
  }
}
</style>
