import React, { createContext, useContext, useState } from 'react';
import { setMusicEnabled, setSfxEnabled } from '@/audio/engine';

const SoundContext = createContext();

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

export const SoundProvider = ({ children }) => {
  const [musicOn, setMusicOn] = useState(false);
  const [sfxOn, setSfxOn] = useState(true);

  const toggleMusic = () => {
    const next = !musicOn;
    setMusicOn(next);
    setMusicEnabled(next);
  };

  const toggleSfx = () => {
    const next = !sfxOn;
    setSfxOn(next);
    setSfxEnabled(next);
  };

  const value = { musicOn, sfxOn, toggleMusic, toggleSfx };

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
};
