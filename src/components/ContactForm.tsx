import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Mail, User, MessageSquare, Copy, Check, RefreshCw, ExternalLink, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: 'Project Collaboration Request',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Your name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject line is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message content cannot be empty';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please enter at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const constructMailtoUrl = () => {
    const recipient = '0243roshan@gmail.com';
    const emailSubject = encodeURIComponent(formData.subject || 'Portfolio Inquiry');
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    return `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const mailtoUrl = constructMailtoUrl();
    window.location.href = mailtoUrl;
    setStatus('success');
  };

  const handleCopyMessage = () => {
    const textToCopy = `To: 0243roshan@gmail.com\nSubject: ${formData.subject}\nFrom: ${formData.name} (${formData.email})\n\n${formData.message}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'Project Collaboration Request',
      message: '',
    });
    setErrors({});
    setStatus('idle');
    setCopied(false);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors font-sans ${
      hasError
        ? 'border-rose-500 focus:border-rose-600'
        : isLight
        ? 'bg-slate-100/80 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-purple-600 focus:bg-white'
        : 'bg-black/60 border-white/15 text-white placeholder-white/20 focus:border-purple-400'
    }`;

  const labelClass = `block text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 font-medium ${
    isLight ? 'text-slate-800' : 'text-[#D7E2EA]/80'
  }`;

  return (
    <div
      className={`w-full max-w-3xl mx-auto my-8 p-6 sm:p-8 rounded-3xl transition-all shadow-2xl text-left select-text ${
        isLight
          ? 'bg-white border border-slate-300 text-slate-900 shadow-slate-200/80'
          : 'bg-[#0E0E0E] border border-purple-500/30 text-white'
      }`}
    >
      <div className={`flex items-center justify-between gap-4 pb-6 mb-6 border-b ${
        isLight ? 'border-slate-200' : 'border-white/10'
      }`}>
        <div>
          <h3 className={`text-xl sm:text-2xl font-bold flex items-center gap-2 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Send a Direct Message
          </h3>
          <p className={`text-xs sm:text-sm mt-1 ${isLight ? 'text-slate-600' : 'text-[#D7E2EA]/70'}`}>
            Launches your system email client pre-filled with your message details
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className={`p-6 sm:p-8 rounded-2xl border text-center space-y-6 ${
              isLight
                ? 'bg-purple-50/80 border-purple-200 text-slate-900'
                : 'bg-purple-950/40 border-purple-500/50 text-white'
            }`}
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className={`text-xl font-bold ${isLight ? 'text-purple-950' : 'text-white'}`}>Opening Email Client...</h4>
              <p className={`text-sm mt-1 max-w-md mx-auto ${isLight ? 'text-slate-700' : 'text-[#D7E2EA]/80'}`}>
                Your email client should launch with a pre-filled message for <span className="text-purple-600 font-semibold">0243roshan@gmail.com</span>.
              </p>
            </div>

            <div className={`p-4 rounded-xl border max-w-md mx-auto text-xs text-left space-y-2 ${
              isLight ? 'bg-white border-slate-300' : 'bg-black/60 border-white/10'
            }`}>
              <div className="flex justify-between">
                <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-white'}`}>Recipient:</span>
                <span className="text-purple-600 font-bold">0243roshan@gmail.com</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-white'}`}>Subject:</span>
                <span className={isLight ? 'text-slate-900' : 'text-white'}>{formData.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-white'}`}>Sender:</span>
                <span className={isLight ? 'text-slate-900' : 'text-white'}>{formData.name} ({formData.email})</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={constructMailtoUrl()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-wider text-white font-bold transition-all hover:scale-105"
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  boxShadow: '0px 4px 12px rgba(181, 1, 167, 0.35)',
                }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Re-launch Mail Client</span>
              </a>

              <button
                onClick={handleCopyMessage}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium border transition-all ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    : 'bg-white/10 hover:bg-white/20 text-white/90 border-white/15'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Message Text'}</span>
              </button>

              <button
                onClick={handleReset}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-colors ${
                  isLight ? 'text-slate-600 hover:text-slate-900' : 'text-[#D7E2EA]/70 hover:text-white'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Form</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name Field */}
              <div>
                <label className={labelClass}>
                  <User className="w-3.5 h-3.5 text-purple-600" />
                  <span>Your Name *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan"
                  className={inputClass(!!errors.name)}
                />
                {errors.name && (
                  <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1 font-sans">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className={labelClass}>
                  <Mail className="w-3.5 h-3.5 text-purple-600" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. alex@company.com"
                  className={inputClass(!!errors.email)}
                />
                {errors.email && (
                  <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1 font-sans">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label className={labelClass}>
                <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                <span>Subject Line *</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Project Inquiry"
                className={inputClass(!!errors.subject)}
              />
              {errors.subject && (
                <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3 h-3" /> {errors.subject}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label className={labelClass}>
                <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                <span>Message Content *</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell me about your project, timeline, or technical requirements..."
                className={`${inputClass(!!errors.message)} resize-none`}
              />
              {errors.message && (
                <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3 h-3" /> {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-[#D7E2EA]/60'}`}>
                Direct mail delivery to <span className={`font-semibold ${isLight ? 'text-purple-700' : 'text-white'}`}>0243roshan@gmail.com</span>
              </p>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest text-white font-bold cursor-pointer outline outline-2 outline-white -outline-offset-[3px] transition-all duration-300 hover:scale-105 shadow-xl"
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  boxShadow:
                    '0px 4px 14px rgba(181, 1, 167, 0.35), inset 2px 2px 8px #7721B1',
                }}
              >
                <Send className="w-4 h-4 text-white" />
                <span>Send Message</span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
