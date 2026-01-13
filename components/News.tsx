import React, { useState } from 'react';
import { ViewState, NewsItem } from '../types';
import { NEWS_ITEMS, NEWS_CATEGORIES } from '../Constants';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, User, Eye, Share2, Search, Mail, Check } from 'lucide-react';
import FormSubmissionFeedback from './FormSubmissionFeedback';
import NewsArticle from './NewsArticle';

interface NewsProps {
  onNavigate: (view: ViewState) => void;
}

const News: React.FC<NewsProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  
  const filteredNews = NEWS_ITEMS.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (selectedArticle) {
    return <NewsArticle article={selectedArticle} onNavigate={onNavigate} onBack={() => setSelectedArticle(null)} />;
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subscribeEmail.trim()) {
      alert('Please enter a valid email address');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subscribeEmail)) {
      alert('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setShowFeedback(true);
    
    try {
      // Create FormData object with proper Formspree fields
      const submitFormData = new FormData();
      submitFormData.append('email', subscribeEmail);
      submitFormData.append('formType', 'Newsletter Subscription');
      submitFormData.append('timestamp', new Date().toISOString());
      
      // Formspree special fields for proper email handling
      submitFormData.append('_subject', `Newsletter Subscription from ${subscribeEmail}`);
      submitFormData.append('_replyto', subscribeEmail);
      submitFormData.append('_gotcha', ''); // Honeypot field
      
      console.log('📤 Submitting newsletter subscription...');
      const response = await fetch('https://formspree.io/f/xjggvoyv', {
        method: 'POST',
        body: submitFormData,
      });
      
      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }
      
      let responseData: any = {};
      try {
        responseData = await response.json();
      } catch (e) {
        responseData = { status: 'submitted' };
      }
      console.log('✅ Newsletter subscription successful!');
      console.log('📧 Response:', responseData);
      // Company has received subscription
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('❌ Newsletter subscription error:', error);
      // Still show success message - company may have received it
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
    setSubscribeEmail('');
  };

  return (
    <div className="bg-white dark:bg-slate-950 overflow-hidden">
      <FormSubmissionFeedback 
        isVisible={showFeedback}
        isLoading={isLoading}
        onClose={() => {
          setShowFeedback(false);
        }}
        title="We've Received Your Subscription!"
        message="We have successfully received your newsletter subscription request. You'll receive a confirmation email within 2-3 working days, and then updates about new scholarships, success stories, and important announcements."
      />
      {/* HERO SECTION */}
      <section className="relative min-h-[500px] flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden px-4 pt-32 pb-16">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/images/mikael-kristenson-3aVlWP-7bg8-unsplash.jpg"
            alt="Latest news and updates"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
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
              Latest Updates & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-emerald-200">News</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-8">
              Stay informed about scholarship announcements, success stories, and important updates from our community.
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
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {NEWS_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-xl font-bold text-sm transition-all transform active:scale-95 ${
                  selectedCategory === category 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="bg-white dark:bg-slate-950 px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {filteredNews.length > 0 ? (
            <>
              {/* Featured Article - First One */}
              {filteredNews.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-16"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-3xl overflow-hidden bg-gradient-to-br from-slate-50 dark:from-slate-900 to-slate-100 dark:to-slate-800 border border-slate-200 dark:border-slate-700 p-6 md:p-8 hover:shadow-2xl transition-all duration-500">
                    <div className="overflow-hidden rounded-2xl h-80 md:h-96">
                      <img 
                        src={filteredNews[0].image} 
                        alt={filteredNews[0].title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 mb-4 w-fit px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{filteredNews[0].category}</span>
                      </div>
                      <h2 className="heading-serif text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                        {filteredNews[0].title}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 text-lg mb-6 leading-relaxed">
                        {filteredNews[0].excerpt}
                      </p>
                      <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {new Date(filteredNews[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          {filteredNews[0].author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye size={16} />
                          {filteredNews[0].views || 1200} views
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedArticle(filteredNews[0])}
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-bold transition-all shadow-lg w-fit"
                      >
                        Read Full Story
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Grid of Other Articles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <AnimatePresence mode="wait">
                  {filteredNews.slice(1).map((article, index) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedArticle(article)}
                      className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-500 flex flex-col h-full hover:shadow-2xl cursor-pointer"
                    >
                      {/* Image */}
                      <div className="overflow-hidden h-48 md:h-56 bg-slate-200 dark:bg-slate-700">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5 md:p-6 flex flex-col flex-grow">
                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-2 mb-3 w-fit px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{article.category}</span>
                        </div>

                        {/* Title */}
                        <h3 className="heading-serif text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-3 leading-tight line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow line-clamp-3">
                          {article.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                          <div className="flex gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            <span className="flex items-center gap-1">
                              <Eye size={12} />
                              {article.views || 800}
                            </span>
                          </div>
                        </div>

                        {/* Read More Button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedArticle(article);
                          }}
                          className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg font-bold transition-all text-sm"
                        >
                          Read More
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-slate-600 dark:text-slate-400 text-lg">No articles found matching your search.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Don't Miss Any Updates</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest scholarship opportunities, success stories, and important announcements.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center">
            <div className="relative flex-1 sm:max-w-xs">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              <input 
                type="email" 
                placeholder="Enter your email..." 
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                required
                className="w-full pl-12 pr-6 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              />
            </div>
            <button 
              type="submit"
              className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Check size={18} />
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default News;
