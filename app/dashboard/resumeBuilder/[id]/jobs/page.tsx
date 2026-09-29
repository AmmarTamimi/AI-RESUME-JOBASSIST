"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  ArrowLeft,
  Loader2,
  Briefcase,
  Filter,
  X,
  Building,
  Calendar,
  DollarSign,
  Globe,
  ExternalLink,
  Clock,
  Star,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Resume } from "@/app/types/Content";
import { getResumeById } from "@/app/lib/supabase/resume";

const JOB_TYPES = [
  "Remote",
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const;

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  snippet: string;
  applyUrl: string | null;
  applyMethod: string;
  extensions: any;
  postedAt: string;
  postedAtDisplay: string;
  salary: string | null;
  employmentType: string | null;
  scheduleType: string | null;
  companyLogo: string | null;
  companyUrl: string | null;
  companyRating: number | null;
  companyReviewCount: number | null;
  via: string | null;
  viaUrl: string | null;
  source: string;
}

function DescriptionRenderer({ text }: { text: string }) {
  const normalized = text
    // 1. Split on "About X" / "About The Role" style headers
    .replace(/([a-z.,])(About\s+[A-Z][a-zA-Z\s]{2,30}?)(?=[A-Z])/g, "$1\n\n$2\n")
    // 2. Split on common section headers: "Requirements", "Responsibilities", etc.
    .replace(/([a-z.,])(Must-Have|Good-to-Have|Responsibilities|Requirements|Qualifications|Preferred|Key Responsibilities|What You Will|What You Bring|Benefits|About The Role|About Us|Job Summary|Experience:|Employment Type:|Location:)/g, "$1\n\n$2\n")
    // 3. Split on inline bullets: " • " or " - " surrounded by spaces
    .replace(/\s+[•·]\s+/g, "\n• ")
    .replace(/\s+-\s+(?=[A-Z])/g, "\n• ")
    // 4. Split on sentence boundaries when followed by a capital letter starting a new clause
    //    (only in longer runs — avoids splitting "U.S." etc.)
    .replace(/([.!?])\s+(?=[A-Z][a-z]{3,})/g, "$1\n")
    // 5. Clean up extra whitespace
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const lines = normalized
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  return (
    <div className="space-y-2 text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
      {lines.map((line, i) => {
        // Bullet: starts with •, -, *, or a numbered list marker
        const bulletMatch = line.match(/^([•\-*]|\d+\.)\s+(.*)$/);
        if (bulletMatch) {
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span className="text-[#2563EB] dark:text-[#60A5FA] shrink-0 mt-[2px]">
                •
              </span>
              <span className="flex-1">{bulletMatch[2]}</span>
            </div>
          );
        }

        // Section header: line is short, no period at the end, and ends with ':' or is ALL CAPS-ish
        const isHeader =
          line.length < 60 &&
          !line.endsWith(".") &&
          (line.endsWith(":") ||
            /^[A-Z][A-Za-z\s&/]+$/.test(line) ||
            /^(About|Responsibilities|Requirements|Qualifications|Skills|Experience|What|Who|Why|Benefits|Job Summary|Must-Have|Good-to-Have|Key Responsibilities|Preferred)/i.test(
              line,
            ));

        if (isHeader) {
          return (
            <h4
              key={i}
              className="text-sm font-semibold text-[#0F172A] dark:text-white pt-2 first:pt-0"
            >
              {line}
            </h4>
          );
        }

        // Regular paragraph
        return (
          <p key={i} className="text-sm">
            {line}
          </p>
        );
      })}
    </div>
  );
}

