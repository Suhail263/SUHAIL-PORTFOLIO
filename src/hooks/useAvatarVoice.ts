import { useCallback, useEffect, useRef, useState } from 'react';

// This hook is the single point of contact between the UI and "voice".
// Today it's backed by the free Web Speech API. To upgrade to ElevenLabs,
// Azure, or OpenAI TTS later, only the internals of `speak()` need to change —
// every component using this hook (AvatarPanel, Waveform, Captions) stays the same.

export interface AvatarVoiceState {
  isSpeaking: boolean;
  isMuted: boolean;
  isSupported: boolean;
  currentCaption: string;
  speak: (text: string) => void;
  stop: () => void;
  toggleMute: () => void;
}

export function useAvatarVoice(): AvatarVoiceState {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentCaption, setCurrentCaption] = useState('');
  const isMutedRef = useRef(isMuted);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (isMuted && isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isMuted, isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentCaption('');
  }, [isSupported]);

  const speak = useCallback(
    (text: string) => {
      setCurrentCaption(text);

      if (!isSupported || isMutedRef.current) {
        // Still "speak" visually via captions even if voice is off/unsupported
        setIsSpeaking(true);
        const estimatedMs = Math.min(Math.max(text.length * 40, 1200), 9000);
        window.setTimeout(() => setIsSpeaking(false), estimatedMs);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find((v) => /en-(US|GB|IN)/i.test(v.lang) && /male/i.test(v.name))
        || voices.find((v) => /en-(US|GB|IN)/i.test(v.lang));
      if (preferred) utterance.voice = preferred;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported],
  );

  useEffect(() => stop, [stop]);

  return {
    isSpeaking,
    isMuted,
    isSupported,
    currentCaption,
    speak,
    stop,
    toggleMute: () => setIsMuted((m) => !m),
  };
}
