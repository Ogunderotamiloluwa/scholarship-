
import React from 'react';
import { ViewState } from '../types';
import { Menu, X, Heart, ChevronRight, Zap, Award, BookOpen, HelpCircle, Briefcase, FileText, Calendar, Landmark, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  onBack?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, isMenuOpen, setIsMenuOpen, onBack }) => {
  const menuItems: { id: ViewState; label: string; icon: JSX.Element }[] = [
    { id: 'HOME', label: 'Home', icon: <Zap size={20} /> },
    { id: 'SCHOLARSHIPS', label: 'Scholarships', icon: <Award size={20} /> },
    { id: 'INSTITUTIONS', label: 'Universities', icon: <Landmark size={20} /> },
    { id: 'GRANTS', label: 'Grants', icon: <Briefcase size={20} /> },
    { id: 'SCHOLARSHIP_HUB', label: 'Hub', icon: <BookOpen size={20} /> },
    { id: 'INTERNSHIP_OPPORTUNITIES', label: 'Internships', icon: <Briefcase size={20} /> },
    { id: 'COMMUNITY_EVENTS', label: 'Events', icon: <Calendar size={20} /> },
    { id: 'NEWS', label: 'News', icon: <FileText size={20} /> },
    { id: 'RESOURCE_HUB', label: 'Resources', icon: <BookOpen size={20} /> },
    { id: 'SUPPORT', label: 'Support', icon: <HelpCircle size={20} /> },
  ];

  // Enhanced logo component
  const LogoComponent = () => (
    <div 
      className="flex items-center gap-2 md:gap-3 cursor-pointer group flex-shrink-0"
      onClick={() => setView('HOME')}
    >
      <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
        <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 rounded-[10px] md:rounded-[14px] flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:shadow-indigo-500/50 group-hover:shadow-xl group-hover:-rotate-3 group-hover:scale-110">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
            <path d="M12 12v4M10 14h4" strokeOpacity="0.8"></path>
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full border-2 border-white dark:border-slate-950 shadow-md"></div>
      </div>
      <div className="flex flex-col flex-shrink-0">
        <span className="heading-serif text-base md:text-lg lg:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Beacon</span>
        <span className="text-[7px] md:text-[8px] font-black text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">Scholars</span>
      </div>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-[120] h-16 md:h-20 border-b border-slate-100 dark:border-slate-800 transition-all bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between gap-2 md:gap-4 lg:gap-8">
        {/* Back Button - Show on non-home pages */}
        {currentView !== 'HOME' && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg md:rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm hover:shadow-md group"
            title="Go back to previous page"
          >
            <ArrowLeft size={18} className="md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
          </motion.button>
        )}

        {/* Logo - Now with more spacing */}
        <LogoComponent />

        {/* Desktop Menu - Scrollable on MD and up with better layout */}
        <div className="hidden md:flex items-center gap-0.5 lg:gap-1 xl:gap-2 flex-1 justify-center px-2 overflow-x-auto no-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center justify-center gap-0.5 lg:gap-1 text-[6px] lg:text-[7px] xl:text-[8px] font-black uppercase tracking-[0.08em] transition-all relative py-2 px-1 lg:px-2 group whitespace-nowrap flex-shrink-0 ${
                currentView === item.id ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              title={item.label}
            >
              <span className={`transition-all opacity-70 group-hover:opacity-100 text-[14px] lg:text-[16px] ${currentView === item.id ? 'opacity-100' : ''}`}>{item.icon}</span>
              <span className="hidden lg:inline">{item.label}</span>
              {currentView === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-transparent rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
          {/* Application Tracker Icon */}
          <button
            onClick={() => setView('APPLICATION_TRACKER')}
            className="hidden sm:flex items-center justify-center w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-lg md:rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
            title="Track Applications"
          >
            <Award size={16} />
          </button>

          {/* CTA Button - Desktop */}
          <button 
            onClick={() => setView('APPLY')} 
            className="hidden sm:block bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 rounded-lg text-[7px] md:text-[8px] lg:text-[9px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-[0.98] transform hover:shadow-indigo-500/50 hover:shadow-xl whitespace-nowrap"
          >
            Apply Now →
          </button>

          {/* Mobile Burger Button - Improved */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all transform active:scale-95 ${
              isMenuOpen 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {isMenuOpen ? <X size={18} strokeWidth={3} /> : <Menu size={18} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Improved UX */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="lg:hidden fixed inset-0 z-[140] bg-black/40 backdrop-blur-sm"
            />
            
            {/* Slide Menu */}
            <motion.div 
              initial={{ opacity: 0, x: '100%' }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden fixed top-0 right-0 h-screen z-[150] bg-white dark:bg-slate-950 flex flex-col w-full sm:w-72 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200 dark:border-slate-800 px-6 pt-6 flex-shrink-0">
                 <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Menu</h3>
                 <motion.button 
                   whileTap={{ scale: 0.9 }}
                   onClick={() => setIsMenuOpen(false)} 
                   className="w-10 h-10 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 rounded-lg flex items-center justify-center transition-all shadow-lg"
                 >
                   <X size={20} className="text-white" strokeWidth={3} />
                 </motion.button>
              </div>
              
              {/* Navigation Items */}
              <div className="space-y-1 px-4 flex-1">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => { setView(item.id); setIsMenuOpen(false); }}
                    className={`group flex items-center gap-3 w-full py-3 px-4 rounded-xl transition-all active:scale-95 ${
                      currentView === item.id 
                        ? 'bg-indigo-600/15 dark:bg-indigo-600/25 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30' 
                        : 'text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <span className={`text-lg transition-transform group-hover:scale-110 ${currentView === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      {item.icon}
                    </span>
                    <span className="text-sm font-black tracking-tight uppercase">{item.label}</span>
                    {currentView === item.id && <div className="ml-auto w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full" />}
                  </motion.button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-auto space-y-3 p-6 border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
                 <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800/50">
                   <p className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">Track Your Applications</p>
                   <button 
                     onClick={() => { setView('APPLICATION_TRACKER'); setIsMenuOpen(false); }}
                     className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all"
                   >
                     View Status
                   </button>
                 </div>
                 <button 
                   onClick={() => { setView('DONATE'); setIsMenuOpen(false); }}
                   className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl font-black text-sm shadow-lg shadow-rose-500/30 uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2"
                 >
                   <Heart size={16}/> Donate Now
                 </button>
                 <button 
                   onClick={() => { setView('APPLY'); setIsMenuOpen(false); }}
                   className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-black text-sm shadow-lg shadow-indigo-600/30 uppercase tracking-widest active:scale-95 transition-all"
                 >
                   Apply for Award →
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
