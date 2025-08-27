interface GoHighLevelContact {
  companyName: string;
  role: string;
  industry: string;
  revenue: string;
  challenge: string;
  timeline: string;
  phone: string;
  email: string;
  source: string;
  tags: string[];
}

export async function submitToGoHighLevel(contactData: GoHighLevelContact) {
  try {
    const response = await fetch(`${process.env.GHL_WEBHOOK_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
      },
      body: JSON.stringify({
        locationId: process.env.GHL_LOCATION_ID,
        contact: {
          firstName: contactData.companyName,
          email: contactData.email,
          phone: contactData.phone,
          source: contactData.source,
          tags: contactData.tags,
          customFields: {
            company_name: contactData.companyName,
            role: contactData.role,
            industry: contactData.industry,
            revenue_range: contactData.revenue,
            primary_challenge: contactData.challenge,
            timeline: contactData.timeline,
            form_submitted_at: new Date().toISOString()
          }
        }
      })
    });

    if (!response.ok) {
      throw new Error(`GHL API error: ${response.status}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('GoHighLevel submission error:', error);
    throw error;
  }
}

export async function createGHLOpportunity(contactId: string, value: number) {
  try {
    const response = await fetch('https://rest.gohighlevel.com/v1/opportunities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
      },
      body: JSON.stringify({
        locationId: process.env.GHL_LOCATION_ID,
        contactId: contactId,
        name: 'Strategy Session - Transcenda',
        monetaryValue: value,
        pipelineId: 'your_pipeline_id', // Get this from GHL
        stageId: 'your_stage_id', // Get this from GHL
        status: 'open',
        source: 'Landing Page'
      })
    });

    return await response.json();
  } catch (error) {
    console.error('GHL opportunity creation error:', error);
    throw error;
  }
}
