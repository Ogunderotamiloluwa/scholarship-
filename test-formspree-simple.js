async function testFormspree() {
  console.log('\n🧪 TESTING FORMSPREE WITH FETCH\n');
  console.log('=' .repeat(60));

  try {
    console.log('📤 Sending test data to Formspree xjggvoyv...\n');

    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('name', 'Test User');
    formData.append('message', 'Test from test-formspree-simple.js');

    const response = await fetch('https://formspree.io/f/xjggvoyv', {
      method: 'POST',
      body: formData,
    });

    console.log('📨 Got response from Formspree');
    console.log('Status:', response.status);
    console.log('OK:', response.ok);

    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('\n✅ SUCCESS! Message sent to Formspree');
    } else {
      console.log('\n❌ Formspree rejected the submission');
      console.log('Details:', data);
    }

  } catch (error) {
    console.log('❌ ERROR:', error.message);
    console.log('Stack:', error.stack);
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

testFormspree();
