const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SVG_CONTENT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="autoclipp-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7C5CFC" />
      <stop offset="100%" stop-color="#9B7CFF" />
    </linearGradient>
  </defs>
  <!-- Rounded Square with AutoClipp Purple Gradient -->
  <rect width="512" height="512" rx="112" ry="112" fill="url(#autoclipp-grad)" />
  <!-- White Scissors Icon from Lucide -->
  <g transform="translate(112, 112) scale(12)" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="6" cy="6" r="3" />
    <path d="M8.12 8.12 12 12" />
    <path d="M20 4 8.12 15.88" />
    <circle cx="6" cy="18" r="3" />
    <path d="M14.8 14.8 20 20" />
  </g>
</svg>`;

// Helper function to create ICO buffer from PNG buffers
function createIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + numImages * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(numImages, 4); // Number of images

  const dirEntries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    const width = item.size >= 256 ? 0 : item.size;
    const height = item.size >= 256 ? 0 : item.size;

    entry.writeUInt8(width, 0);
    entry.writeUInt8(height, 1);
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset to image data

    offset += item.buffer.length;
    dirEntries.push(entry);
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map((p) => p.buffer)]);
}

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'src', 'app');

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  const svgBuffer = Buffer.from(SVG_CONTENT);

  // 1. Save SVG icons
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgBuffer);
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgBuffer);
  console.log('✓ Created favicon.svg in public/ and src/app/');

  // 2. Generate PNGs of various sizes
  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' },
  ];

  const pngResults = {};

  for (const { size, name } of sizes) {
    const pngBuffer = await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer();
    
    pngResults[size] = pngBuffer;
    fs.writeFileSync(path.join(publicDir, name), pngBuffer);
    console.log(`✓ Created ${name} (${size}x${size}) in public/`);
  }

  // Also copy apple-touch-icon to src/app/apple-icon.png
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), pngResults[180]);
  console.log('✓ Created apple-icon.png (180x180) in src/app/');

  // 3. Generate multi-resolution favicon.ico (16, 32, 48)
  const icoPngs = [
    { size: 16, buffer: pngResults[16] },
    { size: 32, buffer: pngResults[32] },
    { size: 48, buffer: pngResults[48] },
  ];

  const icoBuffer = createIco(icoPngs);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Created multi-resolution favicon.ico (16x16, 32x32, 48x48) in public/ and src/app/');

  // 4. Generate web manifest
  const manifest = {
    name: 'AutoClipp',
    short_name: 'AutoClipp',
    description: 'Production AI Video Clipping SaaS Platform',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0C',
    theme_color: '#7C5CFC',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };

  const manifestJson = JSON.stringify(manifest, null, 2);
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), manifestJson);
  fs.writeFileSync(path.join(appDir, 'manifest.webmanifest'), manifestJson);
  console.log('✓ Created site.webmanifest in public/ and src/app/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
