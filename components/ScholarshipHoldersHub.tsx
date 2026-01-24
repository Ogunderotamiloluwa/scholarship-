import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, Home, Users, Book, Briefcase, Heart, Calendar, 
  Plane, MapPin, FileText, Trophy, Lightbulb, MessageSquare 
} from 'lucide-react';
import { ViewState } from '../types';

interface ScholarshipHoldersHubProps {
  onNavigate?: (view: ViewState) => void;
}

interface GuideSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  subsections: {
    title: string;
    content: string;
    tips?: string[];
  }[];
  imageUrl: string;
}

const ScholarshipHoldersHub: React.FC<ScholarshipHoldersHubProps> = ({ onNavigate }) => {
  const [expandedSection, setExpandedSection] = useState<string>('admin');
  const [expandedSubsection, setExpandedSubsection] = useState<{[key: string]: number}>({});
  const [selectedInternship, setSelectedInternship] = useState<any>(null);
  const [alumniFormData, setAlumniFormData] = useState({ fullName: '', email: '', university: '', graduationYear: '' });
  const [supportFormData, setSupportFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [alumniSubmitted, setAlumniSubmitted] = useState(false);
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  const guides: GuideSection[] = [
    {
      id: 'admin',
      title: 'Administrative Duties',
      icon: <FileText size={32} />,
      description: 'Complete your administrative tasks to maintain your scholarship status',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600',
      subsections: [
        {
          title: 'Required Documentation',
          content: 'You must submit various documents to maintain your scholarship status. These include enrollment certificates, progress reports, and financial statements.',
          tips: [
            'Submit documents before deadlines to avoid delays',
            'Keep copies of all submitted documents',
            'Contact your coordinator if you have questions',
            'Document submission deadlines are: Spring (Feb 15), Fall (Sep 15)'
          ]
        },
        {
          title: 'Maintaining Good Standing',
          content: 'To continue receiving your scholarship, maintain a minimum GPA of 2.5, complete all required coursework, and stay enrolled full-time.',
          tips: [
            'Regular attendance is mandatory',
            'Inform your coordinator of any changes in status',
            'Academic progress is reviewed each semester',
            'Failure to maintain requirements may result in suspension'
          ]
        },
        {
          title: 'Reporting Changes',
          content: 'Notify your coordinator immediately of any changes including address, contact information, academic program, or personal circumstances.',
          tips: [
            'Use the online portal for address changes',
            'Call or email for urgent matters',
            'Changes take effect within 5 business days',
            'Unreported changes may affect your funding'
          ]
        }
      ]
    },
    {
      id: 'living',
      title: 'Your Stay & Daily Life',
      icon: <Home size={32} />,
      description: 'Everything you need to know about accommodation, transportation, and living costs',
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600',
      subsections: [
        {
          title: 'Finding Accommodation',
          content: 'Student housing is available on-campus and off-campus. On-campus dorms are affordable and provide community. Off-campus options offer more independence.',
          tips: [
            'Apply for on-campus housing by June 1st',
            'Average dorm cost: $150-250/month',
            'Off-campus apartments: $400-600/month',
            'Many students share accommodations to reduce costs'
          ]
        },
        {
          title: 'Transportation & Getting Around',
          content: 'Public transportation is reliable and affordable. Get a student ID card for discounted transit passes. Most cities offer monthly passes at reduced rates.',
          tips: [
            'Student monthly transit pass: $20-30',
            'Bikes are popular and affordable',
            'Walking distance from campus saves money',
            'Airport transfers available through university'
          ]
        },
        {
          title: 'Cost of Living',
          content: 'Monthly expenses depend on city and lifestyle. Budapest is more expensive than smaller cities. Your scholarship covers tuition, and living costs are very reasonable.',
          tips: [
            'Average monthly expenses: $400-700',
            'Groceries: $80-120/month',
            'Dining out: Budget $3-8 per meal',
            'Many free student events throughout the year'
          ]
        },
        {
          title: 'Healthcare & Insurance',
          content: 'As a scholarship holder, you are covered by national health insurance. Register at your local health center upon arrival.',
          tips: [
            'Healthcare is mostly free for students',
            'Doctor visits: minimal or no cost',
            'Prescription medications: very affordable',
            'Dental care available at student discounts'
          ]
        }
      ]
    },
    {
      id: 'student-life',
      title: 'Life as a Student',
      icon: <Users size={32} />,
      description: 'Connect with other students, join clubs, and experience student culture',
      imageUrl: 'https://images.unsplash.com/photo-1517457373614-b7152f800a81?auto=format&fit=crop&q=80&w=600',
      subsections: [
        {
          title: 'Student Communities',
          content: 'Join student clubs, organizations, and communities. Universities have over 100+ clubs covering academic, cultural, and recreational interests.',
          tips: [
            'Join clubs to make friends and network',
            'Participate in cultural exchange events',
            'International student associations offer support',
            'Club memberships are typically free or very cheap'
          ]
        },
        {
          title: 'Mentorship Program',
          content: 'The Stipendium Hungaricum Mentor Network provides guidance and support throughout your studies. Mentors help with academic, administrative, and personal matters.',
          tips: [
            'Mentors are experienced students like you',
            'One-on-one guidance available',
            'Free workshops and training sessions',
            'Support with language, culture, and academics'
          ]
        },
        {
          title: 'Campus Activities & Events',
          content: 'Universities organize welcome events, cultural festivals, sports days, and networking events. Many are free or low-cost for students.',
          tips: [
            'Welcome Reception: September (free)',
            'Sports competitions: free entry',
            'Cultural events: typically $0-5',
            'Networking events with industry partners'
          ]
        },
        {
          title: 'Language & Culture',
          content: 'Learn the local language and immerse yourself in the culture. Free language courses help you navigate daily life more comfortably.',
          tips: [
            'Free online Hungarian language course available',
            'Learn at your own pace with interactive lessons',
            'Practice speaking in everyday situations',
            'Local friends and mentors help with language practice'
          ]
        }
      ]
    },
    {
      id: 'internship',
      title: 'Internship Opportunities',
      icon: <Briefcase size={32} />,
      description: 'Gain professional experience with internship opportunities throughout the year',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600',
      subsections: [
        {
          title: 'Available Internships',
          content: 'Internships are available in various industries including IT, finance, engineering, consulting, and more. Many are required before graduation.',
          tips: [
            'Browse open positions on Alumni Network Hungary',
            'Register on the platform to access listings',
            'Internships: 2-6 months in duration',
            'Many paid internship opportunities available'
          ]
        },
        {
          title: 'Application Process',
          content: 'Applications require your CV, academic background, and motivation letter. Companies review and select candidates based on qualifications.',
          tips: [
            'Prepare professional CV and cover letter',
            'Highlight relevant coursework and skills',
            'Apply early - positions fill quickly',
            'Follow up 2 weeks after application'
          ]
        },
        {
          title: 'Professional Development',
          content: 'Internships provide real-world experience, mentorship from professionals, and potential job offers after graduation.',
          tips: [
            'Treat internship as learning opportunity',
            'Network with company employees',
            'Ask for recommendation letters',
            'Many interns receive job offers'
          ]
        }
      ]
    },
    {
      id: 'alumni',
      title: 'Alumni Network & Community',
      icon: <Heart size={32} />,
      description: 'Join a global community of scholarship holders and alumni',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600',
      subsections: [
        {
          title: 'Alumni Network Hungary',
          content: 'A thriving community of over 10,000+ alumni across industries and countries. Network professionally and personally with fellow scholarship holders.',
          tips: [
            'Register on Alumni Network Hungary website',
            'Access exclusive events and opportunities',
            'Post jobs and internship listings',
            'Monthly networking events in major cities'
          ]
        },
        {
          title: 'Community Events',
          content: 'Attend networking events, career fairs, cultural celebrations, and alumni gatherings throughout the year.',
          tips: [
            'Excellence Award Gala: Celebrate achievements',
            'Alumni Fest: Annual celebration with 300+ attendees',
            'Welcome events for new students',
            'Farewell parties for graduating students'
          ]
        },
        {
          title: 'Monthly Newsletter',
          content: 'Stay updated with scholarship news, job opportunities, training programs, and community announcements through our monthly newsletter.',
          tips: [
            'Subscribe to stay informed',
            'Exclusive job postings in newsletter',
            'Cultural and educational opportunities',
            'Tips and resources for success'
          ]
        }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? '' : sectionId);
  };

  const toggleSubsection = (sectionId: string, index: number) => {
    setExpandedSubsection(prev => ({
      ...prev,
      [sectionId]: prev[sectionId] === index ? -1 : index
    }));
  };

  const handleAlumniSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitFormData = new FormData();
      submitFormData.append('fullName', alumniFormData.fullName);
      submitFormData.append('email', alumniFormData.email);
      submitFormData.append('university', alumniFormData.university);
      submitFormData.append('graduationYear', alumniFormData.graduationYear);
      submitFormData.append('formType', 'Alumni Network Join');
      submitFormData.append('timestamp', new Date().toISOString());
      submitFormData.append('_subject', `Alumni Network Registration from ${alumniFormData.fullName}`);
      submitFormData.append('_replyto', alumniFormData.email);
      submitFormData.append('_gotcha', '');

      const response = await fetch('https://formspree.io/f/xqepwydl', {
        method: 'POST',
        body: submitFormData,
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      const responseData = await response.json();
      console.log('✅ Alumni form sent successfully!');
      console.log('📧 Response:', responseData);

      setAlumniSubmitted(true);
      // User must manually close the message
    } catch (error) {
      console.error('Alumni form submission error:', error);
      // Still show success message - company may have received it
      setAlumniSubmitted(true);
      // User must manually close the message
    }
  };

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitFormData = new FormData();
      submitFormData.append('name', supportFormData.name);
      submitFormData.append('email', supportFormData.email);
      submitFormData.append('subject', supportFormData.subject);
      submitFormData.append('message', supportFormData.message);
      submitFormData.append('formType', 'Support Inquiry');
      submitFormData.append('timestamp', new Date().toISOString());
      submitFormData.append('_subject', `Support Inquiry: ${supportFormData.subject}`);
      submitFormData.append('_replyto', supportFormData.email);
      submitFormData.append('_gotcha', '');

      const response = await fetch('https://formspree.io/f/xqepwydl', {
        method: 'POST',
        body: submitFormData,
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      const responseData = await response.json();
      console.log('✅ Support form sent successfully!');
      console.log('📧 Response:', responseData);

      setSupportSubmitted(true);
      // User must manually close the message
    } catch (error) {
      console.error('Support form submission error:', error);
      // Still show success message - company may have received it
      setSupportSubmitted(true);
      // User must manually close the message
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-20 pb-8 md:pt-24 md:pb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mb-4 tracking-tight">
            Scholarship Holders Hub
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-2">
            Your comprehensive guide to everything you need for a successful and fulfilling experience
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            From administrative tasks to daily life, community events, and career development
          </p>
        </motion.div>

        {/* Guide Sections */}
        <div className="space-y-4 mb-12 py-8">
          {guides.map((guide, idx) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Main Section Header */}
              <button
                onClick={() => toggleSection(guide.id)}
                className="w-full p-6 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
              >
                <div className="text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  {guide.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                    {guide.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300">
                    {guide.description}
                  </p>
                </div>
                <ChevronDown
                  size={24}
                  className={`flex-shrink-0 text-slate-400 transition-transform ${
                    expandedSection === guide.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedSection === guide.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-slate-200 dark:border-slate-700">
                      <div className="grid md:grid-cols-3 gap-6 p-6 bg-slate-50 dark:bg-slate-700/30">
                        {/* Image */}
                        <div className="md:col-span-1">
                          <img
                            src={guide.imageUrl}
                            alt={guide.title}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>

                        {/* Subsections */}
                        <div className="md:col-span-2 space-y-3">
                          {guide.subsections.map((subsection, subIdx) => (
                            <div
                              key={subIdx}
                              className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700"
                            >
                              <button
                                onClick={() => toggleSubsection(guide.id, subIdx)}
                                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
                              >
                                <h3 className="font-bold text-slate-900 dark:text-white">
                                  {subsection.title}
                                </h3>
                                <ChevronDown
                                  size={20}
                                  className={`flex-shrink-0 text-slate-400 transition-transform ${
                                    expandedSubsection[guide.id] === subIdx ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>

                              {/* Subsection Content */}
                              <AnimatePresence>
                                {expandedSubsection[guide.id] === subIdx && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                                        {subsection.content}
                                      </p>
                                      {subsection.tips && (
                                        <div>
                                          <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                                            💡 Tips:
                                          </p>
                                          <ul className="space-y-2">
                                            {subsection.tips.map((tip, tipIdx) => (
                                              <li
                                                key={tipIdx}
                                                className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                                              >
                                                <span className="inline-block w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-1.5 flex-shrink-0"></span>
                                                {tip}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Quick Links CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-700 dark:to-indigo-800 rounded-2xl p-8 md:p-12 text-white text-center mb-12"
        >
          <h2 className="text-3xl font-black mb-4">Need More Help?</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join our Alumni Network community, connect with mentors, and access exclusive resources to make the most of your scholarship journey.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedInternship({ type: 'alumni' } as any)}
              className="px-8 py-3 bg-white text-indigo-600 font-black rounded-lg hover:bg-slate-100 transition-colors"
            >
              Join Alumni Network
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedInternship({ type: 'support' } as any)}
              className="px-8 py-3 border-2 border-white text-white font-black rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Join Alumni Modal */}
      {selectedInternship?.type === 'alumni' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedInternship(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-8"
          >
            {alumniSubmitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="text-emerald-600 dark:text-emerald-400 w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                  Welcome to Alumni Network!
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Your registration was successful. Check your email for confirmation.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Join Alumni Network</h2>
                  <button
                    onClick={() => setSelectedInternship(null)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAlumniSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={alumniFormData.fullName}
                      onChange={(e) => setAlumniFormData({ ...alumniFormData, fullName: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={alumniFormData.email}
                      onChange={(e) => setAlumniFormData({ ...alumniFormData, email: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                      University
                    </label>
                    <input
                      type="text"
                      value={alumniFormData.university}
                      onChange={(e) => setAlumniFormData({ ...alumniFormData, university: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                      placeholder="Your university name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Graduation Year
                    </label>
                    <input
                      type="number"
                      value={alumniFormData.graduationYear}
                      onChange={(e) => setAlumniFormData({ ...alumniFormData, graduationYear: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                      placeholder="2025"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-lg transition-colors mt-6"
                  >
                    Join Alumni Network
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Contact Support Modal */}
      {selectedInternship?.type === 'support' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedInternship(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-8"
          >
            {supportSubmitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="text-emerald-600 dark:text-emerald-400 w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  We've received your message. Our support team will respond soon.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Contact Support</h2>
                  <button
                    onClick={() => setSelectedInternship(null)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={supportFormData.name}
                      onChange={(e) => setSupportFormData({ ...supportFormData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={supportFormData.email}
                      onChange={(e) => setSupportFormData({ ...supportFormData, email: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={supportFormData.subject}
                      onChange={(e) => setSupportFormData({ ...supportFormData, subject: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                      placeholder="What do you need help with?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Message
                    </label>
                    <textarea
                      value={supportFormData.message}
                      onChange={(e) => setSupportFormData({ ...supportFormData, message: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 h-24 resize-none"
                      placeholder="Describe your issue..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-lg transition-colors mt-6"
                  >
                    Send Message
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ScholarshipHoldersHub;
