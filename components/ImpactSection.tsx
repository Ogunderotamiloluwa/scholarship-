import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, DollarSign, TrendingUp, BookOpen, Globe } from 'lucide-react';

const ImpactSection: React.FC = () => {
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    setStartCount(true);
  }, []);

  const stats = [
    {
      icon: Award,
      value: '2,847',
      suffix: '+',
      label: 'Scholars Funded',
      color: 'from-indigo-600 to-indigo-700'
    },
    {
      icon: Users,
      value: '156',
      suffix: '+',
      label: 'Organizations Supported',
      color: 'from-emerald-600 to-emerald-700'
    },
    {
      icon: DollarSign,
      value: '$56.3M',
      suffix: '',
      label: 'Distributed in 2025',
      color: 'from-amber-600 to-amber-700'
    },
    {
      icon: TrendingUp,
      value: '94%',
      suffix: '',
      label: 'Average Graduation Rate',
      color: 'from-pink-600 to-pink-700'
    },
    {
      icon: BookOpen,
      value: '215+',
      suffix: '',
      label: 'Partner Institutions',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: Globe,
      value: '50',
      suffix: '+',
      label: 'States Represented',
      color: 'from-purple-600 to-purple-700'
    }
  ];

  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-slate-50 dark:from-slate-900 to-white dark:to-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="heading-serif text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
            Our Impact
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light max-w-3xl mx-auto">
            Transforming lives through education. Advancing excellence across all 50 states and beyond.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 p-8 md:p-10 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Icon Background */}
                <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${stat.color} rounded-2xl md:rounded-3xl flex items-center justify-center text-white mb-8 md:mb-10 group-hover:scale-110 transition-transform`}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>

                {/* Value */}
                <div className="mb-4 md:mb-6">
                  <div className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                    {stat.value}
                    <span className="text-3xl md:text-4xl text-slate-600 dark:text-slate-400 ml-1">{stat.suffix}</span>
                  </div>
                </div>

                {/* Label */}
                <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-semibold">
                  {stat.label}
                </p>

                {/* Decorative Line */}
                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-500 font-medium">Updated January 2026</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 md:mt-24 bg-gradient-to-r from-indigo-50 dark:from-indigo-900/20 to-emerald-50 dark:to-emerald-900/20 border border-indigo-200 dark:border-indigo-800 rounded-3xl md:rounded-4xl p-8 md:p-12 text-center"
        >
          <p className="text-lg md:text-2xl text-slate-700 dark:text-slate-300 font-light mb-6">
            Together, we're building a future where talent and economic circumstance are never barriers to excellence.
          </p>
          <button className="px-8 md:px-12 py-4 md:py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl md:rounded-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
            Read Our Full Impact Report
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
