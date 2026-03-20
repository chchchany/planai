'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

/* ─── Mock Data ─── */
const recentPosts = [
  { id: 1, category: '기획 팁', categoryColor: 'bg-blue-100 text-blue-700', title: 'PRD 작성 시 놓치기 쉬운 7가지 항목', author: '김지현', role: 'PM @ 카카오', likes: 142, comments: 23, timeAgo: '2시간 전' },
  { id: 2, category: '툴 추천', categoryColor: 'bg-green-100 text-green-700', title: 'Figma에서 기획자가 꼭 알아야 할 플러그인 10선', author: '이수민', role: 'PO @ 토스', likes: 98, comments: 15, timeAgo: '5시간 전' },
  { id: 3, category: '커리어', categoryColor: 'bg-orange-100 text-orange-700', title: '비개발자 PM이 개발팀과 협업하는 법', author: '박성준', role: 'CPO @ 스타트업', likes: 201, comments: 41, timeAgo: '1일 전' },
]

const featuredProducts = [
  { id: 1, emoji: '📋', title: '서비스 기획서 완성 템플릿', price: 9900, seller: '기획왕박PM', rating: 4.9, sales: 234 },
  { id: 2, emoji: '🗺️', title: 'MVP 로드맵 프레임워크', price: 19900, seller: 'PO마스터', rating: 4.8, sales: 156 },
  { id: 3, emoji: '🔍', title: '경쟁사 분석 프레임워크 (노션)', price: 0, seller: '분석왕', rating: 4.5, sales: 567 },
]

const featuredJobs = [
  { id: 1, company: '카카오', logo: '🟡', title: '서비스 기획자 (PM)', location: '판교', salary: '7,000~1억', experience: '경력 5-7년' },
  { id: 2, company: '토스', logo: '🔵', title: 'Product Owner', location: '강남', salary: '8,000~1.2억', experience: '경력 5-7년' },
  { id: 3, company: '당근', logo: '🟠', title: '로컬 서비스 기획자', location: '판교', salary: '5,500~8,000', experience: '경력 2-4년' },
]

const stats = [
  { value: '2,300+', label: '활성 기획자' },
  { value: '5,800+', label: '커뮤니티 게시글' },
  { value: '320+', label: '마켓 자료' },
  { value: '4.9', label: '평균 평점' },
]

const features = [
  { href: '/feed', emoji: '💬', title: '커뮤니티', desc: '실무 팁, 노하우, 레퍼런스를 기획자끼리 자유롭게 나눠요.', color: 'from-blue-500 to-indigo-600', light: 'bg-blue-50 text-blue-600' },
  { href: '/market', emoji: '🛍️', title: '마켓플레이스', desc: '검증된 템플릿과 프레임워크를 사고팔아요.', color: 'from-purple-500 to-violet-600', light: 'bg-purple-50 text-purple-600' },
  { href: '/jobs', emoji: '💼', title: '채용 보드', desc: 'PM·PO·서비스기획자 포지션을 한 곳에서 확인해요.', color: 'from-indigo-500 to-blue-600', light: 'bg-indigo-50 text-indigo-600' },
]

const testimonials = [
  { name: '김지현', role: 'PM @ 카카오', text: '기획서 초안 작성에 하루 걸리던 게 2시간으로 줄었어요. 커뮤니티 덕분에 혼자서 고민하는 시간이 확실히 줄었습니다.' },
  { name: '박성준', role: 'CPO @ 스타트업', text: '이해관계자마다 다른 보고서를 만들던 시간이 사라졌어요. 마켓플레이스에서 구한 템플릿 하나로 팀 효율이 달라졌습니다.' },
  { name: '이수민', role: 'PO @ 토스', text: '경쟁사 분석 프레임워크를 마켓에서 구매했는데, 전략 회의 퀄리티가 확실히 올라갔어요.' },
]

