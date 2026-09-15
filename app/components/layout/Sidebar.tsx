// 'use client';

// import { usePathname, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { cn } from '../../lib/utils';
// import { 
//   LayoutDashboard, 
//   FileText, 
//   BookOpen, 
//   BarChart2, 
//   Sparkles, 
//   Briefcase, 
//   MessageSquare, 
//   Plug, 
//   FlaskConical,
//   CreditCard,
//   HelpCircle,
//   Settings,
//   Search,
//   ChevronsUpDown,
//   LogOut,
//   X
// } from 'lucide-react';
// import { Input } from '../../components/ui/input';
// import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
// import { createClient } from '../../lib/supabase/client';
// import { useAuth } from '../../providers/auth-provider';

// const mainNav = [
//   { name: "Overview", href: "/dashboard", icon: LayoutDashboard, exact: true },
//   { name: "My Resumes", href: "/dashboard/resumes", icon: FileText },
//   { name: "Templates Library", href: "/dashboard/templates", icon: BookOpen },
//   { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
// ];

// const aiFeatures = [
//   { name: "AI Insights", href: "/dashboard/ai-insights", icon: Sparkles },
//   { name: "Job Match", href: "/dashboard/job-match", icon: Briefcase },
//   { name: "AI Assistant", href: "/dashboard/ai-assistant", icon: MessageSquare },
//   { name: "Integrations", href: "/dashboard/integrations", icon: Plug },
//   { name: "AI Experiments", href: "/dashboard/experiments", icon: FlaskConical, badge: "BETA" },
// ];

// const bottomNav = [
//   { name: "Plans", href: "/dashboard/plans", icon: CreditCard },
//   { name: "FAQ", href: "/dashboard/faq", icon: HelpCircle },
//   { name: "Settings", href: "/dashboard/settings", icon: Settings },
// ];

// interface SidebarProps {
//   onClose?: () => void;
// }

// export function Sidebar({ onClose }: SidebarProps) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { user } = useAuth();
//   const supabase = createClient();

//   const handleSignOut = async () => {
//     await supabase.auth.signOut();
//     router.push('/');
//   };

//   const isActive = (href: string, exact: boolean = false) => {
//     if (exact) {
//       return pathname === href;
//     }
//     return pathname === href || pathname?.startsWith(href + '/');
//   };

//   return (
//     <aside className="w-[280px] sm:w-[320px] lg:w-[240px] h-full flex flex-col bg-white dark:bg-[#0F172A] border-r border-[#E2E8F0] dark:border-[#334155]">
//       {/* Close button for mobile */}
//       <button
//         onClick={onClose}
//         className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors lg:hidden"
//       >
//         <X className="h-5 w-5 text-[#64748B]" />
//       </button>

//       <div className="p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
//         {/* Logo area */}
//         <div className="flex items-center gap-2 sm:gap-3">
//           <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow-sm flex-shrink-0">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
//               <line x1="4" x2="4" y1="22" y2="15"></line>
//             </svg>
//           </div>
//           <div className="min-w-0 flex-1">
//             <h1 className="text-sm sm:text-base font-semibold text-[#0F172A] dark:text-white leading-none tracking-tight truncate">
//               ResumeAI
//             </h1>
//             <p className="text-[10px] sm:text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
//               Free Plan
//             </p>
//           </div>
//         </div>

//         {/* Search */}
//         <div className="relative">
//           <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#94A3B8]" />
//           <Input 
//             placeholder="Search anything" 
//             className="pl-8 sm:pl-9 h-8 sm:h-9 bg-[#F8FAFC] dark:bg-[#1E293B] border-[#E2E8F0] dark:border-[#334155] shadow-none text-xs sm:text-sm rounded-lg focus:ring-2 focus:ring-[#2563EB] transition-all"
//           />
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto px-2 sm:px-3 py-2 scrollbar-none">
//         <nav className="flex flex-col gap-1 mb-6 sm:mb-8">
//           {mainNav.map((item) => {
//             const active = isActive(item.href, item.exact || false);
//             return (
//               <Link key={item.name} href={item.href} className="outline-none" onClick={onClose}>
//                 <div
//                   className={cn(
//                     "flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors relative group cursor-pointer",
//                     active 
//                       ? "text-[#2563EB] bg-blue-50 dark:bg-blue-900/20" 
//                       : "text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#334155] hover:text-[#0F172A] dark:hover:text-white"
//                   )}
//                 >
//                   {active && (
//                     <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#2563EB] rounded-r-full" />
//                   )}
//                   <item.icon className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0", active ? "text-[#2563EB]" : "text-[#94A3B8]")} />
//                   <span className="truncate">{item.name}</span>
//                 </div>
//               </Link>
//             );
//           })}
//         </nav>

