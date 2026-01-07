
import React, { useState } from 'react';

const EligibilityTree: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const questions = [
    { key: 'usRes', q: 'Are you a US Citizen or permanent resident?', options: ['Yes', 'No'] },
    { key: 'gpa', q: 'Is your current GPA 3.5 or higher?', options: ['Yes', 'No'] },
    { key: 'need', q: 'Do you demonstrate significant financial need?', options: ['Yes', 'No'] },
  ];

  const handleAnswer = (val: boolean) => {
    setAnswers({ ...answers, [questions[step].key]: val });
    setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  if (step >= questions.length) {
    const isEligible = answers.usRes && (answers.gpa || answers.need);
    return (
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-indigo-100 animate-in zoom-in duration-300">
        <div className={`text-6xl mb-4 ${isEligible ? 'text-green-500' : 'text-slate-400'}`}>
          {isEligible ? '🎉' : '⏳'}
        </div>
        <h3 className="text-2xl font-bold mb-4">
          {isEligible ? "You're likely eligible!" : "Initial Check Completed"}
        </h3>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          {isEligible 
            ? "Based on your responses, you qualify for several of our major scholarship programs. We recommend starting your application today."
            : "You might not fit our primary merit-based criteria, but we encourage checking our 'Need-based' or 'Regional' programs for specific opportunities."}
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="px-6 py-3 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">Try Again</button>
          {isEligible && (
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-md">Apply Now</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-lg border border-indigo-100">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">Step {step + 1} of 3</span>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <div key={i} className={`h-1 w-8 rounded-full ${i <= step ? 'bg-indigo-500' : 'bg-slate-200'}`} />
          ))}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-8 text-slate-800">{questions[step].q}</h3>
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => handleAnswer(true)}
          className="py-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all font-semibold"
        >
          Yes
        </button>
        <button 
          onClick={() => handleAnswer(false)}
          className="py-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all font-semibold"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default EligibilityTree;
