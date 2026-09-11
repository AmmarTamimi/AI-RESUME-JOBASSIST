'use client';

import { useState, useEffect, useRef } from 'react';
import { User } from '@supabase/supabase-js';
import { Bell, Search, User as UserIcon, ChevronDown, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DashboardHeaderProps {
  user: User | null;
  onMenuClick?: () => void;
}

export default function DashboardHeader({ user, onMenuClick }: DashboardHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl border-b border-[#E2E8F0] dark:border-[#334155] px-3 sm:px-4 md:px-6 h-14 sm:h-16 flex items-center justify-between">
      {/* Left Section - Menu + Search */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors flex-shrink-0"
        >
          <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-[#64748B]" />
        </button>

        <div className="relative flex-1 max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
          <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search by role, industry, or style"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-7 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all placeholder:text-[#94A3B8]"
          />
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
        <button className="relative p-1.5 sm:p-2 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors">
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-[#64748B]" />
          <span className="absolute top-0.5 sm:top-1 right-0.5 sm:right-1 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#EF4444] ring-1.5 sm:ring-2 ring-white dark:ring-[#0F172A]" />
        </button>

        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors"
          >
            <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-r from-[#2563EB] to-blue-600 flex items-center justify-center text-white text-[10px] sm:text-xs md:text-sm font-semibold flex-shrink-0">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <span className="hidden sm:inline-block text-xs sm:text-sm font-medium text-[#0F172A] dark:text-white max-w-[80px] md:max-w-[120px] truncate">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
            </span>
            <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-[#64748B]" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 sm:w-52 md:w-56 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl shadow-lg py-1 z-50">
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-[#E2E8F0] dark:border-[#334155]">
                <p className="text-xs sm:text-sm font-medium text-[#0F172A] dark:text-white truncate">
                  {user?.user_metadata?.full_name || 'User'}
                </p>
                <p className="text-[10px] sm:text-xs text-[#64748B] dark:text-[#94A3B8] truncate">{user?.email}</p>
              </div>
              <button className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors">
                View Profile
              </button>
              <button className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors">
                Settings
              </button>
              <div className="border-t border-[#E2E8F0] dark:border-[#334155] mt-1 pt-1">
                <button className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[#7F1D1D]/30 transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}