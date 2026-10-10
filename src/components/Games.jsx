import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useLanguage } from '@/context/LanguageContext';
import { useSound } from '@/context/SoundContext';
import { setMusicTempo } from '@/audio/engine';
import GameOfLife from '@/components/GameOfLife';
import SnakeGame from '@/components/SnakeGame';
import PacManGame from '@/components/PacManGame';
import MinesweeperGame from '@/components/MinesweeperGame';
import LightsOutGame from '@/components/LightsOutGame';
import TetrisGame from '@/components/TetrisGame';

const GAMES = [
  { id: 'conway', icon: '🧬', Component: GameOfLife },
  { id: 'snake', icon: '🐍', Component: SnakeGame },
  { id: 'pacman', icon: '👾', Component: PacManGame },
  { id: 'minesweeper', icon: '💣', Component: MinesweeperGame },
  { id: 'lightsOut', icon: '💡', Component: LightsOutGame },
  { id: 'tetris', icon: '🕹️', Component: TetrisGame },
];

// Game tick (ms) used to sync the music beat (0 = no continuous tick).
const GAME_TEMPO = {
  conway: 0,
  snake: 160,
  pacman: 220,
  minesweeper: 0,
  lightsOut: 0,
  tetris: 160,
};

// Touch controls each game needs on mobile (null = tap only).
const TOUCH_CONTROLS = {
  conway: null,
  snake: 'dpad',
  pacman: 'dpad',
  minesweeper: 'flag',
  lightsOut: null,
  tetris: 'dpad-actions',
};

const PAD_ICONS = {
  up: '↑',
  down: '↓',
  left: '←',
  right: '→',
  rotate: '↻',
  hardDrop: '⇓',
};

/** Touch button that fires once on press and repeats while held. */
const PadButton = ({ icon, onPress, className = '', label, disabled = false }) => {
  const delayRef = useRef(null);
  const repeatRef = useRef(null);

  const stop = useCallback(() => {
    window.clearTimeout(delayRef.current);
    window.clearInterval(repeatRef.current);
    delayRef.current = null;
    repeatRef.current = null;
  }, []);

  const start = useCallback((event) => {
    event.preventDefault();
    onPress();
    delayRef.current = window.setTimeout(() => {
      repeatRef.current = window.setInterval(onPress, 130);
    }, 300);
  }, [onPress]);

  useEffect(() => stop, [stop]);

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      onPointerDown={start}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onContextMenu={(event) => event.preventDefault()}
      className={`flex touch-none select-none items-center justify-center rounded-xl border border-light-200 bg-light-100 text-sm font-medium text-light-700 transition-colors duration-150 active:bg-portfolio-1 active:text-white disabled:opacity-40 dark:border-dark-700 dark:bg-dark-800 dark:text-dark-200 ${className}`}
    >
      {icon}
    </button>
  );
};

