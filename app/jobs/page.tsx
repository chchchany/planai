'use client'

import { useState, useEffect, useCallback } from 'react'
import Navbar from '@/components/layout/Navbar'
import Select from '@/components/ui/Select'
import type { ApiJob } from '@/app/api/jobs/route'

/* ─── Display Job type (extends ApiJob with UI-only fields) ─── */
type Job = ApiJob & { companyLogo: string }

/* ─── Mock Data (fallback when API key not set) ─── */
const mockJobs: Job[] = [
  {
    id: '1', company: '카카오', companyLogo: '🟡',
    title: '서비스 기획자 (PM)', location: '판교', type: '정규직',
    experience: '경력 5-7년', salary: '7,000~1억', tags: ['PM', '서비스기획', '앱기획', '카카오톡'],
    source: 'mock', postedAt: '2일 전', deadline: '2026.04.10', featured: true,
    description: '카카오톡 핵심 서비스의 기획을 담당할 PM을 모집합니다. 사용자 리서치부터 출시까지 전 과정을 주도적으로 이끌어주실 분을 찾고 있습니다.',
    url: '#',
  },
  {
    id: '2', company: '토스', companyLogo: '🔵',
    title: 'Product Owner — 결제/송금', location: '강남', type: '정규직',
    experience: '경력 5-7년', salary: '8,000~1.2억', tags: ['PO', '핀테크', '결제', 'Agile'],
    source: 'mock', postedAt: '3일 전', deadline: '2026.04.15', featured: true,
    description: '토스의 결제/송금 서비스를 책임질 PO를 찾습니다. 데이터 기반의 의사결정과 팀 리딩에 강한 분을 원합니다.',
    url: '#',
  },
  {
    id: '3', company: '당근', companyLogo: '🟠',
    title: '로컬 서비스 기획자', location: '판교', type: '정규직',
    experience: '경력 2-4년', salary: '5,500~8,000', tags: ['O2O', '로컬', '커뮤니티', '서비스기획'],
    source: 'mock', postedAt: '5일 전', deadline: '2026.04.20', featured: false,
    description: '당근의 로컬 비즈니스 서비스를 기획하고 발전시켜 나갈 기획자를 모집합니다.',
    url: '#',
  },
  {
    id: '4', company: '네이버', companyLogo: '🟢',
    title: 'AI 서비스 기획자 (클로바)', location: '분당', type: '정규직',
    experience: '경력 5-7년', salary: '7,500~1.1억', tags: ['AI', 'LLM', '서비스기획', 'B2B'],
    source: 'mock', postedAt: '1일 전', deadline: '2026.04.08', featured: true,
    description: '네이버 클로바 AI 서비스의 기획을 담당할 PM을 모집합니다. AI/ML에 대한 이해와 기획 역량을 모두 갖춘 분을 찾습니다.',
    url: '#',
  },
  {
    id: '5', company: '쿠팡', companyLogo: '🔴',
    title: 'Product Manager — 물류/배송', location: '잠실', type: '정규직',
    experience: '경력 5-7년', salary: '8,000~1.2억', tags: ['이커머스', '물류', 'PM', '데이터'],
    source: 'mock', postedAt: '7일 전', deadline: '2026.04.25', featured: false,
    description: '쿠팡의 배송 서비스를 더욱 빠르고 정확하게 만들어줄 PM을 찾습니다.',
    url: '#',
  },
  {
    id: '6', company: '크래프톤', companyLogo: '⚫',
    title: '게임 서비스 기획자', location: '삼성', type: '정규직',
    experience: '경력 2-4년', salary: '5,000~7,500', tags: ['게임기획', '라이브서비스', 'RPG'],
    source: 'mock', postedAt: '4일 전', deadline: '2026.04.18', featured: false,
    description: 'PUBG 라이브 서비스 기획 및 신규 콘텐츠 설계를 담당할 기획자를 모집합니다.',
    url: '#',
  },
  {
    id: '7', company: '라인플러스', companyLogo: '🟩',
    title: 'UX 기획자 (글로벌)', location: '분당', type: '정규직',
    experience: '경력 2-4년', salary: '5,500~8,000', tags: ['UX기획', '글로벌', '메신저', '영어'],
    source: 'mock', postedAt: '6일 전', deadline: '2026.04.22', featured: false,
    description: '라인 글로벌 서비스의 UX를 기획하고 개선하는 역할을 담당합니다. 영어 커뮤니케이션 가능자 우대.',
    url: '#',
  },
  {
    id: '8', company: '야놀자', companyLogo: '🟣',
    title: 'B2B SaaS PM', location: '강남', type: '정규직',
    experience: '경력 5-7년', salary: '6,500~9,500', tags: ['SaaS', 'B2B', 'PM', '호텔테크'],
    source: 'mock', postedAt: '2일 전', deadline: '2026.04.12', featured: false,
    description: 'B2B 호텔 관리 SaaS 플랫폼의 PM을 모집합니다. 엔터프라이즈 고객을 위한 서비스 기획 경험자를 우대합니다.',
    url: '#',
  },
  {
    id: '9', company: '무신사', companyLogo: '🖤',
    title: '커머스 기획자 (앱)', location: '성수', type: '정규직',
    experience: '경력 2-4년', salary: '4,500~7,000', tags: ['커머스', '앱기획', '패션', 'UX'],
    source: 'mock', postedAt: '8일 전', deadline: '2026.04.28', featured: false,
    description: '무신사 앱의 쇼핑 경험을 개선할 커머스 기획자를 찾습니다.',
    url: '#',
  },
]

