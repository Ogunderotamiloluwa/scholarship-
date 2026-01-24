import React, { useState } from 'react';
import { ViewState } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, MessageCircle, FileText, Users, BookOpen, 
  ChevronDown, ArrowLeft, Mail, Phone, MapPin, Clock, 
  Search, Shield, Award, Zap, CheckCircle2, ArrowRight,
  ExternalLink
} from 'lucide-react';

interface SupportProps {
  onNavigate: (view: ViewState) => void;
}

const Support: React.FC<SupportProps> = ({ onNavigate }) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'faq' | 'guides' | 'contact'>('faq');
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    purpose: ''
  });
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false);

  const handleAppointmentSubmit = async () => {
    if (!appointmentForm.name || !appointmentForm.email || !appointmentForm.date || !appointmentForm.time) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', appointmentForm.name);
      formData.append('email', appointmentForm.email);
      formData.append('phone', appointmentForm.phone);
      formData.append('date', appointmentForm.date);
      formData.append('time', appointmentForm.time);
      formData.append('purpose', appointmentForm.purpose);
      formData.append('formType', 'Appointment Booking');
      formData.append('_subject', `New Appointment Request from ${appointmentForm.name}`);
      formData.append('_replyto', appointmentForm.email);

      const response = await fetch('https://formspree.io/f/xqepwydl', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setAppointmentSubmitted(true);
        setTimeout(() => {
          setShowAppointmentModal(false);
          setAppointmentSubmitted(false);
          setAppointmentForm({ name: '', email: '', phone: '', date: '', time: '', purpose: '' });
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Error booking appointment. Please try again.');
    }
  };

  const faqs = [
    {
      id: 1,
      category: 'Scholarships',
      question: 'What is the application timeline for scholarships?',
      answer: 'Our 2026-27 scholarship cycle opens January 1 and closes May 15, 2026. Finalists are announced by June 1, with funding disbursed in fall. Early submissions receive priority review, so we recommend applying by April 30 for best results.'
    },
    {
      id: 2,
      category: 'Scholarships',
      question: 'What GPA do I need to qualify?',
      answer: 'Minimum GPA requirements vary by program. Most scholarships require 2.5+, while some business and social impact grants consider holistic factors beyond GPA. Check individual program requirements for details.'
    },
    {
      id: 3,
      category: 'Scholarships',
      question: 'Can international students apply?',
      answer: 'We welcome applications from international students on F-1 visas or those seeking to transition to US institutions. You must be enrolled or admitted to an accredited US college or university. International applicants follow the same evaluation process as domestic students.'
    },
    {
      id: 4,
      category: 'Applications',
      question: 'How long does the application process take?',
      answer: 'Most applicants complete our multi-step application in 30-45 minutes. The application includes personal information, academic history, essay responses, and eligibility review. You can save your progress and return later if needed.'
    },
    {
      id: 5,
      category: 'Applications',
      question: 'What documents do I need to submit?',
      answer: 'For scholarships, you\'ll need your high school or college transcript, a personal essay (500-750 words), and references. We do not require submission of official documents initially—finalists provide verification later. Keep scans of your transcript ready for reference.'
    },
    {
      id: 6,
      category: 'Grants',
      question: 'What is the difference between scholarships and grants?',
      answer: 'Scholarships are merit-based awards for individual students pursuing education. Grants support organizations, nonprofits, and research initiatives. Both are need-blind and do not require repayment. Grants typically range from $50,000-$500,000, while scholarships are $15,000-$55,000 annually.'
    },
    {
      id: 7,
      category: 'Funding',
      question: 'Are there any hidden fees or costs?',
      answer: 'Absolutely not. Beacon is a 501(c)(3) nonprofit foundation; we never charge students to apply for awards. All costs are covered by our endowment. If anyone claims to charge you to apply, it is fraudulent.'
    },
    {
      id: 8,
      category: 'Funding',
      question: 'How much funding is available?',
      answer: 'Awards range from $5,000 to $500,000+ depending on the program. Scholarships typically cover $15,000-$55,000 annually. Grants for nonprofits and research can reach $100,000-$500,000+. We distribute over $30 million annually across all programs.'
    },
    {
      id: 9,
      category: 'Eligibility',
      question: 'Do I need to be a citizen to apply?',
      answer: 'No citizenship requirement for our main scholarships. However, some US-specific awards require residency or citizenship status. Review each program\'s eligibility criteria carefully. International students are encouraged to apply to programs open to their status.'
    },
    {
      id: 10,
      category: 'Eligibility',
      question: 'Are community college students eligible?',
      answer: 'Yes! We have specific transfer grants for community college students transitioning to four-year institutions. Community college GPA is evaluated with the same rigor as university GPA. Transfer scholarships support both your final years at university and initial success.'
    },
    {
      id: 11,
      category: 'Selection',
      question: 'How are finalists selected?',
      answer: 'Our selection process is holistic, evaluating academic achievement, leadership potential, community impact, essay quality, and financial need. We do not use a single metric—instead, we look for well-rounded individuals with demonstrated commitment to excellence and service.'
    },
    {
      id: 12,
      category: 'Selection',
      question: 'When will I hear back about my application?',
      answer: 'Decisions are released on June 1, 2026 via email and our applicant portal. You can check your status anytime after May 15. Semifinalists receive additional opportunities and campus visit invitations. Rejected applicants receive detailed feedback.'
    }
  ];

  const guides = [
    {
      id: 1,
      title: 'Writing a Winning Scholarship Essay',
      description: 'Learn how to craft compelling personal essays that stand out to our selection committee.',
      content: 'Your essay is your voice. Tell your story authentically. We want to understand your values, challenges overcome, and vision for impact. Be specific with examples. Show, don\'t just tell. Address how our scholarship aligns with your goals. Keep it conversational but professional.',
      icon: <FileText size={32} />
    },
    {
      id: 2,
      title: 'Preparing Your Application Materials',
      description: 'Tips for gathering transcripts, references, and supporting documents.',
      content: 'Start gathering materials early. Request transcripts from your registrar (allow 5-7 business days). Choose references who know your academic and personal strengths. Provide them with deadline 2 weeks in advance. Scan all documents in PDF format for easy sharing.',
      icon: <BookOpen size={32} />
    },
    {
      id: 3,
      title: 'Understanding Your Eligibility',
      description: 'Step-by-step guide to determine which scholarships match your profile.',
      content: 'Use our Eligibility Checker tool to assess which programs fit your background. Consider GPA, major, career goals, and background. Many programs welcome diverse profiles. Read eligibility criteria carefully—sometimes exceptions are considered on case-by-case basis.',
      icon: <Shield size={32} />
    },
    {
      id: 4,
      title: 'Interview Preparation Guide',
      description: 'How to prepare for finalist interviews with our selection committee.',
      content: 'Interviews are conversational, not interrogative. Expect questions about your goals, challenges, and why our scholarship matters. Practice articulating your story in 60 seconds. Dress professionally. Bring questions for us. Most importantly, be yourself and speak with authenticity.',
      icon: <Users size={32} />
    },
    {
      id: 5,
      title: 'Grant Application Essentials',
      description: 'Complete guide for nonprofit organizations and researchers seeking grants.',
      content: 'Grants require organizational documentation (501(c)(3) status, financials, board info). Clearly articulate your mission and proposed use of funds. Demonstrate measurable impact. Show organizational capacity. Budget must be detailed and justified. Letter of recommendation from board member required.',
      icon: <Award size={32} />
    },
    {
      id: 6,
      title: 'Common Application Mistakes to Avoid',
      description: 'Learn what disqualifies applications and how to prevent mistakes.',
      content: 'Common mistakes: incomplete applications, typos/grammar errors, missing required fields, essays that don\'t answer the prompt, outdated contact info. Always proofread 2-3 times. Have someone else review before submission. Submit before the deadline to avoid technical issues.'
    }
  ];

  const contactMethods = [
    {
      icon: <MessageCircle size={24} />,
      title: 'Telegram Channel',
      description: 'Direct messaging and quick support',
      contact: 'Join our Telegram community',
      hours: 'Available 24/7',
      action: 'Join Now'
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'Live Chat',
      description: 'Quick questions answered instantly',
      contact: 'Chat with an advisor',
      hours: 'Mon-Fri, 10 AM - 4 PM EST',
      action: 'Start Chat'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Visit Us',
      description: 'In-person consultations at our office',
      contact: 'Plainsboro Township, Middlesex County, New Jersey',
      hours: 'By appointment only',
      action: 'Schedule Visit'
    }
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-40">
      {/* HERO SECTION */}
      <section className="relative mb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <button
            onClick={() => onNavigate('HOME')}
            className="mb-8 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-black text-sm flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={18} /> Back
          </button>
          
          <div className="mb-12">
            <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto mb-8">
              <HelpCircle size={40} />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
              How Can We Help?
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light mb-8">
              Find answers to your questions, access helpful guides, and connect with our support team.
            </p>
          </div>

          {/* TAB SELECTOR */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { id: 'faq', label: 'FAQ', icon: <HelpCircle size={18} /> },
              { id: 'guides', label: 'Guides', icon: <BookOpen size={18} /> },
              { id: 'contact', label: 'Contact', icon: <MessageCircle size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="max-w-5xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {/* FAQ TAB */}
          {activeTab === 'faq' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              key="faq"
              className="space-y-6"
            >
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-600 dark:text-slate-400 text-lg">No FAQs match your search. Try different keywords.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredFaqs.map((faq) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        className="w-full px-6 py-5 flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-left"
                      >
                        <div className="flex-1">
                          <div className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-2">
                            {faq.category}
                          </div>
                          <h3 className="text-lg font-black text-slate-900 dark:text-white">
                            {faq.question}
                          </h3>
                        </div>
                        <ChevronDown
                          size={20}
                          className={`text-slate-600 dark:text-slate-400 flex-shrink-0 mt-1 transition-transform ${
                            expandedFaq === faq.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedFaq === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50"
                          >
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* GUIDES TAB */}
          {activeTab === 'guides' && !selectedGuide && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              key="guides"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {guides.map((guide) => (
                <motion.div
                  key={guide.id}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                    {guide.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                    {guide.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    {guide.description}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed text-sm">
                    {guide.content}
                  </p>
                  <button 
                    onClick={() => setSelectedGuide(guide)}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95">
                    <span>Read Full Guide</span>
                    <ArrowRight size={18} />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* GUIDE DETAIL PAGE */}
          {activeTab === 'guides' && selectedGuide && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              key="guide-detail"
            >
              <button
                onClick={() => setSelectedGuide(null)}
                className="mb-8 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-black text-sm flex items-center gap-2 transition-colors"
              >
                <ArrowLeft size={18} /> Back to Guides
              </button>
              
              <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    {selectedGuide.icon}
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                      {selectedGuide.title}
                    </h1>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
                    {selectedGuide.description}
                  </p>
                  
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600 dark:border-indigo-400 p-8 rounded-lg mb-12">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Overview</h2>
                    <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                      {selectedGuide.content}
                    </p>
                  </div>

                  {selectedGuide.id === 1 && (
                    <>
                      <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 mt-12">Key Tips for Writing Excellence</h2>
                      <div className="space-y-6 mb-12">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Show, Don't Tell</h3>
                          <p className="text-slate-700 dark:text-slate-300">Use specific examples and anecdotes to illustrate your points. Rather than saying "I'm a leader," describe a time you led a team through a challenging project.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Be Authentic</h3>
                          <p className="text-slate-700 dark:text-slate-300">Your voice should come through in your writing. Use your natural vocabulary and tone. Admissions officers can tell when you're being inauthentic.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Address the Prompt Directly</h3>
                          <p className="text-slate-700 dark:text-slate-300">Make sure you're answering what was asked. If the prompt wants to know about challenges, discuss real obstacles you've overcome and what you learned.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Connect to Our Mission</h3>
                          <p className="text-slate-700 dark:text-slate-300">Research Beacon Foundation and explain why our scholarship aligns with your goals. Show that you understand what we stand for.</p>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedGuide.id === 2 && (
                    <>
                      <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 mt-12">Step-by-Step Checklist</h2>
                      <div className="space-y-4 mb-12">
                        <div className="flex gap-4 items-start">
                          <CheckCircle2 size={24} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Request Official Transcripts</h3>
                            <p className="text-slate-600 dark:text-slate-400">Contact your school's registrar. Allow 5-7 business days for processing.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <CheckCircle2 size={24} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Select Strong References</h3>
                            <p className="text-slate-600 dark:text-slate-400">Choose 2-3 people who know you well academically or professionally.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <CheckCircle2 size={24} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Provide Deadline Information</h3>
                            <p className="text-slate-600 dark:text-slate-400">Give references at least 2 weeks notice of deadlines.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <CheckCircle2 size={24} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Scan and Organize</h3>
                            <p className="text-slate-600 dark:text-slate-400">Create PDF copies of all documents for easy uploading.</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedGuide.id === 3 && (
                    <>
                      <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 mt-12">Eligibility Determination Process</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Check GPA Requirements</h3>
                          <p className="text-slate-700 dark:text-slate-300 text-sm">Most programs require a minimum GPA. Check if your GPA meets the threshold for each scholarship.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Verify Field of Study</h3>
                          <p className="text-slate-700 dark:text-slate-300 text-sm">Some programs target specific majors or fields. Confirm your intended major aligns.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Review Financial Need</h3>
                          <p className="text-slate-700 dark:text-slate-300 text-sm">Some scholarships are need-based. Others are merit-based. Check which applies.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Confirm Citizenship Status</h3>
                          <p className="text-slate-700 dark:text-slate-300 text-sm">Some programs have citizenship or residency requirements. Verify you qualify.</p>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedGuide.id === 4 && (
                    <>
                      <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 mt-12">Interview Preparation Strategy</h2>
                      <div className="space-y-6 mb-12">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Practice Your Story (60 Seconds)</h3>
                          <p className="text-slate-700 dark:text-slate-300">Craft a compelling 1-minute summary of who you are, your achievements, and your goals. Practice until it feels natural.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Prepare Examples</h3>
                          <p className="text-slate-700 dark:text-slate-300">Have 3-5 stories ready that demonstrate challenges overcome, leadership, and impact. Use the STAR method (Situation, Task, Action, Result).</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Ask Thoughtful Questions</h3>
                          <p className="text-slate-700 dark:text-slate-300">Prepare 2-3 genuine questions about the program. This shows your interest and engagement.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Dress for Success</h3>
                          <p className="text-slate-700 dark:text-slate-300">Professional attire shows respect and seriousness. Aim for business casual at minimum.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Be Yourself</h3>
                          <p className="text-slate-700 dark:text-slate-300">Authenticity matters. Speak with genuine passion about your experiences and goals.</p>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-8 rounded-xl mt-12">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Ready to Apply?</h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      You now have the knowledge to craft a strong application. Visit our application portal to get started.
                    </p>
                    <button 
                      onClick={() => {
                        setSelectedGuide(null);
                        onNavigate('GRANTS');
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2"
                    >
                      <span>Start Application</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              key="contact"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {contactMethods.map((method, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:shadow-xl transition-all"
                  >
                    <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                      {method.icon}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                      {method.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      {method.description}
                    </p>
                    <div className="space-y-3 mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <p className="font-bold text-slate-900 dark:text-white">
                        {method.contact}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <Clock size={16} />
                        {method.hours}
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        if (method.title === 'Telegram Channel') {
                          window.open('https://t.me/+Jg4s7pDS731mOTJh', '_blank');
                        } else if (method.title === 'Visit Us') {
                          setShowAppointmentModal(true);
                        }
                      }}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold transition-all active:scale-95"
                    >
                      {method.action}
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* ADDITIONAL INFO */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-12 text-center"
              >
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                  Still need help?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
                  Our support team is here to help. Don't hesitate to reach out with any questions about your application, eligibility, or our programs.
                </p>
                <button
                  onClick={() => setActiveTab('faq')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all active:scale-95"
                >
                  <span>Browse All FAQs</span>
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* APPOINTMENT BOOKING MODAL */}
        <AnimatePresence>
          {showAppointmentModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowAppointmentModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col"
              >
                <div className="sticky top-0 bg-white dark:bg-slate-900 p-8 border-b border-slate-200 dark:border-slate-700 z-10">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                    Schedule Your Visit
                  </h2>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="p-8">
                    {appointmentSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-4 py-8"
                      >
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle2 size={32} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                          Appointment Request Submitted!
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">
                          We'll confirm your appointment within 24 hours via email.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div className="space-y-4">
                        <div>
                          <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={appointmentForm.name}
                            onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                            placeholder="Your name"
                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={appointmentForm.email}
                            onChange={(e) => setAppointmentForm({ ...appointmentForm, email: e.target.value })}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={appointmentForm.phone}
                            onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                            placeholder="(555) 123-4567"
                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                              Preferred Date *
                            </label>
                            <input
                              type="date"
                              value={appointmentForm.date}
                              onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                              Preferred Time *
                            </label>
                            <input
                              type="time"
                              value={appointmentForm.time}
                              onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                            Purpose of Visit
                          </label>
                          <textarea
                            value={appointmentForm.purpose}
                            onChange={(e) => setAppointmentForm({ ...appointmentForm, purpose: e.target.value })}
                            placeholder="e.g., Discuss scholarship options, Ask about grant programs"
                            rows={2}
                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 resize-none"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {!appointmentSubmitted && (
                  <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-8 flex gap-3">
                    <button
                      onClick={() => setShowAppointmentModal(false)}
                      className="flex-1 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAppointmentSubmit}
                      className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold transition-all active:scale-95"
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Support;
