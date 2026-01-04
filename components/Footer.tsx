
import React from 'react';
import { ViewState } from '../types';

interface FooterProps {
  setView: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="heading-serif text-lg font-bold text-white tracking-tight">Beacon Scholar</span>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Empowering the next generation of US leaders through merit-based and need-based financial awards. Registered 501(c)(3) Nonprofit.
          </p>
          <div className="flex gap-4">
            {['Twitter', 'LinkedIn', 'Facebook'].map(s => (
              <span key={s} className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs hover:text-indigo-400 cursor-pointer transition-colors">{s[0]}</span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Navigation</h4>
          <ul className="space-y-4 text-sm">
            <li><button onClick={() => setView('HOME')} className="hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => setView('ABOUT')} className="hover:text-white transition-colors">About Us</button></li>
            <li><button onClick={() => setView('SCHOLARSHIPS')} className="hover:text-white transition-colors">Scholarship Models</button></li>
            <li><button onClick={() => setView('FAQ')} className="hover:text-white transition-colors">Support & FAQ</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Scholarships</h4>
          <ul className="space-y-4 text-sm">
            <li><button onClick={() => setView('APPLY')} className="hover:text-white transition-colors">Undergraduate Grant</button></li>
            <li><button onClick={() => setView('APPLY')} className="hover:text-white transition-colors">Graduate Fellowship</button></li>
            <li><button onClick={() => setView('APPLY')} className="hover:text-white transition-colors">Young Scholars Program</button></li>
            <li><button onClick={() => setView('APPLY')} className="hover:text-white transition-colors">Eligibility Check</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Contact Information</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-2">
              <span className="text-indigo-500">📍</span>
              1200 Foundation Ave, Suite 400<br/>Washington, DC 20005
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-500">📞</span>
              (202) 555-0198
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-500">✉️</span>
              apply@beaconscholar.org
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between gap-4 text-xs">
        <div>© 2026 Beacon Scholar Foundation. All Rights Reserved.</div>
        <div className="flex gap-6">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-white cursor-pointer transition-colors">Cookie Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors font-bold text-indigo-400">EIN: 12-3456789</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
