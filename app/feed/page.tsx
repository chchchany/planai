'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

const categories = ['전체', '기획 팁', '툴 추천', '커리어', '레퍼런스']

const categoryStyle: Record<string, string> = {
  '기획 팁':  'bg-blue-50 text-blue-600',
  '툴 추천':  'bg-emerald-50 text-emerald-600',
  '커리어':   'bg-orange-50 text-orange-600',
  '레퍼런스': 'bg-violet-50 text-violet-600',
}

const posts = [
  { id: 1,  category: '기획 팁',  title: 'PRD 작성 시 놓치기 쉬운 7가지 항목',               excerpt: '실무에서 PRD를 작성하다 보면 자주 빠뜨리는 항목들이 있습니다. 특히 엣지 케이스 처리, 롤백 플랜, 성공 지표 정의 등이 빠지면 개발팀과 마찰이 생기기 쉽죠.',                                              author: '김지현', role: 'PM @ 카카오',         likes: 142, comments: 23, timeAgo: '2시간 전',  tags: ['PRD', '기획서', '문서화'] },
  { id: 2,  category: '툴 추천',  title: 'Figma에서 기획자가 꼭 알아야 할 플러그인 10선',    excerpt: '디자이너 옆에서 Figma를 열어보셨나요? 기획자도 Figma를 잘 쓰면 커뮤니케이션 비용을 크게 줄일 수 있습니다. 오늘은 기획자 관점에서 유용한 플러그인 10개를 소개합니다.',                                 author: '이수민', role: 'PO @ 토스',           likes: 98,  comments: 15, timeAgo: '5시간 전',  tags: ['Figma', '툴', '협업'] },
  { id: 3,  category: '커리어',   title: '비개발자 PM이 개발팀과 협업하는 법',                excerpt: '개발을 모르는 PM이 개발팀과 잘 협업하려면 어떻게 해야 할까요? 3년간 스타트업 CPO로 일하면서 깨달은 노하우를 공유합니다.',                                                                                author: '박성준', role: 'CPO @ 스타트업',     likes: 201, comments: 41, timeAgo: '1일 전',    tags: ['개발협업', '커리어', 'PM'] },
  { id: 4,  category: '레퍼런스', title: '2026년 국내 SaaS 기획 트렌드 분석',                 excerpt: 'AI 기능 내재화, 버티컬 SaaS 성장, PLG 전략 확산. 2026년 국내 SaaS 시장에서 기획자가 주목해야 할 트렌드 5가지를 정리했습니다.',                                                                       author: '최민준', role: '기획팀 리드 @ NHN',  likes: 87,  comments: 12, timeAgo: '2일 전',    tags: ['SaaS', '트렌드', '시장분석'] },
  { id: 5,  category: '기획 팁',  title: 'OKR 설정할 때 팀원들이 가장 많이 하는 실수',       excerpt: 'KR이 Output이 아닌 Outcome을 측정해야 한다는 건 알지만, 실제로 잘 구분하기가 어렵습니다. 실제 사례와 함께 정리해봤습니다.',                                                                              author: '정하늘', role: 'Product Lead @ 당근', likes: 165, comments: 29, timeAgo: '3일 전',    tags: ['OKR', '목표설정', '전략'] },
  { id: 6,  category: '툴 추천',  title: 'Notion AI vs ChatGPT — 기획 업무에 어느게 더 유용할까?', excerpt: '두 가지 AI 툴을 기획 업무에 3개월간 병행 사용한 후기입니다. 기획서 초안 작성, 회의록 정리, 사용자 인터뷰 분석 등 상황별로 비교해봤어요.',                                                          author: '한소연', role: 'PM @ 라인',           likes: 134, comments: 37, timeAgo: '4일 전',    tags: ['AI', 'Notion', 'ChatGPT'] },
  { id: 7,  category: '기획 팁',  title: '사용자 인터뷰 질문 설계, 이렇게 하면 실패합니다',  excerpt: '"이 기능이 유용하셨나요?"처럼 유도 질문을 던지면 인터뷰는 망합니다. 편향 없는 질문을 설계하는 법을 실제 사례로 정리했습니다.',                                                                          author: '서지은', role: 'UX Researcher @ 라인', likes: 119, comments: 18, timeAgo: '5일 전',  tags: ['사용자리서치', '인터뷰', 'UX'] },
  { id: 8,  category: '커리어',   title: '3년차 PM이 이직하면서 배운 것들',                   excerpt: '스타트업 → 대기업 이직 과정에서 겪은 시행착오를 솔직하게 공유합니다. 포트폴리오 준비부터 최종 면접까지 실제 경험담입니다.',                                                                            author: '남기훈', role: 'PM @ 배달의민족',    likes: 223, comments: 54, timeAgo: '5일 전',    tags: ['이직', '커리어', 'PM면접'] },
  { id: 9,  category: '레퍼런스', title: '글로벌 앱 온보딩 UX 20개 분석 — 패턴 정리',        excerpt: '에어비앤비, 슬랙, 피그마 등 글로벌 앱 20개의 온보딩 플로우를 분석하고 공통 패턴 8가지를 도출했습니다. 온보딩 기획 시 참고해보세요.',                                                                    author: '유채원', role: 'PO @ 크래프톤',       likes: 176, comments: 22, timeAgo: '6일 전',    tags: ['온보딩', 'UX', '레퍼런스'] },
  { id: 10, category: '툴 추천',  title: 'Jira 없이 스프린트 관리하는 법 — Linear 실사용 후기', excerpt: 'Jira가 너무 무겁다면 Linear를 써보세요. 6개월 실사용 후기와 함께 PM이 알아야 할 핵심 기능을 정리했습니다.',                                                                                             author: '오민석', role: 'PM @ 버킷플레이스',   likes: 91,  comments: 14, timeAgo: '6일 전',    tags: ['Linear', 'Jira', '애자일'] },
  { id: 11, category: '기획 팁',  title: '데이터 없이 기능 우선순위 정하는 PM이 하는 실수',  excerpt: 'RICE, ICE Score, MoSCoW. 우선순위 프레임워크는 많지만 실제로 어떻게 쓰는지 모르는 경우가 많습니다. 프레임워크 선택 기준부터 실전 적용까지 정리했습니다.',                                              author: '임수진', role: 'Product Manager @ 쏘카', likes: 148, comments: 31, timeAgo: '7일 전', tags: ['우선순위', '로드맵', '프레임워크'] },
  { id: 12, category: '커리어',   title: 'PM 포트폴리오, 뭘 담아야 할까요?',                  excerpt: '채용 담당자가 PM 포트폴리오에서 실제로 보는 것들을 정리했습니다. 결과물보다 과정을, 기능보다 임팩트를 보여주는 게 핵심입니다.',                                                                           author: '강민재', role: 'Head of Product @ 직방', likes: 267, comments: 63, timeAgo: '8일 전', tags: ['포트폴리오', '취업', '커리어'] },
  { id: 13, category: '레퍼런스', title: '토스 디자인 시스템에서 기획자가 배울 수 있는 것',  excerpt: '토스의 공개된 디자인 시스템 Toss Design을 기획 관점에서 분석했습니다. 컴포넌트 구조부터 네이밍 규칙까지, 기획서 작성에 적용할 수 있는 인사이트를 담았습니다.',                                       author: '배정희', role: 'PO @ 버블',            likes: 103, comments: 9,  timeAgo: '9일 전',    tags: ['디자인시스템', '토스', '레퍼런스'] },
  { id: 14, category: '기획 팁',  title: '스프린트 회고, 왜 맨날 같은 얘기만 나올까?',       excerpt: '"커뮤니케이션이 부족했다"는 회고는 이제 그만. 회고를 실질적인 개선으로 연결하는 구조화된 방법을 공유합니다.',                                                                                           author: '홍다연', role: 'Agile Coach @ 카카오뱅크', likes: 88, comments: 20, timeAgo: '10일 전', tags: ['회고', '애자일', '스프린트'] },
  { id: 15, category: '툴 추천',  title: 'ChatGPT로 사용자 페르소나 만드는 프롬프트 공유',   excerpt: '리서치 예산이 없을 때 ChatGPT로 가설 기반 페르소나를 빠르게 만드는 방법입니다. 실제로 쓰는 프롬프트 템플릿 3가지를 공개합니다.',                                                                       author: '전보람', role: 'PM @ 클래스101',       likes: 156, comments: 44, timeAgo: '11일 전',   tags: ['ChatGPT', '페르소나', '프롬프트'] },
  { id: 16, category: '커리어',   title: 'PO와 PM, 뭐가 다른가요? 현직자가 답합니다',        excerpt: '채용공고마다 PO와 PM을 다르게 쓰는 것 같아 헷갈리시나요? 실제로 두 역할을 모두 해본 입장에서 차이를 정리해드립니다.',                                                                                   author: '신유진', role: 'PO @ 토스뱅크',        likes: 312, comments: 78, timeAgo: '12일 전',   tags: ['PO', 'PM', '커리어'] },
  { id: 17, category: '기획 팁',  title: 'A/B 테스트 설계 시 기획자가 놓치는 3가지',         excerpt: '샘플 사이즈 계산, 테스트 기간 설정, 지표 선정. A/B 테스트를 잘못 설계하면 결과를 신뢰할 수 없습니다. 통계를 몰라도 올바르게 설계하는 법을 정리했습니다.',                                            author: '권태영', role: 'Growth PM @ 오늘의집', likes: 134, comments: 26, timeAgo: '13일 전',   tags: ['ABtest', '그로스', '데이터'] },
  { id: 18, category: '레퍼런스', title: '국내 커머스 앱 장바구니 UX 비교 분석',              excerpt: '쿠팡, 무신사, 마켓컬리, 오늘의집 — 네 앱의 장바구니 플로우를 상세히 비교했습니다. 각 앱이 선택한 UX 패턴의 이유를 추론해봤어요.',                                                                      author: '문선영', role: '서비스기획자 @ 11번가', likes: 199, comments: 35, timeAgo: '14일 전',  tags: ['커머스', 'UX분석', '장바구니'] },
  { id: 19, category: '툴 추천',  title: 'Miro vs FigJam — 워크숍 퍼실리테이션 툴 비교',    excerpt: '팀 워크숍을 준비하고 있다면 둘 중 어떤 툴을 쓸지 고민되실 겁니다. 실제 워크숍 5회를 두 툴로 진행하면서 느낀 차이를 솔직하게 정리했습니다.',                                                          author: '오서현', role: 'PM @ 컬리',            likes: 72,  comments: 11, timeAgo: '15일 전',   tags: ['Miro', 'FigJam', '워크숍'] },
  { id: 20, category: '기획 팁',  title: '신입 기획자가 첫 3개월에 꼭 해야 할 것들',         excerpt: '첫 회사에서 빠르게 신뢰를 쌓는 법, 개발팀과 관계 만드는 법, 첫 기획서 작성 전 준비해야 할 것들. 신입 기획자 3명의 경험을 인터뷰해 정리했습니다.',                                                   author: '조아영', role: 'PM @ 카카오스타일',    likes: 245, comments: 57, timeAgo: '16일 전',   tags: ['신입', '기획자', '커리어'] },
]

