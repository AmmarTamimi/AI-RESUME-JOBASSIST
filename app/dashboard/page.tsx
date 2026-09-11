"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Send, 
  Calendar, 
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Shell } from "../components/layout/Shell-temp";
import { useAuth } from "../providers/auth-provider";

export default function Dashboard() {
  const { user } = useAuth();
  
  const stats = [
    { label: "Resumes Created", value: "12", icon: FileText, trend: "+2 this week" },
    { label: "Applications Sent", value: "48", icon: Send, trend: "+5 this week" },
    { label: "Interviews", value: "3", icon: Calendar, trend: "1 upcoming" },
    { label: "Job Matches", value: "156", icon: Briefcase, trend: "+24 today" },
  ];

  const recentActivity = [
    { id: 1, title: "Sent application to Google for Senior Frontend Engineer", time: "2 hours ago", icon: Send },
    { id: 2, title: "Updated 'Modern Personal Profile' resume", time: "5 hours ago", icon: FileText },
    { id: 3, title: "New job match: Product Designer at Stripe", time: "1 day ago", icon: CheckCircle2 },
    { id: 4, title: "Interview scheduled with Netflix", time: "2 days ago", icon: Clock },
  ];

  // Get user's name from metadata or email
  const getDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'there';
  };

  const displayName = getDisplayName();

  return (
    <Shell>
      <div className="flex-1 overflow-auto bg-[#F8FAFC] dark:bg-[#0F172A] p-3 sm:p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8"
        >
          {/* Header */}
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white">
              Overview
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-[#64748B] dark:text-[#94A3B8] mt-0.5 sm:mt-1">
              Welcome back, <span className="font-semibold text-[#0F172A] dark:text-white">{displayName}</span>. Here's what's happening with your job search.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl p-3 sm:p-4 lg:p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-2 sm:mb-3 lg:mb-4">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <stat.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0F172A] dark:text-white">
                    {stat.value}
                  </h3>
                  <p className="text-[10px] sm:text-xs lg:text-sm font-medium text-[#64748B] dark:text-[#94A3B8] mt-0.5 sm:mt-1">
                    {stat.label}
                  </p>
                  <p className="text-[10px] sm:text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 sm:mt-1.5 lg:mt-2">
                    {stat.trend}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Activity Feed */}
            <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm flex flex-col">
              <h2 className="text-base sm:text-lg font-semibold text-[#0F172A] dark:text-white mb-3 sm:mb-4">
                Recent Activity
              </h2>
              <div className="flex-1 space-y-3 sm:space-y-4">
                {recentActivity.map((activity, i) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2.5 sm:gap-3 lg:gap-4 pb-3 sm:pb-4 border-b border-[#E2E8F0] dark:border-[#334155] last:border-0 last:pb-0"
                  >
                    <div className="mt-0.5 p-1.5 sm:p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 flex-shrink-0">
                      <activity.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-[#0F172A] dark:text-white leading-relaxed">
                        {activity.title}
                      </p>
                      <p className="text-[10px] sm:text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5 sm:mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI Builder CTA */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200 dark:border-blue-800/30 rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm flex flex-col items-center text-center justify-center relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-600/20 rounded-full blur-xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center w-full">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3 sm:mb-4">
                  <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#0F172A] dark:text-white mb-1 sm:mb-2">
                  Let AI build your next resume
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mb-4 sm:mb-5 lg:mb-6 max-w-xs mx-auto">
                  Our new AI agent can analyze your target jobs and craft a perfectly tailored resume in seconds.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-lg transition-colors w-full shadow-sm shadow-blue-500/25 hover:shadow-blue-500/40">
                  Try AI Builder
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Shell>
  );
}