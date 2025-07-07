import sharp from 'sharp';
import fs from 'fs';

// Flower SVG from Lucide React component
const flowerSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"/>
  <path d="M12 7.5V9"/>
  <path d="M7.5 12H9"/>
  <path d="M16.5 12H15"/>
  <path d="M12 16.5V15"/>
  <path d="m8 8 1.88 1.88"/>
  <path d="M14.12 9.88 16 8"/>
  <path d="m8 16 1.88-1.88"/>
  <path d="M14.12 14.12 16 16"/>
</svg>`;

async function generateIcon(size) {
  // Create SVG with gradient background and flower icon
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="url(#grad)"/>
      <g transform="translate(${size/2-12}, ${size/2-12})" stroke="white" stroke-width="2" fill="none">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"/>
        <path d="M12 7.5V9"/>
        <path d="M7.5 12H9"/>
        <path d="M16.5 12H15"/>
        <path d="M12 16.5V15"/>
        <path d="m8 8 1.88 1.88"/>
        <path d="M14.12 9.88 16 8"/>
        <path d="m8 16 1.88-1.88"/>
        <path d="M14.12 14.12 16 16"/>
      </g>
    </svg>
  `;

  try {
    // Convert SVG to PNG using Sharp
    await sharp(Buffer.from(svgContent))
      .png()
      .toFile(`public/icon-${size}.png`);
    
    console.log(`✅ Generated icon-${size}.png`);
  } catch (error) {
    console.error(`❌ Error generating icon-${size}.png:`, error);
  }
}

async function generateAllIcons() {
  console.log('🌸 Generating PWA icons from Flower component...');
  
  // Ensure public directory exists
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }
  
  // Generate both icon sizes
  await generateIcon(192);
  await generateIcon(512);
  
  console.log('✅ All icons generated successfully!');
}

generateAllIcons(); 