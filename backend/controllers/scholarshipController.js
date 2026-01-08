import { handleScholarshipSubmission } from '../services/formService.js';

/**
 * Submit scholarship application form
 */
export async function submitScholarshipForm(req, res) {
  try {
    const formData = req.body;
    const files = req.files || [];

    console.log('\n============ SCHOLARSHIP FORM SUBMISSION ============');
    console.log('📨 Raw Request Body:', JSON.stringify(formData, null, 2));
    console.log('📎 Files Received:', files.length);

    // Validate required fields
    if (!formData.email || !formData.firstName || !formData.lastName) {
      console.log('❌ Validation Failed: Missing email, firstName, or lastName');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: email, firstName, lastName'
      });
    }

    console.log('✅ Validation Passed');
    console.log('👤 Student Name:', formData.firstName + ' ' + formData.lastName);
    console.log('📧 Student Email:', formData.email);
    console.log('🎓 University:', formData.university || 'N/A');
    console.log('📊 GPA:', formData.gpa || 'N/A');

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
    const result = await handleScholarshipSubmission(formData);
    
    console.log('✅ Scholarship submission completed');
    console.log('======================================================\n');
    return res.status(200).json(result);
  } catch (error) {
    console.error('❌ Scholarship submission error:', error);
    console.log('======================================================\n');
    return res.status(500).json({
      success: false,
      error: 'Failed to submit scholarship application',
      message: error.message
    });
  }
}

export default { submitScholarshipForm };
