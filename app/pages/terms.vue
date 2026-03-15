<script setup lang="ts">
useHead({
  title: 'Terms of Service - GhostForm'
})
</script>

<template>
  <div class="legal-page">
    <div class="container container-medium">
      <div class="legal-layout">
        <header class="legal-header">
          <h1 class="page-title">Terms of Service</h1>
        </header>

        <main class="legal-main">
          <section class="legal-section">
            <h2 class="section-title">01. Agreement</h2>
            <p>
              By accessing the GhostForm infrastructure, you enter a binding agreement with Marvlock. These terms govern the secure utilization of our form generation engine.
            </p>
          </section>

          <section class="legal-section">
            <h2 class="section-title">02. Capability Grant</h2>
            <p>GhostForm provides an interface for:</p>
            <ul class="legal-list">
              <li>Schema-defined form generation</li>
              <li>Secure payload ingestion</li>
              <li>Encrypted data retention</li>
              <li>Programmatic management via SPEC-API</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2 class="section-title">03. User Obligations</h2>
            <p>Users are expected to maintain infrastructure hygiene:</p>
            <ul class="legal-list">
              <li><strong>Integrity:</strong> You are responsible for all content distributed via your endpoints.</li>
              <li><strong>Authorization:</strong> You must secure your own authentication vectors (passwords).</li>
              <li><strong>Compliance:</strong> Usage must align with the privacy laws of your jurisdiction.</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2 class="section-title">04. Prohibited Payload Types</h2>
            <p>The following activities and data types are restricted from the engine:</p>
            <ul class="legal-list">
              <li>Automated spam distribution</li>
              <li>Phishing or identity deceptive schemes</li>
              <li>Harassment payloads or illegal data formats</li>
              <li>Infrastructure stress testing without authorization</li>
            </ul>
          </section>

          <section class="legal-section">
            <h2 class="section-title">05. Disclaimers</h2>
            <p>The engine is provided on an "As-Is" basis. Marvlock makes zero warranties regarding absolute uptime or the ultimate protection of data against theoretical future cryptographic breakthroughs.</p>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.legal-page {
  min-height: 100vh;
  padding: 100px 0;
  background-color: #fcfcfd;
}

.container-medium {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 40px;
}

.legal-header {
  margin-bottom: 80px;
  text-align: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: #6b6b80;
  text-decoration: none;
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.back-link:hover { color: #000; }

.page-title {
  font-family: "Playfair Display", serif;
  font-size: 48px;
  font-weight: 700;
  color: #000;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.last-updated {
  font-size: 14px;
  color: #a1a1aa;
  font-weight: 500;
}

.legal-main {
  background: white;
  border: 1px solid #e8e8ec;
  border-radius: 24px;
  padding: 64px;
}

@media (max-width: 480px) {
  .legal-main { padding: 40px 24px; }
}

.legal-section {
  margin-bottom: 64px;
}

.legal-section:last-child { margin-bottom: 0; }

.section-title {
  font-family: "Playfair Display", serif;
  font-size: 24px;
  font-weight: 700;
  color: #000;
  margin-bottom: 24px;
}

.legal-section p {
  font-size: 16px;
  line-height: 1.8;
  color: #6b6b80;
  margin-bottom: 20px;
}

.legal-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.legal-list li {
  padding-left: 24px;
  position: relative;
  font-size: 15px;
  color: #6b6b80;
}

.legal-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #000;
  font-weight: 800;
}

a { color: #000; font-weight: 600; text-decoration: underline; text-underline-offset: 4px; }
</style>
