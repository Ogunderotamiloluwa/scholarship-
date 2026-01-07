import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, CheckCircle2, FileText, Send, Clock, AlertCircle,
  ChevronDown, Award, Briefcase, Zap, BookOpen
} from 'lucide-react';
import { ViewState } from '../types';

interface HowItWorksProps {
  onNavigate: (view: ViewState) => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'scholarships' | 'grants'>('scholarships');
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const scholarshipSteps = [
    {
      icon: <Search size={32} />,
      title: 'Explore Scholarships',
      description: 'Browse our verified database of scholarships',
      details: [
        'Use our advanced search and filter tools',
        'Filter by amount, deadline, eligibility, and category',
        'Read detailed scholarship descriptions',
        'Check verification badges for official sources'
      ]
    },
    {
      icon: <CheckCircle2 size={32} />,
      title: 'Check Your Eligibility',
      description: 'Verify you meet all requirements',
      details: [
        'Review GPA requirements',
        'Confirm citizenship and residency status',
        'Check age and education level requirements',
        'Verify any specific field of study criteria'
      ]
    },
    {
      icon: <FileText size={32} />,
      title: 'Prepare Documents',
      description: 'Gather all required materials',
      details: [
        'Prepare academic transcripts',
        'Write compelling essays',
        'Collect letters of recommendation',
        'Organize financial documents if needed'
      ]
    },
    {
      icon: <Send size={32} />,
      title: 'Submit Application',
      description: 'Apply on the official website',
      details: [
        'Click the official application link',
        'Fill out the application form completely',
        'Upload all required documents',
        'Submit before the deadline'
      ]
    },
    {
      icon: <Clock size={32} />,
      title: 'Wait for Decision',
      description: 'Track your application status',
      details: [
        'Most scholarships notify within 2-6 months',
        'Check email regularly for updates',
        'Some offer application tracking portals',
        'Be patient - good things take time'
      ]
    },
    {
      icon: <Award size={32} />,
      title: 'Receive Award',
      description: 'Get your scholarship funds',
      details: [
        'Funds are deposited directly to your school',
        'May be released in installments',
        'Some require enrollment verification',
        'Use funds as specified by the scholarship'
      ]
    }
  ];

  const grantSteps = [
    {
      icon: <Search size={32} />,
      title: 'Find Relevant Grants',
      description: 'Search grants matching your needs',
      details: [
        'Filter by grant type (Business, Nonprofit, Research, etc.)',
        'Check funding amounts and eligibility',
        'Review organization credibility',
        'Note application deadlines'
      ]
    },
    {
      icon: <AlertCircle size={32} />,
      title: 'Verify Grant Legitimacy',
      description: 'Ensure the grant is real',
      details: [
        'Check our verification badge',
        'Visit the official organization website',
        'Look for contact information',
        'Avoid grants asking for upfront fees'
      ]
    },
    {
      icon: <CheckCircle2 size={32} />,
      title: 'Confirm Eligibility',
      description: 'Make sure you qualify',
      details: [
        'Review citizenship requirements',
        'Check business or organization type',
        'Verify any location requirements',
        'Ensure alignment with grant purpose'
      ]
    },
    {
      icon: <FileText size={32} />,
      title: 'Prepare Application Materials',
      description: 'Gather all necessary documents',
      details: [
        'Business plan or proposal',
        'Budget projections or financial statements',
        'Organization registration documents',
        'Tax returns and ownership documentation'
      ]
    },
    {
      icon: <Send size={32} />,
      title: 'Submit Application',
      description: 'Apply through official channels',
      details: [
        'Submit through the official website or portal',
        'Include all required documentation',
        'Write compelling narrative sections',
        'Keep copies of everything submitted'
      ]
    },
    {
      icon: <Award size={32} />,
      title: 'Receive Funding',
      description: 'Get your grant awarded',
      details: [
        'Grants typically have 2-4 month review periods',
        'You may be asked for additional information',
        'Funds are sent to your organization',
        'Follow any reporting requirements'
      ]
    }
  ];

