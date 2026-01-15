
import React from 'react';
import { TEAM } from '../Constants';
import { ShieldCheck, History, Award, BookOpen, Users, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Immersive Header */}
      <section className="relative bg-slate-950 text-white py-40 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-indigo-400/20">
             Mission Validation 2012-2026
          </div>
          <h1 className="heading-serif text-6xl md:text-[10rem] font-black mb-12 leading-[0.85] tracking-tighter">
            Heritage of <br/><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">Opportunity.</span>
          </h1>
          <p className="text-slate-400 text-xl md:text-3xl leading-relaxed max-w-3xl mx-auto font-light italic">
            "Founded in 2012 by a group of educators, the Beacon Foundation exists to ensure that academic brilliance is never silenced by economic constraint."
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
          <div className="space-y-12">
            <h2 className="heading-serif text-5xl md:text-8xl font-black text-slate-900 leading-none tracking-tighter">Established <br/>Impact.</h2>
            <div className="space-y-8">
              <p className="text-slate-600 text-2xl leading-relaxed font-light italic border-l-8 border-indigo-600 pl-10">
                We believe higher education is the most powerful catalyst for social mobility. Our foundation operates as an evergreen endowment, where every dollar donated is invested to fund student futures in perpetuity.
              </p>
              <p className="text-slate-500 text-lg leading-relaxed font-light">
                Since our inception in a small library in Washington, D.C., we have grown into a nationwide network of support. We don't just write checks—we build lifelines. From summer internships to graduate school counseling, the Beacon narrative is one of comprehensive transformation.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="p-10 bg-slate-50 rounded-[48px] border border-slate-100 shadow-sm">
                   <div className="text-5xl font-black text-indigo-600 mb-2">94%</div>
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Graduation Rate</div>
                </div>
                <div className="p-10 bg-emerald-50 rounded-[48px] border border-emerald-100 shadow-sm">
                   <div className="text-5xl font-black text-emerald-600 mb-2">$366M</div>
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Capital Assets</div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
             <div className="absolute -inset-10 bg-indigo-50 rounded-[100px] rotate-3 shadow-inner" />
             <div className="w-full h-96 bg-gradient-to-br from-indigo-100 to-emerald-100 rounded-[80px] shadow-2xl relative z-10 flex items-center justify-center">
               <div className="text-center">
                 <ShieldCheck size={80} className="text-indigo-600 mx-auto mb-4" />
                 <p className="text-slate-700 font-bold text-lg">Institutional Integrity Since 2012</p>
               </div>
             </div>
             <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white rounded-full p-8 shadow-2xl z-20 flex flex-col items-center justify-center text-center">
                <ShieldCheck size={40} className="text-emerald-500 mb-2" />
                <span className="text-[9px] font-black uppercase tracking-widest leading-none">Institutional <br/>Integrity</span>
             </div>
          </div>
        </div>
      </section>

      {/* The Governance Hub (Board) */}
      <section className="bg-slate-50 py-32 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="heading-serif text-5xl md:text-9xl font-black mb-6 tracking-tighter text-slate-900">Governance.</h2>
            <p className="text-slate-500 text-2xl font-light uppercase tracking-[0.4em]">Independent Board of Selectors</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {TEAM.map((member, i) => (
              <div key={i} className="group bg-white rounded-[64px] p-12 shadow-sm hover:shadow-2xl transition-all duration-700 border border-slate-50 flex flex-col items-center text-center">
                <div className="relative w-48 h-48 mb-10 overflow-hidden rounded-[40px] shadow-2xl rotate-2 group-hover:rotate-0 transition-transform">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                </div>
                <h4 className="font-black text-3xl text-slate-900 mb-2 tracking-tight">{member.name}</h4>
                <p className="text-indigo-600 font-bold text-xs uppercase tracking-[0.3em] mb-8">{member.role}</p>
                <p className="text-slate-500 text-lg leading-relaxed font-light italic mb-10 line-clamp-4">"{member.bio}"</p>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 transition-colors">
                   View Portfolio <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Gallery Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="heading-serif text-5xl md:text-9xl font-black mb-6 tracking-tighter text-slate-900">Our People.</h2>
            <p className="text-slate-500 text-2xl font-light uppercase tracking-[0.4em]">The Heart of Our Heritage</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative overflow-hidden rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-500 h-96">
              <img 
                src="/images/chris-blonk-gICX2XvfpI0-unsplash.jpg" 
                alt="Heritage member" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-white font-black text-lg">Excellence in Action</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-500 h-96">
              <img 
                src="/images/christian-buehner-DItYlc26zVI-unsplash.jpg" 
                alt="Heritage member" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-white font-black text-lg">Leadership Vision</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-500 h-96">
              <img 
                src="/images/christina-wocintechchat-com-m-SJvDxw0azqw-unsplash.jpg" 
                alt="Heritage member" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-white font-black text-lg">Diversity & Inclusion</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-500 h-96">
              <img 
                src="/images/maria-lupan-fE5IaNta2KM-unsplash.jpg" 
                alt="Heritage member" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-white font-black text-lg">Student Success</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-500 h-96">
              <img 
                src="/images/shipman-northcutt-sgZX15Da8YE-unsplash.jpg" 
                alt="Heritage member" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-white font-black text-lg">Community Impact</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-500 h-96">
              <img 
                src="/images/sigmund-a19OVaa2rzA-unsplash.jpg" 
                alt="Heritage member" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-white font-black text-lg">Mentorship Programs</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-500 h-96">
              <img 
                src="/images/thisisengineering-TXxiFuQLBKQ-unsplash.jpg" 
                alt="Heritage member" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-white font-black text-lg">Innovation & Tech</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-500 h-96">
              <img 
                src="/images/usman-yousaf-GFOlzpLuiCg-unsplash.jpg" 
                alt="Heritage member" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-white font-black text-lg">Global Reach</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline Vertical */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
             <History size={48} className="mx-auto text-indigo-200 mb-6" />
             <h3 className="heading-serif text-5xl font-black text-slate-900 tracking-tighter">Foundation Genesis.</h3>
          </div>
          <div className="space-y-24 relative">
             <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 -translate-x-1/2 hidden md:block" />
             {[
               { year: "2012", title: "Founding Decree", desc: "Beacon Foundation established with a $5M initial pledge to support STEM scholars in the DC metro area." },
               { year: "2015", title: "Endowment Pivot", desc: "Capitalized the endowment to $40M and expanded eligibility to all 50 US states for the first time." },
               { year: "2020", title: "Global Fellowship", desc: "Launched our graduate medical fund, specifically supporting frontline researchers during the health crisis." },
               { year: "2026", title: "Horizon Reach", desc: "Projected endowment scaling to $200M with a focus on first-generation artificial intelligence scholars." }
             ].map((evt, i) => (
               <div key={i} className={`flex flex-col md:flex-row items-center gap-12 relative ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2 text-center md:text-left">
                     <div className="text-7xl font-black text-slate-100 mb-4">{evt.year}</div>
                     <h4 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{evt.title}</h4>
                     <p className="text-slate-500 text-xl font-light italic leading-relaxed">"{evt.desc}"</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-indigo-600 absolute left-0 md:left-1/2 top-0 -translate-x-1/2 z-10 border-4 border-white hidden md:block" />
                  <div className="md:w-1/2" />
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Institutional CTA */}
      <section className="py-32 bg-slate-950 px-6">
        <div className="max-w-5xl mx-auto text-center p-24 rounded-[72px] bg-white text-slate-900 shadow-2xl">
           <Award size={64} className="mx-auto text-amber-500 mb-10" />
           <h2 className="heading-serif text-5xl font-black mb-8 tracking-tight leading-none">Radical Commitment <br/>to Excellence.</h2>
           <p className="text-slate-500 text-2xl font-light italic mb-16 max-w-2xl mx-auto">"Join a legacy that values intellectual courage above all else. Our next cycle opens this Fall."</p>
           <button onClick={() => window.scrollTo(0,0)} className="px-12 py-6 bg-slate-950 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl">Apply for Fellowships</button>
        </div>
      </section>
    </div>
  );
};

export default About;
