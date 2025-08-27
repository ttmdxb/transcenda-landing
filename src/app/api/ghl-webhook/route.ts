import { NextRequest, NextResponse } from 'next/server';
import { submitToGoHighLevel } from '@/lib/ghl';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { companyName, role, industry, revenue, challenge, timeline, phone, email } = body;
    
    if (!companyName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Submit to GoHighLevel
    const ghlResponse = await submitToGoHighLevel({
      companyName,
      role,
      industry,
      revenue,
      challenge,
      timeline,
      phone,
      email,
      source: 'Landing Page Form',
      tags: ['Hot Lead', 'Strategy Session Request']
    });

    // Log successful submission
    console.log('Lead submitted to GHL:', {
      company: companyName,
      email,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      ghlContactId: ghlResponse.contact?.id
    });

  } catch (error) {
    console.error('GHL webhook error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to submit lead',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
