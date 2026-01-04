
import React from 'react';
import { ViewState } from '../types';
import { Menu, X, Heart, ChevronRight, Zap, Award, BookOpen, HelpCircle, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, isMenuOpen, setIsMenuOpen }) => {
  const menuItems: { id: ViewState; label: string; icon: JSX.Element }[] = [
    { id: 'HOME', label: 'Home Portal', icon: <Zap size={20} /> },
    { id: 'SCHOLARSHIPS', label: 'Scholarships', icon: <Award size={20} /> },
    { id: 'GRANTS', label: 'Grants', icon: <Briefcase size={20} /> },
    { id: 'RESOURCE_HUB', label: 'Resources', icon: <BookOpen size={20} /> },
    { id: 'ABOUT', label: 'About Us', icon: <BookOpen size={20} /> },
    { id: 'FAQ', label: 'Support', icon: <HelpCircle size={20} /> },
    { id: 'ADMIN', label: 'Admin', icon: <Zap size={20} /> },
  ];

  // Enhanced logo component
  const LogoComponent = () => (
    <div 
      className="flex items-center gap-3 cursor-pointer group"
      onClick={() => setView('HOME')}
    >
      <div className="relative w-11 h-11">
        <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[12px] flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:shadow-indigo-500/50 group-hover:shadow-2xl group-hover:-rotate-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
            <path d="M12 12v4M10 14h4" strokeOpacity="0.7"></path>
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-950 shadow-md"></div>
      </div>
      <div className="flex flex-col">
        <span className="heading-serif text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Beacon</span>
        <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">Scholars</span>
      </div>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-[120] h-16 md:h-20 border-b border-slate-100 dark:border-slate-800 transition-all bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-8">
        <LogoComponent />

        {/* Desktop Menu - Centered with better spacing */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.15em] transition-all relative py-2 group whitespace-nowrap ${
                currentView === item.id ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <span className={`transition-all opacity-70 group-hover:opacity-100 ${currentView === item.id ? 'opacity-100' : ''}`}>{item.icon}</span>
              <span className="hidden lg:inline">{item.label.split(' ')[0]}</span>
              {currentView === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-transparent rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* CTA Button - Right side */}
        <div className="hidden md:flex items-center">
             <button onClick={() => setView('APPLY')} className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-[0.98] transform hover:shadow-indigo-500/50 hover:shadow-xl">
                Apply Now →
              </button>
        </div>

        {/* Mobile Burger Button - Enhanced */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden w-12 h-12 rounded-2xl flex items-center justify-center transition-all transform active:scale-95 ${
            isMenuOpen 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {isMenuOpen ? <X size={22} strokeWidth={3} /> : <Menu size={22} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Enhanced Mobile Menu Overlay - Full Screen Height with Responsive Width */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed top-0 right-0 h-screen z-[150] bg-white dark:bg-slate-950 flex flex-col w-full sm:w-[60%] overflow-y-auto"
          >
            {/* Backdrop - Transparent to keep close button visible */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 z-[50] pointer-events-auto"
              style={{ background: 'transparent' }}
            />
            
            {/* Header */}
            <div className="flex justify-between items-center mb-12 pb-6 border-b border-slate-200 dark:border-slate-800 px-6 relative z-10">
               <LogoComponent />
               <motion.button 
                 whileTap={{ scale: 0.9 }}
                 onClick={() => setIsMenuOpen(false)} 
                 className="w-14 h-14 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-red-500/50"
               >
                 <X size={28} className="text-white font-black" strokeWidth={3} />
               </motion.button>
            </div>
            
            {/* Navigation Items with Icons */}
            <div className="space-y-2 mb-12 px-6 relative z-10">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => { setView(item.id); setIsMenuOpen(false); }}
                  className={`group flex items-center gap-4 w-full py-4 px-5 rounded-2xl transition-all transform active:scale-95 ${
                    currentView === item.id 
                      ? 'bg-gradient-to-r from-indigo-600/20 to-indigo-400/10 dark:from-indigo-600/30 dark:to-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30' 
                      : 'text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className={`text-xl transition-transform group-hover:scale-110 ${currentView === item.id ? 'text-indigo-600' : 'text-slate-500'}`}>
                    {item.icon}
                  </span>
                  <div className="flex flex-col items-start flex-1">
                    <span className="text-base font-black tracking-tight uppercase">{item.label}</span>
                    {currentView === item.id && (
                      <span className="text-[10px] font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">Current</span>
                    )}
                  </div>
                  <ChevronRight size={20} className={`transition-all ${currentView === item.id ? 'opacity-100 translate-x-1' : 'opacity-20'}`} />
                </motion.button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-auto space-y-3 pb-8 px-6 relative z-10">
               <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl p-4 border border-rose-200 dark:border-rose-800/50 mb-3">
                 <p className="text-[12px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3">Support Our Mission</p>
                 <button className="w-full py-3 border border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-400 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-rose-100/50 dark:hover:bg-rose-900/30">
                    <Heart size={16}/> Donate & Support
                 </button>
               </div>
               <motion.button 
                 whileTap={{ scale: 0.98 }}
                 onClick={() => { setView('APPLY'); setIsMenuOpen(false); }}
                 className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-black text-sm shadow-lg shadow-indigo-600/30 uppercase tracking-widest active:scale-95 transition-all transform hover:shadow-indigo-600/50 hover:shadow-2xl"
               >
                 Apply for Award → 
               </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
