
import React, { useState, useEffect } from 'react';
import { ViewState, StoryContent } from '../types';
import { STORIES, TESTIMONIALS, GALLERY_IMAGES, TEAM, GRANTS } from '../Constants';
import EligibilityTree from './EligibityTree';
import { 
  ArrowRight, 
  Users, 
  Landmark, 
  GraduationCap, 
  Scale, 
  ShieldCheck, 
  Image as ImageIcon, 
  Sparkles, 
  Target, 
  BookOpen, 
  Globe, 
  Award, 
  Clock,
  ChevronRight,
  TrendingUp,
  Fingerprint,
  Info,
  Briefcase,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
  onOpenStory: (story: StoryContent) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onOpenStory }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % STORIES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const partners = ["Stanford", "Harvard", "MIT", "Princeton", "UC Berkeley", "Johns Hopkins", "Georgetown", "Columbia"];
  const curatedGallery = GALLERY_IMAGES.slice(0, 6);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-950">
      {/* 1. ENHANCED HERO SECTION */}
      <section className="relative min-h-screen md:h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden px-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img src={STORIES[activeSlide].image} className="w-full h-full object-cover opacity-30" alt="Spotlight" />
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent"></div>
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-5xl text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 border border-indigo-400/50 text-indigo-200 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-4 md:mb-6 backdrop-blur-sm hover:from-indigo-500/30 hover:to-emerald-500/30 transition-all">
              <ShieldCheck size={14} className="text-emerald-300 animate-pulse" /> SECURED US PORTAL 2026
            </div>
            <h1 className="heading-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] md:leading-[1] tracking-tighter mb-3 md:mb-4">
              Advancing <br className="hidden sm:block" /><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-emerald-200">the Extraordinary.</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed mb-6 md:mb-8 max-w-3xl mx-auto border-l-4 border-indigo-500/50 pl-4 md:pl-6">
              Managing $366M in endowment capital for America's brightest minds. We transform potential into groundbreaking research, policy innovation, and global leadership.
            </p>
            {/* DUAL CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center items-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('APPLY')} 
                className="group px-6 sm:px-10 py-3 sm:py-5 bg-white text-slate-950 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm md:text-lg shadow-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 sm:gap-3 active:scale-95 w-full sm:w-auto"
              >
                <span>Apply for 2026</span> <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('ABOUT')} 
                className="group px-6 sm:px-10 py-3 sm:py-5 bg-slate-900/60 backdrop-blur-md text-white border border-white/10 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm md:text-lg hover:bg-white/10 transition-all active:scale-95 w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3"
              >
                <span>Our Heritage</span> <Info size={16}/>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Hero Indicators */}
        <div className="absolute bottom-32 md:bottom-16 left-6 z-20 flex gap-3 items-center">
          {STORIES.map((_, i) => (
            <motion.button 
              key={i} 
              onClick={() => setActiveSlide(i)} 
              whileHover={{ scale: 1.2 }}
              className={`rounded-full transition-all duration-500 ${activeSlide === i ? 'w-8 h-2 bg-white shadow-lg shadow-white/50' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`} 
            />
          ))}
        </div>
      </section>

      {/* 2. ENHANCED PARTNER MARQUEE */}
      <section className="py-12 bg-gradient-to-r from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="mb-4 px-6 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Trusted by Leading Institutions</p>
        </div>
        <div className="animate-marquee whitespace-nowrap flex py-2 opacity-40">
          {[...partners, ...partners].map((p, i) => (
            <span key={i} className="mx-12 text-lg md:text-2xl font-black text-slate-900 dark:text-slate-200 uppercase tracking-tighter">
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* NEW: IMPACT STATISTICS SECTION */}
      <section className="py-20 md:py-32 px-6 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-serif text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Our Impact</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Transforming lives through education and opportunity</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: "$366M", label: "In Endowment Capital", icon: DollarSign },
              { number: "50K+", label: "Scholars Funded", icon: GraduationCap },
              { number: "98%", label: "Success Rate", icon: TrendingUp },
              { number: "150+", label: "Partner Universities", icon: Landmark }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-emerald-600 flex items-center justify-center text-white mx-auto mb-4">
                  <stat.icon size={28} />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">{stat.number}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: FEATURED OPPORTUNITIES - SCHOLARSHIPS & GRANTS */}
      <section className="py-24 md:py-40 px-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-serif text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
              Funding for Every Dream
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Whether you're pursuing higher education, starting a business, or supporting your nonprofit mission, we have verified funding opportunities for you.
            </p>
          </motion.div>

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Scholarships Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-10 border-2 border-blue-200 dark:border-blue-800 hover:shadow-2xl transition-all cursor-pointer h-full"
                onClick={() => onNavigate('SCHOLARSHIPS')}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Award size={32} />
                  </div>
                  <div>
                    <h3 className="font-black text-2xl text-slate-900 dark:text-white">Scholarships</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">For Students</p>
                  </div>
                </div>

                <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                  Discover thousands of verified scholarships for undergraduate and graduate students. From STEM to humanities, we have opportunities for every field of study.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <DollarSign size={18} className="text-blue-600" /> Average awards: $5,000 - $50,000
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Clock size={18} className="text-blue-600" /> Applications year-round
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Target size={18} className="text-blue-600" /> No application fees
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg">
                  Explore Scholarships <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>

            {/* Grants Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-10 border-2 border-emerald-200 dark:border-emerald-800 hover:shadow-2xl transition-all cursor-pointer h-full"
                onClick={() => onNavigate('GRANTS')}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Briefcase size={32} />
                  </div>
                  <div>
                    <h3 className="font-black text-2xl text-slate-900 dark:text-white">Grants</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">For Everyone</p>
                  </div>
                </div>

                <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                  Explore verified grants for startups, nonprofits, researchers, and entrepreneurs. Find funding to launch your business, support your cause, or advance your research.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <DollarSign size={18} className="text-emerald-600" /> Awards up to $500,000+
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Clock size={18} className="text-emerald-600" /> Multiple deadlines yearly
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Target size={18} className="text-emerald-600" /> All verified sources
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg">
                  Explore Grants <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works CTA */}
      <section className="py-16 px-6 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => onNavigate('HOW_IT_WORKS')}
            className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black px-8 py-4 rounded-xl transition-all shadow-lg"
          >
            Learn How to Apply <ArrowRight size={18} />
          </motion.button>
        </div>
      </section>

      {/* 3. ENHANCED NARRATIVE SECTION */}
      <section className="py-24 md:py-48 px-6 bg-white dark:bg-slate-950 overflow-hidden relative">
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-100/20 dark:bg-indigo-900/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative cursor-pointer group" 
            onClick={() => onNavigate('ABOUT')}
          >
            <div className="relative z-10 rounded-[48px] md:rounded-[64px] overflow-hidden shadow-2xl aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Scholarship" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="absolute -bottom-12 -right-8 md:-right-16 z-20 bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-2xl border border-slate-100 dark:border-slate-800 max-w-[300px] group-hover:shadow-indigo-500/30 group-hover:shadow-2xl transition-all">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/20 rounded-xl flex items-center justify-center text-emerald-600">
                  <Fingerprint size={24} />
                </div>
                <div className="font-black text-lg text-slate-900 dark:text-white">Radical Intent</div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed font-medium">"We prioritize intellectual bravery and long-term societal impact over vanity metrics."</p>
              <div className="mt-5 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 group/link cursor-pointer hover:gap-3 transition-all">
                Explore Mission <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform"/>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10 md:space-y-12"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-200/50 dark:border-indigo-700/30">
              <Sparkles size={14} /> Institutional Heritage
            </div>
            <h2 className="heading-serif text-6xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
              Merit <br/>Redefined.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-lg">
              For over a decade, we've been the silent engine behind America's most transformative research breakthroughs. Every award undergoes rigorous, independent verification.
            </p>
            <ul className="space-y-4">
              {[
                'Endowment-backed financial security',
                'Peer-reviewed selection process',
                'Mentorship from industry leaders'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-700 dark:text-slate-200 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-emerald-600"></div>
                  {item}
                </li>
              ))}
            </ul>
            <motion.button 
              whileHover={{ x: 6 }}
              onClick={() => onNavigate('ABOUT')} 
              className="flex items-center gap-3 text-slate-950 dark:text-white font-black uppercase text-xs tracking-widest hover:gap-8 transition-all group pt-6"
            >
              Read Selection Charter <ArrowRight size={18} className="text-indigo-600 dark:text-indigo-400 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 4. ENHANCED GALLERY SECTION */}
      <section className="py-24 md:py-40 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="mb-20 text-center md:text-left"
          >
            <h2 className="heading-serif text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1.1] mb-6">
              Institutional<br/>Excellence.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl lg:text-2xl font-light italic max-w-2xl">
              A visual journey through scholarship, determination, and transformative research.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {curatedGallery.map((img, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -12 }} 
                onClick={() => onNavigate('ABOUT')} 
                className="group relative overflow-hidden rounded-[32px] shadow-xl bg-slate-200 dark:bg-slate-800 aspect-square cursor-pointer border border-slate-300/50 dark:border-slate-700/50"
              >
                <img src={img.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={img.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-10 flex flex-col justify-end">
                   <div className="text-2xl font-black text-white mb-2">{img.title}</div>
                   <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">Read Detailed Context <ArrowRight size={12}/></div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center md:text-left">
            <button onClick={() => onNavigate('RESOURCE_HUB')} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-2 group mx-auto md:mx-0">Explore More Records <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /></button>
          </div>
        </div>
      </section>

      {/* 5. SMART SCAN */}
      <section className="py-24 md:py-40 px-6 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <h2 className="heading-serif text-6xl md:text-[8rem] font-black text-slate-950 dark:text-white tracking-tighter leading-[0.85]">Smart <br/>Scan.</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl lg:text-2xl leading-relaxed font-light">Evaluate your profile against our board's selection logic in real-time. Secured and private for all US institutions.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {[
                 { i: ShieldCheck, t: "Board Verified", d: "Updated for 2026 Cycle." },
                 { i: Fingerprint, t: "Privacy Guaranteed", d: "Local data scan only." }
               ].map((feat, i) => (
                 <div key={i} className="flex flex-col gap-4 p-8 bg-slate-50 dark:bg-slate-800 rounded-[40px] border border-slate-100 dark:border-slate-700">
                    <feat.i size={24} className="text-indigo-600" />
                    <div className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white">{feat.t}</div>
                    <div className="text-xs text-slate-400 font-medium">{feat.d}</div>
                 </div>
               ))}
            </div>
            <button onClick={() => onNavigate('FAQ')} className="text-[10px] font-black uppercase text-indigo-500 tracking-widest flex items-center gap-3 hover:gap-5 transition-all">Learn Eligibility Logic <ArrowRight size={16}/></button>
          </div>
          <EligibilityTree />
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-20 md:py-40 px-6 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <img src="https://images.unsplash.com/photo-1541339907198-e08756defe73?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-3xl rounded-[40px] md:rounded-[80px] p-10 md:p-32 text-center text-white border border-white/10 shadow-2xl relative z-10 group">
          <div className="absolute top-0 right-0 p-10 opacity-5 -translate-y-10 group-hover:translate-y-0 transition-transform duration-[2s]"><Landmark className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]" /></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10">Enrollment Open 2026</div>
            <h2 className="heading-serif text-4xl md:text-[7rem] font-black mb-10 tracking-tighter leading-none">Your Future <br/>is Ready.</h2>
            <p className="text-slate-400 text-lg md:text-2xl font-light mb-12 italic">Applications for the 2026 cycle are currently active. Begin your journey toward academic excellence.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => onNavigate('APPLY')} className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-sm md:text-xl shadow-2xl active:scale-95 transition-all">Begin Application</button>
              <button onClick={() => onNavigate('SCHOLARSHIPS')} className="px-10 py-5 border border-white/20 bg-white/10 rounded-2xl font-black text-sm md:text-xl hover:bg-white/10 active:scale-95 transition-all">Grant Catalog</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