const popularTags = ['PRD', 'OKR', 'Figma', 'AI', '커리어', '스타트업', '협업', 'SaaS', '사용자리서치', '로드맵']

export default function FeedPage() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = posts.filter(p => {
    const matchCategory = activeCategory === '전체' || p.category === activeCategory
    const matchSearch = searchQuery === '' || p.title.includes(searchQuery) || p.excerpt.includes(searchQuery)
    return matchCategory && matchSearch
  })

  const hasFilter = activeCategory !== '전체' || searchQuery !== ''

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ─── Sticky toolbar ─── */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Row 1: search + write */}
          <div className="flex items-center gap-2 h-12 sm:hidden">
            <div className="relative flex-1">
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input type="text" placeholder="게시글 검색" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-3 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-300 transition-colors"/>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              )}
            </div>
            {hasFilter && (
              <button onClick={() => { setActiveCategory('전체'); setSearchQuery('') }}
                className="h-8 px-2.5 rounded-md text-[13px] text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0">
                초기화
              </button>
            )}
            <Link href="/feed/write" className="h-8 px-3 bg-purple-600 text-white text-[13px] font-semibold rounded-md hover:bg-purple-700 transition-colors flex items-center flex-shrink-0">
              글쓰기
            </Link>
          </div>

          {/* Row 2 (mobile): category chips */}
          <div className="sm:hidden flex items-center gap-1.5 overflow-x-auto pb-2" style={{scrollbarWidth:'none'}}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 h-7 px-3 rounded-md text-[13px] font-medium transition-all ${
                  activeCategory === cat ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Desktop: single row */}
          <div className="hidden sm:flex items-center gap-3 h-14">
            <div className="relative w-56 flex-shrink-0">
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input type="text" placeholder="게시글 검색" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-3 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-300 transition-colors"/>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              )}
            </div>
            <div className="w-px h-5 bg-gray-200 flex-shrink-0" />
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 h-7 px-3 rounded-md text-[13px] font-medium transition-all ${
                    activeCategory === cat ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {hasFilter && (
                <button onClick={() => { setActiveCategory('전체'); setSearchQuery('') }}
                  className="h-7 px-2.5 rounded-md text-[13px] text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                  초기화
                </button>
              )}
              <Link href="/feed/write" className="h-8 px-3.5 bg-purple-600 text-white text-[13px] font-semibold rounded-md hover:bg-purple-700 transition-colors flex items-center">
                글쓰기
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

        {/* Page title row */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-lg font-bold text-gray-900">커뮤니티</h1>
            <p className="text-[13px] text-gray-400 mt-0.5">{filtered.length}개의 게시글</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

          {/* ─── Post list ─── */}
          <div className="lg:col-span-2 flex flex-col gap-2.5">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
                <p className="text-[13px] text-gray-400">검색 결과가 없습니다.</p>
              </div>
            ) : filtered.map(post => (
              <Link
                key={post.id}
                href={post.id === 1 ? `/feed/${post.id}` : '#'}
                className="group block bg-white rounded-xl border border-gray-200 px-5 py-4 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                {/* Top row */}
                <div className="flex items-center gap-2 mb-2.5">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${categoryStyle[post.category]}`}>
                    {post.category}
                  </span>
                  <span className="text-[12px] text-gray-400">{post.timeAgo}</span>
                </div>

                {/* Title */}
                <h2 className="text-[15px] font-semibold text-gray-900 group-hover:text-purple-600 transition-colors leading-snug mb-1.5">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-[13px] text-gray-500 leading-relaxed mb-3 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3.5">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[11px] text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-[11px] font-bold text-purple-600">
                      {post.author[0]}
                    </div>
                    <span className="text-[12px] font-medium text-gray-700">{post.author}</span>
                    <span className="text-[12px] text-gray-400">{post.role}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[12px] text-gray-400">
                    <span className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer">
                      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none">
                        <path d="M8 13.5S2 10 2 5.5A3.5 3.5 0 018 3a3.5 3.5 0 016 2.5C14 10 8 13.5 8 13.5z" stroke="currentColor" strokeWidth="1.2"/>
                      </svg>
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none">
                        <path d="M2 3h12a1 1 0 011 1v7a1 1 0 01-1 1H5l-3 2V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/>
                      </svg>
                      {post.comments}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ─── Sidebar ─── */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-[88px]">

            {/* Popular tags */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">인기 태그</p>
              <div className="flex flex-wrap gap-1.5">
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-[12px] text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Top contributors */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">이달의 기획자</p>
              <div className="flex flex-col gap-3">
                {[
                  { name: '박성준', role: 'CPO @ 스타트업', posts: 12 },
                  { name: '김지현', role: 'PM @ 카카오', posts: 9 },
                  { name: '정하늘', role: 'Product Lead @ 당근', posts: 8 },
                ].map((u, i) => (
                  <div key={u.name} className="flex items-center gap-2.5">
                    <span className="text-[11px] font-bold text-gray-300 w-3.5 text-right">{i + 1}</span>
                    <div className="w-7 h-7 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-[11px] font-bold text-purple-500">
                      {u.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-gray-800 truncate">{u.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{u.role}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-purple-500">{u.posts}개</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Write CTA */}
            <div className="bg-gray-900 rounded-xl p-4 text-white">
              <p className="text-[13px] font-semibold mb-1">노하우를 나눠보세요</p>
              <p className="text-[12px] text-gray-400 leading-relaxed mb-3">
                나만의 기획 팁을 2,300명의 기획자와 공유하세요.
              </p>
              <Link href="/feed/write" className="w-full bg-white text-gray-900 text-[13px] font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
                글쓰기 →
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
