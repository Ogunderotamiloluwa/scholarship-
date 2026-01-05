import React, { useState } from 'react';
import { ViewState, Application } from '../types';
import { APPLICATION_TRACKING_STATUSES, GRANT_DEADLINES_CALENDAR } from '../Constants';
import { 
  ArrowRight, Clock, CheckCircle2, AlertCircle, FileText, Calendar, 
  TrendingUp, Download, Share2, Zap, Filter, Search 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApplicationTrackerProps {
  onNavigate: (view: ViewState) => void;
}

const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({ onNavigate }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock application data
  const mockApplications: Application[] = [
    {
      id: 'app-1',
      type: 'Scholarship',
      programId: 'merit-presidential',
      programName: 'Presidential Merit Award',
      applicantId: 'user-1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@example.com',
      phone: '(555) 123-4567',
      submissionDate: '2026-01-02',
      status: 'finalist',
      lastUpdated: '2026-01-04',
      score: 92
    },
    {
      id: 'app-2',
      type: 'Grant',
      programId: 'federal-2',
      programName: 'NIH Research Grants',
      applicantId: 'user-1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@example.com',
      phone: '(555) 123-4567',
      submissionDate: '2025-12-20',
      status: 'reviewing',
      lastUpdated: '2026-01-03'
    },
    {
      id: 'app-3',
      type: 'Scholarship',
      programId: 'horizon-stem',
      programName: 'Horizon STEM Grant',
      applicantId: 'user-1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@example.com',
      phone: '(555) 123-4567',
      submissionDate: '2025-11-15',
      status: 'awarded',
      lastUpdated: '2025-12-28',
      score: 88
    },
    {
      id: 'app-4',
      type: 'Grant',
      programId: 'corporate-2',
      programName: 'Microsoft TEALS Program',
      applicantId: 'user-1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@example.com',
      phone: '(555) 123-4567',
      submissionDate: '2025-12-10',
      status: 'submitted',
      lastUpdated: '2025-12-10'
    },
  ];

  const filteredApplications = mockApplications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = app.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    const statusObj = APPLICATION_TRACKING_STATUSES.find(s => s.id === status);
    return statusObj?.color || 'bg-slate-500';
  };

  const getStatusDescription = (status: string) => {
    const statusObj = APPLICATION_TRACKING_STATUSES.find(s => s.id === status);
    return statusObj?.description || '';
  };

  const getStatusLabel = (status: string) => {
    const statusObj = APPLICATION_TRACKING_STATUSES.find(s => s.id === status);
    return statusObj?.label || status;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white">
              <TrendingUp size={24} />
            </div>
            <h1 className="heading-serif text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
              Track Your Applications
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl max-w-2xl">
            Monitor the status of all your scholarship and grant applications in real-time. Get instant updates as our team reviews your submission.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: 'Total Applications', value: mockApplications.length, icon: <FileText size={20} />, color: 'from-blue-500 to-cyan-500' },
            { label: 'Under Review', value: mockApplications.filter(a => a.status === 'reviewing').length, icon: <Clock size={20} />, color: 'from-amber-500 to-orange-500' },
            { label: 'Finalists', value: mockApplications.filter(a => a.status === 'finalist').length, icon: <Zap size={20} />, color: 'from-purple-500 to-pink-500' },
            { label: 'Awarded', value: mockApplications.filter(a => a.status === 'awarded').length, icon: <CheckCircle2 size={20} />, color: 'from-emerald-500 to-green-500' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-black mb-1">{stat.value}</div>
              <div className="text-white/80 text-sm font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-8 shadow-sm border border-slate-100 dark:border-slate-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="reviewing">Under Review</option>
                <option value="interview">Interview Requested</option>
                <option value="finalist">Finalist</option>
                <option value="awarded">Awarded</option>
                <option value="declined">Not Selected</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Applications List */}
        <AnimatePresence mode="wait">
          {filteredApplications.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredApplications.map((app, index) => {
                const statusColor = getStatusColor(app.status);
                const statusLabel = getStatusLabel(app.status);
                const statusDesc = getStatusDescription(app.status);

                return (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Left Section */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-12 h-12 ${statusColor} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                            {app.status === 'awarded' && <CheckCircle2 size={24} />}
                            {app.status === 'declined' && <AlertCircle size={24} />}
                            {['submitted', 'reviewing', 'interview', 'finalist'].includes(app.status) && <Clock size={24} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="heading-serif text-lg md:text-xl font-black text-slate-900 dark:text-white break-words">
                              {app.programName}
                            </h3>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-black rounded-lg uppercase">
                                {app.type}
                              </span>
                              <span className="text-sm text-slate-500 dark:text-slate-400">
                                Submitted: {new Date(app.submissionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status Info */}
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600">
                          <p className="text-xs md:text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Status: <span className={statusColor + ' text-white px-2 py-1 rounded inline-block ml-1'}>{statusLabel}</span>
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">{statusDesc}</p>
                        </div>
                      </div>

                      {/* Right Section */}
                      <div className="md:w-48 flex flex-col gap-3">
                        {/* Score Display */}
                        {app.score && (
                          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl p-3 border border-indigo-200 dark:border-indigo-700/50">
                            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1 uppercase tracking-wider">Evaluation Score</p>
                            <p className="text-2xl font-black text-indigo-700 dark:text-indigo-300">{app.score}%</p>
                          </div>
                        )}

                        {/* Last Updated */}
                        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Calendar size={14} />
                          Last updated: {new Date(app.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-black text-xs uppercase transition-all">
                            <Download size={14} className="mx-auto" />
                          </button>
                          <button className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-black text-xs uppercase transition-all">
                            <Share2 size={14} className="mx-auto" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-700"
            >
              <FileText size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-xl font-black text-slate-700 dark:text-slate-200 mb-2">No Applications Found</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'Submit an application to track your progress here'}
              </p>
              <button
                onClick={() => onNavigate('APPLY')}
                className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
              >
                Start Your Application →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upcoming Deadlines */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800/50"
        >
          <h2 className="heading-serif text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <Calendar size={28} className="text-emerald-600 dark:text-emerald-400" />
            Upcoming Deadlines
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {GRANT_DEADLINES_CALENDAR.slice(0, 6).map((deadline, i) => (
              <div 
                key={i}
                className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-3 border border-emerald-200 dark:border-emerald-700/50 hover:shadow-md transition-all"
              >
                <p className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase mb-1">{deadline.month}</p>
                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-300 mb-2">{deadline.grants}</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{deadline.nextDeadline}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('GRANTS')}
            className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-black text-sm uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
          >
            View All Deadlines <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationTracker;
