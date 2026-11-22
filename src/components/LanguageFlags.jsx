import React, { useId } from 'react';

/*
 * Banderas en SVG (no emoji): los emoji de bandera no se renderizan en
 * Windows/Chrome y se ven como las letras "ES", "GB", etc.
 *
 * Todas las banderas se dibujan sobre un lienzo de 3 x 2 para poder
 * combinarlas en diagonal sin reescalar cada una a mano.
 */

const CANVAS_W = 3;
const CANVAS_H = 2;

export const flagBaseClass =
  'flex-shrink-0 rounded-sm ring-1 ring-light-300 dark:ring-dark-600';

const SpainShape = () => (
  <>
    <rect width={CANVAS_W} height={CANVAS_H} fill="#AA151B" />
    <rect y="0.5" width={CANVAS_W} height="1" fill="#F1BF00" />
  </>
);

const MexicoShape = () => (
  <>
    <rect width="1" height={CANVAS_H} fill="#006847" />
    <rect x="1" width="1" height={CANVAS_H} fill="#FFFFFF" />
    <rect x="2" width="1" height={CANVAS_H} fill="#CE1126" />
  </>
);

const STRIPE_H = CANVAS_H / 13;
const US_STRIPES = Array.from({ length: 13 });
const US_STARS = Array.from({ length: 6 }, (_, i) => i);

const UnitedStatesShape = () => (
  <>
    <rect width={CANVAS_W} height={CANVAS_H} fill="#FFFFFF" />
    {US_STRIPES.map((_, i) =>
      i % 2 === 0 ? (
        <rect key={i} y={i * STRIPE_H} width={CANVAS_W} height={STRIPE_H} fill="#B22234" />
      ) : null
    )}
    <rect width="1.2" height={STRIPE_H * 7} fill="#3C3B6E" />
    {US_STARS.map((i) => (
      <circle
        key={i}
        cx={0.3 + (i % 3) * 0.3}
        cy={0.26 + Math.floor(i / 3) * 0.55}
        r="0.1"
        fill="#FFFFFF"
      />
    ))}
  </>
);

const UnitedKingdomShape = () => (
  <>
    <rect width={CANVAS_W} height={CANVAS_H} fill="#012169" />
    <path d="M0 0 3 2M3 0 0 2" stroke="#FFFFFF" strokeWidth="0.4" />
    <path d="M0 0 3 2M3 0 0 2" stroke="#C8102E" strokeWidth="0.24" />
    <path d="M1.5 0V2M0 1H3" stroke="#FFFFFF" strokeWidth="0.64" />
    <path d="M1.5 0V2M0 1H3" stroke="#C8102E" strokeWidth="0.38" />
  </>
);

const makeFlag = (Shape) =>
  function Flag({ className = '', ...props }) {
    return (
      <svg
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        className={`${flagBaseClass} ${className}`}
        aria-hidden="true"
        {...props}
      >
        <Shape />
      </svg>
    );
  };

export const FlagSpain = makeFlag(SpainShape);
export const FlagMexico = makeFlag(MexicoShape);
export const FlagUnitedStates = makeFlag(UnitedStatesShape);
export const FlagUnitedKingdom = makeFlag(UnitedKingdomShape);

// Corte diagonal: arriba empieza más a la derecha que abajo.
const SPLIT_TOP = 1.85;
const SPLIT_BOTTOM = 1.15;

const DiagonalFlag = ({ left: Left, right: Right, className = '' }) => {
  const id = useId().replace(/:/g, '');
  const leftClip = `${id}-left`;
  const rightClip = `${id}-right`;

  return (
    <svg
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      className={`${flagBaseClass} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={leftClip}>
          <path d={`M0 0H${SPLIT_TOP}L${SPLIT_BOTTOM} 2H0Z`} />
        </clipPath>
        <clipPath id={rightClip}>
          <path d={`M${SPLIT_TOP} 0H${CANVAS_W}V2H${SPLIT_BOTTOM}Z`} />
        </clipPath>
      </defs>

      {/* Cada mitad muestra la bandera completa, comprimida a su trapecio. */}
      <g clipPath={`url(#${leftClip})`}>
        <svg width={SPLIT_TOP} height={CANVAS_H} viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`} preserveAspectRatio="none">
          <Left />
        </svg>
      </g>
      <g clipPath={`url(#${rightClip})`}>
        <svg
          x={SPLIT_BOTTOM}
          width={CANVAS_W - SPLIT_BOTTOM}
          height={CANVAS_H}
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          preserveAspectRatio="none"
        >
          <Right />
        </svg>
      </g>

      {/* Costura sutil para que el corte se lea limpio */}
      <path
        d={`M${SPLIT_TOP} 0L${SPLIT_BOTTOM} ${CANVAS_H}`}
        stroke="#FFFFFF"
        strokeWidth="0.06"
        strokeOpacity="0.85"
      />
    </svg>
  );
};

const LANGUAGE_SHAPES = {
  es: { left: SpainShape, right: MexicoShape },
  en: { left: UnitedStatesShape, right: UnitedKingdomShape }
};

/**
 * Bandera partida en diagonal: España/México para español y
 * EE. UU./Reino Unido para inglés.
 */
const LanguageFlag = ({ language, className = 'h-3.5 w-5' }) => {
  const { left, right } = LANGUAGE_SHAPES[language] ?? LANGUAGE_SHAPES.es;
  return <DiagonalFlag left={left} right={right} className={className} />;
};

export default LanguageFlag;
