'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

/* ─── Mock Data ─── */
const post = {
  category: '기획 팁',
  categoryColor: 'bg-blue-100 text-blue-700',
  title: 'PRD 작성 시 놓치기 쉬운 7가지 항목',
  author: '김지현',
  role: 'PM @ 카카오',
  bio: '카카오에서 5년째 PM으로 일하고 있습니다. 기획 문서화와 팀 커뮤니케이션에 관심이 많아요.',
  date: '2026년 3월 18일',
  views: 1842,
  initialLikes: 142,
  commentCount: 23,
  tags: ['PRD', '기획서', '문서화', 'PM'],
  authorPosts: [
    { id: 2, title: '기획자가 데이터를 읽는 법 — SQL 없이 인사이트 뽑기', likes: 89 },
    { id: 3, title: '이해관계자 인터뷰, 이렇게 준비하면 달라집니다', likes: 76 },
    { id: 4, title: 'PM의 하루 — 회의 줄이고 실행 늘리는 법', likes: 54 },
  ],
}

const initialComments = [
  { id: 1, author: '이수민', role: 'PO @ 토스', content: '정말 공감되는 내용이에요! 특히 롤백 플랜은 개발팀에서도 항상 요청하는데 빠뜨리기 쉽더라고요. 저장해두고 체크리스트로 써야겠습니다.', date: '2시간 전', likes: 12 },
  { id: 2, author: '박성준', role: 'CPO @ 스타트업', content: '성공 지표 정의 부분이 핵심인 것 같아요. Output이 아닌 Outcome으로 정의해야 한다는 점을 팀원들에게도 계속 강조하고 있습니다.', date: '4시간 전', likes: 8 },
  { id: 3, author: '최민준', role: '기획팀 리드 @ NHN', content: '접근성 요구사항은 저도 항상 후순위로 밀리는 것 같아서 반성하게 되네요. 좋은 글 감사합니다!', date: '1일 전', likes: 5 },
]

const relatedPosts = [
  { id: 2, title: '좋은 PRD가 갖춰야 할 5가지 조건', category: '기획 팁', likes: 98 },
  { id: 3, title: '개발팀이 싫어하는 기획서 vs 좋아하는 기획서', category: '기획 팁', likes: 174 },
  { id: 4, title: 'Jira로 PRD와 티켓 연결하는 법', category: '툴 추천', likes: 67 },
]

const tocItems = [
  { id: 'item-1', label: '1. 엣지 케이스 처리 방안' },
  { id: 'item-2', label: '2. 롤백 플랜 (Rollback Plan)' },
  { id: 'item-3', label: '3. 성공 지표 정의' },
  { id: 'item-4', label: '4. 의존성 및 선행 조건' },
  { id: 'item-5', label: '5. 법적/정책적 검토 사항' },
  { id: 'item-6', label: '6. 접근성 요구사항' },
  { id: 'item-7', label: '7. 데이터 마이그레이션 계획' },
]

