import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

export type SoundEffect = 'quizStart' | 'correct' | 'wrong' | 'quizComplete';

const EFFECT_PATHS: Record<SoundEffect, string> = {
  quizStart: '/audio/quiz-start.mp3',
  correct: '/audio/correct.mp3',
  wrong: '/audio/wrong.mp3',
  quizComplete: '/audio/quiz-complete.mp3',
};
const MUSIC_PATH = '/audio/quiz-background.mp3';
const EFFECTS_KEY = 'learn-smart-sound-effects';
const MUSIC_KEY = 'learn-smart-background-music';

interface AudioContextValue {
  soundEffectsEnabled: boolean;
  backgroundMusicEnabled: boolean;
  setSoundEffectsEnabled: (enabled: boolean) => void;
  setBackgroundMusicEnabled: (enabled: boolean) => void;
  playSoundEffect: (effect: SoundEffect) => void;
}

const AudioSettingsContext = createContext<AudioContextValue | null>(null);

function readPreference(key: string, fallback: boolean): boolean {
  try {
    const value = localStorage.getItem(key);
    return value === 'true' ? true : value === 'false' ? false : fallback;
  } catch {
    return fallback;
  }
}

function savePreference(key: string, value: boolean) {
  try { localStorage.setItem(key, String(value)); } catch { /* storage may be unavailable */ }
}

function attemptPlayback(audio: HTMLAudioElement) {
  try {
    void audio.play().catch(() => { /* Autoplay or device playback may be unavailable. */ });
  } catch {
    // Playback should never interrupt the quiz interaction.
  }
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [soundEffectsEnabled, setSoundEffectsState] = useState(() => readPreference(EFFECTS_KEY, true));
  const [backgroundMusicEnabled, setBackgroundMusicState] = useState(() => readPreference(MUSIC_KEY, false));
  const effectAudio = useRef<Partial<Record<SoundEffect, HTMLAudioElement>>>({});
  const musicAudio = useRef<HTMLAudioElement | null>(null);
  const musicEnabledRef = useRef(backgroundMusicEnabled);
  const musicPlayPending = useRef(false);

  const stopMusic = useCallback(() => {
    const audio = musicAudio.current;
    if (!audio) return;
    musicPlayPending.current = false;
    audio.pause();
    audio.currentTime = 0;
  }, []);

  const startMusic = useCallback(() => {
    if (!musicEnabledRef.current) return;
    let audio = musicAudio.current;
    if (!audio) {
      audio = new Audio(MUSIC_PATH);
      audio.loop = true;
      audio.volume = 0.2;
      audio.preload = 'none';
      musicAudio.current = audio;
    }
    if (!audio.paused || musicPlayPending.current) return;

    try {
      musicPlayPending.current = true;
      void audio.play().then(() => {
        musicPlayPending.current = false;
        if (!musicEnabledRef.current) stopMusic();
      }, () => {
        musicPlayPending.current = false;
      });
    } catch {
      musicPlayPending.current = false;
    }
  }, [stopMusic]);

  const setSoundEffectsEnabled = useCallback((enabled: boolean) => {
    setSoundEffectsState(enabled);
    savePreference(EFFECTS_KEY, enabled);
  }, []);

  const setBackgroundMusicEnabled = useCallback((enabled: boolean) => {
    musicEnabledRef.current = enabled;
    setBackgroundMusicState(enabled);
    savePreference(MUSIC_KEY, enabled);
    if (!enabled) stopMusic();
    else startMusic();
  }, [startMusic, stopMusic]);

  const playSoundEffect = useCallback((effect: SoundEffect) => {
    if (!soundEffectsEnabled) return;
    let audio = effectAudio.current[effect];
    if (!audio) {
      audio = new Audio(EFFECT_PATHS[effect]);
      audio.volume = 0.65;
      audio.preload = 'auto';
      effectAudio.current[effect] = audio;
    }
    try {
      audio.currentTime = 0;
    } catch {
      // A sound that is still loading can safely play from its current position.
    }
    attemptPlayback(audio);
  }, [soundEffectsEnabled]);

  useEffect(() => {
    musicEnabledRef.current = backgroundMusicEnabled;
    if (backgroundMusicEnabled) startMusic();
    else stopMusic();
  }, [backgroundMusicEnabled, startMusic, stopMusic]);

  useEffect(() => {
    const retryMusicAfterInteraction = () => {
      if (musicEnabledRef.current) startMusic();
    };
    window.addEventListener('pointerdown', retryMusicAfterInteraction);
    window.addEventListener('keydown', retryMusicAfterInteraction);
    window.addEventListener('touchstart', retryMusicAfterInteraction);

    return () => {
      window.removeEventListener('pointerdown', retryMusicAfterInteraction);
      window.removeEventListener('keydown', retryMusicAfterInteraction);
      window.removeEventListener('touchstart', retryMusicAfterInteraction);
      stopMusic();
      const music = musicAudio.current;
      if (music) {
        music.removeAttribute('src');
        music.load();
        musicAudio.current = null;
      }
      Object.values(effectAudio.current).forEach(audio => {
        audio?.pause();
        audio?.removeAttribute('src');
        audio?.load();
      });
      effectAudio.current = {};
    };
  }, [startMusic, stopMusic]);

  const value = useMemo(() => ({
    soundEffectsEnabled,
    backgroundMusicEnabled,
    setSoundEffectsEnabled,
    setBackgroundMusicEnabled,
    playSoundEffect,
  }), [soundEffectsEnabled, backgroundMusicEnabled, setSoundEffectsEnabled, setBackgroundMusicEnabled, playSoundEffect]);

  return <AudioSettingsContext.Provider value={value}>{children}</AudioSettingsContext.Provider>;
}

export function useAudioSettings() {
  const context = useContext(AudioSettingsContext);
  if (!context) throw new Error('useAudioSettings must be used within AudioProvider');
  return context;
}
