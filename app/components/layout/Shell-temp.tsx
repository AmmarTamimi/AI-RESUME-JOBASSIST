'use client';

import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';

interface ShellProps {
  children: React.ReactNode;
  className?: string;
}

export function Shell({ children, className }: ShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] dark:bg-[#0F172A]">
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 z-50 h-screen transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <Sidebar onClose={closeSidebar} />
      </div>
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden sticky top-0 z-30 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl border-b border-[#E2E8F0] dark:border-[#334155] px-3 sm:px-4 py-3 flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-[#64748B]" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#2563EB] flex items-center justify-center text-white flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                <line x1="4" x2="4" y1="22" y2="15"></line>
              </svg>
            </div>
            <span className="text-sm font-semibold text-[#0F172A] dark:text-white">ResumeAI</span>
          </div>
        </div>

        {/* Page Content */}
        <div className={cn("flex-1 overflow-auto", className)}>
          {children}
        </div>
      </div>
    </div>
  );
}