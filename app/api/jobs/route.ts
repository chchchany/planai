import { NextRequest, NextResponse } from 'next/server'

export type ApiJob = {
  id: string
  company: string
  title: string
  location: string
  type: string
  experience: string
  salary: string
  tags: string[]
  source: 'saramin' | 'mock'
  postedAt: string
  deadline: string
  featured: boolean
  description: string
  url: string
}

/* ─── Saramin API response types ─── */
type SariminJob = {
  id: string
  url: string
  active: number
  company: { detail: { name: string; href: string } }
  position: {
    title: string
    location: { name: string }
    'job-type': { name: string }
    'experience-level': { name: string }
    'required-education-level': { name: string }
    industry: { name: string }
    'job-code': { value: string; name: string }
  }
  keyword: string
  salary: { name: string }
  'expiration-timestamp': string
  'posting-timestamp': string
  'modification-timestamp': string
}

function parseSariminJob(job: SariminJob): ApiJob {
  const msToAgo = (ts: string) => {
    const diff = Date.now() - parseInt(ts) * 1000
    const days = Math.floor(diff / 86400000)
    if (days === 0) return '오늘'
    if (days === 1) return '1일 전'
    return `${days}일 전`
  }

  const expDate = new Date(parseInt(job['expiration-timestamp']) * 1000)
  const deadline = `${expDate.getFullYear()}.${String(expDate.getMonth() + 1).padStart(2, '0')}.${String(expDate.getDate()).padStart(2, '0')}`

  const expName = job.position['experience-level']?.name ?? ''
  const expMap: Record<string, string> = {
    '신입': '신입',
    '경력': '경력',
    '신입·경력': '신입·경력',
    '경력무관': '경력무관',
  }

  const tags = job.keyword
    ? job.keyword.split(',').map(k => k.trim()).filter(Boolean).slice(0, 4)
    : [job.position.industry?.name ?? ''].filter(Boolean)

  return {
    id: job.id,
    company: job.company.detail.name,
    title: job.position.title,
    location: job.position.location?.name?.split(',')?.[0] ?? '',
    type: job.position['job-type']?.name ?? '정규직',
    experience: expMap[expName] ?? expName,
    salary: job.salary?.name ?? '협의',
    tags,
    source: 'saramin',
    postedAt: msToAgo(job['posting-timestamp']),
    deadline,
    featured: false,
    description: `${job.position.title} 포지션입니다. 자세한 내용은 채용 공고를 확인해주세요.`,
    url: job.url,
  }
}

/* ─── Route handler ─── */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const keyword = searchParams.get('keyword') ?? 'PM 기획자'
  const count = parseInt(searchParams.get('count') ?? '20')

  const apiKey = process.env.SARAMIN_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'SARAMIN_API_KEY가 설정되지 않았습니다.', jobs: [] },
      { status: 500 }
    )
  }

  const params = new URLSearchParams({
    'access-key': apiKey,
    keywords: keyword,
    count: String(count),
    start: '0',
    sr: 'directhire',
    'job_mid_cd': '2',      // IT/인터넷 직종
    sort: 'pd',             // 최신순
  })

  try {
    const res = await fetch(
      `https://oapi.saramin.co.kr/job-search?${params.toString()}`,
      {
        headers: { Accept: 'application/json' },
        next: { revalidate: 3600 }, // 1시간 캐시
      }
    )

    if (!res.ok) {
      throw new Error(`Saramin API error: ${res.status}`)
    }

    const data = await res.json()
    const rawJobs: SariminJob[] = data?.jobs?.job ?? []
    const jobs = rawJobs.map(parseSariminJob)

    return NextResponse.json({ jobs, total: data?.jobs?.count ?? jobs.length })
  } catch (err) {
    console.error('[jobs/route] Saramin fetch failed:', err)
    return NextResponse.json(
      { error: '채용 데이터를 불러오지 못했습니다.', jobs: [] },
      { status: 502 }
    )
  }
}
