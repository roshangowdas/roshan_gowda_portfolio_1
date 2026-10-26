import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import {
  Github,
  Package,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  Server,
  ShieldCheck,
  AlertTriangle,
  HeartPulse,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  Maximize2,
  RefreshCw,
} from 'lucide-react';
import { FadeIn } from './FadeIn';
import { ProjectModal } from './ProjectModal';
import { ProjectItem } from '../types';
import { useTheme } from '../context/ThemeContext';

const projectsData: ProjectItem[] = [
  {
    id: 'react-status-kit',
    number: '01',
    title: 'react-status-kit',
    subtitle: 'npm install @roshan__gowda/react-status-kit',
    category: 'NPM Package',
    description:
      'Developed and published a production-ready open-source React component library designed to standardize asynchronous UI states (Loading, Error, Success, Empty). Published on the official npm registry.',
    longDescription:
      'react-status-kit was engineered to eliminate redundant boilerplate when dealing with asynchronous API requests in React applications. Instead of manually constructing spinners, error boundaries, and empty placeholder views for every component, react-status-kit provides a standardized, zero-dependency component wrapper that handles state transitions smoothly with customizable slot fallbacks and full TypeScript type definitions.',
    techStack: ['React.js', 'npm', 'JavaScript', 'TypeScript', 'UI States'],
    keyFeatures: [
      {
        title: 'Zero Third-Party Dependencies',
        desc: 'Ultra-lightweight bundle size engineered with standard React primitives for maximum load speed.',
      },
      {
        title: 'TypeScript Native',
        desc: 'Fully typed state interfaces ensuring type safety across Loading, Error, Success, and Empty states.',
      },
      {
        title: 'Standardized Async Fallbacks',
        desc: 'Pre-built accessible UI feedback views for network retries, empty records, and loader spinners.',
      },
      {
        title: 'Custom Component Slots',
        desc: 'Easily plug in bespoke brand illustrations or custom animations into designated state slots.',
      },
    ],
    highlights: [
      'Published on the official npm registry (@roshan__gowda/react-status-kit)',
      'Zero runtime dependencies to keep client bundle sizes optimized',
      'Supports React 18+ and Next.js App Router server/client components',
    ],
    npmPackage: 'https://www.npmjs.com/package/@roshan__gowda/react-status-kit',
    githubUrl: 'https://github.com/roshangowdas',
  },
  {
    id: 'community-resource-platform',
    number: '02',
    title: 'Community Resource Sharing Platform',
    category: 'MERN Stack, Firebase, REST APIs',
    description:
      'Built an end-to-end local resource-sharing web application supporting 50+ active users with real-time exchange capabilities. Designed MongoDB data models and implemented 10 secure RESTful API endpoints integrated with Firebase Authentication.',
    longDescription:
      'A full-stack web ecosystem built on the MERN stack designed to enable community members to post, request, and share local assets and resources. The application features a robust Express.js backend API with MongoDB document storage, secure Firebase Bearer Token authentication middleware, and an interactive React dashboard.',
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Firebase Auth', 'REST APIs'],
    keyFeatures: [
      {
        title: '10 Secure RESTful API Endpoints',
        desc: 'Custom Express routes handling resource listings, search queries, exchange status transitions, and profiles.',
      },
      {
        title: 'Firebase Token Verification',
        desc: 'Server-side authorization middleware parsing and validating Firebase Bearer ID Tokens on every private endpoint.',
      },
      {
        title: 'MongoDB Mongoose Schemas',
        desc: 'Normalized document models supporting user relationships, asset categories, and active request statuses.',
      },
      {
        title: 'Real-Time Resource Exchange',
        desc: 'Interactive state tracking for asset requests, owner approval workflows, and exchange completions.',
      },
    ],
    highlights: [
      'Successfully served 50+ active community members during initial deployment',
      'Secured 10 REST endpoints against unauthorized access using Firebase Admin SDK',
      'Designed responsive dashboard views with real-time feedback and state indicators',
    ],
    githubUrl: 'https://github.com/roshangowdas/community-resource-sharing',
  },
  {
    id: 'ai-petcare',
    number: '03',
    title: 'AI-PetCare',
    category: 'HTML5, CSS3, JavaScript',
    description:
      'Designed and launched an interactive pet health monitoring web interface featuring dynamic health analytics dashboards, vital tracking, and fluid mobile layouts.',
    longDescription:
      'AI-PetCare is a modern web interface built for pet health tracking and telemetry diagnostics. It combines an intuitive multi-pet switching interface with vital sign monitors (heart rate, step metrics, nutrition intake) and automated health insights to assist pet owners in maintaining routine health checkups.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Web Interface'],
    keyFeatures: [
      {
        title: 'Vital Telemetry Tracking',
        desc: 'Real-time telemetry tracking for heart rate (BPM), daily step counts, and nutritional intake percentages.',
      },
      {
        title: 'Multi-Pet Profile Switcher',
        desc: 'Instant profile toggling between registered pets with isolated health metrics and breed targets.',
      },
      {
        title: 'AI Diagnostic Assessment',
        desc: 'Automated health summary engine highlighting routine checkup schedules and status alerts.',
      },
      {
        title: 'Fluid Responsive Layout',
        desc: 'CSS Grid and Flexbox architecture delivering high performance across smartphones, tablets, and monitors.',
      },
    ],
    highlights: [
      'Clean high-contrast dark visual theme built with native HTML5 & CSS3',
      'Zero-dependency vanilla JavaScript implementation ensuring instant response times',
    ],
    githubUrl: 'https://github.com/roshangowdas/ai-petcare',
  },
];

