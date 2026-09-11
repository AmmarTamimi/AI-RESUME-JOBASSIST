// // // app/api/jobs/search/route.ts
// // import { NextRequest, NextResponse } from "next/server";

// // export async function GET(req: NextRequest) {
// //   try {
// //     const searchParams = req.nextUrl.searchParams;
// //     const location = searchParams.get("location") || "";
// //     const role = searchParams.get("role") || "";
// //     const type = searchParams.get("type") || "";

// //     if (!role) {
// //       return NextResponse.json(
// //         { error: "role parameter is required" },
// //         { status: 400 }
// //       );
// //     }

// //     // Build the search query
// //     const query = `${type} ${role} jobs${location ? ` in ${location}` : ""}`.trim();

// //     // Check if SerpAPI key is configured
// //     if (!process.env.SERP_API_KEY) {
// //       console.error("SERP_API_KEY is not configured");
// //       // Return mock data for development
// //       return NextResponse.json({
// //         success: true,
// //         total: 0,
// //         jobs: [],
// //         searchMetadata: {
// //           query: query,
// //           location: location,
// //           totalResults: 0,
// //         },
// //         pagination: null,
// //         message: "SERP_API_KEY not configured. Please add it to your environment variables.",
// //       });
// //     }

// //     // Dynamic import for serpapi
// //     const serpapi = await import("serpapi");
// //     const response = await serpapi.getJson({
// //       engine: "google_jobs",
// //       q: query,
// //       hl: "en",
// //       api_key: process.env.SERP_API_KEY,
// //     });

// //     const data = response as any;
// //     const jobs = data.jobs_results || [];

// //     // Format complete job data with all available fields
// //     const formattedJobs = jobs.map((job: any, index: number) => ({
// //       id: job.job_id || `job_${Date.now()}_${index}`,
// //       title: job.title || "Position",
// //       company: job.company_name || "Unknown Company",
// //       location: job.location || "Location not specified",
// //       description: job.description || "",
// //       snippet: job.snippet || "",
// //       applyUrl: job.apply_url || job.related_links?.[0]?.link || null,
// //       applyMethod: job.apply_method || "External",
// //       extensions: job.detected_extensions || {},
// //       postedAt: job.detected_extensions?.posted_at || "Recently",
// //       salary: job.detected_extensions?.salary || null,
// //       employmentType: job.detected_extensions?.employment_type || null,
// //       scheduleType: job.detected_extensions?.schedule_type || null,
// //       companyLogo: job.thumbnail || null,
// //       companyUrl: job.company_url || null,
// //       companyRating: job.company_rating || null,
// //       companyReviewCount: job.company_review_count || null,
// //       via: job.via || null,
// //       viaUrl: job.via_url || null,
// //       source: "Google Jobs",
// //       rawData: job,
// //     }));

// //     return NextResponse.json({
// //       success: true,
// //       total: formattedJobs.length,
// //       jobs: formattedJobs,
// //       searchMetadata: {
// //         query: data.search_metadata?.query || query,
// //         location: data.search_metadata?.location || location,
// //         totalResults: data.search_information?.total_results || jobs.length,
// //       },
// //       pagination: data.pagination || null,
// //     });
// //   } catch (error: any) {
// //     console.error("Job search error:", error);
    
// //     // Return more detailed error for debugging
// //     return NextResponse.json(
// //       {
// //         error: "Failed to search jobs",
// //         details: error.message || "Unknown error",
// //         jobs: [],
// //         total: 0,
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }

// // app/api/jobs/search/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { fetchAllJobs } from "@/app/lib/atsAggregator";
// import { getTrackedBoards } from "@/app/lib/companyBoards"; // your curated {name, ats, token}[] list

// export async function GET(req: NextRequest) {
//   const role = req.nextUrl.searchParams.get("role") || "";
//   const location = req.nextUrl.searchParams.get("location") || "";
//   const types = (req.nextUrl.searchParams.get("type") || "").split(",").filter(Boolean);

//   const boards = await getTrackedBoards(); // pull from your DB, cached
//   const allJobs = await fetchAllJobs(boards); // from the aggregator built last round

//   const roleTerms = role.toLowerCase().split(/\s+/).filter(Boolean);
//   const filtered = allJobs.filter((job) => {
//     const haystack = `${job.title} ${job.description}`.toLowerCase();
//     const matchesRole = roleTerms.length === 0 || roleTerms.some((t) => haystack.includes(t));
//     const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
//     const matchesType = types.length === 0 || types.some((t) =>
//       (job.employmentType || "").toLowerCase().includes(t.toLowerCase())
//     );
//     return matchesRole && matchesLocation && matchesType;
//   });

//   return NextResponse.json({ jobs: filtered, total: filtered.length });
// }

// app/api/jobs/search/route.ts
// app/api/job-search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchAllGlobalJobs, type JobPosting } from "@/app/lib/globalJobSources";

const cache = new Map<string, { jobs: JobPosting[]; expires: number }>();
const CACHE_TTL_MS = 4 * 60 * 60 * 1000;

export async function GET(req: NextRequest) {
  try {
    const role = req.nextUrl.searchParams.get("role") || "";
    const location = req.nextUrl.searchParams.get("location") || "";
    const types = (req.nextUrl.searchParams.get("type") || "").split(",").filter(Boolean);

    if (!role) {
      return NextResponse.json(
        { success: false, error: "role parameter is required" },
        { status: 400 }
      );
    }

    const cacheKey = `${role}|${location}|${types.join(",")}`;
    const cached = cache.get(cacheKey);
    
    if (cached && cached.expires > Date.now()) {
      return NextResponse.json({ 
        success: true, 
        jobs: cached.jobs, 
        total: cached.jobs.length, 
        cached: true 
      });
    }

    console.log(`Fetching jobs for: ${role} in ${location}, types: ${types.join(",")}`);
    
    const globalJobs = await fetchAllGlobalJobs({ role, location, types });

    cache.set(cacheKey, { jobs: globalJobs, expires: Date.now() + CACHE_TTL_MS });

    return NextResponse.json({ 
      success: true, 
      jobs: globalJobs, 
      total: globalJobs.length 
    });
    
  } catch (error) {
    console.error("Job search API error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to search jobs",
        jobs: [],
        total: 0
      },
      { status: 500 }
    );
  }
}