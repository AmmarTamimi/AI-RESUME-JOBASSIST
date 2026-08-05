
"use client"
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

export default function Dashboard() {
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

  return (
    <Shell>
      <div className="flex-1 overflow-auto bg-background p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-6xl mx-auto space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Overview</h1>
            <p className="text-muted-foreground">Welcome back, Gary. Here's what's happening with your job search.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-1">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-2">{stat.trend}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
              <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
              <div className="flex-1">
                {recentActivity.map((activity, i) => (
                  <div key={activity.id} className="flex items-start gap-4 mb-6 last:mb-0">
                    <div className="mt-0.5 p-2 bg-muted rounded-full text-muted-foreground">
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 shadow-sm flex flex-col items-center text-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-tr-full blur-xl pointer-events-none" />
              
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Let AI build your next resume</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Our new AI agent can analyze your target jobs and craft a perfectly tailored resume in seconds.
              </p>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-6 py-2.5 rounded-md transition-colors w-full">
                Try AI Builder
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Shell>
  );
}
