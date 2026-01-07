
import React from 'react';
import { StoryContent } from '../types';

interface StoryDetailProps {
  story: StoryContent;
  onBack: () => void;
}

const StoryDetail: React.FC<StoryDetailProps> = ({ story, onBack }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 pb-32">
      {/* Sticky Top Bar for Detail */}
      <div className="sticky top-16 md:top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Home
          </button>
          <div className="hidden md:block text-slate-400 text-xs font-black uppercase tracking-widest">
            {story.category} / {story.title}
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg hover:bg-indigo-700 transition-colors">
            Share Story
          </button>
        </div>
      </div>

      <header className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <img 
          src={story.image} 
          alt={story.title} 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-12 md:bottom-24 left-0 right-0 px-4">
          <div className="max-w-4xl mx-auto text-white">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              {story.category}
            </div>
            <h1 className="heading-serif text-5xl md:text-8xl font-bold mb-8 leading-tight">
              {story.title}
            </h1>
            <p className="text-xl md:text-3xl text-slate-300 font-light max-w-3xl leading-relaxed">
              {story.subtitle}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 mt-16">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Article Info Sidebar */}
          <aside className="md:w-1/4 space-y-8">
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Written By</div>
              <div className="font-bold text-slate-900">{story.author || "Foundation Staff"}</div>
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Published</div>
              <div className="text-slate-600">{story.date || "March 2026"}</div>
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Read Time</div>
              <div className="text-slate-600">{story.readTime || "5 min"}</div>
            </div>
            <div className="pt-8 border-t border-slate-100">
               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">Scholarship Info</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">Inspired by this story? Check your eligibility for the Pathways Grant.</p>
                  <button className="text-xs font-black text-indigo-600 hover:underline">Check Eligibility</button>
               </div>
            </div>
          </aside>

          {/* Article Body Content */}
          <article className="md:w-3/4">
            <div className="space-y-10">
              {story.content.map((paragraph, i) => (
                <p key={i} className="text-xl text-slate-700 leading-relaxed font-serif">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-20 p-12 bg-slate-900 rounded-[40px] text-white">
               <h3 className="text-3xl font-bold mb-6">Are you the next Beacon Scholar?</h3>
               <p className="text-slate-400 mb-10 text-lg font-light leading-relaxed">
                 We are actively seeking talent from all 50 states for the Fall 2026 academic cycle. Whether you're a high-school senior or a transfer student, your future starts here.
               </p>
               <button className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all active:scale-95">
                 Start Application Today
               </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