export default function JobsPage() {
  const { id } = useParams<{ id: string }>();
  const hasResume = id && id !== 'new'
  const router = useRouter();

  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Full-time"]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [resume, setResume] = useState<Resume>();

  const filteredJobs = useMemo(() => {
  if (selectedTypes.length === 0) return jobs;

  return jobs.filter((job) => {
    // Combine all type signals we have for this job
    const typeText = [
      job.employmentType || "",
      job.extensions?.employment_type || "",
      job.extensions?.schedule_type || "",
      job.location || "",
    ]
      .join(" ")
      .toLowerCase();

    return selectedTypes.some((type) => {
      const t = type.toLowerCase();

      // Remote is special — check the location text too
      if (t === "remote") {
        return typeText.includes("remote");
      }

      // Full-time / full time / fulltime
      if (t === "full-time") {
        return (
          typeText.includes("full-time") ||
          typeText.includes("full time") ||
          typeText.includes("fulltime") ||
          typeText.includes("full_time")
        );
      }

      // Part-time
      if (t === "part-time") {
        return (
          typeText.includes("part-time") ||
          typeText.includes("part time") ||
          typeText.includes("parttime") ||
          typeText.includes("part_time")
        );
      }

      // Contract
      if (t === "contract") {
        return (
          typeText.includes("contract") ||
          typeText.includes("contractor") ||
          typeText.includes("freelance")
        );
      }

      // Internship
      if (t === "internship") {
        return (
          typeText.includes("intern") ||
          typeText.includes("internship")
        );
      }

      return typeText.includes(t);
    });
  });
}, [jobs, selectedTypes]);

  // Load resume data
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResumeById(id);
        console.log("resume: ", data);
        if (!data) {
          console.log("resume not fetched");
          return;
        }
        setResume(data);
        const title = data?.content.personalInfo.title || "";
        const location = data?.content.personalInfo.location || "";
        console.log("fields fetched from resume ", title, location);
        setRole(title);
        setLocation(location);
        setSelectedTypes(["Full-time"]);
      } catch (error) {
        console.log("Failed to fetch resume ", error);
      }
    };
    if (hasResume){
      fetchResume();
    }
   
  }, [id]);

  const toggleType = (type: string) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );

  const clearFilters = () => {
    setRole(resume?.content.personalInfo.title || "");
    setLocation(resume?.content.personalInfo.location || "");
    setSelectedTypes(["Full-time"]);
  };

  const search = async () => {
    setIsLoading(true);
    setHasSearched(true);
    setSelectedJob(null);
    console.log("sending data: ", role, location, selectedTypes);
    try {
      const params = new URLSearchParams({
        role,
        location,
        type: selectedTypes.join(","),
      });
      const res = await fetch(`/api/job-search?${params}`);
      const data = await res.json();
      console.log("Jobs response: ", data);
      setJobs(data.jobs || []);
    } catch (err) {
      console.error("Job search failed:", err);
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-search on mount with pre-filled values
  // useEffect(() => {
  //   if (role || location) {
  //     const timer = setTimeout(() => {
  //       search();
  //     }, 300);
  //     return () => clearTimeout(timer);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // // Auto-search on filter change with debounce
  // useEffect(() => {
  //   if (!role && !location) return;
  //   const timer = setTimeout(() => {
  //     search();
  //   }, 500);
  //   return () => clearTimeout(timer);
  // }, [role, location, selectedTypes, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#F1F5F9] dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#0F172A] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={()=>{
            hasResume ? router.push(`/dashboard/resumeBuilder/${id}/complete`) : router.push(`/dashboard/`)
          }}
          className="group flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-white mb-6 transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>{hasResume ? "Back to resume": "Back"}</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-[#2563EB]/10 dark:bg-[#2563EB]/20">
              <Briefcase className="h-6 w-6 text-[#2563EB]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight">
              Find Your Next Role
            </h1>
          </div>
          <p className="text-sm md:text-base text-[#64748B] dark:text-[#94A3B8] ml-12">
            Discover opportunities that match your skills and experience
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-xl border border-[#E2E8F0] dark:border-[#334155] rounded-2xl p-5 md:p-6 mb-6 shadow-lg shadow-[#0F172A]/5 dark:shadow-none"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Job title (e.g. Product Designer)"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all duration-200 placeholder:text-[#94A3B8]"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location (e.g. San Francisco, CA)"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-all duration-200 placeholder:text-[#94A3B8]"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#64748B] dark:text-[#94A3B8] bg-[#F1F5F9] dark:bg-[#0F172A] rounded-lg hover:bg-[#E2E8F0] dark:hover:bg-[#334155] transition-colors"
            >
              <Filter className="h-3.5 w-3.5" />
              Filters
              {selectedTypes.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-[#2563EB] text-white rounded-full">
                  {selectedTypes.length}
                </span>
              )}
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[#E2E8F0] dark:border-[#334155]">
                    {JOB_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                          selectedTypes.includes(type)
                            ? "bg-[#2563EB] text-white border-[#2563EB] shadow-lg shadow-[#2563EB]/25"
                            : "bg-white dark:bg-[#0F172A] text-[#64748B] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#334155] hover:border-[#2563EB] hover:text-[#2563EB]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                    {selectedTypes.length > 0 && (
                      <button
                        onClick={clearFilters}
                        className="px-3 py-1.5 text-xs font-medium text-[#EF4444] hover:bg-[#EF4444]/10 rounded-full transition-colors"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={search}
                disabled={isLoading}
                className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] rounded-xl transition-all duration-200 shadow-lg shadow-[#2563EB]/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin inline" />
                ) : (
                  "Search Jobs"
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Layout - 2 columns */}
        <div className="flex gap-6">
          {/* Left Column - Job Listings */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {hasSearched && !isLoading && filteredJobs.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-16"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F1F5F9] dark:bg-[#1E293B] mb-4">
                    <Briefcase className="h-8 w-8 text-[#94A3B8]" />
                  </div>
                  <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                    No jobs found — try adjusting your filters.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <AnimatePresence>
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedJob(job)}
                    className={`group block bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-sm border rounded-2xl p-4 hover:shadow-xl hover:shadow-[#0F172A]/10 dark:hover:shadow-[#0F172A]/50 transition-all duration-300 cursor-pointer ${
                      selectedJob?.id === job.id
                        ? "border-[#2563EB] shadow-lg shadow-[#2563EB]/10"
                        : "border-[#E2E8F0] dark:border-[#334155] hover:border-[#2563EB]/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {job.companyLogo ? (
                          <img
                            src={job.companyLogo}
                            alt={job.company}
                            className="w-12 h-12 rounded-xl object-cover bg-[#F1F5F9] dark:bg-[#0F172A]"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#1D4ED8]/10 dark:from-[#2563EB]/20 dark:to-[#1D4ED8]/20 flex items-center justify-center">
                            <Building className="h-6 w-6 text-[#2563EB]" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors truncate">
                          {job.title}
                        </h3>
                        <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                          {job.company}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-[#E2E8F0] dark:bg-[#334155]" />
                          <span className="px-2 py-0.5 bg-[#F1F5F9] dark:bg-[#0F172A] rounded-full">
                            {job.employmentType ||
                              job.extensions?.employment_type ||
                              "Full-time"}
                          </span>
                          {job.salary && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-[#E2E8F0] dark:bg-[#334155]" />
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                {job.salary}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Loading state */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center py-16"
              >
                <div className="flex items-center gap-3 text-[#64748B] dark:text-[#94A3B8]">
                  <Loader2 className="h-6 w-6 animate-spin text-[#2563EB]" />
                  <span>Finding the best matches for you...</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Job Details */}
          <div className="w-[45%] hidden lg:block">
            <div className="sticky top-4">
              {selectedJob ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-sm border border-[#E2E8F0] dark:border-[#334155] rounded-2xl p-6 max-h-[calc(100vh-200px)] overflow-y-auto"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {selectedJob.companyLogo ? (
                      <img
                        src={selectedJob.companyLogo}
                        alt={selectedJob.company}
                        className="w-16 h-16 rounded-xl object-cover bg-[#F1F5F9] dark:bg-[#0F172A]"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#1D4ED8]/10 dark:from-[#2563EB]/20 dark:to-[#1D4ED8]/20 flex items-center justify-center">
                        <Building className="h-8 w-8 text-[#2563EB]" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold text-[#0F172A] dark:text-white">
                        {selectedJob.title}
                      </h2>
                      <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                        {selectedJob.company}
                      </p>
                      {selectedJob.companyRating && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium text-[#0F172A] dark:text-white">
                            {selectedJob.companyRating}
                          </span>
                          {selectedJob.companyReviewCount && (
                            <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                              ({selectedJob.companyReviewCount} reviews)
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-[#F1F5F9] dark:bg-[#0F172A] rounded-full text-[#64748B] dark:text-[#94A3B8]">
                      <MapPin className="h-3 w-3" />
                      {selectedJob.location}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-[#F1F5F9] dark:bg-[#0F172A] rounded-full text-[#64748B] dark:text-[#94A3B8]">
                      <Clock className="h-3 w-3" />
                      {selectedJob.postedAtDisplay || "Recently"}
                    </span>
                    {selectedJob.salary && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-[#F1F5F9] dark:bg-[#0F172A] rounded-full text-[#64748B] dark:text-[#94A3B8]">
                        <DollarSign className="h-3 w-3" />
                        {selectedJob.salary}
                      </span>
                    )}
                    {selectedJob.employmentType && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-[#F1F5F9] dark:bg-[#0F172A] rounded-full text-[#64748B] dark:text-[#94A3B8]">
                        <Briefcase className="h-3 w-3" />
                        {selectedJob.employmentType}
                      </span>
                    )}
                  </div>

                  {selectedJob.description && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-[#0F172A] dark:text-white mb-3">
                        Description
                      </h3>
                      <DescriptionRenderer text={selectedJob.description} />
                    </div>
                  )}

                  {selectedJob.snippet && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-[#0F172A] dark:text-white mb-2">
                        Overview
                      </h3>
                      <p className="text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                        {selectedJob.snippet}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 pt-4 border-t border-[#E2E8F0] dark:border-[#334155]">
                    {selectedJob.applyUrl && (
                      <a
                        href={selectedJob.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] rounded-xl transition-all duration-200 shadow-lg shadow-[#2563EB]/25"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Apply Now
                      </a>
                    )}
                    {selectedJob.via && (
                      <span className="text-xs text-[#64748B] dark:text-[#94A3B8] flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        via {selectedJob.via}
                      </span>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-sm border border-[#E2E8F0] dark:border-[#334155] rounded-2xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F1F5F9] dark:bg-[#0F172A] mb-4">
                    <Briefcase className="h-8 w-8 text-[#94A3B8]" />
                  </div>
                  <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                    Select a job to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
