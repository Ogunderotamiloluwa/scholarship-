import axios from 'axios';

const BREVO_API_URL = 'https://api.brevo.com/v3';

// Create axios client with dynamic headers that read env vars at runtime
function getBrevoClient() {
  const apiKey = process.env.BREVO_API_KEY;
  
  if (!apiKey) {
    console.error('❌ BREVO_API_KEY environment variable is NOT set!');
    console.error('❌ Emails will NOT be sent. Add BREVO_API_KEY to .env file');
  }
  
  return axios.create({
    baseURL: BREVO_API_URL,
    headers: {
      'api-key': apiKey || '',
      'Content-Type': 'application/json'
    }
  });
}

/**
 * Send email via Brevo
 * @param {string} recipientEmail - Email address of recipient
 * @param {string} subject - Email subject
 * @param {string} htmlContent - HTML content of email
 * @param {string} textContent - Plain text content of email
 */
export async function sendEmail(recipientEmail, subject, htmlContent, textContent) {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    
    if (!apiKey) {
      throw new Error('BREVO_API_KEY is not set in environment variables');
    }

    const brevoClient = getBrevoClient();

    console.log(`\n📧 Sending email to: ${recipientEmail}`);
    console.log(`📋 Subject: ${subject}`);
    console.log(`✉️  Via: Brevo API`);
    console.log(`👤 From: ${process.env.COMPANY_EMAIL}`);
    
    const response = await brevoClient.post('/smtp/email', {
      to: [{ email: recipientEmail }],
      sender: {
        name: 'Beacon Scholarship Portal',
        email: process.env.COMPANY_EMAIL
      },
      subject: subject,
      htmlContent: htmlContent,
      textContent: textContent
    });

    console.log(`✅ Email sent successfully to ${recipientEmail}`);
    console.log(`📨 Message ID: ${response.data.messageId}`);
    return { success: true, messageId: response.data.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error.response?.data || error.message);
    console.error('❌ Full error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

/**
 * Generate HTML email template for form submissions
 */
export function generateEmailTemplate(formType, formData) {
  const timestamp = new Date().toLocaleString();
  
  console.log('📧 Generating email template for:', formType);
  console.log('📋 Form data keys:', Object.keys(formData));
  console.log('📋 Form data:', JSON.stringify(formData, null, 2));
  
  const formTypeLabel = {
    'grant': '📋 GRANT APPLICATION FORM',
    'scholarship': '🎓 SCHOLARSHIP APPLICATION FORM',
    'donation': '💝 DONATION FORM'
  }[formType.toLowerCase()] || 'FORM SUBMISSION';

  let dataHtml = '<table style="width: 100%; border-collapse: collapse; margin-top: 20px;">';
  
  for (const [key, value] of Object.entries(formData)) {
    if (key !== 'files' && value !== null && value !== undefined && value !== '') {
      const displayKey = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
      
      let displayValue = value;
      if (typeof value === 'object') {
        displayValue = JSON.stringify(value, null, 2);
      }

      dataHtml += `
        <tr style="border-bottom: 1px solid #e0e0e0;">
          <td style="padding: 12px; font-weight: bold; color: #333; width: 30%;">${displayKey}</td>
          <td style="padding: 12px; color: #666;">${displayValue}</td>
        </tr>
      `;
    }
  }

  // Add files information if available
  if (formData.files && Array.isArray(formData.files) && formData.files.length > 0) {
    dataHtml += `
      <tr style="border-bottom: 1px solid #e0e0e0; background-color: #f5f5f5;">
        <td style="padding: 12px; font-weight: bold; color: #333; width: 30%;">Uploaded Files</td>
        <td style="padding: 12px; color: #666;">
          <ul style="margin: 0; padding-left: 20px;">
            ${formData.files.map(file => `
              <li>${file.originalName} (${file.sizeInMB} MB)</li>
            `).join('')}
          </ul>
        </td>
      </tr>
    `;
  }
  
  dataHtml += '</table>';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1e40af; color: white; padding: 20px; border-radius: 5px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 20px; background-color: #f9fafb; margin-top: 20px; border-radius: 5px; }
        .timestamp { color: #999; font-size: 12px; margin-top: 20px; border-top: 1px solid #e0e0e0; padding-top: 10px; }
        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${formTypeLabel}</h1>
          <p>New form submission received</p>
        </div>
        <div class="content">
          <p>A new <strong>${formType.toLowerCase()}</strong> form has been submitted through the Beacon Scholarship Portal.</p>
          ${dataHtml}
        </div>
        <div class="timestamp">
          <p><strong>Submitted at:</strong> ${timestamp}</p>
          <p><strong>Form Type:</strong> ${formType.toUpperCase()}</p>
        </div>
        <div class="footer">
          <p>This is an automated message from Beacon Scholarship Portal</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
${formTypeLabel}

New form submission received

${Object.entries(formData)
  .map(([key, value]) => {
    if (key !== 'files' && value !== null && value !== undefined && value !== '') {
      const displayKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
      return `${displayKey}: ${value}`;
    }
  })
  .filter(Boolean)
  .join('\n')}

${formData.files && Array.isArray(formData.files) && formData.files.length > 0 ? `
Uploaded Files:
${formData.files.map(file => `  - ${file.originalName} (${file.sizeInMB} MB)`).join('\n')}
` : ''}

Submitted at: ${timestamp}
Form Type: ${formType.toUpperCase()}

This is an automated message from Beacon Scholarship Portal
  `;

  return { htmlContent, textContent };
}

export default { sendEmail, generateEmailTemplate };
