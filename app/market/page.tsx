'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Select from '@/components/ui/Select'

const categories = ['전체', '템플릿', '프레임워크', '리포트', '가이드', '노션']

const sortOptions = [
  { value: '추천순', label: '추천순' },
  { value: '최신순', label: '최신순' },
  { value: '판매많은순', label: '판매 많은순' },
  { value: '낮은가격순', label: '낮은 가격순' },
  { value: '높은가격순', label: '높은 가격순' },
]

const products = [
  { id: 1, emoji: '📋', title: '서비스 기획서 완성 템플릿', desc: 'PRD, 기능 명세서, 플로우차트까지 한번에 정리할 수 있는 올인원 기획서 템플릿', price: 9900, seller: '기획왕박PM', rating: 4.9, sales: 234, category: '템플릿', badge: 'BEST' },
  { id: 2, emoji: '🗺️', title: 'MVP 로드맵 프레임워크', desc: '스타트업에서 실제 사용한 MVP 우선순위 결정 프레임워크. 의사결정 속도를 3배 높여줍니다.', price: 19900, seller: 'PO마스터', rating: 4.8, sales: 156, category: '프레임워크', badge: 'NEW' },
  { id: 3, emoji: '🔍', title: '경쟁사 분석 프레임워크 (노션)', desc: '카테고리별 경쟁사를 체계적으로 분석하고 인사이트를 도출하는 노션 템플릿', price: 0, seller: '분석왕', rating: 4.5, sales: 567, category: '프레임워크', badge: '무료' },
  { id: 4, emoji: '📊', title: '2026 앱 UX 트렌드 분석 리포트', desc: '국내외 앱 200개를 분석해 정리한 2026년 UX/UI 트렌드 리포트 (PDF 42p)', price: 14900, seller: '트렌드리서처', rating: 4.7, sales: 89, category: '리포트', badge: null },
  { id: 5, emoji: '📑', title: '이해관계자 커뮤니케이션 PPT 키트', desc: '경영진용, 개발팀용, 디자인팀용 보고서 템플릿 3종 세트. 즉시 활용 가능합니다.', price: 12900, seller: '커뮤PM', rating: 4.9, sales: 312, category: '템플릿', badge: 'BEST' },
  { id: 6, emoji: '🎯', title: 'OKR 설정 가이드 & 워크시트', desc: '팀 OKR 설정부터 중간 체크인, 회고까지. 실무에서 바로 쓰는 OKR 가이드', price: 7900, seller: '전략기획자', rating: 4.6, sales: 178, category: '가이드', badge: null },
  { id: 7, emoji: '🧪', title: '사용자 인터뷰 분석 노션 DB', desc: '인터뷰 내용을 태그, 주제별로 정리하고 인사이트를 도출하는 노션 데이터베이스', price: 0, seller: '리서치킹', rating: 4.4, sales: 423, category: '노션', badge: '무료' },
  { id: 8, emoji: '📈', title: '프로덕트 지표 대시보드 템플릿', desc: 'DAU, 리텐션, 전환율 등 핵심 지표를 한눈에 볼 수 있는 구글 시트 템플릿', price: 11900, seller: '데이터PM', rating: 4.8, sales: 201, category: '템플릿', badge: null },
  { id: 9, emoji: '🤝', title: '스프린트 플래닝 완전 가이드', desc: '애자일 스프린트 플래닝부터 회고까지, 실무에서 검증된 가이드와 체크리스트', price: 8900, seller: '애자일마스터', rating: 4.5, sales: 134, category: '가이드', badge: 'NEW' },
]

const badgeStyle: Record<string, string> = {
  'BEST': 'bg-amber-50 text-amber-600 border border-amber-200',
  'NEW':  'bg-blue-50 text-blue-600 border border-blue-200',
  '무료': 'bg-emerald-50 text-emerald-600 border border-emerald-200',
}

