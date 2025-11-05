const fs = require('fs');
const path = require('path');

// Ruta al manifest.json en la carpeta dist
const manifestPath = path.join(__dirname, '..', 'dist', 'favicon', 'manifest.json');

try {
  // Leer el manifest.json
  const manifestContent = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(manifestContent);

  // Actualizar las rutas de los iconos para GitHub Pages
  manifest.start_url = '/portfolio/';
  manifest.icons = manifest.icons.map(icon => ({
    ...icon,
    src: `/portfolio/favicon/${icon.src}`
  }));

  // Escribir el manifest.json actualizado
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));

  console.log('✅ Manifest.json actualizado para GitHub Pages');
} catch (error) {
  console.error('❌ Error al actualizar manifest.json:', error);
  process.exit(1);
}