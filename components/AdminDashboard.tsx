
import React, { useState } from 'react';
import { Applicant, ApplicationStatus } from '../types';
import { LayoutDashboard, Users, Activity, TrendingUp, BarChart3, Search, Filter, CheckCircle2, XCircle, Clock, ExternalLink, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminDashboardProps {
  applicants: Applicant[];
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  onUpdateScore: (id: string, score: number) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ applicants, onUpdateStatus, onUpdateScore }) => {
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  const stats = {
    total: applicants.length,
    pending: applicants.filter(a => a.status === ApplicationStatus.PENDING || a.status === ApplicationStatus.REVIEWING).length,
    awarded: applicants.filter(a => a.status === ApplicationStatus.AWARDED).length,
    totalFunding: applicants.filter(a => a.status === ApplicationStatus.AWARDED).length * 45000
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 animate-in fade-in duration-700">
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
                  <input type="range" min="0" max="100" value={selectedApplicant.score} onChange={(e) => onUpdateScore(selectedApplicant.id, parseInt(e.target.value))} className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 shadow-inner" />
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Final Selection Outcome</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.values(ApplicationStatus).map(s => (
                      <button key={s} onClick={() => onUpdateStatus(selectedApplicant.id, s)} className={`py-4 text-[10px] font-black uppercase tracking-widest rounded-[20px] border-2 transition-all ${selectedApplicant.status === s ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl scale-105' : 'border-slate-50 text-slate-400 hover:border-indigo-100 hover:bg-slate-50'}`}>{s}</button>
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

export default AdminDashboard;