const COMPANY_LOGOS: Record<string, string> = {
  '카카오': '🟡', '토스': '🔵', '당근': '🟠', '네이버': '🟢',
  '쿠팡': '🔴', '크래프톤': '⚫', '라인': '🟩', '야놀자': '🟣',
  '무신사': '🖤', '배달의민족': '🟤', '현대': '⬜',
}

function getLogo(company: string): string {
  for (const [key, logo] of Object.entries(COMPANY_LOGOS)) {
    if (company.includes(key)) return logo
  }
  return company[0] ?? '🏢'
}

/* ─── Filter Options ─── */
const experienceOptions = [
  { value: '전체', label: '전체 경력' },
  { value: '신입', label: '신입' },
  { value: '경력', label: '경력' },
  { value: '신입·경력', label: '신입·경력' },
]
const locationOptions = [
  { value: '전체', label: '전체 지역' },
  { value: '강남', label: '강남' },
  { value: '판교', label: '판교' },
  { value: '분당', label: '분당' },
  { value: '잠실', label: '잠실' },
  { value: '성수', label: '성수' },
  { value: '서울', label: '서울' },
]
const typeOptions = [
  { value: '전체', label: '고용 형태' },
  { value: '정규직', label: '정규직' },
  { value: '계약직', label: '계약직' },
  { value: '인턴', label: '인턴' },
]

const sourceLabels: Record<string, string> = {
  saramin: '사람인',
  jobkorea: '잡코리아',
  remember: '리멤버',
  direct: '직접등록',
  mock: '샘플',
}

function sourceBadgeClass(source: string) {
  if (source === 'saramin') return 'bg-orange-50 text-orange-600 border-orange-200'
  if (source === 'jobkorea') return 'bg-blue-50 text-blue-600 border-blue-200'
  if (source === 'remember') return 'bg-purple-50 text-purple-600 border-purple-200'
  if (source === 'mock') return 'bg-gray-50 text-gray-500 border-gray-200'
  return 'bg-emerald-50 text-emerald-600 border-emerald-200'
}

