// app/api/jobs/search/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const location = searchParams.get("location") || "";
    const role = searchParams.get("role") || "";
    const type = searchParams.get("type") || "";

    if (!role) {
      return NextResponse.json(
        { error: "role parameter is required" },
        { status: 400 }
      );
    }

    // Build the search query
    const query = `${type} ${role} jobs${location ? ` in ${location}` : ""}`.trim();

    // Check if SerpAPI key is configured
    if (!process.env.SERP_API_KEY) {
      console.error("SERP_API_KEY is not configured");
      // Return mock data for development
      return NextResponse.json({
        success: true,
        total: 0,
        jobs: [],
        searchMetadata: {
          query: query,
          location: location,
          totalResults: 0,
        },
        pagination: null,
        message: "SERP_API_KEY not configured. Please add it to your environment variables.",
      });
    }

    // Dynamic import for serpapi
    const serpapi = await import("serpapi");
    const response = await serpapi.getJson({
      engine: "google_jobs",
      q: query,
      hl: "en",
      api_key: process.env.SERP_API_KEY,
    });

    const data = response as any;
    const jobs = data.jobs_results || [];

    // Format complete job data with all available fields
    const formattedJobs = jobs.map((job: any, index: number) => ({
      id: job.job_id || `job_${Date.now()}_${index}`,
      title: job.title || "Position",
      company: job.company_name || "Unknown Company",
      location: job.location || "Location not specified",
      description: job.description || "",
      snippet: job.snippet || "",
      applyUrl: job.apply_url || job.related_links?.[0]?.link || null,
      applyMethod: job.apply_method || "External",
      extensions: job.detected_extensions || {},
      postedAt: job.detected_extensions?.posted_at || "Recently",
      salary: job.detected_extensions?.salary || null,
      employmentType: job.detected_extensions?.employment_type || null,
      scheduleType: job.detected_extensions?.schedule_type || null,
      companyLogo: job.thumbnail || null,
      companyUrl: job.company_url || null,
      companyRating: job.company_rating || null,
      companyReviewCount: job.company_review_count || null,
      via: job.via || null,
      viaUrl: job.via_url || null,
      source: "Google Jobs",
      rawData: job,
    }));

    return NextResponse.json({
      success: true,
      total: formattedJobs.length,
      jobs: formattedJobs,
      searchMetadata: {
        query: data.search_metadata?.query || query,
        location: data.search_metadata?.location || location,
        totalResults: data.search_information?.total_results || jobs.length,
      },
      pagination: data.pagination || null,
    });
  } catch (error: any) {
    console.error("Job search error:", error);
    
    // Return more detailed error for debugging
    return NextResponse.json(
      {
        error: "Failed to search jobs",
        details: error.message || "Unknown error",
        jobs: [],
        total: 0,
      },
      { status: 500 }
    );
  }
}