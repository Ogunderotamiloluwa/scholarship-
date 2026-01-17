/**
 * State Persistence Utilities
 * Handles localStorage management for maintaining application state across page refreshes
 */

// App State
export interface AppStateData {
  currentView: string;
  navigationHistory: string[];
  selectedStoryId?: string;
  selectedGrantId?: string;
  selectedInternshipId?: string;
  selectedEventId?: string;
  selectedUniversityId?: string;
  applyStep: number;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    studentEmail: string;
    studentNumber: string;
    studentPhone: string;
    gpa: number;
    university: string;
    major: string;
    essay: string;
  };
  timestamp: number;
}

// Grant Tracking State
export interface GrantTrackingStateData {
  stage: string;
  isLoggedIn: boolean;
  hasPasskey: boolean;
  currentUserEmail?: string;
  currentGrant?: string;
  timestamp: number;
  sessionExpiry?: number;
}

// Application Tracker State
export interface ApplicationTrackerStateData {
  filterStatus: string;
  searchTerm: string;
  selectedApplicationId?: string;
  sortBy?: string;
  timestamp: number;
}

/**
 * Save app state to localStorage
 */
export const saveAppState = (state: Partial<AppStateData>) => {
  try {
    const existingState = getAppState();
    const newState = {
      ...existingState,
      ...state,
      timestamp: Date.now(),
    };
    localStorage.setItem('beaconAppState', JSON.stringify(newState));
    console.log('✅ App state saved to localStorage');
  } catch (error) {
    console.error('❌ Error saving app state:', error);
  }
};

/**
 * Get app state from localStorage
 */
export const getAppState = (): Partial<AppStateData> => {
  try {
    const state = localStorage.getItem('beaconAppState');
    if (state) {
      const parsedState = JSON.parse(state);
      // Check if state is expired (older than 7 days)
      if (parsedState.timestamp && Date.now() - parsedState.timestamp > 7 * 24 * 60 * 60 * 1000) {
        clearAppState();
        return {};
      }
      console.log('✅ App state retrieved from localStorage');
      return parsedState;
    }
  } catch (error) {
    console.error('❌ Error retrieving app state:', error);
  }
  return {};
};

/**
 * Clear app state from localStorage
 */
export const clearAppState = () => {
  try {
    localStorage.removeItem('beaconAppState');
    console.log('✅ App state cleared from localStorage');
  } catch (error) {
    console.error('❌ Error clearing app state:', error);
  }
};

/**
 * Save grant tracking state
 */
export const saveGrantTrackingState = (state: Partial<GrantTrackingStateData>) => {
  try {
    const existingState = getGrantTrackingState();
    const newState = {
      ...existingState,
      ...state,
      timestamp: Date.now(),
      sessionExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hour session
    };
    localStorage.setItem('beaconGrantTrackingState', JSON.stringify(newState));
    console.log('✅ Grant tracking state saved');
  } catch (error) {
    console.error('❌ Error saving grant tracking state:', error);
  }
};

/**
 * Get grant tracking state
 */
export const getGrantTrackingState = (): Partial<GrantTrackingStateData> => {
  try {
    const state = localStorage.getItem('beaconGrantTrackingState');
    if (state) {
      const parsedState = JSON.parse(state);
      // Check if session is expired
      if (parsedState.sessionExpiry && Date.now() > parsedState.sessionExpiry) {
        clearGrantTrackingState();
        return {};
      }
      console.log('✅ Grant tracking state retrieved');
      return parsedState;
    }
  } catch (error) {
    console.error('❌ Error retrieving grant tracking state:', error);
  }
  return {};
};

/**
 * Clear grant tracking state
 */
export const clearGrantTrackingState = () => {
  try {
    localStorage.removeItem('beaconGrantTrackingState');
    console.log('✅ Grant tracking state cleared');
  } catch (error) {
    console.error('❌ Error clearing grant tracking state:', error);
  }
};

/**
 * Save application tracker state
 */
