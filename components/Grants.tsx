import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Clock, DollarSign, CheckCircle2, AlertCircle, Check,
  ChevronRight, Calendar, Building2, FileText, ArrowRight
} from 'lucide-react';
import { ViewState, GrantType } from '../types';
import { GRANTS, EXPANDED_GRANTS, GRANT_DEADLINES_CALENDAR } from '../Constants';

interface GrantsProps {
  onNavigate: (view: ViewState) => void;
  onGrantSelect?: (grant: GrantType) => void;
}

const Grants: React.FC<GrantsProps> = ({ onNavigate, onGrantSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const categories = ['Student', 'Business', 'Nonprofit', 'Research', 'Other'];
  const statuses = ['Open', 'Closed', 'Upcoming'];

  const filteredGrants = useMemo(() => {
    return GRANTS.filter(grant => {
      const matchesSearch = 
        grant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant.organization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || grant.category === selectedCategory;
      const matchesStatus = !selectedStatus || grant.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Open': return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Upcoming': return 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Closed': return 'bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700';
      default: return 'bg-slate-50 dark:bg-slate-900/20 text-slate-700 dark:text-slate-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Student': return 'from-blue-500 to-blue-600';
      case 'Business': return 'from-emerald-500 to-emerald-600';
      case 'Nonprofit': return 'from-pink-500 to-pink-600';
      case 'Research': return 'from-purple-500 to-purple-600';
      default: return 'from-indigo-500 to-indigo-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 pt-24">
      {/* Hero Section */}
      <section className="relative px-6 py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-15">
          <img 
            src="/images/rut-miit-3EMw3T-ZjkE-unsplash.jpg"
            alt="Grant opportunities"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-blue-600/80"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="heading-serif text-5xl md:text-6xl font-black mb-6 leading-tight">
              Verified Grants & Funding
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mb-8">
              Discover thousands of legitimate grant opportunities for students, businesses, nonprofits, and researchers. All grants are verified from official sources.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="px-6 py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by grant name, organization, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 transition-all"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category Filter */}
            <div>
              <h3 className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Filter size={16} /> Grant Category
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                    selectedCategory === null
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h3 className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock size={16} /> Status
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedStatus(null)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                    selectedStatus === null
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  All Status
                </button>
                {statuses.map(status => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                      selectedStatus === status
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Showing <span className="text-indigo-600 dark:text-indigo-400 font-black">{filteredGrants.length}</span> of <span className="font-black text-slate-900 dark:text-white">{GRANTS.length}</span> grants
            </p>
          </div>
        </div>
      </section>

      {/* Grants Grid */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {filteredGrants.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <AlertCircle size={48} className="mx-auto text-slate-400 mb-4" />
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No grants found</h3>
              <p className="text-slate-600 dark:text-slate-400">Try adjusting your filters or search terms</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence>
                {filteredGrants.map((grant, idx) => (
                  <motion.div
                    key={grant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group"
                  >
                    <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full border border-slate-200 dark:border-slate-800 flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-800">
                        <img
                          src={grant.image}
                          alt={grant.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                        
                        {/* Category Badge */}
                        <div className={`absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r ${getCategoryColor(grant.category)} text-white font-bold text-sm shadow-lg`}>
                          {grant.category}
                        </div>

                        {/* Verified Badge */}
                        {grant.verified && (
                          <div className="absolute top-4 left-4 flex items-center gap-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
                            <CheckCircle2 size={14} /> Verified
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        {/* Status Badge */}
                        <div className="mb-4">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getStatusColor(grant.status)}`}>
                            {grant.status === 'Open' && <CheckCircle2 size={12} />}
                            {grant.status === 'Upcoming' && <Clock size={12} />}
                            {grant.status === 'Closed' && <AlertCircle size={12} />}
                            {grant.status}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-black text-lg text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                          {grant.name}
                        </h3>

                        {/* Organization */}
                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-4 flex items-center gap-2">
                          <Building2 size={16} className="text-indigo-600" />
                          {grant.organization}
                        </p>

                        {/* Amount */}
                        <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                          <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Grant Amount</p>
                          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{grant.amount}</p>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 flex-grow">
                          {grant.description}
                        </p>

                        {/* Deadline */}
                        <div className="mb-6 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                          <p className="text-xs text-amber-900 dark:text-amber-200 uppercase font-bold tracking-wider flex items-center gap-2 mb-1">
                            <Calendar size={14} /> Deadline
                          </p>
                          <p className="font-black text-amber-700 dark:text-amber-300">
                            {new Date(grant.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>

                        {/* Documents */}
                        <div className="mb-6">
                          <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-bold tracking-wider mb-2 flex items-center gap-2">
                            <FileText size={14} /> Required Documents
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {grant.requiredDocuments.slice(0, 3).map((doc, i) => (
                              <span key={i} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full">
                                {doc}
                              </span>
                            ))}
                            {grant.requiredDocuments.length > 3 && (
                              <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full">
                                +{grant.requiredDocuments.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                          <button
                            onClick={() => {
                              onGrantSelect?.(grant);
                              onNavigate('GRANT_APPLICATION');
                            }}
                            className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black text-sm py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-600/50"
                          >
                            Apply Now <ArrowRight size={14} />
                          </button>
                          <button
                            onClick={() => onGrantSelect?.(grant)}
                            className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-black text-sm py-3 rounded-lg transition-all"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* EXPANDED GRANTS DATABASE SECTION */}
      <section className="px-6 py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-serif text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              50+ Verified Grants & Funding Sources
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Federal grants, foundation funding, corporate donations, and specialized grant programs all in one database
            </p>
          </motion.div>

          {/* Grant Type Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Federal Grants', count: 4, color: 'from-blue-500 to-blue-600' },
              { label: 'Foundation Grants', count: 5, color: 'from-emerald-500 to-emerald-600' },
              { label: 'Corporate Grants', count: 5, color: 'from-indigo-500 to-indigo-600' }
            ].map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${type.color} rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="text-4xl font-black mb-2">{type.count}</div>
                <p className="font-semibold text-white/90">{type.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Deadline Calendar */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-12 border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <Calendar size={28} className="text-emerald-600 dark:text-emerald-400" />
              Upcoming Deadlines
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {GRANT_DEADLINES_CALENDAR.map((deadline, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-700 rounded-xl p-4 hover:shadow-md transition-all border border-slate-200 dark:border-slate-600"
                >
                  <p className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase mb-2">{deadline.month}</p>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mb-2">{deadline.grants}</p>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">{deadline.nextDeadline}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Grant Tips */}
          <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800/50">
            <h3 className="text-xl font-black text-amber-900 dark:text-amber-300 mb-6 flex items-center gap-3">
              <CheckCircle2 size={24} />
              Grant Application Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Start Early', desc: 'Begin 2-3 months before deadlines' },
                { title: 'Prepare Documents', desc: 'Gather all required paperwork in advance' },
                { title: 'Read Requirements', desc: 'Carefully review eligibility criteria' },
                { title: 'Follow Instructions', desc: 'Submit exactly as requested by funders' },
                { title: 'Proofread', desc: 'Check all applications multiple times' },
                { title: 'Track Submissions', desc: 'Keep records of all applications filed' }
              ].map((tip, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 bg-amber-400 dark:bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="font-black text-amber-900 dark:text-amber-300">{tip.title}</p>
                    <p className="text-sm text-amber-800 dark:text-amber-400/80">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-serif text-4xl font-black mb-6">Ready to Apply?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Start your grant application journey today. All opportunities are verified and safe to apply.
          </p>
          <button
            onClick={() => onNavigate('HOW_IT_WORKS')}
            className="bg-white text-indigo-600 font-black px-10 py-4 rounded-xl hover:bg-indigo-50 transition-all inline-flex items-center gap-3 shadow-xl"
          >
            Learn How to Apply <ChevronRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Grants;
