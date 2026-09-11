// app/lib/globalJobSources.ts
export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  applyUrl: string | null;
  postedAt: string; // ISO date string for sorting
  postedAtDisplay: string; // Human-readable display
  salary: string | null;
  employmentType: string | null;
  source: string;
}

export interface JobSearchParams {
  role: string;
  location: string;
  types: string[]; // e.g. ["Remote", "Full-time"]
}

// Helper to format date for display
function formatDateDisplay(dateString: string): string {
  if (!dateString) return "Recently";
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffWeeks < 4) return `${diffWeeks}w ago`;
    if (diffMonths < 12) return `${diffMonths}mo ago`;
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return "Recently";
  }
}

// Helper to clean HTML from description
function cleanHtmlDescription(html: string): string {
  if (!html) return "";
  
  let text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  
  text = text.replace(/Find <a href="[^"]*">[^<]*<\/a> on Arbeitnow.*$/i, '');
  text = text.replace(/Jobs in [^<]* on Arbeitnow.*$/i, '');
  
  return text;
}

// Helper to parse relative date from Google Jobs
function parseRelativeDate(text?: string): string {
  if (!text) return new Date().toISOString();
  const match = text.match(/(\d+)\s+(day|week|month|hour)/i);
  if (!match) return new Date().toISOString();
  const [, num, unit] = match;
  const n = parseInt(num, 10);
  const msPerUnit: Record<string, number> = {
    hour: 3_600_000,
    day: 86_400_000,
    week: 604_800_000,
    month: 2_592_000_000,
  };
  return new Date(Date.now() - n * (msPerUnit[unit.toLowerCase()] || 0)).toISOString();
}

// Helper to get country code from location
function getCountryCode(location: string): string {
  if (!location) return "us";
  
  const loc = location.toLowerCase().trim();
  
  // Pakistan
  if (loc.includes("pakistan") || loc.includes("karachi") || loc.includes("lahore") || 
      loc.includes("islamabad") || loc.includes("rawalpindi") || loc.includes("faisalabad")) {
    return "pk";
  }
  
  // India
  if (loc.includes("india") || loc.includes("mumbai") || loc.includes("delhi") || 
      loc.includes("bangalore") || loc.includes("hyderabad") || loc.includes("chennai")) {
    return "in";
  }
  
  // United Kingdom
  if (loc.includes("uk") || loc.includes("united kingdom") || loc.includes("england") || 
      loc.includes("london") || loc.includes("manchester") || loc.includes("birmingham")) {
    return "gb";
  }
  
  // Canada
  if (loc.includes("canada") || loc.includes("toronto") || loc.includes("vancouver") || 
      loc.includes("montreal") || loc.includes("calgary")) {
    return "ca";
  }
  
  // Australia
  if (loc.includes("australia") || loc.includes("sydney") || loc.includes("melbourne") || 
      loc.includes("brisbane") || loc.includes("perth")) {
    return "au";
  }
  
  // Germany
  if (loc.includes("germany") || loc.includes("deutschland") || loc.includes("berlin") || 
      loc.includes("munich") || loc.includes("frankfurt")) {
    return "de";
  }
  
  // France
  if (loc.includes("france") || loc.includes("paris") || loc.includes("lyon")) {
    return "fr";
  }
  
  // Netherlands
  if (loc.includes("netherlands") || loc.includes("holland") || loc.includes("amsterdam")) {
    return "nl";
  }
  
  // Default to US
  return "us";
}

// Helper to get Adzuna countries based on location
function getAdzunaCountries(location: string): string[] {
  const countryCode = getCountryCode(location);
  
  // If location is in Pakistan, search Pakistan and nearby countries
  if (countryCode === "pk") {
    return ["pk", "in", "ae", "gb"];
  }
  
  // If location is specific, search that country first
  if (countryCode !== "us") {
    return [countryCode, "us", "gb"];
  }
  
  // Default: search major job markets
  return ["us", "gb", "ca", "au", "de", "in", "fr", "nl"];
}