  const steps = activeTab === 'scholarships' ? scholarshipSteps : grantSteps;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24">
      {/* Hero Section */}
      <section className="px-4 md:px-6 py-12 md:py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="heading-serif text-4xl md:text-6xl font-black mb-4 md:mb-6 leading-tight">
              How It Works
            </h1>
            <p className="text-base md:text-xl text-indigo-100 max-w-2xl">
              Simple, step-by-step guidance for securing scholarships and grants. Whether you're a student seeking education funding or an entrepreneur pursuing business grants, we've got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Selector */}
      <section className="px-4 md:px-6 py-4 md:py-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 md:gap-4 justify-center md:justify-start overflow-x-auto">
            <button
              onClick={() => setActiveTab('scholarships')}
              className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-black uppercase text-xs md:text-sm tracking-widest transition-all whitespace-nowrap ${
                activeTab === 'scholarships'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Award size={16} className="md:w-5 md:h-5" /> Scholarships
            </button>
            <button
              onClick={() => setActiveTab('grants')}
              className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-black uppercase text-xs md:text-sm tracking-widest transition-all whitespace-nowrap ${
                activeTab === 'grants'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Briefcase size={16} className="md:w-5 md:h-5" /> Grants
            </button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-3 md:space-y-4">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <button
                  onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                  className="w-full text-left"
                >
                  <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-lg md:rounded-2xl p-4 md:p-6 hover:border-indigo-600 dark:hover:border-indigo-400 transition-all cursor-pointer hover:shadow-lg">
                    <div className="flex items-start gap-3 md:gap-6">
                      {/* Step Number & Icon */}
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 md:h-16 w-12 md:w-16 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 text-white group-hover:scale-110 transition-transform">
                          <div className="text-lg md:text-2xl">{step.icon}</div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 md:gap-4">
                          <div className="min-w-0">
                            <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-1">
                              Step {idx + 1}: {step.title}
                            </h3>
                            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium break-words">
                              {step.description}
                            </p>
                          </div>
                          <ChevronDown
                            size={20}
                            className={`text-indigo-600 dark:text-indigo-400 flex-shrink-0 transition-transform mt-1 ${
                              expandedStep === idx ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {expandedStep === idx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-200 dark:border-slate-800"
                        >
                          <ul className="space-y-2 md:space-y-3">
                            {step.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2 md:gap-3">
                                <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5 md:mt-1" />
                                <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Tips Section */}
      <section className="px-4 md:px-6 py-12 md:py-20 bg-amber-50 dark:bg-amber-900/20 border-y border-amber-200 dark:border-amber-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-serif text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 md:mb-12">
            ⚠️ Important Tips to Stay Safe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {[
              {
                title: 'Never Pay Application Fees',
                description: 'Legitimate scholarships and grants NEVER ask for payment to apply. If they do, it\'s a scam.'
              },
              {
                title: 'Verify the Source',
                description: 'Always visit the official website directly. Check our verification badges and confirm with the organization.'
              },
              {
                title: 'No Guaranteed Awards',
                description: 'Be suspicious of any offer guaranteeing you\'ll win a scholarship or grant. Awards are competitive.'
              },
              {
                title: 'Protect Your Information',
                description: 'Never share bank details, social security numbers, or credit card info during application.'
              },
              {
                title: 'Keep Copies',
                description: 'Save all application confirmations, emails, and documents for your records.'
              },
              {
                title: 'Meet Deadlines Early',
                description: 'Submit before the deadline. Many systems won\'t accept late applications, even by minutes.'
              }
            ].map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-lg md:rounded-2xl border-2 border-amber-200 dark:border-amber-800"
              >
                <h3 className="font-black text-base md:text-lg text-amber-900 dark:text-amber-100 mb-2 md:mb-3">
                  {tip.title}
                </h3>
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-300">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl md:rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="heading-serif text-3xl md:text-4xl font-black mb-4 md:mb-6">Ready to Start Your Journey?</h2>
          <p className="text-base md:text-xl text-indigo-100 mb-8 md:mb-10 max-w-2xl mx-auto">
            Browse verified scholarships and grants that match your profile. Our platform makes it easy to find and apply for legitimate funding.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button
              onClick={() => onNavigate('SCHOLARSHIPS')}
              className="bg-white text-indigo-600 font-black px-6 md:px-10 py-3 md:py-4 rounded-lg md:rounded-xl hover:bg-indigo-50 transition-all text-sm md:text-base"
            >
              Browse Scholarships
            </button>
            <button
              onClick={() => onNavigate('GRANTS')}
              className="bg-indigo-700 hover:bg-indigo-800 text-white font-black px-6 md:px-10 py-3 md:py-4 rounded-lg md:rounded-xl transition-all border-2 border-white text-sm md:text-base"
            >
              Explore Grants
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
