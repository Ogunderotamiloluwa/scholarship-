import { sendEmail, generateEmailTemplate } from './emailService.js';

const COMPANY_EMAIL = process.env.COMPANY_EMAIL;

/**
 * Handle grant form submission
 */
export async function handleGrantSubmission(formData) {
  try {
    console.log('📤 Processing grant application...');
    console.log('📋 FORM TYPE: GRANT APPLICATION');
    console.log('📧 Will be sent to:', process.env.COMPANY_EMAIL);
    console.log('👤 Applicant:', formData.fullName || 'N/A');
    console.log('📍 Category:', formData.grantCategory || 'N/A');
    console.log('💰 Amount:', formData.amount || 'N/A');
    console.log('📝 Purpose:', formData.purpose || 'N/A');
    console.log('📝 Usage:', formData.usage || 'N/A');
    
    const { htmlContent, textContent } = generateEmailTemplate('grant', formData);
    
    const subject = `🎯 NEW GRANT APPLICATION - ${formData.fullName || 'Applicant'} [${formData.grantCategory || 'General'}]`;
    
    console.log('📧 Email Subject:', subject);
    console.log('✉️  Initiating Brevo API call...');
    await sendEmail(process.env.COMPANY_EMAIL, subject, htmlContent, textContent);
    console.log('✅ Email sent successfully');
    
    return {
      success: true,
      message: 'Grant application submitted successfully! We will review it and get back to you soon.'
    };
  } catch (error) {
    console.error('❌ Error processing grant submission:', error.message);
    throw error;
  }
}

/**
 * Handle scholarship form submission
 */
export async function handleScholarshipSubmission(formData) {
  try {
    console.log('📤 Processing scholarship application...');
    console.log('📋 FORM TYPE: SCHOLARSHIP APPLICATION');
    console.log('📧 Will be sent to:', process.env.COMPANY_EMAIL);
    console.log('👤 Student:', `${formData.firstName || 'N/A'} ${formData.lastName || 'N/A'}`);
    console.log('🎓 University:', formData.university || 'N/A');
    console.log('📊 GPA:', formData.gpa || 'N/A');
    console.log('📝 Field of Study:', formData.fieldOfStudy || 'N/A');
    
    const { htmlContent, textContent } = generateEmailTemplate('scholarship', formData);
    
    const subject = `🎓 NEW SCHOLARSHIP APPLICATION - ${formData.firstName || 'Applicant'} ${formData.lastName || ''}`;
    
    console.log('📧 Email Subject:', subject);
    console.log('✉️  Initiating Brevo API call...');
    await sendEmail(process.env.COMPANY_EMAIL, subject, htmlContent, textContent);
    console.log('✅ Email sent successfully');
    
    return {
      success: true,
      message: 'Scholarship application submitted successfully! We will review it and notify you of our decision.'
    };
  } catch (error) {
    console.error('❌ Error processing scholarship submission:', error.message);
    throw error;
  }
}

/**
 * Handle donation form submission
 */
export async function handleDonationSubmission(formData) {
  try {
    console.log('📤 Processing donation...');
    console.log('📋 FORM TYPE: DONATION');
    console.log('📧 Will be sent to:', process.env.COMPANY_EMAIL);
    console.log('👤 Donor:', formData.donorName || 'N/A');
    console.log('💰 Donation Amount:', formData.donationAmount || formData.amount || 'N/A');
    console.log('📝 Donation Type:', formData.donationType || 'N/A');
    console.log('📧 Donor Email:', formData.email || formData.donorEmail || 'N/A');
    
    const { htmlContent, textContent } = generateEmailTemplate('donation', formData);
    
    const subject = `💝 NEW DONATION RECEIVED - Thank You ${formData.donorName || 'Donor'}!`;
    
    console.log('📧 Email Subject:', subject);
    console.log('✉️  Initiating Brevo API call...');
    await sendEmail(process.env.COMPANY_EMAIL, subject, htmlContent, textContent);
    console.log('✅ Email sent successfully');
    
    return {
      success: true,
      message: 'Thank you for your generous donation! We appreciate your support.'
    };
  } catch (error) {
    console.error('❌ Error processing donation submission:', error.message);
    throw error;
  }
}

export default { 
  handleGrantSubmission, 
  handleScholarshipSubmission, 
  handleDonationSubmission 
};
