import { Link } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function meta() {
  return [
    { title: "A Letter for You" },
    { name: "description", content: "Words from the heart" },
  ];
}

export default function Letter() {
  // The closure letter has moved to /watermelon
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)' }}>
      <h1 style={{ fontFamily: 'Daydream, var(--font-daydream), cursive', fontSize: '2rem', color: '#22c55e', marginBottom: 16 }}>Moved!</h1>
      <p style={{ fontSize: '1.1rem', color: '#444', marginBottom: 24 }}>The letter is now at <b>/watermelon</b>.</p>
      <Link to="/watermelon" style={{ color: '#22c55e', fontWeight: 600, fontSize: '1.2rem', textDecoration: 'underline' }}>Go to Watermelon Letter</Link>
    </div>
  );
}
  const [readingProgress, setReadingProgress] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, type: string}>>([]);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const recipientName = "Thea (Tey)"; // Fixed recipient name

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Background music effect
  useEffect(() => {
    if (musicEnabled) {
      // Create a gentle nature sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Create a very gentle, low-frequency ambient sound
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime); // Very low volume

      oscillator.start();

      return () => {
        oscillator.stop();
        audioContext.close();
      };
    }
  }, [musicEnabled]);

  // Cursor particle trail effect
  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Only create particles occasionally to avoid performance issues
      if (Math.random() > 0.7) {
        const newParticle = {
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
          type: 'trail'
        };

        setParticles(prev => [...prev, newParticle]);

        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 1500);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Notification function
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Release animation function
  const createReleaseAnimation = (e: React.MouseEvent, type: 'butterfly' | 'petal') => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const particles = type === 'butterfly' ? ['🦋', '🦋'] : ['🌸', '🌺', '🌸'];

    particles.forEach((particle, index) => {
      const element = document.createElement('div');
      element.textContent = particle;
      element.className = `floating-particle ${type}-release`;
      element.style.left = `${x + (Math.random() - 0.5) * 40}px`;
      element.style.top = `${y + (Math.random() - 0.5) * 40}px`;
      element.style.animationDelay = `${index * 0.2}s`;

      document.body.appendChild(element);

      setTimeout(() => {
        element.remove();
      }, type === 'butterfly' ? 6000 : 5000);
    });
  };

  return (
    <div className="min-h-screen relative" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Subtle SVG pattern background */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        style={{ pointerEvents: 'none', opacity: 0.10 }}
        width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="letterPattern" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="2.5" fill="#22c55e" />
            <circle cx="36" cy="36" r="2.5" fill="#f43f5e" />
            <rect x="22" y="22" width="4" height="4" fill="#fbbf24" rx="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#letterPattern)" />
      </svg>
      {/* Content above pattern */}
      {/* Reading progress indicator */}
      <div className="reading-progress">
        <div
          className="reading-progress-bar"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Elegant header with back button */}
      <motion.div
        className="sticky top-0 bg-gradient-to-r from-green-50/95 via-sage-50/95 to-cream-50/95 backdrop-blur-md border-b border-green-200/40 z-10 shadow-sm"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to="/"
              className="group flex items-center space-x-2 text-green-600 hover:text-green-700
                       transition-all duration-300 px-3 py-2 rounded-lg hover:bg-green-50"
            >
              <motion.span
                className="text-xl"
                whileHover={{ x: -3 }}
                transition={{ duration: 0.2 }}
              >
                ←
              </motion.span>
              <span className="font-medium" style={{ fontFamily: 'var(--font-sans)' }}>Back</span>
            </Link>
          </motion.div>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => {
                setMusicEnabled(!musicEnabled);
                showNotification(musicEnabled ? 'Music disabled' : 'Music enabled');
              }}
              className="text-green-600 hover:text-green-700 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                animate={{
                  rotate: musicEnabled ? [0, 10, -10, 0] : 0,
                  transition: {
                    duration: 2,
                    repeat: musicEnabled ? Infinity : 0,
                    ease: "easeInOut"
                  }
                }}
              >
                {musicEnabled ? '🎵' : '🎵'}
              </motion.span>
            </motion.button>
            <motion.div
              className="text-green-500 text-lg"
              animate={{
                scale: [1, 1.1, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              🍓
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Paper document container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        {/* Beautiful paper document with enhanced animations */}
        <motion.div
          className="relative"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Paper shadow layers for depth */}
          <motion.div
            className="absolute inset-0 bg-cream-100 rounded-lg opacity-30"
            animate={{
              rotate: [1, 1.5, 1],
              transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
          <motion.div
            className="absolute inset-0 bg-cream-200 rounded-lg opacity-20"
            animate={{
              rotate: [-0.5, -1, -0.5],
              transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }
            }}
          />

          {/* Main paper document */}
          <motion.div
            className="relative bg-cream-50 paper-texture paper-shadow rounded-lg overflow-hidden mx-2 sm:mx-0 border border-green-100/30"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.25)",
              transition: { duration: 0.3 }
            }}
          >
            {/* Beautiful paper header with elegant typography */}
            <motion.div
              className="relative px-6 sm:px-12 lg:px-16 py-8 sm:py-12 border-b border-green-200/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Subtle paper fold line */}
              <motion.div
                className="absolute top-0 left-8 w-px h-full bg-gradient-to-b from-transparent via-green-200/30 to-transparent"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />

              <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl text-green-800 text-center font-medium tracking-wide leading-tight"
                style={{ fontFamily: 'var(--font-serif)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                A Letter of Closure
              </motion.h1>

              <motion.div
                className="flex justify-center mt-4 sm:mt-6 space-x-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <motion.span
                  className="text-green-400 text-xl sm:text-2xl release-element cursor-pointer"
                  onClick={(e) => createReleaseAnimation(e, 'petal')}
                  whileHover={{
                    scale: 1.3,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                  animate={{
                    y: [0, -5, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  🌸
                </motion.span>
                <motion.span
                  className="text-pink-300 text-xl sm:text-2xl release-element cursor-pointer"
                  onClick={(e) => createReleaseAnimation(e, 'butterfly')}
                  whileHover={{
                    scale: 1.3,
                    transition: { duration: 0.3 }
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }
                  }}
                >
                  💕
                </motion.span>
                <motion.span
                  className="text-green-400 text-xl sm:text-2xl release-element cursor-pointer"
                  onClick={(e) => createReleaseAnimation(e, 'petal')}
                  whileHover={{
                    scale: 1.3,
                    rotate: [0, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                  animate={{
                    y: [0, -5, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }
                  }}
                >
                  🌸
                </motion.span>
              </motion.div>

              {/* Decorative line */}
              <motion.div
                className="mt-6 sm:mt-8 flex justify-center"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
              </motion.div>
            </motion.div>

            {/* Beautiful letter body with enhanced animations */}
            <motion.div
              className="relative px-6 sm:px-12 lg:px-16 py-8 sm:py-12 lg:py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* Left margin line like notebook paper */}
              <motion.div
                className="absolute left-12 sm:left-20 top-0 bottom-0 w-px bg-green-200/40"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              />

              <motion.div
                className="text-center mb-8 sm:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.p
                  className="text-green-700 font-light italic text-base sm:text-lg px-2 leading-relaxed"
                  style={{ fontFamily: 'var(--font-serif)' }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  "Every ending is a new beginning wrapped in the wisdom of what was."
                </motion.p>
              </motion.div>

              <motion.div
                className="space-y-6 sm:space-y-8 text-gray-800 leading-relaxed ml-4 sm:ml-8"
                style={{ fontFamily: 'var(--font-sans)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <motion.p
                  className="text-lg sm:text-xl font-medium"
                  style={{ fontFamily: 'var(--font-handwriting)' }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  whileHover={{
                    x: 10,
                    transition: { duration: 0.3 }
                  }}
                >
                  Dear {recipientName},
                </motion.p>

                <p className="text-base sm:text-lg leading-relaxed">
                  As I sit here writing this, I'm filled with a mixture of emotions that I've been
                  carrying for some time. This letter isn't about blame or regret—it's about
                  finding peace and offering both of us the closure we deserve.
                </p>

                <p className="text-base sm:text-lg leading-relaxed">
                  Our time together was beautiful in its own way. We shared moments that I will
                  always treasure, laughter that brightened my days, and dreams that we painted
                  together under starlit skies. You taught me things about myself that I never
                  knew, and for that, I am grateful.
                </p>

                <p className="text-base sm:text-lg leading-relaxed">
                  But sometimes, even the most beautiful flowers must be pressed between the pages
                  of memory to preserve their essence. What we had was real, but it belonged to a
                  different season of our lives—a season that has gently come to its end.
                </p>

                <p className="text-base sm:text-lg leading-relaxed">
                  I want you to know that letting go doesn't diminish what we shared. It doesn't
                  erase the love, the growth, or the joy. Instead, it honors those moments by
                  allowing them to remain untainted by the struggles that would have followed.
                </p>

                <p className="text-base sm:text-lg leading-relaxed">
                  I forgive you for the ways you couldn't love me the way I needed, and I hope
                  you can forgive me for the ways I couldn't be what you needed either. We were
                  both doing our best with the hearts we had at the time.
                </p>

                <p className="text-base sm:text-lg leading-relaxed">
                  As we walk different paths now, I wish for you all the happiness your heart can
                  hold. I hope you find someone who loves you in the way that feels like coming
                  home, and I hope you give yourself the same kindness you deserve.
                </p>

                <p className="text-base sm:text-lg leading-relaxed">
                  This isn't goodbye with sadness—it's goodbye with gratitude. Thank you for
                  being part of my story, for the lessons wrapped in love, and for helping me
                  understand more about who I am and who I want to become.
                </p>

                <p className="text-base sm:text-lg leading-relaxed">
                  May your journey ahead be filled with strawberry sunsets, watermelon summers,
                  and all the gentle joys that make life beautiful.
                </p>

                {/* Handwritten signature section */}
                <div className="pt-8 sm:pt-12 border-t border-green-200/30 mt-8 sm:mt-12">
                  <p className="text-base sm:text-lg leading-relaxed mb-4">With love and peaceful closure,</p>
                  <p
                    className="text-green-700 text-xl sm:text-2xl lg:text-3xl font-medium transform -rotate-1"
                    style={{ fontFamily: 'var(--font-handwriting)' }}
                  >
                    [Your name]
                  </p>

                  {/* Small decorative flourish */}
                  <div className="mt-4 opacity-60">
                    <svg width="60" height="20" viewBox="0 0 60 20" className="text-green-400">
                      <path d="M5 15 Q 30 5 55 15" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced decorative footer - now interactive */}
              <div className="flex justify-center pt-8 sm:pt-12 pb-6 sm:pb-8 space-x-4 sm:space-x-6 text-2xl sm:text-3xl">
                <span
                  className="float-gentle release-element"
                  style={{ animationDelay: '0s' }}
                  onClick={(e) => createReleaseAnimation(e, 'petal')}
                  title="Click to release petals"
                >
                  🍓
                </span>
                <span
                  className="float-gentle release-element"
                  style={{ animationDelay: '0.5s' }}
                  onClick={(e) => createReleaseAnimation(e, 'petal')}
                  title="Click to release petals"
                >
                  🌸
                </span>
                <span
                  className="float-gentle release-element"
                  style={{ animationDelay: '1s' }}
                  onClick={(e) => createReleaseAnimation(e, 'butterfly')}
                  title="Click to release butterflies"
                >
                  🍉
                </span>
                <span
                  className="float-gentle release-element"
                  style={{ animationDelay: '1.5s' }}
                  onClick={(e) => createReleaseAnimation(e, 'petal')}
                  title="Click to release petals"
                >
                  🌸
                </span>
                <span
                  className="float-gentle release-element"
                  style={{ animationDelay: '2s' }}
                  onClick={(e) => createReleaseAnimation(e, 'petal')}
                  title="Click to release petals"
                >
                  🍓
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced bottom spacing */}
        <div className="h-20 sm:h-24 lg:h-32"></div>

        {/* Cursor particle trail */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="cursor-particle"
            style={{
              left: particle.x,
              top: particle.y,
            }}
          />
        ))}

        {/* Notification toast */}
        {notification && (
          <div className="notification-toast">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
}
