<script setup lang="ts">
useHead({
  title: 'Terms of Service - GhostForm'
})
</script>

<template>
  <div class="legal-page">
    <div class="container">
      <div class="legal-content">
        <NuxtLink to="/" class="back-link">← Back to Home</NuxtLink>
        
        <h1>Terms of Service</h1>
        <p class="last-updated">Last updated: January 1, 2026</p>

        <section>
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using GhostForm ("Service"), operated by 
            <a href="https://www.marvlock.dev/" target="_blank" rel="noopener noreferrer">Project Marvlock</a>, 
            you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these 
            terms, you may not access the Service.
          </p>
          <p>
            GhostForm is open-source software available at 
            <a href="https://github.com/marvlock/ghostform" target="_blank" rel="noopener noreferrer">GitHub</a>.
          </p>
        </section>

        <section>
          <h2>Description of Service</h2>
          <p>
            GhostForm is a privacy-first form builder that allows you to:
          </p>
          <ul>
            <li>Create and manage online forms</li>
            <li>Collect form submissions</li>
            <li>Embed forms on websites</li>
            <li>Export submission data</li>
            <li>Manage forms via REST API</li>
          </ul>
        </section>

        <section>
          <h2>User Accounts</h2>
          <h3>Account Creation</h3>
          <ul>
            <li>You must provide a valid email address to create an account</li>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You are responsible for all activities that occur under your account</li>
            <li>You must be at least 13 years old to use the Service</li>
          </ul>

          <h3>Account Responsibilities</h3>
          <ul>
            <li>Keep your password secure and confidential</li>
            <li>Notify us immediately of any unauthorized use</li>
            <li>You are responsible for all content created using your account</li>
          </ul>
        </section>

        <section>
          <h2>Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any illegal purpose or in violation of any laws</li>
            <li>Violate or infringe upon the rights of others</li>
            <li>Transmit any harmful, offensive, or inappropriate content</li>
            <li>Attempt to gain unauthorized access to the Service or other accounts</li>
            <li>Use the Service to send spam, phishing, or malicious content</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Use automated systems to abuse or overload the Service</li>
            <li>Reverse engineer, decompile, or disassemble the Service (except as permitted by open-source license)</li>
            <li>Collect or harvest information about other users</li>
          </ul>
        </section>

        <section>
          <h2>Form Content and Submissions</h2>
          <h3>Your Content</h3>
          <ul>
            <li>You retain all rights to forms and content you create</li>
            <li>You are solely responsible for the content of your forms</li>
            <li>You must ensure your forms comply with applicable laws and regulations</li>
            <li>You must obtain necessary consents for data collection (e.g., GDPR, CCPA)</li>
          </ul>

          <h3>Form Submissions</h3>
          <ul>
            <li>Submissions are stored securely and encrypted at rest</li>
            <li>You are responsible for handling submissions in compliance with privacy laws</li>
            <li>We are not responsible for the content or accuracy of form submissions</li>
            <li>You must not use forms to collect sensitive information without proper security measures</li>
          </ul>
        </section>

        <section>
          <h2>Rate Limiting</h2>
          <p>
            GhostForm implements rate limiting to prevent abuse and ensure service availability:
          </p>
          <ul>
            <li>Rate limits are configurable per form</li>
            <li>Limits are enforced per IP address</li>
            <li>Exceeding rate limits may result in temporary restrictions</li>
            <li>We reserve the right to adjust rate limits to maintain service quality</li>
          </ul>
        </section>

        <section>
          <h2>Intellectual Property</h2>
          <h3>Service Ownership</h3>
          <p>
            The GhostForm service, including its original content, features, and functionality, is owned by 
            Project Marvlock and is protected by copyright, trademark, and other laws.
          </p>

          <h3>Open Source License</h3>
          <p>
            GhostForm is open-source software. The source code is available on 
            <a href="https://github.com/marvlock/ghostform" target="_blank" rel="noopener noreferrer">GitHub</a> 
            and is subject to its respective open-source license terms.
          </p>

          <h3>Your Content</h3>
          <p>
            You retain all intellectual property rights to forms, content, and data you create using GhostForm. 
            We do not claim ownership of your content.
          </p>
        </section>

        <section>
          <h2>Privacy</h2>
          <p>
            Your use of GhostForm is also governed by our 
            <NuxtLink to="/privacy">Privacy Policy</NuxtLink>. 
            Please review our Privacy Policy to understand our practices regarding data collection and use.
          </p>
        </section>

        <section>
          <h2>Service Availability</h2>
          <ul>
            <li>We strive to maintain high availability but do not guarantee uninterrupted service</li>
            <li>The Service may be temporarily unavailable due to maintenance, updates, or unforeseen circumstances</li>
            <li>We reserve the right to modify, suspend, or discontinue the Service at any time</li>
            <li>We are not liable for any loss or damage resulting from Service unavailability</li>
          </ul>
        </section>

        <section>
          <h2>Data Export and Deletion</h2>
          <ul>
            <li>You can export your data in JSON format at any time</li>
            <li>You can delete your account and all associated data at any time</li>
            <li>Upon account deletion, all forms and submissions are permanently removed</li>
            <li>We are not responsible for data loss after account deletion</li>
          </ul>
        </section>

        <section>
          <h2>Termination</h2>
          <h3>By You</h3>
          <p>
            You may terminate your account at any time by deleting your account through the Service interface.
          </p>

          <h3>By Us</h3>
          <p>
            We may terminate or suspend your account immediately, without prior notice, for conduct that we 
            believe violates these Terms or is harmful to other users, us, or third parties.
          </p>

          <h3>Effect of Termination</h3>
          <ul>
            <li>Upon termination, your right to use the Service will immediately cease</li>
            <li>All data associated with your account may be deleted</li>
            <li>Provisions that by their nature should survive termination will survive</li>
          </ul>
        </section>

        <section>
          <h2>Disclaimers</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS 
            OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
            PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
          </p>
          <p>
            We do not warrant that:
          </p>
          <ul>
            <li>The Service will be uninterrupted, secure, or error-free</li>
            <li>Defects will be corrected</li>
            <li>The Service is free of viruses or other harmful components</li>
          </ul>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, PROJECT MARVLOCK AND ITS AFFILIATES SHALL NOT BE LIABLE 
            FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS 
            OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER 
            INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
          </p>
        </section>

        <section>
          <h2>Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Project Marvlock and its affiliates from and 
            against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses 
            (including attorney's fees) arising from:
          </p>
          <ul>
            <li>Your use of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Content you create or submissions you receive through the Service</li>
          </ul>
        </section>

        <section>
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws, without regard 
            to its conflict of law provisions. Any disputes arising from these Terms or the Service shall be 
            resolved through appropriate legal channels.
          </p>
        </section>

        <section>
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, 
            we will provide at least 30 days notice prior to any new terms taking effect. What constitutes 
            a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use the Service after any revisions become effective, you agree to 
            be bound by the revised terms.
          </p>
        </section>

        <section>
          <h2>Severability</h2>
          <p>
            If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining 
            provisions will remain in effect. The invalid provision will be modified to the minimum extent 
            necessary to make it valid and enforceable.
          </p>
        </section>

        <section>
          <h2>Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and 
            Project Marvlock regarding the Service and supersede all prior agreements and understandings.
          </p>
        </section>

        <section>
          <h2>Contact Information</h2>
          <p>
            If you have questions about these Terms, please contact us:
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
