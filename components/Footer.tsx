
import React from 'react';
import { ViewState } from '../types';
import { Heart, Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';

interface FooterProps {
  setView: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 md:pt-32 px-4">
      {/* Donation CTA Section */}
      <div className="max-w-7xl mx-auto mb-20 md:mb-32">
        <div className="bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-3xl md:rounded-5xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <Heart size={40} className="text-white animate-pulse" />
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-4">Support Our Mission</h3>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Your donation helps fund scholarships and grants for the next generation of leaders.
            </p>
            <button className="px-8 md:px-12 py-4 md:py-6 bg-white text-indigo-600 font-black rounded-2xl hover:bg-slate-100 transition-all shadow-2xl text-lg md:text-xl">
              Donate Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-16 mb-16 md:mb-24">
        
        {/* Brand & About */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg flex items-center justify-center text-white shadow-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
                <path d="M12 12v4M10 14h4" strokeOpacity="0.7"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="heading-serif text-lg md:text-xl font-black text-white tracking-tight leading-none">Beacon</span>
              <span className="text-[10px] font-black text-indigo-400 tracking-widest uppercase">Scholars</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-8">
            Advancing excellence and impact through merit-based scholarships and grants. A registered 501(c)(3) nonprofit organization.
          </p>
          <div className="flex gap-4">
            {[
              { icon: Facebook, label: 'Facebook' },
              { icon: Twitter, label: 'Twitter' },
              { icon: Linkedin, label: 'LinkedIn' },
              { icon: Instagram, label: 'Instagram' }
            ].map(({ icon: Icon, label }) => (
              <button key={label} className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 text-slate-400 hover:text-white transition-all transform hover:scale-110">
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* Programs & Scholarships */}
        <div>
          <h4 className="text-white font-black mb-6 text-sm uppercase tracking-widest">Programs</h4>
          <ul className="space-y-3 text-sm">
            <li><button onClick={() => setView('SCHOLARSHIPS')} className="text-slate-400 hover:text-white transition-colors">Scholarships</button></li>
            <li><button onClick={() => setView('GRANTS')} className="text-slate-400 hover:text-white transition-colors">Grants</button></li>
            <li><button onClick={() => setView('APPLY')} className="text-slate-400 hover:text-white transition-colors">Apply Now</button></li>
            <li><button onClick={() => setView('MEMBERS')} className="text-slate-400 hover:text-white transition-colors">Member Institutions</button></li>
            <li><button onClick={() => setView('RESOURCE_HUB')} className="text-slate-400 hover:text-white transition-colors">Resource Hub</button></li>
          </ul>
        </div>

        {/* About & Info */}
        <div>
          <h4 className="text-white font-black mb-6 text-sm uppercase tracking-widest">Learn</h4>
          <ul className="space-y-3 text-sm">
            <li><button onClick={() => setView('HOME')} className="text-slate-400 hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => setView('ABOUT')} className="text-slate-400 hover:text-white transition-colors">About Us</button></li>
            <li><button onClick={() => setView('NEWS')} className="text-slate-400 hover:text-white transition-colors">News & Updates</button></li>
            <li><button onClick={() => setView('EVENTS')} className="text-slate-400 hover:text-white transition-colors">Events</button></li>
            <li><button onClick={() => setView('FAQ')} className="text-slate-400 hover:text-white transition-colors">FAQ</button></li>
          </ul>
        </div>

        {/* Get Involved */}
        <div>
          <h4 className="text-white font-black mb-6 text-sm uppercase tracking-widest">Get Involved</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Donate</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Volunteer</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Partner With Us</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Corporate Giving</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Planned Giving</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-white font-black mb-6 text-sm uppercase tracking-widest">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
              <span>1200 Foundation Ave<br/>Washington, DC 20005</span>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
              <a href="tel:+12025550198" className="hover:text-white transition-colors">(202) 555-0198</a>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
              <a href="mailto:info@beaconscholar.org" className="hover:text-white transition-colors break-all">info@beacon<br/>scholar.org</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 md:pt-12 pb-8 md:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm mb-8 md:mb-12">
          <div className="text-slate-400">© 2026 Beacon Scholars Foundation. All Rights Reserved.</div>
          <div className="text-slate-500 sm:text-right">
            EIN: <span className="text-indigo-400 font-bold">12-3456789</span> | 501(c)(3) Nonprofit
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4 text-xs text-slate-500 flex-wrap">
          <div className="flex gap-6 flex-wrap">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
          <div className="flex gap-6 flex-wrap">
            <a href="#" className="hover:text-white transition-colors">Annual Report</a>
            <a href="#" className="hover:text-white transition-colors">Impact Report</a>
            <a href="#" className="hover:text-white transition-colors">Media Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
