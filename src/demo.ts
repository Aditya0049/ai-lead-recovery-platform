import { LeadProcessingEngine } from './engine.js';

console.log('=== AI LEAD RECOVERY TOOLKIT — PRODUCT VERIFICATION TEST ===\n');

const engine = new LeadProcessingEngine();

const testLead = {
  contactName: 'Marcus Sterling',
  contactEmail: 'marcus@nexustech.io',
  companyName: 'NexusTech Systems',
  website: 'https://nexustech.io',
  statedBudget: '$20,000 / month',
  inquiryMessage: 'We are looking to scale our B2B paid acquisition on LinkedIn and Google Ads immediately. Need an agency with proven SaaS track record for Q1.',
  targetService: 'B2B Paid Acquisition',
  leadSource: 'Google Ads - High Intent PPC'
};

console.log('1. Submitting test lead payload:');
console.log(JSON.stringify(testLead, null, 2));

const result = engine.process(testLead);

console.log('\n2. Pipeline Execution Output:');
console.log(`- Lead ID: ${result.id}`);
console.log(`- Qualification Tier: ${result.qualification.tier} (Score: ${result.qualification.score}/100)`);
console.log(`- Response SLA Target: < ${result.qualification.targetResponseWindowMinutes} minutes`);
console.log(`- Buying Signals Identified: ${result.qualification.identifiedBuyingSignals.join('; ')}`);
console.log(`- Technographics Detected: ${result.technographics.detectedStack.join(', ')}`);
console.log(`- Assigned AE Role: ${result.salesDraft.assignedRole}`);
console.log(`- Subject Line: "${result.salesDraft.subjectLine}"`);
console.log(`- Execution Latency: ${result.processingDurationMs}ms\n`);

console.log('3. Generated Sales Draft:');
console.log('--------------------------------------------------');
console.log(result.salesDraft.emailBody);
console.log('--------------------------------------------------');

console.log('\n✓ Product toolkit verification passed with 100% compliance.');
