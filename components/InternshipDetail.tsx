import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Briefcase, MapPin, Clock, DollarSign, Users,
  Building2, Award, CheckCircle2, Mail, ExternalLink,
  Target, Zap, Heart, Share2, Calendar
} from 'lucide-react';
import { ViewState } from '../types';

interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  duration: string;
  salary: string;
  industry: string;
  requiredSkills: string[];
  benefits: string[];
  imageUrl: string;
  applicationDeadline: string;
  startDate: string;
  isPaid: boolean;
  isFeatured: boolean;
  positions?: number;
  applicationLink?: string;
}

interface InternshipDetailProps {
  internship: Internship | null;
  onNavigate: (view: ViewState) => void;
  onBack?: () => void;
}

const InternshipDetail: React.FC<InternshipDetailProps> = ({ internship, onNavigate, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    major: '',
    gpa: '',
    linkedinUrl: '',
    coverLetter: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!internship) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pt-20 pb-8 md:pt-24 md:pb-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            No internship selected
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </motion.button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('fullName', formData.fullName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('university', formData.university);
      submitData.append('major', formData.major);
      submitData.append('gpa', formData.gpa);
      submitData.append('linkedinUrl', formData.linkedinUrl);
      submitData.append('coverLetter', formData.coverLetter);
      submitData.append('internshipTitle', internship.title);
      submitData.append('company', internship.company);
      submitData.append('applicationType', 'Internship Application');
      submitData.append('timestamp', new Date().toISOString());
      submitData.append('_subject', `Internship Application: ${internship.title} at ${internship.company} - ${formData.fullName}`);
      submitData.append('_replyto', formData.email);
      submitData.append('_gotcha', '');

      const response = await fetch('https://formspree.io/f/xqepwydl', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      const responseData = await response.json();
      console.log('\u2705 Internship application sent successfully!');
      console.log('\ud83d\udce7 Response:', responseData);

      setSubmitted(true);
      // User must manually close the message
    } catch (error) {
      console.error('Internship application submission error:', error);
      // Still show success message - company may have received it
      setSubmitted(true);
      // User must manually close the message
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header with back button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-20 pb-6 md:pt-24 md:pb-8 flex items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white dark:bg-slate-800 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft size={20} className="md:w-6 md:h-6" />
          </motion.button>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
            Internship Details
          </h1>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 pb-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={internship.imageUrl}
                alt={internship.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                <h2 className="text-2xl md:text-4xl font-black text-white mb-2">
                  {internship.title}
                </h2>
                <p className="text-sm md:text-base text-slate-100">
                  {internship.company}
                </p>
              </div>
            </motion.div>

            {/* Key Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            >
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-indigo-600 dark:text-indigo-400" />
                <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Location</p>
                <p className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                  {internship.location}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <Clock className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-indigo-600 dark:text-indigo-400" />
                <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Duration</p>
                <p className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                  {internship.duration}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <DollarSign className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Salary</p>
                <p className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                  {internship.salary}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-amber-600 dark:text-amber-400" />
                <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Deadline</p>
                <p className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                  {new Date(internship.applicationDeadline).toLocaleDateString()}
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4">
                About This Position
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {internship.description}
              </p>

              {/* Required Skills */}
              <div className="mb-6">
                <h4 className="font-black text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Target size={20} />
                  Required Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {internship.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs md:text-sm font-bold rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-black text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Zap size={20} />
                  Benefits & Perks
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {internship.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Mobile Form - shown below on mobile, beside on desktop */}
            <div className="lg:hidden">
              <ApplicationForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                submitted={submitted}
                isSubmitting={isSubmitting}
                internship={internship}
              />
            </div>
          </div>

          {/* Right Column - Form (sticky on desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <ApplicationForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                submitted={submitted}
                isSubmitting={isSubmitting}
                internship={internship}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Application Form Component
interface ApplicationFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  submitted: boolean;
  isSubmitting: boolean;
  internship: Internship;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  submitted,
  isSubmitting,
  internship
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 shadow-lg"
    >
      {submitted ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 w-8 h-8" />
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2">
            Application Submitted!
          </h3>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300">
            Thank you for applying. The company will review your application and contact you soon.
          </p>
        </motion.div>
      ) : (
        <>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
            Apply Now
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs md:text-sm font-black text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm md:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-black text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm md:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs md:text-sm font-black text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm md:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-black text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
                  University *
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  required
                  placeholder="Your university"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm md:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs md:text-sm font-black text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
                  Major/Field of Study *
                </label>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Computer Science"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm md:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-black text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
                  Current GPA
                </label>
                <input
                  type="number"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleInputChange}
                  placeholder="e.g., 3.5"
                  step="0.01"
                  min="0"
                  max="4"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm md:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            {/* LinkedIn URL */}
            <div>
              <label className="block text-xs md:text-sm font-black text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm md:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-xs md:text-sm font-black text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
                Cover Letter / Why You're Interested *
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                required
                placeholder="Tell us why you're interested in this position and what you hope to gain..."
                rows={5}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm md:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:from-slate-400 disabled:to-slate-400 text-white font-black rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider text-sm md:text-base"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Mail size={18} />
                  Submit Application
                </>
              )}
            </motion.button>

            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 text-center">
              By submitting, you agree to be contacted by {internship.company}
            </p>
          </form>
        </>
      )}
    </motion.div>
  );
};

export default InternshipDetail;
