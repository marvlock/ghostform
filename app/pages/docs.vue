<script setup lang="ts">
const route = useRoute()
const activeSection = ref(route.hash ? route.hash.substring(1) : 'getting-started')

const sections = [
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'form-builder', title: 'Form Builder' },
  { id: 'embedding', title: 'Embedding Forms' },
  { id: 'api-reference', title: 'API Reference' },
  { id: 'rate-limiting', title: 'Rate Limiting' },
  { id: 'examples', title: 'Examples' }
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
      <div class="docs-layout">
        <!-- Sidebar Navigation -->
        <aside class="docs-sidebar">
          <nav class="docs-nav">
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
            <h1>Getting Started</h1>
            <p class="lead">Welcome to GhostForm! This guide will help you create your first form in minutes.</p>

            <h2>Quick Start</h2>
            <ol>
              <li><strong>Sign up</strong> for a free account</li>
              <li><strong>Create a form</strong> using the Form Builder</li>
              <li><strong>Embed</strong> your form on your website</li>
              <li><strong>View submissions</strong> in your dashboard</li>
            </ol>

            <h2>Creating Your First Form</h2>
            <p>After signing up, click "Create a form" to open the Form Builder.</p>
            
            <div class="code-block">
              <pre><code>1. Enter a form name (e.g., "Contact Form")
2. Add fields by clicking "Add Field"
3. Configure each field (label, type, validation)
4. Set form settings (success message, redirect URL)
5. Click "Save Form"</code></pre>
            </div>

            <h2>Form Settings</h2>
            <ul>
              <li><strong>Form Name:</strong> Display name for your form</li>
              <li><strong>Slug:</strong> URL-friendly identifier (auto-generated from name)</li>
              <li><strong>Success Message:</strong> Message shown after successful submission</li>
              <li><strong>Redirect URL:</strong> Optional URL to redirect after submission</li>
              <li><strong>Rate Limit:</strong> Maximum submissions per hour per IP</li>
              <li><strong>Form Enabled:</strong> Toggle to enable/disable form submissions</li>
            </ul>
          </section>

          <!-- Form Builder -->
          <section id="form-builder" class="docs-section">
            <h1>Form Builder</h1>
            <p>The Form Builder lets you create forms with various field types and validation rules.</p>

            <h2>Field Types</h2>
            <div class="field-types">
              <div class="field-type-item">
                <h3>Text</h3>
                <p>Single-line text input. Supports min/max length validation.</p>
              </div>
              <div class="field-type-item">
                <h3>Email</h3>
                <p>Email input with automatic email format validation.</p>
              </div>
              <div class="field-type-item">
                <h3>Number</h3>
                <p>Numeric input with min/max value validation.</p>
              </div>
              <div class="field-type-item">
                <h3>Textarea</h3>
                <p>Multi-line text input for longer content.</p>
              </div>
              <div class="field-type-item">
                <h3>Select</h3>
                <p>Dropdown menu with predefined options.</p>
              </div>
              <div class="field-type-item">
                <h3>Checkbox</h3>
                <p>Single checkbox for boolean values.</p>
              </div>
              <div class="field-type-item">
                <h3>Radio</h3>
                <p>Radio button group for single selection from options.</p>
              </div>
              <div class="field-type-item">
                <h3>Hidden</h3>
                <p>Hidden field for passing data without user input.</p>
              </div>
            </div>

            <h2>Field Configuration</h2>
            <p>Each field can be configured with:</p>
            <ul>
              <li><strong>Label:</strong> Display name for the field</li>
              <li><strong>Placeholder:</strong> Hint text shown in empty fields</li>
              <li><strong>Required:</strong> Make the field mandatory</li>
              <li><strong>Default Value:</strong> Pre-filled value</li>
              <li><strong>Description:</strong> Help text shown below the field</li>
              <li><strong>Validation:</strong> Min/max length, number ranges, etc.</li>
              <li><strong>Error Message:</strong> Custom error message for validation failures</li>
            </ul>

            <h2>Validation Rules</h2>
            <div class="code-block">
              <pre><code>Text/Email/Textarea:
  - minLength: Minimum character count
  - maxLength: Maximum character count

Number:
  - min: Minimum numeric value
  - max: Maximum numeric value

Email:
  - Automatic email format validation</code></pre>
            </div>
          </section>

          <!-- Embedding -->
          <section id="embedding" class="docs-section">
            <h1>Embedding Forms</h1>
            <p>GhostForm offers multiple ways to embed your forms on any website.</p>

            <h2>Method 1: iframe Embed (Recommended)</h2>
            <p>The simplest way to embed a form. Just copy and paste one line of code.</p>
            <div class="code-block">
              <pre><code>&lt;iframe 
  src="https://yourdomain.com/form/your-form-slug" 
  width="100%" 
  height="600" 
  frameborder="0" 
  style="border: none; border-radius: 16px;"
