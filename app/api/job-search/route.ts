import { NextRequest, NextResponse } from "next/server";
import { getJson } from "serpapi";

async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const location = searchParams.get("location");
    const role = searchParams.get("role");
    const type = searchParams.get("type");
    if(!role){
        return NextResponse.json({error: "role not provided"},{status: 400})
    }
    const query = `${type || ''} jobs for ${role} in ${location || ''}`

    const response = await getJson(
      {
        engine: "google_jobs",
        q: query,
        hl: "en",
        api_key: process.env.SERP_API_KEY,
      },
    //   (json) => {
    //     console.log(json["jobs_results"]);
    //   },
    );

     const data = response as any;
    const jobs = data.jobs_results || [];

    // Log the raw response for debugging
    console.log('📊 Raw response:', {
      jobs: jobs,
      totalJobs: jobs.length,
      hasSearchMetadata: !!data.search_metadata,
      hasPagination: !!data.pagination,
    });

    // Format complete job data with all available fields
    const formattedJobs = jobs.map((job: any, index: number) => ({
      // Basic Info
      id: job.job_id || `job_${Date.now()}_${index}`,
      title: job.title || 'Position',
      company: job.company_name || 'Unknown Company',
      location: job.location || 'Location not specified',
      
      // Description & Details
      description: job.description || '',
      snippet: job.snippet || '',
      
      // Application Info
      applyUrl: job.apply_url || job.related_links?.[0]?.link || null,
      applyMethod: job.apply_method || 'External',
      
      // Extensions/Additional Info
      extensions: job.detected_extensions || {},
      postedAt: job.detected_extensions?.posted_at || 'Recently',
      salary: job.detected_extensions?.salary || null,
      employmentType: job.detected_extensions?.employment_type || null,
      scheduleType: job.detected_extensions?.schedule_type || null,
      
      // Company Info
      companyLogo: job.thumbnail || null,
      companyUrl: job.company_url || null,
      companyRating: job.company_rating || null,
      companyReviewCount: job.company_review_count || null,
      
      // Job Details
      via: job.via || null,
      viaUrl: job.via_url || null,
      
      // Metadata
      source: 'Google Jobs',
      rawData: job, // Keep raw data for debugging
    }));

    return NextResponse.json({
      success: true,
      total: formattedJobs.length,
      jobs: formattedJobs,
      searchMetadata: {
        query: data.search_metadata?.query || role,
        location: data.search_metadata?.location || location,
        totalResults: data.search_information?.total_results || jobs.length,
      },
      pagination: data.pagination || null,
    });
  } catch (error) {
    return NextResponse.json({error: "internal server error " + error}, {status:500})
  }
}
