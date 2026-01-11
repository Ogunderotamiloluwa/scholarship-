
import React, { useState, useEffect } from 'react';
import { ResourcePhase } from '../types';
import { PHASES } from '../Constants';

interface ResourceHubProps {
  initialPhase: ResourcePhase | null;
  onBack: () => void;
}

const ResourceHub: React.FC<ResourceHubProps> = ({ initialPhase, onBack }) => {
  const [activePhase, setActivePhase] = useState<ResourcePhase>(initialPhase || PHASES[0]);

  useEffect(() => {
    if (initialPhase) setActivePhase(initialPhase);
  }, [initialPhase]);

  return (
    <div className="animate-in fade-in duration-700 min-h-screen bg-slate-950 text-white pb-20">
      {/* Immersive Dark Header */}
      <header className="relative pt-32 pb-24 px-6 overflow-hidden border-b border-white/5">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-15">
          <img 
            src="/images/rut-miit-3EMw3T-ZjkE-unsplash.jpg"
            alt="Resource Hub"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-mesh opacity-50"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-indigo-400 hover:text-white font-black text-xs uppercase tracking-widest mb-12 transition-all group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Return to Dashboard
          </button>
          
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            Establishing a 501(c)(3) Foundation
          </div>
          <h1 className="heading-serif text-6xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter">
            The Beacon <br/><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-emerald-300">Wiki Guide.</span>
          </h1>
          <p className="text-slate-400 text-xl md:text-2xl max-w-3xl font-light leading-relaxed">
            A comprehensive, 12-phase blueprint for building high-impact scholarship models from the ground up.
          </p>
        </div>
      </header>

      {/* Interactive Phase Grid & Detail View */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Phase Navigation - Sidebar for Desktop */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:sticky md:top-28 max-h-[75vh] overflow-y-auto no-scrollbar">
              <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-8 px-2">Foundation Phases</div>
              <div className="space-y-3">
                {PHASES.map((phase) => (
                  <button
                    key={phase.id}
                    onClick={() => { setActivePhase(phase); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-full text-left p-5 rounded-2xl flex items-center gap-5 transition-all group ${
                      activePhase.id === phase.id 
                      ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-500/30' 
                      : 'hover:bg-white/5 text-slate-400'
                    }`}
                  >
                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{phase.icon}</span>
                    <div className="flex-grow">
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">0{phase.id}</div>
                      <div className="font-black text-sm">{phase.title}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Detailed Content Module */}
          <main className="lg:col-span-8 animate-in slide-in-from-right-12 duration-500">
            <div className="bg-white rounded-[56px] shadow-2xl p-10 md:p-24 text-slate-900 relative">
               <div className="flex items-center gap-8 mb-16">
                 <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-[40px] flex items-center justify-center text-6xl md:text-7xl shadow-inner rotate-3">
                   {activePhase.icon}
                 </div>
                 <div>
                   <div className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-2">Phase {activePhase.id} Protocol</div>
                   <h2 className="heading-serif text-4xl md:text-7xl font-black tracking-tight">{activePhase.title}</h2>
                 </div>
               </div>

               <div className="space-y-16">
                 <section className="bg-slate-50 p-10 md:p-16 rounded-[48px] border border-slate-100">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Strategic Objective</h4>
                   <p className="text-2xl md:text-4xl text-slate-900 font-serif font-bold leading-tight italic">
                     "{activePhase.description}"
                   </p>
                 </section>

                 <section>
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10">Critical Milestones</h4>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {activePhase.steps.map((step, i) => (
                       <div key={i} className="group p-8 bg-white border-2 border-slate-50 rounded-[32px] hover:border-indigo-100 transition-all">
                         <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center font-black text-xs text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                           {i + 1}
                         </div>
                         <div className="font-black text-slate-900 text-sm leading-snug">{step}</div>
                       </div>
                     ))}
                   </div>
                 </section>

                 <section className="pt-12 border-t border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Detailed Establishment Analysis</h4>
                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-xl font-light">
                      <p className="mb-8">{activePhase.detailedContent}</p>
                      <p>
                        In our foundational audit (2024), we identified that mastery of this phase is directly correlated with long-term institutional stability and trust metrics among US donors. 
                        Skipping these steps can compromise the 501(c)(3) tax-exempt status in the first 36 months of operation.
                      </p>
                    </div>
                 </section>

                 <div className="p-12 md:p-16 bg-slate-950 rounded-[48px] text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-mesh opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="flex-grow relative z-10 text-center md:text-left">
                       <h5 className="text-3xl font-black mb-3">Continue the Workflow</h5>
                       <p className="text-slate-400 text-lg font-light">Advance to Phase {activePhase.id === 12 ? 1 : activePhase.id + 1} of the Beacon Protocol.</p>
                    </div>
                    <button 
                      onClick={() => setActivePhase(PHASES[activePhase.id === 12 ? 0 : activePhase.id])}
                      className="bg-white text-slate-950 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-indigo-50 transition-all active:scale-95 relative z-10"
                    >
                      Next Chapter
                    </button>
                 </div>
               </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResourceHub;
