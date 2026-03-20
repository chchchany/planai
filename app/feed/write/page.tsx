'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

/* ─── Types ─── */
type Block =
  | { id: string; type: 'paragraph'; content: string }
  | { id: string; type: 'heading'; content: string }
  | { id: string; type: 'tip'; content: string }
  | { id: string; type: 'checklist'; items: string[] }
  | { id: string; type: 'link'; url: string; label: string }
  | { id: string; type: 'divider' }

const categories = ['기획 팁', '툴 추천', '커리어', '레퍼런스']
const categoryStyle: Record<string, string> = {
  '기획 팁':  'bg-blue-50 text-blue-600 border-blue-200',
  '툴 추천':  'bg-emerald-50 text-emerald-600 border-emerald-200',
  '커리어':   'bg-orange-50 text-orange-600 border-orange-200',
  '레퍼런스': 'bg-violet-50 text-violet-600 border-violet-200',
}

const blockTypes: { type: Block['type']; icon: string; label: string; desc: string }[] = [
  { type: 'paragraph', icon: '¶',  label: '본문',       desc: '일반 텍스트 단락' },
  { type: 'heading',   icon: 'H',  label: '소제목',     desc: '섹션 제목' },
  { type: 'tip',       icon: '💡', label: '팁 박스',    desc: '인사이트 강조' },
  { type: 'checklist', icon: '✓',  label: '체크리스트', desc: '항목 목록' },
  { type: 'link',      icon: '🔗', label: '링크',       desc: 'URL + 설명' },
  { type: 'divider',   icon: '—',  label: '구분선',     desc: '섹션 구분' },
]

let blockCount = 0
function newId() { return `b-${++blockCount}` }

function createBlock(type: Block['type']): Block {
  if (type === 'checklist') return { id: newId(), type, items: [''] }
  if (type === 'link')      return { id: newId(), type, url: '', label: '' }
  if (type === 'divider')   return { id: newId(), type }
  return { id: newId(), type, content: '' } as Block
}

