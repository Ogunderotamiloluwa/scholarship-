
import React, { useState } from 'react';
import { FAQS } from '../Constants';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white dark:bg-slate-950 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[450px] flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden px-4 pt-32 pb-16">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200"
            alt="FAQ and support"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 to-slate-950"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 border border-indigo-400/50 text-indigo-200 text-[10px] font-black uppercase tracking-[0.3em] mb-6 backdrop-blur-sm">
              <HelpCircle size={14} /> FREQUENTLY ASKED QUESTIONS
            </div>
            <h1 className="heading-serif text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-6">
              We Have <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-emerald-200">Answers</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-light max-w-2xl mx-auto">
              Everything you need to know about applying, our selection process, and your path to success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <div className="animate-in fade-in duration-500 space-y-6">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-800">{faq.question}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 text-slate-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-slate-600 leading-relaxed animate-in slide-in-from-top-2 duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-900 text-white rounded-3xl p-10 text-center">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-slate-400 mb-8">Our support team is ready to help you with your application journey.</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-full font-bold transition-all shadow-lg active:scale-95">
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
