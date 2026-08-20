import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

const Games = () => {
  const { t } = useLanguage();
  const { musicOn, sfxOn, toggleMusic, toggleSfx } = useSound();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [active, setActive] = useState('conway');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContentRef = useRef(null);
  const [modalScale, setModalScale] = useState(1);
  const [modalSize, setModalSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setMusicTempo(GAME_TEMPO[active] || 0);
  }, [active]);

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

  if (!isDesktop) return null;

  const ActiveComponent = GAMES.find((g) => g.id === active).Component;

  const renderLayout = (withExpand) => (
    <div className="flex items-start justify-center gap-6">
      <div className="flex flex-col gap-2 shrink-0">
        {GAMES.map((game) => {
          const isActive = game.id === active;
          return (
            <div key={game.id} className="relative group">
              <button
                onClick={() => setActive(game.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${isActive
                    ? 'bg-portfolio-1 text-white border-portfolio-1 shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-portfolio-1 dark:hover:border-portfolio-1'
                  }`}
              >
                {t(`games.${game.id}`)}
                <span className="text-sm leading-none">{game.icon}</span>
              </button>
              <div className="pointer-events-none absolute left-full top-1/2 transform -translate-y-1/2 ml-2 w-44 px-2 py-1.5 rounded bg-gray-900 text-white text-[10px] leading-snug shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 dark:bg-gray-700">
                {t(`games.desc.${game.id}`)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-1 flex justify-center">
        <ActiveComponent />
      </div>

      <div className="flex flex-col gap-2 shrink-0">
        <button
          onClick={toggleMusic}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${musicOn
              ? 'bg-portfolio-1 text-white border-portfolio-1 shadow-md'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700'
            }`}
        >
          <span className="text-sm leading-none">{musicOn ? '🎵' : '🔇'}</span>
          {t('games.music')}
        </button>
        <button
          onClick={toggleSfx}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${sfxOn
              ? 'bg-portfolio-1 text-white border-portfolio-1 shadow-md'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700'
            }`}
        >
          <span className="text-sm leading-none">{sfxOn ? '🔊' : '🔇'}</span>
          {t('games.sfx')}
        </button>

        {withExpand && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 mt-2 rounded-lg text-xs font-medium transition-all duration-200 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-portfolio-1 dark:hover:border-portfolio-1"
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
      {!isModalOpen && <div className="mt-8">{renderLayout(true)}</div>}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-gray-100 dark:bg-gray-800 rounded-2xl p-10 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Close"
            >
              ✕
            </button>
            <div
              style={{
                width: modalSize.width * modalScale,
                height: modalSize.height * modalScale,
              }}
            >
              <div
                ref={modalContentRef}
                style={{
                  width: 'max-content',
                  transform: `scale(${modalScale})`,
                  transformOrigin: 'top left',
                }}
              >
                {renderLayout(false)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Games;
