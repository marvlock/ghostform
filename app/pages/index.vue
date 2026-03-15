<script setup lang="ts">
const { isAuthenticated, loading: authLoading, checkAuth } = useAuth()

async function handleCreateForm() {
  await checkAuth()
  if (!isAuthenticated.value) {
    await navigateTo('/login')
  } else {
    await navigateTo('/builder')
  }
}
</script>

<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-glow hero-glow-1"></div>
      <div class="hero-glow hero-glow-2"></div>
      <div class="hero-glow hero-glow-3"></div>
      
      <div class="container hero-content">
        <h1 class="hero-headline">
          The Form <em>Engine</em> for Privacy Professionals
        </h1>
        <p class="hero-subheadline">
          A minimalist form builder designed for security-conscious teams. 
          No cookies, no fingerprinting, just clean submissions.
        </p>
        <div class="hero-cta">
          <button @click="handleCreateForm" class="btn btn-hero-primary">Get Started</button>
          <NuxtLink v-if="!authLoading && isAuthenticated" to="/forms" class="btn btn-hero-secondary">View Dashboard</NuxtLink>
        </div>
      </div>
    </section>


    <!-- Core Features -->
    <section id="features" class="features">
      <div class="container">
        <div class="section-label">Our Platform</div>
        <h2 class="section-heading">Built for the Modern Web</h2>
        
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3>Architect Engine</h3>
            <p>Define enterprise-grade schemas in seconds. Server-side validation protocols ensure absolute data integrity.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3>Stealth Protocol</h3>
            <p>Zero tracking by design. No persistent identifiers, no fingerprinting, no third-party scripts. Only the data you need.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <h3>RSA Encryption</h3>
            <p>Automated encryption at rest. Every single submission is shielded using military-grade cryptographic standards.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <h3>System Bridge</h3>
            <p>High-performance POST endpoints and native webhooks. Orchestrate your data flow across any infrastructure.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 3v10"/>
                <path d="M8 9l4 4 4-4"/>
                <path d="M5 21h14"/>
              </svg>
            </div>
            <h3>Signal Routing</h3>
            <p>Trigger instant notifications with webhook fan-out and reliable delivery controls for downstream systems.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M3 12h18"/>
                <path d="M12 3v18"/>
                <circle cx="12" cy="12" r="9"/>
              </svg>
            </div>
            <h3>Global Access</h3>
            <p>Deploy once and collect submissions worldwide with low-latency endpoints and consistent validation behavior.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works (Dark Section) -->
    <section class="how-it-works">
      <div class="container">
        <div class="how-grid">
          <div class="how-content">
            <div class="section-label">Workflow</div>
            <h2 class="section-heading">Simple and efficient</h2>
            <div class="steps-list">
              <div class="step">
                <div class="step-num">01</div>
                <div>
                  <h4>Create your form</h4>
                  <p>Design your fields using our intuitive builder interface.</p>
                </div>
              </div>
              <div class="step">
                <div class="step-num">02</div>
                <div>
                  <h4>Embed anywhere</h4>
                  <p>Use our simple HTML copy-paste snippets or iframe options.</p>
                </div>
              </div>
              <div class="step">
                <div class="step-num">03</div>
                <div>
                  <h4>Analyze data</h4>
                  <p>Receive submissions instantly and view them in our secure dashboard.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="how-visual">
            <div class="phone-frame-wrapper">
              <div class="phone-frame">
                <div class="phone-notch"></div>
                <div class="phone-content">
                  <header class="phone-header">
                    <div class="phone-logo">
                    </div>
                    <div class="builder-status">Building...</div>
                  </header>
                  
                  <div class="phone-body">
                    <div class="field-stack">
                      <!-- Mobile Field Items -->
                      <div class="field-item-ghost">
                        <div class="field-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
                        <div class="field-info">
                          <span class="field-label">Full Name</span>
                          <span class="field-type">Text Input</span>
                        </div>
                      </div>
                      <div class="field-item-ghost active">
                        <div class="field-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                        <div class="field-info">
                          <span class="field-label">Email Address</span>
                          <span class="field-type">Secure Email</span>
                        </div>
                      </div>
                      <div class="field-item-ghost">
                        <div class="field-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>
                        <div class="field-info">
                          <span class="field-label">Feedback</span>
                          <span class="field-type">Textarea</span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="visual-footer-btn builder-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="margin-right:8px;">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                      Add Secure Field
                    </div>
                  </div>
                </div>
              </div>
              <div class="visual-glow scale-up"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="final-cta">
      <div class="container">
        <div class="cta-inner">
          <h2>Build private forms, fast.</h2>
          <p>Create secure forms in minutes.</p>
          <button @click="handleCreateForm" class="btn btn-hero-primary btn-cta-large">Deploy Infrastructure</button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="footer-logo">
              <img src="/ghostform-logo.svg" alt="GhostForm" />
              <span>GhostForm</span>
            </div>
            <p>Privacy-first form builder for the modern web.</p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h5>Product</h5>
              <a href="#features">Features</a>
              <NuxtLink to="/docs">Documentation</NuxtLink>
            </div>
            <div class="link-group">
              <h5>Legal</h5>
              <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
              <NuxtLink to="/terms">Terms of Service</NuxtLink>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 GhostForm. Built for privacy.</p>
          <p class="footer-signature">Made with <span class="heart">❤️</span> by <a href="https://www.marvlock.dev" target="_blank"><em>marvlock</em></a></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.landing-page {
  background-color: var(--bg-color);
}

