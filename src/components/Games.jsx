import React, { useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useLanguage } from '@/context/LanguageContext';
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

const Games = () => {
  const { t } = useLanguage();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [active, setActive] = useState('conway');

  if (!isDesktop) return null;

  const ActiveComponent = GAMES.find((g) => g.id === active).Component;

  return (
    <div className="flex items-start justify-center gap-6 mt-8">
      <div className="flex flex-col gap-2 shrink-0">
        {GAMES.map((game) => {
          const isActive = game.id === active;
          return (
            <div key={game.id} className="relative group">
              <button
                onClick={() => setActive(game.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${
                  isActive
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
    </div>
  );
};

export default Games;
