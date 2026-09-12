"use client"
import { Shell } from "../../components/layout/Shell-temp";
import { motion } from "framer-motion";
import { Briefcase, MapPin, DollarSign, Building } from "lucide-react";
import { Button } from "../../components/ui/button";

const matches = [
  {
    id: 1,
    company: "Stripe",
    role: "Frontend Engineer, Dashboard",
    matchScore: 94,
    location: "San Francisco, CA (Hybrid)",
    salary: "$160k - $210k",
    type: "Full-time",
  },
  {
    id: 2,
    company: "Vercel",
    role: "Senior Design Engineer",
    matchScore: 89,
    location: "Remote (US)",
    salary: "$180k - $240k",
    type: "Full-time",
  },
  {
    id: 3,
    company: "Linear",
    role: "Software Engineer, Frontend",
    matchScore: 85,
    location: "Remote (Global)",
    salary: "$150k - $190k",
    type: "Full-time",
  },
  {
    id: 4,
    company: "Airbnb",
    role: "UI Engineer",
    matchScore: 82,
    location: "Seattle, WA (On-site)",
    salary: "$170k - $220k",
    type: "Full-time",
  },
];

export default function jobs() {
  return (
    <Shell>
      <div className="flex-1 overflow-auto bg-background p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="flex items-center justify-between border-b border-border pb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Job Match</h1>
              <p className="text-muted-foreground">AI-curated opportunities that fit your profile and preferences.</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Target Role</p>
              <p className="text-sm text-primary">Senior Frontend Engineer</p>
            </div>
          </div>

          <div className="space-y-4">
            {matches.map((job) => (
              <div key={job.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center border border-border">
                      <Building className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground leading-none mb-1">{job.role}</h3>
                      <p className="text-sm text-muted-foreground font-medium">{job.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <DollarSign className="h-3.5 w-3.5" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Briefcase className="h-3.5 w-3.5" />
                      {job.type}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 shrink-0 border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-6">
                  <div className="flex flex-col items-center">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" className="stroke-muted" strokeWidth="3" />
                        <circle 
                          cx="18" cy="18" r="16" 
                          fill="none" 
                          className="stroke-primary" 
                          strokeWidth="3" 
                          strokeDasharray="100" 
                          strokeDashoffset={100 - job.matchScore} 
                          strokeLinecap="round" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
                        {job.matchScore}%
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1">Match</span>
                  </div>
                  <Button className="w-full sm:w-auto">View & Apply</Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Shell>
  );
}
