import React, { useState, useMemo } from 'react';
import { ViewState } from '../types';
import { SCHOLARSHIPS } from '../Constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Award, DollarSign, Calendar, CheckCircle, ArrowRight, X } from 'lucide-react';

interface ScholarshipsProps {
  onNavigate: (view: ViewState) => void;
}

const Scholarships: React.FC<ScholarshipsProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [minAmount, setMinAmount] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'STEM', 'Law', 'Medical', 'Arts', 'General'];

  // Parse scholarship amounts for comparison
  const parseAmount = (amount: string): number => {
    const match = amount.match(/\$[\d,]+/);
    if (!match) return 0;
    return parseInt(match[0].replace(/[$,]/g, ''), 10);
  };

  const filteredScholarships = useMemo(() => {
    return SCHOLARSHIPS.filter(scholarship => {
      const matchesSearch = 
        scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.eligibility.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || scholarship.category === selectedCategory;
      
      const scholarshipAmount = parseAmount(scholarship.amount);
      const matchesAmount = scholarshipAmount >= minAmount;

      return matchesSearch && matchesCategory && matchesAmount;
    });
  }, [searchQuery, selectedCategory, minAmount]);

  return (
    <div className="bg-white dark:bg-slate-950 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[500px] flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden px-4 pt-32 pb-16">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1523050335456-c6d860cb0d12?auto=format&fit=crop&q=80&w=1200"
            alt="Scholarship opportunities"
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
              Scholarship <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-emerald-200">Opportunities</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-8">
              Discover funding opportunities tailored to your academic goals and background. {SCHOLARSHIPS.length}+ active scholarships available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEARCH & FILTER SECTION */}
      <section className="sticky top-20 md:top-24 z-40 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xl py-6 md:py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search scholarships by name, eligibility, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 md:py-5 border-2 border-slate-200 dark:border-slate-700 rounded-xl md:rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-lg md:text-base focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Category Filter - Visible on Desktop */}
            <div className="hidden md:flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-xl font-bold text-sm transition-all transform active:scale-95 whitespace-nowrap ${
                    selectedCategory === category 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              <Filter size={16} />
              Filters
            </button>

            {/* Min Amount Filter */}
            <div className="hidden md:block ml-auto">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mr-3">
                Minimum Award: ${minAmount.toLocaleString()}
              </label>
              <input 
                type="range" 
                min="0" 
                max="55000" 
                step="5000"
                value={minAmount}
                onChange={(e) => setMinAmount(Number(e.target.value))}
                className="w-48 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* Result Count */}
            <div className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-auto">
              {filteredScholarships.length} {filteredScholarships.length === 1 ? 'scholarship' : 'scholarships'}
            </div>
          </div>

          {/* Mobile Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
              >
                <div className="space-y-4">
                  {/* Categories */}
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-3">Category</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                            selectedCategory === category 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amount Slider */}
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-3">Minimum Award</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-slate-600 dark:text-slate-400">${minAmount.toLocaleString()}</p>
                      <input 
                        type="range" 
                        min="0" 
                        max="55000" 
                        step="5000"
                        value={minAmount}
                        onChange={(e) => setMinAmount(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="bg-white dark:bg-slate-950 px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {filteredScholarships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="wait">
                {filteredScholarships.map((scholarship, index) => (
                  <motion.div
                    key={scholarship.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl flex flex-col h-full"
                  >
                    {/* Header */}
                    <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 dark:from-slate-800 to-slate-100 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <Award size={24} />
                        </div>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{scholarship.category}</span>
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {scholarship.name}
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow space-y-6">
                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed line-clamp-3">
                        {scholarship.description}
                      </p>

                      {/* Key Details */}
                      <div className="space-y-4 py-6 border-y border-slate-200 dark:border-slate-700">
                        {/* Amount */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <DollarSign size={18} className="text-indigo-600" />
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Award Amount</span>
                          </div>
                          <span className="text-lg md:text-xl font-black text-indigo-600 dark:text-indigo-400">
                            {scholarship.amount}
                          </span>
                        </div>

                        {/* Deadline */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-amber-600" />
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Deadline</span>
                          </div>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            {new Date(scholarship.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
                          </span>
                        </div>
                      </div>

                      {/* Eligibility */}
                      <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                          <CheckCircle size={16} className="text-emerald-600" />
                          Eligibility
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                          {scholarship.eligibility}
                        </p>
                      </div>

                      {/* CTA */}
                      <button 
                        onClick={() => onNavigate('APPLY')}
                        className="mt-auto group/btn inline-flex items-center gap-2 justify-center w-full px-5 py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-base transition-all shadow-lg hover:shadow-xl active:scale-95"
                      >
                        Apply Now
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Award size={64} className="mx-auto text-slate-300 dark:text-slate-700 mb-6 opacity-50" />
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No scholarships found</h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-6">Try adjusting your search filters to find more opportunities.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setMinAmount(0);
                }}
                className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-600 px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Apply?</h2>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Start your application today. Our team is here to support you through every step of the process.
          </p>
          <button 
            onClick={() => onNavigate('APPLY')}
            className="px-8 md:px-12 py-4 md:py-5 bg-white text-indigo-600 font-black rounded-xl md:rounded-2xl hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            Start Your Application
          </button>
        </div>
      </section>
    </div>
  );
};

export default Scholarships;
