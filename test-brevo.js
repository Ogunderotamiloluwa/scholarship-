import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({path: './backend/.env'});

console.log('🧪 Testing Brevo API Configuration');
console.log('BREVO_API_KEY set:', !!process.env.BREVO_API_KEY);
console.log('COMPANY_EMAIL:', process.env.COMPANY_EMAIL);

// Test API key
if (!process.env.BREVO_API_KEY) {
  console.error('❌ BREVO_API_KEY is not set!');
  process.exit(1);
}

if (!process.env.COMPANY_EMAIL) {
  console.error('❌ COMPANY_EMAIL is not set!');
  process.exit(1);
}

// Test Brevo API
try {
  console.log('\n📧 Attempting to send test email...');
  
  const response = await axios.post(
    'https://api.brevo.com/v3/smtp/email',
    {
      to: [{ email: process.env.COMPANY_EMAIL }],
      sender: {
        name: 'Beacon Test',
        email: process.env.COMPANY_EMAIL
      },
      subject: '🧪 Test Email from Beacon Backend',
      textContent: 'This is a test email to verify Brevo API is working correctly.\n\nIf you receive this email, the Brevo API is properly configured.'
    },
    {
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    }
  );
  
  console.log('✅ SUCCESS! Test email sent to:', process.env.COMPANY_EMAIL);
  console.log('Message ID:', response.data.messageId);
  console.log('\n📝 Check your email for the test message.');
  process.exit(0);
} catch (error) {
  console.error('\n❌ FAILED! Brevo API error:');
  console.error('Status:', error.response?.status);
  console.error('Error:', error.response?.data || error.message);
  process.exit(1);
}
