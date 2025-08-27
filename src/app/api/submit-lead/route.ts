
//API Route Handlers for Next.js

export async function submitLead(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const leadProcessor = new LeadProcessor(
      process.env.GHL_API_KEY!,
      {
        apiKey: process.env.NEXT_PUBLIC_VAPI_API_KEY!,
        assistantId: process.env.VAPI_ASSISTANT_ID!
      }
    );

    const result = await leadProcessor.processLead(req.body);
    
    if (result.success) {
      res.status(200).json({ 
        success: true, 
        message: 'Lead processed successfully',
        contactId: result.contactId 
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: result.error 
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}

