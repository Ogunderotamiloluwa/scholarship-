import React, { useState } from 'react';
import { Applicant } from '../types';
import { Shield, X, User, Book, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FormSubmissionFeedback from './FormSubmissionFeedback';


interface ApplyFormProps {
  onSubmit: (data: Omit<Applicant, 'id' | 'status' | 'submissionDate' | 'score'>) => void;
  onCancel: () => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  university?: string;
  gpa?: string;
  major?: string;
  essay?: string;
}

const ApplyForm: React.FC<ApplyFormProps> = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '',
    gpa: 0, 
    university: '', 
    major: '', 
    essay: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'gpa' ? (value ? parseFloat(value) : 0) : value 
    }));
    // Clear specific error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name as keyof FormErrors];
        return newErrs;
      });
    }
  };

  // Validate Step 1: Personal Information
  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName || formData.firstName.trim() === '') {
      newErrors.firstName = '✗ First name is required';
    }
    if (!formData.lastName || formData.lastName.trim() === '') {
      newErrors.lastName = '✗ Last name is required';
    }
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = '✗ Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = '✗ Please enter a valid email address';
    }
    if (!formData.phone || formData.phone.trim() === '') {
      newErrors.phone = '✗ Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 2: Academic Information
  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.university || formData.university.trim() === '') {
      newErrors.university = '✗ University name is required';
    }
    if (!formData.gpa || formData.gpa < 2.0 || formData.gpa > 4.0) {
      newErrors.gpa = '✗ Please enter a valid GPA between 2.0 and 4.0';
    }
    if (!formData.major || formData.major.trim() === '') {
      newErrors.major = '✗ Major/Field of study is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 3: Essay
  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.essay || formData.essay.trim() === '') {
      newErrors.essay = '✗ Essay is required - please tell us about your vision';
    } else if (formData.essay.trim().length < 50) {
      newErrors.essay = `✗ Essay must be at least 50 characters (currently ${formData.essay.trim().length})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next Step
  const handleNextStep = () => {
    let isValid = false;

    if (step === 1) {
      isValid = validateStep1();
    } else if (step === 2) {
      isValid = validateStep2();
    } else if (step === 3) {
      isValid = validateStep3();
    }

    if (isValid) {
      if (step === 3) {
        setStep(4);
      } else {
        setStep(step + 1);
        setErrors({});
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle Previous Step
  const handlePrevStep = () => {
    setErrors({});
    setStep(step - 1);
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    // Validate all fields one final time before submission
    const allErrors: FormErrors = {};

    // Step 1 validation
    if (!formData.firstName || formData.firstName.trim() === '') {
      allErrors.firstName = '✗ First name is required';
    }
    if (!formData.lastName || formData.lastName.trim() === '') {
      allErrors.lastName = '✗ Last name is required';
    }
    if (!formData.email || formData.email.trim() === '') {
      allErrors.email = '✗ Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      allErrors.email = '✗ Please enter a valid email address';
    }
    if (!formData.phone || formData.phone.trim() === '') {
      allErrors.phone = '✗ Phone number is required';
    }

    // Step 2 validation
    if (!formData.university || formData.university.trim() === '') {
      allErrors.university = '✗ University name is required';
    }
    if (!formData.gpa || formData.gpa < 2.0 || formData.gpa > 4.0) {
      allErrors.gpa = '✗ Please enter a valid GPA between 2.0 and 4.0';
    }
    if (!formData.major || formData.major.trim() === '') {
      allErrors.major = '✗ Major/Field of study is required';
    }

    // Step 3 validation
    if (!formData.essay || formData.essay.trim() === '') {
      allErrors.essay = '✗ Essay is required - please tell us about your vision';
    } else if (formData.essay.trim().length < 50) {
      allErrors.essay = `✗ Essay must be at least 50 characters (currently ${formData.essay.trim().length})`;
    }

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // All validation passed, submit the form
    setIsLoading(true);
    setShowFeedback(true);
    
    try {
      // Create FormData object with proper Formspree fields
      const submitFormData = new FormData();
      submitFormData.append('firstName', formData.firstName);
      submitFormData.append('lastName', formData.lastName);
      submitFormData.append('email', formData.email);
      submitFormData.append('phone', formData.phone);
      submitFormData.append('university', formData.university);
      submitFormData.append('gpa', String(formData.gpa));
      submitFormData.append('major', formData.major);
      submitFormData.append('essay', formData.essay);
      submitFormData.append('formType', 'Scholarship Application');
      submitFormData.append('timestamp', new Date().toISOString());
      
      // Formspree special fields for proper email handling
      submitFormData.append('_subject', `New Scholarship Application from ${formData.firstName} ${formData.lastName}`);
      submitFormData.append('_replyto', formData.email);
      submitFormData.append('_gotcha', ''); // Honeypot field
      
      console.log('📤 Submitting scholarship form...');
      const response = await fetch('https://formspree.io/f/mvzgeadj', {
        method: 'POST',
        body: submitFormData,
      });
      
      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }
      
      const responseData = await response.json();
      console.log('✅ Scholarship application sent successfully!');
      console.log('📧 Response:', responseData);
      console.log('📧 Check your email inbox for confirmation');
    } catch (error) {
      console.error('❌ Scholarship submission error:', error);
      throw error;
    }
    
    // Simulate 4 second loading before showing success message
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    // Submit after the loading period
    setTimeout(() => {
      onSubmit(formData);
      // Don't close immediately - let user see the message for 30 seconds
    }, 7000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 md:py-32 px-6">
      <FormSubmissionFeedback 
        isVisible={showFeedback}
        isLoading={isLoading}
        onClose={() => {
          setShowFeedback(false);
          onCancel();
        }}
        title="Thank You for Your Application!"
        message="We've successfully received your scholarship application. Our team will review your information and get in touch with you soon."
      />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-16 md:mb-20">
          <div className="space-y-6">
             <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em]"><Shield size={12}/> Secure US Hub V2.5</div>
             <h1 className="heading-serif text-6xl md:text-9xl font-black text-slate-900 tracking-tighter leading-none">Apply.</h1>
          </div>
          <button onClick={onCancel} className="p-5 bg-white rounded-full text-slate-300 hover:text-slate-600 hover:shadow-xl transition-all active:scale-90 border border-slate-100"><X size={28}/></button>
        </div>

        {/* Stepper Progress */}
        <div className="flex gap-4 md:gap-6 mb-20 md:mb-24">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex-grow space-y-4">
               <div className={`h-2.5 rounded-full transition-all duration-1000 ${step >= s ? 'bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.3)]' : 'bg-slate-200'}`} />
               <div className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] text-center ${step >= s ? 'text-indigo-600' : 'text-slate-300'}`}>
                 Step 0{s}
               </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[56px] md:rounded-[80px] shadow-[0_60px_120px_rgba(0,0,0,0.04)] border border-slate-100 p-8 md:p-32 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-16">
                 <h3 className="text-3xl md:text-4xl font-black mb-16 flex items-center gap-6"><User className="text-indigo-600" size={40}/> Personal Information</h3>
                 
                 {/* Error Summary Box - Shows only if there are errors */}
                 {Object.keys(errors).length > 0 && (
                   <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
                     <div className="flex items-start gap-3 mb-3">
                       <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                       <p className="text-red-700 font-black text-sm">❌ PLEASE COMPLETE ALL REQUIRED FIELDS:</p>
                     </div>
                     <ul className="space-y-2 ml-8">
                       {Object.entries(errors).map(([key, error]) => (
                         <li key={key} className="text-red-600 text-sm font-semibold">{error}</li>
                       ))}
                     </ul>
                   </motion.div>
                 )}

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">First Name <span className="text-red-600 font-black">*</span></label>
                       <input 
                         name="firstName" 
                         value={formData.firstName} 
                         onChange={handleChange} 
                         className={`w-full h-20 px-10 bg-slate-50 rounded-[28px] outline-none font-bold text-2xl border-2 transition-all shadow-inner focus:bg-white ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                         placeholder="John" 
                       />
                       {errors.firstName && <p className="text-red-600 text-xs font-bold px-2">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-4">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Last Name <span className="text-red-600 font-black">*</span></label>
                       <input 
                         name="lastName" 
                         value={formData.lastName} 
                         onChange={handleChange} 
                         className={`w-full h-20 px-10 bg-slate-50 rounded-[28px] outline-none font-bold text-2xl border-2 transition-all shadow-inner focus:bg-white ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                         placeholder="Doe" 
                       />
                       {errors.lastName && <p className="text-red-600 text-xs font-bold px-2">{errors.lastName}</p>}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Email Address <span className="text-red-600 font-black">*</span></label>
                    <input 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      type="email"
                      className={`w-full h-20 px-10 bg-slate-50 rounded-[28px] outline-none font-bold text-2xl border-2 transition-all shadow-inner focus:bg-white ${errors.email ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                      placeholder="john@university.edu" 
                    />
                    {errors.email && <p className="text-red-600 text-xs font-bold px-2">{errors.email}</p>}
                 </div>
                 <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Phone Number <span className="text-red-600 font-black">*</span></label>
                    <input 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      type="tel"
                      className={`w-full h-20 px-10 bg-slate-50 rounded-[28px] outline-none font-bold text-2xl border-2 transition-all shadow-inner focus:bg-white ${errors.phone ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                      placeholder="+1 (555) 123-4567" 
                    />
                    {errors.phone && <p className="text-red-600 text-xs font-bold px-2">{errors.phone}</p>}
                 </div>
                 <button onClick={handleNextStep} className="w-full py-4 md:py-8 bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-lg md:rounded-[32px] font-black uppercase tracking-[0.1em] md:tracking-[0.3em] shadow-2xl hover:shadow-slate-700/50 active:scale-95 transition-all duration-200 text-xs md:text-sm hover:from-slate-800 hover:to-slate-900">Proceed to Academics</button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-16">
                 <h3 className="text-3xl md:text-4xl font-black mb-16 flex items-center gap-6"><Book className="text-indigo-600" size={40}/> Academic Records</h3>
                 
                 {Object.keys(errors).length > 0 && (
                   <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
                     <div className="flex items-start gap-3 mb-3">
                       <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                       <p className="text-red-700 font-black text-sm">❌ PLEASE COMPLETE ALL REQUIRED FIELDS:</p>
                     </div>
                     <ul className="space-y-2 ml-8">
                       {Object.entries(errors).map(([key, error]) => (
                         <li key={key} className="text-red-600 text-sm font-semibold">{error}</li>
                       ))}
                     </ul>
                   </motion.div>
                 )}

                 <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Current University <span className="text-red-600 font-black">*</span></label>
                    <input 
                      name="university" 
                      value={formData.university} 
                      onChange={handleChange} 
                      className={`w-full h-20 px-10 bg-slate-50 rounded-[28px] outline-none font-bold text-2xl border-2 transition-all shadow-inner focus:bg-white ${errors.university ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                      placeholder="e.g., Harvard University" 
                    />
                    {errors.university && <p className="text-red-600 text-xs font-bold px-2">{errors.university}</p>}
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Weighted GPA <span className="text-red-600 font-black">*</span></label>
                       <input 
                         type="number" 
                         step="0.01" 
                         name="gpa" 
                         value={formData.gpa || ''} 
                         onChange={handleChange} 
                         className={`w-full h-20 px-10 bg-slate-50 rounded-[28px] outline-none font-bold text-2xl border-2 transition-all shadow-inner focus:bg-white ${errors.gpa ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                         placeholder="3.85" 
                       />
                       {errors.gpa && <p className="text-red-600 text-xs font-bold px-2">{errors.gpa}</p>}
                    </div>
                    <div className="space-y-4">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">Primary Field <span className="text-red-600 font-black">*</span></label>
                       <input 
                         name="major" 
                         value={formData.major} 
                         onChange={handleChange} 
                         className={`w-full h-20 px-10 bg-slate-50 rounded-[28px] outline-none font-bold text-2xl border-2 transition-all shadow-inner focus:bg-white ${errors.major ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                         placeholder="e.g., Computer Science" 
                       />
                       {errors.major && <p className="text-red-600 text-xs font-bold px-2">{errors.major}</p>}
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <button onClick={handlePrevStep} className="px-4 md:px-12 py-3 md:py-8 border-2 border-slate-100 rounded-lg md:rounded-[32px] font-black uppercase tracking-[0.08em] md:tracking-widest text-slate-400 hover:bg-slate-50 active:scale-95 transition-all duration-200 text-xs md:text-base">Back</button>
                    <button onClick={handleNextStep} className="flex-grow py-4 md:py-8 bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-lg md:rounded-[32px] font-black uppercase tracking-[0.1em] md:tracking-[0.3em] shadow-2xl hover:shadow-slate-700/50 active:scale-95 transition-all duration-200 text-xs md:text-sm hover:from-slate-800 hover:to-slate-900">Proceed to Essay</button>
                 </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-16">
                 <h3 className="text-3xl md:text-4xl font-black mb-8 flex items-center gap-6"><FileText className="text-indigo-600" size={40}/> Your Story</h3>
                 <p className="text-slate-500 text-2xl font-light italic leading-relaxed">"Explain your educational vision and intended community impact."</p>
                 
                 {errors.essay && (
                   <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                     <div className="flex items-start gap-3">
                       <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                       <div>
                         <p className="text-red-700 font-black text-sm mb-2">❌ ESSAY IS REQUIRED</p>
                         <p className="text-red-600 text-sm">{errors.essay}</p>
                       </div>
                     </div>
                   </motion.div>
                 )}

                 <textarea 
                   name="essay" 
                   value={formData.essay} 
                   onChange={handleChange} 
                   className={`w-full h-96 p-10 bg-slate-50 rounded-[56px] outline-none font-serif text-3xl leading-relaxed resize-none border-2 transition-all shadow-inner focus:bg-white ${errors.essay ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                   placeholder="Share your educational goals, dreams, and how you plan to make a positive impact in your community..." 
                 />
                 <div className={`text-sm font-semibold px-2 ${formData.essay.length >= 50 ? 'text-emerald-600' : 'text-slate-500'}`}>
                   ✓ Character count: {formData.essay.length} / 50 (minimum required)
                 </div>
                 <div className="flex gap-6">
                    <button onClick={handlePrevStep} className="px-4 md:px-12 py-3 md:py-8 border-2 border-slate-100 rounded-lg md:rounded-[32px] font-black uppercase tracking-[0.08em] md:tracking-widest text-slate-400 hover:bg-slate-50 active:scale-95 transition-all duration-200 text-xs md:text-base">Back</button>
                    <button onClick={handleNextStep} className="flex-grow py-4 md:py-8 bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-lg md:rounded-[32px] font-black uppercase tracking-[0.1em] md:tracking-[0.3em] shadow-2xl hover:shadow-slate-700/50 active:scale-95 transition-all duration-200 text-xs md:text-sm hover:from-slate-800 hover:to-slate-900">Review Application</button>
                 </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                 <h3 className="text-3xl md:text-4xl font-black mb-12 flex items-center gap-6"><CheckCircle2 className="text-emerald-600" size={40}/> Review Your Application</h3>
                 
                 {/* Personal Information Review */}
                 <div className="bg-slate-50 rounded-[32px] p-8 border-2 border-slate-100">
                    <h4 className="font-black text-lg text-slate-900 mb-6 uppercase tracking-wider">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                         <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">First Name</p>
                         <p className="text-slate-900 text-lg font-bold">{formData.firstName}</p>
                       </div>
                       <div>
                         <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Last Name</p>
                         <p className="text-slate-900 text-lg font-bold">{formData.lastName}</p>
                       </div>
                       <div>
                         <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Email</p>
                         <p className="text-slate-900 text-lg font-bold">{formData.email}</p>
                       </div>
                       <div>
                         <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Phone</p>
                         <p className="text-slate-900 text-lg font-bold">{formData.phone}</p>
                       </div>
                    </div>
                 </div>

                 {/* Academic Information Review */}
                 <div className="bg-slate-50 rounded-[32px] p-8 border-2 border-slate-100">
                    <h4 className="font-black text-lg text-slate-900 mb-6 uppercase tracking-wider">Academic Records</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div>
                         <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">University</p>
                         <p className="text-slate-900 text-lg font-bold">{formData.university}</p>
                       </div>
                       <div>
                         <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">GPA</p>
                         <p className="text-slate-900 text-lg font-bold">{formData.gpa}</p>
                       </div>
                       <div>
                         <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Field of Study</p>
                         <p className="text-slate-900 text-lg font-bold">{formData.major}</p>
                       </div>
                    </div>
                 </div>

                 {/* Essay Review */}
                 <div className="bg-slate-50 rounded-[32px] p-8 border-2 border-slate-100">
                    <h4 className="font-black text-lg text-slate-900 mb-6 uppercase tracking-wider">Your Story ({formData.essay.length} characters)</h4>
                    <div className="bg-white rounded-[24px] p-8 border-2 border-slate-100">
                       <p className="text-slate-700 text-lg leading-relaxed font-serif whitespace-pre-wrap">{formData.essay}</p>
                    </div>
                 </div>

                 {/* Application Fee Notice */}
                 <div className="bg-amber-50 border-2 border-amber-200 rounded-[32px] p-8">
                    <p className="text-amber-900 font-black text-lg mb-3">💰 Application Fee</p>
                    <p className="text-amber-800 mb-3">A processing fee of <span className="font-black text-amber-900">$200.00</span> is required for scholarship processing and administration.</p>
                    <p className="text-amber-800 text-sm">This will be discussed and arranged when our team contacts you.</p>
                 </div>

                 {/* Action Buttons */}
                 <div className="flex gap-4 pt-8">
                    <button 
                       onClick={handlePrevStep}
                       disabled={isLoading}
                       className="px-12 py-8 border-2 border-slate-100 rounded-[32px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                       Edit
                    </button>
                    <button 
                       onClick={handleSubmit}
                       disabled={isLoading}
                       className="flex-grow py-3 md:py-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-emerald-400 disabled:to-teal-400 text-white rounded-lg md:rounded-[32px] font-black uppercase tracking-[0.1em] md:tracking-[0.3em] shadow-lg md:shadow-2xl hover:shadow-emerald-500/50 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1 md:gap-4 disabled:cursor-not-allowed text-xs md:text-base px-2 md:px-4"
                    >
                       <CheckCircle2 size={16} className="md:size-6 flex-shrink-0" />
                       <span className="truncate">{isLoading ? 'Sending...' : 'Submit Application'}</span>
                    </button>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;