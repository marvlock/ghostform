<script setup lang="ts">
useHead({
  title: 'Privacy Policy - GhostForm'
})
</script>

<template>
  <div class="legal-page">
    <div class="container container-medium">
      <div class="legal-layout">
        <header class="legal-header">
          <h1 class="page-title">Privacy Policy</h1>
        </header>
        
        <main class="legal-main">
          <section class="legal-section">
            <h2 class="section-title">Protocol Overview</h2>
            <p>
              GhostForm operates as a non-tracking infrastructure provided by 
              <a href="https://www.marvlock.dev" target="_blank">Marvlock</a>. 
              The service is architected to prioritize metadata isolation and data integrity.
            </p>
          </section>

          <section class="legal-section">
            <h2 class="section-title">Security Core</h2>
            <div class="security-grid">
              <div class="security-item">
                <strong>Zero Trace</strong>
                <p>No cookies, fingerprinting, or behavioral analytics are deployed.</p>
              </div>
              <div class="security-item">
                <strong>Minimalism</strong>
                <p>Only essential authentication vectors are retained.</p>
              </div>
            </div>
          </section>

          <section class="legal-section">
            <h2 class="section-title">Data Ingestion</h2>
            <h3>Identity Storage</h3>
            <p>Email addresses are utilized exclusively for identity verification and administrative signaling. Passwords exist only as cryptographic hashes.</p>
            
            <h3>Payload Handling</h3>
            <p>Form definitions and submission data are encrypted at rest. We hold zero decryption keys for your end-user payloads outside of the administrative context you define.</p>
            
            <h3>Network Metadata</h3>
            <p>IP identities are logged temporarily for the sole purpose of <NuxtLink to="/docs#rate-limiting">Rate Limiting</NuxtLink>. These records are isolated from identity profiles and purged per infrastructure policy.</p>
          </section>

          <section class="legal-section">
            <h2 class="section-title">Infrastructure Rights</h2>
            <ul class="rights-list">
              <li><strong>Extraction:</strong> Export complete datasets in JSON specification.</li>
              <li><strong>Erasure:</strong> Permanent deletion of all identities and payloads.</li>
              <li><strong>Audit:</strong> Verify all claims via our open-source codebase.</li>
            </ul>
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
  margin-bottom: 20px;
}

.legal-section h3 {
  font-size: 16px;
  font-weight: 700;
  margin-top: 32px;
  margin-bottom: 12px;
  color: #000;
}

.legal-section p {
  font-size: 16px;
  line-height: 1.8;
  color: #6b6b80;
  margin-bottom: 20px;
}

.security-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;
}

.security-item {
  padding: 20px;
  background: #fcfcfd;
  border: 1px solid #f0f0f2;
  border-radius: 12px;
}

.security-item strong { display: block; margin-bottom: 8px; font-size: 14px; }
.security-item p { font-size: 14px !important; margin: 0 !important; }

.rights-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rights-list li {
  padding-left: 24px;
  position: relative;
  font-size: 15px;
  color: #6b6b80;
}

.rights-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #000;
  font-weight: 800;
}

a { color: #000; font-weight: 600; text-decoration: underline; text-underline-offset: 4px; }
</style>
