# AI Lead Recovery & Sales Automation Platform
## High-Velocity Inbound Lead Qualification, Enrichment & On-Chain Settlement

[![Vercel Compatible](https://img.shields.io/badge/Vercel-Serverless%20Ready-black?style=flat&logo=vercel)](https://vercel.com)
[![Ethereum Mainnet](https://img.shields.io/badge/Ethereum-Mainnet%20Verified-blue?style=flat&logo=ethereum)](https://ethereum.org)
[![Chainlink Oracle](https://img.shields.io/badge/Chainlink-Price%20Feeds-375BD2?style=flat&logo=chainlink)](https://chain.link)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAditya0049%2Fai-lead-recovery-platform&env=ETH_RECEIVING_ADDRESS,ETH_RPC_URL,CHAINLINK_ETH_USD_ORACLE&envDefaults=0x01791e7a273392859e529a69a6b8e6b76e48a3bb,https%3A%2F%2Fethereum-rpc.publicnode.com,0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419)

**Platform Name:** AI Lead Recovery & Sales Automation Platform (`ai-lead-recovery-platform`)  
**Product Version:** v1.0.0  
**License:** MIT  

---

## 1. PRODUCT OVERVIEW

The **AI Lead Recovery & Sales Automation Platform** is a turnkey, lightweight software engine built for digital marketing agencies, SEO consultancies, B2B SaaS companies, and growth firms.

### The Problem It Solves
When prospective high-ticket clients submit consultation requests on an agency's website or ad landing page:
- Average human response time across B2B agencies is **3.8 hours**.
- Lead qualification research is performed manually by reps searching Google and LinkedIn.
- Over **45% of inbound leads go cold** or begin conversations with competitor agencies who responded first.

### The Solution
1. **Instant Webhook Ingestion:** Captures inbound form submissions from HubSpot, Webflow, WordPress, Typeform, or custom forms with sub-50ms latency.
2. **Deterministic ICP Scoring:** Instantly calculates budget tier, urgency, and domain authority (0–100 score).
3. **Automated Company Enrichment:** Identifies the prospect's marketing stack (CMS, ad pixels, analytics tags) in <30 seconds.
4. **Contextual Sales Draft Synthesis:** Generates a personalized, non-generic meeting invitation email tailored to the prospect's exact inquiry.
5. **Decentralized Ethereum Settlement:** On-chain payment portal with live Chainlink price oracle and block confirmation tracking.

---

## 2. SYSTEM ARCHITECTURE

```
[Inbound Agency Form] (HubSpot / Webflow / WordPress / Typeform)
           │
           ▼
[POST /api/v1/leads/intake] (Vercel Serverless / Express)
           │
     ┌─────┴─────────────────────────────────────┐
     ▼                                           ▼
[Deterministic Scoring Engine]        [Technographic Enrichment]
• Budget intent ($5k–$50k/mo)          • CMS & Framework detection
• Commercial urgency keywords          • Google / Meta ad pixels
• Commercial domain verification       • CRM & Analytics tags
     └─────┬─────────────────────────────────────┘
           ▼
[Contextual Sales Follow-Up Synthesizer]
• Tailored non-generic email draft referencing prospect inquiry
• 1-click copy for sales reps & Slack notifications
           │
           ▼
[Interactive Dashboard & Ethereum Settlement Portal]
• Live console at /
• Ethereum Mainnet settlement at /payment.html
• Real-time Chainlink Oracle query (0x5f4e...8419)
• 12-block on-chain confirmation verification
```

---

## 3. CORE FEATURES

- **Dual-Mode Execution:** Operates as a standalone Express server locally and compiles to Vercel Serverless Functions for production deployment.
- **Zero Hallucination Scoring:** Deterministic, rule-based qualification algorithm ensures predictable, compliant scoring outside stochastic AI drift.
- **Real-Time On-Chain Pricing:** Live integration with Chainlink's AggregatorV3 Oracle on Ethereum Mainnet (`0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419`).
- **Receive-Only Wallet Security:** Zero private keys stored. Payment verification is executed via read-only JSON-RPC queries.
- **Dark-Mode Sales Management Console:** Responsive dashboard with live lead feed, 1-click email copy, and interactive test intake.

---

## 4. QUICK START & LOCAL DEVELOPMENT

### Prerequisites
- Node.js v18 or v20+
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/Aditya0049/ai-lead-recovery-platform.git
cd ai-lead-recovery-platform

# Install dependencies
npm install

# Build TypeScript
npm run build

# Start local development server
npm start
```

The application will be live on `http://localhost:3080`:
- **Management Console:** `http://localhost:3080`
- **Ethereum Settlement Portal:** `http://localhost:3080/payment.html`
- **Health Check API:** `http://localhost:3080/api/v1/health`

### Running the Test Suite
```bash
npm run demo
```

---

## 5. ENVIRONMENT CONFIGURATION

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Local server port | `3080` |
| `NODE_ENV` | Operating mode (`development` or `production`) | `production` |
| `ETH_RECEIVING_ADDRESS` | Official receive-only Ethereum Mainnet address | `0x01791e7a273392859e529a69a6b8e6b76e48a3bb` |
| `ETH_RPC_URL` | Read-only Ethereum Mainnet JSON-RPC endpoint | `https://ethereum-rpc.publicnode.com` |
| `CHAINLINK_ETH_USD_ORACLE` | Chainlink ETH/USD oracle address on Ethereum Mainnet | `0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419` |
| `DATABASE_URL` | Optional PostgreSQL / Neon / Supabase connection string | *(Uses in-memory cache if unset)* |

---

## 6. VERCEL PRODUCTION DEPLOYMENT

This platform is configured for zero-config Vercel deployment with native serverless functions and static asset CDN hosting.

### Deploying via Vercel Dashboard (Recommended)
1. Push the repository to GitHub.
2. Log in to [Vercel](https://vercel.com) and click **"New Project"**.
3. Import `ai-lead-recovery-platform`.
4. Leave build settings as default:
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `public`
5. Click **"Deploy"**.

### Deploying via Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

---

## 7. API DOCUMENTATION

### 1. Inbound Webhook Intake
- **Endpoint:** `POST /api/v1/leads/intake`
- **Description:** Ingests form submissions, runs ICP scoring, and synthesizes sales follow-up draft.
- **Request Body:**
```json
{
  "contactName": "David Vance",
  "contactEmail": "david@cloudmatrix.io",
  "companyName": "CloudMatrix Technologies",
  "website": "https://cloudmatrix.io",
  "statedBudget": "$15,000 / month",
  "inquiryMessage": "Looking to scale paid media on Google and LinkedIn immediately.",
  "targetService": "Paid Media Scaling & CRO",
  "leadSource": "Website Contact Form"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "lead-mw055799-4fhl",
    "qualification": {
      "score": 85,
      "tier": "HOT_PRIORITY",
      "targetResponseWindowMinutes": 5
    },
    "technographics": {
      "detectedStack": ["Next.js / WordPress", "HubSpot CRM", "Google Tag Manager"]
    },
    "salesDraft": {
      "subject": "Re: CloudMatrix Technologies's Paid Media inquiry",
      "body": "Hi David,\n\nThank you for reaching out..."
    }
  }
}
```

### 2. List Processed Leads
- **Endpoint:** `GET /api/v1/leads`
- **Response:** Returns ring buffer of recent leads. Auto-seeds demo data if queue is empty.

### 3. Live Ethereum Oracle Rate
- **Endpoint:** `GET /api/v1/payment/rate`
- **Description:** Queries Chainlink on-chain contract for live ETH/USD price.
- **Response:**
```json
{
  "priceUsd": 2242.68,
  "timestamp": "2026-11-03T04:20:00.000Z",
  "source": "Chainlink Oracle (0x5f4e...8419)"
}
```

### 4. Verify Ethereum Transaction
- **Endpoint:** `POST /api/v1/payment/verify-tx`
- **Request Body:**
```json
{
  "txHash": "0x...",
  "agreedUsd": 500
}
```
- **Verification Checks:**
  - Transaction exists on Ethereum Mainnet.
  - Receipt status is `0x1` (successful).
  - Recipient matches `0x01791e7a273392859e529a69a6b8e6b76e48a3bb`.
  - Block confirmations >= 12.
  - Transferred value in ETH meets or exceeds agreed USD price.

---

## 8. DATABASE & PERSISTENCE ARCHITECTURE

By default, the platform maintains an in-memory queue of recent leads with automated demonstration seeding on serverless cold starts.

For multi-region persistent storage on Vercel:
1. Provision a free serverless PostgreSQL database (e.g. [Neon](https://neon.tech) or [Supabase](https://supabase.com)).
2. Add `DATABASE_URL=postgres://...` in Vercel Project Settings > Environment Variables.

---

## 9. LICENSE

Distributed under the MIT License. See `LICENSE` for details.
