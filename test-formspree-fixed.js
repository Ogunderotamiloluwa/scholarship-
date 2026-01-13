/**
 * Test the fixed Formspree submission with proper formatting
 * This matches the working curl command that was tested
 */

async function testFormspreeFixed() {
  console.log('\n🧪 TESTING FIXED FORMSPREE SUBMISSION\n');
  console.log('='.repeat(60));

  try {
    console.log('📤 Sending test data using proper FormData format...\n');

    // Create FormData object - this is what the Formspree service does
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('name', 'Test User');
    formData.append('message', 'Test from fixed formspree implementation');
    formData.append('formType', 'Test Form');
    formData.append('timestamp', new Date().toISOString());
    
    // Add honeypot field (security)
    formData.append('_gotcha', '');

    const response = await fetch('https://formspree.io/f/xjggvoyv', {
      method: 'POST',
      body: formData
      // Don't set Content-Type - let fetch handle it for FormData
    });

    console.log('📨 Got response from Formspree');
    console.log('Status:', response.status);
    console.log('OK:', response.ok);

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType?.includes('application/json')) {
      data = await response.json();
      console.log('Response (JSON):', JSON.stringify(data, null, 2));
    } else {
      data = await response.text();
      console.log('Response (Text):', data.substring(0, 200) + '...');
    }

    if (response.ok) {
      console.log('\n✅ SUCCESS! Message sent properly to Formspree');
      console.log('📧 Check your email for the submission');
      console.log('⚠️  If it lands in spam, check Formspree dashboard for settings');
    } else {
      console.log('\n⚠️  Response OK is false');
      console.log('Status code:', response.status);
    }

  } catch (error) {
    console.log('❌ ERROR:', error.message);
    console.log('Stack:', error.stack);
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

testFormspreeFixed();
