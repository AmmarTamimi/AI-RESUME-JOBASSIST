// app/lib/atsAggregator.ts
interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  applyUrl: string | null;
  postedAt: string;
  salary: string | null;
  employmentType: string | null;
  source: string;
}

// Board tokens you maintain — seed manually, grow over time
interface CompanyBoard {
  name: string;
  ats: "greenhouse" | "lever" | "ashby";
  token: string; // e.g. "stripe", "leverdemo", "anthropic"
}

async function fetchGreenhouseJobs(board: CompanyBoard): Promise<JobPosting[]> {
  const res = await fetch(
    `https://boards-api.greenhouse.io/v1/boards/${board.token}/jobs?content=true`
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.jobs || []).map((j: any) => ({
    id: `gh_${j.id}`,
    title: j.title,
    company: board.name,
    location: j.location?.name || "",
    description: j.content || "",
    applyUrl: j.absolute_url,
    postedAt: j.updated_at,
    salary: null,
    employmentType: null,
    source: "Greenhouse",
  }));
}

async function fetchLeverJobs(board: CompanyBoard): Promise<JobPosting[]> {
  const res = await fetch(`https://api.lever.co/v0/postings/${board.token}?mode=json`);
  if (!res.ok) return [];
  const jobs = await res.json();
  return jobs.map((j: any) => ({
    id: `lv_${j.id}`,
    title: j.text,
    company: board.name,
    location: j.categories?.location || "",
    description: j.descriptionPlain || j.description || "",
    applyUrl: j.applyUrl,
    postedAt: new Date(j.createdAt).toISOString(),
    salary: null,
    employmentType: j.categories?.commitment || null,
    source: "Lever",
  }));
}

async function fetchAshbyJobs(board: CompanyBoard): Promise<JobPosting[]> {
  const res = await fetch(`https://api.ashbyhq.com/posting-api/job-board/${board.token}`);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.jobs || []).map((j: any) => ({
    id: `ab_${j.jobUrl}`,
    title: j.title,
    company: board.name,
    location: j.location || "",
    description: j.descriptionPlain || "",
    applyUrl: j.applyUrl,
    postedAt: j.publishedAt,
    salary: j.compensation?.scrapeableCompensationSalarySummary || null,
    employmentType: j.employmentType || null,
    source: "Ashby",
  }));
}

const FETCHERS = {
  greenhouse: fetchGreenhouseJobs,
  lever: fetchLeverJobs,
  ashby: fetchAshbyJobs,
} as const;

export async function fetchAllJobs(boards: CompanyBoard[]): Promise<JobPosting[]> {
  const results = await Promise.allSettled(
    boards.map((b) => FETCHERS[b.ats](b))
  );
  return results
    .filter((r): r is PromiseFulfilledResult<JobPosting[]> => r.status === "fulfilled")
    .flatMap((r) => r.value);
}