/* ─── Block Editor ─── */
function BlockEditor({
  block, onChange, onDelete, onMoveUp, onMoveDown, isFirst, isLast,
}: {
  block: Block
  onChange: (b: Block) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
}) {
  return (
    <div className="group relative flex gap-2">

      {/* Left controls — always in flow, no absolute positioning */}
      <div className="flex flex-col items-center gap-0.5 pt-2.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button onClick={onMoveUp} disabled={isFirst}
          className="w-5 h-5 rounded flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-20 transition-colors">
          <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none"><path d="M2 6.5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={onMoveDown} disabled={isLast}
          className="w-5 h-5 rounded flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-20 transition-colors">
          <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none"><path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={onDelete}
          className="w-5 h-5 rounded flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors">
          <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Block content */}
      <div className="flex-1 min-w-0">
        {block.type === 'paragraph' && (
          <div className="px-2 py-2 rounded-lg border border-transparent group-hover:border-gray-100 transition-colors">
            <textarea
              value={block.content}
              onChange={e => onChange({ ...block, content: e.target.value })}
              placeholder="본문을 입력하세요..."
              rows={3}
              className="w-full resize-none bg-transparent focus:outline-none text-[14px] leading-relaxed text-gray-800 placeholder-gray-300"
            />
          </div>
        )}

        {block.type === 'heading' && (
          <div className="px-2 py-2 rounded-lg border border-transparent group-hover:border-gray-100 transition-colors">
            <input
              value={block.content}
              onChange={e => onChange({ ...block, content: e.target.value })}
              placeholder="소제목을 입력하세요..."
              className="w-full bg-transparent focus:outline-none text-[17px] font-bold text-gray-900 placeholder-gray-300"
            />
          </div>
        )}

        {block.type === 'tip' && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            <div className="flex items-start gap-2">
              <span className="text-amber-500 text-[15px] mt-0.5 flex-shrink-0">💡</span>
              <textarea
                value={block.content}
                onChange={e => onChange({ ...block, content: e.target.value })}
                placeholder="강조하고 싶은 팁이나 인사이트를 입력하세요..."
                rows={2}
                className="w-full resize-none bg-transparent focus:outline-none text-[14px] leading-relaxed text-amber-800 placeholder-amber-300"
              />
            </div>
          </div>
        )}

        {block.type === 'checklist' && (
          <div className="px-2 py-2 rounded-lg border border-transparent group-hover:border-gray-100 transition-colors">
            <div className="flex flex-col gap-1.5">
              {block.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border border-gray-300 flex-shrink-0" />
                  <input
                    value={item}
                    onChange={e => {
                      const items = [...block.items]; items[idx] = e.target.value
                      onChange({ ...block, items })
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        const items = [...block.items.slice(0, idx + 1), '', ...block.items.slice(idx + 1)]
                        onChange({ ...block, items })
                      }
                      if (e.key === 'Backspace' && item === '' && block.items.length > 1) {
                        e.preventDefault()
                        onChange({ ...block, items: block.items.filter((_, i) => i !== idx) })
                      }
                    }}
                    placeholder={`항목 ${idx + 1}`}
                    className="flex-1 bg-transparent focus:outline-none text-[14px] text-gray-800 placeholder-gray-300"
                  />
                  {block.items.length > 1 && (
                    <button
                      onClick={() => onChange({ ...block, items: block.items.filter((_, i) => i !== idx) })}
                      className="w-4 h-4 rounded flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => onChange({ ...block, items: [...block.items, ''] })}
                className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-600 mt-0.5 w-fit"
              >
                <svg viewBox="0 0 10 10" className="w-3 h-3" fill="none"><path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                항목 추가
              </button>
            </div>
          </div>
        )}

        {block.type === 'link' && (
          <div className="border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 group-hover:border-gray-300 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none">
                <path d="M7 9a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5L8 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M9 7a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5L8 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <input
                value={block.url}
                onChange={e => onChange({ ...block, url: e.target.value })}
                placeholder="https://..."
                className="flex-1 bg-transparent focus:outline-none text-[13px] text-blue-600 placeholder-gray-300 font-mono"
              />
            </div>
            <input
              value={block.label}
              onChange={e => onChange({ ...block, label: e.target.value })}
              placeholder="링크 설명 텍스트 (선택)"
              className="w-full bg-transparent focus:outline-none text-[13px] text-gray-600 placeholder-gray-300"
            />
          </div>
        )}

        {block.type === 'divider' && (
          <div className="py-4 px-2">
            <hr className="border-gray-200" />
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Main Page ─── */
export default function WritePage() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [blocks, setBlocks] = useState<Block[]>([
    { id: newId(), type: 'paragraph', content: '' },
  ])
  const [submitted, setSubmitted] = useState(false)

  const updateBlock = useCallback((id: string, updated: Block) => {
    setBlocks(prev => prev.map(b => b.id === id ? updated : b))
  }, [])

  const deleteBlock = useCallback((id: string) => {
    setBlocks(prev => prev.length > 1 ? prev.filter(b => b.id !== id) : prev)
  }, [])

  const moveBlock = useCallback((id: string, dir: 'up' | 'down') => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id)
      if (dir === 'up' && idx === 0) return prev
      if (dir === 'down' && idx === prev.length - 1) return prev
      const next = [...prev]
      const swap = dir === 'up' ? idx - 1 : idx + 1
      ;[next[idx], next[swap]] = [next[swap], next[idx]]
      return next
    })
  }, [])

  function addBlock(type: Block['type']) {
    setBlocks(prev => [...prev, createBlock(type)])
  }

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault()
      const tag = tagInput.trim().replace(/^#/, '')
      if (!tags.includes(tag) && tags.length < 5) setTags(prev => [...prev, tag])
      setTagInput('')
    }
    if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
      setTags(prev => prev.slice(0, -1))
    }
  }

  const isReady = title.trim().length > 0 && category !== '' && blocks.some(b => {
    if (b.type === 'paragraph' || b.type === 'heading' || b.type === 'tip') return b.content.trim().length > 0
    if (b.type === 'checklist') return b.items.some(i => i.trim().length > 0)
    return false
  })

  /* ─── Success screen ─── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-5">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-purple-600" fill="none">
              <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-[18px] font-bold text-gray-900 mb-2">글이 등록됐습니다!</h2>
          <p className="text-[14px] text-gray-500 mb-8">커뮤니티에 공유됐습니다. 많은 기획자들이 읽게 될 거예요.</p>
          <div className="flex justify-center gap-3">
            <Link href="/feed" className="h-9 px-5 bg-purple-600 text-white text-[13px] font-semibold rounded-md hover:bg-purple-700 transition-colors flex items-center">
              커뮤니티로 돌아가기
            </Link>
            <button
              onClick={() => { setTitle(''); setCategory(''); setTags([]); setBlocks([{ id: newId(), type: 'paragraph', content: '' }]); setSubmitted(false) }}
              className="h-9 px-5 border border-gray-200 text-[13px] font-medium text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
            >
              새 글 쓰기
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ─── Editor ─── */
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Top bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Link href="/feed" className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-gray-600 transition-colors">
                <svg viewBox="0 0 10 10" className="w-3 h-3" fill="none"><path d="M6.5 2L3 5l3.5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                커뮤니티
              </Link>
              <span className="text-gray-200">/</span>
              <span className="text-[13px] text-gray-700 font-medium">새 글 작성</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3.5 border border-gray-200 text-[13px] text-gray-500 rounded-md hover:bg-gray-50 transition-colors">
                임시저장
              </button>
              <button
                disabled={!isReady}
                onClick={() => setSubmitted(true)}
                className="h-8 px-3.5 bg-purple-600 text-white text-[13px] font-semibold rounded-md hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                발행하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Two-column layout ─── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-5 items-start">

          {/* ── Left: Editor ── */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

            {/* Title + Category + Tags */}
            <div className="px-7 pt-7 pb-5 border-b border-gray-100">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`text-[12px] font-semibold px-2.5 py-1 rounded-md border transition-all ${
                      category === cat ? categoryStyle[cat] : 'text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <textarea
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                rows={2}
                className="w-full resize-none bg-transparent focus:outline-none text-[22px] font-bold text-gray-900 placeholder-gray-200 leading-tight"
              />

              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                {tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-[12px] text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">
                    #{tag}
                    <button onClick={() => setTags(prev => prev.filter(t => t !== tag))} className="text-gray-300 hover:text-gray-500">
                      <svg viewBox="0 0 8 8" className="w-2 h-2" fill="none"><path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    </button>
                  </span>
                ))}
                {tags.length < 5 && (
                  <input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    placeholder={tags.length === 0 ? '#태그 입력 후 Enter (최대 5개)' : '+ 태그'}
                    className="flex-1 min-w-[160px] bg-transparent focus:outline-none text-[12px] text-gray-600 placeholder-gray-300"
                  />
                )}
              </div>
            </div>

            {/* Block list */}
            <div className="px-7 py-5 flex flex-col gap-1">
              {blocks.map((block, idx) => (
                <BlockEditor
                  key={block.id}
                  block={block}
                  onChange={updated => updateBlock(block.id, updated)}
                  onDelete={() => deleteBlock(block.id)}
                  onMoveUp={() => moveBlock(block.id, 'up')}
                  onMoveDown={() => moveBlock(block.id, 'down')}
                  isFirst={idx === 0}
                  isLast={idx === blocks.length - 1}
                />
              ))}
            </div>
          </div>

          {/* ── Right: Sidebar ── */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-[88px]">

            {/* Block type buttons */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">블록 추가</p>
              <div className="flex flex-col gap-1">
                {blockTypes.map(bt => (
                  <button
                    key={bt.type}
                    onClick={() => addBlock(bt.type)}
                    className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                  >
                    <span className="w-7 h-7 rounded-md bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center text-[12px] font-bold text-gray-600 flex-shrink-0 transition-colors">
                      {bt.icon}
                    </span>
                    <div>
                      <p className="text-[13px] font-medium text-gray-700">{bt.label}</p>
                      <p className="text-[11px] text-gray-400">{bt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Writing guide */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">작성 가이드</p>
              <ul className="flex flex-col gap-2">
                {[
                  '카테고리 · 태그를 설정하면 더 많이 노출됩니다.',
                  '소제목으로 내용을 구분하면 가독성이 좋아집니다.',
                  '팁 박스로 핵심 인사이트를 강조해보세요.',
                  '링크를 추가하면 신뢰도가 높아집니다.',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[12px] text-gray-500">
                    <span className="text-gray-300 mt-0.5 flex-shrink-0">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Block count */}
            <p className="text-[12px] text-gray-400 text-center">
              블록 {blocks.length}개 작성 중
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
