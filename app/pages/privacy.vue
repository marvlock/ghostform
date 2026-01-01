<script setup lang="ts">
useHead({
  title: 'Privacy Policy - GhostForm'
})
</script>

<template>
  <div class="legal-page">
    <div class="container">
      <div class="legal-content">
        <NuxtLink to="/" class="back-link">← Back to Home</NuxtLink>
        
        <h1>Privacy Policy</h1>
        <p class="last-updated">Last updated: January 1, 2026</p>

        <section>
          <h2>Introduction</h2>
          <p>
            GhostForm ("we", "our", or "us") is a privacy-first form builder operated by 
            <a href="https://www.marvlock.dev/" target="_blank" rel="noopener noreferrer">Project Marvlock</a>. 
            This Privacy Policy explains how we collect, use, and protect your information when you use our service.
          </p>
          <p>
            GhostForm is open-source software. You can view our source code on 
            <a href="https://github.com/marvlock/ghostform" target="_blank" rel="noopener noreferrer">GitHub</a> 
            to verify our privacy claims.
          </p>
        </section>

        <section>
          <h2>Our Privacy Principles</h2>
          <p>GhostForm is built on the following privacy principles:</p>
          <ul>
            <li><strong>No tracking:</strong> We don't use cookies, fingerprinting, or analytics to track users</li>
            <li><strong>Minimal data collection:</strong> We only collect data necessary to provide the service</li>
            <li><strong>Data ownership:</strong> You own all your form submissions and data</li>
            <li><strong>Transparency:</strong> Our code is open-source and auditable</li>
            <li><strong>GDPR-friendly:</strong> Designed with privacy regulations in mind</li>
          </ul>
        </section>

        <section>
          <h2>Information We Collect</h2>
          
          <h3>Account Information</h3>
          <p>When you create an account, we collect:</p>
          <ul>
            <li>Email address (for authentication and communication)</li>
            <li>Hashed password (stored securely, never in plain text)</li>
          </ul>

          <h3>Form Data</h3>
          <p>We store:</p>
          <ul>
            <li>Form definitions (name, fields, settings) that you create</li>
            <li>Form submissions received through your forms</li>
            <li>All data is encrypted at rest</li>
          </ul>

          <h3>IP Addresses</h3>
          <p>
            IP addresses are collected <strong>only for rate limiting purposes</strong> to prevent spam and abuse. 
            IP addresses are:
          </p>
          <ul>
            <li>Stored with form submissions for rate limiting</li>
            <li><strong>Not used for tracking or analytics</strong></li>
            <li><strong>Not shared with third parties</strong></li>
            <li>Only used to enforce per-IP submission limits</li>
          </ul>
          <p>
            This is a legitimate security measure to protect forms from abuse. IP addresses are not used to 
            identify, track, or profile users.
          </p>

          <h3>Session Information</h3>
          <p>
            We use session cookies to maintain your login state. These cookies:
          </p>
          <ul>
            <li>Are HTTP-only (not accessible via JavaScript)</li>
            <li>Are used only for authentication</li>
            <li>Are not used for tracking or analytics</li>
            <li>Expire after 30 days of inactivity</li>
          </ul>
        </section>

        <section>
          <h2>What We Don't Collect</h2>
          <p>GhostForm does <strong>not</strong> collect:</p>
          <ul>
            <li>Browser fingerprints</li>
            <li>Device information</li>
            <li>Location data</li>
            <li>Analytics or usage tracking</li>
            <li>Third-party cookies</li>
            <li>Advertising identifiers</li>
            <li>Social media tracking pixels</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We use collected information only to:</p>
          <ul>
            <li>Provide and maintain the GhostForm service</li>
            <li>Authenticate your account</li>
            <li>Store and deliver form submissions</li>
            <li>Enforce rate limits to prevent abuse</li>
            <li>Send important service-related communications (if necessary)</li>
          </ul>
          <p>We do <strong>not</strong>:</p>
          <ul>
            <li>Sell your data to third parties</li>
            <li>Use your data for advertising</li>
            <li>Share your data with analytics services</li>
            <li>Use your data for any purpose other than providing the service</li>
          </ul>
        </section>

        <section>
          <h2>Data Storage and Security</h2>
          <ul>
            <li>All data is stored in secure databases with encryption at rest</li>
            <li>Passwords are hashed using industry-standard algorithms</li>
            <li>Form submissions are encrypted in the database</li>
            <li>We use secure, encrypted connections (HTTPS) for all data transmission</li>
            <li>Access to data is restricted to authorized personnel only</li>
          </ul>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access:</strong> View all your forms and submissions</li>
            <li><strong>Export:</strong> Download all your data in JSON format</li>
            <li><strong>Delete:</strong> Delete your account and all associated data at any time</li>
            <li><strong>Control:</strong> Enable or disable forms, set rate limits, and manage settings</li>
          </ul>
          <p>
            To exercise these rights, use the features in your GhostForm dashboard or contact us.
          </p>
        </section>

        <section>
          <h2>Data Retention</h2>
          <ul>
            <li>Form data is retained until you delete it</li>
            <li>Account data is retained until you delete your account</li>
            <li>When you delete your account, all associated data is permanently removed</li>
            <li>IP addresses used for rate limiting are stored with submissions but are not used for tracking</li>
          </ul>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>
            GhostForm uses the following third-party services:
          </p>
          <ul>
            <li><strong>MongoDB:</strong> Database hosting (data is encrypted at rest)</li>
            <strong>Vercel/Deployment Platform:</strong> Hosting infrastructure
          </ul>
          <p>
            These services are used only for infrastructure and do not have access to your form data 
            for their own purposes. We do not share your data with any other third parties.
          </p>
        </section>

        <section>
          <h2>Open Source</h2>
          <p>
            GhostForm is open-source software. You can:
          </p>
          <ul>
            <li>View our source code on <a href="https://github.com/marvlock/ghostform" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li>Audit our privacy claims by examining the code</li>
            <li>Self-host your own instance if desired</li>
            <li>Contribute improvements to the project</li>
          </ul>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>
            GhostForm is not intended for users under the age of 13. We do not knowingly collect 
            personal information from children under 13. If you believe we have collected information 
            from a child under 13, please contact us immediately.
          </p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page and updating the "Last updated" date. 
            You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>Website: <a href="https://www.marvlock.dev/" target="_blank" rel="noopener noreferrer">Project Marvlock</a></li>
            <li>GitHub: <a href="https://github.com/marvlock/ghostform" target="_blank" rel="noopener noreferrer">marvlock/ghostform</a></li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.legal-page {
  min-height: 100vh;
  padding: 40px 0;
  background-color: var(--bg-color);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 40px;
}

.legal-content {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 48px;
  margin-top: 20px;
}

.back-link {
  display: inline-block;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 24px;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--accent-color);
}

h1 {
  font-size: 42px;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 8px;
  letter-spacing: -0.03em;
}

.last-updated {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
}

section {
  margin-bottom: 48px;
}

h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin-top: 0;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin-top: 24px;
  margin-bottom: 12px;
}

p {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 16px;
  margin-bottom: 16px;
}

ul {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 24px;
  padding-left: 24px;
}

li {
  margin-bottom: 8px;
}

strong {
  color: var(--text-color);
  font-weight: 600;
}

a {
  color: var(--accent-color);
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: var(--accent-hover);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .container {
    padding: 0 24px;
  }

  .legal-content {
    padding: 32px 24px;
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 24px;
  }
}
</style>
