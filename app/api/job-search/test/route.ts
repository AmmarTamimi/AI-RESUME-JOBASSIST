import { NextRequest, NextResponse } from 'next/server';
import { getJson } from 'serpapi';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get('keyword') || 'software engineer';
    const location = searchParams.get('location') || 'Pakistan';

    console.log('🔍 Testing SerpApi with:', { keyword, location });

    // Use SerpApi to search jobs
    const response = await new Promise((resolve, reject) => {
      getJson(
        {
          engine: 'google_jobs',
          q: `${keyword} in ${location}`,
          google_domain: 'google.com',
          hl: 'en',
          gl: location?.toLowerCase().includes('pakistan') ? 'pk' : 'us',
          api_key: process.env.SERP_API_KEY,
        },
        (json: any) => {
          if (json.error) {
            reject(new Error(json.error));
          } else {
            resolve(json);
          }
        }
      );
    });

    const data = response as any;
    const jobs = data.jobs_results || [];

    // Log the raw response for debugging
    console.log('📊 Raw response:', {
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
        query: data.search_metadata?.query || keyword,
        location: data.search_metadata?.location || location,
        totalResults: data.search_information?.total_results || jobs.length,
      },
      pagination: data.pagination || null,
    });
  } catch (error) {
    console.error('❌ Job search test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to search jobs',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}