// Helper to get location for API (remove country names)
function getLocationForAPI(location: string): string {
  if (!location) return "";
  
  const countryNames = [
    "pakistan", "india", "united states", "usa", "us", 
    "uk", "united kingdom", "canada", "germany", "france", 
    "australia", "netherlands"
  ];
  
  let clean = location;
  for (const name of countryNames) {
    clean = clean.replace(new RegExp(name, 'gi'), '').trim();
  }
  
  return clean || location;
}

// ---------------------------------------------------------------------------
// Adzuna API
// ---------------------------------------------------------------------------
async function fetchAdzunaJobs({ role, location, types }: JobSearchParams): Promise<JobPosting[]> {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  
  if (!appId || !appKey) {
    console.log("Adzuna credentials missing");
    return [];
  }

  const countries = getAdzunaCountries(location);
  console.log("Adzuna countries to search:", countries);
  
  const locationForAPI = getLocationForAPI(location);

  const requests = countries.map(async (country) => {
    try {
      const params = new URLSearchParams({
        app_id: appId,
        app_key: appKey,
        what: role,
        results_per_page: "10",
        "content-type": "application/json",
      });
      
      if (locationForAPI && !countries.includes(locationForAPI.toLowerCase())) {
        params.set("where", locationForAPI);
      }

      const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?${params}`;
      console.log(`Fetching Adzuna for ${country}...`);
      
      const res = await fetch(url);
      
      if (res.status === 429) {
        console.log(`Adzuna ${country} rate limited (429), skipping...`);
        return [];
      }
      
      if (!res.ok) {
        console.log(`Adzuna ${country} error:`, res.status);
        return [];
      }
      
      const data = await res.json();
      
      if (!data.results || data.results.length === 0) {
        console.log(`Adzuna ${country} found: 0 jobs`);
        return [];
      }

      console.log(`Adzuna ${country} found: ${data.results.length} jobs`);
      
      return data.results.map((j: any): JobPosting => {
        const postedAt = j.created || new Date().toISOString();
        return {
          id: `az_${j.id || Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          title: j.title || "Unknown Position",
          company: j.company?.display_name || j.company || "Unknown",
          location: j.location?.display_name || location || "",
          description: cleanHtmlDescription(j.description || ""),
          applyUrl: j.redirect_url || null,
          postedAt: postedAt,
          postedAtDisplay: formatDateDisplay(postedAt),
          salary: j.salary_min && j.salary_max
            ? `${Math.round(j.salary_min)}–${Math.round(j.salary_max)}`
            : null,
          employmentType: j.contract_time || null,
          source: "Adzuna",
        };
      });
    } catch (error) {
      console.error(`Adzuna ${country} error:`, error);
      return [];
    }
  });

  // Add delay between requests to avoid rate limiting
  const results = [];
  for (const request of requests) {
    const result = await request;
    results.push(result);
    if (requests.length > 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  const allJobs = results.flat();
  console.log("Adzuna total jobs found:", allJobs.length);
  return allJobs;
}

// ---------------------------------------------------------------------------
// Arbeitnow API
// ---------------------------------------------------------------------------
async function fetchArbeitnowJobs({ role, location }: JobSearchParams): Promise<JobPosting[]> {
  try {
    console.log("Fetching Arbeitnow jobs...");
    const res = await fetch(`https://www.arbeitnow.com/api/job-board-api`);
    
    if (!res.ok) {
      console.log("Arbeitnow error:", res.status);
      return [];
    }
    
    const data = await res.json();
    console.log("Arbeitnow total jobs:", data.data?.length || 0);
    
    const roleLower = role.toLowerCase();
    const locationLower = location.toLowerCase();
    
    const isPakistan = locationLower.includes("pakistan") || locationLower.includes("karachi");
    
    const filtered = (data.data || [])
      .filter((j: any) => {
        const roleMatch = !roleLower || 
          j.title?.toLowerCase().includes(roleLower) ||
          j.description?.toLowerCase().includes(roleLower);
        
        let locationMatch = true;
        if (locationLower && !isPakistan) {
          const jobLocation = (j.location || "").toLowerCase();
          const jobRemote = j.remote || false;
          locationMatch = jobLocation.includes(locationLower) || 
            (locationLower.includes("remote") && jobRemote);
        }
        
        return roleMatch && locationMatch;
      });

    console.log("Arbeitnow filtered jobs:", filtered.length);

    return filtered.map((j: any): JobPosting => {
      let description = cleanHtmlDescription(j.description || "");
      const rawDescription = j.raw_description || "";
      if (rawDescription) {
        const cleanRaw = cleanHtmlDescription(rawDescription);
        if (cleanRaw && cleanRaw.length > description.length) {
          description = cleanRaw;
        }
      }
      
      const postedAt = j.created_at ? new Date(j.created_at * 1000).toISOString() : new Date().toISOString();
      
      return {
        id: `an_${j.slug || Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        title: j.title || "Unknown Position",
        company: j.company_name || "Unknown",
        location: j.location || (j.remote ? "Remote" : ""),
        description: description,
        applyUrl: j.url || null,
        postedAt: postedAt,
        postedAtDisplay: formatDateDisplay(postedAt),
        salary: j.salary || null,
        employmentType: Array.isArray(j.job_types) ? j.job_types.join(", ") : null,
        source: "Arbeitnow",
      };
    });
  } catch (error) {
    console.error("Arbeitnow fetch error:", error);
    return [];
  }
}

// ---------------------------------------------------------------------------
// SerpAPI (Google Jobs)
// ---------------------------------------------------------------------------
async function fetchSerpApiJobs(role: string, location: string): Promise<JobPosting[]> {
  if (!process.env.SERP_API_KEY) return [];
  
  try {
    const serpapi = await import("serpapi");
    console.log("Fetching SerpAPI jobs...");
    
    const response: any = await serpapi.getJson({
      engine: "google_jobs",
      q: `${role}${location ? ` in ${location}` : ""}`.trim(),
      hl: "en",
      api_key: process.env.SERP_API_KEY,
    });
    
    const jobs = response.jobs_results || [];
    console.log("SerpAPI found:", jobs.length, "jobs");
    
    return jobs.map((job: any, i: number): JobPosting => {
      const postedAt = job.detected_extensions?.posted_at 
        ? parseRelativeDate(job.detected_extensions.posted_at)
        : new Date().toISOString();
      
      return {
        id: job.job_id || `sp_${i}_${Math.random().toString(36).substring(2, 6)}`,
        title: job.title || "Position",
        company: job.company_name || "Unknown",
        location: job.location || "",
        description: job.description || "",
        applyUrl: job.apply_url || job.related_links?.[0]?.link || null,
        postedAt: postedAt,
        postedAtDisplay: formatDateDisplay(postedAt),
        salary: job.detected_extensions?.salary || null,
        employmentType: job.detected_extensions?.employment_type || null,
        source: "Google Jobs",
      };
    });
  } catch (error) {
    console.error("SerpAPI error:", error);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Combine, dedupe, sort
// ---------------------------------------------------------------------------
function dedupe(jobs: JobPosting[]): JobPosting[] {
  const seen = new Set<string>();
  return jobs.filter((j) => {
    // Safe fallback for undefined title or company
    const title = j.title || "Unknown";
    const company = j.company || "Unknown";
    const key = `${title.toLowerCase()}|${company.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function fetchAllGlobalJobs(params: JobSearchParams): Promise<JobPosting[]> {
  console.log("Fetching all global jobs with params:", params);
  
  const [adzunaResult, arbeitnowResult, serpResult] = await Promise.allSettled([
    fetchAdzunaJobs(params),
    fetchArbeitnowJobs(params),
    fetchSerpApiJobs(params.role, params.location),
  ]);

  console.log("Adzuna result status:", adzunaResult.status);
  console.log("Arbeitnow result status:", arbeitnowResult.status);
  console.log("SerpAPI result status:", serpResult.status);

  const jobs = [
    ...(adzunaResult.status === "fulfilled" ? adzunaResult.value : []),
    ...(arbeitnowResult.status === "fulfilled" ? arbeitnowResult.value : []),
    ...(serpResult.status === "fulfilled" ? serpResult.value : []),
  ];

  console.log("Total jobs before dedupe:", jobs.length);
  const deduped = dedupe(jobs);
  console.log("Total jobs after dedupe:", deduped.length);

  return deduped.sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );
}