//         <div className="mb-3 sm:mb-4 px-2 sm:px-3">
//           <h3 className="text-[10px] sm:text-xs font-semibold text-[#94A3B8] dark:text-[#64748B] tracking-wider uppercase">
//             AI Features
//           </h3>
//         </div>
        
//         <nav className="flex flex-col gap-1 mb-6 sm:mb-8">
//           {aiFeatures.map((item) => {
//             const active = isActive(item.href);
//             return (
//               <Link key={item.name} href={item.href} className="outline-none" onClick={onClose}>
//                 <div
//                   className={cn(
//                     "flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors relative group cursor-pointer",
//                     active 
//                       ? "text-[#2563EB] bg-blue-50 dark:bg-blue-900/20" 
//                       : "text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#334155] hover:text-[#0F172A] dark:hover:text-white"
//                   )}
//                 >
//                   {active && (
//                     <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#2563EB] rounded-r-full" />
//                   )}
//                   <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                     <item.icon className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0", active ? "text-[#2563EB]" : "text-[#94A3B8]")} />
//                     <span className="truncate">{item.name}</span>
//                   </div>
//                   {item.badge && (
//                     <span className="bg-blue-50 dark:bg-blue-900/30 text-[#2563EB] dark:text-blue-400 text-[8px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded-sm flex-shrink-0 ml-1">
//                       {item.badge}
//                     </span>
//                   )}
//                 </div>
//               </Link>
//             );
//           })}
//         </nav>
//       </div>

//       <div className="p-2 sm:p-3 border-t border-[#E2E8F0] dark:border-[#334155] mt-auto">
//         <nav className="flex flex-col gap-1 mb-3 sm:mb-4">
//           {bottomNav.map((item) => {
//             const active = isActive(item.href);
//             return (
//               <Link key={item.name} href={item.href} className="outline-none" onClick={onClose}>
//                 <div
//                   className={cn(
//                     "flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors relative cursor-pointer",
//                     active 
//                       ? "text-[#2563EB] bg-blue-50 dark:bg-blue-900/20" 
//                       : "text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#334155] hover:text-[#0F172A] dark:hover:text-white"
//                   )}
//                 >
//                   <item.icon className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0", active ? "text-[#2563EB]" : "text-[#94A3B8]")} />
//                   <span className="truncate">{item.name}</span>
//                 </div>
//               </Link>
//             );
//           })}
//         </nav>

//         {/* User profile */}
//         <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors cursor-pointer group">
//           <Avatar className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-[#E2E8F0] dark:border-[#334155] flex-shrink-0">
//             <AvatarFallback className="bg-blue-50 dark:bg-blue-900/20 text-[#2563EB] dark:text-blue-400 text-[10px] sm:text-xs font-semibold">
//               {user?.email?.[0]?.toUpperCase() || 'U'}
//             </AvatarFallback>
//           </Avatar>
//           <div className="flex-1 min-w-0">
//             <p className="text-xs sm:text-sm font-medium text-[#0F172A] dark:text-white truncate">
//               {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
//             </p>
//             <p className="text-[10px] sm:text-xs text-[#64748B] dark:text-[#94A3B8] truncate">
//               {user?.email || 'user@email.com'}
//             </p>
//           </div>
//           <ChevronsUpDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#94A3B8] flex-shrink-0" />
//         </div>

//         {/* Sign Out */}
//         <button
//           onClick={handleSignOut}
//           className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 mt-1 w-full rounded-md text-xs sm:text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//         >
//           <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
//           <span>Sign Out</span>
//         </button>
//       </div>
//     </aside>
//   );
// }













