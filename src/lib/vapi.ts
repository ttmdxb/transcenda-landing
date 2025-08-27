export class VAPIClient {
  private publicKey: string;
  private privateKey: string;

  constructor() {
    this.publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!;
    this.privateKey = process.env.VAPI_PRIVATE_KEY!;
  }

  async startCall(phoneNumber: string, customerData: any) {
    try {
      const response = await fetch('/api/vapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'start-call',
          data: {
            phoneNumber,
            customerPhone: customerData.phone,
            customerName: customerData.companyName
          }
        })
      });

      return await response.json();
    } catch (error) {
      console.error('VAPI call start error:', error);
      throw error;
    }
  }

  async getCallStatus(callId: string) {
    try {
      const response = await fetch(`https://api.vapi.ai/call/${callId}`, {
        headers: {
          'Authorization': `Bearer ${this.privateKey}`
        }
      });

      return await response.json();
    } catch (error) {
      console.error('VAPI call status error:', error);
      throw error;
    }
  }
}
