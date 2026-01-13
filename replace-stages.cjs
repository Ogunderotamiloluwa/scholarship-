const fs = require('fs');

const filePath = 'components/GrantTracking.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// Find and replace the old stages with new ones
const oldStagesStart = content.indexOf('{/* LOGIN STAGE */}');
const oldStagesEnd = content.indexOf('{/* TRACKING STAGE - PROFESSIONAL BANKING UI */}');

if (oldStagesStart === -1 || oldStagesEnd === -1) {
  console.log('ERROR: Could not find stage markers');
  process.exit(1);
}

console.log(`Found LOGIN STAGE at position ${oldStagesStart}`);
console.log(`Found TRACKING STAGE at position ${oldStagesEnd}`);
console.log(`Characters to replace: ${oldStagesEnd - oldStagesStart}`);

const newStagesUI = `{/* GRANT SELECTION STAGE */}
          {trackingState.stage === 'grantSelection' && (
            <motion.div
              key="grantSelection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-black mb-4">Grant Tracking Portal</h2>
                <p className="text-lg text-blue-100">
                  Select the grant you want to track
                </p>
              </div>

              <div className="space-y-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                {errors.grantSelection && (
                  <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl p-4 flex gap-3">
                    <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 dark:text-red-300 font-semibold text-sm">{errors.grantSelection}</p>
                  </div>
                )}

                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-4 flex gap-3">
                  <AlertCircle size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-blue-900 dark:text-blue-200 mb-1">Select Your Grant</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      Choose which grant program you applied for to proceed with login.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {(() => {
                    const applications = JSON.parse(localStorage.getItem('grantApplications') || '[]') as GrantApplication[];
                    const uniqueGrants = [...new Set(applications.map(app => app.grantCategory))];
                    
                    if (uniqueGrants.length === 0) {
                      return (
                        <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl p-4">
                          <p className="text-amber-800 dark:text-amber-300 font-semibold">No grant applications found. Please submit an application first.</p>
                        </div>
                      );
                    }

                    return uniqueGrants.map((grantCategory) => (
                      <button
                        key={grantCategory}
                        onClick={() => {
                          setTrackingState((prev) => ({ ...prev, stage: 'passkeyLogin', currentGrant: grantCategory }));
                          setErrors({});
                          setPasskeyInput('');
                          setGetPasskeyForm({ email: '', password: '' });
                        }}
                        className="w-full p-4 border-2 border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all text-left font-black text-slate-900 dark:text-white"
                      >
                        💰 {grantCategory}
                      </button>
                    ));
                  })()}
                </div>
              </div>
            </motion.div>
          )}

          {/* PASSKEY LOGIN STAGE (ONLY WAY TO LOGIN) */}
          {trackingState.stage === 'passkeyLogin' && (
            <motion.div
              key="passkeyLogin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-black mb-4">🔑 Login with Passkey</h2>
                <p className="text-lg text-green-100">
                  Selected Grant: <span className="font-black">{trackingState.currentGrant}</span>
                </p>
              </div>

              <div className="space-y-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                {errors.passkey && (
                  <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl p-4 flex gap-3">
                    <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 dark:text-red-300 font-semibold text-sm">{errors.passkey}</p>
                  </div>
                )}

                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded-xl p-4 flex gap-3">
                  <Key size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-green-900 dark:text-green-200 mb-1">Use Your Passkey</h4>
                    <p className="text-sm text-green-800 dark:text-green-300">
                      Enter your passkey (API key) to securely access your grant tracking dashboard.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">🔑 Passkey (API Key)</label>
                  <input
                    type={trackingState.showPasskey ? 'text' : 'password'}
                    placeholder="PK-XXXXXXXXXXXXXXXX"
                    value={passkeyInput}
                    onChange={(e) => {
                      setPasskeyInput(e.target.value);
                      setErrors({});
                    }}
                    className={\`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:outline-none transition-all \${
                      errors.passkey ? 'border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-green-600'
                    }\`}
                  />
                  {errors.passkey && <p className="text-red-600 text-sm font-semibold mt-1">{errors.passkey}</p>}
                  <button
                    type="button"
                    onClick={() =>
                      setTrackingState((prev) => ({
                        ...prev,
                        showPasskey: !prev.showPasskey
                      }))
                    }
                    className="mt-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold"
                  >
                    {trackingState.showPasskey ? '👁️ Hide' : '👁️ Show'} Passkey
                  </button>
                </div>

                <button
                  onClick={handlePasskeyLogin}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  <Lock size={20} />
                  {isLoading ? 'Logging in...' : 'Login with Passkey'}
                </button>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3">
                  <button
                    onClick={() => {
                      setTrackingState((prev) => ({ ...prev, stage: 'getPasskey' }));
                      setErrors({});
                      setGetPasskeyForm({ email: '', password: '' });
                    }}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Mail size={20} />
                    Get Passkey with Email & Password
                  </button>

                  <button
                    onClick={() => {
                      setTrackingState((prev) => ({ ...prev, stage: 'passKeyRecovery' }));
                      setErrors({});
                      setPasskeyInput('');
                    }}
                    className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold py-2 transition-colors"
                  >
                    🔒 Lost Your Passkey? Recover It
                  </button>

                  <button
                    onClick={() => {
                      setTrackingState((prev) => ({ ...prev, stage: 'grantSelection', currentGrant: null }));
                      setErrors({});
                      setPasskeyInput('');
                    }}
                    className="w-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold py-2 transition-colors"
                  >
                    ← Change Grant
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* GET PASSKEY STAGE (Create passkey with email & password) */}
          {trackingState.stage === 'getPasskey' && (
            <motion.div
              key="getPasskey"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-black mb-4">🔐 Get Your Passkey</h2>
                <p className="text-lg text-amber-100">
                  Selected Grant: <span className="font-black">{trackingState.currentGrant}</span>
                </p>
              </div>

              <div className="space-y-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                {errors.getPasskey && (
                  <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl p-4 flex gap-3">
                    <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 dark:text-red-300 font-semibold text-sm">{errors.getPasskey}</p>
                  </div>
                )}

                <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl p-4 flex gap-3">
                  <Mail size={20} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-amber-900 dark:text-amber-200 mb-1">Create Your Passkey</h4>
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      Enter the email and password from your grant application to create or retrieve your passkey.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">📧 Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={getPasskeyForm.email}
                    onChange={(e) => {
                      setGetPasskeyForm({ ...getPasskeyForm, email: e.target.value });
                      setErrors({});
                    }}
                    className={\`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all \${
                      errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-amber-600'
                    }\`}
                  />
                  {errors.email && <p className="text-red-600 text-sm font-semibold mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">🔐 Password</label>
                  <div className="relative">
                    <input
                      type={trackingState.showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={getPasskeyForm.password}
                      onChange={(e) => {
                        setGetPasskeyForm({ ...getPasskeyForm, password: e.target.value });
                        setErrors({});
                      }}
                      className={\`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none transition-all pr-12 \${
                        errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-amber-600'
                      }\`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setTrackingState((prev) => ({
                          ...prev,
                          showPassword: !prev.showPassword
                        }))
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {trackingState.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-600 text-sm font-semibold mt-1">{errors.password}</p>}
                </div>

                <button
                  onClick={handleGetPasskey}
                  disabled={isLoading}
                  className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  <Key size={20} />
                  {isLoading ? 'Creating Passkey...' : 'Get My Passkey'}
                </button>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3">
                  <button
                    onClick={() => {
                      setTrackingState((prev) => ({ ...prev, stage: 'passkeyLogin' }));
                      setErrors({});
                      setGetPasskeyForm({ email: '', password: '' });
                    }}
                    className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold py-2 transition-colors"
                  >
                    ← Back to Passkey Login
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          `;

// Replace the old stages with new UI
const newContent = content.substring(0, oldStagesStart) + newStagesUI + content.substring(oldStagesEnd);

fs.writeFileSync(filePath, newContent);
console.log('✅ Successfully replaced UI sections');
console.log(`Old section was ${oldStagesEnd - oldStagesStart} characters`);
console.log(`New section is ${newStagesUI.length} characters`);
