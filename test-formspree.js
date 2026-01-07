import axios from 'axios';
import FormData from 'form-data';

async function testFormspree() {
  console.log('\n🧪 TESTING FORMSPREE API\n');
  console.log('=' .repeat(60));

  try {
    // Create form data
    const form = new FormData();
    form.append('email', 'test@example.com');
    form.append('name', 'Test User');
    form.append('message', 'This is a test message from the test-formspree.js file');
    form.append('formType', 'Test Form');

    console.log('📤 Sending test data to Formspree...');
    console.log('Form ID: mvzgeadj');
    console.log('Data being sent:');
    console.log('  - email: test@example.com');
    console.log('  - name: Test User');
    console.log('  - message: This is a test message from the test-formspree.js file');
    console.log('  - formType: Test Form');
    console.log('\n');

    // Send to Formspree
    const response = await axios.post(
      'https://formspree.io/f/mvzgeadj',
      form,
      {
        headers: form.getHeaders(),
        timeout: 10000
      }
    );

    console.log('✅ SUCCESS! Formspree accepted the submission');
    console.log('Status Code:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    console.log('\n' + '='.repeat(60));
    console.log('✅ YOUR FORMSPREE FORM IS WORKING!');
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.log('❌ ERROR! Something went wrong:\n');
    
    if (error.response) {
      console.log('Status Code:', error.response.status);
      console.log('Error Message:', error.response.statusText);
      console.log('Response Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.log('No response received from Formspree');
      console.log('Request Error:', error.message);
    } else {
      console.log('Error:', error.message);
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('❌ FORMSPREE TEST FAILED');
    console.log('='.repeat(60) + '\n');
    process.exit(1);
  }
}

testFormspree();