&gt;&lt;/iframe&gt;</code></pre>
            </div>
            <p><strong>Pros:</strong> Simple, works without JavaScript, isolated styling</p>
            <p><strong>Cons:</strong> Fixed height, less styling control</p>

            <h2>Method 2: Full HTML Embed</h2>
            <p>Copy the complete HTML form code with all styles included.</p>
            <ol>
              <li>Go to "My Forms"</li>
              <li>Click the "Embed" button next to your form</li>
              <li>Select "Full HTML Embed"</li>
              <li>Copy the HTML code</li>
              <li>Paste it into your website's HTML</li>
            </ol>
            <p><strong>Pros:</strong> Full control, matches GhostForm styling, no external dependencies</p>
            <p><strong>Cons:</strong> Longer code to paste</p>

            <h2>Method 3: Direct Link</h2>
            <p>Share a direct link to your form or use it in your own HTML.</p>
            <div class="code-block">
              <pre><code>&lt;a href="https://yourdomain.com/form/your-form-slug"&gt;
  Fill out our form
&lt;/a&gt;</code></pre>
            </div>

            <h2>Getting Embed Code</h2>
            <ol>
              <li>Navigate to "My Forms"</li>
              <li>Find your form</li>
              <li>Click the "Embed" button (clipboard icon)</li>
              <li>Choose your preferred embed method</li>
              <li>Click "Copy" to copy the code</li>
            </ol>
          </section>

          <!-- API Reference -->
          <section id="api-reference" class="docs-section">
            <h1>API Reference</h1>
            <p>GhostForm provides a RESTful API for programmatic form management.</p>

            <h2>Authentication</h2>
            <p>Most API endpoints require authentication via session cookies. Log in through the web interface to obtain a session.</p>

            <h2>Form Management</h2>

            <h3>List All Forms</h3>
            <div class="code-block">
              <pre><code>GET /api/forms

Response: Array of form objects
[
  {
    "id": "uuid",
    "name": "Contact Form",
    "slug": "contact-form",
    "fields": [...],
    "settings": {...},
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
]</code></pre>
            </div>

            <h3>Get Form by ID</h3>
            <div class="code-block">
              <pre><code>GET /api/forms/by-id/{id}

Response: Form object</code></pre>
            </div>

            <h3>Get Form by Slug (Public)</h3>
            <div class="code-block">
              <pre><code>GET /api/forms/{slug}

Response: Form object (no authentication required)</code></pre>
            </div>

            <h3>Create Form</h3>
            <div class="code-block">
              <pre><code>POST /api/forms
Content-Type: application/json

{
  "name": "Contact Form",
  "slug": "contact-form",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Name",
      "required": true
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email",
      "required": true
    }
  ],
  "settings": {
    "successMessage": "Thank you!",
    "redirectUrl": "https://example.com/thanks",
    "rateLimit": 10,
    "enabled": true
  }
}

Response: Created form object</code></pre>
            </div>

            <h3>Update Form</h3>
            <div class="code-block">
              <pre><code>PUT /api/forms/by-id/{id}
Content-Type: application/json

{
  "name": "Updated Form Name",
  "slug": "updated-slug",
  "fields": [...],
  "settings": {...}
}

Response: Updated form object</code></pre>
            </div>

            <h3>Delete Form</h3>
            <div class="code-block">
              <pre><code>DELETE /api/forms/by-id/{id}

Response: {
  "success": true,
  "message": "Form deleted successfully"
}</code></pre>
            </div>

            <h2>Submissions</h2>

            <h3>Get Submissions</h3>
            <div class="code-block">
              <pre><code>GET /api/submissions/{slug}

Response: Array of submission objects
[
  {
    "id": "uuid",
    "formId": "uuid",
    "formSlug": "contact-form",
    "data": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-01-15T10:00:00Z"
  }
]</code></pre>
            </div>

            <h3>Submit to Form</h3>
            <div class="code-block">
              <pre><code>POST /api/submit/{slug}
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}

