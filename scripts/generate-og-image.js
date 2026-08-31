/**
 * Genera la imagen Open Graph (1200x630) con la marca PKZR.
 * Salida: public/favicon/og-1200x630.png
 *
 * Usa opentype.js para convertir el texto a trazados vectoriales
 * (independiente de fontconfig), y sharp para rasterizar.
 *
 * Uso: node scripts/generate-og-image.js
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const opentype = require('opentype.js');

const ROOT = path.resolve(__dirname, '..');
const FONT_PATH = path.join(__dirname, 'assets', 'PressStart2P-Regular.ttf');
const OUT_DIR = path.join(ROOT, 'public', 'favicon');
const OUT_FILE = path.join(OUT_DIR, 'og-1200x630.png');

const WIDTH = 1200;
const HEIGHT = 630;

// Paleta del sitio (tailwind.config.js)
const COLORS = {
  bgTop: '#14141c',
  bgBottom: '#07070c',
  primary: '#7c1427', // portfolio-1
  primaryBright: '#b91c3c',
  white: '#f5f5f5',
  gray: '#9ca3af',
};

function buildSvg(font) {
  const dots = `
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="#ffffff" opacity="0.06"/>
    </pattern>`;

  const defs = `
    <defs>
      ${dots}
      <radialGradient id="glow1" cx="0" cy="0" r="1">
        <stop offset="0%" stop-color="${COLORS.primary}" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="${COLORS.primary}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glow2" cx="1" cy="1" r="1">
        <stop offset="0%" stop-color="${COLORS.primaryBright}" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="${COLORS.primaryBright}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stop-color="${COLORS.bgTop}"/>
        <stop offset="100%" stop-color="${COLORS.bgBottom}"/>
      </linearGradient>
    </defs>`;

  // Avance horizontal de un glifo en píxeles (getAdvanceWidth está roto en esta versión)
  const advance = (g, size) => (g.advanceWidth / font.unitsPerEm) * size;

  // Convierte texto a path data centrado horizontalmente en (cx), con baseline en (y)
  const textPath = (text, cx, y, size) => {
    const glyphs = font.stringToGlyphs(text);
    const widths = glyphs.map((g) => advance(g, size));
    const total = widths.reduce((a, b) => a + b, 0);
    let cursor = cx - total / 2;
    let d = '';
    glyphs.forEach((g, i) => {
      d += g.getPath(cursor, y, size).toPathData(2);
      cursor += widths[i];
    });
    return d;
  };

  // Un solo glifo en (x, y) baseline
  const glyphPath = (char, x, y, size) => font.charToGlyph(char).getPath(x, y, size).toPathData(2);

  // Logo PKZR 2x2 dentro del tile rojo — bloque compacto centrado
  const TILE_X = 500;
  const TILE_Y = 96;
  const TILE = 200;
  const LOGO_SIZE = 88;
  const GAP = 8; // espacio entre letras (horizontal y vertical)

  const scale = LOGO_SIZE / font.unitsPerEm;

  // Centro visual de la tinta de un glifo (en unidades de fuente)
  const glyphCenter = (ch) => {
    const g = font.charToGlyph(ch);
    return { cx: (g.xMin + g.xMax) / 2, cy: (g.yMin + g.yMax) / 2 };
  };

  // Posición del pen (baseline) para centrar el glifo en el centro (qx, qy)
  const penFor = (ch, qx, qy) => {
    const { cx, cy } = glyphCenter(ch);
    return { x: qx - cx * scale, y: qy + cy * scale };
  };

  // Tamaño visual de un glifo (ancho = alto: 875 unidades de fuente)
  const glyph = (font.charToGlyph('P').xMax - font.charToGlyph('P').xMin) * scale;
  const blockX = TILE_X + TILE / 2;
  const blockY = TILE_Y + TILE / 2;
  const step = (glyph + GAP) / 2;

  const logo = [
    { ch: 'P', fill: '#000000', qx: blockX - step, qy: blockY - step },
    { ch: 'K', fill: '#ffffff', qx: blockX + step, qy: blockY - step },
    { ch: 'Z', fill: '#ffffff', qx: blockX - step, qy: blockY + step },
    { ch: 'R', fill: '#000000', qx: blockX + step, qy: blockY + step },
  ];

  const logoLetters = logo
    .map(({ ch, fill, qx: cx, qy: cy }) => {
      const { x, y } = penFor(ch, cx, cy);
      return `    <path d="${glyphPath(ch, x, y, LOGO_SIZE)}" fill="${fill}"/>`;
    })
    .join('\n');

  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  ${defs}

  <!-- Fondo -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#dots)"/>
  <circle cx="0" cy="0" r="520" fill="url(#glow1)"/>
  <circle cx="${WIDTH}" cy="${HEIGHT}" r="460" fill="url(#glow2)"/>

  <!-- Tile logo PKZR -->
  <g transform="translate(${TILE_X} ${TILE_Y})">
    <rect width="${TILE}" height="${TILE}" rx="10" fill="${COLORS.primary}" stroke="#000000" stroke-width="7"/>
  </g>
  ${logoLetters}

  <!-- Textos -->
  <path d="${textPath('GONZALO HERRERA', WIDTH / 2, 378, 46)}" fill="${COLORS.white}"/>
  <path d="${textPath('DESARROLLADOR FULL STACK', WIDTH / 2, 448, 27)}" fill="${COLORS.primaryBright}"/>
  <path d="${textPath('PORTFOLIO', WIDTH / 2, 512, 16)}" fill="${COLORS.gray}"/>
</svg>`;
}

async function main() {
  if (!fs.existsSync(FONT_PATH)) {
    console.error(`No se encontró la fuente en: ${FONT_PATH}`);
    console.error('Descárgala de https://github.com/google/fonts/raw/main/ofl/pressstart2p/PressStart2P-Regular.ttf');
    process.exit(1);
  }

  const font = opentype.parse(fs.readFileSync(FONT_PATH).buffer);
  const svg = buildSvg(font);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  await sharp(Buffer.from(svg), { density: 72 })
    .resize(WIDTH, HEIGHT)
    .png()
    .toFile(OUT_FILE);

  console.log(`Imagen generada: ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
