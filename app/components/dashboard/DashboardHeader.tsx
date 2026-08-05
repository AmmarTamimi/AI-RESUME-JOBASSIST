'use client';

import { useState } from 'react';
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

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl border-b border-[#E2E8F0] dark:border-[#334155] px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors"
        >
          <Menu className="h-5 w-5 text-[#64748B]" />
        </button>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search by role, industry, or style"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1E293B] focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors">
          <Bell className="h-5 w-5 text-[#64748B]" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#EF4444] ring-2 ring-white dark:ring-[#0F172A]" />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-accent to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <span className="hidden md:block text-sm font-medium text-[#0F172A] dark:text-white">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
            </span>
            <ChevronDown className="h-4 w-4 text-[#64748B]" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl shadow-lg py-1 z-50">
              <div className="px-4 py-3 border-b border-[#E2E8F0] dark:border-[#334155]">
                <p className="text-sm font-medium text-[#0F172A] dark:text-white">
                  {user?.user_metadata?.full_name || 'User'}
                </p>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">{user?.email}</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors">
                View Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors">
                Settings
              </button>
              <div className="border-t border-[#E2E8F0] dark:border-[#334155] mt-1 pt-1">
                <button className="w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[#7F1D1D] transition-colors">
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