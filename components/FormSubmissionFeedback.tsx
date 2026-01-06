import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Loader2 } from 'lucide-react';

interface FormSubmissionFeedbackProps {
  isVisible: boolean;
  isLoading?: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const FormSubmissionFeedback: React.FC<FormSubmissionFeedbackProps> = ({
  isVisible,
  isLoading = false,
  onClose,
  title = 'Thank You!',
  message = 'Your message has been received successfully.'
}) => {
  useEffect(() => {
    if (isVisible && !isLoading) {
      const timer = setTimeout(() => {
        onClose();
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, isLoading, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md mx-auto px-4"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-emerald-200 dark:border-emerald-800 overflow-hidden">
            {/* Loading Bar */}
            {isLoading && (
              <div className="h-1 bg-gradient-to-r from-indigo-500 to-emerald-500">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4, ease: 'easeInOut' }}
                />
              </div>
            )}

            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Loader2 size={32} className="text-indigo-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle2 size={32} className="text-emerald-600" />
                    </motion.div>
                  )}
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                    {isLoading ? 'Processing...' : title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {!isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {message}
                  </p>

                  <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 space-y-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      What happens next:
                    </h4>
                    <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                        <span>Our team will get back to you immediately or within a few days</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                        <span>We'll contact you via text, email, or iMessage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                        <span>Thank you for reaching out to us!</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all transform active:scale-95 shadow-lg"
                  >
                    Close
                  </button>
                </motion.div>
              )}

              {isLoading && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-slate-600 dark:text-slate-400 text-center font-medium"
                >
                  Please wait while we process your submission...
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormSubmissionFeedback;
