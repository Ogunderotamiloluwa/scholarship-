/**
 * Application Timeline Component
 * Visualizes the status progression of applications
 */

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export interface TimelineStep {
  id: string;
  label: string;
  description: string;
  date?: string;
  status: 'completed' | 'current' | 'pending';
  icon?: React.ReactNode;
}

interface ApplicationTimelineProps {
  steps: TimelineStep[];
  currentStep: number;
  applicationName: string;
}

export const ApplicationTimeline: React.FC<ApplicationTimelineProps> = ({
  steps,
  currentStep,
  applicationName,
}) => {
  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="text-emerald-500" size={24} />;
      case 'current':
        return <Clock className="text-amber-500 animate-pulse" size={24} />;
      case 'pending':
        return <AlertCircle className="text-slate-400" size={24} />;
      default:
        return <div className="w-6 h-6 rounded-full border-2 border-slate-300" />;
    }
  };

  const getStepColor = (index: number) => {
    if (index < currentStep) return 'bg-emerald-500';
    if (index === currentStep) return 'bg-amber-500';
    return 'bg-slate-300';
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700">
      <h3 className="heading-serif text-2xl font-black text-slate-900 dark:text-white mb-8">
        Application Progress: {applicationName}
      </h3>

      <div className="relative">
        {/* Timeline Path */}
        <div className="absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-amber-500 to-slate-300">
          <motion.div
            initial={{ height: '0%' }}
            animate={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute top-0 left-0 right-0 bg-emerald-500"
          />
        </div>

        {/* Timeline Steps */}
        <div className="space-y-8 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-32"
            >
              {/* Step Marker */}
              <div className="absolute left-0 top-0 w-24 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${getStepColor(
                    index
                  )} bg-opacity-90 border-4 border-white dark:border-slate-800`}
                >
                  {getStepIcon(step.status)}
                </motion.div>
              </div>

              {/* Step Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className={`p-6 rounded-xl border-2 transition-all ${
                  step.status === 'completed'
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
                    : step.status === 'current'
                    ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 ring-2 ring-amber-300 dark:ring-amber-700'
                    : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-black text-lg text-slate-900 dark:text-white">
                    Step {index + 1}: {step.label}
                  </h4>
                  {step.status === 'completed' && (
                    <span className="inline-block px-3 py-1 bg-emerald-200 dark:bg-emerald-700 text-emerald-700 dark:text-emerald-200 text-xs font-black rounded-full">
                      COMPLETED
                    </span>
                  )}
                  {step.status === 'current' && (
                    <span className="inline-block px-3 py-1 bg-amber-200 dark:bg-amber-700 text-amber-700 dark:text-amber-200 text-xs font-black rounded-full animate-pulse">
                      IN PROGRESS
                    </span>
                  )}
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-3 text-sm leading-relaxed">
                  {step.description}
                </p>

                {step.date && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    📅 {step.date}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
            Overall Progress
          </span>
          <span className="text-lg font-black text-slate-900 dark:text-white">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: '0%' }}
            animate={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationTimeline;
