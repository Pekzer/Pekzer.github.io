const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  // Standard favicon sizes
  const faviconSizes = [16, 32, 96];

  // Apple touch icon sizes
  const appleSizes = [57, 60, 72, 76, 114, 120, 144, 152, 180];

  // Android icon sizes
  const androidSizes = [36, 48, 72, 96, 144, 192];

  // Microsoft tile sizes
  const msSizes = [70, 144, 150, 310];

  const allSizes = [...new Set([...faviconSizes, ...appleSizes, ...androidSizes, ...msSizes])];

  for (const size of allSizes) {
    // Generate dark theme versions
    const svgPath = path.join(__dirname, '..', 'public', 'favicon', 'logo-dark.svg');
    const svgBuffer = fs.readFileSync(svgPath);

    // Favicon
    if (faviconSizes.includes(size)) {
      const outputPath = path.join(__dirname, '..', 'public', 'favicon', `favicon-${size}x${size}.png`);
      await sharp(svgBuffer).resize(size, size).png().toFile(outputPath);
      console.log(`Generated favicon ${outputPath}`);
    }

    // Apple icons
    if (appleSizes.includes(size)) {
      const outputPath = path.join(__dirname, '..', 'public', 'favicon', `apple-icon-${size}x${size}.png`);
      await sharp(svgBuffer).resize(size, size).png().toFile(outputPath);
      console.log(`Generated apple icon ${outputPath}`);
    }

    // Android icons
    if (androidSizes.includes(size)) {
      const outputPath = path.join(__dirname, '..', 'public', 'favicon', `android-icon-${size}x${size}.png`);
      await sharp(svgBuffer).resize(size, size).png().toFile(outputPath);
      console.log(`Generated android icon ${outputPath}`);
    }

    // Microsoft icons
    if (msSizes.includes(size)) {
      const outputPath = path.join(__dirname, '..', 'public', 'favicon', `ms-icon-${size}x${size}.png`);
      await sharp(svgBuffer).resize(size, size).png().toFile(outputPath);
      console.log(`Generated ms icon ${outputPath}`);
    }
  }

  // Generate apple-icon.png and apple-icon-precomposed.png (180x180)
  const svgBuffer = fs.readFileSync(path.join(__dirname, '..', 'public', 'favicon', 'logo-dark.svg'));
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(__dirname, '..', 'public', 'favicon', 'apple-icon.png'));
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(__dirname, '..', 'public', 'favicon', 'apple-icon-precomposed.png'));

  console.log('Favicon generation completed!');
}

generateFavicons().catch(console.error);