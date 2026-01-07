import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Check, Clock, DollarSign, Building2, FileText,
  Calendar, User, Globe, Link as LinkIcon, Share2, Bookmark
} from 'lucide-react';
import { ViewState, GrantType } from '../types';

interface GrantDetailsProps {
  grant: GrantType;
  onNavigate: (view: ViewState) => void;
}

const GrantDetails: React.FC<GrantDetailsProps> = ({ grant, onNavigate }) => {
  const daysUntilDeadline = Math.ceil((new Date(grant.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isDeadlineSoon = daysUntilDeadline < 30 && daysUntilDeadline > 0;
  const isPastDeadline = daysUntilDeadline < 0;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Open': return 'from-emerald-500 to-emerald-600 text-white';
      case 'Upcoming': return 'from-amber-500 to-amber-600 text-white';
      case 'Closed': return 'from-slate-500 to-slate-600 text-white';
      default: return 'from-indigo-500 to-indigo-600 text-white';
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Student': return 'from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700';
      case 'Business': return 'from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700';
      case 'Nonprofit': return 'from-pink-100 to-pink-50 dark:from-pink-900/30 dark:to-pink-800/20 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-700';
      case 'Research': return 'from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700';
      default: return 'from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-800/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 pt-24">
      {/* Header */}
      <div className="sticky top-20 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate('GRANTS')}
            className="flex items-center gap-2 text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 font-black transition-colors"
          >
            <ArrowLeft size={20} /> Back to Grants
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden bg-slate-200 dark:bg-slate-800">
        <img
          src={grant.image}
          alt={grant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent"></div>

        {/* Status Badge */}
        <div className={`absolute top-6 left-6 px-6 py-3 rounded-full font-black text-white text-sm shadow-lg flex items-center gap-2 bg-gradient-to-r ${getStatusColor(grant.status)}`}>
          {grant.status === 'Open' && <Check size={16} />}
          {grant.status === 'Upcoming' && <Clock size={16} />}
          {grant.status} Deadline
        </div>

        {/* Category Badge */}
        <div className={`absolute top-6 right-6 px-6 py-3 rounded-full font-black text-sm shadow-lg border bg-gradient-to-br ${getCategoryColor(grant.category)}`}>
          {grant.category}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2">
            {/* Title & Organization */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="heading-serif text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                {grant.name}
              </h1>
              <div className="flex items-center gap-3 text-xl text-slate-700 dark:text-slate-300 mb-8">
                <Building2 size={24} className="text-indigo-600" />
                <span className="font-black">{grant.organization}</span>
              </div>

              {/* Verified Badge */}
              {grant.verified && (
                <div className="inline-flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-700 rounded-xl px-4 py-3 mb-8">
                  <Check size={20} className="text-emerald-600 dark:text-emerald-400" />
                  <span className="font-black text-emerald-700 dark:text-emerald-300 text-sm">Official Source Verified</span>
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <section className="mb-12">
                <h2 className="font-black text-2xl text-slate-900 dark:text-white mb-6">About This Grant</h2>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {grant.description}
                </p>
              </section>
            </motion.div>

            {/* Eligibility */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <section className="mb-12">
                <h2 className="font-black text-2xl text-slate-900 dark:text-white mb-6">Who Can Apply?</h2>
                <div className="space-y-4">
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6">
                    <h3 className="font-black text-slate-900 dark:text-white mb-3">Eligibility Requirements</h3>
                    <ul className="space-y-2">
                      {grant.eligibility.map((req, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                          <Check size={18} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-6">
                      <h4 className="font-black text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
                        <Globe size={18} /> Citizenship
                      </h4>
                      <p className="text-blue-800 dark:text-blue-300">{grant.citizenship}</p>
                    </div>

                    {grant.ageRequirement && (
                      <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-xl p-6">
                        <h4 className="font-black text-purple-900 dark:text-purple-200 mb-2 flex items-center gap-2">
                          <User size={18} /> Age Requirement
                        </h4>
                        <p className="text-purple-800 dark:text-purple-300">{grant.ageRequirement}</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </motion.div>

            {/* Required Documents */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <section className="mb-12">
                <h2 className="font-black text-2xl text-slate-900 dark:text-white mb-6">Required Documents</h2>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6">
                  <ul className="space-y-3">
                    {grant.requiredDocuments.map((doc, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                        <FileText size={18} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </motion.div>

            {/* Additional Details */}
            {grant.additionalDetails && Object.keys(grant.additionalDetails).length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <section className="mb-12">
                  <h2 className="font-black text-2xl text-slate-900 dark:text-white mb-6">Program Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {grant.additionalDetails.fundingPeriod && (
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6">
                        <h4 className="font-black text-slate-900 dark:text-white mb-2 text-sm uppercase tracking-widest text-slate-600 dark:text-slate-400">Funding Period</h4>
                        <p className="text-slate-800 dark:text-slate-200">{grant.additionalDetails.fundingPeriod}</p>
                      </div>
                    )}
                    {grant.additionalDetails.annualStipend && (
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6">
                        <h4 className="font-black text-slate-900 dark:text-white mb-2 text-sm uppercase tracking-widest text-slate-600 dark:text-slate-400">Annual Stipend</h4>
                        <p className="text-slate-800 dark:text-slate-200">{grant.additionalDetails.annualStipend}</p>
                      </div>
                    )}
                    {grant.additionalDetails.tuitionCoverage && (
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6">
                        <h4 className="font-black text-slate-900 dark:text-white mb-2 text-sm uppercase tracking-widest text-slate-600 dark:text-slate-400">Tuition Coverage</h4>
                        <p className="text-slate-800 dark:text-slate-200">{grant.additionalDetails.tuitionCoverage}</p>
                      </div>
                    )}
                    {grant.additionalDetails.areaOfFocus && (
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6">
                        <h4 className="font-black text-slate-900 dark:text-white mb-2 text-sm uppercase tracking-widest text-slate-600 dark:text-slate-400">Area of Focus</h4>
                        <p className="text-slate-800 dark:text-slate-200">{grant.additionalDetails.areaOfFocus}</p>
                      </div>
                    )}
                    {grant.additionalDetails.businessAge && (
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6">
                        <h4 className="font-black text-slate-900 dark:text-white mb-2 text-sm uppercase tracking-widest text-slate-600 dark:text-slate-400">Business Age</h4>
                        <p className="text-slate-800 dark:text-slate-200">{grant.additionalDetails.businessAge}</p>
                      </div>
                    )}
                    {grant.additionalDetails.reportingFrequency && (
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6">
                        <h4 className="font-black text-slate-900 dark:text-white mb-2 text-sm uppercase tracking-widest text-slate-600 dark:text-slate-400">Reporting Frequency</h4>
                        <p className="text-slate-800 dark:text-slate-200">{grant.additionalDetails.reportingFrequency}</p>
                      </div>
                    )}
                  </div>
                  
                  {(grant.additionalDetails.selectionCriteria || grant.additionalDetails.fundUses || grant.additionalDetails.reportingRequirements) && (
                    <div className="mt-6 space-y-4">
                      {grant.additionalDetails.selectionCriteria && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-6">
                          <h4 className="font-black text-blue-900 dark:text-blue-200 mb-3">Selection Criteria</h4>
                          <p className="text-blue-800 dark:text-blue-300">{grant.additionalDetails.selectionCriteria}</p>
                        </div>
                      )}
                      {grant.additionalDetails.fundUses && (
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-700 rounded-xl p-6">
                          <h4 className="font-black text-emerald-900 dark:text-emerald-200 mb-3">Permitted Use of Funds</h4>
                          <p className="text-emerald-800 dark:text-emerald-300">{grant.additionalDetails.fundUses}</p>
                        </div>
                      )}
                      {grant.additionalDetails.reportingRequirements && (
                        <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-xl p-6">
                          <h4 className="font-black text-purple-900 dark:text-purple-200 mb-3">Reporting Requirements</h4>
                          <p className="text-purple-800 dark:text-purple-300">{grant.additionalDetails.reportingRequirements}</p>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              </motion.div>
            )}

            {/* How to Apply */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <section className="mb-12">
                <h2 className="font-black text-2xl text-slate-900 dark:text-white mb-6">How to Apply</h2>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-700 rounded-xl p-8">
                  <p className="text-lg text-indigo-900 dark:text-indigo-200 leading-relaxed whitespace-pre-line mb-6">
                    {grant.howToApply}
                  </p>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-700 rounded-xl p-4 mb-6">
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">✓ This is an in-app application process. Click the "Apply Now" button on the right to get started. No external links needed!</p>
                  </div>
                </div>
              </section>
            </motion.div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="lg:col-span-1">
            {/* Amount Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
              <div className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-2 mb-2 text-indigo-100">
                  <DollarSign size={18} />
                  <span className="font-black text-sm uppercase tracking-widest">Grant Amount</span>
                </div>
                <h3 className="heading-serif text-4xl font-black mb-6">{grant.amount}</h3>
                <p className="text-indigo-100 text-sm">Funding available for eligible applicants</p>
              </div>
            </motion.div>

            {/* Deadline Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="mb-8">
              <div className={`rounded-2xl p-8 shadow-xl border-2 ${
                isPastDeadline 
                  ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
                  : isDeadlineSoon
                  ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700'
                  : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700'
              }`}>
                <div className={`flex items-center gap-2 mb-2 font-black text-sm uppercase tracking-widest ${
                  isPastDeadline
                    ? 'text-slate-600 dark:text-slate-400'
                    : isDeadlineSoon
                    ? 'text-amber-700 dark:text-amber-300'
                    : 'text-emerald-700 dark:text-emerald-300'
                }`}>
                  <Calendar size={18} />
                  Application Deadline
                </div>
                <h3 className={`text-2xl font-black mb-2 ${
                  isPastDeadline
                    ? 'text-slate-700 dark:text-slate-300'
                    : isDeadlineSoon
                    ? 'text-amber-800 dark:text-amber-200'
                    : 'text-emerald-800 dark:text-emerald-200'
                }`}>
                  {new Date(grant.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </h3>
                <p className={`text-sm font-semibold ${
                  isPastDeadline
                    ? 'text-slate-600 dark:text-slate-400'
                    : isDeadlineSoon
                    ? 'text-amber-700 dark:text-amber-300'
                    : 'text-emerald-700 dark:text-emerald-300'
                }`}>
                  {isPastDeadline ? 'Deadline has passed' : isDeadlineSoon ? `${daysUntilDeadline} days remaining` : `${daysUntilDeadline} days until deadline`}
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
              {grant.status === 'Open' && (
                <button
                  onClick={() => onNavigate('GRANT_APPLICATION')}
                  className="block w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black py-4 rounded-xl text-center transition-all shadow-lg hover:shadow-indigo-600/50"
                >
                  Apply Now
                </button>
              )}
              <button className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                <Bookmark size={18} /> Save for Later
              </button>
              <button className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                <Share2 size={18} /> Share Grant
              </button>
            </motion.div>

            {/* Tips Section */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="mt-8">
              <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl p-6">
                <h4 className="font-black text-amber-900 dark:text-amber-200 mb-3">💡 Pro Tips</h4>
                <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-300">
                  <li>✓ Submit early before deadline</li>
                  <li>✓ Double-check all requirements</li>
                  <li>✓ Keep copies of everything</li>
                  <li>✓ Follow instructions exactly</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrantDetails;