/* ─── Content Sections ─── */
const sections = [
  {
    id: 'item-1',
    title: '1. 엣지 케이스 처리 방안',
    emoji: '⚠️',
    content: '많은 기획서가 "정상 흐름(Happy Path)"만 다루고 예외 상황을 빠뜨립니다. 네트워크 오류, 빈 상태(Empty State), 권한이 없는 사용자 접근, 타임아웃 등 다양한 엣지 케이스를 미리 정의해두지 않으면 개발 중후반에 의사결정 병목이 생깁니다.',
    tip: '각 기능 플로우마다 "이게 실패하면 어떻게 되나요?" 질문을 스스로 해보세요. 그 답이 곧 엣지 케이스입니다.',
    checklist: ['네트워크 오류 시 UX 처리', '빈 목록/데이터 없음 상태', '동시 접근 / 중복 요청 방지', '타임아웃 기준과 재시도 정책'],
  },
  {
    id: 'item-2',
    title: '2. 롤백 플랜 (Rollback Plan)',
    emoji: '↩️',
    content: '기능을 배포한 후 문제가 생겼을 때 어떻게 되돌릴지를 미리 명시해야 합니다. 롤백이 가능한 기능인지, 데이터가 이미 변경된 경우 어떻게 처리할지, 롤백 담당자와 판단 기준은 무엇인지를 PRD에 포함시키면 긴급 상황에서 혼란을 줄일 수 있습니다.',
    tip: '배포 직후 모니터링할 지표와 롤백 트리거 조건을 명확히 숫자로 정의하세요. (예: 에러율 5% 초과 시 롤백)',
    checklist: ['롤백 가능 여부 명시', '롤백 트리거 조건 (수치 기준)', '데이터 정합성 처리 방법', '롤백 의사결정 권한자'],
  },
  {
    id: 'item-3',
    title: '3. 성공 지표 정의',
    emoji: '📊',
    content: '기능이 성공했는지 어떻게 알 수 있을까요? 출시 후 "잘 됐나요?"라는 질문에 답할 수 있으려면 PRD 단계에서 이미 성공 지표(Success Metrics)가 정의되어야 합니다. Output(기능 출시)이 아닌 Outcome(사용자 행동 변화)으로 정의하는 것이 핵심입니다.',
    tip: 'HEART 프레임워크나 NSM(North Star Metric)을 기반으로 기능별 지표를 정의해보세요.',
    checklist: ['Primary Metric (핵심 1개)', 'Secondary Metrics (보조 2~3개)', '측정 방법과 기간', '기준선(Baseline)과 목표치'],
  },
  {
    id: 'item-4',
    title: '4. 의존성 및 선행 조건',
    emoji: '🔗',
    content: '이 기능이 동작하려면 다른 팀의 API가 먼저 완성되어야 하거나, 다른 기능이 출시된 이후에만 가능하거나, 특정 인프라 세팅이 필요한 경우가 많습니다. 이런 의존성을 명시하지 않으면 일정 지연의 원인이 됩니다.',
    tip: '의존성은 내부(다른 팀)와 외부(서드파티 API, 법적 승인 등) 모두 포함해서 작성하세요.',
    checklist: ['타 팀 API/기능 의존성', '외부 서비스 연동 필요 여부', '데이터 준비 선행 조건', '승인/검토 필요 사항'],
  },
  {
    id: 'item-5',
    title: '5. 법적/정책적 검토 사항',
    emoji: '⚖️',
    content: '개인정보 수집, 마케팅 동의, 미성년자 보호, 금융 규제 등 법적으로 검토가 필요한 사항을 기획 단계에서 놓치면 출시 직전 또는 출시 후에 심각한 문제가 될 수 있습니다. 법무팀 또는 컴플라이언스 팀과의 사전 협의가 필요한지 PRD에 명시하세요.',
    tip: '개인정보를 수집하거나 처리하는 기능이라면 반드시 개인정보보호법 및 GDPR 요건을 체크하세요.',
    checklist: ['개인정보 수집/처리 여부', '법무팀 검토 필요 여부', '이용약관/정책 변경 필요 여부', '미성년자/취약계층 보호 조항'],
  },
  {
    id: 'item-6',
    title: '6. 접근성 요구사항',
    emoji: '♿',
    content: '접근성(Accessibility)은 시각, 청각, 운동 기능에 제약이 있는 사용자도 서비스를 이용할 수 있도록 하는 요소입니다. 대부분 기획서에서 빠지는 항목이지만, 글로벌 서비스나 공공기관 서비스에서는 법적 의무사항이 되기도 합니다.',
    tip: 'WCAG 2.1 AA 기준을 최소 기준으로 삼고, 스크린리더 지원 여부와 키보드 탐색 가능 여부를 체크하세요.',
    checklist: ['스크린리더 지원 여부', '키보드 탐색 가능 여부', '색상 대비 기준 충족', '대체 텍스트(alt) 필요 이미지 목록'],
  },
  {
    id: 'item-7',
    title: '7. 데이터 마이그레이션 계획',
    emoji: '🗄️',
    content: '기존 데이터 구조를 변경하거나 새로운 필드를 추가하는 경우, 기존 데이터를 어떻게 처리할지 계획이 필요합니다. 이를 놓치면 배포 후 기존 사용자 데이터가 깨지거나 서비스 장애가 발생할 수 있습니다.',
    tip: '마이그레이션은 "한 번에 전체"보다 "단계적으로"가 안전합니다. 마이그레이션 스크립트 검토도 PRD 범위에 포함시키세요.',
    checklist: ['기존 데이터 영향 범위', '마이그레이션 방식 (일괄/점진적)', '마이그레이션 롤백 방법', '데이터 검증 방법 및 담당자'],
  },
]