/* ─── Hero Section ─────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  color: var(--text-color);
  overflow: hidden;
  padding: 120px 0;
  text-align: center;
}

.hero-glow {
  position: absolute;
  width: 60vw;
  height: 60vw;
  filter: blur(120px);
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}

.hero-glow-1 { top: -20%; left: -10%; background: radial-gradient(circle, #ff6b00 0%, transparent 70%); }
.hero-glow-2 { bottom: -20%; right: -10%; background: radial-gradient(circle, #00d4ff 0%, transparent 70%); }
.hero-glow-3 { top: 20%; left: 30%; background: radial-gradient(circle, #ff0055 0%, transparent 60%); opacity: 0.1; }

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 900px;
}

.hero-headline {
  font-family: "Playfair Display", serif;
  font-size: clamp(40px, 8vw, 84px);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
}

.hero-headline em {
  font-style: italic;
  font-weight: 400;
}

.hero-subheadline {
  font-size: clamp(18px, 2.5vw, 22px);
  line-height: 1.5;
  color: var(--text-secondary);
  max-width: 680px;
  margin: 0 auto 48px;
}

.hero-cta {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn {
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  font-family: inherit;
}

.btn-hero-primary {
  background: #000;
  color: #fff;
}

.btn-hero-primary:hover {
  background: #1a1a1a;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.btn-hero-secondary {
  background: rgba(0, 0, 0, 0.04);
  color: #111111;
  border: 1px solid rgba(0, 0, 0, 0.12);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.btn-hero-secondary:hover {
  background: rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

/* ─── Features Section ─────────────────────────────────────── */
.features {
  padding: 140px 0;
  background-color: var(--bg-color);
}

