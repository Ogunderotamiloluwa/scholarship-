import React, { useState } from 'react';
import { ViewState } from '../types';
import { motion } from 'framer-motion';
import { Heart, DollarSign, Gift, TrendingUp, Zap, Award, Check, ArrowRight, Briefcase, FileText, Users, Shield } from 'lucide-react';
import { CORPORATE_PARTNERS } from '../Constants';

interface DonateProps {
  onNavigate?: (view: ViewState) => void;
}

const Donate: React.FC<DonateProps> = ({ onNavigate }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [donationType, setDonationType] = useState<'one-time' | 'monthly' | 'corporate'>('one-time');
  const [showCorporateForm, setShowCorporateForm] = useState(false);

  const presetAmounts = [25, 50, 100, 250, 500, 1000];

  const donationMethods = [
    {
      icon: Heart,
      title: 'One-Time Donation',
      description: 'Make a single contribution to support scholarships this year.',
      selected: donationType === 'one-time',
      onClick: () => { setDonationType('one-time'); setShowCorporateForm(false); }
    },
    {
      icon: TrendingUp,
      title: 'Monthly Giving',
      description: 'Become a sustaining partner with recurring monthly donations.',
      selected: donationType === 'monthly',
      onClick: () => { setDonationType('monthly'); setShowCorporateForm(false); }
    },
    {
      icon: Briefcase,
      title: 'Corporate Giving',
      description: 'Company donations, matching gifts, and strategic partnerships.',
      selected: donationType === 'corporate',
      onClick: () => { setDonationType('corporate'); setShowCorporateForm(true); }
    }
  ];

  const givingWays = [
    {
      icon: DollarSign,
      title: 'Direct Donation',
      description: 'Credit card, debit card, or bank transfer. Instant processing.',
      features: ['Immediate impact', 'Tax-deductible', 'Easy setup']
    },
    {
      icon: Gift,
      title: 'Planned Giving',
      description: 'Leave a lasting legacy through bequests and charitable trusts.',
      features: ['Tax benefits', 'Long-term impact', 'Plan your legacy']
    },
    {
      icon: Award,
      title: 'Corporate Giving',
      description: 'Company matching programs and corporate sponsorships.',
      features: ['Matching funds', 'Employee giving', 'Sponsorships']
    },
    {
      icon: Zap,
      title: 'Donor-Advised Fund',
      description: 'Contribute to a DAF and direct grants at your own pace.',
      features: ['Tax deductions', 'Strategic giving', 'Flexible timing']
    }
  ];

  const impactLevels = [
    {
      amount: 50,
      title: 'Scholar Supporter',
      impact: 'Provides one week of books and supplies for a scholar',
      color: 'from-blue-500 to-blue-600'
    },
    {
      amount: 250,
      title: 'Research Sponsor',
      impact: 'Funds one month of research equipment for a graduate student',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      amount: 1000,
      title: 'Education Partner',
      impact: 'Provides one semester of mentorship program access',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      amount: 5000,
      title: 'Excellence Champion',
      impact: 'Fully funds one scholars entire tuition for one semester',
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[550px] flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden px-4 pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Heart size={32} className="text-rose-400 animate-pulse" />
              <span className="text-rose-300 text-sm md:text-base font-black uppercase tracking-widest">Support the Mission</span>
            </div>
            <h1 className="heading-serif text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-6">
              Make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-emerald-200">Difference</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-10">
              Your gift transforms lives. Every dollar directly supports scholarships, grants, and mentorship programs for America's brightest minds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* DONATION TYPE SELECTION */}
      <section className="bg-gradient-to-b from-indigo-50 dark:from-slate-900 to-white dark:to-slate-950 px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white text-center mb-12">Choose Your Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {donationMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.button
                  key={index}
                  onClick={method.onClick}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 md:p-10 rounded-3xl border-2 transition-all transform hover:scale-105 active:scale-95 ${
                    method.selected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xl'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-indigo-500 dark:hover:border-indigo-500'
                  }`}
                >
                  <Icon size={36} className={`mb-4 ${method.selected ? 'text-white' : 'text-indigo-600'}`} />
                  <h3 className="text-2xl font-black mb-3 text-left">{method.title}</h3>
                  <p className={`text-left text-sm md:text-base ${method.selected ? 'text-indigo-100' : 'text-slate-600 dark:text-slate-400'}`}>
                    {method.description}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* DONATION AMOUNT SELECTION */}
      <section className="bg-white dark:bg-slate-950 px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white text-center mb-4">
            {donationType === 'one-time' ? 'Select Your Gift' : 'Choose Your Monthly Amount'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-center text-lg mb-12">
            {donationType === 'one-time' 
              ? 'Your donation today directly funds scholarships tomorrow.' 
              : 'Join our sustaining partners in creating lasting change.'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 mb-12">
            {presetAmounts.map((amount) => (
              <motion.button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 md:p-8 rounded-2xl border-2 font-black text-lg md:text-2xl transition-all ${
                  selectedAmount === amount
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-indigo-500'
                }`}
              >
                ${amount}
                {donationType === 'monthly' && <div className="text-xs opacity-75">/month</div>}
              </motion.button>
            ))}
          </div>

          {/* Custom Amount Input */}
          <div className="mb-12">
            <label className="block text-sm font-black text-slate-900 dark:text-white mb-3">Or enter a custom amount:</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 dark:text-white font-black text-xl">$</span>
              <input 
                type="number" 
                placeholder="Enter amount"
                className="w-full pl-10 pr-6 py-4 md:py-5 border-2 border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xl font-bold focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
              />
            </div>
          </div>

          {/* Donate Button */}
          <button className="w-full py-6 md:py-8 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white rounded-2xl md:rounded-3xl font-black text-lg md:text-2xl shadow-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95">
            <Heart size={28} />
            Donate Now
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* IMPACT LEVELS */}
      <section className="bg-gradient-to-b from-slate-50 dark:from-slate-900 to-white dark:to-slate-950 px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white text-center mb-12">Your Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactLevels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-3xl bg-gradient-to-br ${level.color} p-8 md:p-10 text-white relative overflow-hidden group hover:shadow-2xl transition-all`}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform"></div>
                
                <div className="relative z-10">
                  <div className="text-5xl font-black mb-3">${level.amount}</div>
                  <h3 className="text-xl md:text-2xl font-black mb-4">{level.title}</h3>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">{level.impact}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WAYS TO GIVE */}
      <section className="bg-white dark:bg-slate-950 px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white text-center mb-12">Ways to Give</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {givingWays.map((way, index) => {
              const Icon = way.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-3xl bg-gradient-to-br from-slate-50 dark:from-slate-900 to-slate-100 dark:to-slate-800 border border-slate-200 dark:border-slate-700 p-8 md:p-10 hover:shadow-2xl transition-all group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={32} />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">{way.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg mb-6 leading-relaxed">{way.description}</p>
                  
                  <ul className="space-y-3">
                    {way.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check size={20} className="text-emerald-600 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300 font-semibold">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="mt-6 w-full py-3 md:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95">
                    Learn More
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORPORATE DONATION SECTION */}
      {donationType === 'corporate' && (
        <section className="bg-gradient-to-b from-indigo-50 dark:from-slate-900 to-white dark:to-slate-950 px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Corporate Partnership Programs</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                Partner with us to create transformational impact. We offer multiple giving vehicles tailored to your company's goals and values.
              </p>
            </motion.div>

            {/* Corporate Giving Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  title: 'Employee Giving Program',
                  description: 'Enable your employees to support scholarships through payroll deductions.',
                  benefits: ['Tax-deductible', 'Flexible amounts', 'Year-round giving', 'Matched by company'],
                  icon: Users
                },
                {
                  title: 'Corporate Matching',
                  description: 'Match employee donations up to 100% or more with our matching fund.',
                  benefits: ['100% match available', 'Flexible thresholds', 'Easy administration', 'Monthly reporting'],
                  icon: TrendingUp
                },
                {
                  title: 'Sponsorship Programs',
                  description: 'Become a named sponsor of specific programs or events.',
                  benefits: ['Naming opportunities', 'Brand visibility', 'VIP recognition', 'Custom packages'],
                  icon: Award
                },
                {
                  title: 'In-Kind Donations',
                  description: 'Donate products, services, or equipment to support our mission.',
                  benefits: ['Fair market value deduction', 'Inventory solutions', 'Tax advantages', 'Partnership benefits'],
                  icon: Gift
                }
              ].map((option, i) => {
                const Icon = option.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center text-white mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{option.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mb-4">{option.description}</p>
                    <ul className="space-y-2">
                      {option.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
                          <Check size={16} className="text-emerald-500 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            {/* Corporate Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-50 dark:from-slate-800 to-indigo-50 dark:to-slate-800 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-8">Corporate Donation Form</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-black text-slate-900 dark:text-white mb-2">Company Name *</label>
                  <input 
                    type="text" 
                    placeholder="Enter company name"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-900 dark:text-white mb-2">EIN/Tax ID *</label>
                  <input 
                    type="text" 
                    placeholder="XX-XXXXXXX"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-900 dark:text-white mb-2">Contact Person *</label>
                  <input 
                    type="text" 
                    placeholder="Full name"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-900 dark:text-white mb-2">Email *</label>
                  <input 
                    type="email" 
                    placeholder="email@company.com"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-900 dark:text-white mb-2">Donation Type *</label>
                  <select className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm">
                    <option value="">Select type...</option>
                    <option value="one-time">One-Time Donation</option>
                    <option value="annual">Annual Commitment</option>
                    <option value="matching">Matching Program</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="in-kind">In-Kind Donation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-900 dark:text-white mb-2">Donation Amount *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 dark:text-white font-black">$</span>
                    <input 
                      type="number" 
                      placeholder="50,000"
                      className="w-full pl-8 pr-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-black text-slate-900 dark:text-white mb-2">Additional Notes</label>
                <textarea 
                  placeholder="Any special requests or information about your donation..."
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm h-24 resize-none"
                />
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-8 border border-blue-200 dark:border-blue-900/50">
                <div className="flex items-start gap-3">
                  <Shield size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    <p className="font-bold mb-1">Tax Documentation</p>
                    <p>We'll provide all necessary tax documentation and annual impact reports. Our 501(c)(3) status ensures your donation is fully tax-deductible.</p>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 md:py-5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl md:rounded-2xl font-black text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                <Heart size={24} />
                Submit Corporate Donation
              </button>
            </motion.div>

            {/* Corporate Matching Partners */}
            <div className="mt-16">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 text-center">Featured Matching Partners</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CORPORATE_PARTNERS.slice(0, 4).map((partner) => (
                  <motion.div
                    key={partner.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-lg flex items-center justify-center mb-3">
                      <Briefcase size={24} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">{partner.name}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">{partner.matchingPercentage}% Match</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ SECTION */}
      <section className="bg-gradient-to-b from-indigo-50 dark:from-slate-900 to-white dark:to-slate-950 px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white text-center mb-12">Giving FAQ</h2>
          
          <div className="space-y-6">
            {[
              {
                q: 'Is my donation tax-deductible?',
                a: 'Yes! The Beacon Scholars Foundation is a registered 501(c)(3) nonprofit. All donations are tax-deductible to the extent allowed by law. You\'ll receive a tax receipt for your records.'
              },
              {
                q: 'How can I make a major gift?',
                a: 'For gifts of $10,000 or more, please contact our Major Gifts team at majorgiving@beaconscholar.org or (202) 555-0198 ext. 105. We\'d love to discuss customized giving options.'
              },
              {
                q: 'Can my company make a matching gift?',
                a: 'Many companies offer matching gift programs. We can work directly with your HR department to process corporate matching gifts. Contact us for more details.'
              },
              {
                q: 'How can I start a planned gift?',
                a: 'Planned gifts like bequests, charitable trusts, and life insurance gifts are wonderful ways to create lasting impact. Contact our Planned Giving office at plannedgiving@beaconscholar.org'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800"
              >
                <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-3">{item.q}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-emerald-600 px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Make an Impact?</h2>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of donors transforming the lives of America's brightest minds.
          </p>
          <button className="px-8 md:px-12 py-4 md:py-5 bg-white text-indigo-600 font-black rounded-2xl md:rounded-3xl hover:bg-slate-100 transition-all shadow-2xl text-lg">
            Donate Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Donate;
