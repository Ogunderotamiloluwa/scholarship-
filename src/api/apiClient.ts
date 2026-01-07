/// <reference types="vite/client" />

/**
 * API Client for Backend Communication
 * This file handles all API calls to the backend server
 */

const API_BASE_URL: string = (import.meta.env.VITE_API_URL as string | undefined) || 'https://beacon-backend-2udx.onrender.com/api';

interface ApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
  [key: string]: any;
}

/**
 * Make API request to backend
 */
async function apiRequest(endpoint: string, data: Record<string, any> | FormData): Promise<ApiResponse> {
  try {
    const isFormData = data instanceof FormData;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: isFormData ? {} : {
        'Content-Type': 'application/json',
      },
      body: isFormData ? data : JSON.stringify(data),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Submit Grant Application Form
 */
export async function submitGrantApplication(formData: Record<string, any> | FormData): Promise<ApiResponse> {
  return apiRequest('/forms/grant', formData);
}

/**
 * Submit Scholarship Application Form
 */
export async function submitScholarshipApplication(formData: Record<string, any> | FormData): Promise<ApiResponse> {
  return apiRequest('/forms/scholarship', formData);
}

/**
 * Submit Donation Form
 */
export async function submitDonation(formData: Record<string, any> | FormData): Promise<ApiResponse> {
  return apiRequest('/forms/donation', formData);
}

/**
 * Check if backend is healthy
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

export default {
  submitGrantApplication,
  submitScholarshipApplication,
  submitDonation,
  checkBackendHealth
};