export default function MarketPage() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [sortBy, setSortBy] = useState('추천순')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = products.filter(p => {
    const matchCategory = activeCategory === '전체' || p.category === activeCategory
    const matchSearch = searchQuery === '' || p.title.includes(searchQuery) || p.desc.includes(searchQuery)
    return matchCategory && matchSearch
  })

  const hasFilter = activeCategory !== '전체' || searchQuery !== ''

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ─── Sticky toolbar ─── */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Mobile Row 1: search + sort + upload */}
          <div className="sm:hidden flex items-center gap-2 h-12">
            <div className="relative flex-1">
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input type="text" placeholder="자료 검색" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-3 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-300 transition-colors"/>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              )}
            </div>
            <Select options={sortOptions} value={sortBy} onChange={setSortBy} />
            <button className="h-8 px-3 bg-purple-600 text-white text-[13px] font-semibold rounded-md hover:bg-purple-700 transition-colors flex-shrink-0">
              등록
            </button>
          </div>

          {/* Mobile Row 2: categories + reset */}
          <div className="sm:hidden flex items-center gap-1.5 overflow-x-auto pb-2" style={{scrollbarWidth:'none'}}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 h-7 px-3 rounded-md text-[13px] font-medium transition-all ${
                  activeCategory === cat ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}>
                {cat}
              </button>
            ))}
            {hasFilter && (
              <button onClick={() => { setActiveCategory('전체'); setSearchQuery('') }}
                className="flex-shrink-0 h-7 px-2.5 rounded-md text-[13px] text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                초기화
              </button>
            )}
          </div>

          {/* Desktop: single row */}
          <div className="hidden sm:flex items-center gap-3 h-14">
            <div className="relative w-56 flex-shrink-0">
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input type="text" placeholder="자료 검색" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-3 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-300 transition-colors"/>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              )}
            </div>
            <div className="w-px h-5 bg-gray-200 flex-shrink-0" />
            <div className="flex items-center gap-1.5 overflow-x-auto flex-1">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 h-7 px-3 rounded-md text-[13px] font-medium transition-all ${
                    activeCategory === cat ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="w-px h-5 bg-gray-200 flex-shrink-0" />
            <Select options={sortOptions} value={sortBy} onChange={setSortBy} prefix="정렬:" />
            <div className="flex items-center gap-2 flex-shrink-0">
              {hasFilter && (
                <button onClick={() => { setActiveCategory('전체'); setSearchQuery('') }}
                  className="h-7 px-2.5 rounded-md text-[13px] text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                  초기화
                </button>
              )}
              <button className="h-8 px-3.5 bg-purple-600 text-white text-[13px] font-semibold rounded-md hover:bg-purple-700 transition-colors">
                자료 등록
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-lg font-bold text-gray-900">마켓플레이스</h1>
            <p className="text-[13px] text-gray-400 mt-0.5">{filtered.length}개의 자료</p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
            <p className="text-[13px] text-gray-400">검색 결과가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(product => (
              <div key={product.id} className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer flex flex-col overflow-hidden">

                {/* Thumbnail */}
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8 flex items-center justify-center">
                  <span className="text-4xl">{product.emoji}</span>
                  {product.badge && (
                    <span className={`absolute top-2.5 right-2.5 text-[11px] font-semibold px-2 py-0.5 rounded-md ${badgeStyle[product.badge]}`}>
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[11px] font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md w-fit mb-2">
                    {product.category}
                  </span>
                  <h3 className="text-[14px] font-semibold text-gray-900 leading-snug mb-1.5 group-hover:text-purple-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-[12px] text-gray-400 leading-relaxed flex-1 mb-3 line-clamp-2">
                    {product.desc}
                  </p>

                  {/* Seller & rating */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                        {product.seller[0]}
                      </div>
                      <span className="text-[12px] text-gray-500 truncate max-w-[96px]">{product.seller}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[12px] text-gray-400">
                      <span className="text-amber-400 text-[11px]">★</span>
                      <span className="font-medium text-gray-600">{product.rating}</span>
                      <span className="text-gray-300">·</span>
                      <span>{product.sales}개</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    {product.price === 0
                      ? <span className="text-[15px] font-extrabold text-emerald-600">무료</span>
                      : <span className="text-[15px] font-extrabold text-gray-900">{product.price.toLocaleString('ko-KR')}원</span>
                    }
                    <button className={`text-[12px] font-semibold h-7 px-3 rounded-md transition-colors ${
                      product.price === 0
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}>
                      {product.price === 0 ? '다운로드' : '구매하기'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
