import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX, Pause, Play, MessageCircle, X } from 'lucide-react';
import { AvatarFace } from './AvatarFace';
import { Waveform } from './Waveform';
import { Captions } from './Captions';
import { ChatInput } from './ChatInput';
import { useAvatarVoice } from '@/hooks/useAvatarVoice';
import { getAvatarResponse, quickPrompts, type AvatarAction } from '@/lib/avatarResponses';
import { profile } from '@/data/resume';

interface HistoryEntry {
  role: 'user' | 'avatar';
  text: string;
}

const GREETING = `Hi, I'm here to introduce ${profile.name.split(' ')[0]}. Ask me anything, or tap a suggestion below.`;

export function AvatarPanel() {
  const [expanded, setExpanded] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [paused, setPaused] = useState(false);
  const { isSpeaking, isMuted, isSupported, currentCaption, speak, stop, toggleMute } = useAvatarVoice();
  const historyEndRef = useRef<HTMLDivElement>(null);
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
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-3xl w-[min(92vw,380px)] flex flex-col overflow-hidden shadow-2xl"
            style={{ maxHeight: '70vh' }}
            role="dialog"
            aria-label="AI avatar assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: 'var(--glass-border)' }}>
              <AvatarFace isSpeaking={isSpeaking} size={44} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{profile.name}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {isSpeaking ? 'Speaking…' : 'AI Guide'}
                </p>
              </div>
              <button
                onClick={handlePauseToggle}
                aria-label={paused ? 'Resume voice' : 'Pause voice'}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5"
              >
                {paused ? <Play size={15} /> : <Pause size={15} />}
              </button>
              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5"
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <button
                onClick={() => setExpanded(false)}
                aria-label="Close avatar panel"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5"
              >
                <X size={15} />
              </button>
            </div>

            {/* Waveform + captions */}
            <div className="px-4 pt-3">
              <Waveform active={isSpeaking} />
              <div className="min-h-[2.5rem] pb-1">
                <Captions text={currentCaption} />
              </div>
            </div>

            {/* Conversation history */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3" style={{ minHeight: 120 }}>
              {history.map((entry, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] text-sm rounded-2xl px-3.5 py-2 leading-relaxed ${
                    entry.role === 'user' ? 'ml-auto' : ''
                  }`}
                  style={{
                    background: entry.role === 'user' ? 'var(--color-accent-soft)' : 'var(--glass-fill-strong)',
                    color: 'var(--color-text)',
                  }}
                >
                  {entry.text}
                </div>
              ))}
              <div ref={historyEndRef} />
            </div>

            {/* Quick prompts */}
            <div className="px-4 pb-3 flex flex-wrap gap-2">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => ask(p)}
                  className="text-xs px-3 py-1.5 rounded-full glass hover:border-white/20 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 pt-0">
              <ChatInput onSubmit={ask} />
              {!isSupported && (
                <p className="text-[11px] mt-2" style={{ color: 'var(--color-text-faint)' }}>
                  Voice isn't supported in this browser — captions will still work.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        onClick={() => setExpanded((e) => !e)}
        whileTap={{ scale: 0.95 }}
        aria-label={expanded ? 'Close avatar assistant' : 'Open avatar assistant'}
        className="glass rounded-full p-2 pr-4 flex items-center gap-3 shadow-xl"
      >
        <AvatarFace isSpeaking={isSpeaking && !expanded} size={44} />
        {!expanded && (
          <span className="text-sm font-medium flex items-center gap-1.5">
            <MessageCircle size={14} />
            Ask about me
          </span>
        )}
      </motion.button>
    </div>
  );
}
