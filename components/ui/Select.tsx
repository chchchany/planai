'use client'

import { useEffect, useRef, useState } from 'react'

type Option = { label: string; value: string }

type Props = {
  options: Option[]
  value: string
  onChange: (v: string) => void
  placeholder?: string
  prefix?: string
}

export default function Select({ options, value, onChange, placeholder, prefix }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find(o => o.value === value)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-1.5 h-8 px-3 rounded-md border text-[13px] font-medium transition-all select-none ${
          value && value !== options[0]?.value
            ? 'border-purple-300 bg-purple-50 text-purple-700'
            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
        }`}
      >
        {prefix && <span className="text-gray-400 font-normal">{prefix}</span>}
        <span>{selected?.label ?? placeholder}</span>
        <svg
          className={`w-3 h-3 text-gray-400 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12" fill="none"
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 min-w-[148px] bg-white border border-gray-200 rounded-lg shadow-lg shadow-black/8 z-50 py-1 overflow-hidden">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`w-full flex items-center justify-between px-3 py-1.5 text-[13px] transition-colors ${
                opt.value === value
                  ? 'text-purple-600 bg-purple-50/70 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{opt.label}</span>
              {opt.value === value && (
                <svg className="w-3.5 h-3.5 text-purple-500" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3.5 3.5 5.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
