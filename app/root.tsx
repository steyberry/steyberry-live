import { motion } from "framer-motion";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router";
import { useEffect, useRef, useState } from "react";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&family=Kalam:wght@300;400;700&display=swap",
  },
  { rel: "preload", href: "/fonts/Daydream.ttf", as: "font", type: "font/ttf", crossOrigin: "anonymous" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#22c55e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Minimum width for access (e.g., iPad, desktop)
const MIN_WIDTH = 900;

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const prevPath = useRef(location.pathname);
  const [isWide, setIsWide] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= MIN_WIDTH : true);

  useEffect(() => {
    function handleResize() {
      setIsWide(window.innerWidth >= MIN_WIDTH);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen for navigation
  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      setIsFading(false);
      prevPath.current = location.pathname;
    }
  }, [location.pathname]);

  // Intercept navigation to fade out
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && (target as HTMLAnchorElement).href) {
        const url = new URL((target as HTMLAnchorElement).href);
        if (url.origin === window.location.origin && url.pathname !== location.pathname) {
          e.preventDefault();
          setIsFading(true);
          setPendingPath(url.pathname);
        }
      }
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
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
    // Overlay for small screens
    return (
      <div
        style={{
          minHeight: '100vh',
          minWidth: '100vw',
          background: 'linear-gradient(120deg, #fff0f6 0%, #ffe4ec 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Daydream, var(--font-daydream), cursive',
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
        }}
      >
        {/* Fruit sprites */}
        <div style={{ display: 'flex', gap: 32, marginBottom: 32, alignItems: 'flex-end' }}>
          <img
            src="/images/sprites/strawberry-sprite.png"
            alt="Strawberry"
            style={{ width: 72, height: 72, filter: 'drop-shadow(0 0 16px #fb7185)', userSelect: 'none' }}
            draggable={false}
          />
          <img
            src="/images/sprites/watermelon-sprite.png"
            alt="Watermelon"
            style={{ width: 72, height: 72, filter: 'drop-shadow(0 0 16px #22c55e)', userSelect: 'none' }}
            draggable={false}
          />
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#f43f5e', marginBottom: 16, textAlign: 'center', fontWeight: 700 }}>
          Please use a wider device
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#444', textAlign: 'center', maxWidth: 340, fontFamily: 'Minecraft, monospace' }}>
          Hi Tey! :) This website is best experienced on a tablet, laptop, or desktop. <br />
          Try resizing your browser or visiting from a larger device!
        </p>
      </div>
    );
  }
  return (
    <>
      <Outlet />
      {isFading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#fff',
            zIndex: 9999,
            pointerEvents: 'all',
          }}
        />
      )}
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
