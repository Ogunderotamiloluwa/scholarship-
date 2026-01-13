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
      }, 3000); // 3 seconds instead of 30

      return () => clearTimeout(timer);
    }
  }, [isVisible, isLoading, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-20"
        >
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-emerald-200 dark:border-emerald-800 overflow-hidden">
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

            <div className="p-4 md:p-8">
              <div className="flex items-start justify-between gap-2 mb-4">
                <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="flex-shrink-0"
                    >
                      <Loader2 size={28} className="text-indigo-600 md:size-32" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="flex-shrink-0"
                    >
                      <CheckCircle2 size={28} className="text-emerald-600 md:size-32" />
                    </motion.div>
                  )}
                  <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white break-words">
                    {isLoading ? 'Processing...' : title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex-shrink-0"
                >
                  <X size={20} className="md:size-24" />
                </button>
              </div>

              {!isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed whitespace-pre-line">
                    {message}
                  </p>

                  <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 md:p-4 space-y-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs md:text-sm">
                      What happens next:
                    </h4>
                    <ul className="text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                        <span>Your account has been saved on this device</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                        <span>Login anytime with your email & password to track your grant</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                        <span>Our team will get back to you immediately or within a few days</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                        <span>We'll contact you via text, email, or iMessage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                        <span>Thank you for reaching out to us!</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white font-bold py-2 md:py-3 text-sm md:text-base rounded-xl transition-all transform active:scale-95 shadow-lg"
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