/* ─── Page Component ─── */
export default function PostDetailPage() {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.initialLikes)
  const [likeAnim, setLikeAnim] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [followed, setFollowed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState(initialComments)
  const [activeSection, setActiveSection] = useState('item-1')

  function handleLike() {
    setLiked(v => !v)
    setLikesCount(v => liked ? v - 1 : v + 1)
    setLikeAnim(true)
    setTimeout(() => setLikeAnim(false), 400)
  }

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleComment(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!commentText.trim()) return
    setComments(v => [{
      id: Date.now(),
      author: '나',
      role: '로그인 사용자',
      content: commentText.trim(),
      date: '방금',
      likes: 0,
    }, ...v])
    setCommentText('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <style>{`
        @keyframes likepop {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.5); }
          60%  { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .like-pop { animation: likepop 0.4s ease; }
        @keyframes heartfloat {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-40px) scale(1.4); }
        }
        .heart-float { animation: heartfloat 0.6s ease forwards; pointer-events: none; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* ─── Main Content ─── */}
          <div className="lg:col-span-3">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-purple-600 transition-colors">홈</Link>
              <span>›</span>
              <Link href="/feed" className="hover:text-purple-600 transition-colors">커뮤니티</Link>
              <span>›</span>
              <span className="text-gray-600 truncate">PRD 작성 시 놓치기 쉬운 7가지 항목</span>
            </div>

            {/* Header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7 mb-5">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {post.category}
                </span>
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-6">
                {post.title}
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-base font-extrabold text-purple-600">
                    {post.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                    <p className="text-xs text-gray-400">{post.role} · {post.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>👁 {post.views.toLocaleString('ko-KR')} 조회</span>
                  <span>♥ {likesCount}</span>
                  <span>💬 {comments.length}</span>
                </div>
              </div>
            </div>

            {/* Action bar - desktop only (mobile uses fixed bottom bar) */}
            <div className="hidden lg:flex bg-white rounded-2xl border border-gray-200 px-5 py-3 mb-6 items-center gap-3">
              {/* Like button */}
              <div className="relative">
                {likeAnim && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-red-400 text-lg heart-float select-none">♥</span>
                )}
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    liked
                      ? 'bg-red-50 text-red-500 border border-red-200'
                      : 'bg-gray-50 text-gray-500 border border-gray-200 hover:border-red-200 hover:text-red-400'
                  }`}
                >
                  <span className={likeAnim ? 'like-pop inline-block' : 'inline-block'}>
                    {liked ? '♥' : '♡'}
                  </span>
                  <span>{likesCount}</span>
                </button>
              </div>

              {/* Bookmark */}
              <button
                onClick={() => setBookmarked(v => !v)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  bookmarked
                    ? 'bg-purple-50 text-purple-600 border-purple-200'
                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-purple-200 hover:text-purple-500'
                }`}
              >
                {bookmarked ? '🔖' : '🔖'}
                <span>{bookmarked ? '저장됨' : '북마크'}</span>
              </button>

              {/* Share */}
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  copied
                    ? 'bg-green-50 text-green-600 border-green-200'
                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <span>{copied ? '✓' : '🔗'}</span>
                <span>{copied ? '복사됨!' : '공유'}</span>
              </button>
            </div>

            {/* Intro */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7 mb-5">
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                실무에서 PRD를 작성하다 보면 자주 빠뜨리는 항목들이 있습니다. 기능의 핵심 흐름과 UI 설명에 집중하다 보면, 막상 개발이 시작되고 나서야 "이 부분은 어떻게 하죠?"라는 질문을 받게 되죠.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                5년간 PM으로 일하면서 직접 겪고, 동료 기획자들에게서도 반복적으로 발견한 <strong className="text-gray-900">7가지 놓치기 쉬운 항목</strong>을 정리했습니다. 각 항목마다 실용적인 체크리스트도 함께 담았으니, 다음 PRD 작성 시 바로 활용해보세요.
              </p>

              <div className="mt-5 p-4 bg-purple-50 border border-purple-100 rounded-xl text-sm text-purple-700">
                💡 이 글의 체크리스트를 Notion 템플릿으로 정리한 자료가{' '}
                <Link href="/market" className="font-semibold underline hover:text-purple-900">마켓플레이스</Link>
                에 있습니다.
              </div>
            </div>

            {/* Content Sections */}
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white rounded-2xl border border-gray-200 p-7 mb-5 scroll-mt-20"
              >
                <h2 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                  <span>{section.emoji}</span>
                  <span>{section.title}</span>
                </h2>
                <p className="text-gray-700 text-base leading-relaxed mb-5">{section.content}</p>

                {/* Tip box */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
                  <p className="text-sm font-semibold text-amber-700 mb-1">✏️ 실무 팁</p>
                  <p className="text-sm text-amber-800 leading-relaxed">{section.tip}</p>
                </div>

                {/* Checklist */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">체크리스트</p>
                  <ul className="flex flex-col gap-2">
                    {section.checklist.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-purple-400 mt-0.5 flex-shrink-0">☐</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Bottom action bar */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 flex items-center justify-between flex-wrap gap-4">
              <p className="text-sm text-gray-500">이 글이 도움이 되셨나요?</p>
              <div className="flex items-center gap-3">
                <div className="relative">
                  {likeAnim && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-red-400 text-lg heart-float select-none">♥</span>
                  )}
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      liked
                        ? 'bg-red-500 text-white shadow-md shadow-red-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <span className={likeAnim ? 'like-pop inline-block' : 'inline-block'}>
                      {liked ? '♥' : '♡'}
                    </span>
                    좋아요 {likesCount}
                  </button>
                </div>
                <button
                  onClick={() => setBookmarked(v => !v)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    bookmarked ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  {bookmarked ? '🔖 저장됨' : '🔖 북마크'}
                </button>
              </div>
            </div>

            {/* Author card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-xl font-extrabold text-purple-600 flex-shrink-0">
                    {post.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{post.author}</p>
                    <p className="text-sm text-gray-500">{post.role}</p>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-sm">{post.bio}</p>
                  </div>
                </div>
                <button
                  onClick={() => setFollowed(v => !v)}
                  className={`flex-shrink-0 px-5 py-2 rounded-xl text-sm font-bold border transition-all ${
                    followed
                      ? 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200'
                      : 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700'
                  }`}
                >
                  {followed ? '✓ 팔로잉' : '+ 팔로우'}
                </button>
              </div>

              {/* Author's other posts */}
              <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">작성자의 다른 글</p>
                <div className="flex flex-col gap-2">
                  {post.authorPosts.map(p => (
                    <Link
                      key={p.id}
                      href={`/feed/${p.id}`}
                      className="flex items-center justify-between group"
                    >
                      <p className="text-sm text-gray-700 group-hover:text-purple-600 transition-colors truncate pr-4">{p.title}</p>
                      <span className="text-xs text-gray-400 flex-shrink-0">♥ {p.likes}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-5">댓글 {comments.length}개</h3>

              {/* Comment input */}
              <form onSubmit={handleComment} className="mb-6">
                <textarea
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="댓글을 남겨보세요..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    댓글 달기
                  </button>
                </div>
              </form>

              {/* Comment list */}
              <div className="flex flex-col gap-5">
                {comments.map(comment => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-600 flex-shrink-0 mt-0.5">
                      {comment.author[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-400">{comment.role}</span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400">{comment.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                      <button className="text-xs text-gray-400 mt-1.5 hover:text-red-400 transition-colors">
                        ♡ {comment.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prev / Next navigation */}
            <div className="grid grid-cols-2 gap-4">
              <Link href="/feed" className="bg-white rounded-2xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-sm transition-all group">
                <p className="text-xs text-gray-400 mb-1.5">← 이전 글</p>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors leading-snug">
                  기획자가 알아야 할 데이터 리터러시 기초
                </p>
              </Link>
              <Link href="/feed" className="bg-white rounded-2xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-sm transition-all group text-right">
                <p className="text-xs text-gray-400 mb-1.5">다음 글 →</p>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors leading-snug">
                  Figma에서 기획자가 꼭 알아야 할 플러그인 10선
                </p>
              </Link>
            </div>

          </div>

          {/* ─── Sidebar ─── */}
          <div className="flex flex-col gap-5 relative">
            <div className="sticky top-20 flex flex-col gap-5">

              {/* TOC - desktop only */}
              <div className="hidden lg:block bg-white rounded-2xl border border-gray-200 p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">목차</p>
                <nav className="flex flex-col gap-1">
                  {tocItems.map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setActiveSection(item.id)}
                      className={`text-xs py-1.5 px-2 rounded-lg transition-colors leading-snug ${
                        activeSection === item.id
                          ? 'text-purple-600 bg-purple-50 font-semibold'
                          : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Related posts */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">관련 게시글</p>
                <div className="flex flex-col gap-3">
                  {relatedPosts.map(p => (
                    <Link key={p.id} href={`/feed/${p.id}`} className="group">
                      <p className="text-xs font-medium text-gray-700 group-hover:text-purple-600 transition-colors leading-snug mb-0.5">{p.title}</p>
                      <p className="text-xs text-gray-400">{p.category} · ♥ {p.likes}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-5 text-white">
                <p className="font-bold text-sm mb-1.5">나도 글 써보기</p>
                <p className="text-xs text-purple-200 leading-relaxed mb-3">나만의 기획 노하우를 2,300명의 기획자와 나눠보세요.</p>
                <button className="w-full bg-white text-purple-600 text-xs font-bold py-2 rounded-lg hover:bg-purple-50 transition-colors">
                  글쓰기 →
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
      {/* ─── Mobile bottom action bar ─── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            {likeAnim && (
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-red-400 text-base heart-float select-none">♥</span>
            )}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                liked ? 'bg-red-50 text-red-500 border border-red-200' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <span className={likeAnim ? 'like-pop inline-block' : 'inline-block'}>{liked ? '♥' : '♡'}</span>
              {likesCount}
            </button>
          </div>
          <button
            onClick={() => setBookmarked(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all ${
              bookmarked ? 'bg-purple-50 text-purple-600 border border-purple-200' : 'bg-gray-100 text-gray-600'
            }`}
          >
            🔖 {bookmarked ? '저장됨' : '북마크'}
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all ${
              copied ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {copied ? '✓ 복사됨' : '🔗 공유'}
          </button>
        </div>
        <Link href="/feed/write"
          className="h-9 px-4 bg-purple-600 text-white text-[13px] font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center">
          글쓰기
        </Link>
      </div>

      {/* Mobile bottom bar spacing */}
      <div className="lg:hidden h-20" />
    </div>
  )
}
