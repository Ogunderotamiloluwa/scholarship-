import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Eye, EyeOff, Lock, Mail, Key, Copy, CheckCircle2, AlertCircle,
  Clock, User, DollarSign, Shield, RefreshCw, LogOut, Settings, Lock as LockIcon,
  Eye as EyeIcon, ToggleRight, ToggleLeft, X
} from 'lucide-react';
import { ViewState } from '../types';

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
  const [trackingState, setTrackingState] = useState<TrackingState>({
    stage: 'grantSelection',
    isLoggedIn: false,
    hasPasskey: false,
    currentUser: null,
    currentGrant: null,
    showPassword: false,
    showPasskey: false,
    generatedPasskey: undefined
  });

  // Auto-select grant on mount if user just applied
  useEffect(() => {
    const applications = JSON.parse(localStorage.getItem('grantApplications') || '[]') as GrantApplication[];
    const uniqueGrants = [...new Set(applications.map(app => app.grantCategory))];
    
    // If there's only one grant application, auto-select it
    if (uniqueGrants.length === 1) {
      setTrackingState(prev => ({
        ...prev,
        stage: 'passkeyLogin',
        currentGrant: uniqueGrants[0]
      }));
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
  const [settingsTab, setSettingsTab] = useState<'security' | 'privacy' | 'notifications'>('security');
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

  // Calculate days remaining (10 days from application)
  const calculateDaysRemaining = (timestamp: string) => {
    const applicationDate = new Date(timestamp);
    const dueDate = new Date(applicationDate.getTime() + 10 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const daysRemaining = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysRemaining);
  };

  // Calculate grant status: 0-24hrs = Hidden, 24hrs-15days = Pending with progress, 15+ days = Received
  const calculateGrantStatus = (timestamp: string) => {
    const applicationDate = new Date(timestamp);
    const now = new Date();
    const hoursElapsed = (now.getTime() - applicationDate.getTime()) / (1000 * 60 * 60);
    const daysElapsed = hoursElapsed / 24;
    const totalDaysNeeded = 14; // Changed from 15 to 14 days after 24hr setup
    const daysRemaining = Math.max(0, totalDaysNeeded - (daysElapsed - 1)); // Subtract 1 for the initial 24hrs
    const hoursRemaining = Math.max(0, (daysRemaining % 1) * 24);
    
    return {
      daysElapsed,
      hoursElapsed,
      daysRemaining: Math.floor(daysRemaining),
      hoursRemaining: Math.floor(hoursRemaining),
      minutesRemaining: Math.floor(((hoursRemaining % 1) * 60)),
      isHidden: daysElapsed < 1, // First 24 hours
      isPending: daysElapsed >= 1 && daysElapsed < 15, // Days 1-14 (after 24hrs, counts 14 more days)
      isReceived: daysElapsed >= 15, // After 15 days total (1 day setup + 14 days processing)
      progressPercentage: Math.min(100, Math.max(0, ((daysElapsed - 1) / 14) * 100)), // 0-100% over 14 days after setup
      dayNumber: Math.max(1, Math.ceil(daysElapsed - 1)) // Current day number (1-14 for processing)
    };
  };

  // Generate passkey from email and password
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
      const applications = JSON.parse(localStorage.getItem('grantApplications') || '[]') as GrantApplication[];
      const user = applications.find(
        (app) => app.passkey === passkeyInput.trim() && app.grantCategory === trackingState.currentGrant
      );

      if (user) {
        setTrackingState((prev) => ({
          ...prev,
          currentUser: user,
          isLoggedIn: true,
          hasPasskey: true,
          stage: 'tracking'
        }));
        setErrors({});
        setPasskeyInput('');
        showAlertMessage('✅ Welcome! Your passkey authentication successful.');
      } else {
        setErrors({ passkey: '❌ Passkey not found or does not match this grant. Please check and try again.' });
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
    setTimeout(() => {
      const applications = JSON.parse(localStorage.getItem('grantApplications') || '[]') as GrantApplication[];
      const user = applications.find(
        (app) => 
          app.email === getPasskeyForm.email && 
          app.password === getPasskeyForm.password &&
          app.grantCategory === trackingState.currentGrant
      );

      if (user) {
        if (user.passkey) {
          // User already has a passkey - show it and require them to use it for login
          setTrackingState((prev) => ({
            ...prev,
            currentUser: user,
            hasPasskey: true,
            generatedPasskey: user.passkey,
            stage: 'showGeneratedPasskey'
          }));
          setErrors({});
          setGetPasskeyForm({ email: '', password: '' });
          showAlertMessage('✅ Your passkey found! Copy it and use it to login.');
        } else {
          // Generate new passkey
          const passkey = generatePasskey(user.email, user.password);
          const updatedApplications = applications.map((app) =>
            app.email === user.email && app.grantCategory === user.grantCategory 
              ? { ...app, passkey } 
              : app
          );
          localStorage.setItem('grantApplications', JSON.stringify(updatedApplications));

          setTrackingState((prev) => ({
            ...prev,
            currentUser: { ...user, passkey },
            hasPasskey: true,
            generatedPasskey: passkey,
            stage: 'showGeneratedPasskey'
          }));
          setErrors({});
          setGetPasskeyForm({ email: '', password: '' });
        }
      } else {
        setErrors({ getPasskey: '❌ Email or password is incorrect for this grant. Please verify and try again.' });
      }
      setIsLoading(false);
    }, 800);
  };

  // Handle logout
  const handleLogout = () => {
    setTrackingState({
      stage: 'grantSelection',
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
    showAlertMessage('👋 You have been logged out.');
  };

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
      const userIndex = applications.findIndex((app) => app.email === recoveryForm.email && app.grantCategory === trackingState.currentGrant);

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
        setErrors({ recovery: '❌ Error: Email or grant not found.' });
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 pt-24 pb-40">
      {/* Alert Message */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 border-b-2 border-emerald-700 dark:border-emerald-800 rounded-b-2xl px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-center gap-3 shadow-2xl"
          >
            <CheckCircle2 size={20} className="text-white flex-shrink-0" />
            <p className="text-white text-xs sm:text-sm font-bold whitespace-pre-line break-words text-center">{alertMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <button
          onClick={() => onNavigate('HOME')}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-black text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        <AnimatePresence mode="wait">
          {/* GRANT SELECTION STAGE */}
          {trackingState.stage === 'grantSelection' && (
            <motion.div
              key="grantSelection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-black mb-4">Grant Tracking Portal</h2>
                <p className="text-lg text-blue-100">
                  Select the grant you want to track
                </p>
              </div>

              <div className="space-y-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                {errors.grantSelection && (
                  <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl p-4 flex gap-3">
                    <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 dark:text-red-300 font-semibold text-sm">{errors.grantSelection}</p>
                  </div>
                )}

                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-4 flex gap-3">
                  <AlertCircle size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-blue-900 dark:text-blue-200 mb-1">Select Your Grant</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      Choose which grant program you applied for to proceed with login.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {(() => {
                    const applications = JSON.parse(localStorage.getItem('grantApplications') || '[]') as GrantApplication[];
                    const uniqueGrants = [...new Set(applications.map(app => app.grantCategory))];
                    
                    if (uniqueGrants.length === 0) {
                      return (
                        <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl p-4">
                          <p className="text-amber-800 dark:text-amber-300 font-semibold">No grant applications found. Please submit an application first.</p>
                        </div>
                      );
                    }

                    return uniqueGrants.map((grantCategory) => (
                      <button
                        key={grantCategory}
                        onClick={() => {
                          setTrackingState((prev) => ({ ...prev, stage: 'passkeyLogin', currentGrant: grantCategory }));
                          setErrors({});
                          setPasskeyInput('');
                          setGetPasskeyForm({ email: '', password: '' });
                        }}
                        className="w-full p-4 border-2 border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all text-left font-black text-slate-900 dark:text-white"
                      >
                        💰 {grantCategory}
                      </button>
                    ));
                  })()}
                </div>
              </div>
            </motion.div>
          )}

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
                <h2 className="text-3xl md:text-4xl font-black mb-4">🔑 Login with Passkey</h2>
                <p className="text-lg text-green-100">
                  Selected Grant: <span className="font-black">{trackingState.currentGrant}</span>
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

                  <button
                    onClick={() => {
                      setTrackingState((prev) => ({ ...prev, stage: 'grantSelection', currentGrant: null }));
                      setErrors({});
                      setPasskeyInput('');
                    }}
                    className="w-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold py-2 transition-colors"
                  >
                    ← Change Grant
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
                  Selected Grant: <span className="font-black">{trackingState.currentGrant}</span>
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
                    <h4 className="font-black text-amber-900 dark:text-amber-200 mb-1">Create Your Passkey</h4>
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      Enter the email and password from your grant application to create or retrieve your passkey.
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
                    ← Back to Passkey Login
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
                      stage: 'passkeyLogin',
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
                  Continue to Login
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
              className="space-y-4 sm:space-y-6"
            >
              {/* Countdown Timer at Top */}
              {(() => {
                const status = calculateGrantStatus(trackingState.currentUser?.timestamp || '');
                return (
                  <motion.div
                    className={`rounded-2xl p-4 sm:p-6 text-white font-black text-center transition-all ${
                      status.isHidden 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
                        : status.isPending 
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600' 
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600'
                    }`}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <p className="text-xs sm:text-sm opacity-90 mb-2 uppercase tracking-wider">⏱️ Time Until Funds Available</p>
                    <div className="flex items-center justify-center gap-2 sm:gap-4">
                      <div className="flex flex-col items-center">
                        <div className="text-3xl sm:text-4xl font-black">{status.daysRemaining}</div>
                        <div className="text-xs sm:text-sm opacity-75">Days</div>
                      </div>
                      <div className="text-2xl sm:text-3xl opacity-50">:</div>
                      <div className="flex flex-col items-center">
                        <div className="text-3xl sm:text-4xl font-black">{String(status.hoursRemaining).padStart(2, '0')}</div>
                        <div className="text-xs sm:text-sm opacity-75">Hours</div>
                      </div>
                      <div className="text-2xl sm:text-3xl opacity-50">:</div>
                      <div className="flex flex-col items-center">
                        <div className="text-3xl sm:text-4xl font-black">{String(status.minutesRemaining).padStart(2, '0')}</div>
                        <div className="text-xs sm:text-sm opacity-75">Min</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}

              {/* Main Account Header */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-6 sm:p-8 text-white">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm opacity-75 uppercase mb-2">Grant Account</p>
                    <h2 className="text-2xl sm:text-3xl font-black">Your Grant Portal</h2>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                      title="Account Settings"
                    >
                      <Settings size={24} className="text-white" />
                    </button>
                    <Shield size={32} className="mt-1" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3 sm:p-4">
                    <p className="text-xs opacity-75 mb-1">Applicant</p>
                    <p className="text-lg sm:text-xl font-black truncate">{trackingState.currentUser?.fullName?.split(' ')[0]}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3 sm:p-4">
                    <p className="text-xs opacity-75 mb-1">Account Status</p>
                    <p className="text-sm sm:text-base font-black">
                      {(() => {
                        const status = calculateGrantStatus(trackingState.currentUser?.timestamp || '');
                        return status.isHidden ? '🔒 Setup' : status.isPending ? '⏳ Processing' : '✅ Active';
                      })()}
                    </p>
                  </div>
                </div>

                {/* Grant Type Display */}
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl p-4 border-2 border-blue-300">
                  <p className="text-xs opacity-90 uppercase mb-1 font-semibold">Grant Type You Applied For</p>
                  <p className="text-xl sm:text-2xl font-black">💰 {trackingState.currentGrant}</p>
                  <p className="text-xs opacity-80 mt-2">This matches your application form submitted on {trackingState.currentUser?.timestamp ? new Date(trackingState.currentUser.timestamp).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>

              {/* Account Update Notification - Top Left */}
              {(() => {
                const status = calculateGrantStatus(trackingState.currentUser?.timestamp || '');
                if (status.isHidden) {
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-4 sm:p-5 text-white border-l-4 border-blue-400"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <Clock size={20} className="text-blue-200 animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-base sm:text-lg mb-1">⏱️ Account Update in Progress</h3>
                          <p className="text-xs sm:text-sm text-blue-100 mb-2">Your account will be updated with your grant amount after 24 hours</p>
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
                            <span className="text-blue-200">Time until update:</span>
                            <span className="text-white text-sm sm:text-base">{String(status.hoursRemaining).padStart(2, '0')}h {String(status.minutesRemaining).padStart(2, '0')}m</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                }
                return null;
              })()}

              {/* Dynamic Balance Card */}
              {(() => {
                const status = calculateGrantStatus(trackingState.currentUser?.timestamp || '');
                return (
                  <motion.div
                    className={`rounded-3xl p-6 sm:p-8 transition-all ${
                      status.isHidden 
                        ? 'bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700'
                        : status.isPending
                        ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-700'
                        : 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-3 border-emerald-300 dark:border-emerald-600'
                    }`}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <p className={`text-xs sm:text-sm font-black uppercase mb-3 ${
                      status.isHidden 
                        ? 'text-slate-600 dark:text-slate-400'
                        : status.isPending
                        ? 'text-amber-700 dark:text-amber-300'
                        : 'text-emerald-700 dark:text-emerald-300'
                    }`}>
                      {status.isHidden ? '💤 Account Being Setup' : status.isPending ? '⏳ Pending Balance' : '✅ Available Balance'}
                    </p>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-5xl sm:text-6xl font-black mb-2 text-slate-900 dark:text-white">
                          {privacySettings.hideBalance ? '••••••' : status.isHidden ? '$0.00' : `$${trackingState.currentUser?.amount}`}
                        </div>
                        {status.isPending && (
                          <p className={`text-xs sm:text-sm font-semibold ${
                            status.isPending ? 'text-amber-700 dark:text-amber-300' : ''
                          }`}>
                            🔒 Available in {status.daysRemaining} days {status.hoursRemaining} hours
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => setPrivacySettings({...privacySettings, hideBalance: !privacySettings.hideBalance})}
                        className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all"
                        title={privacySettings.hideBalance ? "Show balance" : "Hide balance"}
                      >
                        {privacySettings.hideBalance ? <EyeOff size={24} className="text-slate-700 dark:text-white" /> : <Eye size={24} className="text-slate-700 dark:text-white" />}
                      </button>
                    </div>
                  </motion.div>
                );
              })()}

              {/* Processing Timeline */}
              {(() => {
                const status = calculateGrantStatus(trackingState.currentUser?.timestamp || '');
                return (
                  <div className="space-y-4">
                    <p className="font-black text-slate-900 dark:text-white text-sm sm:text-base">Processing Status</p>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
                      {status.isHidden && (
                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <Clock className="text-blue-600 dark:text-blue-400" size={20} />
                            </div>
                            <div className="flex-1">
                              <p className="font-black text-slate-900 dark:text-white text-sm sm:text-base">Day 0: Account Setup</p>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Setting up your grant account...</p>
                            </div>
                          </div>
                          <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-blue-500" initial={{ width: '10%' }} animate={{ width: '50%' }} transition={{ duration: 20 }} />
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Check back in 24 hours for balance update</p>
                        </div>
                      )}

                      {status.isPending && (
                        <div className="space-y-4">
                          <div className="flex gap-3 items-start">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                              <AlertCircle className="text-amber-600 dark:text-amber-400" size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-slate-900 dark:text-white text-sm sm:text-base">Day {status.dayNumber}: Processing ({status.progressPercentage.toFixed(0)}%)</p>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Grant processing in progress...</p>
                            </div>
                          </div>
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                              initial={{ width: '0%' }}
                              animate={{ width: `${status.progressPercentage}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                            {status.progressPercentage.toFixed(1)}% — {status.daysRemaining} days remaining until transfer
                          </p>
                        </div>
                      )}

                      {status.isReceived && (
                        <div className="space-y-4">
                          <div className="flex gap-3 items-start">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                              <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-slate-900 dark:text-white text-sm sm:text-base">Day 15: Grant Received ✅</p>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Your grant has been approved!</p>
                            </div>
                          </div>
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                              initial={{ width: '0%' }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                          <p className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">100% Complete — Ready for transfer</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Transfer Section */}
              {(() => {
                const status = calculateGrantStatus(trackingState.currentUser?.timestamp || '');
                return (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border-2 border-slate-200 dark:border-slate-700">
                    <h3 className="font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-base sm:text-lg">
                      <RefreshCw size={20} />
                      Transfer Funds
                    </h3>
                    
                    {status.isHidden || status.isPending ? (
                      <div className="space-y-3">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-3 sm:p-4 flex gap-2">
                          <Lock size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm sm:text-base font-black text-blue-900 dark:text-blue-200 mb-1">Account Locked</p>
                            <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300">
                              Transfers are unavailable while your grant is processing. You'll be able to transfer funds after day 15.
                            </p>
                          </div>
                        </div>
                        <button
                          disabled
                          className="w-full bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-black py-3 rounded-xl cursor-not-allowed opacity-60"
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

              {/* Account Details Section */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700 space-y-4">
                <h3 className="font-black text-slate-900 dark:text-white text-base sm:text-lg">Account Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 sm:p-4">
                    <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase mb-1">Name</p>
                    <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white truncate">{trackingState.currentUser?.fullName}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 sm:p-4">
                    <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase mb-1">Email</p>
                    <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white truncate">{trackingState.currentUser?.email}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 sm:p-4">
                    <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase mb-1">Grant Category</p>
                    <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">{trackingState.currentUser?.grantCategory}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 sm:p-4">
                    <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase mb-1">Submitted</p>
                    <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {new Date(trackingState.currentUser?.timestamp || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Security & Passkey Section */}
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-2xl p-4 sm:p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle size={24} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-red-900 dark:text-red-200 text-sm sm:text-base">Your Secure Passkey</h4>
                    <p className="text-xs sm:text-sm text-red-800 dark:text-red-300 mt-1">
                      Never share this. It's your personal API key for account access.
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-xl border border-red-300 dark:border-red-600 flex items-center justify-between gap-2 sm:gap-3">
                  <code className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white break-all flex-1">
                    {trackingState.currentUser?.passkey}
                  </code>
                  <button
                    onClick={() => copyToClipboard(trackingState.currentUser?.passkey || '', 'Passkey')}
                    className="flex-shrink-0 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                  >
                    <Copy size={16} />
                  </button>
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
            className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col mx-auto"
          >
                  {/* Settings Header */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 p-3 sm:p-6 text-white flex-shrink-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg sm:text-3xl font-black">⚙️ Account Settings</h2>
                        <p className="text-slate-300 text-xs sm:text-sm mt-1">Manage your account security and privacy</p>
                      </div>
                      <button
                        onClick={() => setShowSettings(false)}
                        className="flex-shrink-0 p-2 hover:bg-white/20 rounded-xl transition-all"
                      >
                        <X size={24} className="sm:w-7 sm:h-7" />
                      </button>
                    </div>
                  </div>

                  {/* Settings Tabs */}
                  <div className="flex gap-0 border-b border-slate-200 dark:border-slate-700 px-3 sm:px-6 overflow-x-auto flex-shrink-0 bg-slate-50 dark:bg-slate-800/50">
                    {(['security', 'privacy', 'notifications'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setSettingsTab(tab)}
                        className={`px-2 sm:px-4 py-2 sm:py-3 font-black text-xs sm:text-sm transition-all border-b-4 whitespace-nowrap ${
                          settingsTab === tab
                            ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                            : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {tab === 'security' && '🔐 Security'}
                        {tab === 'privacy' && '👁️ Privacy'}
                        {tab === 'notifications' && '🔔 Notifications'}
                      </button>
                    ))}
                  </div>

                  {/* Settings Content - Scrollable */}
                  <div className="overflow-y-auto flex-1 px-3 sm:px-6 py-4 sm:py-6 pb-24 sm:pb-16 space-y-4 sm:space-y-6">
                    {/* SECURITY TAB */}
                    {settingsTab === 'security' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-3 sm:p-4 flex gap-2 sm:gap-3">
                          <Shield size={18} className="sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <h4 className="font-black text-sm sm:text-base text-blue-900 dark:text-blue-200">Account Security</h4>
                            <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300 mt-0.5">Manage your password and security settings</p>
                          </div>
                        </div>

                        <div className="border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-3 sm:p-5">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-sm sm:text-base text-slate-900 dark:text-white">Password</p>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Change your account password</p>
                            </div>
                            <button className="flex-shrink-0 px-3 sm:px-4 py-2 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-black text-xs sm:text-sm transition-all w-full sm:w-auto">
                              Change
                            </button>
                          </div>
                        </div>

                        <div className="border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-3 sm:p-5">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                                <Lock size={18} className="flex-shrink-0" />
                                <span>Two-Factor Auth</span>
                              </p>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Extra security layer</p>
                            </div>
                            <button className="flex-shrink-0 px-3 sm:px-4 py-2 sm:py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-black text-xs sm:text-sm transition-all w-full sm:w-auto">
                              {privacySettings.twoFactorEnabled ? 'Disable' : 'Enable'}
                            </button>
                          </div>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl p-4 flex gap-3">
                          <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-black text-red-900 dark:text-red-200">Session Management</h4>
                            <p className="text-sm text-red-800 dark:text-red-300 mt-1">All active sessions are managed securely. For your safety, sessions expire after 30 minutes of inactivity.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* PRIVACY TAB */}
                    {settingsTab === 'privacy' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-700 rounded-xl p-4 flex gap-3">
                          <Eye size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-black text-emerald-900 dark:text-emerald-200">Privacy Controls</h4>
                            <p className="text-sm text-emerald-800 dark:text-emerald-300 mt-1">Control what information is visible on your account</p>
                          </div>
                        </div>

                        {/* Hide Balance Toggle */}
                        <div className="border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-3 sm:p-5">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2\">
                                {privacySettings.hideBalance ? <EyeOff size={18} className="flex-shrink-0" /> : <Eye size={18} className="flex-shrink-0" />}
                                <span>Hide Balance</span>
                              </p>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Hide balance visibility.</p>
                            </div>
                            <button
                              onClick={() => setPrivacySettings({...privacySettings, hideBalance: !privacySettings.hideBalance})}
                              className={`flex-shrink-0 p-3 rounded-xl transition-all ${
                                privacySettings.hideBalance
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {privacySettings.hideBalance ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                            </button>
                          </div>
                        </div>

                        {/* Hide Personal Info Toggle */}
                        <div className="border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-3 sm:p-5">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                                {privacySettings.hidePersonalInfo ? <EyeOff size={18} className="flex-shrink-0" /> : <Eye size={18} className="flex-shrink-0" />}
                                <span>Hide Personal Info</span>
                              </p>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Limit visibility of name and contact details.</p>
                            </div>
                            <button
                              onClick={() => setPrivacySettings({...privacySettings, hidePersonalInfo: !privacySettings.hidePersonalInfo})}
                              className={`flex-shrink-0 p-3 rounded-xl transition-all ${
                                privacySettings.hidePersonalInfo
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {privacySettings.hidePersonalInfo ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                            </button>
                          </div>
                        </div>

                        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 sm:p-6 space-y-3">
                          <p className="font-black text-sm sm:text-base text-slate-900 dark:text-white">Data & Cookies</p>
                          <div className="space-y-2 text-xs sm:text-sm">
                            <label className="flex items-start sm:items-center gap-3 cursor-pointer">
                              <input type="checkbox" defaultChecked className="w-4 h-4 sm:w-5 sm:h-5 rounded flex-shrink-0 mt-0.5 sm:mt-0" />
                              <span className="text-slate-700 dark:text-slate-300">Allow analytics to improve your experience</span>
                            </label>
                            <label className="flex items-start sm:items-center gap-3 cursor-pointer">
                              <input type="checkbox" defaultChecked className="w-4 h-4 sm:w-5 sm:h-5 rounded flex-shrink-0 mt-0.5 sm:mt-0" />
                              <span className="text-slate-700 dark:text-slate-300">Allow essential cookies for account security</span>
                            </label>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* NOTIFICATIONS TAB */}
                    {settingsTab === 'notifications' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-xl p-4 flex gap-3">
                          <AlertCircle size={20} className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-black text-purple-900 dark:text-purple-200">Notification Preferences</h4>
                            <p className="text-sm text-purple-800 dark:text-purple-300 mt-1">Control how you receive updates about your grant</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {[
                            { label: 'Grant Status Updates', description: 'Status change notifications' },
                            { label: 'Balance Available', description: 'Funds available alerts' },
                            { label: 'Security Alerts', description: 'Security notifications' },
                            { label: 'Email Digests', description: 'Weekly activity summary' }
                          ].map((item, idx) => (
                            <div key={idx} className="border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="font-black text-sm sm:text-base text-slate-900 dark:text-white">{item.label}</p>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">{item.description}</p>
                              </div>
                              <input type="checkbox" defaultChecked className="w-5 h-5 rounded cursor-pointer flex-shrink-0" />
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Settings Footer */}
                  <div className="bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-3 sm:px-6 py-3 sm:py-4 flex gap-2 sm:gap-3 flex-shrink-0">
                    <button
                      onClick={() => setShowSettings(false)}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-black text-xs sm:text-sm rounded-lg sm:rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setShowSettings(false);
                        showAlertMessage('✅ Settings saved successfully!');
                      }}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-lg sm:rounded-xl transition-all"
                    >
                      Save Changes
                    </button>
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
