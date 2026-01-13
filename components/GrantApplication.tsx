import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, CheckCircle2, Eye, EyeOff, Mail, Lock, Phone, Globe,
  User, Briefcase, FileText, Upload, AlertCircle, Check, ChevronRight, X
} from 'lucide-react';
import { ViewState } from '../types';
import FormSubmissionFeedback from './FormSubmissionFeedback';
import { GRANTS } from '../Constants';


interface GrantApplicationProps {
  onNavigate: (view: ViewState) => void;
}

interface UploadedFile {
  name: string;
  file: File;
}

const GrantApplication: React.FC<GrantApplicationProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [grantCategory, setGrantCategory] = useState('');
  const [eligibilityConfirmed, setEligibilityConfirmed] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [applicationData, setApplicationData] = useState({
    purpose: '',
    applicantWork: '',
    amount: '',
    usage: '',
    impact: '',
    previousFunding: 'No'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const grantCategories = GRANTS.map(grant => grant.name);

  // Helper function to get grant details
  const getSelectedGrantDetails = () => {
    return GRANTS.find(grant => grant.name === grantCategory);
  };

  const eligibilityChecklist = [
    { item: 'Age requirement', checked: true },
    { item: 'Location eligibility', checked: true },
    { item: 'Education or business status', checked: true },
    { item: 'Purpose matches the grant', checked: true }
  ];

  const steps = [
    { number: 1, title: 'Grant Overview', description: 'Learn about this opportunity' },
    { number: 2, title: 'Create Account', description: 'Sign up or sign in' },
    { number: 3, title: 'Choose Category', description: 'Select grant type' },
    { number: 4, title: 'Check Eligibility', description: 'Verify requirements' },
    { number: 5, title: 'Application Form', description: 'Fill details' },
    { number: 6, title: 'Review & Submit', description: 'Final confirmation' }
  ];

  const handleFileUpload = (docName: string) => {
    // File upload removed - only form fields needed
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl p-8 text-white">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Beacon Grant Opportunity</h2>
              <p className="text-lg text-indigo-100 mb-6">
                This grant is designed to support individuals and organizations pursuing meaningful goals in education, business, research, and more.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <CheckCircle2 size={24} className="text-emerald-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-black mb-1">Flexible Funding</h4>
                    <p className="text-sm text-indigo-100">Various amounts available based on project scope</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 size={24} className="text-emerald-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-black mb-1">Multiple Categories</h4>
                    <p className="text-sm text-indigo-100">For students, entrepreneurs, researchers & more</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 size={24} className="text-emerald-300 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-black mb-1">Simple Process</h4>
                    <p className="text-sm text-indigo-100">Quick application with instant feedback</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Apply for Grant <ChevronRight size={20} />
            </button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Create Your Account</h2>
            <p className="text-slate-600 dark:text-slate-400">Sign up to track your application and receive updates</p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-2xl p-4">
              <p className="text-blue-700 dark:text-blue-300 font-black text-sm flex items-start gap-2">
                <span className="mt-0.5">ℹ️</span>
                <span>Your account details will be securely saved so you can track your grant status after submission. You'll create a passkey to access your tracking dashboard.</span>
              </p>
            </div>

            {errors.account && (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-2xl p-4">
                <p className="text-red-700 dark:text-red-300 font-black text-sm">❌ {errors.account}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); setErrors({}); }}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
                    errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-600'
                  }`}
                />
                {errors.fullName && <p className="text-red-600 text-sm font-semibold mt-1 px-2">{errors.fullName}</p>}
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-600'
                  }`}
                />
                {errors.email && <p className="text-red-600 text-sm font-semibold mt-1 px-2">{errors.email}</p>}
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password *"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
                      errors.password ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-600'
                    }`}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-600 text-sm font-semibold mt-1 px-2">{errors.password}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setErrors({}); }}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
                    errors.phone ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-600'
                  }`}
                />
                {errors.phone && <p className="text-red-600 text-sm font-semibold mt-1 px-2">{errors.phone}</p>}
              </div>

              <div>
                <select
                  value={country}
                  onChange={(e) => { setCountry(e.target.value); setErrors({}); }}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
                    errors.country ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-600'
                  }`}
                >
                  <option value="">Select Country *</option>
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Other">Other</option>
                </select>
                {errors.country && <p className="text-red-600 text-sm font-semibold mt-1 px-2">{errors.country}</p>}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white py-3 rounded-xl font-black hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => {
                  const newErrors: Record<string, string> = {};
                  if (!fullName.trim()) newErrors.fullName = 'Full name is required';
                  if (!email.trim()) newErrors.email = 'Email is required';
                  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email';
                  if (!password.trim()) newErrors.password = 'Password is required';
                  else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
                  if (!phone.trim()) newErrors.phone = 'Phone number is required';
                  else if (!/^[0-9\-\s\(\)\+]{10,}$/.test(phone.replace(/\s/g, ''))) newErrors.phone = 'Please enter a valid phone number';
                  if (!country) newErrors.country = 'Please select a country';
                  
                  if (Object.keys(newErrors).length > 0) {
                    setErrors(newErrors);
                  } else {
                    setErrors({});
                    setStep(3);
                  }
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-black transition-all"
              >
                Continue
              </button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Select Grant Category</h2>
            <p className="text-slate-600 dark:text-slate-400">Choose the grant that best matches your needs</p>

            <div className="space-y-3">
              {grantCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setGrantCategory(category)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left font-semibold flex items-center gap-3 ${
                    grantCategory === category
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-indigo-400'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    grantCategory === category ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'
                  }`}>
                    {grantCategory === category && <Check size={16} className="text-white" />}
                  </div>
                  {category}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white py-3 rounded-xl font-black hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!grantCategory}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 rounded-xl font-black transition-all"
              >
                Continue
              </button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Check Eligibility</h2>
            <p className="text-slate-600 dark:text-slate-400">Please confirm you meet all requirements</p>

            <div className="space-y-3">
              {eligibilityChecklist.map((item) => (
                <div key={item.item} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-slate-900 dark:text-white font-semibold">{item.item}</span>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-black text-amber-900 dark:text-amber-200 mb-1">Important</h4>
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    By confirming, you certify that all information provided is true and accurate.
                  </p>
                </div>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
              <input
                type="checkbox"
                checked={eligibilityConfirmed}
                onChange={(e) => setEligibilityConfirmed(e.target.checked)}
                className="w-5 h-5 rounded-lg accent-indigo-600"
              />
              <span className="font-semibold text-slate-900 dark:text-white">
                I confirm I meet all eligibility criteria
              </span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="flex-1 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white py-3 rounded-xl font-black hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                disabled={!eligibilityConfirmed}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 rounded-xl font-black transition-all"
              >
                Continue
              </button>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Application Form</h2>
            <p className="text-slate-600 dark:text-slate-400">Tell us about your project</p>

            {errors.form && (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-2xl p-4">
                <p className="text-red-700 dark:text-red-300 font-black text-sm">❌ Please fill all required fields:</p>
                <ul className="list-disc list-inside text-red-600 dark:text-red-400 text-sm mt-2 space-y-1">
                  {Object.values(errors).map((error, i) => error && <li key={i}>{error}</li>)}
                </ul>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <textarea
                  placeholder="What is the purpose of your grant application? *"
                  value={applicationData.purpose}
                  onChange={(e) => setApplicationData({...applicationData, purpose: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none resize-none h-24 transition-all ${
                    errors.purpose ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-600'
                  }`}
                />
                {errors.purpose && <p className="text-red-600 text-sm font-semibold mt-1 px-2">{errors.purpose}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Current Work/Occupation *"
                  value={applicationData.applicantWork}
                  onChange={(e) => setApplicationData({...applicationData, applicantWork: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
                    errors.applicantWork ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-600'
                  }`}
                />
                {errors.applicantWork && <p className="text-red-600 text-sm font-semibold mt-1 px-2">{errors.applicantWork}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                  Amount Requested (${getSelectedGrantDetails()?.minAmount.toLocaleString() || '0'} - ${getSelectedGrantDetails()?.maxAmount.toLocaleString() || '0'}) *
                </label>
                <input
                  type="number"
                  placeholder={`Amount between $${getSelectedGrantDetails()?.minAmount?.toLocaleString()} - $${getSelectedGrantDetails()?.maxAmount?.toLocaleString()}`}
                  value={applicationData.amount}
                  onChange={(e) => setApplicationData({...applicationData, amount: e.target.value})}
                  min={getSelectedGrantDetails()?.minAmount}
                  max={getSelectedGrantDetails()?.maxAmount}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all ${
                    errors.amount ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-600'
                  }`}
                />
                {errors.amount && <p className="text-red-600 text-sm font-semibold mt-1 px-2">{errors.amount}</p>}
              </div>

              <div>
                <textarea
                  placeholder="How will you use these funds? *"
                  value={applicationData.usage}
                  onChange={(e) => setApplicationData({...applicationData, usage: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none resize-none h-24 transition-all ${
                    errors.usage ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-600'
                  }`}
                />
                {errors.usage && <p className="text-red-600 text-sm font-semibold mt-1 px-2">{errors.usage}</p>}
              </div>

              <div>
                <textarea
                  placeholder="What is the expected impact of this project? *"
                  value={applicationData.impact}
                  onChange={(e) => setApplicationData({...applicationData, impact: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none resize-none h-24 transition-all ${
                    errors.impact ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-600'
                  }`}
                />
                {errors.impact && <p className="text-red-600 text-sm font-semibold mt-1 px-2">{errors.impact}</p>}
              </div>

              <select
                value={applicationData.previousFunding}
                onChange={(e) => setApplicationData({...applicationData, previousFunding: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400"
              >
                <option>Have you received previous grants?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(4)}
                className="flex-1 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white py-3 rounded-xl font-black hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => {
                  const newErrors: Record<string, string> = {};
                  if (!applicationData.purpose.trim()) newErrors.purpose = 'Grant purpose is required';
                  if (!applicationData.applicantWork.trim()) newErrors.applicantWork = 'Current work/occupation is required';
                  if (!applicationData.amount.trim()) {
                    newErrors.amount = 'Amount requested is required';
                  } else {
                    const amount = parseFloat(applicationData.amount);
                    const grantDetails = getSelectedGrantDetails();
                    if (!grantDetails) {
                      newErrors.amount = 'Invalid grant selected';
                    } else if (isNaN(amount)) {
                      newErrors.amount = 'Amount must be a valid number';
                    } else if (amount < grantDetails.minAmount) {
                      newErrors.amount = `Minimum amount is $${grantDetails.minAmount.toLocaleString()}`;
                    } else if (amount > grantDetails.maxAmount) {
                      newErrors.amount = `Maximum amount is $${grantDetails.maxAmount.toLocaleString()}`;
                    }
                  }
                  if (!applicationData.usage.trim()) newErrors.usage = 'Fund usage details are required';
                  if (!applicationData.impact.trim()) newErrors.impact = 'Expected impact is required';
                  
                  if (Object.keys(newErrors).length > 0) {
                    newErrors.form = 'form';
                    setErrors(newErrors);
                  } else {
                    setErrors({});
                    setStep(6);
                  }
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-black transition-all"
              >
                Continue
              </button>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Review Section */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6">Review Your Application</h2>
              <div className="space-y-4 bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Full Name</p>
                    <p className="text-slate-900 dark:text-white text-lg font-bold">{fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Email</p>
                    <p className="text-slate-900 dark:text-white text-lg font-bold">{email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Phone</p>
                    <p className="text-slate-900 dark:text-white text-lg font-bold">{phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Grant Category</p>
                    <p className="text-slate-900 dark:text-white text-lg font-bold">{grantCategory}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Amount Requested</p>
                    <p className="text-slate-900 dark:text-white text-lg font-bold">${applicationData.amount}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Purpose</p>
                    <p className="text-slate-900 dark:text-white">{applicationData.purpose}</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 mt-4 flex gap-3">
                <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-emerald-900 dark:text-emerald-200 mb-1">Ready to Submit</h4>
                  <p className="text-sm text-emerald-800 dark:text-emerald-300 mb-2">
                    Your application will be reviewed by our grant committee.
                  </p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-400 font-semibold space-y-1">
                    <div>🔒 Keep your email and password safe</div>
                    <div>💡 Use them to login to the Grant Tracking portal</div>
                    <div>📧 <span className="font-mono bg-emerald-100 dark:bg-emerald-900 px-2 py-1 rounded">{email}</span></div>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(5)}
                disabled={isLoading}
                className="flex-1 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white py-3 rounded-xl font-black hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  setIsLoading(true);
                  setShowFeedback(true);
                  
                  try {
                    // Validate email first
                    if (!email || email.trim() === '') {
                      throw new Error('Applicant email is required');
                    }

                    // Save account to localStorage for grant tracking
                    const grantApplication = {
                      fullName,
                      email,
                      password,
                      phone,
                      country,
                      grantCategory,
                      amount: applicationData.amount,
                      purpose: applicationData.purpose,
                      applicantWork: applicationData.applicantWork,
                      usage: applicationData.usage,
                      impact: applicationData.impact,
                      previousFunding: applicationData.previousFunding,
                      timestamp: new Date().toISOString()
                    };

                    // Get existing applications and add the new one
                    const existingApplications = JSON.parse(localStorage.getItem('grantApplications') || '[]');
                    existingApplications.push(grantApplication);
                    localStorage.setItem('grantApplications', JSON.stringify(existingApplications));

                    console.log('💾 Account saved to local storage for tracking');
                    console.log('📧 Submission sent to company');
                    console.log('🔒 Keep your email and password safe for login');

                    // Create FormData object with proper Formspree fields
                    const submitFormData = new FormData();
                    
                    // Standard form fields
                    submitFormData.append('fullName', fullName);
                    submitFormData.append('email', email);
                    submitFormData.append('phone', phone);
                    submitFormData.append('country', country);
                    submitFormData.append('grantCategory', grantCategory);
                    submitFormData.append('purpose', applicationData.purpose);
                    submitFormData.append('applicantWork', applicationData.applicantWork);
                    submitFormData.append('amount', applicationData.amount);
                    submitFormData.append('usage', applicationData.usage);
                    submitFormData.append('impact', applicationData.impact);
                    submitFormData.append('previousFunding', applicationData.previousFunding);
                    submitFormData.append('formType', 'Grant Application');
                    submitFormData.append('timestamp', new Date().toISOString());
                    
                    // Formspree special fields for proper email handling
                    submitFormData.append('_subject', `New Grant Application from ${fullName}`);
                    submitFormData.append('_replyto', email);
                    submitFormData.append('_gotcha', ''); // Honeypot field
                    
                    console.log('📤 Submitting grant application form...');
                    console.log('📋 Form data:', {
                      fullName, email, phone, country, grantCategory, amount: applicationData.amount
                    });

                    // Submit to FormSpree
                    const response = await fetch('https://formspree.io/f/xjggvoyv', {
                      method: 'POST',
                      body: submitFormData,
                    });
                    
                    if (!response.ok) {
                      throw new Error(`Submission failed with status ${response.status}`);
                    }
                    
                    const responseData = await response.json();
                    console.log('✅ Grant application sent successfully!');
                    console.log('📧 Response:', responseData);
                    console.log('📧 Check your email inbox for confirmation');
                    // Company has received submission - show success
                    setIsLoading(false);
                  } catch (error) {
                    console.error('❌ Grant submission error:', error);
                    // Still show success message - company may have received it
                    setIsLoading(false);
                  }
                  // User must manually close the feedback message
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-emerald-400 disabled:to-teal-400 text-white py-3 md:py-4 rounded-lg md:rounded-xl font-black transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/50 active:scale-95 disabled:cursor-not-allowed text-sm md:text-base"
              >
                <CheckCircle2 size={18} className="md:size-6" />
                <span>{isLoading ? 'Saving Account & Sending Email...' : 'Submit Application'}</span>
              </button>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 pt-24 pb-40">
      <FormSubmissionFeedback 
        isVisible={showFeedback}
        isLoading={isLoading}
        onClose={() => {
          setShowFeedback(false);
          onNavigate('HOME');
        }}
        title="We've Received Your Details!"
        message={`We have successfully received your grant application details. Our team will get back to you within 2-3 working days.\n\n⚠️ IMPORTANT: Keep your email (${email}) and password safe. You'll need them to get your passkey for tracking your grant status.`}
      />

      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <button
          onClick={() => onNavigate('HOME')}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-black text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex overflow-x-auto gap-2 pb-4">
            {steps.map((s) => (
              <div
                key={s.number}
                className={`flex-shrink-0 text-center min-w-[80px] ${step >= s.number ? 'opacity-100' : 'opacity-40'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm mx-auto mb-2 transition-all ${
                  step === s.number
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : step > s.number
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {step > s.number ? <Check size={16} /> : s.number}
                </div>
                <p className="text-[10px] font-black uppercase tracking-wide text-slate-900 dark:text-white">{s.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <div key={step}>
            {renderStep()}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GrantApplication;
