'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useSmoothScroll } from '../../hooks/use-smooth-scroll';

const NAV_LINKS = [
  { label: 'Features', id: 'features' },
  { label: 'How it Works', id: 'how-it-works' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Testimonials', id: 'testimonials' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollTo = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-xl bg-background/70 border-b border-border/60'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go('top');
          }}
          className="flex items-center gap-2 group"
          aria-label="ResumeAI home"
        >
          <span className="grid place-items-center h-8 w-8 rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-4 w-4" />
          </span>
          <span className="font-semibold tracking-tight text-foreground">ResumeAI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-foreground after:transition-transform hover:after:origin-left hover:after:scale-x-100"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center rounded-lg bg-accent text-accent-foreground px-4 py-2 text-sm font-medium shadow-sm hover:opacity-90 active:scale-[0.98] transition"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="text-left text-sm text-foreground/80 hover:text-foreground py-2"
                >
                  {l.label}
                </button>
              ))}
              <div className="mt-2 flex items-center gap-3">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Sign In
                </Link>
                <Link
                  href="#"
                  className="ml-auto inline-flex items-center rounded-lg bg-accent text-accent-foreground px-4 py-2 text-sm font-medium"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}