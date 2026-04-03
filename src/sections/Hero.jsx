import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from '../components/Button';
import { handleScrollTo } from '../utils/scrollTo';
import heroVideo from '../assets/Animated_video/hero.mp4';

const sanitizePhone = (value) => {
  const cleaned = value.replace(/[^\d+]/g, '');
  if (!cleaned) return '';
  if (cleaned.startsWith('+')) {
    return `+${cleaned.slice(1).replace(/\+/g, '')}`;
  }
  return cleaned.replace(/\+/g, '');
};

const servicesOptions = [
  "AI Copilots",
  "Workflow Automation",
  "LLM Agents",
  "Revenue Automation",
  "Other"
];

const budgetOptions = [
  "<$3k",
  "$3k - $10k",
  "$10k - $30k",
  "$30k+",
  "Other"
];

const Hero = () => {
  const recaptchaRef = useRef(null);
  const heroVideoRef = useRef(null);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    service: "",
    budget: "",
    message: "",
  });

  const [isCustomBudget, setIsCustomBudget] = useState(false);
  const [status, setStatus] = useState("");
  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDarkMode(root.classList.contains('dark'));

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const syncPlayback = () => {
      video.defaultPlaybackRate = 2;
      video.playbackRate = 2;
      void video.play().catch(() => {});
    };

    const resumePlayback = () => {
      if (document.visibilityState === 'visible') {
        syncPlayback();
      }
    };

    video.addEventListener('loadedmetadata', syncPlayback);
    video.addEventListener('canplay', syncPlayback);
    video.addEventListener('playing', syncPlayback);
    video.addEventListener('waiting', syncPlayback);
    video.addEventListener('stalled', syncPlayback);
    document.addEventListener('visibilitychange', resumePlayback);

    return () => {
      video.removeEventListener('loadedmetadata', syncPlayback);
      video.removeEventListener('canplay', syncPlayback);
      video.removeEventListener('playing', syncPlayback);
      video.removeEventListener('waiting', syncPlayback);
      video.removeEventListener('stalled', syncPlayback);
      document.removeEventListener('visibilitychange', resumePlayback);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'user_phone' ? sanitizePhone(value) : value,
    });
  };

  const handleSelectChange = (e, field) => {
    const value = e.target.value;
    if (value === "Other") {
      if (field === "budget") setIsCustomBudget(true);
      setFormData({ ...formData, [field]: "" });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    const token = recaptchaRef.current?.getValue();
    
    if (!token) {
      alert("Please verify that you are human!");
      return;
    }

    setStatus("SENDING");

    try {
      const payload = {
        ...formData,
        landing_page: 'ai-automation',
        recaptcha_token: token
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("SUCCESS");
        setFormData({ user_name: "", user_email: "", user_phone: "", service: "", budget: "", message: "" });
        setIsCustomBudget(false);
        recaptchaRef.current?.reset();
        setCaptchaValue(null);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error(error);
      setStatus("ERROR");
      setTimeout(() => setStatus(""), 5000);
    }
  };

  const inputClasses = "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-white/35 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 sm:px-5 sm:py-4";

  return (
    <section className="section !pt-[124px] sm:!pt-[145px] lg:!pt-[180px] pb-[90px] sm:pb-[120px] md:pb-[170px] flex items-center min-h-screen overflow-hidden" id="hero">
      
      {/* Decorative background grid and shapes */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <video
          ref={heroVideoRef}
          className="h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.58)_0%,rgba(2,6,23,0.42)_28%,rgba(2,6,23,0.64)_100%)] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.64)_0%,rgba(2,6,23,0.46)_30%,rgba(2,6,23,0.7)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(41,211,255,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(109,124,255,0.14),transparent_34%)]" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] opacity-40 -z-10" />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-orb orb-3" />
        <div className="hero-ai-ring ring-1" />
        <div className="hero-ai-ring ring-2" />
        <div className="hero-ai-beam" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-10 xl:gap-12 items-center z-10">
        
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', damping: 20 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-[#071425]/88 px-5 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:mb-8"
          >
            <Sparkles className="text-secondary w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-white/90">Open for AI System Deployments</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 max-w-full text-[2.95rem] font-black uppercase leading-[0.92] tracking-tight sm:mb-8 sm:text-6xl sm:leading-[0.9] md:text-8xl lg:text-[6.8rem] xl:text-8xl"
          >
            <span className="block text-white">Building</span>
            <span className="block text-gradient break-words">Autonomous</span>
            <span className="mt-2 inline-block max-w-full rounded-2xl bg-primary px-3.5 py-2 text-white shadow-2xl shadow-primary/20 break-words sm:px-6">
              Operations.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-8 max-w-xl text-base font-light leading-relaxed tracking-tight text-white sm:mb-10 sm:text-lg md:text-xl lg:max-w-[34rem] xl:max-w-xl"
          >
            We build AI systems that automate, analyze, and execute work across your business without adding complexity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a href="#work" onClick={(e) => handleScrollTo(e, '#work')} className="w-full sm:w-auto block">
              <Button variant="primary" className="w-full sm:w-auto text-sm font-black uppercase tracking-widest px-10 py-5 rounded-full">
                Explore Systems <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="w-full sm:w-auto block">
              <Button variant="outline" className="w-full sm:w-auto text-sm font-black uppercase tracking-widest px-10 py-5 rounded-full border-white/20 bg-white/[0.02] text-white hover:border-primary hover:text-primary">
                Book Strategy
              </Button>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 grid w-full max-w-xl grid-cols-3 gap-x-4 gap-y-5 border-t border-white/10 pt-8 sm:mt-16 sm:gap-x-8 sm:pt-10"
          >
             <div className="min-w-0">
               <div className="font-heading text-[2rem] font-black leading-none text-white sm:text-4xl">180+</div>
               <div className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/50 sm:text-[10px] sm:tracking-widest">Flows Automated</div>
             </div>
             <div className="min-w-0">
               <div className="font-heading text-[2rem] font-black leading-none text-white sm:text-4xl">72%</div>
               <div className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/50 sm:text-[10px] sm:tracking-widest">Avg. Time Saved</div>
             </div>
             <div className="min-w-0">
               <div className="font-heading text-[2rem] font-black leading-none text-white sm:text-4xl">24/7</div>
               <div className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/50 sm:text-[10px] sm:tracking-widest">Agent Coverage</div>
             </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Embedded Quote Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="lg:col-span-5 w-full relative"
        >
          {/* Inner Glow Background */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] opacity-20 dark:opacity-40 -z-10" />
          
          <div className="rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] border border-primary/25 relative overflow-visible bg-[#0d1628]/90 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.45)] p-5 sm:p-7 md:p-12">
            {status === 'SUCCESS' ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[1.75rem] border border-emerald-500/20 bg-emerald-500/10 p-8 text-center md:min-h-[470px]">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="text-white" size={32} />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white">Request Received!</h3>
                <p className="font-light text-white/72">
                  We&apos;ll get back to you regarding your automation inquiry shortly.
                </p>
                <button onClick={() => setStatus('')} className="mt-8 rounded-full bg-transparent px-6 py-2 font-medium text-primary transition-all hover:bg-primary/10">
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 sm:mb-8">
                  <div className="inline-block px-3.5 sm:px-4 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-3 sm:mb-4 border border-primary/20">Live Automation Intake</div>
                  <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tighter text-white uppercase leading-none">Map Your Automation Stack</h2>
                </div>

                <form onSubmit={handleHeroSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input required type="text" name="user_name" placeholder="Full Name" value={formData.user_name} onChange={handleChange} className={inputClasses} disabled={status === 'SENDING'} />
                    <input required type="email" name="user_email" placeholder="Email Address" value={formData.user_email} onChange={handleChange} className={inputClasses} disabled={status === 'SENDING'} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input required type="tel" inputMode="tel" name="user_phone" placeholder="Phone Number" value={formData.user_phone} onChange={handleChange} className={inputClasses} disabled={status === 'SENDING'} />
                    <div className="relative group/field">
                      {isCustomBudget ? (
                        <input required type="text" name="budget" placeholder="Type Budget..." value={formData.budget} onChange={handleChange} onBlur={(e) => { if (e.target.value.trim() === '') setIsCustomBudget(false); }} className={inputClasses} autoFocus />
                      ) : (
                        <select required name="budget" value={formData.budget} onChange={(e) => handleSelectChange(e, "budget")} style={{ colorScheme: isDarkMode ? 'dark' : 'light' }} className={`${inputClasses} appearance-none cursor-pointer`}>
                          <option value="" disabled>Design Budget</option>
                          {budgetOptions.map(opt => <option key={opt} value={opt} className="bg-[#0c1220] text-white">{opt}</option>)}
                        </select>
                      )}
                    </div>
                  </div>

                  <textarea required name="message" rows="3" placeholder="Tell us which workflow, team, or process you want to automate..." value={formData.message} onChange={handleChange} className={`${inputClasses} resize-none`} disabled={status === 'SENDING'}></textarea>
                  
                  <div className="w-full rounded-2xl border border-white/10 bg-[#091120]/90 px-2.5 sm:px-4 py-3 sm:py-4">
                    <div className="recaptcha-shell">
                      <div className="recaptcha-frame">
                        <ReCAPTCHA
                          key="hero-captcha-dark"
                          ref={recaptchaRef}
                          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} 
                          theme="dark"
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

                  <Button variant="primary" type="submit" className={`w-full justify-center py-5 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/20 ${(status === 'SENDING' || !captchaValue) ? 'opacity-70 cursor-not-allowed' : ''}`} disabled={status === 'SENDING' || !captchaValue}>
                    {status === '' && <><Send className="w-4 h-4 mr-3" /> Start Automation Audit</>}
                    {status === 'SENDING' && <><Loader2 className="w-4 h-4 mr-3 animate-spin" /> Verifying...</>}
                    {status === 'ERROR' && <><AlertCircle className="w-4 h-4 mr-3" /> Failed</>}
                  </Button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
