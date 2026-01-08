import { handleDonationSubmission } from '../services/formService.js';

/**
 * Submit donation form
 */
export async function submitDonationForm(req, res) {
  try {
    const formData = req.body;
    const files = req.files || [];

    console.log('\n============ DONATION FORM SUBMISSION ============');
    console.log('📨 Raw Request Body:', JSON.stringify(formData, null, 2));
    console.log('📎 Files Received:', files.length);

    // Validate required fields
    if (!formData.email || !formData.donorName) {
      console.log('❌ Validation Failed: Missing email or donorName');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: email and donorName'
      });
    }

    console.log('✅ Validation Passed');
    console.log('👤 Donor Name:', formData.donorName);
    console.log('📧 Donor Email:', formData.email);
    console.log('💰 Donation Amount:', formData.donationAmount || 'N/A');
    console.log('📝 Donation Type:', formData.donationType || 'N/A');

    // Attach file information to formData
    if (files.length > 0) {
      formData.files = files.map(file => ({
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        sizeInMB: (file.size / (1024 * 1024)).toFixed(2)
      }));
      
      console.log(`📎 Received ${files.length} files:`);
      files.forEach((file, index) => {
        console.log(`  ${index + 1}. ${file.originalname} (${(file.size / 1024).toFixed(2)}KB)`);
      });
    }

    console.log('📤 Sending to email service...');
    const result = await handleDonationSubmission(formData);
    
    console.log('✅ Donation submission completed');
    console.log('================================================\n');
    return res.status(200).json(result);
  } catch (error) {
    console.error('❌ Donation submission error:', error);
    console.log('================================================\n');
    return res.status(500).json({
      success: false,
      error: 'Failed to process donation',
      message: error.message
    });
  }
}

export default { submitDonationForm };
