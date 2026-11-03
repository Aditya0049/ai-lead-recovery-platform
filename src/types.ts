import { z } from 'zod';

export const InboundLeadPayloadSchema = z.object({
  contactName: z.string().min(1, 'Contact name is required'),
  contactEmail: z.string().email('Valid email is required'),
  companyName: z.string().min(1, 'Company name is required'),
  website: z.string().min(1, 'Website URL is required'),
  statedBudget: z.string().optional().default('Not specified'),
  inquiryMessage: z.string().min(1, 'Inquiry message is required'),
  targetService: z.string().optional().default('General Growth Inquiry'),
  leadSource: z.string().optional().default('Website Contact Form')
});

export type InboundLeadPayload = z.infer<typeof InboundLeadPayloadSchema>;

export interface EnrichedLeadResult {
  id: string;
  receivedAt: string;
  lead: InboundLeadPayload;
  qualification: {
    score: number; // 0 to 100
    tier: 'HOT_PRIORITY' | 'WARM_OPPORTUNITY' | 'NURTURE' | 'DISQUALIFIED';
    targetResponseWindowMinutes: number;
    budgetTier: string;
    identifiedBuyingSignals: string[];
  };
  technographics: {
    inferredIndustry: string;
    detectedStack: string[];
    digitalFootprintSummary: string;
  };
  salesDraft: {
    assignedRole: string;
    subjectLine: string;
    previewText: string;
    emailBody: string;
    meetingCallToAction: string;
  };
  processingDurationMs: number;
}
