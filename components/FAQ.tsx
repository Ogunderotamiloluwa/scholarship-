
import React, { useState } from 'react';
import { FAQS } from '../Constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="heading-serif text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h1>
        <p className="text-slate-500">Everything you need to know about applying and our selection process.</p>
      </div>

      <div className="space-y-4">
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
    </div>
  );
};

export default FAQ;
