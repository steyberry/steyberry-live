import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Set document title
document.title = "Choose Your Fruit";

export default function Home() {
  const [hovered, setHovered] = useState<null | "strawberry" | "watermelon">(null);
  const [showLabel, setShowLabel] = useState<null | "strawberry" | "watermelon">(null);
  const navigate = useNavigate();

  // Reset animation states when component mounts to prevent erratic behavior
  useEffect(() => {
    setHovered(null);
    setShowLabel(null);
  }, []);

  // Background color transitions
  let bgGradient = "linear-gradient(120deg, #fff 0%, #f8fafc 100%)";
  if (hovered === "strawberry") bgGradient = "linear-gradient(120deg, #fff0f6 0%, #ffe4ec 100%)";
  if (hovered === "watermelon") bgGradient = "linear-gradient(120deg, #e6f6e6 0%, #f8fff8 100%)";

  // Clean handlers without debounce to prevent erratic behavior
  function handlePointerEnter(fruit: "strawberry" | "watermelon") {
    setHovered(fruit);
    setShowLabel(fruit);
  }

  function handlePointerLeave() {
    setHovered(null);
    setShowLabel(null);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background fade (single motion.div) */}
    <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: bgGradient,
          pointerEvents: 'none',
        }}
        animate={{ background: bgGradient }}
        transition={{ duration: 0.7 }}
      />
      <motion.h1
        className="mb-16 text-4xl sm:text-5xl text-center text-green-700 relative z-10"
        style={{ fontFamily: 'Daydream, var(--font-daydream), cursive' }}
        animate={{ y: [0, -7, 0], rotate: [-1, 1, -1] }}
        transition={{ y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }}
      >
        Choose Your Fruit
      </motion.h1>
      <div className="flex flex-row items-center justify-center gap-16 md:gap-32 relative z-10">
        {/* Strawberry Sprite */}
        <motion.div
          className="relative"
          onPointerEnter={() => handlePointerEnter("strawberry")}
          onPointerLeave={handlePointerLeave}
          onTouchStart={() => handlePointerEnter("strawberry")}
          onTouchEnd={handlePointerLeave}
          onClick={() => navigate("/steyberry")}
          tabIndex={0}
          role="button"
          aria-label="Select Strawberry"
        >
          <motion.img
            src="/images/sprites/strawberry-sprite.png"
            alt="Strawberry"
            className="w-32 h-32 sm:w-40 sm:h-40 select-none"
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{
              filter: "drop-shadow(0 0 20px rgba(244, 63, 94, 0.5)) brightness(1.1)",
              scale: 1.1
            }}
            whileTap={{ scale: 0.95 }}
            draggable={false}
          />
            {showLabel === "strawberry" && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.95, y: 0, rotate: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -18, 0],
                rotate: [-7, 7, -7],
              }}
              exit={{ opacity: 0, scale: 0.95, y: 0, rotate: 0 }}
              transition={{
                opacity: { duration: 0.22, ease: 'easeInOut' },
                scale: { duration: 0.22, ease: 'easeInOut' },
                y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
              }}
              >
                <span
                  className="text-2xl text-rose-600"
                  style={{ fontFamily: 'Daydream, var(--font-daydream), cursive' }}
                >
                  Strawberry
                </span>
              </motion.div>
            )}
        </motion.div>

        {/* Watermelon Sprite */}
        <motion.div
          className="relative"
          onPointerEnter={() => handlePointerEnter("watermelon")}
          onPointerLeave={handlePointerLeave}
          onTouchStart={() => handlePointerEnter("watermelon")}
          onTouchEnd={handlePointerLeave}
          onClick={() => navigate("/watermelon")}
          tabIndex={0}
          role="button"
          aria-label="Select Watermelon"
        >
          <motion.img
            src="/images/sprites/watermelon-sprite.png"
            alt="Watermelon"
            className="w-32 h-32 sm:w-40 sm:h-40 select-none"
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            whileHover={{
              filter: "drop-shadow(0 0 20px rgba(34, 197, 94, 0.5)) brightness(1.1)",
              scale: 1.1
            }}
            whileTap={{ scale: 0.95 }}
            draggable={false}
          />
            {showLabel === "watermelon" && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.95, y: 0, rotate: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -18, 0],
                rotate: [-7, 7, -7],
              }}
              exit={{ opacity: 0, scale: 0.95, y: 0, rotate: 0 }}
              transition={{
                opacity: { duration: 0.22, ease: 'easeInOut' },
                scale: { duration: 0.22, ease: 'easeInOut' },
                y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
              }}
              >
                <span
                  className="text-2xl text-emerald-600"
                  style={{ fontFamily: 'Daydream, var(--font-daydream), cursive' }}
                >
                  Watermelon
                </span>
              </motion.div>
            )}
        </motion.div>
      </div>
    </div>
  );
}
