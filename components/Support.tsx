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
  const [expandedGuide, setExpandedGuide] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'faq' | 'guides' | 'contact'>('faq');

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
      icon: <Mail size={24} />,
      title: 'Email Support',
      description: 'General inquiries and application assistance',
      contact: 'support@beacon.org',
      hours: 'Response within 24-48 hours',
      action: 'Send Email'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone Support',
      description: 'Speak with a scholarship advisor',
      contact: '(202) 555-0198',
      hours: 'Mon-Fri, 9 AM - 5 PM EST',
      action: 'Call Now'
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
      contact: '1847 Lighthouse Lane, Washington DC 20036',
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
          {activeTab === 'guides' && (
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
                  whileHover={{ y: expandedGuide !== guide.id ? -5 : 0 }}
                  className={"transition-all duration-300 " + (expandedGuide === guide.id ? "col-span-1 md:col-span-2" : "")}
                >



























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
                    <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold transition-all active:scale-95">
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
      </div>
    </div>
  );
};

export default Support;