Response: {
  "success": true,
  "message": "Thank you for your submission!",
  "redirectUrl": "https://example.com/thanks"
}</code></pre>
            </div>

            <h2>Error Responses</h2>
            <p>All endpoints return standard HTTP status codes:</p>
            <ul>
              <li><strong>200:</strong> Success</li>
              <li><strong>201:</strong> Created</li>
              <li><strong>400:</strong> Bad Request (validation errors)</li>
              <li><strong>401:</strong> Unauthorized</li>
              <li><strong>403:</strong> Forbidden</li>
              <li><strong>404:</strong> Not Found</li>
              <li><strong>429:</strong> Too Many Requests (rate limit exceeded)</li>
            </ul>
          </section>

          <!-- Rate Limiting -->
          <section id="rate-limiting" class="docs-section">
            <h1>Rate Limiting</h1>
            <p>Protect your forms from spam and abuse with configurable rate limits.</p>

            <h2>How It Works</h2>
            <p>Rate limiting tracks submissions per IP address. Each IP can submit a form a limited number of times per hour.</p>

            <h2>Configuration</h2>
            <ol>
              <li>Open your form in the Form Builder</li>
              <li>In "Form Settings", find "Rate Limit"</li>
              <li>Enter the maximum number of submissions per hour (e.g., 10)</li>
              <li>Save your form</li>
            </ol>

            <h2>Rate Limit Behavior</h2>
            <ul>
              <li>Limits are enforced <strong>per IP address</strong></li>
              <li>Time window is <strong>1 hour</strong> (rolling window)</li>
              <li>When exceeded, returns <strong>429 Too Many Requests</strong></li>
              <li>Error message includes retry information</li>
            </ul>

            <h2>Example</h2>
            <p>If you set a rate limit of 10 submissions per hour:</p>
            <ul>
              <li>IP 1.2.3.4 can submit 10 times in an hour</li>
              <li>IP 5.6.7.8 can also submit 10 times (separate limit)</li>
              <li>After 1 hour, the count resets for each IP</li>
            </ul>

            <h2>Privacy Note</h2>
            <p>IP addresses are stored only for rate limiting purposes and are not used for tracking or analytics. This is a legitimate security measure to prevent abuse.</p>
          </section>

          <!-- Examples -->
          <section id="examples" class="docs-section">
            <h1>Examples</h1>
            <p>Common use cases and code examples.</p>

            <h2>Contact Form</h2>
            <div class="code-block">
              <pre><code>Fields:
- Name (text, required)
- Email (email, required)
- Message (textarea, required)

Settings:
- Success Message: "Thanks for contacting us!"
- Redirect URL: "/thank-you"</code></pre>
            </div>

            <h2>Newsletter Signup</h2>
            <div class="code-block">
              <pre><code>Fields:
- Email (email, required)

Settings:
- Success Message: "You're subscribed!"
- Rate Limit: 5 (prevent spam)</code></pre>
            </div>

            <h2>Survey Form</h2>
            <div class="code-block">
              <pre><code>Fields:
- Name (text, required)
- Age (number, min: 18, max: 100)
- Favorite Color (select: Red, Blue, Green)
- Subscribe (checkbox)
- Feedback (textarea)

Settings:
- Success Message: "Survey submitted!"</code></pre>
            </div>

            <h2>Programmatic Form Creation</h2>
            <div class="code-block">
              <pre><code>// Using fetch API
const response = await fetch('/api/forms', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Include cookies
  body: JSON.stringify({
    name: 'My Form',
    slug: 'my-form',
    fields: [
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        required: true
      }
    ],
    settings: {
      successMessage: 'Thank you!',
      enabled: true
    }
  })
})

const form = await response.json()</code></pre>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.docs-page {
  min-height: 100vh;
  padding: 40px 0;
  background-color: var(--bg-color);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.docs-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 64px;
}

.docs-sidebar {
  position: sticky;
  top: 80px;
  height: fit-content;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.docs-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  padding: 10px 16px;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.nav-item:hover {
  color: var(--text-color);
  background: var(--section-bg);
}

.nav-item.active {
  color: var(--accent-color);
  background: var(--section-bg);
  border-color: var(--accent-color);
  font-weight: 600;
}

.docs-content {
  max-width: 800px;
}

.docs-section {
  margin-bottom: 80px;
  scroll-margin-top: 100px;
}

.docs-section h1 {
  font-size: 42px;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 16px;
  letter-spacing: -0.03em;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--border-color);
}

.docs-section h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin-top: 48px;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.docs-section h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin-top: 32px;
  margin-bottom: 12px;
}

.docs-section p {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 16px;
  margin-bottom: 16px;
}

.docs-section .lead {
  font-size: 18px;
  color: var(--text-color);
  margin-bottom: 32px;
}

.docs-section ul,
.docs-section ol {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 24px;
  padding-left: 24px;
}

.docs-section li {
  margin-bottom: 8px;
}

.docs-section strong {
  color: var(--text-color);
  font-weight: 600;
}

.code-block {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color);
}

.code-block code {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}

.field-types {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 24px 0;
}

.field-type-item {
  padding: 20px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.field-type-item h3 {
  font-size: 18px;
  margin: 0 0 8px 0;
  color: var(--text-color);
}

.field-type-item p {
  font-size: 14px;
  margin: 0;
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .docs-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .docs-sidebar {
    position: static;
    max-height: none;
  }

  .docs-nav {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 24px;
  }

  .docs-section h1 {
    font-size: 32px;
  }

  .docs-section h2 {
    font-size: 24px;
  }

  .field-types {
    grid-template-columns: 1fr;
  }

  .docs-nav {
    grid-template-columns: 1fr;
  }
}
</style>