.section-label {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.section-label.dark { color: rgba(255, 255, 255, 0.4); }

.section-heading {
  font-family: "Playfair Display", serif;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  margin-bottom: 72px;
  letter-spacing: -0.02em;
}

.section-heading.dark { color: white; }

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.feature-item {
  padding: 48px;
  border-radius: 2px;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.feature-item:hover {
  background-color: #000;
  border-color: #000;
  transform: translateY(-8px);
}

.feature-icon-wrapper {
  width: 44px;
  height: 44px;
  background: #f5f5f7;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  transition: all 0.4s ease;
}

.feature-item:hover .feature-icon-wrapper {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.feature-item h3 {
  font-family: "Playfair Display", serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: -0.01em;
  transition: color 0.4s ease;
}

.feature-item:hover h3 {
  color: #fff;
}

.feature-item p {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 15px;
  transition: color 0.4s ease;
}

.feature-item:hover p {
  color: rgba(255, 255, 255, 0.6);
}

/* ─── How It Works (Dark) ─────────────────────────────────── */
.how-it-works {
  padding: 140px 0;
  background-color: #fcfcfd;
  color: var(--text-color);
  overflow: hidden;
  border-top: 1px solid #f0f0f2;
}

.how-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

@media (max-width: 968px) {
  .how-grid { grid-template-columns: 1fr; }
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.step {
  display: flex;
  gap: 24px;
}

.step-num {
  font-size: 14px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.15);
  margin-top: 4px;
}

.step h4 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.step p {
  color: var(--text-secondary);
  max-width: 400px;
}

.how-visual {
  position: relative;
}

.phone-frame-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
}

.phone-frame {
  width: 280px;
  height: 560px;
  background: #0a0a0f;
  border: 8px solid #1a1a24;
  border-radius: 40px;
  padding: 12px;
  position: relative;
  z-index: 2;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 24px;
  background: #1a1a24;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  z-index: 10;
}

.phone-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #111118;
  border-radius: 28px;
  overflow: hidden;
}

.phone-header {
  padding: 32px 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.phone-logo img {
  height: 20px;
}

.builder-status {
  font-size: 9px;
  font-weight: 700;
  color: #ff6b00;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.phone-body {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.field-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: auto;
}

.field-item-ghost {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
}

.field-item-ghost.active {
  background: rgba(0, 212, 255, 0.05);
  border-color: rgba(0, 212, 255, 0.2);
}

.field-icon {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
}

.field-item-ghost.active .field-icon {
  background: #00d4ff;
  color: #000;
}

.field-info {
  flex: 1;
}

.field-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.field-type {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.visual-footer-btn {
  height: 48px;
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: 700;
  font-size: 13px;
  margin-top: 20px;
}

.visual-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, #005eff 0%, transparent 70%);
  opacity: 0.15;
  z-index: 1;
  filter: blur(80px);
}

.visual-glow.scale-up {
  width: 140%;
  height: 140%;
  opacity: 0.2;
}


/* ─── Footer ──────────────────────────────────────────────── */
.footer {
  padding: 100px 0 40px;
  background-color: #ffffff;
  border-top: 1px solid #f0f0f2;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 80px;
  margin-bottom: 80px;
}

@media (max-width: 768px) {
  .footer-content { grid-template-columns: 1fr; gap: 48px; }
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.footer-logo img { height: 28px; }
.footer-logo span { font-size: 20px; font-weight: 700; letter-spacing: -0.03em; }

.footer-brand p {
  color: var(--text-secondary);
  max-width: 300px;
}

.footer-links {
  display: flex;
  gap: 60px;
}

.link-group h5 {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
}

.link-group a {
  display: block;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 15px;
  margin-bottom: 16px;
  transition: color 0.15s;
}

.link-group a:hover { color: #000; }

.footer-bottom {
  padding-top: 40px;
  border-top: 1px solid #f0f0f2;
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
}
field-type {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.drag-handle {
  color: rgba(255, 255, 255, 0.1);
  font-weight: 900;
  letter-spacing: 2px;
}

.builder-btn {
  background: #ffffff;
  color: #000;
  cursor: default;
}

.builder-btn:hover {
  background: #f0f0f0;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.code-block {
  font-family: inherit;
  margin-bottom: 32px;
}

.code-line {
  font-family: "SF Mono", "Monaco", "Inconsolata", monospace;
  font-size: 13px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.4);
}

.code-key { color: #8080ff; }
.code-string { color: #00d4ff; }
.code-boolean { color: #ff6b00; }
.code-comment { color: rgba(255, 255, 255, 0.2); font-style: italic; }

.visual-embed-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 32px;
}

.embed-label-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.3);
}

.status-indicator {
  color: #00ffaa;
  display: flex;
  align-items: center;
  gap: 4px;
}

.status-indicator::before {
  content: "";
  width: 4px;
  height: 4px;
  background: #00ffaa;
  border-radius: 50%;
  box-shadow: 0 0 8px #00ffaa;
}

.embed-code-line {
  font-family: monospace;
  font-size: 11px;
  color: #ffffff;
  opacity: 0.8;
}

.visual-footer-btn {
  height: 48px;
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: 700;
  font-size: 14px;
}

.cursor-blink {
  margin-left: 4px;
  animation: blink 1s infinite;
}

@keyframes blink { 
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.visual-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, #005eff 0%, transparent 70%);
  opacity: 0.15;
  z-index: 1;
  filter: blur(80px);
}

/* ─── Final CTA ───────────────────────────────────────────── */
.final-cta {
  padding: 160px 0;
  text-align: center;
  background-color: #fcfcfd;
  color: var(--text-color);
  border-top: 1px solid #f0f0f2;
}

.cta-inner {
  max-width: 800px;
  margin: 0 auto;
}

.cta-inner h2 {
  font-family: "Playfair Display", serif;
  font-size: clamp(36px, 6vw, 56px);
  margin-bottom: 24px;
  font-weight: 700;
  color: var(--text-color);
}

.cta-inner p {
  color: var(--text-secondary);
  font-size: 20px;
  margin-bottom: 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.btn-cta-large {
  padding: 18px 48px;
  font-size: 18px;
  letter-spacing: 0.02em;
  background: #000;
  color: #fff;
}

.btn-cta-large:hover {
  background: #1a1a1a;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* ─── Footer ──────────────────────────────────────────────── */
.footer {
  padding: 100px 0 40px;
  background-color: #ffffff;
  border-top: 1px solid #f0f0f2;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 80px;
  margin-bottom: 80px;
}

@media (max-width: 768px) {
  .footer-content { grid-template-columns: 1fr; gap: 48px; }
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.footer-logo img { height: 28px; }
.footer-logo span { font-size: 20px; font-weight: 700; letter-spacing: -0.03em; }

.footer-brand p {
  color: var(--text-secondary);
  max-width: 300px;
}

.footer-links {
  display: flex;
  gap: 60px;
}

.link-group h5 {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
}

.link-group a {
  display: block;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 15px;
  margin-bottom: 16px;
  transition: color 0.15s;
}

.link-group a:hover { color: #000; }

.footer-bottom {
  padding-top: 40px;
  border-top: 1px solid #f0f0f2;
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
}
</style>
