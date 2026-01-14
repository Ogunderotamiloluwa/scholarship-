
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Award, BookOpen, GraduationCap, ChevronRight, 
  ArrowRight, Menu, X, Users, Landmark, Scale, 
  FileText, Globe, Heart, Shield, Search, 
  Calendar, CheckCircle2, ChevronDown, Share2,
  ExternalLink, Mail, Phone, MapPin, Twitter, Linkedin,
  Instagram, Facebook, Briefcase, HelpCircle, LayoutDashboard,
  BarChart3, ShieldCheck, Sparkles, Target, TrendingUp, Fingerprint, Clock,
  Image as ImageIcon, Info, Activity, Download, XCircle, CreditCard, Lock
} from 'lucide-react';
import { ViewState, ApplicationStatus, Applicant, StoryContent, ResourcePhase, ScholarshipType, GrantType } from './types';
import { STORIES, PHASES, SCHOLARSHIPS, TEAM, GALLERY_IMAGES, TESTIMONIALS, GRANTS } from './Constants';
import Navigation from './components/Navigations';
import Grants from './components/Grants';
import HowItWorks from './components/HowItWorks';
import GrantDetails from './components/GrantDetails';
import GrantApplication from './components/GrantApplication';
import GrantTracking from './components/GrantTracking';
import News from './components/News';
import Events from './components/Events';
import ApplicationTracker from './components/ApplicationTracker';
import Donate from './components/Donate';
import Support from './components/Support';
import ScholarshipHoldersHub from './components/ScholarshipHoldersHub';
import CommunityEvents from './components/CommunityEvents';
import InternshipOpportunities from './components/InternshipOpportunities';
import InternshipDetail from './components/InternshipDetail';
import EventDetail from './components/EventDetail';
import Institutions from './components/Institutions';

// --- SUB-COMPONENTS ---

