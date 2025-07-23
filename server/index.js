import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, useLocation, useNavigate, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&family=Kalam:wght@300;400;700&display=swap"
}, {
  rel: "preload",
  href: "/fonts/Daydream.ttf",
  as: "font",
  type: "font/ttf",
  crossOrigin: "anonymous"
}, {
  rel: "icon",
  href: "/favicon.svg",
  type: "image/svg+xml"
}, {
  rel: "icon",
  href: "/favicon.ico",
  sizes: "any"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover"
      }), /* @__PURE__ */ jsx("meta", {
        name: "theme-color",
        content: "#22c55e"
      }), /* @__PURE__ */ jsx("meta", {
        name: "apple-mobile-web-app-capable",
        content: "yes"
      }), /* @__PURE__ */ jsx("meta", {
        name: "mobile-web-app-capable",
        content: "yes"
      }), /* @__PURE__ */ jsx("meta", {
        name: "apple-mobile-web-app-status-bar-style",
        content: "default"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const MIN_WIDTH = 900;
const root = UNSAFE_withComponentProps(function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);
  const prevPath = useRef(location.pathname);
  const [isWide, setIsWide] = useState(() => typeof window !== "undefined" ? window.innerWidth >= MIN_WIDTH : true);
  useEffect(() => {
    function handleResize() {
      setIsWide(window.innerWidth >= MIN_WIDTH);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      setIsFading(false);
      prevPath.current = location.pathname;
    }
  }, [location.pathname]);
  useEffect(() => {
    const handler = (e) => {
      const target = e.target;
      if (target.tagName === "A" && target.href) {
        const url = new URL(target.href);
        if (url.origin === window.location.origin && url.pathname !== location.pathname) {
          e.preventDefault();
          setIsFading(true);
          setPendingPath(url.pathname);
        }
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [location.pathname]);
  useEffect(() => {
    if (isFading && pendingPath) {
      const timeout = setTimeout(() => {
        navigate(pendingPath);
        setPendingPath(null);
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [isFading, pendingPath, navigate]);
  if (!isWide) {
    return /* @__PURE__ */ jsxs("div", {
      style: {
        minHeight: "100vh",
        minWidth: "100vw",
        background: "linear-gradient(120deg, #fff0f6 0%, #ffe4ec 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Daydream, var(--font-daydream), cursive",
        position: "fixed",
        inset: 0,
        zIndex: 99999
      },
      children: [/* @__PURE__ */ jsxs("div", {
        style: {
          display: "flex",
          gap: 32,
          marginBottom: 32,
          alignItems: "flex-end"
        },
        children: [/* @__PURE__ */ jsx("img", {
          src: "/images/sprites/strawberry-sprite.png",
          alt: "Strawberry",
          style: {
            width: 72,
            height: 72,
            filter: "drop-shadow(0 0 16px #fb7185)",
            userSelect: "none"
          },
          draggable: false
        }), /* @__PURE__ */ jsx("img", {
          src: "/images/sprites/watermelon-sprite.png",
          alt: "Watermelon",
          style: {
            width: 72,
            height: 72,
            filter: "drop-shadow(0 0 16px #22c55e)",
            userSelect: "none"
          },
          draggable: false
        })]
      }), /* @__PURE__ */ jsx("h1", {
        style: {
          fontSize: "2.2rem",
          color: "#f43f5e",
          marginBottom: 16,
          textAlign: "center",
          fontWeight: 700
        },
        children: "Please use a wider device"
      }), /* @__PURE__ */ jsxs("p", {
        style: {
          fontSize: "1.1rem",
          color: "#444",
          textAlign: "center",
          maxWidth: 340,
          fontFamily: "Minecraft, monospace"
        },
        children: ["Hi Tey! :) This website is best experienced on a tablet, laptop, or desktop. ", /* @__PURE__ */ jsx("br", {}), "Try resizing your browser or visiting from a larger device!"]
      })]
    });
  }
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Outlet, {}), isFading && /* @__PURE__ */ jsx(motion.div, {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      },
      exit: {
        opacity: 0
      },
      transition: {
        duration: 0.35
      },
      style: {
        position: "fixed",
        inset: 0,
        background: "#fff",
        zIndex: 9999,
        pointerEvents: "all"
      }
    })]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function getRandomTilt() {
  return Math.floor(Math.random() * 17) - 8;
}
function meta$2() {
  return [{
    title: "Choose Your Fruit"
  }, {
    name: "description",
    content: "Select your fruit to begin your journey"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  const [hovered, setHovered] = useState(null);
  const [showLabel, setShowLabel] = useState(null);
  const [labelTilt, setLabelTilt] = useState(0);
  const labelTimeout = useRef(null);
  const navigate = useNavigate();
  let bgGradient = "linear-gradient(120deg, #fff 0%, #f8fafc 100%)";
  if (hovered === "strawberry") bgGradient = "linear-gradient(120deg, #fff0f6 0%, #ffe4ec 100%)";
  if (hovered === "watermelon") bgGradient = "linear-gradient(120deg, #e6f6e6 0%, #f8fff8 100%)";
  function handlePointerEnter(fruit) {
    if (labelTimeout.current) clearTimeout(labelTimeout.current);
    setHovered(fruit);
    setShowLabel(fruit);
    setLabelTilt(getRandomTilt());
  }
  function handlePointerLeave() {
    setHovered(null);
    if (labelTimeout.current) clearTimeout(labelTimeout.current);
    labelTimeout.current = setTimeout(() => setShowLabel(null), 120);
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen flex flex-col items-center justify-center relative overflow-hidden",
    children: [/* @__PURE__ */ jsx(motion.div, {
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 0,
        background: bgGradient,
        pointerEvents: "none"
      },
      animate: {
        background: bgGradient
      },
      transition: {
        duration: 0.7
      }
    }), /* @__PURE__ */ jsx(motion.h1, {
      className: "mb-16 text-4xl sm:text-5xl text-center text-green-700 relative z-10",
      style: {
        fontFamily: "Daydream, var(--font-daydream), cursive"
      },
      animate: {
        y: [0, -7, 0],
        rotate: [-1, 1, -1]
      },
      transition: {
        y: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: {
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      children: "Choose Your Fruit"
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-row items-center justify-center gap-16 md:gap-32 relative z-10",
      children: [/* @__PURE__ */ jsxs(motion.div, {
        className: "relative",
        onPointerEnter: () => handlePointerEnter("strawberry"),
        onPointerLeave: handlePointerLeave,
        onTouchStart: () => handlePointerEnter("strawberry"),
        onTouchEnd: handlePointerLeave,
        onClick: () => navigate("/steyberry"),
        tabIndex: 0,
        role: "button",
        "aria-label": "Select Strawberry",
        children: [/* @__PURE__ */ jsx(motion.img, {
          src: "/images/sprites/strawberry-sprite.png",
          alt: "Strawberry",
          className: "w-32 h-32 sm:w-40 sm:h-40 select-none",
          layoutId: "strawberry-sprite",
          initial: {
            y: 0
          },
          animate: {
            y: [0, -15, 0]
          },
          transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          },
          whileHover: {
            filter: "drop-shadow(0 0 20px rgba(244, 63, 94, 0.5)) brightness(1.1)",
            scale: 1.1
          },
          whileTap: {
            scale: 0.95
          },
          draggable: false
        }), showLabel === "strawberry" && /* @__PURE__ */ jsx(motion.div, {
          className: "absolute left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap",
          initial: {
            opacity: 0,
            scale: 0.95,
            y: 0,
            rotate: 0
          },
          animate: {
            opacity: 1,
            scale: 1,
            y: [0, -18, 0],
            rotate: [-7, 7, -7]
          },
          exit: {
            opacity: 0,
            scale: 0.95,
            y: 0,
            rotate: 0
          },
          transition: {
            opacity: {
              duration: 0.22,
              ease: "easeInOut"
            },
            scale: {
              duration: 0.22,
              ease: "easeInOut"
            },
            y: {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          },
          children: /* @__PURE__ */ jsx("span", {
            className: "text-2xl text-rose-600",
            style: {
              fontFamily: "Daydream, var(--font-daydream), cursive"
            },
            children: "Strawberry"
          })
        })]
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "relative",
        onPointerEnter: () => handlePointerEnter("watermelon"),
        onPointerLeave: handlePointerLeave,
        onTouchStart: () => handlePointerEnter("watermelon"),
        onTouchEnd: handlePointerLeave,
        onClick: () => navigate("/watermelon"),
        tabIndex: 0,
        role: "button",
        "aria-label": "Select Watermelon",
        children: [/* @__PURE__ */ jsx(motion.img, {
          src: "/images/sprites/watermelon-sprite.png",
          alt: "Watermelon",
          className: "w-32 h-32 sm:w-40 sm:h-40 select-none",
          layoutId: "watermelon-sprite",
          initial: {
            y: 0
          },
          animate: {
            y: [0, -15, 0]
          },
          transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          },
          whileHover: {
            filter: "drop-shadow(0 0 20px rgba(34, 197, 94, 0.5)) brightness(1.1)",
            scale: 1.1
          },
          whileTap: {
            scale: 0.95
          },
          draggable: false
        }), showLabel === "watermelon" && /* @__PURE__ */ jsx(motion.div, {
          className: "absolute left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap",
          initial: {
            opacity: 0,
            scale: 0.95,
            y: 0,
            rotate: 0
          },
          animate: {
            opacity: 1,
            scale: 1,
            y: [0, -18, 0],
            rotate: [-7, 7, -7]
          },
          exit: {
            opacity: 0,
            scale: 0.95,
            y: 0,
            rotate: 0
          },
          transition: {
            opacity: {
              duration: 0.22,
              ease: "easeInOut"
            },
            scale: {
              duration: 0.22,
              ease: "easeInOut"
            },
            y: {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          },
          children: /* @__PURE__ */ jsx("span", {
            className: "text-2xl text-emerald-600",
            style: {
              fontFamily: "Daydream, var(--font-daydream), cursive"
            },
            children: "Watermelon"
          })
        })]
      })]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1() {
  return [{
    title: "A Letter for Thea"
  }, {
    name: "description",
    content: "Words from the heart"
  }];
}
const watermelon = UNSAFE_withComponentProps(function Watermelon() {
  const [readingProgress, setReadingProgress] = useState(0);
  const [particles, setParticles] = useState([]);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [notification, setNotification] = useState(null);
  const recipientName = "Tey";
  const [hovered, setHovered] = useState(false);
  useRef([]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight * 100, 100);
      setReadingProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (musicEnabled) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      oscillator.type = "sine";
      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
      oscillator.start();
      return () => {
        oscillator.stop();
        audioContext.close();
      };
    }
  }, [musicEnabled]);
  useEffect(() => {
    let particleId = 0;
    const handleMouseMove = (e) => {
      if (Math.random() > 0.7) {
        const newParticle = {
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
          type: "trail"
        };
        setParticles((prev) => [...prev, newParticle]);
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 1500);
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const cuteBgElements = [{
    left: "10%",
    top: "20%",
    emoji: "💚"
  }, {
    left: "80%",
    top: "30%",
    emoji: "🍉"
  }, {
    left: "20%",
    top: "70%",
    emoji: "✨"
  }, {
    left: "60%",
    top: "80%",
    emoji: "💖"
  }, {
    left: "40%",
    top: "50%",
    emoji: "🟩"
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "gallery-bg min-h-screen flex flex-col items-center relative",
    children: [/* @__PURE__ */ jsxs("svg", {
      className: "absolute inset-0 w-full h-full z-0",
      style: {
        pointerEvents: "none",
        opacity: 0.1
      },
      width: "100%",
      height: "100%",
      xmlns: "http://www.w3.org/2000/svg",
      children: [/* @__PURE__ */ jsx("defs", {
        children: /* @__PURE__ */ jsxs("pattern", {
          id: "melonPattern",
          width: "60",
          height: "60",
          patternUnits: "userSpaceOnUse",
          children: [/* @__PURE__ */ jsx("circle", {
            cx: "15",
            cy: "15",
            r: "3",
            fill: "#22c55e"
          }), /* @__PURE__ */ jsx("circle", {
            cx: "45",
            cy: "45",
            r: "3",
            fill: "#f43f5e"
          }), /* @__PURE__ */ jsx("rect", {
            x: "28",
            y: "28",
            width: "4",
            height: "4",
            fill: "#fbbf24",
            rx: "1"
          })]
        })
      }), /* @__PURE__ */ jsx("rect", {
        width: "100%",
        height: "100%",
        fill: "url(#melonPattern)"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "relative mt-10 mb-2",
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onTouchStart: () => setHovered(true),
      onTouchEnd: () => setHovered(false),
      style: {
        zIndex: 2
      },
      children: [/* @__PURE__ */ jsx(motion.img, {
        src: "/images/sprites/watermelon-sprite.png",
        alt: "Watermelon",
        className: "w-32 h-32 sm:w-40 sm:h-40 select-none",
        animate: {
          y: [0, -15, 0]
        },
        transition: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        },
        style: {
          filter: "drop-shadow(0 0 20px rgba(34, 197, 94, 0.3))"
        },
        draggable: false,
        layoutId: "watermelon-sprite"
      }), hovered && cuteBgElements.map((el, i) => /* @__PURE__ */ jsx(motion.div, {
        className: "cute-bg-anim text-2xl sm:text-3xl",
        style: {
          left: el.left,
          top: el.top
        },
        initial: {
          opacity: 0,
          scale: 0.7
        },
        animate: {
          opacity: 1,
          scale: 1
        },
        exit: {
          opacity: 0,
          scale: 0.7
        },
        transition: {
          duration: 0.4,
          delay: i * 0.07
        },
        children: el.emoji
      }, i))]
    }), /* @__PURE__ */ jsx("h2", {
      style: {
        fontFamily: "Minecraft, monospace",
        fontSize: "1.3rem",
        margin: "32px 0 8px 0",
        color: "#047857",
        textAlign: "center",
        fontWeight: 700
      },
      children: "You chose watermelon!"
    }), /* @__PURE__ */ jsx("div", {
      className: "reading-progress",
      style: {
        fontFamily: "Minecraft, monospace"
      },
      children: /* @__PURE__ */ jsx("div", {
        className: "reading-progress-bar",
        style: {
          width: `${readingProgress}%`
        }
      })
    }), /* @__PURE__ */ jsx(motion.div, {
      className: "pixel-frame pixel-paper max-w-2xl w-full mx-auto mt-4 mb-12 bg-white/90",
      style: {
        fontFamily: "Minecraft, monospace",
        zIndex: 1
      },
      animate: {
        y: [0, -40, 0, 40, 0],
        rotate: [-2, -2.7, -2, -1.2, -2]
      },
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      },
      initial: false,
      children: /* @__PURE__ */ jsxs("div", {
        className: "p-6 sm:p-10 letter-minecraft",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl sm:text-3xl text-green-800 text-center mb-6",
          style: {
            fontFamily: "Daydream, var(--font-daydream), cursive"
          },
          children: "my unsaid words"
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-6 sm:space-y-8 text-gray-800 leading-relaxed",
          children: [/* @__PURE__ */ jsxs("p", {
            className: "text-lg sm:text-xl font-medium",
            style: {
              fontFamily: "Minecraft, monospace"
            },
            children: ["Hi ", recipientName, "!"]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-base sm:text-lg leading-relaxed",
            children: "I hope you're doing well right now. I know you are. This may seem a bit weird and unecessary, but I want to take this final opportunity to tell everything I wanted to tell for a long time now. Please lend me just a bit of your time, I will appreciate it a lot."
          }), /* @__PURE__ */ jsx("p", {
            className: "text-base sm:text-lg leading-relaxed",
            children: "This is not to open up old wounds, nor for us to be reconciled again. This is to finally tell you that I understand you. What you did was the best thing, for you and for me, and I do not deserve everything you did for me. You did the best you could, to understand, to help, to love, to be there for me. You are the best girlfriend I could have asked for, even anyone could ever with for, and me being inexperienced, took that for granted. I wasn't true to you and to myself right from the very start, from the moment I replied to your message. I knew my situation, my family, my whole life dictates that I'm no yet ready for a relationship yet, but still jumped right into it."
          }), /* @__PURE__ */ jsx("p", {
            className: "text-base sm:text-lg leading-relaxed",
            children: "I know and felt you just wanted love, Tey. You loved me so much and you showed it. I loved you just as much, but I wasn't able to show it. In reality, Tey, I wasn't that sleepyhead as you knew me to be. I'm just wasn't allowed to be on phone 'till 9 because my parents forbid me to. In reality, before, my parents had a hard time trusting me because I got in so much trouble from bad associations. I was the only problem in our relationship. I can't give you anything because I don't have anything to give in the first place, even if I wanted to."
          }), /* @__PURE__ */ jsx("p", {
            className: "text-base sm:text-lg leading-relaxed",
            children: "Kaya Tey, I'm sorry. I'm sorry for not being true to us. I'm sorry for diving into something deep, I don't even know how to swim. I'm sorry for being so over-imaginative, naive, and falsely optimistic, saying and bosting things I can't stand up to. Sorry for not being the boyfriend you envisioned me to be."
          }), /* @__PURE__ */ jsx("p", {
            className: "text-base sm:text-lg leading-relaxed",
            children: `I never had regrets na nakilala kita. Being loved by you was one of the best things I have ever experienced in my life, Tey. But if I had the chance to go back in time, I won't press the "Add Friend" button on your profile, to keep you from expriencing the disappointments.`
          }), /* @__PURE__ */ jsx("p", {
            className: "text-base sm:text-lg leading-relaxed",
            children: "All in all, Tey, after 12 longs months of constant struggle to move on. After days of reading your heartfelt letters, I realized the value of a treasure I lost. I felt joy and despair at the same time. Joy, for experiencing true, passionate love and care from someone so genuine and beautiful; despair, for now I've lost it it all, and I kinda hate myself for being the sole reaosn why. If only, we met a little further away in time, when bothh of us are ready, especially me. I can't imagine how much we could do together, for us, for Jehovah. I can't imagine how much love I could return and show to my clingy bestest girlfriend ever. How I wish."
          }), /* @__PURE__ */ jsx("p", {
            className: "text-base sm:text-lg leading-relaxed",
            children: "Nonetheless, Tey, I wish you all the best things in the world. If ever you have read my letter up to this point, I want to thank you so so much for you time. I hope you like this simple website I did. It took me months to make T_T, but it's worth it HAHA it enhanced my skills so much. As for me, I reached my goal for being a Ministerial Servant yay! I'm praying you reach every goals you set for yourself."
          }), /* @__PURE__ */ jsx("p", {
            className: "text-base sm:text-lg leading-relaxed",
            children: "To be honest, Tey, I really struggled to moved on from something that could've been perfect. It was a long painful process. That process thought me many things. Now I will be truthful to myself and others. I learned to only fill up my plate with things I can consume. Hindi ko na pipiliting pahinugin, kasi aasim."
          }), /* @__PURE__ */ jsx("div", {
            className: "text-center mb-8",
            children: /* @__PURE__ */ jsx("span", {
              className: "italic text-green-700 text-base sm:text-lg",
              style: {
                fontFamily: "Minecraft, monospace"
              },
              children: "I will forever cherish the memories we had, good and bad. Bad memories as lessons not to repeat and good memories as treasures to keep. I love you Tey, and I will forever admire and love you as long as I live. May Jehovah bless you and keep you and your family safe."
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "pt-8 border-t border-green-200/30 mt-8",
            children: [/* @__PURE__ */ jsx("p", {
              className: "text-base sm:text-lg leading-relaxed mb-4",
              children: "With love and peace,"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-green-700 text-xl sm:text-2xl lg:text-3xl font-medium transform -rotate-1",
              style: {
                fontFamily: "var(--font-handwriting)"
              },
              children: "Janzen"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col items-center mt-10 mb-2",
            style: {
              position: "relative"
            },
            children: [/* @__PURE__ */ jsx("img", {
              src: "/images/sprites/didiboi-sprite.png",
              alt: "Didiboi Sprite",
              className: "w-24 h-24 mb-2 select-none",
              draggable: false
            }), /* @__PURE__ */ jsx(FlickerMeow, {})]
          })]
        })]
      })
    }), particles.map((particle) => /* @__PURE__ */ jsx("div", {
      className: "cursor-particle",
      style: {
        left: particle.x,
        top: particle.y,
        fontFamily: "Minecraft, monospace"
      }
    }, particle.id)), notification && /* @__PURE__ */ jsx("div", {
      className: "notification-toast",
      style: {
        fontFamily: "Minecraft, monospace"
      },
      children: notification
    }), /* @__PURE__ */ jsx("div", {
      className: "fixed bottom-6 left-6 z-20",
      children: /* @__PURE__ */ jsxs(Link, {
        to: "/",
        className: "group flex items-center space-x-2 text-green-600 hover:text-green-700 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-green-50 bg-white/80 shadow",
        style: {
          fontFamily: "Minecraft, monospace"
        },
        children: [/* @__PURE__ */ jsx("span", {
          className: "text-xl",
          children: "←"
        }), /* @__PURE__ */ jsx("span", {
          className: "font-medium",
          children: "Back"
        })]
      })
    })]
  });
});
function FlickerMeow() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    let t1, t2, t3;
    t1 = setTimeout(() => setStep(1), 0);
    t2 = setTimeout(() => setStep(2), 400);
    t3 = setTimeout(() => setStep(3), 800);
    const loop = setInterval(() => {
      setStep(0);
      setTimeout(() => setStep(1), 0);
      setTimeout(() => setStep(2), 400);
      setTimeout(() => setStep(3), 800);
    }, 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(loop);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    style: {
      position: "absolute",
      bottom: "100%",
      left: "50%",
      transform: "translateX(-50%) rotate(-12deg)",
      marginBottom: "10px",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      fontFamily: "Minecraft, monospace",
      fontSize: "1.2rem",
      pointerEvents: "none",
      zIndex: 2
    },
    children: [/* @__PURE__ */ jsx("span", {
      style: {
        opacity: step === 1 || step === 2 ? 1 : 0,
        transition: "opacity 0.22s"
      },
      children: "meow..."
    }), /* @__PURE__ */ jsx("span", {
      style: {
        opacity: step === 2 ? 1 : 0,
        transition: "opacity 0.22s"
      },
      children: "meow..."
    })]
  });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: watermelon,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const images = ["/images/tey.jpg", "/images/tey2.jpg", "/images/tey3.jpg", "/images/tey4.jpg", "/images/tey5.jpg", "/images/tey6.png", "/images/tey7.png", "/images/tey8.jpg"];
function meta() {
  return [{
    title: "Steyberry Gallery"
  }, {
    name: "description",
    content: "A pixel-framed gallery for Thea (Tey)"
  }];
}
function getScatterStyle(idx) {
  const angles = [6, -8, 4, -5, 9, -7, 3, -4, 8, -6];
  const yOffsets = [8, -12, 16, -10, 12, -8, 10, -14, 6, -6];
  return {
    rotate: angles[idx % angles.length],
    y: yOffsets[idx % yOffsets.length],
    x: (idx % 2 === 0 ? 1 : -1) * (10 + idx * 7 % 18)
  };
}
function getRandomSprites(count = 28) {
  const sprites = [];
  for (let i = 0; i < count; i++) {
    sprites.push({
      top: Math.random() * 92 + "%",
      left: Math.random() * 92 + "%",
      size: 32 + Math.random() * 56,
      opacity: 0.1 + Math.random() * 0.13,
      rotate: Math.random() * 360
    });
  }
  return sprites;
}
const tiaSprites = getRandomSprites(28);
const steyberry = UNSAFE_withComponentProps(function SteyberryGallery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "gallery-bg relative",
    style: {
      fontFamily: "Minecraft, monospace",
      background: "linear-gradient(120deg, #fff0f6 0%, #ffe4ec 100%)",
      minHeight: "100vh"
    },
    children: [tiaSprites.map((sprite, i) => /* @__PURE__ */ jsx("img", {
      src: "/images/sprites/tia-sprite.png",
      alt: "Tia Sprite",
      style: {
        position: "absolute",
        top: sprite.top,
        left: sprite.left,
        width: sprite.size,
        height: sprite.size,
        opacity: sprite.opacity,
        pointerEvents: "none",
        zIndex: 0,
        transform: `rotate(${sprite.rotate}deg)`
      },
      draggable: false
    }, i)), /* @__PURE__ */ jsx("div", {
      className: "relative mt-10 mb-2 flex justify-center",
      children: /* @__PURE__ */ jsx(motion.img, {
        src: "/images/sprites/strawberry-sprite.png",
        alt: "Strawberry",
        className: "w-32 h-32 sm:w-40 sm:h-40 select-none",
        style: {
          filter: "drop-shadow(0 0 20px rgba(244, 63, 94, 0.3))"
        },
        draggable: false,
        layoutId: "strawberry-sprite"
      })
    }), /* @__PURE__ */ jsxs("svg", {
      className: "absolute inset-0 w-full h-full z-0",
      style: {
        pointerEvents: "none",
        opacity: 0.13
      },
      width: "100%",
      height: "100%",
      xmlns: "http://www.w3.org/2000/svg",
      children: [/* @__PURE__ */ jsx("defs", {
        children: /* @__PURE__ */ jsxs("pattern", {
          id: "berryPattern",
          width: "48",
          height: "48",
          patternUnits: "userSpaceOnUse",
          children: [/* @__PURE__ */ jsx("circle", {
            cx: "12",
            cy: "12",
            r: "2.5",
            fill: "#f43f5e"
          }), /* @__PURE__ */ jsx("circle", {
            cx: "36",
            cy: "36",
            r: "2.5",
            fill: "#fb7185"
          }), /* @__PURE__ */ jsx("rect", {
            x: "22",
            y: "22",
            width: "4",
            height: "4",
            fill: "#fbbf24",
            rx: "1"
          })]
        })
      }), /* @__PURE__ */ jsx("rect", {
        width: "100%",
        height: "100%",
        fill: "url(#berryPattern)"
      })]
    }), /* @__PURE__ */ jsx("h2", {
      style: {
        fontFamily: "Minecraft, monospace",
        fontSize: "1.3rem",
        margin: "32px 0 8px 0",
        color: "#f43f5e",
        textAlign: "center",
        fontWeight: 700
      },
      children: "You chose strawberry!"
    }), /* @__PURE__ */ jsx("div", {
      className: "gallery-grid",
      style: {
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)"
      },
      children: (() => {
        const gridItems = Array(9).fill(null);
        const imgOrder = [...images];
        let imgIdx = 0;
        for (let i = 0; i < 9; i++) {
          if (i === 4) {
            gridItems[i] = "__LETTER_CARD__";
          } else if (imgIdx < imgOrder.length) {
            gridItems[i] = imgOrder[imgIdx++];
          } else {
            gridItems[i] = null;
          }
        }
        return gridItems.map((item, idx) => {
          if (item === "__LETTER_CARD__") {
            return /* @__PURE__ */ jsxs("div", {
              style: {
                background: "linear-gradient(120deg, #fff0f6 0%, #ffe4ec 100%)",
                border: "3px solid #fb7185",
                borderRadius: 16,
                boxShadow: "0 4px 24px 0 rgba(251, 113, 133, 0.13), 0 0 0 2px #fda4af",
                padding: "28px 32px",
                minWidth: 260,
                maxWidth: 340,
                textAlign: "center",
                fontFamily: "Minecraft, monospace",
                margin: "0 auto",
                zIndex: 3,
                position: "relative"
              },
              children: [/* @__PURE__ */ jsxs("div", {
                style: {
                  fontFamily: "Daydream, var(--font-daydream), cursive",
                  fontSize: "1.3rem",
                  color: "#fb7185",
                  marginBottom: 10,
                  fontWeight: 700
                },
                children: ["Thank you, Tey ", /* @__PURE__ */ jsx("span", {
                  role: "img",
                  "aria-label": "heart",
                  children: "❤️"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                style: {
                  fontSize: "1.05rem",
                  color: "#444",
                  lineHeight: 1.6
                },
                children: ["For all the sweet memories, the laughter, and the inspiration you brought. Take care! ", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
                  style: {
                    color: "#fb7185",
                    fontWeight: 600
                  },
                  children: "I hope you like this berry special gallery ❤️ "
                })]
              }), /* @__PURE__ */ jsx("div", {
                style: {
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 18
                },
                children: /* @__PURE__ */ jsx("img", {
                  src: "/images/sprites/tia-sprite.png",
                  alt: "Tia Sprite",
                  style: {
                    width: 100,
                    height: 100,
                    imageRendering: "pixelated",
                    filter: "drop-shadow(0 0 8px #fb7185)"
                  },
                  draggable: false
                })
              })]
            }, "letter-card");
          } else if (item) {
            const scatter = getScatterStyle(idx > 4 ? idx - 1 : idx);
            return /* @__PURE__ */ jsx(motion.div, {
              className: "pixel-frame",
              style: {
                fontFamily: "Minecraft, monospace",
                background: "repeating-linear-gradient(135deg, #fb7185 0 4px, #fff 4px 8px)",
                border: "4px solid #fb7185",
                borderRadius: "18px",
                boxShadow: "0 8px 32px 0 rgba(251, 113, 133, 0.13), 0 0 0 2px #fda4af",
                padding: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "box-shadow 0.3s, transform 0.2s",
                zIndex: 2
              },
              animate: {
                y: [scatter.y, scatter.y + 10, scatter.y],
                x: [scatter.x, scatter.x + 5 * (idx % 2 === 0 ? 1 : -1), scatter.x],
                rotate: [scatter.rotate, scatter.rotate + 2, scatter.rotate]
              },
              transition: {
                duration: 4 + idx % 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              },
              children: /* @__PURE__ */ jsx("img", {
                src: item,
                alt: `Gallery ${idx + 1}`,
                className: "gallery-img",
                style: {
                  fontFamily: "Minecraft, monospace"
                }
              })
            }, item);
          } else {
            return /* @__PURE__ */ jsx("div", {}, `empty-${idx}`);
          }
        });
      })()
    }), /* @__PURE__ */ jsx("div", {
      className: "fixed bottom-6 left-6 z-20",
      children: /* @__PURE__ */ jsxs(Link, {
        to: "/",
        className: "group flex items-center space-x-2 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-pink-50 bg-white/80 shadow",
        style: {
          fontFamily: "Minecraft, monospace",
          color: "#fb7185"
        },
        children: [/* @__PURE__ */ jsx("span", {
          className: "text-xl",
          style: {
            color: "#fb7185"
          },
          children: "←"
        }), /* @__PURE__ */ jsx("span", {
          className: "font-medium",
          style: {
            color: "#fb7185"
          },
          children: "Back"
        })]
      })
    }), /* @__PURE__ */ jsx("style", {
      children: `
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
      `
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: steyberry,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/steyberry-liveassets/entry.client-DUCbNMHX.js", "imports": ["/steyberry-liveassets/chunk-QMGIS6GS-Cs1iYqoQ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/steyberry-liveassets/root-DKQ0dHv0.js", "imports": ["/steyberry-liveassets/chunk-QMGIS6GS-Cs1iYqoQ.js", "/steyberry-liveassets/proxy-CDp8eBti.js"], "css": ["/steyberry-liveassets/root-B25PW4nM.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/steyberry-liveassets/home-BppHyVIA.js", "imports": ["/steyberry-liveassets/chunk-QMGIS6GS-Cs1iYqoQ.js", "/steyberry-liveassets/proxy-CDp8eBti.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/watermelon": { "id": "routes/watermelon", "parentId": "root", "path": "watermelon", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/steyberry-liveassets/watermelon-7znYNRmy.js", "imports": ["/steyberry-liveassets/chunk-QMGIS6GS-Cs1iYqoQ.js", "/steyberry-liveassets/proxy-CDp8eBti.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/steyberry": { "id": "routes/steyberry", "parentId": "root", "path": "steyberry", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/steyberry-liveassets/steyberry-CjlbxX4-.js", "imports": ["/steyberry-liveassets/chunk-QMGIS6GS-Cs1iYqoQ.js", "/steyberry-liveassets/proxy-CDp8eBti.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/steyberry-liveassets/manifest-59bca44b.js", "version": "59bca44b", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/steyberry-live";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/watermelon": {
    id: "routes/watermelon",
    parentId: "root",
    path: "watermelon",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/steyberry": {
    id: "routes/steyberry",
    parentId: "root",
    path: "steyberry",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
