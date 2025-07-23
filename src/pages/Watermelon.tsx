import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// Set document title
document.title = "A Letter for Thea";

export default function Watermelon() {
  const [readingProgress, setReadingProgress] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, type: string}>>([]);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const recipientName = "Tey"; // Fixed recipient name
  const [hovered, setHovered] = useState(false);
  const cuteBgRefs = useRef<(HTMLDivElement|null)[]>([]);
  const [screenMeetsRequirements, setScreenMeetsRequirements] = useState(true);

  // Screen size requirements check (iPad landscape minimum: 1024x768)
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const meetsRequirements = width >= 1024 && height >= 768;
      setScreenMeetsRequirements(meetsRequirements);
    };

    // Check on mount
    checkScreenSize();

    // Check on resize
    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('orientationchange', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('orientationchange', checkScreenSize);
    };
  }, []);

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
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
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

  // Cute background elements for hover
  const cuteBgElements = [
    { left: '10%', top: '20%', emoji: '💚' },
    { left: '80%', top: '30%', emoji: '🍉' },
    { left: '20%', top: '70%', emoji: '✨' },
    { left: '60%', top: '80%', emoji: '💖' },
    { left: '40%', top: '50%', emoji: '🟩' },
  ];

  // Warning screen for small devices
  if (!screenMeetsRequirements) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative"
           style={{ background: 'linear-gradient(120deg, #fecaca 0%, #fca5a5 100%)' }}>
        {/* Floating sprites */}
        <motion.img
          src="/images/sprites/watermelon-sprite.png"
          alt="Watermelon"
          className="w-24 h-24 sm:w-32 sm:h-32 mb-8 select-none"
          initial={{ y: 0 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 20px rgba(244, 63, 94, 0.3))" }}
          draggable={false}
        />

        {/* Warning message */}
        <div className="text-center px-6 max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-red-800 mb-4"
              style={{ fontFamily: 'Daydream, var(--font-daydream), cursive' }}>
            Device Too Small!
          </h2>
          <p className="text-lg text-red-700 mb-4"
             style={{ fontFamily: 'Minecraft, monospace' }}>
            This website requires a larger screen for the best experience.
          </p>
          <p className="text-base text-red-600"
             style={{ fontFamily: 'Minecraft, monospace' }}>
            Minimum requirement: iPad in landscape mode (1024×768)
          </p>
          <p className="text-sm text-red-500 mt-4"
             style={{ fontFamily: 'Minecraft, monospace' }}>
            📱 If you're on an iPad, please rotate to landscape mode
          </p>
        </div>

        {/* Decorative sprites */}
        <div className="absolute top-10 left-10">
          <motion.div
            className="text-4xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            🍉
          </motion.div>
        </div>
        <div className="absolute top-20 right-16">
          <motion.div
            className="text-3xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            🍓
          </motion.div>
        </div>
        <div className="absolute bottom-20 left-20">
          <motion.div
            className="text-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            💚
          </motion.div>
        </div>
        <div className="absolute bottom-16 right-12">
          <motion.div
            className="text-2xl"
            animate={{ rotate: [0, -15, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            ✨
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-bg min-h-screen flex flex-col items-center relative">
      {/* Subtle SVG pattern background */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        style={{ pointerEvents: 'none', opacity: 0.10 }}
        width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="melonPattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="3" fill="#22c55e" />
            <circle cx="45" cy="45" r="3" fill="#f43f5e" />
            <rect x="28" y="28" width="4" height="4" fill="#fbbf24" rx="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#melonPattern)" />
      </svg>
      {/* Floating Watermelon Sprite with cute hover animation */}
      <div
        className="relative mt-10 mb-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
        style={{ zIndex: 2 }}
      >
        <motion.img
          src="/images/sprites/watermelon-sprite.png"
          alt="Watermelon"
          className="w-32 h-32 sm:w-40 sm:h-40 select-none"
          initial={{ y: 0 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 20px rgba(34, 197, 94, 0.3))" }}
          draggable={false}
        />
        {hovered && cuteBgElements.map((el, i) => (
          <motion.div
            key={i}
            className="cute-bg-anim text-2xl sm:text-3xl"
            style={{ left: el.left, top: el.top }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            {el.emoji}
          </motion.div>
        ))}
      </div>
      <h2
        style={{ fontFamily: 'Minecraft, monospace', fontSize: '1.3rem', margin: '32px 0 8px 0', color: '#047857', textAlign: 'center', fontWeight: 700 }}
      >
        You chose watermelon!
      </h2>
      {/* Reading progress indicator */}
      <div className="reading-progress" style={{ fontFamily: 'Minecraft, monospace' }}>
        <div 
          className="reading-progress-bar" 
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      {/* Pixel-style frame for the letter with pixel-paper and Minecraft font */}
      <motion.div
        className="pixel-frame pixel-paper max-w-5xl w-[calc(100vw-2rem)] mx-auto mt-4 mb-12 bg-white/90 px-4 sm:px-6 lg:px-8"
        style={{ fontFamily: 'Minecraft, monospace', zIndex: 1 }}
        animate={{
          y: [0, -40, 0, 40, 0],
          rotate: [-2, -2.7, -2, -1.2, -2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        initial={false}
      >
        <div className="p-6 sm:p-10 letter-minecraft">
          {/* Beautiful paper header with elegant typography */}
          <h2
            className="text-2xl sm:text-3xl text-green-800 text-center mb-6"
            style={{ fontFamily: 'Daydream, var(--font-daydream), cursive' }}
          >
            my unsaid words
          </h2>
          <div className="space-y-6 sm:space-y-8 text-gray-800 leading-relaxed">
            <p className="text-lg sm:text-xl font-medium" style={{ fontFamily: 'Minecraft, monospace' }}>
              Hi {recipientName}!
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              I hope you're doing well right now. I know you are. This may seem a bit weird and unecessary, but I want to take this final
              opportunity to tell everything I wanted to tell for a long time now. Please lend me just a bit of your time, I will appreciate it a lot.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              This is not to open up old wounds, nor for us to be reconciled again. This is to finally tell you that I understand you. What you did was
              the best thing, for you and for me, and I do not deserve everything you did for me. You did the best you could, to understand, to help, to love, 
              to be there for me. You are the best girlfriend I could have asked for, even anyone could ever with for, and me being inexperienced, 
              took that for granted. I wasn't true to you and to myself right from the very start, from the moment I replied to your message. I knew 
              my situation, my family, my whole life dictates that I'm no yet ready for a relationship yet, but still jumped right into it.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              I know and felt you just wanted love, Tey. You loved me so much and you showed it. I loved you just as much, but I wasn't able to show it.
              In reality, Tey, I wasn't that sleepyhead as you knew me to be. I'm just wasn't allowed to be on phone 'till 9 because my parents forbid me to. 
              In reality, before, my parents had a hard time trusting me because I got in so much trouble from bad associations. I was the only problem in 
              our relationship. I can't give you anything because I don't have anything to give in the first place, even if I wanted to.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              Kaya Tey, I'm sorry. I'm sorry for not being true to us. I'm sorry for diving into something deep, I don't even know how to swim. I'm sorry 
              for being so over-imaginative, naive, and falsely optimistic, saying and bosting things I can't stand up to. Sorry for not being the 
              boyfriend you envisioned me to be.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              I never had regrets na nakilala kita. Being loved by you was one of the best things I have ever experienced in my life, Tey. But if I had the chance 
              to go back in time, I won't press the "Add Friend" button on your profile, to keep you from expriencing the disappointments.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              All in all, Tey, after 12 longs months of constant struggle to move on. After days of reading your heartfelt letters, I realized the 
              value of a treasure I lost. I felt joy and despair at the same time. Joy, for experiencing true, passionate love and care from someone so genuine and 
              beautiful; despair, for now I've lost it it all, and I kinda hate myself for being the sole reaosn why. If only, we met a little further away in time, 
              when bothh of us are ready, especially me. I can't imagine how much we could do together, for us, for Jehovah. I can't imagine how much love I could return 
              and show to my clingy bestest girlfriend ever. How I wish.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              Nonetheless, Tey, I wish you all the best things in the world. If ever you have read my letter up to this point, I want to thank you so so much 
              for you time. I hope you like this simple website I did. It took me months to make T_T, but it's worth it HAHA it enhanced my skills so much. As for me, 
              I reached my goal for being a Ministerial Servant yay! I'm praying you reach every goals you set for yourself.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              To be honest, Tey, I really struggled to moved on from something that could've been perfect. It was a long painful process. That process thought me many things. 
              Now I will be truthful to myself and others. I learned to only fill up my plate with things I can consume. Hindi ko na pipiliting pahinugin, kasi aasim.
            </p>
            <div className="text-center mb-8">
            <span className="italic text-green-700 text-base sm:text-lg" style={{ fontFamily: 'Minecraft, monospace' }}>
              I will forever cherish the memories we had, good and bad. Bad memories as lessons not to repeat and good memories as treasures to keep. I love you Tey, 
              and I will forever admire and love you as long as I live. May Jehovah bless you and keep you and your family safe.
            </span>
          </div>
            <div className="pt-8 border-t border-green-200/30 mt-8">
              <p className="text-base sm:text-lg leading-relaxed mb-4">With love and peace,</p>
              <p className="text-green-700 text-xl sm:text-2xl lg:text-3xl font-medium transform -rotate-1">
                Janzen
              </p>
            </div>
            {/* Didiboi sprite with meow speech */}
            <div className="flex flex-col items-center mt-10 mb-2" style={{ position: 'relative' }}>
              <img src="/images/sprites/didiboi-sprite.png" alt="Didiboi Sprite" className="w-24 h-24 mb-2 select-none" draggable={false} />
              <FlickerMeow />
            </div>
          </div>
        </div>
      </motion.div>
      {/* Cursor particle trail */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="cursor-particle"
          style={{
            left: particle.x,
            top: particle.y,
            fontFamily: 'Minecraft, monospace'
          }}
        />
      ))}
      {/* Notification toast */}
      {notification && (
        <div className="notification-toast" style={{ fontFamily: 'Minecraft, monospace' }}>
          {notification}
        </div>
      )}
      {/* Back button floating at the bottom left for mobile/desktop */}
      <div className="fixed bottom-6 left-6 z-20">
        <Link
          to="/"
          className="group flex items-center space-x-2 text-green-600 hover:text-green-700 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-green-50 bg-white/80 shadow"
          style={{ fontFamily: 'Minecraft, monospace' }}
        >
          <span className="text-xl">←</span>
          <span className="font-medium">Back</span>
        </Link>
      </div>
    </div>
  );
}

function FlickerMeow() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    // 0: hidden, 1: first meow, 2: both meows, 3: fade out
    const timeouts = [0, 400, 400, 400];
    let t1, t2, t3;
    t1 = setTimeout(() => setStep(1), 0); // first meow
    t2 = setTimeout(() => setStep(2), 400); // second meow
    t3 = setTimeout(() => setStep(3), 800); // fade out
    const loop = setInterval(() => {
      setStep(0);
      setTimeout(() => setStep(1), 0);
      setTimeout(() => setStep(2), 400);
      setTimeout(() => setStep(3), 800);
    }, 1400);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearInterval(loop);
    };
  }, []);
  // Position above cat, slightly diagonal
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%) rotate(-12deg)',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        fontFamily: 'Minecraft, monospace',
        fontSize: '1.2rem',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <span
        style={{
          opacity: step === 1 || step === 2 ? 1 : 0,
          transition: 'opacity 0.22s',
        }}
      >
        meow...
      </span>
      <span
        style={{
          opacity: step === 2 ? 1 : 0,
          transition: 'opacity 0.22s',
        }}
      >
        meow...
      </span>
    </div>
  );
}