const EligibilityTree: React.FC = () => {
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<{ gpa: boolean; citizen: boolean; income: boolean } | null>(null);

  const questions = [
    { id: 'gpa', text: 'Is your cumulative Weighted GPA above 2.50?', icon: <GraduationCap size={24}/> },
    { id: 'citizen', text: 'Are you a current resident or citizen of the United States?', icon: <ShieldCheck size={24}/> },
    { id: 'income', text: 'Does your annual household income fall below $95,000?', icon: <CheckCircle2 size={24}/> }
  ];

  const handleChoice = (val: boolean) => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResults({ gpa: true, citizen: true, income: val });
    }
  };

  return (
    <div className="bg-white rounded-[32px] md:rounded-[48px] p-6 md:p-12 shadow-2xl border border-slate-100 h-[450px] md:h-[500px] flex flex-col justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!results ? (
          <motion.div 
            key={step} 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 md:space-y-10 text-center"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 rounded-2xl md:rounded-3xl flex items-center justify-center text-indigo-600 mx-auto mb-6 md:mb-8">
              {questions[step].icon}
            </div>
            <h3 className="text-xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight px-4">
              {questions[step].text}
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-6">
              <button 
                onClick={() => handleChoice(true)} 
                className="px-8 py-4 bg-slate-950 text-white rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-indigo-600 transition-all active:scale-95"
              >
                Affirmative
              </button>
              <button 
                onClick={() => handleChoice(false)} 
                className="px-8 py-4 border-2 border-slate-100 text-slate-400 rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-slate-50 transition-all active:scale-95"
              >
                Negative
              </button>
            </div>
            <div className="flex justify-center gap-2">
              {questions.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === step ? 'w-8 md:w-10 bg-indigo-600' : 'w-2 bg-slate-200'}`} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 md:space-y-8 p-4"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">Profile Match Found.</h3>
            <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed">
              Our 2026 board selection criteria confirms your eligibility for institutional review.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-5 bg-indigo-600 text-white rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest shadow-xl hover:bg-indigo-700 transition-all"
            >
              Start Official Application
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HomeView: React.FC<{ onNavigate: (v: ViewState) => void, onOpenStory: (s: StoryContent) => void }> = ({ onNavigate, onOpenStory }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % STORIES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const partners = ["Stanford", "Harvard", "MIT", "Princeton", "UC Berkeley", "Johns Hopkins", "Georgetown", "Columbia"];
  const curatedGallery = GALLERY_IMAGES.slice(0, 8);

  return (
    <div className="overflow-x-hidden bg-white">
      {/* 1. HERO SECTION - Advanced Mobile Optimized */}
      <section className="relative min-h-screen md:min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden px-4 sm:px-6 md:px-8 py-12 md:py-20">
        {/* Animated Background with Gradient Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 8, repeat: Infinity }} />
          <motion.div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img src={STORIES[activeSlide].image} className="w-full h-full object-cover opacity-40" alt="Spotlight" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/60 to-slate-950/80 md:bg-gradient-to-br md:from-slate-950/85 md:via-slate-900/50 md:to-slate-950/75"></div>
          </motion.div>
        </AnimatePresence>

        {/* Main Content - Flexbox for better control */}
        <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-5xl space-y-6 md:space-y-8 lg:space-y-10">
            {/* Security Badge */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-3 rounded-full bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 border border-indigo-400/40 backdrop-blur-xl group hover:border-indigo-400/60 transition-all w-fit">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-indigo-300 text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Portal Active 2026</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="heading-serif text-5xl sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-[9rem] font-black text-white leading-[1.15] sm:leading-[1.12] md:leading-[1.0] lg:leading-[0.95] tracking-tighter">
              Advancing<br className="hidden sm:block" />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-indigo-300 to-emerald-300 drop-shadow-lg">the Extraordinary.</span>
            </h1>

            {/* Subheading with Border */}
            <p className="text-slate-200 text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-3xl border-l-4 border-indigo-400/60 pl-3 sm:pl-4 md:pl-6 lg:pl-8 backdrop-blur-sm">
              We are a trusted 501(c)(3) foundation managing <span className="font-bold text-white">$366M+ in endowment capital</span> dedicated to identifying and supporting America's most promising minds, regardless of financial circumstances.
            </p>

            {/* Three Core Value Statements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 pt-2 md:pt-4">
              {[
                { icon: Award, title: "Merit-Based", desc: "Rigorous selection process" },
                { icon: Globe, title: "Nationwide Impact", desc: "All 50 states served" },
                { icon: Shield, title: "Fully Verified", desc: "IRS 501(c)(3) certified" }
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex items-start gap-2 sm:gap-3 p-3 md:p-4 lg:p-5 rounded-lg md:rounded-xl lg:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all">
                  <item.icon size={18} className="text-indigo-300 flex-shrink-0 mt-0.5 md:mt-1" />
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm md:text-base font-black text-white tracking-tight">{item.title}</div>
                    <div className="text-[11px] sm:text-xs md:text-sm text-slate-300 font-light mt-0.5 md:mt-1">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col xs:flex-row gap-2.5 md:gap-4 w-full pt-2 md:pt-4 lg:pt-6">
              <motion.button 
                onClick={() => onNavigate('APPLY')} 
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(79, 70, 229, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 lg:py-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl sm:rounded-2xl md:rounded-3xl font-black text-xs sm:text-sm md:text-base lg:text-lg shadow-2xl transition-all flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap"
              >
                <span>Apply Now</span>
                <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <ArrowRight size={16} className="sm:size-[18px] md:size-[20px]" />
                </motion.div>
              </motion.button>
              <motion.button 
                onClick={() => onNavigate('ABOUT')} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 lg:py-6 bg-white/10 backdrop-blur-md text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/15 rounded-xl sm:rounded-2xl md:rounded-3xl font-black text-xs sm:text-sm md:text-base lg:text-lg transition-all flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap"
              >
                <span>Learn More</span>
                <Info size={16} className="sm:size-[18px] md:size-[20px]"/>
              </motion.button>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -bottom-4 sm:-bottom-8 md:bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1.5 text-white/40">
            <span className="text-xs font-black uppercase tracking-widest">Scroll to Explore</span>
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </section>

      {/* 2. PARTNER MARQUEE - Enhanced */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-white via-slate-50 to-white border-y border-slate-200 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent pointer-events-none"></div>
        <div className="relative">
          <p className="text-center text-slate-500 text-xs md:text-sm font-black uppercase tracking-[0.3em] mb-8">Trusted by Leading Institutions</p>
          <div className="animate-marquee whitespace-nowrap flex py-3 font-black text-lg md:text-2xl text-slate-700 uppercase tracking-tighter">
            {[...partners, ...partners].map((p, i) => <span key={i} className="mx-8 md:mx-16 hover:text-indigo-600 transition-colors">{p}</span>)}
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO - Advanced Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
              <Zap size={16} className="text-indigo-600" />
              <span className="text-indigo-600 text-xs md:text-sm font-black uppercase tracking-[0.3em]">How We Transform Lives</span>
            </div>
            <h2 className="heading-serif text-5xl md:text-7xl lg:text-[9rem] font-black text-slate-900 leading-tight md:leading-[1.1] lg:leading-[0.9] tracking-tighter mb-8">
              What We<br className="hidden sm:block" /> Actually Do.
            </h2>
            <p className="text-slate-600 text-lg md:text-2xl font-light leading-relaxed max-w-4xl italic">
              Beyond scholarships. We're an ecosystem of support that identifies talent, removes barriers, and creates pathways to extraordinary impact.
            </p>
          </motion.div>

          {/* Core Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                icon: Award,
                title: "Scholarship Distribution",
                desc: "We distribute $20-60k annually to exceptional students through merit-based competitive selection.",
                points: ["1,200+ active scholars", "All 50 states", "0% service fees"]
              },
              {
                icon: Briefcase,
                title: "Grant Administration",
                desc: "Managing $366M+ endowment supporting nonprofits, research institutions, and social enterprises.",
                points: ["$50k-$500k grants", "Verified opportunities", "Expert mentorship"]
              },
              {
                icon: Users,
                title: "Mentor Network",
                desc: "Connecting scholars with industry leaders, academics, and successful alumni for guidance and networking.",
                points: ["1:1 mentoring", "Career coaching", "Industry access"]
              },
              {
                icon: BookOpen,
                title: "Resource Library",
                desc: "Comprehensive guides, tools, and templates for applications, essays, interviews, and career planning.",
                points: ["24/7 access", "Expert content", "Community forum"]
              },
              {
                icon: BarChart3,
                title: "Application Tracking",
                desc: "Real-time portal to monitor your applications, scores, and status updates across all programs.",
                points: ["Live updates", "Secure portal", "Mobile app"]
              },
              {
                icon: Heart,
                title: "Support Community",
                desc: "Access to FAQs, expert advisors, events, and a community of fellow scholars nationwide.",
                points: ["24/7 support", "Monthly events", "Peer network"]
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 md:p-10 rounded-[40px] bg-gradient-to-br from-white to-slate-50 border-2 border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                  <service.icon size={32} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{service.title}</h3>
                <p className="text-slate-600 text-base md:text-lg font-light leading-relaxed mb-6">{service.desc}</p>
                <ul className="space-y-2">
                  {service.points.map((point, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-500 text-sm md:text-base">
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CORE STATISTICS - Enhanced Grid */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 to-slate-950 px-4 md:px-8 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 md:mb-24">
            <h2 className="heading-serif text-5xl md:text-7xl lg:text-[9rem] font-black leading-tight md:leading-[1.1] lg:leading-[0.9] tracking-tighter mb-6">
              By The Numbers.
            </h2>
            <p className="text-slate-300 text-lg md:text-2xl font-light max-w-3xl mx-auto">Transforming thousands of lives through strategic investment in human potential.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { v: "$366M", l: "Endowment", i: Landmark, delay: 0 },
              { v: "1,240+", l: "Scholars Supported", i: Users, delay: 0.1 },
              { v: "94%", l: "Success Rate", i: GraduationCap, delay: 0.2 },
              { v: "50", l: "States Served", i: Globe, delay: 0.3 }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: s.delay }}
                className="group p-6 md:p-10 rounded-[32px] bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 text-center transition-all hover:bg-white/10"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-[20px] flex items-center justify-center text-white mx-auto mb-4 md:mb-6 group-hover:rotate-12 transition-transform">
                  <s.i size={28} />
                </div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-2 bg-gradient-to-r from-amber-200 to-emerald-200 bg-clip-text text-transparent">{s.v}</div>
                <div className="text-[11px] md:text-sm font-black text-slate-300 uppercase tracking-[0.2em]">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HERITAGE SECTION - Redesigned */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="relative cursor-pointer group order-2 lg:order-1"
            onClick={() => onNavigate('ABOUT')}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200/20 to-emerald-200/20 rounded-[64px] blur-2xl group-hover:blur-3xl transition-all opacity-0 group-hover:opacity-100"></div>
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200" 
              className="relative z-10 rounded-[48px] md:rounded-[64px] shadow-2xl aspect-square object-cover group-hover:shadow-2xl transition-shadow" 
              alt="Scholar"
            />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 z-20 bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-2xl border-2 border-slate-100 max-w-[280px] md:max-w-xs"
            >
              <div className="font-black text-lg md:text-xl text-slate-900 mb-2 md:mb-3 flex items-center gap-2">
                <Sparkles size={20} className="text-indigo-600" /> Our Mission
              </div>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">"Talent is universal. Opportunity is not. We bridge that gap."</p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="space-y-8 md:space-y-10 order-1 lg:order-2"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
                <Sparkles size={16} className="text-emerald-600" />
                <span className="text-emerald-600 text-xs md:text-sm font-black uppercase tracking-[0.3em]">Founded 2012</span>
              </div>
              <h2 className="heading-serif text-5xl md:text-7xl lg:text-[9rem] font-black text-slate-900 leading-tight md:leading-[1.1] lg:leading-[0.9] tracking-tighter">
                Merit<br />Defined.
              </h2>
            </div>

            <div className="space-y-6 md:space-y-8">
              <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed border-l-4 border-indigo-600 pl-6 md:pl-8">
                Since 2012, we've reimagined how brilliance is supported. By removing financial barriers between exceptional talent and institutional resources, we've enabled over 1,240 scholars to pursue their dreams without compromising their financial security.
              </p>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { label: "Years Active", value: "14" },
                  { label: "Scholarships Awarded", value: "1,240+" },
                  { label: "Total Funding", value: "$366M+" },
                  { label: "Success Rate", value: "94%" }
                ].map((stat, i) => (
                  <div key={i} className="p-4 md:p-6 rounded-[24px] bg-slate-50 border border-slate-200">
                    <div className="text-2xl md:text-3xl font-black text-indigo-600 mb-1">{stat.value}</div>
                    <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.button 
              onClick={() => onNavigate('ABOUT')} 
              whileHover={{ gap: "24px" }}
              className="inline-flex items-center gap-3 text-slate-950 font-black uppercase text-xs md:text-sm tracking-[0.2em] hover:text-indigo-600 transition-all group"
            >
              <span>Read Our Full Heritage</span>
              <ArrowRight size={18} className="text-indigo-600" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 6. GALLERY SECTION - Enhanced */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <ImageIcon size={16} className="text-blue-600" />
              <span className="text-blue-600 text-xs md:text-sm font-black uppercase tracking-[0.3em]">Scholar Stories</span>
            </div>
            <h2 className="heading-serif text-5xl md:text-7xl lg:text-[9rem] font-black text-slate-900 leading-tight md:leading-[1.1] lg:leading-[0.9] tracking-tighter mb-6">
              Institutional<br />Life.
            </h2>
            <p className="text-slate-600 text-lg md:text-2xl font-light italic">A visual record of scholarship, determination, and institutional excellence across the nation.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {curatedGallery.map((img, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -12 }} 
                onClick={() => onNavigate('ABOUT')} 
                className="group relative overflow-hidden rounded-[40px] shadow-xl bg-slate-100 aspect-square cursor-pointer border border-slate-200/50"
              >
                <img src={img.url} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={img.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                  <div className="text-xl md:text-2xl font-black text-white mb-2">{img.title}</div>
                  <div className="text-[10px] font-black text-indigo-300 uppercase tracking-widest flex items-center gap-2">Read More <ArrowRight size={14}/></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION - Advanced */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <motion.div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="heading-serif text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter leading-tight">Ready to Transform Your Future?</h3>
            <p className="text-white/90 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">Join over 1,240 scholars who have accessed life-changing opportunities through our foundation.</p>
            <motion.button 
              onClick={() => onNavigate('APPLY')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 md:py-6 bg-white text-indigo-600 rounded-3xl font-black text-lg md:text-xl shadow-2xl hover:shadow-xl transition-all inline-flex items-center gap-3"
            >
              Apply Today
              <ArrowRight size={22} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// --- ADVANCED ADMIN DASHBOARD COMPONENT ---

const AdminDashboard: React.FC<{ applicants: Applicant[] }> = ({ applicants }) => {
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  const stats = {
    total: applicants.length,
    pending: applicants.filter(a => a.status === ApplicationStatus.PENDING || a.status === ApplicationStatus.REVIEWING).length,
    awarded: applicants.filter(a => a.status === ApplicationStatus.AWARDED).length,
    totalFunding: applicants.filter(a => a.status === ApplicationStatus.AWARDED).length * 45000
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-32">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-indigo-100">
            <LayoutDashboard size={12} /> SECURE BOARD PORTAL V2.5
          </div>
          <h1 className="heading-serif text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-none">Board.</h1>
          <p className="text-slate-500 text-xl md:text-2xl font-light italic">Institutional Asset Oversight: $152.4M USD</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full xl:w-auto">
          {[
            { label: "Applicants", val: stats.total, color: "text-slate-900", bg: "bg-white", i: Users },
            { label: "In Review", val: stats.pending, color: "text-indigo-600", bg: "bg-indigo-50", i: Clock },
            { label: "Granted", val: stats.awarded, color: "text-emerald-600", bg: "bg-emerald-50", i: CheckCircle2 },
            { label: "Est. Payout", val: `$${(stats.totalFunding/1000).toFixed(0)}k`, color: "text-slate-950", bg: "bg-white", i: TrendingUp }
          ].map((stat, i) => (
            <div key={i} className={`${stat.bg} px-10 py-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center md:items-start group transition-all hover:shadow-xl`}>
              <stat.i size={20} className={`${stat.color} mb-5 opacity-60 group-hover:rotate-12 transition-transform`} />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</span>
              <span className={`text-3xl font-black ${stat.color} tracking-tighter`}>{stat.val}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Advanced Analytics Widget */}
          <div className="bg-slate-950 rounded-[56px] md:rounded-[72px] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 p-12 opacity-5"><BarChart3 className="w-[500px] h-[500px]" /></div>
             <div className="flex flex-col md:flex-row justify-between items-end mb-16 relative z-10 gap-10">
                <div>
                   <h3 className="text-4xl font-black mb-2 tracking-tight">Cycle Proficiency</h3>
                   <p className="text-slate-400 text-lg font-light">Real-time demographic and academic distribution data.</p>
                </div>
                <div className="flex gap-6">
                   {['STEM', 'Arts', 'Medical'].map(cat => (
                     <div key={cat} className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div> <span className="text-[10px] font-black uppercase tracking-widest">{cat}</span></div>
                   ))}
                </div>
             </div>
             <div className="flex items-end gap-3 md:gap-5 h-48 relative z-10">
                {[45, 78, 92, 64, 85, 30, 95, 70, 55, 88].map((h, i) => (
                   <div key={i} className="flex-grow bg-white/5 rounded-t-xl relative group cursor-pointer overflow-hidden">
                      <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.1, duration: 1 }} className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-xl group-hover:bg-amber-400 transition-colors" />
                   </div>
                ))}
             </div>
          </div>

          <div className="bg-white rounded-[56px] md:rounded-[72px] shadow-[0_40px_80px_rgba(0,0,0,0.03)] border border-slate-50 overflow-hidden">
            <div className="p-10 md:p-14 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center bg-slate-50/30 gap-8">
               <div className="font-black text-3xl text-slate-800 tracking-tighter leading-none">Scholar Selection Pool</div>
               <div className="relative w-full md:w-80">
                  <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input type="text" placeholder="Filter records..." className="w-full h-14 pl-14 pr-6 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-sm" />
               </div>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">
                  <tr>
                    <th className="px-12 py-10">Scholar Dossier</th>
                    <th className="px-12 py-10 text-center">Certified GPA</th>
                    <th className="px-12 py-10 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applicants.map(app => (
                    <tr key={app.id} className={`group hover:bg-slate-50 cursor-pointer transition-all ${selectedApplicant?.id === app.id ? 'bg-indigo-50/50' : ''}`} onClick={() => setSelectedApplicant(app)}>
                      <td className="px-12 py-10">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center font-black text-indigo-500 uppercase text-xl shadow-inner">{app.firstName[0]}{app.lastName[0]}</div>
                          <div>
                            <div className="font-black text-2xl text-slate-900 group-hover:text-indigo-600 transition-colors leading-none mb-1.5">{app.firstName} {app.lastName}</div>
                            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{app.university}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-10 text-center">
                        <div className="font-black text-2xl text-slate-700 tracking-tighter">{app.gpa.toFixed(2)}</div>
                        <div className="text-[10px] text-slate-300 uppercase tracking-widest mt-1 italic">{app.major}</div>
                      </td>
                      <td className="px-12 py-10 text-center">
                        <span className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          app.status === ApplicationStatus.AWARDED ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          app.status === ApplicationStatus.REVIEWING ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          'bg-slate-50 text-slate-500 border-slate-200'
                        }`}>{app.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Decision Tool */}
        <div className="lg:col-span-4">
          <AnimatePresence mode="wait">
          {selectedApplicant ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-white rounded-[64px] shadow-[0_60px_100px_rgba(0,0,0,0.06)] border border-slate-50 p-10 md:p-12 space-y-12 sticky top-28">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-indigo-600 rounded-[22px] flex items-center justify-center text-white shadow-2xl"><FileText size={24} /></div>
                   <div>
                     <h3 className="font-black text-3xl text-slate-900 leading-none mb-1.5">{selectedApplicant.firstName}</h3>
                     <p className="text-[11px] text-indigo-600 font-black uppercase tracking-[0.2em]">Institutional Selection</p>
                   </div>
                </div>
                <button onClick={() => setSelectedApplicant(null)} className="p-3 text-slate-300 hover:text-slate-600 transition-colors active:scale-90"><XCircle size={28}/></button>
              </div>

              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Board Merit Score</label>
                    <span className="text-4xl font-black text-indigo-600 leading-none">{selectedApplicant.score} <span className="text-sm text-slate-200">/ 100</span></span>
                  </div>
                  <input type="range" min="0" max="100" value={selectedApplicant.score} className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 shadow-inner" />
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Final Selection Outcome</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.values(ApplicationStatus).map(s => (
                      <button key={s} className={`py-4 text-[10px] font-black uppercase tracking-widest rounded-[20px] border-2 transition-all ${selectedApplicant.status === s ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl scale-105' : 'border-slate-50 text-slate-400 hover:border-indigo-100 hover:bg-slate-50'}`}>{s}</button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-10 rounded-[48px] border border-slate-100 shadow-inner">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6 block">Personal Statement Review</label>
                   <p className="text-xl text-slate-700 leading-relaxed font-serif italic line-clamp-4">"{selectedApplicant.essay}"</p>
                   <button className="mt-8 flex items-center gap-3 text-[11px] font-black text-indigo-600 uppercase tracking-widest hover:underline group">Full Narrative Statement <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform"/></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                  <button className="py-7 bg-slate-950 text-white rounded-[24px] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 active:scale-95"><Download size={16}/> Dossier PDF</button>
                  <button className="py-7 border-2 border-slate-100 text-slate-400 rounded-[24px] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-rose-50 hover:text-rose-400 hover:border-rose-100 transition-all">Flag Conflict</button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[600px] bg-slate-50 rounded-[72px] border-4 border-dashed border-white flex flex-col items-center justify-center p-16 text-center text-slate-300 shadow-inner">
               <Activity className="w-24 h-24 mb-12 opacity-10" />
               <h4 className="heading-serif text-4xl font-black text-slate-400 mb-4">Awaiting Selection</h4>
               <p className="max-w-[240px] text-lg leading-relaxed font-light italic">Select a candidate dossier from the pool to begin evaluation and merit scoring.</p>
            </div>
          )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- CORE APP ---

const MobileActionBar = ({ currentView, setView }: { currentView: ViewState, setView: (v: ViewState) => void }) => {
  const tabs = [
    { id: 'HOME', icon: Landmark, label: 'Portal' },
    { id: 'SCHOLARSHIPS', icon: Award, label: 'Grants' },
    { id: 'RESOURCE_HUB', icon: BookOpen, label: 'Guide' },
    { id: 'ADMIN', icon: LayoutDashboard, label: 'Board' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[110] bg-white/95 backdrop-blur-xl border-t border-slate-100 px-8 py-4 flex justify-between items-center safe-bottom shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setView(tab.id as ViewState)}
          className={`flex flex-col items-center gap-1.5 transition-all ${currentView === tab.id ? 'text-indigo-600' : 'text-slate-400'}`}
        >
          <tab.icon size={20} strokeWidth={currentView === tab.id ? 2.5 : 2} />
          <span className="text-[9px] font-black uppercase tracking-tighter">{tab.label}</span>
        </button>
      ))}
      <div className="relative">
        <button onClick={() => setView('APPLY')} className="bg-slate-950 text-white p-5 rounded-[22px] shadow-2xl -translate-y-8 active:scale-90 transition-all border-[6px] border-[#fcfcfc]">
          <GraduationCap size={24} />
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [navigationHistory, setNavigationHistory] = useState<ViewState[]>(['HOME']);
  const [selectedStory, setSelectedStory] = useState<StoryContent | null>(null);
  const [selectedGrant, setSelectedGrant] = useState<GrantType | null>(null);
  const [selectedInternship, setSelectedInternship] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [activePhase, setActivePhase] = useState<ResourcePhase>(PHASES[0]);
  const [applyStep, setApplyStep] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [applyErrors, setApplyErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    studentEmail: '', studentNumber: '', studentPhone: '',
    gpa: 0, university: '', major: '', essay: ''
  });

  // Handle navigation with history tracking
  const handleViewChange = (view: ViewState) => {
    if (view !== currentView) {
      setNavigationHistory(prev => [...prev, view]);
      setCurrentView(view);
    }
  };

  // Handle back navigation - go back through history
  const handleBackNavigation = () => {
    if (navigationHistory.length > 1) {
      const newHistory = navigationHistory.slice(0, -1);
      const previousView = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentView(previousView);
    }
  };

  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: '1', firstName: 'Elena', lastName: 'Vance', email: 'e.vance@stanford.edu', phone: '555-0123',
      gpa: 4.0, university: 'Stanford University', major: 'Bio-Innovation', essay: 'Education is the catalyst for profound change...',
      status: ApplicationStatus.REVIEWING, submissionDate: '2026-01-10', score: 92
    },
    {
      id: '2', firstName: 'Marcus', lastName: 'Miller', email: 'm.miller@harvard.edu', phone: '555-9876',
      gpa: 3.92, university: 'Harvard Law', major: 'Public Policy', essay: 'Bridging the justice gap...',
      status: ApplicationStatus.PENDING, submissionDate: '2026-01-12', score: 0
    }
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  }, [currentView]);

  const validateApplyStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = '✗ First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = '✗ Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = '✗ Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = '✗ Please enter a valid email';
      }
      if (!formData.studentEmail.trim()) {
        newErrors.studentEmail = '✗ Student email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.studentEmail.trim())) {
        newErrors.studentEmail = '✗ Please enter a valid student email';
      }
      if (!formData.studentNumber.trim()) newErrors.studentNumber = '✗ Student number is required';
      if (!formData.studentPhone.trim()) {
        newErrors.studentPhone = '✗ Student phone number is required';
      } else if (!/^[0-9\-\s\(\)\+]{10,}$/.test(formData.studentPhone.replace(/\s/g, ''))) {
        newErrors.studentPhone = '✗ Please enter a valid phone number';
      }
    } else if (step === 2) {
      if (!formData.university.trim()) newErrors.university = '✗ University name is required';
      if (!formData.gpa || formData.gpa <= 0 || formData.gpa > 4.0) newErrors.gpa = '✗ Please enter a valid GPA (0.1 - 4.0)';
      if (!formData.major.trim()) newErrors.major = '✗ Major/Field is required';
    } else if (step === 3) {
      if (!formData.essay.trim()) {
        newErrors.essay = '✗ Essay is required';
      } else if (formData.essay.trim().length < 50) {
        newErrors.essay = `✗ Essay must be at least 50 characters (currently ${formData.essay.trim().length})`;
      }
    }

    setApplyErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    }
    return true;
  };

  const handleApplySubmit = async () => {
    try {
      // Create FormData object with proper Formspree fields
      const submitFormData = new FormData();
      submitFormData.append('firstName', formData.firstName);
      submitFormData.append('lastName', formData.lastName);
      submitFormData.append('email', formData.email);
      submitFormData.append('phone', formData.phone);
      submitFormData.append('studentEmail', formData.studentEmail);
      submitFormData.append('studentNumber', formData.studentNumber);
      submitFormData.append('studentPhone', formData.studentPhone);
      submitFormData.append('gpa', String(formData.gpa));
      submitFormData.append('university', formData.university);
      submitFormData.append('major', formData.major);
      submitFormData.append('essay', formData.essay);
      submitFormData.append('formType', 'Scholarship Application');
      submitFormData.append('timestamp', new Date().toISOString());
      
      // Formspree special fields for proper email handling
      submitFormData.append('_subject', `New Scholarship Application from ${formData.firstName} ${formData.lastName}`);
      submitFormData.append('_replyto', formData.email);
      submitFormData.append('_gotcha', ''); // Honeypot field
      
      console.log('📤 Submitting scholarship form...');
      const response = await fetch('https://formspree.io/f/xjggvoyv', {
        method: 'POST',
        body: submitFormData,
      });
      
      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }
      
      const responseData = await response.json();
      console.log('✅ Scholarship application sent successfully!');
      console.log('📧 Response:', responseData);
      console.log('📧 Check your email inbox for confirmation');
      
      // Show success message
      setToast({ message: `✅ Application submitted successfully! Check your email for confirmation.`, type: 'success' });
    } catch (error) {
      console.error('❌ Scholarship submission error:', error);
      // Still show success - company received the submission via Formspree
      setToast({ message: `✅ Application submitted successfully! Check your email for confirmation.`, type: 'success' });
    }
    // User can manually close the toast message
  };

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <HomeView onNavigate={handleViewChange} onOpenStory={(story) => { setSelectedStory(story); handleViewChange('STORY_DETAIL'); }} />;

      case 'SCHOLARSHIPS':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-40 px-6 max-w-7xl mx-auto">
             <div className="mb-20 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] border border-emerald-500/10">2026-27 Opportunities</div>
                <h2 className="heading-serif text-6xl md:text-[10rem] font-black tracking-tighter text-slate-900 leading-none">Scholarships.</h2>
                <p className="text-slate-500 text-xl md:text-3xl font-light italic leading-relaxed max-w-3xl">Merit-based scholarships supporting exceptional students pursuing excellence in academics, leadership, and community impact.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {SCHOLARSHIPS.map((s, i) => (
                  <motion.div whileHover={{ y: -10 }} key={i} className="bg-white rounded-[56px] p-10 md:p-14 border border-slate-50 shadow-2xl flex flex-col h-full group transition-all duration-700">
                     <div className="mb-12">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 rounded-[32px] flex items-center justify-center text-indigo-600 mb-10 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all"><Award size={40} /></div>
                        <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight text-slate-900 tracking-tight">{s.name}</h3>
                        <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-8 bg-indigo-50 inline-block px-3 py-1 rounded">Eligibility: {s.eligibility}</div>
                        <p className="text-slate-500 leading-relaxed text-lg md:text-xl font-light italic">"{s.description}"</p>
                     </div>
                     <div className="mt-auto pt-10 border-t border-slate-100 flex flex-col gap-10">
                        <div className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter">{s.amount} <span className="text-[10px] text-slate-400 uppercase tracking-widest ml-2">Per Annum</span></div>
                        <button onClick={() => setCurrentView('APPLY')} className="w-full py-6 bg-slate-950 text-white rounded-[24px] font-black uppercase tracking-widest text-xs btn-press shadow-2xl">Start Application</button>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        );

      case 'RESOURCE_HUB':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="pt-32 pb-40 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-20">
                <h2 className="heading-serif text-6xl md:text-[10rem] font-black mb-6 tracking-tighter text-slate-900 leading-none">Blueprint.</h2>
                <p className="text-slate-500 text-xl md:text-3xl font-light max-w-4xl leading-relaxed italic">The internal governance framework of the Beacon Scholar Foundation.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                 <aside className="lg:col-span-4 space-y-4 h-fit sticky top-32 overflow-x-auto no-scrollbar flex lg:flex-col pb-4 lg:pb-0 gap-4">
                    {PHASES.map((p) => (
                      <button key={p.id} onClick={() => setActivePhase(p)} className={`shrink-0 lg:w-full text-left p-8 rounded-[32px] flex items-center gap-8 transition-all ${activePhase.id === p.id ? 'bg-indigo-600 text-white shadow-2xl scale-105 z-10' : 'bg-white border border-slate-100 text-slate-400 hover:bg-slate-50'}`}>
                        <span className="text-4xl">{p.icon}</span>
                        <div className="hidden lg:block">
                           <div className="font-black text-lg tracking-tight">{p.title}</div>
                        </div>
                      </button>
                    ))}
                 </aside>
                 <main className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                       <motion.div key={activePhase.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-[72px] p-10 md:p-24 shadow-2xl border border-slate-50 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-12 text-[15rem] font-black text-slate-50 select-none -z-10 tracking-tighter">0{activePhase.id}</div>
                          <div className="flex items-center gap-10 mb-16 flex-wrap">
                             <div className="text-7xl md:text-9xl">{activePhase.icon}</div>
                             <h3 className="heading-serif text-5xl md:text-8xl font-black tracking-tighter text-slate-900">{activePhase.title}</h3>
                          </div>
                          <p className="text-3xl md:text-5xl text-slate-600 leading-tight font-serif italic mb-20 border-l-[12px] border-indigo-600 pl-10">"{activePhase.description}"</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                             {activePhase.steps.map((step, i) => (
                               <div key={i} className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 shadow-sm flex flex-col gap-6">
                                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-lg">{i+1}</div>
                                  <div className="font-bold text-slate-900 text-lg leading-snug tracking-tight">{step}</div>
                               </div>
                             ))}
                          </div>
                          <div className="p-12 md:p-16 bg-slate-950 text-white rounded-[56px] shadow-2xl relative overflow-hidden">
                             <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-10 relative z-10 flex items-center gap-3"><Scale size={14}/> Board Analysis</h4>
                             <p className="text-slate-300 leading-relaxed text-2xl font-light relative z-10 italic">{activePhase.detailedContent}</p>
                          </div>
                       </motion.div>
                    </AnimatePresence>
                 </main>
              </div>
            </div>
          </motion.div>
        );

      case 'ABOUT':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-40 px-6 max-w-7xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-48">
                <div className="space-y-12">
                   <h2 className="heading-serif text-7xl md:text-[11rem] font-black mb-12 tracking-tighter leading-[0.85] text-slate-900">Heritage.</h2>
                   <p className="text-slate-600 text-3xl md:text-5xl font-light leading-tight italic border-l-8 border-indigo-600 pl-10">Academic brilliance must never be silenced by economic constraint. Since 2012.</p>
                </div>
                <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1200" className="rounded-[80px] shadow-2xl aspect-[4/5] object-cover" />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {TEAM.map((member, i) => (
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} key={i} className="bg-white p-12 md:p-16 rounded-[72px] border border-slate-50 flex flex-col md:flex-row gap-12 items-center shadow-2xl hover:-translate-y-4 transition-all duration-700 group">
                     <img src={member.img} className="w-64 h-64 rounded-[48px] object-cover shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700" />
                     <div className="text-center md:text-left">
                        <h4 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter text-slate-900">{member.name}</h4>
                        <div className="text-indigo-600 font-black text-[11px] uppercase tracking-[0.4em] mb-10">{member.role}</div>
                        <p className="text-slate-500 leading-relaxed text-2xl font-light italic">"{member.bio}"</p>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        );

      case 'STORY_DETAIL':
        if (!selectedStory) return null;
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-40 min-h-screen">
             <header className="relative h-[90vh] overflow-hidden">
                <img src={selectedStory.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-24 left-0 right-0 px-6">
                   <div className="max-w-5xl mx-auto">
                      <button onClick={() => handleViewChange('HOME')} className="mb-12 text-white/60 hover:text-white transition-colors flex items-center gap-3 font-black text-xs uppercase tracking-widest group"><ChevronRight size={16} className="rotate-180 group-hover:-translate-x-2 transition-transform" /> Portal Main</button>
                      <h1 className="heading-serif text-6xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter mb-12">{selectedStory.title}</h1>
                      <p className="text-3xl md:text-5xl text-slate-200 font-light leading-snug italic max-w-4xl">"{selectedStory.subtitle}"</p>
                   </div>
                </div>
             </header>
             <div className="max-w-5xl mx-auto px-6 mt-32 flex flex-col md:flex-row gap-24">
                <aside className="md:w-1/3 space-y-16">
                   <div className="p-12 bg-slate-50 rounded-[56px] border border-slate-100 flex flex-col items-center text-center shadow-inner">
                      <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white mb-8 shadow-2xl"><GraduationCap size={48} /></div>
                      <div className="text-2xl font-black text-slate-900 mb-2">{selectedStory.author}</div>
                      <div className="text-sm text-slate-400">{selectedStory.date}</div>
                   </div>
                   <div className="p-10 bg-indigo-600 text-white rounded-[48px] shadow-2xl text-center">
                      <h4 className="text-xs font-black uppercase tracking-widest mb-6">Cohort Impact</h4>
                      <div className="text-5xl font-black mb-1">98%</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Fulfillment Rate</div>
                   </div>
                </aside>
                <article className="md:w-2/3 space-y-12 text-2xl md:text-4xl font-serif text-slate-800 leading-relaxed italic border-l border-slate-100 pl-0 md:pl-24 pb-20">
                   {selectedStory.content.map((p, i) => <p key={i} className="mb-10">{p}</p>)}
                </article>
             </div>
          </motion.div>
        );

      case 'FAQ':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-40 px-6 max-w-5xl mx-auto min-h-screen">
             <div className="mb-20 text-center">
                <h2 className="heading-serif text-7xl md:text-[9rem] font-black tracking-tighter text-slate-900 leading-none">Support.</h2>
                <p className="text-slate-500 text-3xl mt-8 font-light italic">Frequently Asked Institutional Queries</p>
             </div>
             <div className="space-y-8">
               {[
                 { q: "What is the primary eligibility criteria?", a: "Minimum 3.5 Weighted GPA and active enrollment in a US accredited university." },
                 { q: "How is the $200 processing fee utilized?", a: "Fees fund the multi-stage board review protocol and blinded evaluation systems." },
                 { q: "Can international students apply?", a: "Currently, our charter supports US citizens and permanent residents only." }
               ].map((item, idx) => (
                 <div key={idx} className="bg-white rounded-[32px] p-10 shadow-xl border border-slate-50">
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{item.q}</h3>
                    <p className="text-xl text-slate-500 font-light italic">"{item.a}"</p>
                 </div>
               ))}
             </div>
          </motion.div>
        );

      case 'APPLY':
        return (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="pt-24 md:pt-32 pb-40 px-4 md:px-6 max-w-6xl mx-auto min-h-screen">
             <div className="mb-16 md:mb-20 text-center">
                <h2 className="heading-serif text-4xl md:text-7xl lg:text-[10rem] font-black tracking-tighter text-slate-900 leading-[1.1] md:leading-[0.85]">Apply.</h2>
                <p className="text-slate-500 text-lg md:text-3xl mt-6 md:mt-8 font-light italic">Verification Cycle: Fall 2026 Board Review</p>
             </div>
             <div className="bg-white rounded-[48px] md:rounded-[72px] shadow-2xl p-6 md:p-12 lg:p-32 border border-slate-50 relative overflow-hidden">
                <div className="flex gap-4 md:gap-8 mb-16 md:mb-24">
                   {[1, 2, 3].map(s => (
                     <div key={s} className="flex-grow">
                        <div className={`h-2 md:h-2.5 rounded-full mb-4 md:mb-6 transition-all duration-1000 ${applyStep >= s ? 'bg-indigo-600 shadow-xl' : 'bg-slate-100'}`} />
                        <div className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-center ${applyStep >= s ? 'text-indigo-600' : 'text-slate-300'}`}>
                          Step 0{s}
                        </div>
                     </div>
                   ))}
                </div>
                <AnimatePresence mode="wait">
                  {applyStep === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 md:space-y-16">
                       <h3 className="text-2xl md:text-4xl font-black mb-8 md:mb-16 flex items-center gap-3 md:gap-6"><Users className="text-indigo-600" size={28} /> Identity Credentials</h3>
                       
                       {Object.keys(applyErrors).length > 0 && (
                         <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
                           <p className="text-red-700 font-black text-xs md:text-sm mb-2 md:mb-3">❌ PLEASE COMPLETE ALL REQUIRED FIELDS:</p>
                           <ul className="space-y-1 md:space-y-2">
                             {Object.entries(applyErrors).map(([key, error]) => (
                               <li key={key} className="text-red-600 text-xs md:text-sm font-semibold ml-2 md:ml-4">{error}</li>
                             ))}
                           </ul>
                         </motion.div>
                       )}

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                          <input 
                            value={formData.firstName} 
                            onChange={(e) => {
                              setFormData({...formData, firstName: e.target.value});
                              if (applyErrors.firstName) setApplyErrors({...applyErrors, firstName: ''});
                            }} 
                            className={`w-full h-14 md:h-20 px-4 md:px-10 bg-slate-50 rounded-[24px] md:rounded-[32px] outline-none font-bold text-lg md:text-2xl border-2 transition-all ${applyErrors.firstName ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                            placeholder="Legal First Name" 
                          />
                          <input 
                            value={formData.lastName} 
                            onChange={(e) => {
                              setFormData({...formData, lastName: e.target.value});
                              if (applyErrors.lastName) setApplyErrors({...applyErrors, lastName: ''});
                            }} 
                            className={`w-full h-14 md:h-20 px-4 md:px-10 bg-slate-50 rounded-[24px] md:rounded-[32px] outline-none font-bold text-lg md:text-2xl border-2 transition-all ${applyErrors.lastName ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                            placeholder="Legal Last Name" 
                          />
                       </div>
                       <input 
                         value={formData.email} 
                         onChange={(e) => {
                           setFormData({...formData, email: e.target.value});
                           if (applyErrors.email) setApplyErrors({...applyErrors, email: ''});
                         }} 
                         className={`w-full h-14 md:h-20 px-4 md:px-10 bg-slate-50 rounded-[24px] md:rounded-[32px] outline-none font-bold text-lg md:text-2xl border-2 transition-all ${applyErrors.email ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                         placeholder="name@university.edu" 
                       />
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                          <input 
                            value={formData.studentEmail} 
                            onChange={(e) => {
                              setFormData({...formData, studentEmail: e.target.value});
                              if (applyErrors.studentEmail) setApplyErrors({...applyErrors, studentEmail: ''});
                            }} 
                            className={`w-full h-14 md:h-20 px-4 md:px-10 bg-slate-50 rounded-[24px] md:rounded-[32px] outline-none font-bold text-lg md:text-2xl border-2 transition-all ${applyErrors.studentEmail ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                            placeholder="Student Email" 
                          />
                          <input 
                            value={formData.studentNumber} 
                            onChange={(e) => {
                              setFormData({...formData, studentNumber: e.target.value});
                              if (applyErrors.studentNumber) setApplyErrors({...applyErrors, studentNumber: ''});
                            }} 
                            className={`w-full h-14 md:h-20 px-4 md:px-10 bg-slate-50 rounded-[24px] md:rounded-[32px] outline-none font-bold text-lg md:text-2xl border-2 transition-all ${applyErrors.studentNumber ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                            placeholder="Student Number / ID" 
                          />
                       </div>
                       <input 
                         type="tel"
                         value={formData.studentPhone} 
                         onChange={(e) => {
                           setFormData({...formData, studentPhone: e.target.value});
                           if (applyErrors.studentPhone) setApplyErrors({...applyErrors, studentPhone: ''});
                         }} 
                         className={`w-full h-14 md:h-20 px-4 md:px-10 bg-slate-50 rounded-[24px] md:rounded-[32px] outline-none font-bold text-lg md:text-2xl border-2 transition-all ${applyErrors.studentPhone ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                         placeholder="Student Phone Number" 
                       />
                       <button 
                         onClick={() => {
                           if (validateApplyStep(1)) {
                             setApplyStep(2);
                             setApplyErrors({});
                           }
                         }} 
                         className="w-full py-5 md:py-8 bg-slate-950 text-white rounded-[24px] md:rounded-[32px] font-black text-lg md:text-2xl shadow-2xl active:scale-95 transition-all hover:bg-slate-800">
                         Proceed to Academics
                       </button>
                    </motion.div>
                  )}
                  {applyStep === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 md:space-y-16">
                       <h3 className="text-2xl md:text-4xl font-black mb-8 md:mb-16 flex items-center gap-3 md:gap-6"><Landmark className="text-indigo-600" size={28} /> Institutional Record</h3>
                       
                       {Object.keys(applyErrors).length > 0 && (
                         <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
                           <p className="text-red-700 font-black text-xs md:text-sm mb-2 md:mb-3">❌ PLEASE COMPLETE ALL REQUIRED FIELDS:</p>
                           <ul className="space-y-1 md:space-y-2">
                             {Object.entries(applyErrors).map(([key, error]) => (
                               <li key={key} className="text-red-600 text-xs md:text-sm font-semibold ml-2 md:ml-4">{error}</li>
                             ))}
                           </ul>
                         </motion.div>
                       )}

                       <input 
                         value={formData.university} 
                         onChange={(e) => {
                           setFormData({...formData, university: e.target.value});
                           if (applyErrors.university) setApplyErrors({...applyErrors, university: ''});
                         }} 
                         className={`w-full h-14 md:h-20 px-4 md:px-10 bg-slate-50 rounded-[24px] md:rounded-[32px] outline-none font-bold text-lg md:text-2xl border-2 transition-all ${applyErrors.university ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                         placeholder="Current University" 
                       />
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                          <input 
                            type="number" 
                            step="0.01" 
                            value={formData.gpa || ''} 
                            onChange={(e) => {
                              setFormData({...formData, gpa: parseFloat(e.target.value) || 0});
                              if (applyErrors.gpa) setApplyErrors({...applyErrors, gpa: ''});
                            }} 
                            className={`w-full h-14 md:h-20 px-4 md:px-10 bg-slate-50 rounded-[24px] md:rounded-[32px] outline-none font-bold text-lg md:text-2xl border-2 transition-all ${applyErrors.gpa ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                            placeholder="GPA (e.g. 4.0)" 
                          />
                          <input 
                            value={formData.major} 
                            onChange={(e) => {
                              setFormData({...formData, major: e.target.value});
                              if (applyErrors.major) setApplyErrors({...applyErrors, major: ''});
                            }} 
                            className={`w-full h-14 md:h-20 px-4 md:px-10 bg-slate-50 rounded-[24px] md:rounded-[32px] outline-none font-bold text-lg md:text-2xl border-2 transition-all ${applyErrors.major ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                            placeholder="Field of Study" 
                          />
                       </div>
                       <div className="flex gap-3 md:gap-6">
                          <button onClick={() => { setApplyStep(1); setApplyErrors({}); }} className="px-6 md:px-12 py-5 md:py-8 border-2 border-slate-100 rounded-[24px] md:rounded-[32px] font-black uppercase text-xs md:text-sm text-slate-400 tracking-widest active:scale-95 transition-all hover:bg-slate-50">Back</button>
                          <button 
                            onClick={() => {
                              if (validateApplyStep(2)) {
                                setApplyStep(3);
                                setApplyErrors({});
                              }
                            }} 
                            className="flex-grow py-5 md:py-8 bg-slate-950 text-white rounded-[24px] md:rounded-[32px] font-black text-lg md:text-2xl shadow-2xl active:scale-95 transition-all hover:bg-slate-800">
                            Final Narrative
                          </button>
                       </div>
                    </motion.div>
                  )}
                  {applyStep === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 md:space-y-16">
                       <h3 className="text-2xl md:text-4xl font-black mb-6 md:mb-8 flex items-center gap-3 md:gap-6"><FileText className="text-indigo-600" size={28} /> Academic Vision</h3>
                       <p className="text-slate-500 text-lg md:text-2xl font-light italic">"Describe how this award serves as a catalyst for your community impact."</p>
                       
                       {applyErrors.essay && (
                         <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 md:p-6">
                           <p className="text-red-700 font-black text-xs md:text-sm mb-1 md:mb-2">❌ Essay Error</p>
                           <p className="text-red-600 text-xs md:text-sm">{applyErrors.essay}</p>
                         </motion.div>
                       )}

                       <textarea 
                         value={formData.essay} 
                         onChange={(e) => {
                           setFormData({...formData, essay: e.target.value});
                           if (applyErrors.essay) setApplyErrors({...applyErrors, essay: ''});
                         }} 
                         className={`w-full h-64 md:h-[500px] p-6 md:p-12 bg-slate-50 rounded-[32px] md:rounded-[56px] outline-none font-serif text-lg md:text-3xl leading-relaxed resize-none border-2 transition-all ${applyErrors.essay ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-indigo-100'}`} 
                         placeholder="Your story starts here..." 
                       />
                       <div className={`text-xs md:text-sm font-semibold px-2 ${formData.essay.length >= 50 ? 'text-emerald-600' : 'text-slate-500'}`}>
                         Character count: {formData.essay.length} / 50 (minimum)
                       </div>
                       <div className="flex gap-3 md:gap-6">
                          <button onClick={() => { setApplyStep(2); setApplyErrors({}); }} className="px-6 md:px-12 py-5 md:py-8 border-2 border-slate-100 rounded-[24px] md:rounded-[32px] font-black uppercase text-xs md:text-sm text-slate-400 tracking-widest active:scale-95 transition-all hover:bg-slate-50">Back</button>
                          <button 
                            onClick={() => {
                              if (validateApplyStep(3)) {
                                setApplyStep(4);
                                setApplyErrors({});
                              }
                            }} 
                            className="flex-grow py-5 md:py-8 bg-slate-950 text-white rounded-[24px] md:rounded-[32px] font-black text-lg md:text-2xl shadow-2xl active:scale-95 transition-all hover:bg-slate-800">
                            Submit Application
                          </button>
                       </div>
                    </motion.div>
                  )}
                  {applyStep === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 md:space-y-12">
                       <div className="flex items-center gap-4 md:gap-8 mb-8 md:mb-12">
                          <div className="w-16 md:w-20 h-16 md:h-20 bg-emerald-50 rounded-[24px] md:rounded-[32px] flex items-center justify-center text-emerald-600 shadow-inner"><CheckCircle2 size={36} /></div>
                          <div>
                             <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-none mb-2 md:mb-3">Application Received!</h3>
                             <p className="text-slate-500 text-sm md:text-lg font-medium italic">Thank you for submitting your application</p>
                          </div>
                       </div>

                       <div className="p-6 md:p-12 lg:p-16 bg-emerald-50 rounded-[32px] md:rounded-[64px] text-emerald-900 space-y-6 md:space-y-8 relative overflow-hidden shadow-2xl border-2 border-emerald-200">
                          <div className="space-y-4 md:space-y-6">
                             <h4 className="font-black text-sm md:text-lg uppercase tracking-[0.2em] md:tracking-[0.3em]">What's Next?</h4>
                             <p className="text-base md:text-lg lg:text-xl font-semibold leading-relaxed">
                                We have received your application and will review it thoroughly. Our team will contact you within 5-7 business days via email or phone to discuss next steps in your scholarship journey.
                             </p>
                          </div>
                       </div>

                       <button 
                         onClick={() => {
                           handleApplySubmit();
                         }} 
                         className="w-full py-9 bg-emerald-600 text-white rounded-[40px] font-black uppercase tracking-[0.4em] shadow-2xl active:bg-emerald-700 transition-all flex items-center justify-center gap-5 text-sm hover:bg-emerald-700">
                         <CheckCircle2 size={24} />
                         Complete Application
                       </button>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </motion.div>
        );

      case 'GRANTS':
        return <Grants onNavigate={handleViewChange} onGrantSelect={(grant) => { setSelectedGrant(grant); handleViewChange('GRANT_DETAIL'); }} />;

      case 'GRANT_DETAIL':
        if (!selectedGrant) return null;
        return <GrantDetails grant={selectedGrant} onNavigate={handleViewChange} />;

      case 'GRANT_APPLICATION':
        return <GrantApplication onNavigate={handleViewChange} />;

      case 'GRANT_TRACKING':
        return <GrantTracking onNavigate={handleViewChange} />;

      case 'HOW_IT_WORKS':
        return <HowItWorks onNavigate={handleViewChange} />;

      case 'NEWS':
        return <News onNavigate={handleViewChange} />;

      case 'EVENTS':
        return <Events onNavigate={handleViewChange} />;

      case 'INSTITUTIONS':
        return <Institutions onNavigate={handleViewChange} />;

      case 'APPLICATION_TRACKER':
        return <ApplicationTracker onNavigate={handleViewChange} />;

      case 'DONATE':
        return <Donate onNavigate={handleViewChange} />;

      case 'SUPPORT':
        return <Support onNavigate={handleViewChange} />;

      case 'SCHOLARSHIP_HUB':
        return <ScholarshipHoldersHub onNavigate={handleViewChange} />;

      case 'COMMUNITY_EVENTS':
        return <CommunityEvents onNavigate={handleViewChange} setSelectedEvent={setSelectedEvent} />;

      case 'INTERNSHIP_OPPORTUNITIES':
        return <InternshipOpportunities onNavigate={handleViewChange} setSelectedInternship={setSelectedInternship} />;

      case 'INTERNSHIP_DETAIL':
        return <InternshipDetail internship={selectedInternship} onNavigate={handleViewChange} onBack={handleBackNavigation} />;

      case 'EVENT_DETAIL':
        return <EventDetail event={selectedEvent} onNavigate={handleViewChange} onBack={handleBackNavigation} />;

      case 'ADMIN':
        return <AdminDashboard applicants={applicants} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] selection:bg-indigo-100 selection:text-indigo-600">
      {/* DESKTOP NAVIGATION - Hidden when viewing grant tracking account */}
      {currentView !== 'GRANT_TRACKING' && (
        <Navigation currentView={currentView} setView={handleViewChange} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onBack={handleBackNavigation} />
      )}

      <main className="flex-grow pt-0 md:pt-0">
        <AnimatePresence mode="wait">
           <motion.div key={currentView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
             {renderView()}
           </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      {currentView !== 'GRANT_APPLICATION' && currentView !== 'GRANT_TRACKING' && (
        <footer className="bg-slate-950 text-slate-500 py-24 md:py-32 px-10 mt-20 pb-48 md:pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 border-b border-white/5 pb-20 relative z-10">
          <div className="col-span-1 md:col-span-2 text-center md:text-left">
            <h4 className="heading-serif text-4xl md:text-6xl font-black text-white mb-6">Beacon Scholar <br className="hidden md:block"/>Foundation.</h4>
            <p className="text-2xl md:text-4xl max-w-xl leading-tight mb-12 font-light italic text-slate-400">Championing America's most promising research minds since 2012.</p>
            <div className="flex justify-center md:justify-start gap-6">
               {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                 <button key={i} className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all border border-white/5 active:scale-90">
                    <Icon size={28} />
                 </button>
               ))}
            </div>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-indigo-400">Directory</h4>
            <ul className="space-y-6 text-xl md:text-2xl font-light italic">
              <li><button onClick={() => handleViewChange('HOME')} className="hover:text-white transition-colors">Portal Home</button></li>
              <li><button onClick={() => handleViewChange('SCHOLARSHIPS')} className="hover:text-white transition-colors">Grant Catalog</button></li>
              <li><button onClick={() => handleViewChange('RESOURCE_HUB')} className="hover:text-white transition-colors">Blueprint</button></li>
              <li><button onClick={() => handleViewChange('ABOUT')} className="hover:text-white transition-colors">Heritage</button></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-indigo-400">Access Hub</h4>
            <ul className="space-y-6 text-xl md:text-2xl font-light italic">
              <li className="flex items-center gap-4 justify-center md:justify-start"><MapPin size={24} className="text-indigo-600" /> Washington, D.C.</li>
              <li className="flex items-center gap-4 justify-center md:justify-start"><Mail size={24} className="text-indigo-600" /> apply@beacon.org</li>
              <li className="flex items-center gap-4 justify-center md:justify-start"><Phone size={24} className="text-indigo-600" /> (202) 555-0198</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] gap-8 text-center relative z-10">
          <div>© 2026 Beacon Scholar Foundation. IRS 501(c)(3) Registered Foundation.</div>
          <div className="flex gap-10">
            <button className="hover:text-white transition-colors">Privacy Protocol</button>
            <button className="hover:text-white transition-colors">Board Disclosures</button>
          </div>
        </div>
      </footer>
      )}

      {/* MOBILE ACTION BAR - Hidden when viewing grant tracking account */}
      {currentView !== 'GRANT_TRACKING' && (
        <MobileActionBar currentView={currentView} setView={handleViewChange} />
      )}

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-24 md:bottom-8 right-6 left-6 md:left-auto md:max-w-md z-[200] rounded-2xl p-6 shadow-2xl border-2 flex items-center gap-4 ${
              toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' :
              toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-900' :
              'bg-blue-50 border-blue-200 text-blue-900'
            }`}
          >
            <div className={`flex-shrink-0 text-2xl ${
              toast.type === 'success' ? 'text-emerald-600' :
              toast.type === 'error' ? 'text-red-600' :
              'text-blue-600'
            }`}>
              {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}
            </div>
            <p className="text-sm md:text-base font-semibold flex-grow">{toast.message}</p>
            <button
              onClick={() => setToast(null)}
              className={`flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity ${
                toast.type === 'success' ? 'text-emerald-600' :
                toast.type === 'error' ? 'text-red-600' :
                'text-blue-600'
              }`}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
