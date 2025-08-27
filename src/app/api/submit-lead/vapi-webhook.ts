// Webhook handler for VAPI callbacks
export async function handleVAPIWebhook(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, call, transcript } = req.body;

    // Update GHL contact with call results
    if (type === 'call-ended' && call.customer?.number) {
      const ghl = new GoHighLevelAPI(process.env.GHL_API_KEY!);
      
      // Find contact by phone number and update with call results
      await ghl.sendWebhook(process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL!, {
        event: 'vapi_call_completed',
        phone: call.customer.number,
        duration: call.duration,
        transcript: transcript,
        status: call.status,
        timestamp: new Date().toISOString()
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('VAPI Webhook Error:', error);
    res.status(500).json({ success: false });
  }
}
