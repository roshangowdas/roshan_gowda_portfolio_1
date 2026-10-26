import React from 'react';
import { motion } from 'motion/react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { GraduationCap, Award, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const AboutSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const aboutText =
    "I am Roshan Gowda S, an Information Science undergraduate building full-stack web applications using the MERN stack. I've developed and published an open-source npm package, built multi-user web platforms, and utilized AI developer tools (Google AI Studio, Gemini API) for rapid software delivery.";

  const certificates = [
    { title: 'HTML & CSS Essentials', issuer: 'Cisco Networking Academy', date: '2025' },
    { title: 'JavaScript Essentials 1 & 2', issuer: 'Cisco Networking Academy', date: '2025' },
    { title: 'Prompt Engineering Fundamentals', issuer: 'AI Data Science', date: '2026' },
    { title: 'AI for Beginners', issuer: 'AI Data Science', date: '2026' },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative min-h-screen w-full px-5 sm:px-8 md:px-10 py-20 flex flex-col items-center justify-center overflow-hidden select-none transition-colors duration-300 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#0C0C0C] text-[#D7E2EA]'
      }`}
    >
      {/* Decorative 3D Icon 1: Top-Left Moon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none opacity-80">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="3D Moon Decorative Icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Decorative 3D Icon 2: Bottom-Left 3D Object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none opacity-40">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Floating Object Decorative Icon"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Decorative 3D Icon 3: Top-Right Lego */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none opacity-80">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="3D Lego Decorative Icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center max-w-5xl text-center">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated Text Bio */}
        <div className="mt-10 sm:mt-14 md:mt-16 w-full flex justify-center">
          <AnimatedText text={aboutText} />
        </div>

        {/* Education & Info Card */}
        <div className="mt-16 w-full text-left">
          {/* Card 1: Education & Location */}
          <FadeIn delay={0.2} y={30}>
            <div
              className={`p-6 sm:p-8 rounded-3xl transition-all h-full flex flex-col justify-between shadow-xl ${
                isLight
                  ? 'bg-white border border-slate-300 shadow-slate-200/80 text-slate-900'
                  : 'bg-[#0E0E0E] border border-purple-500/30 text-white hover:border-purple-400/60'
              }`}
            >
              <div>
                <div
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-white uppercase text-xs font-mono font-bold tracking-widest mb-5 outline outline-2 outline-white -outline-offset-[3px]"
                  style={{
                    background:
                      'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow:
                      '0px 4px 12px rgba(181, 1, 167, 0.35), inset 2px 2px 8px #7721B1',
                  }}
                >
                  <GraduationCap className="w-4 h-4 text-white" />
                  <span>Education</span>
                </div>
                <h3 className={`text-xl sm:text-2xl font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Nagarjuna College of Engineering and Technology
                </h3>
                <p className={`text-sm mt-1.5 font-medium ${isLight ? 'text-slate-700' : 'text-[#D7E2EA]/90'}`}>
                  Bachelor of Engineering in Information Science and Engineering (Expected 2027)
                </p>
                <p className={`text-xs mt-3.5 font-mono leading-relaxed ${isLight ? 'text-slate-600' : 'text-[#D7E2EA]/70'}`}>
                  Relevant Coursework: Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, Machine Learning
                </p>
              </div>

              <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs uppercase tracking-wider font-mono ${
                isLight ? 'border-slate-200 text-slate-600' : 'border-white/10 text-[#D7E2EA]/80'
              }`}>
                <span className="flex items-center gap-1.5">
                  <Globe className={`w-4 h-4 ${isLight ? 'text-purple-600' : 'text-purple-300'}`} /> Bengaluru, India
                </span>
                <span>English (Fluent), Kannada (Native)</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Certifications Banner */}
        <FadeIn delay={0.4} y={30} className="w-full mt-6">
          <div
            className={`p-6 sm:p-8 rounded-3xl transition-all text-left shadow-xl ${
              isLight
                ? 'bg-white border border-slate-300 shadow-slate-200/80 text-slate-900'
                : 'bg-[#0E0E0E] border border-purple-500/30 text-white hover:border-purple-400/60'
            }`}
          >
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-white uppercase text-xs font-mono font-bold tracking-widest mb-6 outline outline-2 outline-white -outline-offset-[3px]"
              style={{
                background:
                  'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow:
                  '0px 4px 12px rgba(181, 1, 167, 0.35), inset 2px 2px 8px #7721B1',
              }}
            >
              <Award className="w-4 h-4 text-white" />
              <span>Certifications & Credentials</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert.title}
                  className="p-4 rounded-2xl text-white font-medium shadow-lg transition-all hover:scale-[1.02] cursor-default outline outline-2 outline-white -outline-offset-[3px] flex flex-col justify-between min-h-[110px]"
                  style={{
                    background:
                      'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow:
                      '0px 4px 12px rgba(181, 1, 167, 0.3), inset 2px 2px 8px #7721B1',
                  }}
                >
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">{cert.title}</h4>
                    <p className="text-[11px] text-white/80 mt-1 font-mono">{cert.issuer}</p>
                  </div>
                  <span className="text-[10px] text-amber-200 font-mono font-bold mt-3 block">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Spacing between section block and contact button */}
        <div className="mt-14 sm:mt-18">
          <FadeIn delay={0.5} y={20}>
            <ContactButton onClick={scrollToContact} />
          </FadeIn>
        </div>
      </div>
    </motion.section>
  );
};