export default function HomePage() {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const items = document.querySelectorAll('.reveal-item')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const siblings = [...entry.target.parentElement!.querySelectorAll('.reveal-item')]
        const idx = siblings.indexOf(entry.target as HTMLElement)
        ;(entry.target as HTMLElement).style.transitionDelay = `${idx * 0.08}s`
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12 })
    items.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .reveal-item { opacity: 0; transform: translateY(28px); }
        .reveal-item.revealed { opacity: 1; transform: translateY(0); transition: opacity 0.55s ease, transform 0.55s ease; }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes glow-pulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.9;transform:scale(1.08)} }
        .glow-orb { animation: glow-pulse 7s ease-in-out infinite; }
        .glow-orb-2 { animation: glow-pulse 9s ease-in-out infinite 3s; }
        .float-badge { animation: floatY 3s ease-in-out infinite; }
        .float-badge-2 { animation: floatY 3.5s ease-in-out infinite 1s; }
        .hero-gradient { background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,92,246,.35) 0%, transparent 70%), linear-gradient(160deg, #0f0b2e 0%, #1a1040 50%, #0f172a 100%); }
        .grid-pattern { background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px); background-size: 48px 48px; }
        .feature-card-hover { transition: transform .25s, box-shadow .25s; }
        .feature-card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(108,99,255,.15); }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* ─── HERO ─── */}
        <section className="hero-gradient relative overflow-hidden min-h-[80vh] sm:min-h-[92vh] flex items-center">
          <div className="grid-pattern absolute inset-0" />

          {/* Glow orbs */}
          <div className="glow-orb absolute top-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[100px] pointer-events-none" />
          <div className="glow-orb-2 absolute bottom-0 right-[-100px] w-[400px] h-[400px] rounded-full bg-indigo-500/15 blur-[80px] pointer-events-none" />

          {/* Floating badges */}
          <div className="float-badge hidden lg:flex absolute top-32 right-16 items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 text-white text-sm font-medium shadow-xl">
            <span>🔥</span> 오늘 인기 글 142개 좋아요
          </div>
          <div className="float-badge-2 hidden lg:flex absolute bottom-40 right-24 items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 text-white text-sm font-medium shadow-xl">
            <span>💼</span> 신규 채용 공고 8개
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/40 text-purple-200 text-xs font-bold px-4 py-2 rounded-full mb-8 tracking-wide uppercase">
              ✦ 기획자 전용 플랫폼
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
              기획이 달라지면<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-300">
                결과도 달라집니다
              </span>
            </h1>

            <p className="text-lg text-purple-100/80 max-w-lg mx-auto mb-10 leading-relaxed">
              기획자들의 지식을 모으고, 자료를 사고팔고,<br className="hidden sm:block" />
              AI로 기획 업무를 혁신하는 공간.
            </p>

            {/* CTA */}
            <div className="flex items-center justify-center gap-3 flex-wrap mb-14">
              <Link href="/signup" className="bg-white text-purple-700 font-extrabold px-7 py-3.5 rounded-xl text-base hover:bg-purple-50 transition-colors shadow-lg shadow-purple-900/30">
                무료로 시작하기 →
              </Link>
              <Link href="/feed" className="bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold px-7 py-3.5 rounded-xl text-base hover:bg-white/20 transition-colors">
                커뮤니티 구경하기
              </Link>
            </div>

            {/* Stats inline */}
            <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap">
              {stats.map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-black text-white">{s.value}</p>
                  <p className="text-xs text-purple-300 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section className="bg-white py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">PlanAI가 제공하는 것</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                기획자에게 필요한 모든 것
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map(f => (
                <Link key={f.href} href={f.href} className="feature-card-hover reveal-item block rounded-2xl border border-gray-100 p-7 bg-white shadow-sm">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 ${f.light}`}>
                    {f.emoji}
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  <p className={`text-sm font-semibold mt-4 ${f.light.split(' ')[1]}`}>바로가기 →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── POSTS + MARKET ─── */}
        <section className="bg-gray-50 py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Posts */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-extrabold text-gray-900">🔥 오늘의 인기 게시글</h2>
                  <Link href="/feed" className="text-sm text-purple-600 font-semibold hover:underline">전체 보기 →</Link>
                </div>
                <div className="flex flex-col gap-3">
                  {recentPosts.map(post => (
                    <Link key={post.id} href={post.id === 1 ? `/feed/${post.id}` : '#'}
                      className="reveal-item block bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md hover:border-purple-200 transition-all">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${post.categoryColor}`}>{post.category}</span>
                        <span className="text-xs text-gray-400">{post.timeAgo}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base leading-snug mb-3">{post.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-600">{post.author[0]}</div>
                          <span className="text-xs text-gray-500">{post.author} · {post.role}</span>
                        </div>
                        <div className="flex gap-3 text-xs text-gray-400">
                          <span>♥ {post.likes}</span>
                          <span>💬 {post.comments}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-5">

                {/* Market */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-extrabold text-gray-900">🛍️ 추천 자료</h2>
                    <Link href="/market" className="text-sm text-purple-600 font-semibold hover:underline">전체 보기 →</Link>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {featuredProducts.map(p => (
                      <Link key={p.id} href="/market"
                        className="reveal-item flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-3.5 hover:shadow-sm hover:border-purple-200 transition-all">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-xl flex-shrink-0">{p.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{p.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">★ {p.rating} · {p.sales}개 판매</p>
                        </div>
                        <span className={`text-sm font-extrabold flex-shrink-0 ${p.price === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                          {p.price === 0 ? '무료' : `${p.price.toLocaleString('ko-KR')}원`}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* AI CTA */}
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white">
                  <p className="text-xs font-bold text-purple-200 uppercase tracking-wider mb-2">Coming Soon</p>
                  <h3 className="font-extrabold text-base mb-2">✨ AI 기획 도구</h3>
                  <p className="text-xs text-purple-200 leading-relaxed mb-4">기획서 초안 자동 생성, 경쟁사 분석, 이해관계자 보고서 변환이 곧 출시됩니다.</p>
                  <button
                    onClick={() => setSubmitted(true)}
                    className="w-full bg-white text-purple-700 font-bold text-sm py-2.5 rounded-xl hover:bg-purple-50 transition-colors"
                  >
                    {submitted ? '✓ 알림 신청 완료!' : '출시 알림 받기'}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ─── JOBS ─── */}
        <section className="bg-white py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">채용 보드</p>
                <h2 className="text-2xl font-extrabold text-gray-900">💼 지금 뜨는 기획자 채용</h2>
              </div>
              <Link href="/jobs" className="text-sm text-purple-600 font-semibold hover:underline hidden sm:block">전체 공고 보기 →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {featuredJobs.map(job => (
                <Link key={job.id} href="/jobs"
                  className="reveal-item block bg-gray-50 rounded-2xl border border-gray-200 p-5 hover:shadow-md hover:border-purple-200 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-xl">{job.logo}</div>
                    <div>
                      <p className="text-xs text-gray-400">{job.company}</p>
                      <p className="text-sm font-bold text-gray-900 leading-tight">{job.title}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-xs bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-md">{job.location}</span>
                    <span className="text-xs bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-md">{job.experience}</span>
                  </div>
                  <p className="text-sm font-extrabold text-purple-600">{job.salary}만원</p>
                </Link>
              ))}
            </div>
            <Link href="/jobs" className="sm:hidden block text-center text-sm text-purple-600 font-semibold mt-2">전체 공고 보기 →</Link>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="bg-gray-950 py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">실제 사용자 후기</p>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">함께 성장하는 기획자들</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonials.map(t => (
                <div key={t.name} className="reveal-item bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-3xl text-purple-400 mb-3 leading-none">"</p>
                  <p className="text-sm text-white/80 leading-relaxed mb-5">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-sm font-bold text-white">{t.name[0]}</div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-white/40">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="bg-gradient-to-r from-purple-700 to-indigo-700 py-20 px-4 sm:px-6 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              지금 바로 시작하세요
            </h2>
            <p className="text-purple-100 mb-8">14일 무료 체험 · 카드 정보 불필요 · 언제든 취소 가능</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/signup" className="bg-white text-purple-700 font-extrabold px-8 py-3.5 rounded-xl text-base hover:bg-purple-50 transition-colors shadow-lg">
                무료 회원가입 →
              </Link>
              <Link href="/feed" className="bg-white/15 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl text-base hover:bg-white/25 transition-colors">
                둘러보기
              </Link>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="bg-gray-950 px-4 sm:px-6 py-12">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xl font-extrabold text-white mb-1">✦ PlanAI</p>
              <p className="text-xs text-gray-500">기획자를 위한 커뮤니티 + 마켓플레이스</p>
            </div>
            <div className="flex gap-6 text-xs text-gray-500 flex-wrap justify-center">
              <Link href="/feed" className="hover:text-white transition-colors">커뮤니티</Link>
              <Link href="/market" className="hover:text-white transition-colors">마켓플레이스</Link>
              <Link href="/jobs" className="hover:text-white transition-colors">채용</Link>
              <Link href="#" className="hover:text-white transition-colors">이용약관</Link>
              <Link href="#" className="hover:text-white transition-colors">개인정보처리방침</Link>
            </div>
            <p className="text-xs text-gray-600">© 2026 PlanAI. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  )
}