export default function JobsPage() {
  const [search, setSearch] = useState('')
  const [experience, setExperience] = useState('전체')
  const [location, setLocation] = useState('전체')
  const [jobType, setJobType] = useState('전체')
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set())
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const [activeJob, setActiveJob] = useState<Job>(mockJobs[0])
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list')
  const [loading, setLoading] = useState(false)
  const [usingApi, setUsingApi] = useState(false)

  const fetchJobs = useCallback(async (keyword: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/jobs?keyword=${encodeURIComponent(keyword || 'PM 기획자')}&count=20`)
      const data = await res.json()
      if (data.jobs && data.jobs.length > 0) {
        const withLogos: Job[] = data.jobs.map((j: ApiJob) => ({
          ...j,
          companyLogo: getLogo(j.company),
        }))
        setJobs(withLogos)
        setActiveJob(withLogos[0])
        setUsingApi(true)
      }
    } catch {
      // Keep mock data on error
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchJobs('')
  }, [fetchJobs])

  // Debounced search against API
  useEffect(() => {
    if (!usingApi) return
    const timer = setTimeout(() => { fetchJobs(search) }, 600)
    return () => clearTimeout(timer)
  }, [search, usingApi, fetchJobs])

  const filtered = jobs.filter(j => {
    const matchSearch = !usingApi
      ? (search === '' || j.title.includes(search) || j.company.includes(search) || j.tags.some(t => t.includes(search)))
      : true // API handles search filtering
    const matchExp = experience === '전체' || j.experience.includes(experience)
    const matchLoc = location === '전체' || j.location.includes(location)
    const matchType = jobType === '전체' || j.type === jobType
    return matchSearch && matchExp && matchLoc && matchType
  })

  function toggleSave(id: string, e: React.MouseEvent) {
    e.stopPropagation()
    setSavedJobs(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <p className="text-indigo-200 text-sm font-semibold mb-2">💼 기획자 채용 보드</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight">기획자를 위한 채용공고</h1>
          <p className="text-indigo-200 text-sm mb-7">PM·PO·서비스기획자 포지션을 한곳에서 확인하세요.</p>

          {/* Search bar */}
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="회사명, 포지션, 기술 스택으로 검색"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white border-2 border-white focus:outline-none focus:border-purple-300 shadow-lg shadow-indigo-900/30 font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
                  <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>

          {/* API status */}
          {usingApi && (
            <p className="mt-3 text-[12px] text-indigo-300 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400"></span>
              사람인 실시간 연동 중
            </p>
          )}
        </div>
      </div>

      {/* ─── Sticky filter toolbar ─── */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2.5 h-14 overflow-x-auto" style={{scrollbarWidth:'none'}}>

            {/* Source badges */}
            <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
              {([
                ['saramin', '사람인', 'bg-orange-50 text-orange-600 border-orange-200'],
                ['jobkorea', '잡코리아', 'bg-blue-50 text-blue-600 border-blue-200'],
                ['remember', '리멤버', 'bg-purple-50 text-purple-600 border-purple-200'],
                ['direct', '직접등록', 'bg-emerald-50 text-emerald-600 border-emerald-200'],
              ] as const).map(([key, label, cls]) => (
                <span key={key} className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${cls}`}>
                  {label}
                </span>
              ))}
            </div>

            <div className="hidden sm:block w-px h-5 bg-gray-200 flex-shrink-0" />

            {/* Filter dropdowns */}
            <div className="flex items-center gap-2 flex-1">
              <Select options={experienceOptions} value={experience} onChange={setExperience} />
              <Select options={locationOptions} value={location} onChange={setLocation} />
              <Select options={typeOptions} value={jobType} onChange={setJobType} />
            </div>

            {/* Reset */}
            {(experience !== '전체' || location !== '전체' || jobType !== '전체') && (
              <button
                onClick={() => { setExperience('전체'); setLocation('전체'); setJobType('전체') }}
                className="flex-shrink-0 h-7 px-2.5 rounded-md text-[13px] text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                초기화
              </button>
            )}

            <span className="flex-shrink-0 text-[13px] text-gray-400 ml-auto">
              {loading
                ? <span className="text-purple-500">로딩 중...</span>
                : <><strong className="text-gray-700">{filtered.length}</strong>개 공고</>
              }
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

        {/* Content: list + detail */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Job list */}
          <div className={`lg:col-span-2 flex flex-col gap-2 ${mobileView === 'detail' ? 'hidden lg:flex' : ''}`}>
            {loading ? (
              <div className="flex flex-col gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 px-4 py-3.5 animate-pulse">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="h-3 bg-gray-100 rounded w-1/3 mb-1.5" />
                        <div className="h-4 bg-gray-100 rounded w-3/4" />
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="h-5 bg-gray-100 rounded w-12" />
                      <div className="h-5 bg-gray-100 rounded w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
                <p className="text-[13px] text-gray-400">조건에 맞는 공고가 없습니다.</p>
              </div>
            ) : filtered.map(job => (
              <div
                key={job.id}
                onClick={() => { setActiveJob(job); setMobileView('detail') }}
                className={`bg-white rounded-xl border px-4 py-3.5 cursor-pointer transition-all ${
                  activeJob?.id === job.id
                    ? 'border-purple-300 shadow-sm shadow-purple-100'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-base flex-shrink-0">
                      {job.companyLogo}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[12px] text-gray-400">{job.company}</span>
                        {job.featured && (
                          <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-px rounded-md">추천</span>
                        )}
                      </div>
                      <p className="text-[14px] font-semibold text-gray-900 leading-snug truncate">{job.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={e => toggleSave(job.id, e)}
                    className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                      savedJobs.has(job.id)
                        ? 'text-purple-500 bg-purple-50'
                        : 'text-gray-300 hover:text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <svg viewBox="0 0 14 16" className="w-3.5 h-3.5" fill={savedJobs.has(job.id) ? 'currentColor' : 'none'}>
                      <path d="M1 2a1 1 0 011-1h10a1 1 0 011 1v13l-6-3-6 3V2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">{job.location}</span>
                  <span className="text-[11px] text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">{job.experience}</span>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${sourceBadgeClass(job.source)}`}>
                    {sourceLabels[job.source] ?? job.source}
                  </span>
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-gray-100">
                  <span className="text-[13px] font-semibold text-gray-900">{job.salary}만원</span>
                  <span className="text-[11px] text-gray-400">~{job.deadline}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Job detail */}
          <div className={`lg:col-span-3 ${mobileView === 'list' ? 'hidden lg:block' : ''}`}>
            {activeJob ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-[88px]">

                {/* Mobile back button */}
                <button
                  onClick={() => setMobileView('list')}
                  className="lg:hidden flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 mb-4 transition-colors"
                >
                  <svg viewBox="0 0 10 10" className="w-3 h-3" fill="none"><path d="M6.5 2L3 5l3.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  공고 목록으로
                </button>

                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-5 pb-5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                      {activeJob.companyLogo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[12px] text-gray-400">{activeJob.company}</span>
                        {activeJob.featured && (
                          <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-px rounded-md">추천</span>
                        )}
                      </div>
                      <h2 className="text-[17px] font-bold text-gray-900 leading-tight">{activeJob.title}</h2>
                    </div>
                  </div>
                  <button
                    onClick={e => toggleSave(activeJob.id, e)}
                    className={`flex-shrink-0 flex items-center gap-1.5 h-8 px-3 rounded-md border text-[13px] font-medium transition-all ${
                      savedJobs.has(activeJob.id)
                        ? 'bg-purple-50 text-purple-600 border-purple-200'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <svg viewBox="0 0 14 16" className="w-3 h-3" fill={savedJobs.has(activeJob.id) ? 'currentColor' : 'none'}>
                      <path d="M1 2a1 1 0 011-1h10a1 1 0 011 1v13l-6-3-6 3V2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {savedJobs.has(activeJob.id) ? '저장됨' : '저장'}
                  </button>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[
                    { label: '근무지', value: activeJob.location },
                    { label: '고용 형태', value: activeJob.type },
                    { label: '경력', value: activeJob.experience },
                    { label: '연봉', value: `${activeJob.salary}만원` },
                    { label: '등록일', value: activeJob.postedAt },
                    { label: '마감일', value: activeJob.deadline },
                  ].map(item => (
                    <div key={item.label} className="bg-gray-50 rounded-lg px-3 py-2.5">
                      <p className="text-[11px] text-gray-400 mb-0.5">{item.label}</p>
                      <p className="text-[13px] font-semibold text-gray-800">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Source + tags */}
                <div className="flex flex-wrap items-center gap-1.5 mb-5">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${sourceBadgeClass(activeJob.source)}`}>
                    {sourceLabels[activeJob.source] ?? activeJob.source}
                  </span>
                  {activeJob.tags.map(tag => (
                    <span key={tag} className="text-[11px] text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">공고 내용</p>
                  <p className="text-[13px] text-gray-600 leading-relaxed">{activeJob.description}</p>
                </div>

                {/* CTA buttons */}
                <div className="flex gap-2">
                  <a
                    href={activeJob.url !== '#' ? activeJob.url : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-purple-600 text-white text-[13px] font-semibold h-9 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center"
                  >
                    지원하기
                  </a>
                  <button className="px-4 h-9 border border-gray-200 rounded-md text-[13px] font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                    공유하기
                  </button>
                </div>

                <p className="text-[11px] text-gray-400 text-center mt-3">
                  실제 지원 시 해당 채용 사이트로 이동합니다.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
                <p className="text-[13px] text-gray-400">공고를 선택하면 상세 내용이 표시됩니다.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
