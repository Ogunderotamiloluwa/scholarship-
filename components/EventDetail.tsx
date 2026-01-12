import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Calendar, MapPin, Users, CheckCircle2, Mail,
  Sparkles, Heart, Share2, Clock
} from 'lucide-react';
import { ViewState } from '../types';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  attendees: number;
  category: string;
  highlights: string[];
  isFeatured: boolean;
}

interface EventDetailProps {
  event: Event | null;
  onNavigate: (view: ViewState) => void;
  onBack?: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onNavigate, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    dietaryRestrictions: '',
    guestCount: '1'
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pt-20 pb-8 md:pt-24 md:pb-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            No event selected
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      submitData.append('dietaryRestrictions', formData.dietaryRestrictions);
      submitData.append('guestCount', formData.guestCount);
      submitData.append('eventTitle', event.title);
      submitData.append('eventDate', event.date);
      submitData.append('eventType', 'Event Registration');
      submitData.append('timestamp', new Date().toISOString());
      submitData.append('_subject', `Event Registration: ${event.title} - ${formData.fullName}`);
      submitData.append('_replyto', formData.email);
      submitData.append('_gotcha', '');

      const response = await fetch('https://formspree.io/f/mvzgeadj', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          university: '',
          dietaryRestrictions: '',
          guestCount: '1'
        });
        setSubmitted(false);
        onBack?.();
      }, 2500);
    } catch (error) {
      console.error('Error submitting form:', error);
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
            Event Details
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
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                <h2 className="text-2xl md:text-4xl font-black text-white mb-2">
                  {event.title}
                </h2>
                <div className="flex flex-wrap gap-3 text-sm md:text-base text-slate-100">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={16} />
                    {event.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={16} />
                    {event.location}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Key Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
            >
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-indigo-600 dark:text-indigo-400" />
                <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Date & Time</p>
                <p className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                  {event.date}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-red-600 dark:text-red-400" />
                <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Location</p>
                <p className="text-sm md:text-base font-black text-slate-900 dark:text-white line-clamp-2">
                  {event.location}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <Users className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Attendees</p>
                <p className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                  {event.attendees}+
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
                About This Event
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {event.description}
              </p>

              {/* Highlights */}
              {event.highlights && event.highlights.length > 0 && (
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Sparkles size={20} />
                    Event Highlights
                  </h4>
                  <ul className="space-y-2">
                    {event.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                        <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* Mobile Form - shown below on mobile, beside on desktop */}
            <div className="lg:hidden">
              <EventRegistrationForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                submitted={submitted}
                isSubmitting={isSubmitting}
                event={event}
              />
            </div>
          </div>

          {/* Right Column - Form (sticky on desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <EventRegistrationForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                submitted={submitted}
                isSubmitting={isSubmitting}
                event={event}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Event Registration Form Component
interface EventRegistrationFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  submitted: boolean;
  isSubmitting: boolean;
  event: Event;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  submitted,
  isSubmitting,
  event
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
            Registration Confirmed!
          </h3>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300">
            Thank you for registering. You'll receive a confirmation email shortly with event details.
          </p>
        </motion.div>
      ) : (
        <>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
            Register Now
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
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

            {/* Email */}
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

            {/* Phone */}
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

            {/* University */}
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

            {/* Guest Count */}
            <div>
              <label className="block text-xs md:text-sm font-black text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
                Number of Guests
              </label>
              <select
                name="guestCount"
                value={formData.guestCount}
                onChange={handleInputChange}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm md:text-base text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Dietary Restrictions */}
            <div>
              <label className="block text-xs md:text-sm font-black text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
                Dietary Restrictions
              </label>
              <input
                type="text"
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                placeholder="e.g., Vegetarian, Vegan, Gluten-free"
                className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm md:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
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
                  Registering...
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  Register for Event
                </>
              )}
            </motion.button>

            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 text-center">
              You'll receive event details and updates via email
            </p>
          </form>
        </>
      )}
    </motion.div>
  );
};

export default EventDetail;
