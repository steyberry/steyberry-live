import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAssetPath } from "../utils/assets";

const images = [
  "images/tey.jpg",
  "images/tey2.jpg",
  "images/tey3.jpg",
  "images/tey4.jpg",
  "images/tey5.jpg",
  "images/tey6.png",
  "images/tey7.png",
  "images/tey8.jpg",
];

// Set document title
document.title = "Steyberry Gallery - For Thea";

// Helper for random scatter
function getScatterStyle(idx: number) {
  // Deterministic random for SSR/CSR match
  const angles = [6, -8, 4, -5, 9, -7, 3, -4, 8, -6];
  const yOffsets = [8, -12, 16, -10, 12, -8, 10, -14, 6, -6];
  return {
    rotate: angles[idx % angles.length],
    y: yOffsets[idx % yOffsets.length],
    x: (idx % 2 === 0 ? 1 : -1) * (10 + (idx * 7) % 18),
  };
}

// Helper to generate random positions for background sprites
function getRandomSprites(count = 28) {
  const sprites = [];
  for (let i = 0; i < count; i++) {
    sprites.push({
      top: Math.random() * 92 + '%',
      left: Math.random() * 92 + '%',
      size: 32 + Math.random() * 56,
      opacity: 0.10 + Math.random() * 0.13,
      rotate: Math.random() * 360,
    });
  }
  return sprites;
}

const tiaSprites = getRandomSprites(28);