// --- Sub-Widget 1: React Status Kit Live Interactive Component Playground ---
const StatusKitWidget: React.FC = () => {
  const [activeState, setActiveState] = useState<'loading' | 'success' | 'error' | 'empty'>('loading');
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText('npm i @roshan__gowda/react-status-kit');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full bg-[#141414] border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col justify-between gap-5 font-sans">
      {/* Terminal Bar Top */}
      <div className="flex items-center justify-between bg-[#1a1a1a] px-3.5 py-2.5 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <code className="text-xs sm:text-sm font-mono text-emerald-300 font-medium">
            npm i @roshan__gowda/react-status-kit
          </code>
        </div>
        <button
          onClick={copyCommand}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white transition-colors cursor-pointer"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Interactive State Selector */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-mono text-white/60">
          <span className="uppercase tracking-widest flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Live Component Simulator
          </span>
          <span className="text-emerald-400">Click tabs to test UI states</span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10">
          {(['loading', 'success', 'error', 'empty'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setActiveState(st)}
              className={`py-2 px-2 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                activeState === st
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-bold'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Live Render Preview Box */}
      <div className="relative min-h-[160px] bg-black/60 rounded-xl border border-white/10 p-5 flex flex-col items-center justify-center text-center overflow-hidden">
        {activeState === 'loading' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key="loading"
            className="flex flex-col items-center gap-3"
          >
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-white">Fetching Data...</span>
              <span className="text-xs text-white/50 font-mono">Standardized Async Loading View</span>
            </div>
          </motion.div>
        )}

        {activeState === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key="success"
            className="flex flex-col items-center gap-2"
          >
            <div className="p-2.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <span className="text-sm font-semibold text-emerald-300">Data Loaded Successfully</span>
            <span className="text-xs text-white/50 font-mono">StatusState type: &apos;success&apos;</span>
          </motion.div>
        )}

        {activeState === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key="error"
            className="flex flex-col items-center gap-2"
          >
            <div className="p-2.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <XCircle className="w-7 h-7" />
            </div>
            <span className="text-sm font-semibold text-rose-300">Network Request Failed</span>
            <button
              onClick={() => setActiveState('loading')}
              className="mt-1 px-3 py-1 rounded-md bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-mono border border-rose-500/40 transition-colors cursor-pointer"
            >
              Retry Request
            </button>
          </motion.div>
        )}

        {activeState === 'empty' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key="empty"
            className="flex flex-col items-center gap-2"
          >
            <div className="p-2.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <span className="text-sm font-semibold text-amber-300">No Records Found</span>
            <span className="text-xs text-white/50 font-mono">StatusState type: &apos;empty&apos;</span>
          </motion.div>
        )}
      </div>

      {/* Package Specs Footer */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-center font-mono">
        <div className="bg-white/5 py-2 px-1 rounded-lg">
          <div className="text-[10px] text-white/50">DEPENDENCIES</div>
          <div className="text-xs font-bold text-emerald-400">0 (Zero)</div>
        </div>
        <div className="bg-white/5 py-2 px-1 rounded-lg">
          <div className="text-[10px] text-white/50">VERSION</div>
          <div className="text-xs font-bold text-white">1.0.0 Latest</div>
        </div>
        <div className="bg-white/5 py-2 px-1 rounded-lg">
          <div className="text-[10px] text-white/50">TYPES</div>
          <div className="text-xs font-bold text-cyan-400">TypeScript</div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Widget 2: Community Resource Platform Interactive API Console ---
const CommunityResourceWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'schema' | 'auth'>('endpoints');
  const [simulatedCall, setSimulatedCall] = useState<string | null>(null);

  const handleTestCall = (path: string) => {
    setSimulatedCall(path);
    setTimeout(() => setSimulatedCall(null), 1500);
  };

  return (
    <div className="w-full h-full bg-[#141414] border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col justify-between gap-4 font-sans">
      {/* Widget Header & Nav */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm font-mono font-bold text-white">MERN Architecture Console</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            10 REST Endpoints
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-mono">
          <button
            onClick={() => setActiveTab('endpoints')}
            className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'endpoints' ? 'bg-white/20 text-white font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            REST APIs
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'schema' ? 'bg-white/20 text-white font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            MongoDB
          </button>
          <button
            onClick={() => setActiveTab('auth')}
            className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'auth' ? 'bg-white/20 text-white font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            Firebase Auth
          </button>
        </div>
      </div>

      {/* Tab 1: REST APIs list */}
      {activeTab === 'endpoints' && (
        <div className="flex flex-col gap-2 font-mono text-xs">
          {[
            { method: 'POST', path: '/api/auth/verify-token', status: '200 OK', latency: '14ms' },
            { method: 'GET', path: '/api/resources?category=active', status: '200 OK', latency: '22ms' },
            { method: 'POST', path: '/api/resources/exchange-request', status: '201 Created', latency: '35ms' },
          ].map((item) => (
            <div
              key={item.path}
              className="flex items-center justify-between bg-black/50 p-2.5 rounded-xl border border-white/10 hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {item.method}
                </span>
                <span className="text-white/80 truncate max-w-[170px] sm:max-w-[220px]">{item.path}</span>
              </div>
              <button
                onClick={() => handleTestCall(item.path)}
                className="px-2 py-1 rounded bg-white/10 hover:bg-emerald-500 hover:text-black transition-all text-[10px] font-bold cursor-pointer shrink-0"
              >
                {simulatedCall === item.path ? 'Running...' : 'Test'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: MongoDB Schema */}
      {activeTab === 'schema' && (
        <div className="bg-black/70 p-3 rounded-xl border border-white/10 font-mono text-[11px] text-emerald-300 leading-relaxed overflow-x-auto">
          <div className="text-white/40">// ResourceSchema (MongoDB Mongoose)</div>
          <div>{`const ResourceSchema = new Schema({`}</div>
          <div className="pl-4">{`title: { type: String, required: true },`}</div>
          <div className="pl-4">{`ownerId: { type: String, ref: 'User' },`}</div>
          <div className="pl-4">{`status: { type: String, enum: ['available', 'claimed'] },`}</div>
          <div className="pl-4">{`createdAt: { type: Date, default: Date.now }`}</div>
          <div>{`});`}</div>
        </div>
      )}

      {/* Tab 3: Firebase Auth */}
      {activeTab === 'auth' && (
        <div className="flex flex-col gap-2.5 p-3 bg-black/50 rounded-xl border border-white/10 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" /> Firebase Token Authorization
          </div>
          <p className="text-white/70 text-xs leading-relaxed">
            Every client request headers include a Bearer Firebase ID Token verified on the Express server using Firebase Admin SDK.
          </p>
          <div className="flex items-center gap-2 font-mono text-[11px] text-amber-300 bg-white/5 p-2 rounded border border-white/10">
            <code>Authorization: Bearer eyJhbGciOiJSUzI1NiI...</code>
          </div>
        </div>
      )}

      {/* Stats Footer Grid */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 font-mono text-center">
        <div className="bg-white/5 p-2 rounded-lg">
          <div className="text-[10px] text-white/50">ACTIVE USERS</div>
          <div className="text-sm font-extrabold text-emerald-400">50+ Community</div>
        </div>
        <div className="bg-white/5 p-2 rounded-lg">
          <div className="text-[10px] text-white/50">SECURITY</div>
          <div className="text-sm font-extrabold text-cyan-400">Firebase Auth</div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Widget 3: AI-PetCare Interactive Health Dashboard ---
const PetCareWidget: React.FC = () => {
  const [selectedPet, setSelectedPet] = useState<'Max' | 'Milo'>('Max');

  const petData = {
    Max: {
      type: 'Golden Retriever',
      heartRate: '74 BPM',
      activity: '8,450 Steps',
      nutrition: '94%',
      status: 'Optimal Health',
      statusColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
    },
    Milo: {
      type: 'Tabby Cat',
      heartRate: '120 BPM',
      activity: '4,120 Steps',
      nutrition: '91%',
      status: 'Active & Healthy',
      statusColor: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
    },
  };

  const current = petData[selectedPet];

  return (
    <div className="w-full h-full bg-[#141414] border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col justify-between gap-4 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-rose-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-mono font-bold text-white">Pet Health Diagnostics</span>
        </div>

        {/* Pet Switcher */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
          {(['Max', 'Milo'] as const).map((pet) => (
            <button
              key={pet}
              onClick={() => setSelectedPet(pet)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedPet === pet ? 'bg-rose-500 text-white font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              {pet}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Pet Card */}
      <div className="bg-black/60 p-4 rounded-xl border border-white/10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-white text-base">{selectedPet}</h4>
            <span className="text-xs text-white/50">{current.type}</span>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-mono border font-semibold ${current.statusColor}`}>
            {current.status}
          </span>
        </div>

        {/* Vital Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 font-mono mt-1">
          <div className="bg-white/5 p-2 rounded-lg border border-white/5">
            <span className="text-[10px] text-white/50 block">HEART RATE</span>
            <span className="text-xs font-bold text-rose-300">{current.heartRate}</span>
          </div>
          <div className="bg-white/5 p-2 rounded-lg border border-white/5">
            <span className="text-[10px] text-white/50 block">ACTIVITY</span>
            <span className="text-xs font-bold text-amber-300">{current.activity}</span>
          </div>
          <div className="bg-white/5 p-2 rounded-lg border border-white/5">
            <span className="text-[10px] text-white/50 block">NUTRITION</span>
            <span className="text-xs font-bold text-emerald-300">{current.nutrition}</span>
          </div>
        </div>
      </div>

      {/* AI Diagnostic Insight Box */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-purple-900/30 border border-purple-500/30 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold text-purple-200">AI Health Assessment</span>
          <p className="text-[11px] text-purple-100/70 leading-normal">
            All vital telemetry metrics match healthy breed targets. Next scheduled veterinary routine checkup in 14 days.
          </p>
        </div>
      </div>

      {/* Footer Specs */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10 font-mono text-center">
        <div className="bg-white/5 p-2 rounded-lg">
          <div className="text-[10px] text-white/50">UI LAYOUT</div>
          <div className="text-xs font-bold text-white">Fluid Mobile First</div>
        </div>
        <div className="bg-white/5 p-2 rounded-lg">
          <div className="text-[10px] text-white/50">TECH STACK</div>
          <div className="text-xs font-bold text-amber-400">HTML5 + CSS3 + JS</div>
        </div>
      </div>
    </div>
  );
};

// --- Single Project Card Component ---
interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  range: [number, number];
  onOpenModal: (project: ProjectItem) => void;
  isLight: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  progress,
  range,
  onOpenModal,
  isLight,
}) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="sticky top-24 md:top-32 w-full flex items-start justify-center"
      style={{
        marginTop: index === 0 ? '0px' : '36px',
        paddingTop: `${index * 20}px`,
      }}
    >
      <motion.div
        style={{ scale }}
        className={`w-full max-w-6xl rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col justify-between gap-8 group transition-colors duration-300 ${
          isLight
            ? 'bg-white border-2 border-slate-300 text-slate-900 shadow-slate-300/80'
            : 'bg-[#0C0C0C] border-2 border-[#D7E2EA]/80 text-[#D7E2EA]'
        }`}
      >
        {/* Main Content Grid: Left Info & Right Interactive Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Project Overview */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              {/* Header Row: Number & Category */}
              <div className={`flex items-center justify-between gap-4 pb-4 border-b ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}>
                <span
                  className={`font-black leading-none font-mono ${
                    isLight ? 'text-purple-950' : 'text-white/90'
                  }`}
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                >
                  {project.number}
                </span>

                <span className={`uppercase font-semibold tracking-widest text-xs px-3.5 py-1.5 rounded-full ${
                  isLight
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                    : 'border border-emerald-400/40 text-emerald-400 bg-emerald-400/10'
                }`}>
                  {project.category}
                </span>
              </div>

              {/* Title (Clickable) */}
              <div
                onClick={() => onOpenModal(project)}
                className="cursor-pointer group/title"
              >
                <h3 className={`font-extrabold uppercase text-2xl sm:text-3xl md:text-4xl tracking-tight leading-snug transition-colors flex items-center justify-between gap-2 ${
                  isLight ? 'text-slate-900 group-hover/title:text-purple-700' : 'text-white group-hover/title:text-emerald-300'
                }`}>
                  <span>{project.title}</span>
                  <Maximize2 className={`w-5 h-5 opacity-0 group-hover/title:opacity-100 transition-opacity shrink-0 ${
                    isLight ? 'text-purple-600' : 'text-emerald-400/70'
                  }`} />
                </h3>
              </div>

              {/* Description */}
              <p className={`text-sm sm:text-base font-light leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-[#D7E2EA]/85'
              }`}>
                {project.description}
              </p>
            </div>

            {/* Bottom Stack & Links */}
            <div className="flex flex-col gap-5 pt-2">
              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-full text-xs text-white font-mono font-medium shadow-md outline outline-2 outline-white -outline-offset-[3px]"
                    style={{
                      background:
                        'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow:
                        '0px 4px 8px rgba(181, 1, 167, 0.3), inset 2px 2px 8px #7721B1',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenModal(project)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer ${
                    isLight
                      ? 'bg-purple-100 hover:bg-purple-200 border border-purple-300 text-purple-900'
                      : 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/60 text-emerald-300 hover:text-white'
                  }`}
                >
                  <Maximize2 className="w-4 h-4 text-purple-600" />
                  <span>View Details</span>
                </button>

                {project.npmPackage && (
                  <a
                    href={project.npmPackage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-300 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-rose-500/20"
                  >
                    <Package className="w-4 h-4 text-rose-400" />
                    <span>NPM Package</span>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800'
                        : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white/90'
                    }`}
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Custom Interactive Widget */}
          <div className="lg:col-span-6 flex items-stretch">
            {project.id === 'react-status-kit' && <StatusKitWidget />}
            {project.id === 'community-resource-platform' && <CommunityResourceWidget />}
            {project.id === 'ai-petcare' && <PetCareWidget />}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const renderWidget = (projectId: string) => {
    if (projectId === 'react-status-kit') return <StatusKitWidget />;
    if (projectId === 'community-resource-platform') return <CommunityResourceWidget />;
    if (projectId === 'ai-petcare') return <PetCareWidget />;
    return null;
  };

  return (
    <motion.section
      id="projects"
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative z-10 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32 sm:pb-40 select-none transition-colors duration-300 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#0C0C0C] text-[#D7E2EA]'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading: Projects */}
        <FadeIn delay={0} y={40}>
          <div className="flex flex-col items-center text-center mb-16 sm:mb-20 md:mb-24">
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              Projects
            </h2>
            <p className={`text-sm sm:text-base font-mono max-w-xl mt-4 ${
              isLight ? 'text-purple-900 font-semibold' : 'text-emerald-400/90'
            }`}>
              Interactive technical showcases of open-source packages, MERN full-stack systems, and web interfaces. Click any project to open detailed case studies.
            </p>
          </div>
        </FadeIn>

        {/* Cards Stacking Container */}
        <div className="relative flex flex-col gap-12 sm:gap-16 pb-20">
          {projectsData.map((project, i) => {
            const targetScaleRange: [number, number] = [
              i / projectsData.length,
              1,
            ];

            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                totalCards={projectsData.length}
                progress={scrollYProgress}
                range={targetScaleRange}
                onOpenModal={(p) => setSelectedProject(p)}
                isLight={isLight}
              />
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        renderWidget={renderWidget}
      />
    </motion.section>
  );
};
