import React, { useEffect, useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const sanitizePhone = (value) => {
  const cleaned = value.replace(/[^\d+]/g, '');
  if (!cleaned) return '';
  if (cleaned.startsWith('+')) {
    return `+${cleaned.slice(1).replace(/\+/g, '')}`;
  }
  return cleaned.replace(/\+/g, '');
};

const servicesOptions = [
  'AI Copilots',
  'Workflow Automation',
  'LLM Agents',
  'Data Pipelines',
  'AI Governance',
  'Revenue Automation',
  'System Integrations',
  'Agent Operations',
  'Other',
];

const budgetOptions = [
  '<$3k',
  '$3k - $10k',
  '$10k - $30k',
  '$30k+',
  'Other',
];

export default function ServiceForm({ initialService, isMini = false, forceDark = false }) {
  const recaptchaRef = useRef(null);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    service: initialService || '',
    otherService: '',
    budget: '',
    otherBudget: '',
    message: '',
  });

  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDarkMode(root.classList.contains('dark'));

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'user_phone' ? sanitizePhone(value) : value,
    });
  };

  const isOtherService = formData.service === 'Other';
  const isOtherBudget = formData.budget === 'Other';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = recaptchaRef.current?.getValue();

    if (!token) {
      alert('Please verify that you are human returning the ReCaptcha!');
      return;
    }

    setStatus('loading');

    try {
      const payload = {
        ...formData,
        service: isOtherService ? formData.otherService : formData.service,
        budget: isOtherBudget ? formData.otherBudget : formData.budget,
        landing_page: 'ai-automation',
        recaptcha_token: token,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          user_name: '',
          user_email: '',
          user_phone: '',
          service: initialService || '',
          otherService: '',
          budget: '',
          otherBudget: '',
          message: '',
        });
        recaptchaRef.current?.reset();
        setCaptchaValue(null);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`${isMini ? 'min-h-[320px] rounded-[1.75rem] p-6' : 'min-h-[400px] rounded-[2rem] p-8'} flex flex-col items-center justify-center border border-emerald-500/30 bg-white dark:bg-[#0d1628] text-center shadow-[0_50px_100px_rgba(0,0,0,0.45)]`}>
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="text-white" size={32} />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Request Received!</h3>
        <p className="font-light text-slate-600 dark:text-gray-400">
          We&apos;ll get back to you regarding <strong>{initialService || 'your automation project'}</strong> shortly.
        </p>
        <button onClick={() => setStatus('idle')} className="mt-8 rounded-full bg-transparent px-6 py-2 font-medium text-primary transition-all hover:bg-primary/10">Send Another</button>
      </div>
    );
  }

  const effectiveDarkMode = forceDark || isDarkMode;
  const fieldBase = isMini
    ? 'px-4 py-3 text-[15px] lg:px-3.5 lg:py-2.5 lg:text-[14px] xl:px-4 xl:py-3 xl:text-[15px]'
    : 'px-4 sm:px-5 py-3.5 sm:py-4 text-sm lg:px-3.5 lg:py-[0.6875rem] lg:text-[12.5px] xl:px-4 xl:py-3 xl:text-[13px]';
  const shellClasses = forceDark
    ? 'border-primary/25 bg-[#0d1628]/90 shadow-[0_50px_100px_rgba(0,0,0,0.45)]'
    : 'border-slate-200 bg-slate-50 shadow-sm dark:border-primary/25 dark:bg-[#0d1628]/90 dark:shadow-[0_50px_100px_rgba(0,0,0,0.45)]';
  const titleClasses = forceDark ? 'text-white' : 'text-slate-900 dark:text-white';
  const inputClasses = forceDark
    ? 'border border-white/10 bg-white/5 text-white placeholder:text-white/35'
    : 'border border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/35';
  const recaptchaWrapClasses = forceDark
    ? 'border-white/10 bg-[#091120]/90'
    : 'border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#091120]/90';

  return (
    <div className={`${isMini ? 'h-full rounded-[1.75rem] p-4 md:rounded-[2rem] md:p-5 lg:p-4 xl:p-5' : 'rounded-[1.75rem] p-5 sm:rounded-[2rem] sm:p-6 md:rounded-[2.5rem] md:p-10 lg:p-6 xl:p-7'} group relative overflow-visible border ${shellClasses}`}>
      <h3 className={`${isMini ? 'mb-4 text-[1.85rem] md:text-[2rem] lg:text-[1.75rem] xl:text-[2rem]' : 'mb-5 text-lg sm:text-xl md:mb-6 lg:text-[1.45rem] xl:text-[1.7rem]'} font-heading font-bold ${titleClasses}`}>
        Start your project
      </h3>

      <form onSubmit={handleSubmit} className={`${isMini ? 'space-y-3 lg:space-y-2.5 xl:space-y-3' : 'space-y-4 lg:space-y-3.5 xl:space-y-4'} relative z-10 w-full`}>
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isMini ? 'gap-3' : 'gap-3 sm:gap-3.5'}`}>
          <div>
            <input required type="text" name="user_name" placeholder="Full Name" value={formData.user_name} onChange={handleChange} className={`w-full rounded-2xl ${inputClasses} ${fieldBase} font-light shadow-sm outline-none transition-all focus:border-primary/50`} />
          </div>
          <div>
            <input required type="email" name="user_email" placeholder="Email Address" value={formData.user_email} onChange={handleChange} className={`w-full rounded-2xl ${inputClasses} ${fieldBase} font-light shadow-sm outline-none transition-all focus:border-primary/50`} />
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${isMini ? 'gap-3' : 'gap-3 sm:gap-3.5'}`}>
          <div>
            <input required type="tel" inputMode="tel" name="user_phone" placeholder="Phone Number" value={formData.user_phone} onChange={handleChange} className={`w-full rounded-2xl ${inputClasses} ${fieldBase} font-light shadow-sm outline-none transition-all focus:border-primary/50`} />
          </div>
          <div>
            {!isOtherBudget ? (
              <select required name="budget" value={formData.budget} onChange={handleChange} style={{ colorScheme: effectiveDarkMode ? 'dark' : 'light' }} className={`w-full appearance-none cursor-pointer rounded-2xl ${inputClasses} ${fieldBase} font-light shadow-sm outline-none transition-all focus:border-primary/50`}>
                <option value="" disabled>Select Budget Range</option>
                {budgetOptions.map((opt) => <option key={opt} value={opt} className={effectiveDarkMode ? 'bg-[#0c1220] text-white' : 'bg-white text-slate-900'}>{opt}</option>)}
              </select>
            ) : (
              <input required type="text" autoFocus name="otherBudget" placeholder="Custom Target..." value={formData.otherBudget} onChange={handleChange} onBlur={(e) => { if (e.target.value.trim() === '') setFormData((p) => ({ ...p, budget: '', otherBudget: '' })); }} className={`w-full rounded-2xl ${inputClasses} ${fieldBase} font-light shadow-sm outline-none transition-all focus:border-primary/50`} />
            )}
          </div>
        </div>

        <textarea required name="message" placeholder="Project details..." rows={isMini ? 2 : 3} value={formData.message} onChange={handleChange} className={`w-full resize-none rounded-2xl ${inputClasses} ${isMini ? 'min-h-[84px] px-4 py-3 text-[15px] lg:min-h-[72px] lg:px-3.5 lg:py-2.5 lg:text-[14px] xl:min-h-[84px] xl:px-4 xl:py-3 xl:text-[15px]' : 'min-h-[110px] px-4 py-3.5 text-sm sm:min-h-0 sm:px-5 sm:py-4 lg:min-h-[88px] lg:px-3.5 lg:py-[0.6875rem] lg:text-[12.5px] xl:min-h-[96px] xl:px-4 xl:py-3 xl:text-[13px]'} font-light shadow-sm outline-none transition-all focus:border-primary/50`} />

        <div className={`w-full rounded-2xl border ${recaptchaWrapClasses} ${isMini ? 'mb-1 px-2.5 py-2.5 lg:px-2 lg:py-2 xl:px-2.5 xl:py-2.5' : 'mb-3 px-2.5 py-3 sm:mb-4 sm:px-4 sm:py-4 lg:px-3 lg:py-3 xl:px-3.5 xl:py-3.5'}`}>
          <div className="recaptcha-shell">
            <div className="recaptcha-frame">
              <ReCAPTCHA
                key={effectiveDarkMode ? 'captcha-dark' : 'captcha-light'}
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                theme={effectiveDarkMode ? 'dark' : 'light'}
                onChange={(value) => setCaptchaValue(value)}
                onExpired={() => {
                  setCaptchaValue(null);
                  recaptchaRef.current?.reset();
                }}
                onErrored={() => {
                  setCaptchaValue(null);
                  recaptchaRef.current?.reset();
                }}
              />
            </div>
          </div>
        </div>

        <button type="submit" disabled={status === 'loading' || !captchaValue} className={`flex w-full max-w-full items-center justify-center gap-2 rounded-full bg-primary text-white shadow-xl shadow-primary/20 transition-transform disabled:cursor-not-allowed disabled:opacity-60 ${isMini ? 'py-3 text-sm lg:py-2.5 xl:py-3' : 'py-3.5 text-sm sm:py-4'} font-bold ${captchaValue && status !== 'loading' ? 'hover:scale-[1.02]' : ''}`}>
          {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Send Request</>}
        </button>

        {status === 'error' && <div className="mt-2 flex items-center justify-center gap-2 text-xs text-red-500"><AlertCircle size={14} /> Something went wrong. Try again.</div>}
      </form>
    </div>
  );
}