export const saveApplicationTrackerState = (state: Partial<ApplicationTrackerStateData>) => {
  try {
    const existingState = getApplicationTrackerState();
    const newState = {
      ...existingState,
      ...state,
      timestamp: Date.now(),
    };
    localStorage.setItem('beaconApplicationTrackerState', JSON.stringify(newState));
    console.log('✅ Application tracker state saved');
  } catch (error) {
    console.error('❌ Error saving application tracker state:', error);
  }
};

/**
 * Get application tracker state
 */
export const getApplicationTrackerState = (): Partial<ApplicationTrackerStateData> => {
  try {
    const state = localStorage.getItem('beaconApplicationTrackerState');
    if (state) {
      const parsedState = JSON.parse(state);
      console.log('✅ Application tracker state retrieved');
      return parsedState;
    }
  } catch (error) {
    console.error('❌ Error retrieving application tracker state:', error);
  }
  return {};
};

/**
 * Clear application tracker state
 */
export const clearApplicationTrackerState = () => {
  try {
    localStorage.removeItem('beaconApplicationTrackerState');
    console.log('✅ Application tracker state cleared');
  } catch (error) {
    console.error('❌ Error clearing application tracker state:', error);
  }
};

/**
 * Save notification preferences
 */
export const saveNotificationPreferences = (prefs: {
  enableDeadlineAlerts: boolean;
  enableStatusUpdates: boolean;
  enableEmailNotifications: boolean;
}) => {
  try {
    localStorage.setItem('beaconNotificationPrefs', JSON.stringify(prefs));
    console.log('✅ Notification preferences saved');
  } catch (error) {
    console.error('❌ Error saving notification preferences:', error);
  }
};

/**
 * Get notification preferences
 */
export const getNotificationPreferences = () => {
  try {
    const prefs = localStorage.getItem('beaconNotificationPrefs');
    if (prefs) {
      return JSON.parse(prefs);
    }
  } catch (error) {
    console.error('❌ Error retrieving notification preferences:', error);
  }
  return {
    enableDeadlineAlerts: true,
    enableStatusUpdates: true,
    enableEmailNotifications: true,
  };
};

/**
 * Save application drafts
 */
export const saveApplicationDraft = (applicationId: string, data: any) => {
  try {
    const drafts = JSON.parse(localStorage.getItem('beaconApplicationDrafts') || '{}');
    drafts[applicationId] = {
      data,
      savedAt: Date.now(),
    };
    localStorage.setItem('beaconApplicationDrafts', JSON.stringify(drafts));
    console.log(`✅ Application draft saved for ${applicationId}`);
  } catch (error) {
    console.error('❌ Error saving application draft:', error);
  }
};

/**
 * Get application draft
 */
export const getApplicationDraft = (applicationId: string) => {
  try {
    const drafts = JSON.parse(localStorage.getItem('beaconApplicationDrafts') || '{}');
    return drafts[applicationId];
  } catch (error) {
    console.error('❌ Error retrieving application draft:', error);
  }
  return null;
};

/**
 * Clear all application drafts
 */
export const clearAllApplicationDrafts = () => {
  try {
    localStorage.removeItem('beaconApplicationDrafts');
    console.log('✅ All application drafts cleared');
  } catch (error) {
    console.error('❌ Error clearing application drafts:', error);
  }
};

/**
 * Get all beacon-related localStorage keys for debugging
 */
export const getAllBeaconStorageData = () => {
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('beacon'));
    const data: Record<string, any> = {};
    keys.forEach(key => {
      data[key] = JSON.parse(localStorage.getItem(key) || '{}');
    });
    return data;
  } catch (error) {
    console.error('❌ Error retrieving all beacon storage data:', error);
    return {};
  }
};

/**
 * Clear all beacon-related localStorage
 */
export const clearAllBeaconStorage = () => {
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('beacon'));
    keys.forEach(key => localStorage.removeItem(key));
    console.log(`✅ Cleared ${keys.length} beacon storage items`);
  } catch (error) {
    console.error('❌ Error clearing all beacon storage:', error);
  }
};