export default function Steyberry() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="gallery-bg relative"
      style={{
        fontFamily: 'Minecraft, monospace',
        background: 'linear-gradient(120deg, #fff0f6 0%, #ffe4ec 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Random @tia-sprite.png background sprites */}
      {tiaSprites.map((sprite, i) => (
        <img
          key={i}
          src={getAssetPath("images/sprites/tia-sprite.png")}
          alt="Tia Sprite"
          style={{
            position: 'absolute',
            top: sprite.top,
            left: sprite.left,
            width: sprite.size,
            height: sprite.size,
            opacity: sprite.opacity,
            pointerEvents: 'none',
            zIndex: 0,
            transform: `rotate(${sprite.rotate}deg)`
          }}
          draggable={false}
        />
      ))}
      {/* Strawberry sprite on top, matching watermelon page */}
      <div className="relative mt-10 mb-2 flex justify-center">
        <motion.img
          src={getAssetPath("images/sprites/strawberry-sprite.png")}
          alt="Strawberry"
          className="w-32 h-32 sm:w-40 sm:h-40 select-none"
          style={{ filter: 'drop-shadow(0 0 20px rgba(244, 63, 94, 0.3))' }}
          draggable={false}
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      {/* Subtle SVG pattern background */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        style={{ pointerEvents: 'none', opacity: 0.13 }}
        width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="berryPattern" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="2.5" fill="#f43f5e" />
            <circle cx="36" cy="36" r="2.5" fill="#fb7185" />
            <rect x="22" y="22" width="4" height="4" fill="#fbbf24" rx="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#berryPattern)" />
      </svg>
      {/* Content above pattern */}
      <h2
        style={{
          fontFamily: 'Minecraft, monospace',
          fontSize: '1.3rem',
          margin: '32px 0 8px 0',
          color: '#f43f5e',
          textAlign: 'center',
          fontWeight: 700,
        }}
      >
        You chose strawberry!
      </h2>

      <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)' }}>
        {(() => {
          // 3x3 grid: 8 images + 1 card
          const gridItems = Array(9).fill(null);
          const imgOrder = [...images];
          let imgIdx = 0;
          for (let i = 0; i < 9; i++) {
            if (i === 4) {
              gridItems[i] = '__LETTER_CARD__';
            } else if (imgIdx < imgOrder.length) {
              gridItems[i] = imgOrder[imgIdx++];
            } else {
              gridItems[i] = null; // empty cell
            }
          }
          return gridItems.map((item, idx) => {
            if (item === '__LETTER_CARD__') {
              return (
                <div
                  key="letter-card"
                  style={{
                    background: 'linear-gradient(120deg, #fff0f6 0%, #ffe4ec 100%)',
                    border: '3px solid #fb7185',
                    borderRadius: 16,
                    boxShadow: '0 4px 24px 0 rgba(251, 113, 133, 0.13), 0 0 0 2px #fda4af',
                    padding: '28px 32px',
                    minWidth: 260,
                    maxWidth: 340,
                    textAlign: 'center',
                    fontFamily: 'Minecraft, monospace',
                    margin: '0 auto',
                    zIndex: 3,
                    position: 'relative',
                  }}
                >
                  <div style={{ fontFamily: 'Daydream, var(--font-daydream), cursive', fontSize: '1.3rem', color: '#fb7185', marginBottom: 10, fontWeight: 700 }}>
                    Thank you, Tey <span role="img" aria-label="heart">❤️</span>
                  </div>
                  <div style={{ fontSize: '1.05rem', color: '#444', lineHeight: 1.6 }}>
                    For all the letters, the memories, the love, the laughter, and the inspiration you brought. May Jehovah bless you and your family always. Take care! <br />
                    <span style={{ color: '#fb7185', fontWeight: 600 }}>I hope you like this berry special gallery ❤️ </span>
                  </div>
                  {/* Tia sprite inside the card, at the bottom */}
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 18 }}>
                    <img
                      src={getAssetPath("images/sprites/tia-sprite.png")}
                      alt="Tia Sprite"
                      style={{ width: 100, height: 100, imageRendering: 'pixelated', filter: 'drop-shadow(0 0 8px #fb7185)' }}
                      draggable={false}
                    />
                  </div>
                </div>
              );
            } else if (item) {
              const scatter = getScatterStyle(idx > 4 ? idx - 1 : idx);
              return (
                <motion.div
                  className="pixel-frame"
                  key={item}
                  style={{
                    fontFamily: 'Minecraft, monospace',
                    background: 'repeating-linear-gradient(135deg, #fb7185 0 4px, #fff 4px 8px)',
                    border: '4px solid #fb7185',
                    borderRadius: '18px',
                    boxShadow: '0 8px 32px 0 rgba(251, 113, 133, 0.13), 0 0 0 2px #fda4af',
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'box-shadow 0.3s, transform 0.2s',
                    zIndex: 2,
                  }}
                  animate={{
                    y: [scatter.y, scatter.y + 10, scatter.y],
                    x: [scatter.x, scatter.x + 5 * (idx % 2 === 0 ? 1 : -1), scatter.x],
                    rotate: [scatter.rotate, scatter.rotate + 2, scatter.rotate],
                  }}
                  transition={{
                    duration: 4 + (idx % 3),
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <img src={getAssetPath(item)} alt={`Gallery ${idx + 1}`} className="gallery-img" style={{ fontFamily: 'Minecraft, monospace' }} />
                </motion.div>
              );
            } else {
              // Empty cell
              return <div key={`empty-${idx}`} />;
            }
          });
        })()}
      </div>

      {/* Back button floating at the bottom left for mobile/desktop */}
      <div className="fixed bottom-6 left-6 z-20">
        <Link
          to="/"
          className="group flex items-center space-x-2 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-pink-50 bg-white/80 shadow"
          style={{ fontFamily: 'Minecraft, monospace', color: '#fb7185' }}
        >
          <span className="text-xl" style={{ color: '#fb7185' }}>←</span>
          <span className="font-medium" style={{ color: '#fb7185' }}>Back</span>
        </Link>
      </div>
      {/* Custom strawberry scrollbar styles */}
      <style>{`
        html, body {
          scrollbar-color: #fb7185 #ffe4ec;
          scrollbar-width: thin;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          width: 10px;
        }
        html::-webkit-scrollbar-thumb, body::-webkit-scrollbar-thumb {
          background: linear-gradient(120deg, #fb7185 0%, #fda4af 100%);
          border-radius: 8px;
        }
        html::-webkit-scrollbar-track, body::-webkit-scrollbar-track {
          background: #ffe4ec;
        }
      `}</style>
    </div>
  );
}
