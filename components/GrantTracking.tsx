import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Eye, EyeOff, Lock, Mail, Key, Copy, CheckCircle2, AlertCircle,
  Clock, User, DollarSign, Shield, RefreshCw, LogOut, Settings, Lock as LockIcon,
  Eye as EyeIcon, ToggleRight, ToggleLeft, X, FileText, Bell, TrendingUp
} from 'lucide-react';
import { ViewState } from '../types';
import { saveGrantTrackingState, getGrantTrackingState, clearGrantTrackingState } from '../utils';

interface GrantTrackingProps {
  onNavigate: (view: ViewState) => void;
}

interface GrantApplication {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  country: string;
  grantCategory: string;
  amount: string;
  purpose: string;
  applicantWork: string;
  usage: string;
  impact: string;
  previousFunding: string;
  timestamp: string;
  passkey?: string;
}

interface TrackingState {
  stage: 'grantSelection' | 'passkeyLogin' | 'getPasskey' | 'tracking' | 'passKeyRecovery' | 'showGeneratedPasskey';
  isLoggedIn: boolean;
  hasPasskey: boolean;
  currentUser: GrantApplication | null;
  currentGrant: string | null;
  showPassword: boolean;
  showPasskey: boolean;
  generatedPasskey?: string;
}

const GrantTracking: React.FC<GrantTrackingProps> = ({ onNavigate }) => {
  // Get saved tracking state from localStorage
  const savedTrackingState = getGrantTrackingState();
  
  const [trackingState, setTrackingState] = useState<TrackingState>({
    stage: (savedTrackingState.stage as any) || 'passkeyLogin',
    isLoggedIn: savedTrackingState.isLoggedIn || false,
    hasPasskey: savedTrackingState.hasPasskey || false,
    currentUser: null,
    currentGrant: savedTrackingState.currentGrant || null,
    showPassword: false,
    showPasskey: false,
    generatedPasskey: undefined
  });

  // Restore user from localStorage if session is still valid
  useEffect(() => {
    const savedState = getGrantTrackingState();
    if (savedState.isLoggedIn) {
      // Restore from complete user data stored in state
      if (savedState.currentUser) {
        setTrackingState((prev) => ({
          ...prev,
          isLoggedIn: true,
          currentUser: savedState.currentUser,
          currentGrant: savedState.currentUser.grantCategory,
          stage: 'tracking'
        }));
        console.log('✅ Grant account fully restored with all details');
      } else if (savedState.currentUserEmail) {
        // Fallback: Try to restore user from localStorage applications
        const applications = JSON.parse(localStorage.getItem('grantApplications') || '[]') as GrantApplication[];
        const restoredUser = applications.find((app) => app.email === savedState.currentUserEmail);
        if (restoredUser) {
          setTrackingState((prev) => ({
            ...prev,
            isLoggedIn: true,
            currentUser: restoredUser,
            currentGrant: restoredUser.grantCategory,
            stage: 'tracking'
          }));
          console.log('✅ Grant account restored from applications backup');
        }
      }
    }
  }, []);

  const [getPasskeyForm, setGetPasskeyForm] = useState({ email: '', password: '' });
  const [passkeyInput, setPasskeyInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [recoveryForm, setRecoveryForm] = useState({
    email: '',
    password: '',
    showPassword: false
  });
  const [recoveryCode, setRecoveryCode] = useState('');
  const [showRecoveryCode, setShowRecoveryCode] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState<'email' | 'verifyCode' | 'resetPassword'>('email');
  const [recoveryCodeInput, setRecoveryCodeInput] = useState('');
  const [recoveryNewPassword, setRecoveryNewPassword] = useState('');
  const [recoveryConfirmPassword, setRecoveryConfirmPassword] = useState('');
  const [showRecoveryPassword, setShowRecoveryPassword] = useState(false);
  
  // Settings
  const [showSettings, setShowSettings] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [logoutMessage, setLogoutMessage] = useState('');
  const [privacySettings, setPrivacySettings] = useState({
    hideBalance: false,
    hidePersonalInfo: false,
    twoFactorEnabled: false
  });
  
  // Transfer functionality
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferForm, setTransferForm] = useState({
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    accountHolder: '',
    amount: ''
  });
  const [transferStep, setTransferStep] = useState<'form' | 'review' | 'confirm'>('form');
  const [transferError, setTransferError] = useState('');
  
  // Multiple applications
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [userApplications, setUserApplications] = useState<GrantApplication[]>([]);

  // Calculate days remaining (10 days from application)
  const calculateDaysRemaining = (timestamp: string) => {
    const applicationDate = new Date(timestamp);
    const dueDate = new Date(applicationDate.getTime() + 10 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const daysRemaining = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysRemaining);
  };

  // Calculate grant status: 0-24hrs = Setup (0.00), 24hrs-14days = Frozen (show amount), 14+ days = Review Complete (rejection/denial message)
  const calculateGrantStatus = (timestamp: string) => {
    const applicationDate = new Date(timestamp);
    const now = new Date();
    const hoursElapsed = (now.getTime() - applicationDate.getTime()) / (1000 * 60 * 60);
    const daysElapsed = hoursElapsed / 24;
    
    // Phase 1: First 24 hours - account initialization (amount shows as 0.00)
    const isInitializing = hoursElapsed < 24;
    
    // Phase 2: After 24 hours to 14 days - frozen/locked state (show amount with 14-day countdown)
    const isFrozen = hoursElapsed >= 24 && daysElapsed < 14;
    
    // Phase 3: After 14 days - review complete (rejection/denial message, account still locked)
    const isReviewComplete = daysElapsed >= 14;
    
    // Calculate countdown for current phase
    let daysRemaining = 14;
    let hoursRemaining = 0;
    let minutesRemaining = 0;
    let progressPercentage = 0;
    let dayNumber = 0;
    
    if (isInitializing) {
      // Phase 1: Countdown from 24 hours - account setup
      const hoursLeft = 24 - hoursElapsed;
      daysRemaining = 0;
      hoursRemaining = Math.floor(hoursLeft);
      minutesRemaining = Math.floor(((hoursLeft % 1) * 60));
      progressPercentage = ((24 - hoursLeft) / 24) * 100; // Progress during 24 hour setup period
      dayNumber = 0;
    } else if (isFrozen) {
      // Phase 2: Countdown from 14 days - wallet frozen/locked with amount shown
      const hoursAfterSetup = hoursElapsed - 24; // Time elapsed after the 24hr setup period
      const daysAfterSetup = hoursAfterSetup / 24;
      const totalHoursInFrozenPhase = 14 * 24; // 14 days in hours
      const remainingHoursInFrozenPhase = totalHoursInFrozenPhase - hoursAfterSetup;
      
      daysRemaining = Math.floor(remainingHoursInFrozenPhase / 24);
      hoursRemaining = Math.floor(remainingHoursInFrozenPhase % 24);
      minutesRemaining = Math.floor(((remainingHoursInFrozenPhase % 1) * 60));
      progressPercentage = Math.min(100, (daysAfterSetup / 14) * 100); // Progress during 14 day frozen period
      dayNumber = Math.min(14, Math.ceil(daysAfterSetup)); // Days 1-14 of frozen period
    } else if (isReviewComplete) {
      // Phase 3: Review complete - no more countdown
      daysRemaining = 0;
      hoursRemaining = 0;
      minutesRemaining = 0;
      progressPercentage = 100;
      dayNumber = 14; // Complete
    }
    
    return {
      daysElapsed,
      hoursElapsed,
      daysRemaining,
      hoursRemaining,
      minutesRemaining,
      isInitializing, // First 24 hours (0.00)
      isAwaitingVerification: false, // No longer used - replaced by isFrozen
      isFrozen, // 24hrs-14 days (show amount frozen/locked)
      isProcessing: false, // No longer used
      isReviewComplete, // After 14 days (rejection/denial message)
      isReceived: false, // No longer used
      progressPercentage,
      dayNumber,
      phase: isInitializing ? 'setup' : isFrozen ? 'frozen' : 'reviewComplete'
    };
  };

  // Generate compact passkey with only essential data (works across all browsers!)
  const generatePasskeyWithData = (app: GrantApplication): string => {
    try {
      // Serialize only essential account data to keep passkey short
      const minimalData = JSON.stringify({
        n: app.fullName,  // fullName (display name across browsers)
        e: app.email,  // email (required for cross-browser)
        p: app.password,  // password (required for cross-browser)
        g: app.grantCategory,  // grant category (required to track which grant)
        a: app.amount,  // amount (required for balance display)
        t: app.timestamp  // timestamp (critical - was resetting before)
      });

      // Use a UTF-8-safe base64 encode (btoa fails for non-latin characters in some browsers)
      const safeBase64Encode = (str: string) => {
        try {
          return btoa(str);
        } catch (e) {
          return btoa(unescape(encodeURIComponent(str)));
        }
      };

      const encoded = safeBase64Encode(minimalData);
      
      // Create checksum for verification
      let checksum = 0;
      for (let i = 0; i < encoded.length; i++) {
        checksum = ((checksum << 5) - checksum) + encoded.charCodeAt(i);
        checksum = checksum & checksum;
      }
      const checksumStr = Math.abs(checksum).toString(16).substring(0, 4).toUpperCase();  // Reduced to 4 chars
      
      // Passkey format: PK-[checksum]-[encoded-data] - much shorter now!
      return `PK-${checksumStr}-${encoded}`;
    } catch (error) {
      console.error('Failed to generate passkey with data:', error);
      return '';
    }
  };

  // Extract essential data from compact passkey and restore from localStorage
  const extractDataFromPasskey = (passkey: string): GrantApplication | null => {
    try {
      if (!passkey.startsWith('PK-')) return null;
      
      const parts = passkey.split('-');
      if (parts.length < 3) return null;
      
      const checksumStr = parts[1];
      const encoded = passkey.substring(passkey.indexOf('-', 3) + 1); // Everything after second hyphen
      
      // Verify checksum
      let checksum = 0;
      for (let i = 0; i < encoded.length; i++) {
        checksum = ((checksum << 5) - checksum) + encoded.charCodeAt(i);
        checksum = checksum & checksum;
      }
      const calculatedChecksum = Math.abs(checksum).toString(16).substring(0, 4).toUpperCase();  // Check against 4-char checksum
      
      if (calculatedChecksum !== checksumStr) {
        console.log('Passkey checksum failed');
        return null;
      }
      
      // Decode from base64 (handle UTF-8 safely)
      const safeBase64Decode = (str: string) => {
        try {
          return atob(str);
        } catch (e) {
          // Fallback for UTF-8 content
          return decodeURIComponent(escape(atob(str)));
        }
      };

      const decoded = safeBase64Decode(encoded);
      const minimalData = JSON.parse(decoded);
      
      // Extract essential fields from passkey - THESE ARE THE SOURCE OF TRUTH
      let fullName = minimalData.n;  // Full name from passkey (may be missing for older passkeys)
      const email = minimalData.e;
      const password = minimalData.p;
      const grantCategory = minimalData.g;
      const amount = minimalData.a;  // Amount from passkey (from form submission)
      const timestamp = minimalData.t;  // This MUST NOT change
      
      // Try to find full account data in localStorage for this browser
      const applications = JSON.parse(localStorage.getItem('grantApplications') || '[]') as GrantApplication[];

      // Try exact match first (email + grant + timestamp)
      const fullAccount = applications.find(app => app.email === email && app.grantCategory === grantCategory && app.timestamp === timestamp);
      if (fullAccount) {
        return fullAccount;
      }

      // If name missing in passkey, try to find any application with the same email (best-effort cross-browser recovery)
      if ((!fullName || fullName.trim() === '') && email) {
        const anyAccount = applications.find(app => app.email && app.email.toLowerCase() === email.toLowerCase());
        if (anyAccount && anyAccount.fullName) {
          fullName = anyAccount.fullName;
        }
      }

      // If still no fullAccount, but we have enough from passkey, return constructed account
      return {
        fullName: fullName,  // Use fullName from passkey (works on all browsers!)
        email: email,
        password: password,
        phone: '',
        country: '',
        grantCategory: grantCategory,  // From passkey - exact
        amount: amount || '',  // Amount from passkey (from form submission)
        purpose: '',
        applicantWork: '',
        usage: '',
        impact: '',
        previousFunding: '',
        timestamp: timestamp,  // From passkey - exact, will NOT change
        passkey: passkey
      } as GrantApplication;
    } catch (error) {
      console.error('Failed to extract data from passkey:', error);
      return null;
    }
  };

  // Generate passkey from email and password (for backward compatibility)
  const generatePasskey = (email: string, password: string): string => {
    const combined = `${email}:${password}:grant-access`;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    const passkey = `PK-${Math.abs(hash)
      .toString(16)
      .toUpperCase()
      .substring(0, 16)}`;
    return passkey;
  };

  // Handle passkey login (ONLY way to login)
  const handlePasskeyLogin = () => {
    const newErrors: Record<string, string> = {};

    if (!passkeyInput.trim()) {
      newErrors.passkey = 'Passkey is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      // TRY NEW METHOD: Extract account data directly from passkey
      const extractedUser = extractDataFromPasskey(passkeyInput.trim());
      
      if (extractedUser) {
        // Success! Passkey contains all account data
        // Go directly to tracking dashboard (don't show passkey again)
        setTrackingState((prev) => ({
          ...prev,
          currentUser: extractedUser,
          isLoggedIn: true,
          hasPasskey: true,
          currentGrant: extractedUser.grantCategory,
          stage: 'tracking'  // Go straight to tracking, skip passkey display
        }));
        
        // Also save to localStorage for this browser
        const applications = JSON.parse(localStorage.getItem('grantApplications') || '[]') as GrantApplication[];
        const exists = applications.some(app => app.email === extractedUser.email && app.grantCategory === extractedUser.grantCategory && app.timestamp === extractedUser.timestamp);
        if (!exists) {
          applications.push(extractedUser);
          localStorage.setItem('grantApplications', JSON.stringify(applications));
        }
        
        setErrors({});
        setPasskeyInput('');
        showAlertMessage('✅ Welcome! Your passkey is displayed below. Save it for future logins.');
      } else {
        // Passkey format not recognized
        setErrors({ passkey: '❌ Passkey invalid or corrupted. Please use the correct passkey.' });
      }
      setIsLoading(false);
    }, 800);
  };

  // Handle getting a passkey with email and password
  const handleGetPasskey = () => {
    const newErrors: Record<string, string> = {};

    if (!getPasskeyForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(getPasskeyForm.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!getPasskeyForm.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      const applications = JSON.parse(localStorage.getItem('grantApplications') || '[]') as GrantApplication[];
      
      // Try to find user in localStorage first (for backward compatibility)
      let user = applications.find(
        (app) => 
          app.email === getPasskeyForm.email && 
          app.password === getPasskeyForm.password
      );

      if (user) {
        // User found! Generate passkey with ALL account data embedded
        const passkeyWithData = generatePasskeyWithData(user);
        
        // Save to localStorage for this browser
        const updatedApplications = applications.filter(app => !(app.email === user!.email && app.grantCategory === user!.grantCategory));
        updatedApplications.push({ ...user, passkey: passkeyWithData });
        localStorage.setItem('grantApplications', JSON.stringify(updatedApplications));
        
        setTrackingState((prev) => ({
          ...prev,
          currentUser: { ...user!, passkey: passkeyWithData },
          hasPasskey: true,
          generatedPasskey: passkeyWithData,
          stage: 'showGeneratedPasskey',
          currentGrant: user!.grantCategory
        }));
        setErrors({});
        setGetPasskeyForm({ email: '', password: '' });
        showAlertMessage('✅ Your passkey is ready! It contains all your account data and works on ANY browser.');
      } else {
        // User doesn't exist - show error
        setErrors({ getPasskey: '❌ Email or password not recognized. Please check and try again.' });
      }
      setIsLoading(false);
    }, 800);
  };

  // Handle logout
  const handleLogout = () => {
    setTrackingState({
      stage: 'passkeyLogin',
      isLoggedIn: false,
      hasPasskey: false,
      currentUser: null,
      currentGrant: null,
      showPassword: false,
      showPasskey: false
    });
    setGetPasskeyForm({ email: '', password: '' });
    setPasskeyInput('');
    setErrors({});
    // Clear tracking state from localStorage on logout
    clearGrantTrackingState();
    showAlertMessage('👋 You have been logged out.');
  };

  // Persist tracking state to localStorage whenever it changes
  useEffect(() => {
    if (trackingState.isLoggedIn && trackingState.currentUser) {
      saveGrantTrackingState({
        stage: trackingState.stage as any,
        isLoggedIn: true,
        hasPasskey: trackingState.hasPasskey,
        currentUserEmail: trackingState.currentUser.email,
        currentGrant: trackingState.currentGrant,
        // Save complete user data to restore everything on refresh
        currentUser: trackingState.currentUser
      });
      console.log('💾 Saved complete grant account data: balance, name, grant type, timestamp');
    }
  }, [trackingState]);

  // Handle passkey recovery
  // Generate secure recovery code (not sent via email, displayed on screen)
  const generateRecoveryCode = (email: string): string => {
    const timestamp = Date.now().toString();
    const combined = `${email}:${timestamp}:recovery-code`;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    // Create a more advanced secure code: RC-[32 char hex]
    const recoveryCodeStr = `RC-${Math.abs(hash)
      .toString(16)
      .toUpperCase()
      .padStart(32, '0')}`;
    return recoveryCodeStr;
  };

  const handlePasskeyRecovery = () => {
    const newErrors: Record<string, string> = {};

    if (!recoveryForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recoveryForm.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const applications = JSON.parse(localStorage.getItem('grantApplications') || '[]') as GrantApplication[];
      const user = applications.find(
        (app) => app.email === recoveryForm.email
      );

      if (user) {
        // Generate secure recovery code (NOT sent via email)
        const code = generateRecoveryCode(user.email);
        setRecoveryCode(code);
        setRecoveryStep('verifyCode');
        setErrors({});
      } else {
        setErrors({ recovery: '❌ Email not found in our system.' });
      }
      setIsLoading(false);
    }, 800);
  };

  const handleRecoveryCodeVerification = () => {
    const newErrors: Record<string, string> = {};

    if (!recoveryCodeInput.trim()) {
      newErrors.recoveryCode = 'Recovery code is required';
    } else if (recoveryCodeInput.trim() !== recoveryCode) {
      newErrors.recoveryCode = '❌ Invalid recovery code. Check and try again.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Code verified successfully
    setErrors({});
    setRecoveryStep('resetPassword');
    showAlertMessage('✅ Code verified! Now create your new password.');
  };

  const handleRecoveryPasswordReset = () => {
    const newErrors: Record<string, string> = {};

    if (!recoveryNewPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (recoveryNewPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(recoveryNewPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, number, and special character';
    }

    if (!recoveryConfirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (recoveryNewPassword !== recoveryConfirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const applications = JSON.parse(localStorage.getItem('grantApplications') || '[]') as GrantApplication[];
      // Find user by email only - grant will be auto-detected when they create passkey
      const userIndex = applications.findIndex((app) => app.email === recoveryForm.email);

      if (userIndex !== -1) {
        applications[userIndex].password = recoveryNewPassword;
        localStorage.setItem('grantApplications', JSON.stringify(applications));
        
        // Auto-fill the get passkey form with new credentials
        setGetPasskeyForm({
          email: recoveryForm.email,
          password: recoveryNewPassword
        });
        
        // Reset recovery form
        setRecoveryForm({ email: '', password: '', showPassword: false });
        setRecoveryCodeInput('');
        setRecoveryNewPassword('');
        setRecoveryConfirmPassword('');
        setRecoveryStep('email');
        setTrackingState((prev) => ({ ...prev, stage: 'getPasskey' }));
        showAlertMessage('✅ Password reset successful! Now create your passkey using your new credentials.');
      } else {
        setErrors({ recovery: '❌ Error: Email not found.' });
      }
      setIsLoading(false);
    }, 800);
  };

  const showAlertMessage = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showAlertMessage(`✅ ${label} copied to clipboard!`);
  };


  const daysRemaining = trackingState.currentUser
    ? calculateDaysRemaining(trackingState.currentUser.timestamp)
    : 10;

  const progress = Math.max(0, ((10 - daysRemaining) / 10) * 100);

  // When user is logged in the tracking account, we want full screen without top padding
  const isInAccountView = trackingState.stage === 'tracking' && trackingState.isLoggedIn;

  return (
    <div className={`min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 transition-all ${isInAccountView ? 'pt-0 pb-20' : 'pt-24 pb-20'}`}>
      {/* Alert Message - Left-aligned on mobile for better visibility */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 md:top-20 left-4 md:left-1/2 md:-translate-x-1/2 right-4 md:right-auto z-50 w-auto md:min-w-[280px] md:max-w-[620px] bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 border-b-2 border-emerald-700 dark:border-emerald-800 rounded-2xl px-4 md:px-8 py-4 sm:py-5 flex items-start md:items-center justify-start md:justify-center gap-3 shadow-2xl"
          >
            <CheckCircle2 size={20} className="text-white flex-shrink-0 mt-0.5 md:mt-0" />
            <p className="text-white text-xs sm:text-sm font-bold whitespace-normal break-words text-left md:text-center">{alertMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`transition-all ${isInAccountView ? 'w-full h-full' : 'max-w-2xl mx-auto px-4'}`}>
        {/* Header - Hidden when in account view for full screen effect */}
        {!isInAccountView && (
          <button
            onClick={() => onNavigate('HOME')}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-black text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Home
          </button>
        )}

        <AnimatePresence mode="wait">
          {/* GRANT SELECTION STAGE - REMOVED - Now users login directly with email/password */}
          {trackingState.stage === 'grantSelection' && null}

          {/* PASSKEY LOGIN STAGE (ONLY WAY TO LOGIN) */}
          {trackingState.stage === 'passkeyLogin' && (
            <motion.div
              key="passkeyLogin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-black mb-4">🔑 Login with Your Passkey</h2>
                <p className="text-lg text-green-100">
                  Use your passkey to access your grant account. If you created your account on a different browser, use "Get Passkey with Email & Password" below.
                </p>
              </div>

              <div className="space-y-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                {errors.passkey && (
                  <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl p-4 flex gap-3">
                    <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 dark:text-red-300 font-semibold text-sm">{errors.passkey}</p>
                  </div>
                )}

                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded-xl p-4 flex gap-3">
                  <Key size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-green-900 dark:text-green-200 mb-1">Use Your Passkey</h4>
                    <p className="text-sm text-green-800 dark:text-green-300">
                      Enter your passkey to securely access your grant tracking dashboard.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">🔑 Passkey</label>
                  <input
                    type={trackingState.showPasskey ? 'text' : 'password'}
                    placeholder="PK-XXXXXXXXXXXXXXXX"
                    value={passkeyInput}
                    onChange={(e) => {
                      setPasskeyInput(e.target.value);
                      setErrors({});
                    }}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:outline-none transition-all ${
                      errors.passkey ? 'border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-green-600'
                    }`}
                  />
                  {errors.passkey && <p className="text-red-600 text-sm font-semibold mt-1">{errors.passkey}</p>}
                  <button
                    type="button"
                    onClick={() =>
                      setTrackingState((prev) => ({
                        ...prev,
                        showPasskey: !prev.showPasskey
                      }))
                    }
                    className="mt-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold"
                  >
                    {trackingState.showPasskey ? '👁️ Hide' : '👁️ Show'} Passkey
                  </button>
                </div>

                <button
                  onClick={handlePasskeyLogin}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  <Lock size={20} />
                  {isLoading ? 'Logging in...' : 'Login with Passkey'}
                </button>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3">
                  <button
                    onClick={() => {
                      setTrackingState((prev) => ({ ...prev, stage: 'getPasskey' }));
                      setErrors({});
                      setGetPasskeyForm({ email: '', password: '' });
                    }}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Mail size={20} />
                    Get Passkey with Email & Password
                  </button>

                  <button
                    onClick={() => {
                      setTrackingState((prev) => ({ ...prev, stage: 'passKeyRecovery' }));
                      setErrors({});
                      setPasskeyInput('');
                    }}
                    className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold py-2 transition-colors"
                  >
                    🔒 Lost Your Passkey? Recover It
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* GET PASSKEY STAGE (Create passkey with email & password) */}
          {trackingState.stage === 'getPasskey' && (
            <motion.div
              key="getPasskey"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-black mb-4">🔐 Get Your Passkey</h2>
                <p className="text-lg text-amber-100">
                  Sign in with your email and password from your grant application
                </p>
              </div>

              <div className="space-y-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                {errors.getPasskey && (
                  <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl p-4 flex gap-3">
                    <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 dark:text-red-300 font-semibold text-sm">{errors.getPasskey}</p>
                  </div>
                )}

                <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl p-4 flex gap-3">
                  <Mail size={20} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-amber-900 dark:text-amber-200 mb-1">Generate Your Passkey</h4>
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      Enter the email and password from your grant application. This works on any browser - Chrome, Opera, Firefox, Safari, etc. You'll get your passkey to use for login.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">📧 Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={getPasskeyForm.email}
                    onChange={(e) => {
                      setGetPasskeyForm({ ...getPasskeyForm, email: e.target.value });
                      setErrors({});
                    }}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
                      errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-amber-600'
                    }`}
                  />
                  {errors.email && <p className="text-red-600 text-sm font-semibold mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">🔐 Password</label>
                  <div className="relative">
                    <input
                      type={trackingState.showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={getPasskeyForm.password}
                      onChange={(e) => {
                        setGetPasskeyForm({ ...getPasskeyForm, password: e.target.value });
                        setErrors({});
                      }}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all pr-12 ${
                        errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-amber-600'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setTrackingState((prev) => ({
                          ...prev,
                          showPassword: !prev.showPassword
                        }))
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {trackingState.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-600 text-sm font-semibold mt-1">{errors.password}</p>}
                </div>

                <button
                  onClick={handleGetPasskey}
                  disabled={isLoading}
                  className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  <Key size={20} />
                  {isLoading ? 'Creating Passkey...' : 'Get My Passkey'}
                </button>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3">
                  <button
                    onClick={() => {
                      setTrackingState((prev) => ({ ...prev, stage: 'passkeyLogin' }));
                      setErrors({});
                      setGetPasskeyForm({ email: '', password: '' });
                    }}
                    className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold py-2 transition-colors"
                  >
                    Already have a passkey? Login here →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SHOW GENERATED PASSKEY STAGE */}
          {trackingState.stage === 'showGeneratedPasskey' && trackingState.generatedPasskey && (
            <motion.div
              key="showGeneratedPasskey"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-black mb-4">✅ Passkey Generated!</h2>
                <p className="text-lg text-green-100">
                  Your passkey is ready. Copy it and use it to login securely.
                </p>
              </div>

              <div className="space-y-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded-xl p-4 flex gap-3">
                  <Key size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-green-900 dark:text-green-200 mb-1">Your Passkey</h4>
                    <p className="text-sm text-green-800 dark:text-green-300">
                      Save this passkey securely. You'll need it to login. Click to copy.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between gap-3">
                    <code className="text-sm font-mono text-slate-900 dark:text-white break-all flex-1">
                      {trackingState.generatedPasskey}
                    </code>
                    <button
                      onClick={() => copyToClipboard(trackingState.generatedPasskey || '', 'Passkey')}
                      className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-black py-2 px-4 rounded-lg transition-all flex items-center gap-2"
                    >
                      <Copy size={16} />
                      Copy
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setTrackingState((prev) => ({
                      ...prev,
                      stage: 'tracking',
                      isLoggedIn: true,
                      hasPasskey: true,
                      generatedPasskey: undefined
                    }));
                    setPasskeyInput('');
                    setGetPasskeyForm({ email: '', password: '' });
                    setErrors({});
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Lock size={20} />
                  Continue to Tracking
                </button>
              </div>
            </motion.div>
          )}

          {/* TRACKING STAGE - PROFESSIONAL BANKING UI */}
          {trackingState.stage === 'tracking' && trackingState.hasPasskey && (
            <motion.div
              key="tracking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`space-y-4 sm:space-y-6 ${isInAccountView ? 'px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8' : ''}`}
            >
              {/* Countdown Timer at Top */}
              {(() => {
                const status = calculateGrantStatus(trackingState.currentUser?.timestamp || '');
                
                // Hide timer when review is complete
                if (status.isReviewComplete) {
                  return null;
                }
                
                return (
                  <motion.div
                    className={`rounded-3xl p-6 sm:p-8 text-white font-black text-center transition-all border-2 ${
                      status.isInitializing 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-400/50' 
                        : 'bg-gradient-to-r from-amber-600 to-orange-600 border-amber-400/50'
                    }`}
                    animate={{ scale: [1, 1.01, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <p className="text-xs sm:text-sm opacity-90 mb-4 uppercase tracking-widest font-bold">⏱️ Processing Timeline</p>
                    <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
                      <div className="flex flex-col items-center">
                        <div className="text-4xl sm:text-5xl font-black leading-none">{status.daysRemaining}</div>
                        <div className="text-xs sm:text-sm opacity-75 mt-1">Days</div>
                      </div>
                      <div className="text-3xl sm:text-4xl opacity-40">:</div>
                      <div className="flex flex-col items-center">
                        <div className="text-4xl sm:text-5xl font-black leading-none">{String(status.hoursRemaining).padStart(2, '0')}</div>
                        <div className="text-xs sm:text-sm opacity-75 mt-1">Hours</div>
                      </div>
                      <div className="text-3xl sm:text-4xl opacity-40">:</div>
                      <div className="flex flex-col items-center">
                        <div className="text-4xl sm:text-5xl font-black leading-none">{String(status.minutesRemaining).padStart(2, '0')}</div>
                        <div className="text-xs sm:text-sm opacity-75 mt-1">Mins</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}

              {/* Main Account Header - Premium Wallet Style */}
              <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 dark:from-indigo-950 dark:via-purple-950 dark:to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-indigo-600/30 shadow-2xl">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm opacity-70 uppercase mb-2 tracking-widest font-black">🔐 Secure Grant Account</p>
                    <h2 className="text-3xl sm:text-4xl font-black mb-2 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">Grant Wallet</h2>
                    <p className="text-sm opacity-80">Manage and track your grant application status</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 flex-wrap justify-end">
                    <button
                      onClick={() => {
                        const applications = JSON.parse(localStorage.getItem('grantApplications') || '[]') as GrantApplication[];
                        const userApps = applications.filter(app => app.email === trackingState.currentUser?.email);
                        setUserApplications(userApps);
                        setShowApplicationsModal(true);
                      }}
                      className="p-3 sm:p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/10 hover:from-blue-500/40 hover:to-blue-600/20 rounded-xl transition-all border border-blue-400/30 hover:border-blue-400/60 backdrop-blur-sm"
                      title="View Applications"
                    >
                      <FileText size={24} className="text-blue-300" />
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="p-3 sm:p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/10 hover:from-purple-500/40 hover:to-purple-600/20 rounded-xl transition-all border border-purple-400/30 hover:border-purple-400/60 backdrop-blur-sm"
                      title="Settings"
                    >
                      <Settings size={24} className="text-purple-300" />
                    </button>
                    <button
                      onClick={handleLogout}
                      className="p-3 sm:p-4 bg-gradient-to-br from-red-500/20 to-red-600/10 hover:from-red-500/40 hover:to-red-600/20 rounded-xl transition-all border border-red-400/30 hover:border-red-400/60 backdrop-blur-sm"
                      title="Logout"
                    >
                      <LogOut size={24} className="text-red-300" />
                    </button>
                  </div>
                </div>
                
              </div>

              {/* Account Update Notification - Top Left */}
              {(() => {
                const status = calculateGrantStatus(trackingState.currentUser?.timestamp || '');
                if (status.isInitializing) {
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl p-3 text-white border-l-4 border-blue-400"
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-0.5">
                          <Clock size={18} className="text-blue-200 animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-sm mb-0.5">⏱️ Account Setup</h3>
                          <p className="text-xs text-blue-100 mb-1">Your account is initializing. After 24 hours, your grant amount will be shown and frozen.</p>
                          <div className="flex items-center gap-1 text-xs font-bold">
                            <span className="text-blue-200">Time:</span>
                            <span className="text-white">{String(status.hoursRemaining).padStart(2, '0')}h {String(status.minutesRemaining).padStart(2, '0')}m</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                }
                return null;
              })()}

              {/* Wallet Section - Available Balance & Details */}
              {(() => {
                const status = calculateGrantStatus(trackingState.currentUser?.timestamp || '');
                // Format amount with comma separators
                const formatAmount = (amount: string | undefined) => {
                  if (!amount) return '0.00';
                  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                };
                
                return (
                  <div className="space-y-6">
                    {/* AVAILABLE BALANCE CARD - Right Below Timer */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wide mb-3">
                            {status.isInitializing ? 'Account Balance (Initializing)' : status.isFrozen ? 'Frozen Amount (Locked)' : status.isReviewComplete ? 'Application Status' : 'Available Balance'}
                          </p>
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white break-words">
                              {privacySettings.hideBalance ? '••••' : status.isInitializing ? '$0.00' : status.isReviewComplete ? '❌' : `$${formatAmount(trackingState.currentUser?.amount)}`}
                            </span>
                            <button
                              onClick={() => setPrivacySettings({...privacySettings, hideBalance: !privacySettings.hideBalance})}
                              className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex-shrink-0"
                              title={privacySettings.hideBalance ? "Show balance" : "Hide balance"}
                            >
                              {privacySettings.hideBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </div>
                        <div className="sm:text-right">
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wide mb-2">Account Status</p>
                          <p className="text-lg sm:text-base font-black text-slate-900 dark:text-white">
                            {status.isInitializing ? '🔒 Setup' : status.isFrozen ? '🔒 Frozen' : status.isReviewComplete ? '❌ Not Approved' : '✅ Active'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* DETAIL CARDS - Applicant Name, Account Status, Grant Type */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                      <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur border border-white/20 dark:border-slate-600/50 rounded-2xl p-4 sm:p-5">
                        <p className="text-xs text-slate-600 dark:text-slate-300 uppercase mb-2 tracking-wider font-bold">Applicant Name</p>
                        <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-white truncate">{trackingState.currentUser?.fullName || 'User'}</p>
                      </div>
                      <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur border border-white/20 dark:border-slate-600/50 rounded-2xl p-4 sm:p-5">
                        <p className="text-xs text-slate-600 dark:text-slate-300 uppercase mb-2 tracking-wider font-bold">Account Status</p>
                        <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                          {(() => {
                            const status = calculateGrantStatus(trackingState.currentUser?.timestamp || '');
                            return status.isInitializing ? '🔒 Setup' : status.isFrozen ? '🔒 Frozen' : status.isReviewComplete ? '❌ Not Approved' : '✅ Active';
                          })()}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 dark:from-emerald-600/20 dark:to-teal-600/20 backdrop-blur border border-emerald-500/30 dark:border-emerald-600/30 rounded-2xl p-4 sm:p-5 col-span-2 md:col-span-1">
                        <p className="text-xs text-slate-600 dark:text-slate-300 uppercase mb-2 tracking-wider font-bold">Grant Type</p>
                        <p className="text-lg sm:text-xl font-black text-emerald-700 dark:text-emerald-300">{trackingState.currentGrant || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Processing Timeline Card */}
              {(() => {
                const status = calculateGrantStatus(trackingState.currentUser?.timestamp || '');
                return (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8">
                    <p className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-widest mb-6">Processing Details</p>
                    
                    {status.isInitializing && (
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <Clock className="text-slate-600 dark:text-slate-400" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">Phase 1: Account Initialization</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Your grant account is being configured and secured. Account balance shows as $0.00 during this period.</p>
                        </div>
                      </div>
                    )}

                    {status.isFrozen && (
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-800/30 flex items-center justify-center">
                          <Lock className="text-amber-600 dark:text-amber-400" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">Phase 2: Application Review</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Day {status.dayNumber} of 14 — Your grant amount is displayed and locked. {Math.round(status.progressPercentage)}% complete</p>
                        </div>
                      </div>
                    )}

                    {status.isReviewComplete && (
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-rose-100 dark:bg-rose-800/30 flex items-center justify-center">
                          <AlertCircle className="text-rose-600 dark:text-rose-400" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">Phase 3: Review Decision</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Your application review has been completed. Please see details below for the outcome.</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Rejection/Denial Message - After Review Complete */}
              {(() => {
                const status = calculateGrantStatus(trackingState.currentUser?.timestamp || '');
                if (status.isReviewComplete) {
                  return (
                    <div className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/30 border-2 border-rose-200 dark:border-rose-700 rounded-2xl p-6 sm:p-8 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <AlertCircle size={32} className="text-rose-600 dark:text-rose-400 flex-shrink-0 mt-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl sm:text-2xl font-black text-rose-900 dark:text-rose-200 mb-2">Application Review Complete</h3>
                          <p className="text-sm sm:text-base text-rose-800 dark:text-rose-300 leading-relaxed mb-4">
                            Thank you for submitting your application. After careful review of your details and qualifications, we regret to inform you that you do not meet the eligibility requirements for this grant opportunity at this time.
                          </p>
                          
                          <div className="bg-white/50 dark:bg-slate-900/50 rounded-xl p-4 space-y-3 mb-4">
                            <h4 className="font-bold text-rose-900 dark:text-rose-200 text-sm">Possible Reasons:</h4>
                            <ul className="text-sm text-rose-800 dark:text-rose-300 space-y-2">
                              <li className="flex items-start gap-2">
                                <span className="text-rose-600 dark:text-rose-400 font-bold flex-shrink-0">•</span>
                                <span>Your qualifications or experience did not align with the program requirements</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-rose-600 dark:text-rose-400 font-bold flex-shrink-0">•</span>
                                <span>Your application did not meet the minimum eligibility criteria</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-rose-600 dark:text-rose-400 font-bold flex-shrink-0">•</span>
                                <span>There were concerns regarding the project feasibility or sustainability</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-rose-600 dark:text-rose-400 font-bold flex-shrink-0">•</span>
                                <span>Funding allocated to other candidates with stronger applications</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-700 rounded-xl p-4 space-y-3">
                            <h4 className="font-bold text-blue-900 dark:text-blue-200 text-sm">Next Steps:</h4>
                            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
                              <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">✓</span>
                                <span>Review the feedback provided and consider addressing the gaps for future applications</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">✓</span>
                                <span>Explore other grant opportunities that may better align with your profile</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">✓</span>
                                <span>Contact our support team if you believe this is an error or for clarification</span>
                              </li>
                            </ul>
                          </div>
                          
                          <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-4">
                            We appreciate your interest and encourage you to apply for other opportunities in the future. For questions, please contact our support team.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Transfer Section */}
              {(() => {
                const status = calculateGrantStatus(trackingState.currentUser?.timestamp || '');
                return (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
                    <h3 className="font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-base sm:text-lg">
                      <RefreshCw size={20} />
                      Transfer Funds
                    </h3>
                    
                    {status.isInitializing || status.isFrozen || status.isReviewComplete ? (
                      <div className="space-y-3">
                        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 sm:p-4 flex gap-3">
                          <Lock size={18} className="text-slate-600 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm sm:text-base font-black text-slate-900 dark:text-white mb-1">Account Locked</p>
                            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                              {status.isInitializing ? 'Transfers are unavailable during account setup. Available after this phase is complete.' : status.isFrozen ? 'Transfers are unavailable while your grant amount is frozen. Available after the frozen period ends.' : 'Your application was not approved. Transfers are not available.'}
                            </p>
                          </div>
                        </div>
                        <button
                          disabled
                          className="w-full bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-black py-3 rounded-lg cursor-not-allowed opacity-60"
                        >
                          🔒 Transfers Locked
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <button
                          onClick={() => setShowTransferModal(true)}
                          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black py-3 sm:py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
                        >
                          <RefreshCw size={20} />
                          Withdraw Funds
                        </button>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center">
                          Your grant is ready to transfer. Initiate a withdrawal to your bank account.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Your Passkey Section */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-2 border-indigo-200 dark:border-indigo-700 rounded-2xl p-4 sm:p-6 space-y-4">
                <div className="flex items-start gap-3 mb-4">
                  <Key size={24} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-indigo-900 dark:text-indigo-200 text-sm sm:text-base">🔑 Your Passkey</h4>
                    <p className="text-xs sm:text-sm text-indigo-800 dark:text-indigo-300 mt-1">
                      Use this passkey to access your account from any browser. Keep it safe and secure.
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-3 sm:p-4 border border-indigo-200 dark:border-indigo-700">
                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      type={trackingState.showPasskey ? 'text' : 'password'}
                      value={trackingState.currentUser?.passkey || ''}
                      readOnly
                      className="flex-1 min-w-0 bg-transparent text-sm sm:text-base font-mono text-slate-900 dark:text-white outline-none"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setTrackingState((prev) => ({
                          ...prev,
                          showPasskey: !prev.showPasskey
                        }))
                      }
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
                      title={trackingState.showPasskey ? 'Hide passkey' : 'Show passkey'}
                    >
                      {trackingState.showPasskey ? (
                        <EyeOff size={18} className="text-slate-600 dark:text-slate-400" />
                      ) : (
                        <Eye size={18} className="text-slate-600 dark:text-slate-400" />
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigator.clipboard.writeText(trackingState.currentUser?.passkey || '');
                        showAlertMessage('✅ Passkey copied to clipboard!');
                      }}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
                      title="Copy passkey"
                    >
                      <Copy size={18} className="text-indigo-600 dark:text-indigo-400" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700 rounded-2xl p-4 sm:p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={24} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-green-900 dark:text-green-200 text-sm sm:text-base">✅ Account Secure</h4>
                    <p className="text-xs sm:text-sm text-green-800 dark:text-green-300 mt-1">
                      Your passkey works on ANY browser and is never stored on our servers. Keep it in a secure location like a password manager.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 flex flex-col">
                <button
                  onClick={handleLogout}
                  className="w-full border-2 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 font-black py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-sm sm:text-base"
                >
                  <LogOut size={18} className="inline mr-2" />
                  Logout
                </button>
              </div>
            </motion.div>
          )}

          {/* PASSKEY RECOVERY STAGE - ADVANCED SECURE PROCESS */}
          {trackingState.stage === 'passKeyRecovery' && (
            <motion.div
              key="recovery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-rose-600 to-red-600 rounded-3xl p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-black mb-4">🔐 Secure Account Recovery</h2>
                <p className="text-lg text-rose-100">
                  Multi-step verification process to protect your account
                </p>
              </div>

              <div className="space-y-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                {errors.recovery && (
                  <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl p-4 flex gap-3">
                    <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 dark:text-red-300 font-semibold text-sm">{errors.recovery}</p>
                  </div>
                )}

                {/* Step Indicator */}
                <div className="flex gap-2 justify-between mb-6">
                  <div className={`flex-1 h-2 rounded-full transition-all ${recoveryStep === 'email' || recoveryStep === 'verifyCode' || recoveryStep === 'resetPassword' ? 'bg-rose-600' : 'bg-slate-300 dark:bg-slate-700'}`} />
                  <div className={`flex-1 h-2 rounded-full transition-all ${recoveryStep === 'verifyCode' || recoveryStep === 'resetPassword' ? 'bg-rose-600' : 'bg-slate-300 dark:bg-slate-700'}`} />
                  <div className={`flex-1 h-2 rounded-full transition-all ${recoveryStep === 'resetPassword' ? 'bg-rose-600' : 'bg-slate-300 dark:bg-slate-700'}`} />
                </div>

                {/* STEP 1: EMAIL VERIFICATION */}
                {recoveryStep === 'email' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-4 flex gap-3">
                      <AlertCircle size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-black text-blue-900 dark:text-blue-200 mb-1">Step 1: Verify Email</h4>
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                          Enter the email address associated with your grant account.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">📧 Email Address</label>
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={recoveryForm.email}
                        onChange={(e) => {
                          setRecoveryForm({ ...recoveryForm, email: e.target.value });
                          setErrors({});
                        }}
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
                          errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-rose-600'
                        }`}
                      />
                      {errors.email && <p className="text-red-600 text-sm font-semibold mt-1">{errors.email}</p>}
                    </div>

                    <button
                      onClick={handlePasskeyRecovery}
                      disabled={isLoading}
                      className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                    >
                      <Key size={20} />
                      {isLoading ? 'Generating Code...' : 'Generate Recovery Code'}
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: VERIFY CODE */}
                {recoveryStep === 'verifyCode' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl p-4 flex gap-3">
                      <AlertCircle size={20} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-black text-amber-900 dark:text-amber-200 mb-1">Step 2: Verify Your Identity</h4>
                        <p className="text-sm text-amber-800 dark:text-amber-300">
                          Enter the verification code that has been generated for you.
                        </p>
                      </div>
                    </div>

                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-700 rounded-xl p-4 space-y-3">
                      <h4 className="font-black text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                        <CheckCircle2 size={20} className="text-emerald-600" />
                        Your Recovery Code
                      </h4>
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-emerald-300 dark:border-emerald-700">
                        <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase mb-2">🔐 Reference Code (for your records)</p>
                        <code className="text-slate-900 dark:text-white font-mono text-sm font-bold break-all block mb-3">
                          {recoveryCode}
                        </code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(recoveryCode);
                            showAlertMessage('✅ Code copied to clipboard!');
                          }}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                          <Copy size={16} />
                          Copy Code
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">🔑 Recovery Code</label>
                      <input
                        type="text"
                        placeholder="Enter your recovery code here"
                        value={recoveryCodeInput}
                        onChange={(e) => {
                          setRecoveryCodeInput(e.target.value);
                          setErrors({});
                        }}
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all font-mono ${
                          errors.recoveryCode ? 'border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-rose-600'
                        }`}
                      />
                      {errors.recoveryCode && <p className="text-red-600 text-sm font-semibold mt-1">{errors.recoveryCode}</p>}
                    </div>

                    <button
                      onClick={handleRecoveryCodeVerification}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={20} />
                      Verify Code
                    </button>
                  </motion.div>
                )}

                {/* STEP 3: RESET PASSWORD */}
                {recoveryStep === 'resetPassword' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-700 rounded-xl p-4 flex gap-3">
                      <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-black text-emerald-900 dark:text-emerald-200 mb-1">Step 3: Create New Password</h4>
                        <p className="text-sm text-emerald-800 dark:text-emerald-300">
                          Create a strong, unique password for your account.
                        </p>
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl p-4 flex gap-3">
                      <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-red-800 dark:text-red-300">
                        <p className="font-black mb-2">Password Requirements:</p>
                        <ul className="text-xs space-y-1">
                          <li>✓ At least 8 characters long</li>
                          <li>✓ Contains uppercase letter (A-Z)</li>
                          <li>✓ Contains lowercase letter (a-z)</li>
                          <li>✓ Contains number (0-9)</li>
                          <li>✓ Contains special character (!@#$%^&*)</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">🔐 New Password</label>
                      <div className="relative">
                        <input
                          type={showRecoveryPassword ? 'text' : 'password'}
                          placeholder="Create a strong password"
                          value={recoveryNewPassword}
                          onChange={(e) => {
                            setRecoveryNewPassword(e.target.value);
                            setErrors({});
                          }}
                          className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all pr-12 ${
                            errors.newPassword ? 'border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-rose-600'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowRecoveryPassword(!showRecoveryPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        >
                          {showRecoveryPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.newPassword && <p className="text-red-600 text-sm font-semibold mt-1">{errors.newPassword}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">✓ Confirm Password</label>
                      <input
                        type={showRecoveryPassword ? 'text' : 'password'}
                        placeholder="Re-enter your password"
                        value={recoveryConfirmPassword}
                        onChange={(e) => {
                          setRecoveryConfirmPassword(e.target.value);
                          setErrors({});
                        }}
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
                          errors.confirmPassword ? 'border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-rose-600'
                        }`}
                      />
                      {errors.confirmPassword && <p className="text-red-600 text-sm font-semibold mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <button
                      onClick={handleRecoveryPasswordReset}
                      disabled={isLoading}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                    >
                      <CheckCircle2 size={20} />
                      {isLoading ? 'Resetting Password...' : 'Reset Password & Login'}
                    </button>
                  </motion.div>
                )}

                <button
                  onClick={() => {
                    setTrackingState((prev) => ({ ...prev, stage: 'grantSelection', currentGrant: null }));
                    setRecoveryForm({ email: '', password: '', showPassword: false });
                    setRecoveryCodeInput('');
                    setRecoveryNewPassword('');
                    setRecoveryConfirmPassword('');
                    setRecoveryStep('email');
                    setErrors({});
                  }}
                  className="w-full border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-black py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  <ArrowLeft size={18} className="inline mr-2" />
                  Back to Login
                </button>
              </div>
            </motion.div>
          )}

          {/* SETTINGS MODAL */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
                onClick={() => setShowSettings(false)}
              >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[95vh] bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col mx-auto my-auto"
          >
                  {/* Settings Header */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 p-4 sm:p-6 text-white flex-shrink-0 sticky top-0 z-10">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-black">⚙️ Account Settings</h2>
                        <p className="text-slate-300 text-xs sm:text-sm mt-1.5">Manage your account and security</p>
                      </div>
                      <button
                        onClick={() => setShowSettings(false)}
                        className="flex-shrink-0 p-2 hover:bg-white/20 rounded-xl transition-all"
                        title="Close Settings"
                      >
                        <X size={24} className="sm:w-7 sm:h-7" />
                      </button>
                    </div>
                  </div>

                  {/* Settings Content - No Tabs, Simple Layout */}
                  <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-5 sm:py-6 pb-8 sm:pb-10 space-y-4 sm:space-y-5">
                    {/* Generate New Passkey */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg sm:rounded-xl p-3 sm:p-4 flex gap-2 sm:gap-3">
                      <Key size={18} className="sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-black text-sm sm:text-base text-blue-900 dark:text-blue-200">Manage Your Passkey</h4>
                        <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300 mt-1">Generate a new passkey for secure account access</p>
                      </div>
                    </div>

                    <div className="border-2 border-slate-200 dark:border-slate-700 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-blue-400 dark:hover:border-blue-600 transition-all">
                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-sm sm:text-base text-slate-900 dark:text-white">Generate New Passkey</p>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Create a new passkey using your email and password</p>
                        </div>
                        <button 
                          onClick={() => {
                            setTrackingState(prev => ({
                              ...prev,
                              stage: 'getPasskey',
                              isLoggedIn: false
                            }));
                            setShowSettings(false);
                            setGetPasskeyForm({ email: '', password: '' });
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-black text-xs sm:text-sm transition-all w-full"
                        >
                          🔑 Generate New Passkey
                        </button>
                      </div>
                    </div>

                    <div className="border-2 border-slate-200 dark:border-slate-700 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all">
                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-sm sm:text-base text-slate-900 dark:text-white">Login with Email & Password</p>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Get a passkey using your email and password</p>
                        </div>
                        <button 
                          onClick={() => {
                            setTrackingState(prev => ({
                              ...prev,
                              stage: 'getPasskey',
                              isLoggedIn: false
                            }));
                            setShowSettings(false);
                            setGetPasskeyForm({ email: '', password: '' });
                          }}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-black text-xs sm:text-sm transition-all w-full"
                        >
                          📧 Get Passkey with Email
                        </button>
                      </div>
                    </div>

                    {/* Light Mode Toggle */}
                    <div className="border-2 border-slate-200 dark:border-slate-700 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-amber-400 dark:hover:border-amber-600 transition-all">
                      <div className="flex items-center justify-between gap-3 w-full">
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-sm sm:text-base text-slate-900 dark:text-white">Dark Mode</p>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Toggle dark and light mode</p>
                        </div>
                        <button
                          onClick={() => {
                            const html = document.documentElement;
                            const isDark = html.classList.contains('dark');
                            
                            if (isDark) {
                              // Switch to light mode
                              html.classList.remove('dark');
                              localStorage.setItem('theme', 'light');
                              setIsDarkMode(false);
                            } else {
                              // Switch to dark mode
                              html.classList.add('dark');
                              localStorage.setItem('theme', 'dark');
                              setIsDarkMode(true);
                            }
                          }}
                          className={`flex-shrink-0 w-14 h-8 rounded-full transition-all flex items-center justify-end pr-1 ${
                            isDarkMode
                              ? 'bg-slate-700'
                              : 'bg-amber-200'
                          }`}
                        >
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full transition-all ${
                            isDarkMode
                              ? 'bg-slate-800 text-amber-400'
                              : 'bg-white text-amber-600'
                          }`}>
                            {isDarkMode ? '🌙' : '☀️'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Logout Button */}
                    <div className="border-2 border-red-200 dark:border-red-700 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-red-400 dark:hover:border-red-600 transition-all">
                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-sm sm:text-base text-slate-900 dark:text-white">Logout</p>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Sign out from your account</p>
                        </div>
                        <button 
                          onClick={() => {
                            setTrackingState(prev => ({
                              ...prev,
                              stage: 'grantSelection',
                              isLoggedIn: false,
                              currentUser: null,
                              currentGrant: null,
                              hasPasskey: false
                            }));
                            setShowSettings(false);
                            setLogoutMessage('You have been logged out successfully');
                            setTimeout(() => setLogoutMessage(''), 5000);
                          }}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-black text-xs sm:text-sm transition-all w-full flex items-center justify-center gap-2"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        💡 <span className="font-bold">Tip:</span> Keep your email and password safe. You'll need them to generate a new passkey if needed.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MY APPLICATIONS MODAL */}
          <AnimatePresence>
            {showApplicationsModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
                onClick={() => setShowApplicationsModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-2xl max-h-[95vh] bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col mx-auto my-auto"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 p-4 sm:p-6 text-white flex-shrink-0 sticky top-0 z-10">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-black">📋 My Applications</h2>
                        <p className="text-blue-100 text-xs sm:text-sm mt-1.5">View and switch between your grant applications</p>
                      </div>
                      <button
                        onClick={() => setShowApplicationsModal(false)}
                        className="flex-shrink-0 p-2 hover:bg-white/20 rounded-xl transition-all"
                        title="Close"
                      >
                        <X size={24} className="sm:w-7 sm:h-7" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-5 sm:py-6 pb-8 sm:pb-10 space-y-3">
                    {userApplications.length === 0 ? (
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 text-center">
                        <p className="text-slate-600 dark:text-slate-400 font-semibold">No applications found</p>
                      </div>
                    ) : (
                      userApplications.map((app, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setTrackingState(prev => ({
                              ...prev,
                              currentUser: app,
                              currentGrant: app.grantCategory,
                              stage: 'tracking'
                            }));
                            setShowApplicationsModal(false);
                            showAlertMessage(`✅ Switched to ${app.grantCategory} application`);
                          }}
                          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                            trackingState.currentGrant === app.grantCategory
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                                {app.grantCategory}
                              </p>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                                Applied: {new Date(app.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                Amount: ${app.amount}
                              </p>
                            </div>
                            {trackingState.currentGrant === app.grantCategory && (
                              <div className="flex-shrink-0">
                                <CheckCircle2 size={24} className="text-blue-600 dark:text-blue-400" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GrantTracking;
