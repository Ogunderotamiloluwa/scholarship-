/**
 * Formspree Service - Handles all form submissions to Formspree
 * Properly formats data to avoid spam filters and ensure delivery
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvzgeadj';

interface FormData {
  [key: string]: string | number | boolean | File | File[];
}

interface SubmissionOptions {
  subject?: string;
  replyTo?: string;
}

/**
 * Create proper FormData object for Formspree submission
 * Includes all necessary fields for proper email delivery
 */
export function createFormspreeData(
  data: FormData,
  options?: SubmissionOptions
): FormData {
  const formDataToSend: FormData = {};

  // Add all form fields
  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return;
    }
    formDataToSend[key] = value;
  });

  // Add Formspree special fields
  if (options?.subject) {
    formDataToSend['_subject'] = options.subject;
  }

  if (options?.replyTo) {
    formDataToSend['_replyto'] = options.replyTo;
  }

  // Honeypot field to prevent spam
  formDataToSend['_gotcha'] = '';

  return formDataToSend;
}

/**
 * Submit form data to Formspree with proper formatting
 * Uses fetch with proper headers to ensure email deliverability
 */
export async function submitToFormspree(
  data: FormData,
  options?: SubmissionOptions
): Promise<{ success: boolean; message: string; details?: any }> {
  try {
    // Validate email field exists
    if (!data.email || typeof data.email !== 'string') {
      return {
        success: false,
        message: 'Email field is required for form submission'
      };
    }

    // Create FormData object for multipart/form-data submission
    // This is more reliable than JSON for Formspree
    const formDataToSend = new FormData();

    // Add all form fields
    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return;
      }

      if (value instanceof File) {
        formDataToSend.append(key, value);
      } else if (Array.isArray(value)) {
        // Handle file arrays
        value.forEach((item, index) => {
          if (item instanceof File) {
            formDataToSend.append(`${key}[${index}]`, item);
          } else {
            formDataToSend.append(`${key}[${index}]`, String(item));
          }
        });
      } else {
        formDataToSend.append(key, String(value));
      }
    });

    // Add subject if provided (Formspree special field)
    if (options?.subject) {
      formDataToSend.append('_subject', options.subject);
    }

    // Add reply-to email if different from sender
    if (options?.replyTo) {
      formDataToSend.append('_replyto', options.replyTo);
    }

    // Add honeypot field to prevent spam (empty should stay empty)
    formDataToSend.append('_gotcha', '');

    // Submit to Formspree
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: formDataToSend,
      // Don't set Content-Type header - fetch will set it with boundary for FormData
    });

    // Check response
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Formspree submission failed:', response.status, errorData);
      return {
        success: false,
        message: `Submission failed with status ${response.status}`,
        details: errorData
      };
    }

    // Try to parse response
    let responseData: any;
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    // Success response
    return {
      success: true,
      message: 'Form submitted successfully! Check your email for confirmation.',
      details: responseData
    };
  } catch (error) {
    console.error('Formspree submission error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      details: error
    };
  }
}

/**
 * Format form data for scholarship applications
 */
export function formatScholarshipData(formData: any): FormData {
  return {
    formType: 'Scholarship Application',
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    email: formData.email || '',
    phone: formData.phone || '',
    university: formData.university || '',
    gpa: formData.gpa || '',
    major: formData.major || '',
    essay: formData.essay || '',
    timestamp: new Date().toISOString()
  };
}

/**
 * Format form data for donation forms
 */
export function formatDonationData(formData: any): FormData {
  return {
    formType: 'Donation',
    donorName: formData.donorName || '',
    email: formData.donorEmail || formData.email || '',
    amount: String(formData.amount || ''),
    donationType: formData.donationType || 'one-time',
    timestamp: new Date().toISOString()
  };
}

/**
 * Format form data for grant applications
 */
export function formatGrantApplicationData(formData: any, files?: { [key: string]: File }): FormData {
  const data: FormData = {
    formType: 'Grant Application',
    fullName: formData.fullName || '',
    email: formData.email || '',
    phone: formData.phone || '',
    country: formData.country || '',
    grantCategory: formData.grantCategory || '',
    purpose: formData.purpose || '',
    amount: formData.amount || '',
    usage: formData.usage || '',
    impact: formData.impact || '',
    previousFunding: formData.previousFunding || 'No',
    timestamp: new Date().toISOString()
  };

  // Add files if provided
  if (files) {
    Object.entries(files).forEach(([docName, file]) => {
      if (file) {
        data[`file_${docName}`] = file;
      }
    });
  }

  return data;
}
