/**
 * Backend API Configuration
 */

export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || 'http://localhost:5000',
  ENDPOINTS: {
    GRANT: '/api/forms/grant',
    SCHOLARSHIP: '/api/forms/scholarship',
    DONATION: '/api/forms/donation',
    HEALTH: '/api/health'
  }
};

export const EMAIL_CONFIG = {
  COMPANY_EMAIL: process.env.COMPANY_EMAIL,
  SENDER_NAME: 'Beacon Scholarship Portal',
  SENDER_EMAIL: 'noreply@beaconscholarship.com'
};

export const BREVO_CONFIG = {
  API_KEY: process.env.BREVO_API_KEY,
  API_URL: 'https://api.brevo.com/v3'
};

export default {
  API_CONFIG,
  EMAIL_CONFIG,
  BREVO_CONFIG
};