'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  BarChart2, 
  Sparkles, 
  Briefcase, 
  MessageSquare, 
  Plug, 
  FlaskConical,
  CreditCard,
  HelpCircle,
  Settings,
  Search,
  ChevronsUpDown,
  LogOut,
  X,
  User,
  Zap
} from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { createClient } from '../../lib/supabase/client';
import { useAuth } from '../../providers/auth-provider';

const mainNav = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard, exact: true },
  { name: "My Resumes", href: "/dashboard/resumes", icon: FileText },
  { name: "Templates Library", href: "/dashboard/templates", icon: BookOpen },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
];

const aiFeatures = [
  // { name: "AI Insights", href: "/dashboard/ai-insights", icon: Sparkles },
  { name: "Job Match", href: "/dashboard/jobs", icon: Briefcase },
  // { name: "AI Assistant", href: "/dashboard/ai-assistant", icon: MessageSquare },
  // { name: "Integrations", href: "/dashboard/integrations", icon: Plug },
  // { name: "AI Experiments", href: "/dashboard/experiments", icon: FlaskConical, badge: "BETA" },
];

const bottomNav = [
  { name: "Plans", href: "/dashboard/plans", icon: CreditCard },
  { name: "FAQ", href: "/dashboard/faq", icon: HelpCircle },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const accountMenuItems = [
  { name: "View Profile", href: "/dashboard/settings", icon: User },
  { name: "Billing & Plans", href: "/dashboard/plans", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const isActive = (href: string, exact: boolean = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname === href || pathname?.startsWith(href + '/');
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const displayEmail = user?.email || 'user@email.com';
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <aside className="w-[280px] sm:w-[320px] lg:w-[240px] h-full flex flex-col bg-white dark:bg-[#0F172A] border-r border-[#E2E8F0] dark:border-[#334155]">
      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors lg:hidden"
      >
        <X className="h-5 w-5 text-[#64748B]" />
      </button>

      <div className="p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
        {/* Logo area */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
              <line x1="4" x2="4" y1="22" y2="15"></line>
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-sm sm:text-base font-semibold text-[#0F172A] dark:text-white leading-none tracking-tight truncate">
              ResumeAI
            </h1>
            <p className="text-[10px] sm:text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
              Free Plan
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#94A3B8]" />
          <Input 
            placeholder="Search anything" 
            className="pl-8 sm:pl-9 h-8 sm:h-9 bg-[#F8FAFC] dark:bg-[#1E293B] border-[#E2E8F0] dark:border-[#334155] shadow-none text-xs sm:text-sm rounded-lg focus:ring-2 focus:ring-[#2563EB] transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 sm:px-3 py-2 scrollbar-none">
        <nav className="flex flex-col gap-1 mb-6 sm:mb-8">
          {mainNav.map((item) => {
            const active = isActive(item.href, item.exact || false);
            return (
              <Link key={item.name} href={item.href} className="outline-none" onClick={onClose}>
                <div
                  className={cn(
                    "flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors relative group cursor-pointer",
                    active 
                      ? "text-[#2563EB] bg-blue-50 dark:bg-blue-900/20" 
                      : "text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#334155] hover:text-[#0F172A] dark:hover:text-white"
                  )}
                >
                  {active && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#2563EB] rounded-r-full" />
                  )}
                  <item.icon className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0", active ? "text-[#2563EB]" : "text-[#94A3B8]")} />
                  <span className="truncate">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mb-3 sm:mb-4 px-2 sm:px-3">
          <h3 className="text-[10px] sm:text-xs font-semibold text-[#94A3B8] dark:text-[#64748B] tracking-wider uppercase">
            AI Features
          </h3>
        </div>
        
        <nav className="flex flex-col gap-1 mb-6 sm:mb-8">
          {aiFeatures.map((item) => {
            const active = isActive(item.href);
            return (
              <Link key={item.name} href={item.href} className="outline-none" onClick={onClose}>
                <div
                  className={cn(
                    "flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors relative group cursor-pointer",
                    active 
                      ? "text-[#2563EB] bg-blue-50 dark:bg-blue-900/20" 
                      : "text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#334155] hover:text-[#0F172A] dark:hover:text-white"
                  )}
                >
                  {active && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#2563EB] rounded-r-full" />
                  )}
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <item.icon className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0", active ? "text-[#2563EB]" : "text-[#94A3B8]")} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {/* {item.badge && (
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-[#2563EB] dark:text-blue-400 text-[8px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded-sm flex-shrink-0 ml-1">
                      {item.badge}
                    </span>
                  )} */}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-2 sm:p-3 border-t border-[#E2E8F0] dark:border-[#334155] mt-auto">
        <nav className="flex flex-col gap-1 mb-3 sm:mb-4">
          {bottomNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link key={item.name} href={item.href} className="outline-none" onClick={onClose}>
                <div
                  className={cn(
                    "flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors relative cursor-pointer",
                    active 
                      ? "text-[#2563EB] bg-blue-50 dark:bg-blue-900/20" 
                      : "text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#334155] hover:text-[#0F172A] dark:hover:text-white"
                  )}
                >
                  <item.icon className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0", active ? "text-[#2563EB]" : "text-[#94A3B8]")} />
                  <span className="truncate">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User profile trigger + account card */}
        <div className="relative" ref={profileRef}>
          {isProfileOpen && (
            <div
              className="absolute bottom-full left-0 right-0 mb-2 origin-bottom bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              {/* Identity header */}
              <div className="flex items-center gap-3 px-4 pt-4 pb-3.5">
                <Avatar className="h-10 w-10 rounded-full ring-2 ring-[#E2E8F0] dark:ring-[#334155] flex-shrink-0">
                  {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
                  <AvatarFallback className="bg-[#2563EB] text-white text-sm font-semibold">
                    {displayName[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#0F172A] dark:text-white truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] truncate">
                    {displayEmail}
                  </p>
                </div>
              </div>

              {/* Plan + upgrade */}
              <div className="mx-4 mb-3.5 flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155]">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-xs font-medium text-[#0F172A] dark:text-white">Free Plan</span>
                </div>
                <Link
                  href="/dashboard/plans"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors flex-shrink-0"
                >
                  <Zap className="h-3 w-3 fill-current" />
                  Upgrade
                </Link>
              </div>

              <div className="h-px bg-[#E2E8F0] dark:bg-[#334155]" />

              {/* Menu items */}
              <div className="p-1.5">
                {accountMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-[#334155] dark:text-[#CBD5E1] hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors group"
                  >
                    <span className="flex items-center justify-center h-7 w-7 rounded-md bg-[#F1F5F9] dark:bg-[#0F172A] group-hover:bg-white dark:group-hover:bg-[#1E293B] transition-colors flex-shrink-0">
                      <item.icon className="h-4 w-4 text-[#64748B] dark:text-[#94A3B8]" />
                    </span>
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="h-px bg-[#E2E8F0] dark:bg-[#334155]" />

              {/* Sign out */}
              <div className="p-1.5">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2.5 px-2.5 py-2 w-full rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
                >
                  <span className="flex items-center justify-center h-7 w-7 rounded-md bg-red-50 dark:bg-red-900/10 group-hover:bg-red-100 dark:group-hover:bg-red-900/20 transition-colors flex-shrink-0">
                    <LogOut className="h-4 w-4" />
                  </span>
                  Sign Out
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className={cn(
              "w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-colors",
              isProfileOpen ? "bg-[#F1F5F9] dark:bg-[#334155]" : "hover:bg-[#F1F5F9] dark:hover:bg-[#334155]"
            )}
          >
            <Avatar className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-[#E2E8F0] dark:border-[#334155] flex-shrink-0">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
              <AvatarFallback className="bg-blue-50 dark:bg-blue-900/20 text-[#2563EB] dark:text-blue-400 text-[10px] sm:text-xs font-semibold">
                {displayName[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs sm:text-sm font-medium text-[#0F172A] dark:text-white truncate">
                {displayName}
              </p>
              <p className="text-[10px] sm:text-xs text-[#64748B] dark:text-[#94A3B8] truncate">
                {displayEmail}
              </p>
            </div>
            <ChevronsUpDown
              className={cn(
                "h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#94A3B8] flex-shrink-0 transition-transform duration-200",
                isProfileOpen && "rotate-180"
              )}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}