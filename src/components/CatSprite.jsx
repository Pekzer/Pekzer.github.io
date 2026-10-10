import React from 'react';

const CatSprite = ({ facing = 'right', moving = true, dashing = false }) => (
  <svg
    className={`cat-sprite ${moving ? 'is-walking' : 'is-idle'} ${dashing ? 'is-dashing' : ''}`}
    viewBox="0 0 112 76"
    width="84"
    height="60"
    role="img"
    aria-label="Gato atigrado animado"
    style={{ transform: `scaleX(${facing === 'left' ? -1 : 1})` }}
  >
    <defs>
      {/* Cuerpo: Gris frío y neutro */}
      <linearGradient id="cat-fur" x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#9a9a9c" />
        <stop offset="50%" stopColor="#7d7d80" />
        <stop offset="100%" stopColor="#5f5f63" />
      </linearGradient>
      
      {/* Rostro: Gris con subtono marrón (cálido) */}
      <linearGradient id="cat-face-fur" x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#a89b91" />
        <stop offset="50%" stopColor="#8a7d72" />
        <stop offset="100%" stopColor="#6d6259" />
      </linearGradient>

      <linearGradient id="cat-tail-fur" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8a8a8d" />
        <stop offset="100%" stopColor="#5f5f63" />
      </linearGradient>
    </defs>

    <g className="cat-tail">
      <path d="M 28 44 C 13 40, 9 27, 17 18 C 22 12, 30 17, 27 23" fill="none" stroke="url(#cat-tail-fur)" strokeWidth="7" strokeLinecap="round" />
      <path d="M 28 44 C 13 40, 9 27, 17 18 C 22 12, 30 17, 27 23" fill="none" stroke="#2b2b2e" strokeWidth="7" strokeLinecap="butt" strokeDasharray="3.5 9" opacity=".9" />
      {/* Punta de la cola negra */}
      <path d="M 17 19 C 22 15, 28 19, 26 23" fill="none" stroke="#1a1a1c" strokeWidth="3" strokeLinecap="round" />
    </g>

    <g className="cat-body">
      <path d="M 25 34 Q 36 24 54 30 Q 68 34 74 43 L 69 55 L 30 55 Q 20 49 25 34 Z" fill="url(#cat-fur)" />
      <path d="M 55 34 Q 63 39 65 49 L 54 51 Q 50 43 55 34" fill="#f0e7db" opacity=".55" />

      <g stroke="#2b2b2e" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".85">
        <path d="M 32 29 Q 35 39 31 48" />
        <path d="M 42 28 Q 45 38 42 49" />
        <path d="M 52 29 Q 55 39 53 50" />
        <path d="M 62 32 Q 65 41 63 50" />
        <path d="M 70 39 Q 72 45 69 51" />
      </g>

      <g stroke="#8a6b4a" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity=".55">
        <path d="M 36 29 Q 39 39 36 47" />
        <path d="M 47 28 Q 50 39 48 48" />
        <path d="M 57 30 Q 60 40 58 49" />
      </g>

      {/* Piernas blancas */}
      <g className="cat-leg cat-leg-back">
        <path d="M 34 48 Q 31 55 34 63 L 42 63 L 43 52" fill="#ffffff" stroke="#2b2b2e" strokeWidth="2" strokeLinejoin="round" />
      </g>
      <g className="cat-leg cat-leg-front">
        <path d="M 61 47 Q 64 54 61 63 L 69 63 L 71 50" fill="#ffffff" stroke="#2b2b2e" strokeWidth="2" strokeLinejoin="round" />
      </g>
    </g>

    <g className="cat-head">
      {/* Base de la cabeza (Gris cálido con subtono marrón) */}
      <path d="M 58 32 L 59 12 L 73 23 Q 81 19 88 24 L 99 13 L 100 35 Q 101 48 85 50 L 70 47 Q 59 43 58 32 Z" fill="url(#cat-face-fur)" stroke="#2b2b2e" strokeWidth="1.5" strokeLinejoin="round" />
      
      {/* Orejas (interior gris oscuro cálido) */}
      <path d="M 63 20 L 62 16 L 70 23 Z" fill="#5e554c" />
      <path d="M 92 22 L 98 17 L 97 27 Z" fill="#5e554c" />

      {/* Rayas marrones del rostro */}
      <g stroke="#6b4c3a" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".9">
        {/* Frente central (forma de M típica de los atigrados) */}
        <path d="M 73 25 L 74 30" />
        <path d="M 79 23 L 79.5 29" />
        <path d="M 84 23 L 84.5 29" />
        <path d="M 90 25 L 90.5 30" />
        
        {/* Laterales de la frente */}
        <path d="M 69 27 L 70 32" />
        <path d="M 94 27 L 95 32" />
        
        {/* Mejillas */}
        <path d="M 70 35 L 72 39" />
        <path d="M 92 35 L 94 39" />
        
        {/* Alrededor de los ojos */}
        <path d="M 76 28 Q 77 30 76 32" />
        <path d="M 88 28 Q 89 30 88 32" />
      </g>

      {/* Hocico blanco (por debajo de la nariz) */}
      <ellipse cx="90" cy="43" rx="7" ry="4.5" fill="#ffffff" />

      {/* Nariz marrón oscuro */}
      <path d="M 87 38 L 91 36 L 95 38 L 91 41 Z" fill="#3b2313" />
      
      {/* Boca */}
      <path d="M 90 41 Q 88 44 85 43 M 90 41 Q 93 44 96 43" fill="none" stroke="#2b2b2e" strokeWidth="1" strokeLinecap="round" />

      {/* Ojos amarillos */}
      <g className="cat-eye">
        <ellipse cx="82" cy="33" rx="3.4" ry="4.2" fill="#f5c542" />
        <ellipse cx="83" cy="33" rx="1.2" ry="3.2" fill="#1a1713" />
        <circle cx="83.6" cy="31.3" r=".9" fill="white" />
      </g>

      {/* Bigotes */}
      <g fill="none" stroke="#f4efe8" strokeWidth=".9" strokeLinecap="round" opacity=".95">
        <path d="M 95 40 L 108 37 M 96 42 L 109 43 M 94 44 L 105 48" />
      </g>
    </g>

    <g className="cat-leg cat-leg-front cat-leg-front-2">
      {/* Pata delantera blanca */}
      <path d="M 53 47 Q 51 54 54 63 L 62 63 L 63 49" fill="#ffffff" stroke="#2b2b2e" strokeWidth="2" strokeLinejoin="round" />
    </g>
    <g fill="#ffffff" stroke="#2b2b2e" strokeWidth=".8">
      <ellipse className="cat-paw cat-paw-back" cx="38" cy="63" rx="5" ry="2" />
      <ellipse className="cat-paw cat-paw-front" cx="66" cy="63" rx="5" ry="2" />
    </g>
  </svg>
);

export default CatSprite;