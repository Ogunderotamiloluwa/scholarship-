import { handleGrantSubmission } from '../services/formService.js';

/**
 * Submit grant application form
 */
export async function submitGrantForm(req, res) {
  try {
    const formData = req.body;
    const files = req.files || [];

    console.log('\n============ GRANT FORM SUBMISSION ============');
    console.log('📨 Raw Request Body:', JSON.stringify(formData, null, 2));
    console.log('📎 Files Received:', files.length);

    // Validate required fields
    if (!formData.email || !formData.fullName) {
      console.log('❌ Validation Failed: Missing email or fullName');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: email and fullName'
      });
    }

    console.log('✅ Validation Passed');
    console.log('👤 Applicant Name:', formData.fullName);
    console.log('📧 Applicant Email:', formData.email);
    console.log('📍 Category:', formData.grantCategory);

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
    const result = await handleGrantSubmission(formData);
    
    console.log('✅ Grant submission completed');
    console.log('============================================\n');
    return res.status(200).json(result);
  } catch (error) {
    console.error('❌ Grant submission error:', error);
    console.log('============================================\n');
    return res.status(500).json({
      success: false,
      error: 'Failed to submit grant application',
      message: error.message
    });
  }
}

export default { submitGrantForm };
