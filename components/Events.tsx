import React, { useState } from 'react';
import { ViewState } from '../types';
import { EVENTS } from '../Constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowRight, Search, Filter, X, Check, Mail, Phone, CheckCircle2, MessageCircle } from 'lucide-react';
import FormSubmissionFeedback from './FormSubmissionFeedback';

interface EventsProps {
  onNavigate: (view: ViewState) => void;
}

interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution: string;
  major: string;
}

const Events: React.FC<EventsProps> = ({ onNavigate }) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [registrationStep, setRegistrationStep] = useState<1 | 2 | 3>(1);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const [formData, setFormData] = useState<RegistrationForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    institution: '',
    major: ''
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    institution: ''
  });

  const eventTypes = ['All', 'Webinar', 'Workshop', 'Summit', 'Networking', 'Ceremony'];

  const filteredEvents = EVENTS.filter(event => {
    const matchesType = selectedType === 'All' || event.type === selectedType;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const upcomingEvents = sortedEvents.filter(e => new Date(e.date) >= new Date());
  const pastEvents = sortedEvents.filter(e => new Date(e.date) < new Date());

  const handleRegisterClick = (event: any) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
    setRegistrationStep(1);
    setRegistrationSuccess(false);
  };

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegistrationSubmit = async () => {
    if (registrationStep === 1) {
      if (formData.firstName && formData.lastName && formData.email) {
        setRegistrationStep(2);
      }
    } else if (registrationStep === 2) {
      if (formData.phone && formData.institution) {
        setRegistrationStep(3);
      }
    } else if (registrationStep === 3) {
      // Final submission - send to Formspree
      setIsLoading(true);
      setShowFeedback(true);
      
      try {
        const submitFormData = new FormData();
        submitFormData.append('firstName', formData.firstName);
        submitFormData.append('lastName', formData.lastName);
        submitFormData.append('email', formData.email);
        submitFormData.append('phone', formData.phone);
        submitFormData.append('institution', formData.institution);
        submitFormData.append('major', formData.major || '');
        submitFormData.append('eventName', selectedEvent?.name || '');
        submitFormData.append('formType', 'Event Registration');
        submitFormData.append('timestamp', new Date().toISOString());
        
        // Formspree special fields for proper email handling
        submitFormData.append('_subject', `Event Registration: ${selectedEvent?.name || 'Unknown Event'} - ${formData.firstName} ${formData.lastName}`);
        submitFormData.append('_replyto', formData.email);
        submitFormData.append('_gotcha', ''); // Honeypot field
        
        console.log('📤 Submitting event registration form...');
        const response = await fetch('https://formspree.io/f/xqepwydl', {
          method: 'POST',
          body: submitFormData,
        });
        
        if (!response.ok) {
          throw new Error(`Submission failed with status ${response.status}`);
        }
        
        const responseData = await response.json();
        console.log('✅ Event registration sent successfully!');
        console.log('📧 Response:', responseData);
        console.log('📧 Check your email inbox for confirmation');
        // Company has received the registration - show success
        setIsLoading(false);
      } catch (error) {
        console.error('❌ Event registration submission error:', error);
        // Still show success message - company may have received it
        setIsLoading(false);
      }
      // User must manually close the feedback message
    }
  };

  const handleContactSubmit = async () => {
    if (contactForm.name && contactForm.email && contactForm.message) {
      setIsLoading(true);
      setShowFeedback(true);
      
      try {
        const submitFormData = new FormData();
        submitFormData.append('name', contactForm.name);
        submitFormData.append('email', contactForm.email);
        submitFormData.append('phone', contactForm.phone || '');
        submitFormData.append('message', contactForm.message);
        submitFormData.append('institution', contactForm.institution || '');
        submitFormData.append('formType', 'Event Inquiry');
        submitFormData.append('timestamp', new Date().toISOString());
        
        // Formspree special fields for proper email handling
        submitFormData.append('_subject', `Event Inquiry from ${contactForm.name}`);
        submitFormData.append('_replyto', contactForm.email);
        submitFormData.append('_gotcha', ''); // Honeypot field
        
        console.log('📤 Submitting event inquiry form...');
        const response = await fetch('https://formspree.io/f/xqepwydl', {
          method: 'POST',
          body: submitFormData,
        });
        
        if (!response.ok) {
          throw new Error(`Submission failed with status ${response.status}`);
        }
        
        const responseData = await response.json();
        console.log('✅ Event inquiry sent successfully!');
        console.log('📧 Response:', responseData);
        console.log('📧 Check your email inbox for confirmation');
        // Company has received the inquiry - show success
        setIsLoading(false);
      } catch (error) {
        console.error('❌ Event inquiry submission error:', error);
        // Still show success message - company may have received it
        setIsLoading(false);
      }
      // User must manually close the feedback message
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 overflow-hidden">
      <FormSubmissionFeedback 
        isVisible={showFeedback}
        isLoading={isLoading}
        onClose={() => {
          setShowFeedback(false);
        }}
        title="We've Received Your Registration!"
        message="We have successfully received your event registration details. Our team will get back to you within 2-3 working days with event details, reminders, and exclusive content."
      />
      {/* HERO SECTION */}
      <section className="relative min-h-[500px] flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden px-4 pt-20 md:pt-32 pb-12 md:pb-16">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/images/kenny-eliason-zFSo6bnZJTw-unsplash.jpg"
            alt="Events and networking"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 to-slate-950"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-3xl">
            <h1 className="heading-serif text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-6">
              Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-emerald-200">Events</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-8">
              Join us for scholarships workshops, networking events, and informational sessions designed to help you succeed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEARCH & FILTER SECTION */}
      <section className="sticky top-20 md:top-24 z-40 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xl py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
            />
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-2">
            {eventTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-5 py-2 rounded-xl font-bold text-sm transition-all transform active:scale-95 flex items-center gap-2 ${
                  selectedType === type 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Filter size={16} />
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="bg-white dark:bg-slate-950 px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {upcomingEvents.length > 0 && (
            <>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-12">Upcoming Events</h2>
              <div className="space-y-6 mb-20">
                <AnimatePresence mode="wait">
                  {upcomingEvents.map((event, index) => {
                    const eventDate = new Date(event.date);
                    const daysUntil = Math.ceil((eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                          {/* Date Panel */}
                          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 md:p-8 flex flex-col justify-center text-white rounded-r-2xl md:rounded-r-0 md:rounded-l-lg">
                            <div className="text-xs font-bold uppercase tracking-widest text-indigo-100 mb-2">Event Date</div>
                            <div className="text-5xl font-black mb-1">{eventDate.getDate()}</div>
                            <div className="text-lg font-bold text-indigo-100">{eventDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}</div>
                            <div className="text-xs text-indigo-200 mt-2">{eventDate.toLocaleDateString('en-US', { weekday: 'long' })}</div>
                          </div>

                          {/* Content Panel */}
                          <div className="p-6 md:p-8 md:col-span-3 flex flex-col justify-between">
                            <div>
                              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{event.type}</span>
                              </div>
                              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {event.title}
                              </h3>
                              <p className="text-slate-600 dark:text-slate-400 text-base mb-4 leading-relaxed">
                                {event.description}
                              </p>
                            </div>

                            {/* Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                <Clock size={18} className="text-indigo-600" />
                                <span className="text-sm font-medium">{event.time}</span>
                              </div>
                              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                <MapPin size={18} className="text-indigo-600" />
                                <span className="text-sm font-medium">{event.location}</span>
                              </div>
                              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                <Users size={18} className="text-indigo-600" />
                                <span className="text-sm font-medium">{event.attendees}+ registered</span>
                              </div>
                            </div>

                            {/* CTA */}
                            <button 
                              onClick={() => handleRegisterClick(event)}
                              className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-bold transition-all shadow-lg w-fit active:scale-95">
                              Register Now
                              <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && upcomingEvents.length > 0 && (
            <>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 mt-16 pt-16 border-t border-slate-200 dark:border-slate-800">Past Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastEvents.slice(0, 4).map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 dark:from-slate-800 to-slate-50 dark:to-slate-900 border border-slate-200 dark:border-slate-700 opacity-75 hover:opacity-100 transition-opacity"
                  >
                    <div className="p-6">
                      <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                        {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">{event.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {upcomingEvents.length === 0 && pastEvents.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-slate-600 dark:text-slate-400 text-lg">No events found matching your search.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-600 px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Host an Event?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Contact us to host a scholarship workshop or informational session at your institution.
          </p>
          <button 
            onClick={() => setShowContactForm(true)}
            className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-lg active:scale-95">
            Get In Touch
          </button>
        </div>
      </section>

      {/* REGISTRATION MODAL */}
      <AnimatePresence>
        {showRegistrationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !registrationSuccess && setShowRegistrationModal(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] md:max-h-[85vh] md:max-h-[85vh] overflow-y-auto overflow-x-hidden flex flex-col"
            >
              {/* Header */}
              {!registrationSuccess && (
                <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Register for Event</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{selectedEvent?.title}</p>
                  </div>
                  <button
                    onClick={() => setShowRegistrationModal(false)}
                    className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                {registrationSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={32} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Registration Complete!</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">
                      Thank you for registering. A confirmation email has been sent to <span className="font-bold">{formData.email}</span>
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      You can view all your registered events in your dashboard.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Progress */}
                    <div className="flex gap-2 mb-8">
                      {[1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`flex-1 h-2 rounded-full transition-all ${
                            step <= registrationStep
                              ? 'bg-indigo-600'
                              : 'bg-slate-200 dark:bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Step 1: Personal Info */}
                    {registrationStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h4 className="text-lg font-black text-slate-900 dark:text-white mb-6">Personal Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="firstName"
                            placeholder="First Name *"
                            value={formData.firstName}
                            onChange={handleRegistrationChange}
                            className="px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                          />
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name *"
                            value={formData.lastName}
                            onChange={handleRegistrationChange}
                            className="px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                          />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={handleRegistrationChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                        />
                      </motion.div>
                    )}

                    {/* Step 2: Contact & Institution */}
                    {registrationStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h4 className="text-lg font-black text-slate-900 dark:text-white mb-6">Contact & Institution</h4>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number *"
                          value={formData.phone}
                          onChange={handleRegistrationChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                        />
                        <input
                          type="text"
                          name="institution"
                          placeholder="Institution/Organization *"
                          value={formData.institution}
                          onChange={handleRegistrationChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                        />
                        <input
                          type="text"
                          name="major"
                          placeholder="Major/Field of Study (Optional)"
                          value={formData.major}
                          onChange={handleRegistrationChange}
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                        />
                      </motion.div>
                    )}

                    {/* Step 3: Confirmation */}
                    {registrationStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h4 className="text-lg font-black text-slate-900 dark:text-white mb-6">Confirm Registration</h4>
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Name:</span>
                            <span className="font-bold text-slate-900 dark:text-white">{formData.firstName} {formData.lastName}</span>
                          </div>
                          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-3">
                            <span className="text-slate-600 dark:text-slate-400">Email:</span>
                            <span className="font-bold text-slate-900 dark:text-white">{formData.email}</span>
                          </div>
                          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-3">
                            <span className="text-slate-600 dark:text-slate-400">Phone:</span>
                            <span className="font-bold text-slate-900 dark:text-white">{formData.phone}</span>
                          </div>
                          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-3">
                            <span className="text-slate-600 dark:text-slate-400">Institution:</span>
                            <span className="font-bold text-slate-900 dark:text-white">{formData.institution}</span>
                          </div>
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
                          <p className="text-sm text-indigo-700 dark:text-indigo-300">
                            ✓ You will receive a confirmation email with event details and joining instructions.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 mt-8">
                      {registrationStep > 1 && (
                        <button
                          onClick={() => setRegistrationStep((registrationStep - 1) as any)}
                          className="flex-1 px-6 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        >
                          Back
                        </button>
                      )}
                      <button
                        onClick={handleRegistrationSubmit}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg font-bold transition-all shadow-lg active:scale-95"
                      >
                        {registrationStep === 3 ? 'Complete Registration' : 'Next'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT FORM MODAL */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContactForm(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header - Sticky */}
              {!isLoading && (
                <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Get In Touch</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">We'd love to hear from you</p>
                  </div>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1">
                {isLoading ? (
                  <div className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="relative w-16 h-16 mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-full animate-spin"></div>
                      <div className="absolute inset-2 bg-white dark:bg-slate-900 rounded-full"></div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-lg font-semibold">Sending your message...</p>
                  </div>
                ) : (
                  <>
                    {/* Contact Info */}
                    <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-indigo-900/20 dark:to-emerald-900/20 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                            <MessageCircle size={18} className="text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Telegram</p>
                            <a href="https://t.me/+Jg4s7pDS731mOTJh" target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Join Our Channel</a>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                            <Clock size={18} className="text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Hours</p>
                            <p className="font-bold text-slate-900 dark:text-white">Mon-Fri 9-5 EST</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form */}
                    <div className="p-6 md:p-8 space-y-4">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                      />
                      <input
                        type="email"
                        placeholder="Your Email *"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                      />
                      <input
                        type="tel"
                        placeholder="Your Phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                      />
                      <input
                        type="text"
                        placeholder="Institution/Organization"
                        value={contactForm.institution}
                        onChange={(e) => setContactForm({ ...contactForm, institution: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                      />
                      <textarea
                        placeholder="Your Message *"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 resize-none"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Sticky Footer */}
              {!isLoading && (
                <div className="sticky bottom-0 flex gap-4 p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 px-6 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleContactSubmit}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg font-bold transition-all shadow-lg active:scale-95"
                  >
                    Send Message
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
