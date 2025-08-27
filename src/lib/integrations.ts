
// GoHighLevel Integration
export interface GHLContact {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  companyName?: string;
  source: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

export class GoHighLevelAPI {
  private apiKey: string;
  private baseUrl: string = 'https://rest.gohighlevel.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createContact(contact: GHLContact): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/contacts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: contact.firstName,
          lastName: contact.lastName || '',
          email: contact.email,
          phone: contact.phone,
          companyName: contact.companyName || '',
          source: contact.source,
          tags: contact.tags || ['Transcenda Lead'],
          customFields: {
            'lead_source': 'Landing Page',
            'qualification_stage': 'New',
            ...contact.customFields
          }
        })
      });

      if (!response.ok) {
        throw new Error(`GHL API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating GHL contact:', error);
      throw error;
    }
  }

  async addToWorkflow(contactId: string, workflowId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/contacts/${contactId}/workflow/${workflowId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`GHL Workflow Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding to workflow:', error);
      throw error;
    }
  }

  async sendWebhook(webhookUrl: string, data: any): Promise<any> {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: 'Transcenda Landing Page'
        })
      });

      if (!response.ok) {
        throw new Error(`Webhook Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending webhook:', error);
      throw error;
    }
  }
}
// VAPI.ai Integration
export interface VAPIConfig {
  apiKey: string;
  assistantId: string;
}

export class VAPIAPI {
  private apiKey: string;
  private assistantId: string;
  private baseUrl: string = 'https://api.vapi.ai';

  constructor(config: VAPIConfig) {
    this.apiKey = config.apiKey;
    this.assistantId = config.assistantId;
  }

  async initiateCall(phoneNumber: string, customerData?: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/call`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumberId: phoneNumber,
          assistantId: this.assistantId,
          customer: {
            number: phoneNumber,
            ...customerData
          }
        })
      });

      if (!response.ok) {
        throw new Error(`VAPI Call Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error initiating VAPI call:', error);
      throw error;
    }
  }

  async getCallStatus(callId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/call/${callId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        }
      });

      if (!response.ok) {
        throw new Error(`VAPI Status Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting call status:', error);
      throw error;
    }
  }

  async updateAssistant(updates: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/assistant/${this.assistantId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error(`VAPI Update Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating assistant:', error);
      throw error;
    }
  }
}

// Form Submission Handler
export interface LeadData {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  companyName?: string;
  industry?: string;
  monthlyRevenue?: string;
  primaryChallenge?: string;
  timeline?: string;
  role?: string;
  source: string;
  roiCalculatorData?: {
    monthlyLeads: number;
    avgDealValue: number;
    closeRate: number;
    responseTime: number;
    calculatedResults: any;
  };
}

export class LeadProcessor {
  private ghl: GoHighLevelAPI;
  private vapi: VAPIAPI;

  constructor(ghlApiKey: string, vapiConfig: VAPIConfig) {
    this.ghl = new GoHighLevelAPI(ghlApiKey);
    this.vapi = new VAPIAPI(vapiConfig);
  }

  async processLead(leadData: LeadData): Promise<{ success: boolean; contactId?: string; error?: string }> {
    try {
      // 1. Create contact in GoHighLevel
      const ghlContact: GHLContact = {
        firstName: leadData.firstName,
        lastName: leadData.lastName,
        email: leadData.email,
        phone: leadData.phone,
        companyName: leadData.companyName,
        source: leadData.source,
        tags: this.generateTags(leadData),
        customFields: {
          industry: leadData.industry,
          monthly_revenue: leadData.monthlyRevenue,
          primary_challenge: leadData.primaryChallenge,
          timeline: leadData.timeline,
          role: leadData.role,
          roi_data: leadData.roiCalculatorData ? JSON.stringify(leadData.roiCalculatorData) : null,
          qualification_score: this.calculateQualificationScore(leadData)
        }
      };

      const contact = await this.ghl.createContact(ghlContact);

      // 2. Add to appropriate workflow based on qualification
      const workflowId = this.determineWorkflow(leadData);
      await this.ghl.addToWorkflow(contact.contact.id, workflowId);

      // 3. Schedule VAPI follow-up call if high-value lead
      if (this.isHighValueLead(leadData)) {
        setTimeout(async () => {
          await this.vapi.initiateCall(leadData.phone, {
            name: leadData.firstName,
            company: leadData.companyName,
            challenge: leadData.primaryChallenge
          });
        }, 300000); // 5 minute delay
      }

      return { success: true, contactId: contact.contact.id };

    } catch (error) {
      console.error('Lead processing error:', error);
      return { success: false, error: error.message };
    }
  }

  private generateTags(leadData: LeadData): string[] {
    const tags = ['Transcenda Lead', 'Landing Page'];
    
    if (leadData.industry) tags.push(`Industry: ${leadData.industry}`);
    if (leadData.monthlyRevenue) tags.push(`Revenue: ${leadData.monthlyRevenue}`);
    if (leadData.timeline === 'Immediately (losing money daily)') tags.push('Hot Lead');
    if (leadData.roiCalculatorData) tags.push('Used ROI Calculator');

    return tags;
  }

  private calculateQualificationScore(leadData: LeadData): number {
    let score = 0;

    // Revenue qualification
    if (leadData.monthlyRevenue === 'Above 5M') score += 30;
    else if (leadData.monthlyRevenue === '1M - 5M') score += 25;
    else if (leadData.monthlyRevenue === '500K - 1M') score += 20;
    else if (leadData.monthlyRevenue === '100K - 500K') score += 15;

    // Timeline urgency
    if (leadData.timeline === 'Immediately (losing money daily)') score += 25;
    else if (leadData.timeline === 'Within 30 days') score += 20;
    else if (leadData.timeline === 'Within 90 days') score += 10;

    // Role authority
    if (leadData.role === 'CEO/Founder') score += 20;
    else if (leadData.role?.includes('Director')) score += 15;

    // ROI calculator usage
    if (leadData.roiCalculatorData) score += 15;

    // Pain point severity
    if (leadData.primaryChallenge?.includes('losing money') || 
        leadData.primaryChallenge?.includes('competitors')) score += 10;

    return Math.min(score, 100);
  }

  private determineWorkflow(leadData: LeadData): string {
    const score = this.calculateQualificationScore(leadData);
    
    if (score >= 70) return 'hot-lead-workflow-id';
    if (score >= 40) return 'warm-lead-workflow-id';
    return 'cold-lead-workflow-id';
  }

  private isHighValueLead(leadData: LeadData): boolean {
    return this.calculateQualificationScore(leadData) >= 60;
  }
}
