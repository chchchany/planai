'use client'

import { useState } from 'react'
import Link from 'next/link'

const jobTitles = [
  '서비스 기획자',
  'Product Manager (PM)',
  'Product Owner (PO)',
  'UX 기획자',
  '사업 기획자',
  '마케터',
  '디자이너',
  '기타',
]

export default function SignupPage() {
  const [form, setForm] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
    jobTitle: '',
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form | 'general', string>>>({})
  const [step, setStep] = useState<'form' | 'done'>('form')

  function update<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm(v => ({ ...v, [key]: value }))
    setErrors(v => ({ ...v, [key]: undefined }))
  }

  function validate() {
    const e: typeof errors = {}
    if (!form.nickname.trim()) e.nickname = '닉네임을 입력해 주세요.'
    else if (form.nickname.trim().length < 2) e.nickname = '닉네임은 2자 이상이어야 합니다.'
    if (!form.email) e.email = '이메일을 입력해 주세요.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = '올바른 이메일 형식이 아닙니다.'
    if (!form.password) e.password = '비밀번호를 입력해 주세요.'
    else if (form.password.length < 8) e.password = '비밀번호는 8자 이상이어야 합니다.'
    if (!form.passwordConfirm) e.passwordConfirm = '비밀번호를 한 번 더 입력해 주세요.'
    else if (form.password !== form.passwordConfirm) e.passwordConfirm = '비밀번호가 일치하지 않습니다.'
    if (!form.jobTitle) e.jobTitle = '직군을 선택해 주세요.'
    if (!form.agreeTerms) e.agreeTerms = '이용약관에 동의해 주세요.'
    return e
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    // TODO: Supabase auth 연동
    setStep('done')
  }

  const passwordStrength = (() => {
    const p = form.password
    if (!p) return null
    if (p.length < 6) return { label: '약함', color: 'bg-red-400', width: 'w-1/4' }
    if (p.length < 8) return { label: '보통', color: 'bg-yellow-400', width: 'w-2/4' }
    if (/[A-Z]/.test(p) && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p)) return { label: '강함', color: 'bg-green-500', width: 'w-full' }
    return { label: '양호', color: 'bg-blue-400', width: 'w-3/4' }
  })()

  if (step === 'done') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center">
            <Link href="/" className="text-xl font-extrabold text-purple-600 tracking-tight">✦ PlanAI</Link>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-md w-full text-center">
            <div className="text-5xl mb-5">🎉</div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">가입 완료!</h2>
            <p className="text-sm text-gray-500 mb-2">
              <span className="font-semibold text-gray-700">{form.email}</span>로<br />
              인증 메일을 보내드렸습니다.
            </p>
            <p className="text-xs text-gray-400 mb-8">받은편지함을 확인하고 이메일 인증을 완료해 주세요.</p>
            <Link
              href="/login"
              className="block w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-colors text-sm"
            >
              로그인하러 가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Top bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold text-purple-600 tracking-tight">
            ✦ PlanAI
          </Link>
          <span className="text-sm text-gray-500">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-purple-600 font-semibold hover:underline">로그인</Link>
          </span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

            <div className="mb-7">
              <h1 className="text-2xl font-extrabold text-gray-900 mb-1.5">기획자 커뮤니티 합류하기 ✦</h1>
              <p className="text-sm text-gray-500">2,300명의 기획자와 함께 성장하세요.</p>
            </div>

            {/* Google 가입 */}
            <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors mb-6">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Google로 시작하기
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">또는 이메일로 가입</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

              {/* Nickname */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">닉네임</label>
                <input
                  type="text"
                  placeholder="기획왕홍길동"
                  value={form.nickname}
                  onChange={e => update('nickname', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors ${
                    errors.nickname ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.nickname && <p className="text-xs text-red-500 mt-1.5">{errors.nickname}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">이메일</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors ${
                    errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">비밀번호</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="8자 이상 입력하세요"
                    value={form.password}
                    onChange={e => update('password', e.target.value)}
                    className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors ${
                      errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg">
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {passwordStrength && (
                  <div className="mt-2">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${passwordStrength.color} ${passwordStrength.width}`} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">비밀번호 강도: <span className="font-medium text-gray-600">{passwordStrength.label}</span></p>
                  </div>
                )}
                {errors.password && <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>}
              </div>

              {/* Password confirm */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">비밀번호 확인</label>
                <div className="relative">
                  <input
                    type={showPasswordConfirm ? 'text' : 'password'}
                    placeholder="비밀번호를 한 번 더 입력하세요"
                    value={form.passwordConfirm}
                    onChange={e => update('passwordConfirm', e.target.value)}
                    className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors ${
                      errors.passwordConfirm ? 'border-red-400 bg-red-50' : form.passwordConfirm && form.password === form.passwordConfirm ? 'border-green-400' : 'border-gray-200'
                    }`}
                  />
                  <button type="button" onClick={() => setShowPasswordConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg">
                    {showPasswordConfirm ? '🙈' : '👁️'}
                  </button>
                </div>
                {form.passwordConfirm && form.password === form.passwordConfirm && (
                  <p className="text-xs text-green-600 mt-1.5">✓ 비밀번호가 일치합니다.</p>
                )}
                {errors.passwordConfirm && <p className="text-xs text-red-500 mt-1.5">{errors.passwordConfirm}</p>}
              </div>

              {/* Job title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">직군</label>
                <select
                  value={form.jobTitle}
                  onChange={e => update('jobTitle', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors cursor-pointer ${
                    errors.jobTitle ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  } ${!form.jobTitle ? 'text-gray-400' : 'text-gray-900'}`}
                >
                  <option value="" disabled>직군을 선택해 주세요</option>
                  {jobTitles.map(j => <option key={j} value={j}>{j}</option>)}
                </select>
                {errors.jobTitle && <p className="text-xs text-red-500 mt-1.5">{errors.jobTitle}</p>}
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.agreeTerms}
                    onChange={e => update('agreeTerms', e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-purple-600 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    <Link href="#" className="text-purple-600 font-medium hover:underline">이용약관</Link>과{' '}
                    <Link href="#" className="text-purple-600 font-medium hover:underline">개인정보처리방침</Link>에 동의합니다.
                  </span>
                </label>
                {errors.agreeTerms && <p className="text-xs text-red-500 mt-1.5">{errors.agreeTerms}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-colors mt-2 text-sm"
              >
                회원가입
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500 mt-5">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-purple-600 font-semibold hover:underline">로그인</Link>
          </p>

        </div>
      </div>
    </div>
  )
}
