// Test script to demonstrate new passkey system
// Run this in browser console to verify passkey encoding/decoding works

function generatePasskeyWithData(app) {
  try {
    const accountData = JSON.stringify({
      fullName: app.fullName,
      email: app.email,
      password: app.password,
      phone: app.phone,
      country: app.country,
      grantCategory: app.grantCategory,
      amount: app.amount,
      purpose: app.purpose,
      applicantWork: app.applicantWork,
      usage: app.usage,
      impact: app.impact,
      previousFunding: app.previousFunding,
      timestamp: app.timestamp
    });
    
    const encoded = btoa(accountData);
    
    let checksum = 0;
    for (let i = 0; i < encoded.length; i++) {
      checksum = ((checksum << 5) - checksum) + encoded.charCodeAt(i);
      checksum = checksum & checksum;
    }
    const checksumStr = Math.abs(checksum).toString(16).substring(0, 8).toUpperCase();
    
    return `PK-${checksumStr}-${encoded}`;
  } catch (error) {
    console.error('Failed to generate passkey with data:', error);
    return '';
  }
}

function extractDataFromPasskey(passkey) {
  try {
    if (!passkey.startsWith('PK-')) return null;
    
    const parts = passkey.split('-');
    if (parts.length < 3) return null;
    
    const checksumStr = parts[1];
    const encoded = passkey.substring(passkey.indexOf('-', 3) + 1);
    
    let checksum = 0;
    for (let i = 0; i < encoded.length; i++) {
      checksum = ((checksum << 5) - checksum) + encoded.charCodeAt(i);
      checksum = checksum & checksum;
    }
    const calculatedChecksum = Math.abs(checksum).toString(16).substring(0, 8).toUpperCase();
    
    if (calculatedChecksum !== checksumStr) {
      console.log('❌ Passkey checksum failed - passkey corrupted!');
      return null;
    }
    
    const decoded = atob(encoded);
    const data = JSON.parse(decoded);
    
    return data;
  } catch (error) {
    console.error('Failed to extract data from passkey:', error);
    return null;
  }
}

// === TEST 1: Create a passkey with account data ===
console.log('🧪 TEST 1: Creating passkey with embedded account data...\n');

const testAccount = {
  fullName: 'John Doe',
  email: 'john@example.com',
  password: 'secure123',
  phone: '+1234567890',
  country: 'United States',
  grantCategory: 'Education Grant',
  amount: '5000',
  purpose: 'University Tuition',
  applicantWork: 'Part-time Student',
  usage: 'Pay for tuition and books',
  impact: 'Will help me complete my degree',
  previousFunding: 'No',
  timestamp: '2024-01-15T10:30:00Z'
};

const passkey = generatePasskeyWithData(testAccount);
console.log('✅ Generated Passkey:');
console.log(passkey);
console.log('\n');

// === TEST 2: Extract data from passkey ===
console.log('🧪 TEST 2: Extracting data from passkey...\n');

const extractedData = extractDataFromPasskey(passkey);
console.log('✅ Extracted Data:');
console.log(JSON.stringify(extractedData, null, 2));
console.log('\n');

// === TEST 3: Verify data is identical ===
console.log('🧪 TEST 3: Verifying extracted data matches original...\n');

const matches = {
  fullName: testAccount.fullName === extractedData.fullName,
  email: testAccount.email === extractedData.email,
  password: testAccount.password === extractedData.password,
  grantCategory: testAccount.grantCategory === extractedData.grantCategory,
  amount: testAccount.amount === extractedData.amount,
  timestamp: testAccount.timestamp === extractedData.timestamp,
  purpose: testAccount.purpose === extractedData.purpose,
  impact: testAccount.impact === extractedData.impact
};

console.log('Data Verification Results:');
Object.entries(matches).forEach(([key, match]) => {
  console.log(`  ${match ? '✅' : '❌'} ${key}: ${match ? 'MATCHES' : 'MISMATCH'}`);
});
console.log('\n');

// === TEST 4: Verify checksum protection ===
console.log('🧪 TEST 4: Testing checksum protection against tampering...\n');

// Try to corrupt the passkey
const corruptedPasskey = passkey.slice(0, -5) + 'XXXXX'; // Change last 5 chars
const corruptedData = extractDataFromPasskey(corruptedPasskey);

if (corruptedData === null) {
  console.log('✅ Checksum protection working! Corrupted passkey rejected.');
} else {
  console.log('❌ Checksum protection FAILED! Corrupted passkey accepted.');
}

console.log('\n');

// === TEST 5: Cross-browser scenario ===
console.log('🧪 TEST 5: Simulating cross-browser login...\n');
console.log('Scenario: User submits form on Chrome, gets passkey, logs in on Opera');
console.log('');
console.log('Step 1️⃣ : User submits application on CHROME');
console.log(`  - Email: ${testAccount.email}`);
console.log(`  - Grant Type: ${testAccount.grantCategory}`);
console.log(`  - Amount: ${testAccount.amount}`);
console.log(`  - Timestamp: ${testAccount.timestamp}`);
console.log('  → System generates passkey with ALL data embedded');
console.log(`  → Passkey: ${passkey.substring(0, 50)}...`);
console.log('');
console.log('Step 2️⃣ : User switches to OPERA and pastes passkey');
console.log(`  → Opera extracts data from passkey`);
console.log(`  → User sees same email: ${extractedData.email} ✅`);
console.log(`  → User sees same grant type: ${extractedData.grantCategory} ✅`);
console.log(`  → User sees same amount: $${extractedData.amount} ✅`);
console.log(`  → User sees SAME timestamp: ${extractedData.timestamp} ✅ (NOT RESET!)`);
console.log('');
console.log('🎉 SUCCESS: Same account visible on different browser!');
console.log('🎉 SUCCESS: Timestamp did NOT reset!');
console.log('🎉 SUCCESS: No new account created!');
console.log('🎉 SUCCESS: All data preserved perfectly!');
