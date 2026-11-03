# INTEGRATION & SETUP GUIDE
## Connecting Your Agency Web Forms to the AI Lead Recovery Engine

This guide walks your engineering or sales ops team through connecting existing website forms and landing pages in under 15 minutes.

---

### 1. HUBSPOT FORMS INTEGRATION

#### Method A: HubSpot Workflows (Recommended)
1. Go to **HubSpot CRM > Automation > Workflows**.
2. Create an **Event-Based Workflow** triggered by: `Form submission on [Your Lead Form]`.
3. Add a webhook action:
   - **Method:** `POST`
   - **Webhook URL:** `https://api.youragency.com/api/v1/leads/intake`
   - **Authentication:** None (or API token header)
4. Map the standard fields:
   - `contactName` -> Contact's First + Last Name
   - `contactEmail` -> Email
   - `companyName` -> Company Name
   - `website` -> Website URL
   - `statedBudget` -> Budget dropdown property
   - `inquiryMessage` -> Message / Project Scope property

---

### 2. WEBFLOW FORMS INTEGRATION

1. In the Webflow Designer, select your consultation form.
2. Under **Form Settings**:
   - **Action:** Set to `https://api.youragency.com/api/v1/leads/intake`
   - **Method:** `POST`
3. Alternatively, use Webflow Webhooks:
   - Go to **Project Settings > Integrations > Webhooks**.
   - Event: `Form Submission`.
   - Destination URL: `https://api.youragency.com/api/v1/leads/intake`.

---

### 3. WORDPRESS (GRAVITY FORMS / ELEMENTOR / WPFORMS)

#### Via Webhooks Add-on:
1. In WordPress Admin, navigate to **Forms > Settings > Webhooks**.
2. Add New Webhook:
   - **Request URL:** `https://api.youragency.com/api/v1/leads/intake`
   - **Request Method:** `POST`
   - **Format:** `JSON`
3. Map fields to match the payload schema (`contactName`, `contactEmail`, `companyName`, `website`, `inquiryMessage`).

---

### 4. TYPEFORM INTEGRATION

1. Open your Typeform in the builder.
2. Click **Connect > Webhooks**.
3. Add a webhook pointing to `https://api.youragency.com/api/v1/leads/intake`.
4. Turn on the webhook toggle.

---

### 5. SLACK ALERT NOTIFICATIONS SETUP

To send instant Slack alerts when a lead is qualified:
1. Create an Incoming Webhook in your Slack workspace (e.g. in `#sales-inbound`).
2. Add the URL to your `.env` configuration:
   \`\`\`bash
   SLACK_WEBHOOK_URL="https://hooks.slack.com/services/T00/B00/XXXX"
   \`\`\`
3. Whenever a `HOT_PRIORITY` lead arrives, your sales team receives an immediate Slack alert containing:
   - Prospect Name & Company
   - Stated Budget & Score
   - Enriched Tech Stack
   - Pre-Drafted Email ready to copy-paste.

---
*Questions? Contact engineering support for 48-hour assisted deployment.*