const Games = () => {
  const { t } = useLanguage();
  const { musicOn, sfxOn, toggleMusic, toggleSfx } = useSound();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [active, setActive] = useState('conway');
  const [isMobileModeOpen, setIsMobileModeOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasMobileSession, setHasMobileSession] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [flagMode, setFlagMode] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const gameInputRef = useRef(null);
  const rootRef = useRef(null);
  const modalContentRef = useRef(null);
  const [modalScale, setModalScale] = useState(1);
  const [modalSize, setModalSize] = useState({ width: 0, height: 0 });

  const isFullscreen = isDesktop ? isModalOpen : isMobileModeOpen;
  const isMobileLayout = isFullscreen && !isDesktop;
  const isFullscreenRef = useRef(isFullscreen);
  isFullscreenRef.current = isFullscreen;

  useEffect(() => {
    setMusicTempo(GAME_TEMPO[active] || 0);
    setFlagMode(false);
  }, [active]);

  useEffect(() => {
    if (isDesktop) return undefined;

    const syncMobileMode = () => setIsMobileModeOpen(window.location.hash === '#games');
    syncMobileMode();
    window.addEventListener('hashchange', syncMobileMode);
    return () => window.removeEventListener('hashchange', syncMobileMode);
  }, [isDesktop]);

  useEffect(() => {
    if (isMobileModeOpen) setHasMobileSession(true);
  }, [isMobileModeOpen]);

  // The game stays mounted (state kept) while switching between inline and fullscreen.
  useEffect(() => {
    if (!isFullscreen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('games-fullscreen');
    rootRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove('games-fullscreen');
    };
  }, [isFullscreen]);

  const togglePause = useCallback(() => setIsPaused((p) => !p), []);

  const restartGame = useCallback(() => {
    setIsPaused(false);
    setSessionKey((k) => k + 1);
  }, []);

  const closeFullscreen = useCallback(() => {
    if (isDesktop) {
      setIsModalOpen(false);
      return;
    }
    setIsMobileModeOpen(false);
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  }, [isDesktop]);

  // Shortcuts only fire while the games area is hovered, focused or fullscreen,
  // so typing anywhere else on the page is never hijacked.
  useEffect(() => {
    const handler = (event) => {
      const root = rootRef.current;
      const active = document.activeElement;
      const interactive =
        isFullscreenRef.current ||
        (root && (root.matches(':hover') || (active && root.contains(active))));
      if (!interactive) return;
      if (event.key === 'p' || event.key === 'P') {
        event.preventDefault();
        togglePause();
      } else if (event.key === 'r' || event.key === 'R') {
        event.preventDefault();
        restartGame();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [restartGame, togglePause]);

  useLayoutEffect(() => {
    if (!isModalOpen) return;
    const el = modalContentRef.current;
    if (!el) return;

    const measure = () => {
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      if (!width || !height) return;
      const availW = window.innerWidth - 120;
      const availH = window.innerHeight - 120;
      const scale = Math.min(1.5, availW / width, availH / height);
      setModalScale(Math.max(0.3, scale));
      setModalSize({ width, height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isModalOpen]);

  const ActiveComponent = GAMES.find((g) => g.id === active).Component;
  const shouldRender = isDesktop || hasMobileSession;
  const scaling = isFullscreen && isDesktop;
  const touchLayout = TOUCH_CONTROLS[active] ?? null;
  const sendInput = useCallback((event) => {
    gameInputRef.current?.(event);
  }, []);
  const layoutClass = isMobileLayout
    ? 'flex flex-1 flex-col gap-3'
    : 'flex items-start justify-center gap-6';
  const selectorClass = isMobileLayout
    ? 'flex flex-wrap gap-2 shrink-0'
    : 'flex flex-col gap-2 shrink-0';
  const frameClass = isMobileLayout
    ? 'flex flex-1 items-start justify-center overflow-auto'
    : 'flex-1 flex justify-center';
  const controlsClass = isMobileLayout
    ? 'flex flex-row flex-wrap justify-center gap-2 shrink-0'
    : 'flex flex-col gap-2 shrink-0';

  if (!shouldRender) return null;

  const renderLayout = () => (
    <div className={layoutClass}>
      <div className={selectorClass}>
        {GAMES.map((game) => {
          const isActive = game.id === active;
          return (
            <div key={game.id} className="relative group">
              <button
                onClick={() => {
                  setIsPaused(false);
                  setActive(game.id);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${isActive
                    ? 'bg-portfolio-1 text-white border-portfolio-1 shadow-md'
                    : 'bg-light-100 dark:bg-dark-800 text-light-700 dark:text-dark-300 border-light-200 dark:border-dark-700 hover:border-portfolio-1 dark:hover:border-portfolio-1'
                  }`}
              >
                {t(`games.${game.id}`)}
                <span className="text-sm leading-none">{game.icon}</span>
              </button>
              {!isMobileLayout && (
                <div className="pointer-events-none absolute left-full top-1/2 transform -translate-y-1/2 ml-2 w-44 px-2 py-1.5 rounded bg-light-900 text-white text-[10px] leading-snug shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 dark:bg-dark-700">
                  {t(`games.desc.${game.id}`)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={frameClass}>
        <div
          style={scaling
            ? { width: modalSize.width * modalScale, height: modalSize.height * modalScale }
            : undefined}
        >
          <div
            ref={modalContentRef}
            className="relative"
            style={scaling
              ? { width: 'max-content', transform: `scale(${modalScale})`, transformOrigin: 'top left' }
              : undefined}
          >
            <div key={sessionKey}>
              <ActiveComponent
                paused={isPaused}
                onTogglePause={togglePause}
                allowMobile={!isDesktop}
                touch={isMobileLayout}
                flagMode={flagMode}
                inputRef={gameInputRef}
              />
            </div>
            {isPaused && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-white/70 dark:bg-dark-900/70">
                <span className="rounded-full bg-light-900 px-3 py-1 text-[10px] font-medium text-white dark:bg-dark-700">
                  ⏸ {t('games.paused')} · P
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileLayout && touchLayout === 'dpad' && (
        <div className="flex shrink-0 justify-center">
          <div className="grid grid-cols-3 grid-rows-3 gap-1.5">
            <span />
            <PadButton icon={PAD_ICONS.up} label="Up" className="h-12 w-12" onPress={() => sendInput({ dir: 'up' })} />
            <span />
            <PadButton icon={PAD_ICONS.left} label="Left" className="h-12 w-12" onPress={() => sendInput({ dir: 'left' })} />
            <span />
            <PadButton icon={PAD_ICONS.right} label="Right" className="h-12 w-12" onPress={() => sendInput({ dir: 'right' })} />
            <span />
            <PadButton icon={PAD_ICONS.down} label="Down" className="h-12 w-12" onPress={() => sendInput({ dir: 'down' })} />
            <span />
          </div>
        </div>
      )}

      {isMobileLayout && touchLayout === 'dpad-actions' && (
        <div className="flex shrink-0 items-center justify-center gap-4">
          <div className="grid grid-cols-3 grid-rows-3 gap-1.5">
            <span />
            <PadButton icon={PAD_ICONS.rotate} label="Rotate" className="h-12 w-12" onPress={() => sendInput({ action: 'rotate' })} />
            <span />
            <PadButton icon={PAD_ICONS.left} label="Left" className="h-12 w-12" onPress={() => sendInput({ dir: 'left' })} />
            <span />
            <PadButton icon={PAD_ICONS.right} label="Right" className="h-12 w-12" onPress={() => sendInput({ dir: 'right' })} />
            <span />
            <PadButton icon={PAD_ICONS.down} label="Down" className="h-12 w-12" onPress={() => sendInput({ dir: 'down' })} />
            <span />
          </div>
          <PadButton
            icon={PAD_ICONS.hardDrop}
            label={t('games.hardDrop')}
            className="h-14 w-14"
            onPress={() => sendInput({ action: 'hardDrop' })}
          />
        </div>
      )}

      {isMobileLayout && touchLayout === 'flag' && (
        <div className="flex shrink-0 justify-center">
          <PadButton
            icon={`🚩 ${flagMode ? t('games.flagOn') : t('games.flagOff')}`}
            label={t('games.flagMode')}
            className={`h-11 px-5 text-xs ${flagMode ? 'border-portfolio-1 bg-portfolio-1 text-white' : ''}`}
            onPress={() => setFlagMode((value) => !value)}
          />
        </div>
      )}

      <div className={controlsClass}>
        <button
          onClick={toggleMusic}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${musicOn
              ? 'bg-portfolio-1 text-white border-portfolio-1 shadow-md'
              : 'bg-light-100 dark:bg-dark-800 text-light-400 dark:text-dark-500 border-light-200 dark:border-dark-700'
            }`}
        >
          <span className="text-sm leading-none">{musicOn ? '🎵' : '🔇'}</span>
          {t('games.music')}
        </button>
        <button
          onClick={toggleSfx}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${sfxOn
              ? 'bg-portfolio-1 text-white border-portfolio-1 shadow-md'
              : 'bg-light-100 dark:bg-dark-800 text-light-400 dark:text-dark-500 border-light-200 dark:border-dark-700'
            }`}
        >
          <span className="text-sm leading-none">{sfxOn ? '🔊' : '🔇'}</span>
          {t('games.sfx')}
        </button>

        <button
          onClick={togglePause}
          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${
            isPaused
              ? 'bg-portfolio-1 text-white border-portfolio-1 shadow-md'
              : 'bg-light-100 dark:bg-dark-800 text-light-700 dark:text-dark-300 border-light-200 dark:border-dark-700 hover:border-portfolio-1 dark:hover:border-portfolio-1'
          }`}
        >
          <span className="text-sm leading-none">{isPaused ? '▶' : '⏸'}</span>
          {isPaused ? t('games.resume') : t('games.pause')} (P)
        </button>
        <button
          onClick={restartGame}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border border-light-200 dark:border-dark-700 bg-light-100 dark:bg-dark-800 text-light-700 dark:text-dark-300 hover:border-portfolio-1 dark:hover:border-portfolio-1"
        >
          <span className="text-sm leading-none">⟳</span>
          {t('games.restart')} (R)
        </button>

        {!isFullscreen && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 mt-2 rounded-lg text-xs font-medium transition-all duration-200 border border-light-200 dark:border-dark-700 bg-light-100 dark:bg-dark-800 text-light-700 dark:text-dark-300 hover:border-portfolio-1 dark:hover:border-portfolio-1"
          >
            <span className="text-sm leading-none">🔍</span>
            {t('games.expand')}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        body.games-fullscreen .reveal,
        body.games-fullscreen .reveal-visible,
        body.games-fullscreen .reveal-done {
          transform: none !important;
          filter: none !important;
          animation: none !important;
        }
        /* Mobile sections opt into content-visibility, which makes them
           containing blocks and would trap the fixed overlay inside them.
           The same section is raised above the fixed navbar while open. */
        body.games-fullscreen #education {
          content-visibility: visible !important;
          z-index: 60 !important;
        }
      `}</style>
      <div
        ref={rootRef}
        tabIndex={0}
        className={`outline-none ${
          isFullscreen
            ? 'fixed inset-0 z-[10000] flex flex-col overflow-auto bg-light-100 p-4 dark:bg-dark-900'
            : isDesktop
              ? 'mt-8'
              : 'hidden'
        }`}
      >
        <div className={isFullscreen ? 'mb-3 flex items-center justify-between gap-3' : 'hidden'}>
          <span className="text-sm font-bold text-light-900 dark:text-white">
            🕹️ {t('nav.games')}
          </span>
          <button
            type="button"
            onClick={closeFullscreen}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-light-200 text-light-700 transition-colors duration-200 hover:bg-light-300 dark:bg-dark-700 dark:text-dark-200 dark:hover:bg-dark-600"
            aria-label={t('games.close')}
          >
            ✕
          </button>
        </div>

        {renderLayout()}
      </div>
    </>
  );
};

export default Games;
