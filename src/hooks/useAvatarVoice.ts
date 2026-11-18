import { useCallback, useEffect, useRef, useState } from 'react';

export interface AvatarVoiceState {
  isSpeaking: boolean;
  isMuted: boolean;
  isSupported: boolean;
  currentCaption: string;
  speak: (text: string) => void;
  stop: () => void;
  toggleMute: () => void;
}

/**
 * Intelligent neural voice selector designed to find the warmest,
 * most natural, human-like voice available on the user's platform
 * (matching ChatGPT-style natural conversational quality).
 */
function pickBestHumanVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  // Filter out novelty, mechanical, or distorted sound-effect voices
  const noveltyFilter = /albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|junior|organ|superstar|trinoids|whisper|zarvox|wobble|ralph/i;
  const validVoices = voices.filter((v) => !noveltyFilter.test(v.name));

  const englishVoices = validVoices.filter((v) => /^en[-_]/i.test(v.lang));
  const pool = englishVoices.length > 0 ? englishVoices : validVoices;

  // 1. Natural / Neural voices (Edge / Windows / Chrome Natural)
  // e.g. "Microsoft Christopher Online (Natural)", "Microsoft Guy Online (Natural)"
  const naturalMale = pool.find(
    (v) => /natural/i.test(v.name) && (/christopher|guy|ryan|andrew|eric/i.test(v.name) || /male/i.test(v.name))
  );
  if (naturalMale) return naturalMale;

  const anyNatural = pool.find((v) => /natural/i.test(v.name));
  if (anyNatural) return anyNatural;

  // 2. High-fidelity Google voices (Chrome / Android)
  const googleUKMale = pool.find((v) => /google/i.test(v.name) && /uk.*male/i.test(v.name));
  if (googleUKMale) return googleUKMale;

  const googleUS = pool.find((v) => /google.*us.*english/i.test(v.name));
  if (googleUS) return googleUS;

  const anyGoogle = pool.find((v) => /google/i.test(v.name));
  if (anyGoogle) return anyGoogle;

  // 3. Apple Enhanced / Premium neural voices (macOS / iOS Siri & Enhanced)
  const appleEnhancedMale = pool.find(
    (v) => /(enhanced|premium)/i.test(v.name) && (/daniel|evan|nathan|oliver|tom|alex|rishi/i.test(v.name) || !/female/i.test(v.name))
  );
  if (appleEnhancedMale) return appleEnhancedMale;

  const anyEnhanced = pool.find((v) => /(enhanced|premium)/i.test(v.name));
  if (anyEnhanced) return anyEnhanced;

  // 4. Standard high-quality conversational system voices
  // Daniel (en-GB) is world-renowned as a calm, human-sounding AI voice
  const daniel = pool.find((v) => /^daniel\b/i.test(v.name));
  if (daniel) return daniel;

  // Alex (en-US) features natural breathing and human pitch contours on macOS
  const alex = pool.find((v) => /^alex\b/i.test(v.name));
  if (alex) return alex;

  const rishi = pool.find((v) => /^rishi\b/i.test(v.name));
  if (rishi) return rishi;

  const samantha = pool.find((v) => /^samantha\b/i.test(v.name));
  if (samantha) return samantha;

  // 5. Any English voice that isn't a novelty sound
  const fallbackEnglish = pool.find((v) => /^en[-_](US|GB|IN|CA|AU)/i.test(v.lang));
  if (fallbackEnglish) return fallbackEnglish;

  return pool[0] || null;
}

export function useAvatarVoice(): AvatarVoiceState {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentCaption, setCurrentCaption] = useState('');
  const isMutedRef = useRef(isMuted);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const keepAliveTimerRef = useRef<number | null>(null);
  const availableVoicesRef = useRef<SpeechSynthesisVoice[]>([]);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Load and cache voices as soon as the speech synthesis engine is ready
  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        availableVoicesRef.current = v;
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [isSupported]);

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (isMuted && isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isMuted, isSupported]);

  const clearKeepAlive = () => {
    if (keepAliveTimerRef.current !== null) {
      window.clearInterval(keepAliveTimerRef.current);
      keepAliveTimerRef.current = null;
    }
  };

  const stop = useCallback(() => {
    if (!isSupported) return;
    clearKeepAlive();
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentCaption('');
  }, [isSupported]);

  const speak = useCallback(
    (text: string) => {
      setCurrentCaption(text);

      if (!isSupported || isMutedRef.current) {
        setIsSpeaking(true);
        const estimatedMs = Math.min(Math.max(text.length * 45, 1400), 9000);
        window.setTimeout(() => setIsSpeaking(false), estimatedMs);
        return;
      }

      window.speechSynthesis.cancel();
      clearKeepAlive();

      const utterance = new SpeechSynthesisUtterance(text);

      // Human-like acoustics (measured, warm, calm conversational pacing)
      utterance.rate = 0.98;
      utterance.pitch = 0.98;
      utterance.volume = 1.0;

      // Ensure voices are fetched
      let voices = availableVoicesRef.current;
      if (voices.length === 0) {
        voices = window.speechSynthesis.getVoices();
        availableVoicesRef.current = voices;
      }

      const bestVoice = pickBestHumanVoice(voices);
      if (bestVoice) {
        utterance.voice = bestVoice;
        utterance.lang = bestVoice.lang;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);

        // Keep-alive timer for Chromium browsers to prevent utterance timing out
        clearKeepAlive();
        keepAliveTimerRef.current = window.setInterval(() => {
          if (!window.speechSynthesis.speaking) {
            clearKeepAlive();
            return;
          }
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }, 10000);
      };

      utterance.onend = () => {
        clearKeepAlive();
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        clearKeepAlive();
        setIsSpeaking(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported],
  );

  useEffect(() => {
    return () => {
      clearKeepAlive();
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

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
