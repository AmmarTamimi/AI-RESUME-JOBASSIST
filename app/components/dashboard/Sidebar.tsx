import { Link, useLocation } from "wouter";
import { cn } from "../../lib/utils";
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
} from "lucide-react";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

const mainNav = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Resumes", href: "/resumes", icon: FileText },
  { name: "Templates Library", href: "/templates", icon: BookOpen },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
];

const aiFeatures = [
  { name: "AI Insights", href: "/ai-insights", icon: Sparkles },
  { name: "Job Match", href: "/job-match", icon: Briefcase },
  { name: "AI Assistant", href: "/ai-assistant", icon: MessageSquare },
  { name: "Integrations", href: "/integrations", icon: Plug },
  { name: "AI Experiments", href: "/ai-experiments", icon: FlaskConical, badge: "BETA" },
];

const bottomNav = [
  { name: "Plans", href: "/plans", icon: CreditCard },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-[240px] flex-shrink-0 flex flex-col h-[100dvh] bg-sidebar border-r border-sidebar-border sticky top-0">
      <div className="p-4 flex flex-col gap-4">
        {/* Logo area */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
              <line x1="4" x2="4" y1="22" y2="15"></line>
            </svg>
          </div>
          <div>
            <h1 className="font-semibold text-foreground leading-none tracking-tight">Forma</h1>
            <p className="text-[11px] text-muted-foreground mt-0.5">Free Plan</p>
          </div>
          <button className="ml-auto text-muted-foreground hover:bg-muted p-1 rounded-md">
            <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 6.5L7.5 3.5L10.5 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.5 8.5L7.5 11.5L10.5 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search anything" 
            className="pl-9 h-9 bg-background border-input shadow-none text-sm rounded-lg"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-none">
        <nav className="flex flex-col gap-1 mb-8">
          {mainNav.map((item) => {
            const isActive = location === item.href || (location === "/" && item.href === "/templates");
            return (
              <Link key={item.name} href={item.href} className="outline-none">
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors relative group cursor-pointer",
                    isActive 
                      ? "text-primary bg-primary/5" 
                      : "text-sidebar-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-primary rounded-r-full" />
                  )}
                  <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mb-4 px-3">
          <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
            AI Features
          </h3>
        </div>
        
        <nav className="flex flex-col gap-1 mb-8">
          {aiFeatures.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href} className="outline-none">
                <div
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors relative group cursor-pointer",
                    isActive 
                      ? "text-primary bg-primary/5" 
                      : "text-sidebar-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-primary rounded-r-full" />
                  )}
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                    {item.name}
                  </div>
                  {item.badge && (
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-sidebar-border mt-auto">
        <nav className="flex flex-col gap-1 mb-4">
          {bottomNav.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href} className="outline-none">
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors relative cursor-pointer",
                    isActive 
                      ? "text-primary bg-primary/5" 
                      : "text-sidebar-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User profile */}
        <div className="flex items-center gap-3 px-3 py-2 mt-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
          <Avatar className="h-8 w-8 rounded-full border border-border">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">GS</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Gary Stewart</p>
            <p className="text-xs text-muted-foreground truncate">gary@forma.app</p>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
        </div>
      </div>
    </aside>
  );
}