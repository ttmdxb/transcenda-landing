import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'start-call':
        // Initialize VAPI call
        const callResponse = await fetch('https://api.vapi.ai/call', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            assistant: {
              id: process.env.VAPI_ASSISTANT_ID
            },
            phoneNumber: data.phoneNumber,
            customer: {
              number: data.customerPhone,
              name: data.customerName
            }
          })
        });

        const callData = await callResponse.json();
        return NextResponse.json(callData);

      case 'webhook':
        // Handle VAPI webhooks
        console.log('VAPI webhook received:', body);
        
        // Process webhook data (call status, transcript, etc.)
        if (data.type === 'call-ended') {
          // Log call completion, extract insights, etc.
          console.log('Call ended:', {
            duration: data.duration,
            transcript: data.transcript,
            sentiment: data.sentiment
          });
        }

        return NextResponse.json({ received: true });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('VAPI API error:', error);
    return NextResponse.json(
      { error: 'VAPI integration failed' },
      { status: 500 }
    );
  }
}
