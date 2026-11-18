import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX, Pause, Play, MessageCircle, X, Sparkles } from 'lucide-react';
import { AvatarFace } from './AvatarFace';
import { Waveform } from './Waveform';
import { ChatInput } from './ChatInput';
import { useAvatarVoice } from '@/hooks/useAvatarVoice';
import { scrollToTarget } from '@/hooks/useLenis';
import { getAvatarResponse, quickPrompts, type AvatarAction } from '@/lib/avatarResponses';
import { profile } from '@/data/resume';

interface HistoryEntry {
  role: 'user' | 'avatar';
  text: string;
}

const GREETING = `Hi! I'm Suhail's AI guide. I'm here exclusively to answer questions about Suhail Khan, his resume, projects, skills, education, and career experience. How can I help you today?`;

export function AvatarPanel() {
  const [expanded, setExpanded] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [paused, setPaused] = useState(false);
  const { isSpeaking, isMuted, isSupported, speak, stop, toggleMute } = useAvatarVoice();
  const historyEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expanded]);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    if (expanded && !hasGreeted) {
      setHasGreeted(true);
      setHistory([{ role: 'avatar', text: GREETING }]);
      speak(GREETING);
    }
  }, [expanded, hasGreeted, speak]);

  const runAction = (action?: AvatarAction) => {
    if (!action) return;
    if (action.type === 'navigate') {
      if (action.target.startsWith('#')) {
        const id = action.target.replace('#', '');
        if (location.pathname !== '/') {
          navigate('/');
          window.setTimeout(() => {
            scrollToTarget('#' + id);
          }, 100);
        } else {
          scrollToTarget('#' + id);
        }
      } else {
        navigate(action.target);
      }
    }
    if (action.type === 'download') {
      const link = document.createElement('a');
      link.href = action.target;
      link.download = '';
      link.click();
    }
  };

  const ask = (question: string) => {
    setHistory((h) => [...h, { role: 'user', text: question }]);
    const response = getAvatarResponse(question);
    setHistory((h) => [...h, { role: 'avatar', text: response.text }]);
    if (!paused) speak(response.text);
    runAction(response.action);
  };

  const handlePauseToggle = () => {
    if (isSpeaking) {
      stop();
    }
    setPaused((p) => !p);
  };

  return (
    <div
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0b0f19] border border-white/15 rounded-3xl w-[min(94vw,395px)] h-[530px] max-h-[82vh] flex flex-col overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.85)] z-50"
            role="dialog"
            aria-label="AI avatar assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-3.5 border-b border-white/10 shrink-0 bg-[#0e1322]">
              <AvatarFace isSpeaking={isSpeaking} size={42} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold text-white truncate">{profile.name}</p>
                  <Sparkles size={13} className="text-[#5b6cff]" />
                </div>
                <p className="text-xs text-white/60">
                  {isSpeaking ? 'Speaking…' : 'AI Guide · Resume Assistant'}
                </p>
              </div>

              {/* Header Controls */}
              <button
                onClick={handlePauseToggle}
                aria-label={paused ? 'Resume voice' : 'Pause voice'}
                className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                {paused ? <Play size={15} /> : <Pause size={15} />}
              </button>
              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <button
                onClick={() => setExpanded(false)}
                aria-label="Close avatar panel"
                className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Audio Waveform bar */}
            <div className="px-4 py-2 border-b border-white/5 bg-white/[0.02] flex items-center justify-between shrink-0 h-9">
              <div className="w-24 h-4">
                <Waveform active={isSpeaking} />
              </div>
              <span className="text-[11px] text-white/50 tracking-wider uppercase font-mono">
                {isSpeaking ? 'Voice Active' : 'Ready'}
              </span>
            </div>

            {/* Conversation message stream */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {history.map((entry, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] text-[13.5px] leading-relaxed rounded-2xl px-3.5 py-2.5 ${
                    entry.role === 'user'
                      ? 'ml-auto bg-[#5b6cff] text-white rounded-tr-xs shadow-sm'
                      : 'bg-[#151c2e] border border-white/10 text-white/95 rounded-tl-xs shadow-sm'
                  }`}
                >
                  {entry.text}
                </div>
              ))}
              <div ref={historyEndRef} />
            </div>

            {/* Quick Prompts (Horizontal Single-Line Carousel) */}
            <div className="px-3 py-2 border-t border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth shrink-0 bg-[#0e1322]">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => ask(p)}
                  className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all shrink-0 cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-3 pt-2 shrink-0 bg-[#0b0f19]">
              <ChatInput onSubmit={ask} />
              {!isSupported && (
                <p className="text-[11px] mt-1.5 text-center text-white/40">
                  Voice not supported in this browser — text answers still work.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <motion.button
        onClick={() => setExpanded((e) => !e)}
        whileTap={{ scale: 0.95 }}
        aria-label={expanded ? 'Close avatar assistant' : 'Open avatar assistant'}
        className="glass rounded-full p-2 pr-4 flex items-center gap-3 shadow-2xl hover:border-white/25 transition-colors cursor-pointer"
      >
        <AvatarFace isSpeaking={isSpeaking && !expanded} size={42} />
        {!expanded && (
          <span className="text-sm font-medium flex items-center gap-1.5 text-white">
            <MessageCircle size={15} className="text-[#5b6cff]" />
            Ask about me
          </span>
        )}
      </motion.button>
    </div>
  );
}
