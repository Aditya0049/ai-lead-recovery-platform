import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { InboundLeadPayloadSchema, EnrichedLeadResult } from './types.js';
import { LeadProcessingEngine } from './engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3080;

app.use(cors());
app.use(express.json());

// In-memory persistent queue of recent processed leads (ring buffer of 50)
const processedLeads: EnrichedLeadResult[] = [];
const engine = new LeadProcessingEngine();

// Serve public dashboard UI
const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'OPERATIONAL',
    service: 'AI Lead Recovery & Sales Automation Toolkit',
    version: '1.0.0',
    uptimeSeconds: Math.floor(process.uptime()),
    leadsProcessedCount: processedLeads.length
  });
});

// Intake Webhook Endpoint
app.post('/api/v1/leads/intake', (req, res) => {
  try {
    const parsed = InboundLeadPayloadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parsed.error.issues
      });
    }

    const result = engine.process(parsed.data);
    processedLeads.unshift(result);
    if (processedLeads.length > 50) processedLeads.pop();

    res.status(201).json({
      success: true,
      message: 'Lead processed, enriched, and sales draft synthesized.',
      data: result
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Helper to auto-seed demonstration leads on cold-start
function seedDefaultDemoLeads() {
  const sample1 = engine.process({
    contactName: 'David Vance',
    contactEmail: 'david.vance@cloudmatrix.io',
    companyName: 'CloudMatrix Technologies',
    website: 'https://cloudmatrix.io',
    statedBudget: '$15,000 / month',
    inquiryMessage: 'We are spending $30k/mo on Google & LinkedIn Ads but our conversion rate dropped by 35% after our recent redesign. Need an agency to audit and optimize our funnel ASAP for Q1 pipeline.',
    targetService: 'Paid Media Scaling & CRO',
    leadSource: 'Google Ads - B2B SaaS Performance Search'
  });

  const sample2 = engine.process({
    contactName: 'Elena Rostova',
    contactEmail: 'elena@fintechrelay.com',
    companyName: 'Relay Fintech',
    website: 'https://fintechrelay.com',
    statedBudget: '$8,000 / month',
    inquiryMessage: 'Interested in technical SEO retainer and content strategy for our Series A financial compliance platform.',
    targetService: 'SEO & Content Retainer',
    leadSource: 'Organic Search - Enterprise SEO Guide'
  });

  processedLeads.unshift(sample1, sample2);
  return [sample1, sample2];
}

// List recent processed leads
app.get('/api/v1/leads', (req, res) => {
  if (processedLeads.length === 0) {
    seedDefaultDemoLeads();
  }
  res.json({
    success: true,
    count: processedLeads.length,
    leads: processedLeads
  });
});

// Seed sample demo data for interactive preview
app.post('/api/v1/leads/demo-seed', (req, res) => {
  const seeded = seedDefaultDemoLeads();
  res.json({
    success: true,
    message: 'Sample demo leads seeded successfully',
    leads: seeded
  });
});

// Live Oracle Rate Endpoint (Chainlink ETH/USD on Ethereum Mainnet)
app.get('/api/v1/payment/rate', async (req, res) => {
  try {
    const rpcRes = await fetch('https://ethereum-rpc.publicnode.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [{ to: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', data: '0xfeaf968c' }, 'latest'],
        id: 1
      })
    });
    const rpcData = await rpcRes.json() as any;
    const hex = rpcData.result;
    const answerHex = hex.slice(66, 130);
    const priceUsd = Number(BigInt('0x' + answerHex)) / 1e8;

    res.json({
      priceUsd,
      timestamp: new Date().toISOString(),
      source: 'Chainlink Oracle (0x5f4e...8419)'
    });
  } catch (err: any) {
    res.json({
      priceUsd: 2242.68,
      timestamp: new Date().toISOString(),
      source: 'Chainlink Oracle Baseline Fallback'
    });
  }
});

// Read-Only Ethereum Transaction Verifier
app.post('/api/v1/payment/verify-tx', async (req, res) => {
  const { txHash, agreedUsd } = req.body;
  const receivingAddress = '0x01791e7a273392859e529a69a6b8e6b76e48a3bb';
  const targetUsd = Number(agreedUsd) || 500;

  if (!txHash || typeof txHash !== 'string' || txHash.length !== 66) {
    return res.status(400).json({ verified: false, error: 'Invalid 66-character transaction hash' });
  }

  try {
    const rpc = 'https://ethereum-rpc.publicnode.com';

    // 1. Fetch transaction
    const txRes = await fetch(rpc, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_getTransactionByHash', params: [txHash], id: 1 })
    });
    const txData = await txRes.json() as any;
    const tx = txData.result;
    if (!tx) {
      return res.json({ verified: false, error: 'Transaction not found on Ethereum Mainnet' });
    }

    // 2. Fetch receipt
    const rcRes = await fetch(rpc, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_getTransactionReceipt', params: [txHash], id: 2 })
    });
    const rcData = await rcRes.json() as any;
    const rc = rcData.result;
    if (!rc || rc.status !== '0x1') {
      return res.json({ verified: false, error: 'Transaction unconfirmed or failed (status != 0x1)' });
    }

    // 3. Check recipient
    if ((tx.to || '').toLowerCase() !== receivingAddress) {
      return res.json({ verified: false, error: `Recipient mismatch. Expected ${receivingAddress}, got ${tx.to}` });
    }

    // 4. Calculate transferred value
    const valueWei = BigInt(tx.value || '0x0');
    const valueEth = Number(valueWei) / 1e18;
    const valueUsdApprox = Math.round(valueEth * 2242.68 * 100) / 100;

    // 5. Block confirmations
    const blkRes = await fetch(rpc, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_blockNumber', params: [], id: 3 })
    });
    const blkData = await blkRes.json() as any;
    const currentBlock = parseInt(blkData.result, 16);
    const txBlock = parseInt(rc.blockNumber, 16);
    const confirmations = currentBlock - txBlock;

    if (confirmations < 12) {
      return res.json({
        verified: false,
        error: `Insufficient confirmations (${confirmations}/12 required). Please wait ~3 minutes.`
      });
    }

    if (valueUsdApprox < targetUsd * 0.95) {
      return res.json({
        verified: false,
        error: `Transferred value ($${valueUsdApprox}) is below the required scope amount ($${targetUsd}).`
      });
    }

    res.json({
      verified: true,
      txHash,
      receiverAddress: receivingAddress,
      senderAddress: tx.from,
      valueEth,
      valueUsdApprox,
      blockNumber: txBlock,
      confirmations
    });
  } catch (err: any) {
    res.status(500).json({ verified: false, error: err.message });
  }
});

// Start server standalone (disabled when loaded inside Vercel serverless environment)
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`[AI-LEAD-RECOVERY] Toolkit API and Dashboard live on http://localhost:${port}`);
  });
}

export default app;
export { app, engine };
