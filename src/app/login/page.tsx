'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { AvatarIcon, AVATAR_OPTIONS, AvatarStyle } from '@/components/common/AvatarIcon';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/profile';
  const { login, loginWithPhoneOtp, user } = useAuth();
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarStyle>('lota');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const cleanPhone = phoneNumber.replace(/[^\d]/g, '');

    if (!otpSent) {
      if (cleanPhone.length < 10) {
        setError('Please enter a valid 10-digit mobile number.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setOtpSent(true);
      }, 600);
    } else {
      if (!otp.trim()) {
        setError('Please enter the 6-digit verification code.');
        return;
      }
      setIsLoading(true);
      const success = loginWithPhoneOtp(phoneNumber, otp);
      setIsLoading(false);
      if (success) {
        router.push(redirectUrl);
      } else {
        setError('Invalid verification code. Enter any 6-digit OTP (e.g. 123456).');
      }
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login(email, 'CUSTOMER', fullName || 'Mountain Patron');
      router.push(redirectUrl);
    }, 500);
  };

  const handleGoogleMock = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login('patron@google.com', 'CUSTOMER', 'Devotee of Craft');
      router.push(redirectUrl);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF4E8] text-[#2A1A12] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-body">
      <div className="w-full max-w-5xl bg-[#EFE4CF] rounded-3xl border border-[#B8964F]/40 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Column: Quiet Copper Texture & Heritage Monogram (NO human photo) */}
        <div className="lg:col-span-5 bg-[#12302B] text-[#FAF4E8] p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#B8964F]/30 relative overflow-hidden">
          {/* Subtle hammered copper textured overlay via SVG pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#B8964F 1px, transparent 1px)`,
              backgroundSize: '16px 16px',
            }}
          />

          <div className="relative z-10 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="font-display text-2xl tracking-[0.24em] text-[#FAF4E8] uppercase group-hover:text-[#B8964F] transition-colors">
                Tamrashilp
              </span>
            </Link>

            <div className="kumaoni-divider my-4">
              <span className="text-[#B8964F] text-xs">✦</span>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase font-serif tracking-[0.22em] text-[#B8964F] block">
                The Patron Ledger
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#FAF4E8] font-normal leading-snug">
                Struck by hand.
                <br />
                <span className="italic font-light text-[#EFE4CF]/90">Kept for generations.</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#EFE4CF]/80 leading-relaxed font-light">
                Sign in to view your bespoke commissions, trace the numbered provenance of your pieces, and book traditional Kalai re-tinning.
              </p>
            </div>
          </div>

          {/* Six Refined Line-Art Avatar Motif Showcase */}
          <div className="relative z-10 pt-8 border-t border-[#B8964F]/20 space-y-3">
            <span className="text-[10px] uppercase font-serif tracking-widest text-[#B8964F]">
              Atelier Emblem Selection
            </span>
            <div className="flex items-center gap-2.5">
              {AVATAR_OPTIONS.map((opt) => (
                <div
                  key={opt.id}
                  className="p-1 rounded-full border border-[#B8964F]/40 bg-[#0B1F1C] hover:border-[#B8964F] transition-colors"
                  title={opt.label}
                >
                  <AvatarIcon styleName={opt.id} size="sm" variant="dark" />
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#EFE4CF]/60 font-serif">
              No photo uploads required. Choose from 6 ancestral copperware motifs.
            </p>
          </div>

          <div className="relative z-10 text-[11px] text-[#B8964F]/90 font-serif flex items-center gap-2 pt-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4E6E58]" />
            <span>Almora Atelier Verified Authentication</span>
          </div>
        </div>

        {/* Right Column: Clean, Focused Auth Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#FAF4E8]">
          <div className="space-y-6 max-w-md mx-auto w-full">
            {/* Header and Switcher */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#12302B]">
                  Patron Sanctuary
                </h2>
                <Link
                  href="/"
                  className="text-xs text-[#8C4E28] hover:underline font-serif"
                >
                  Return to Atelier
                </Link>
              </div>
              <p className="text-xs text-[#2A1A12]/70 font-body">
                Enter your credentials to access your archival orders and certificates.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Method Tabs: Phone OTP vs Email & Password */}
            <div className="flex border-b border-[#B8964F]/30 text-xs font-serif">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('phone');
                  setError('');
                }}
                className={`pb-2.5 px-4 font-medium tracking-wide transition-colors border-b-2 -mb-px ${
                  activeTab === 'phone'
                    ? 'border-[#8C4E28] text-[#8C4E28]'
                    : 'border-transparent text-[#2A1A12]/60 hover:text-[#2A1A12]'
                }`}
              >
                Phone Verification (Instant OTP)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('email');
                  setError('');
                }}
                className={`pb-2.5 px-4 font-medium tracking-wide transition-colors border-b-2 -mb-px ${
                  activeTab === 'email'
                    ? 'border-[#8C4E28] text-[#8C4E28]'
                    : 'border-transparent text-[#2A1A12]/60 hover:text-[#2A1A12]'
                }`}
              >
                Email & Password
              </button>
            </div>

            {/* Form: Phone OTP */}
            {activeTab === 'phone' ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-serif uppercase tracking-wider text-[#2A1A12]/80 block">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-[#2A1A12]/60 font-mono">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="95570 XXXXX"
                      disabled={otpSent}
                      className="w-full pl-12 pr-4 py-2.5 text-base sm:text-sm bg-[#EFE4CF]/60 border border-[#B8964F]/50 rounded-xl focus:outline-none focus:border-[#8C4E28] text-[#2A1A12] font-mono disabled:opacity-60"
                      required
                    />
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-serif uppercase tracking-wider text-[#2A1A12]/80">
                        6-Digit Verification Code
                      </label>
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="text-[11px] text-[#8C4E28] hover:underline font-serif"
                      >
                        Change number
                      </button>
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full px-4 py-2.5 text-base sm:text-sm tracking-[0.4em] text-center bg-[#EFE4CF]/60 border border-[#B8964F]/50 rounded-xl focus:outline-none focus:border-[#8C4E28] text-[#2A1A12] font-mono"
                      autoFocus
                      required
                    />
                    <p className="text-[11px] text-[#4E6E58] font-serif pt-1">
                      Demo verification code sent. You may enter any 6 digits (e.g. 123456).
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-6 rounded-xl bg-[#8C4E28] hover:bg-[#723F20] text-[#FAF4E8] font-serif text-xs uppercase tracking-widest transition-colors shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>Verifying...</span>
                  ) : otpSent ? (
                    <>
                      <span>Enter Sanctuary</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <span>Request Verification Code</span>
                  )}
                </button>
              </form>
            ) : (
              /* Form: Email & Password */
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-serif uppercase tracking-wider text-[#2A1A12]/80 block">
                    Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aaditya Rawat"
                    className="w-full px-4 py-2.5 text-base sm:text-sm bg-[#EFE4CF]/60 border border-[#B8964F]/50 rounded-xl focus:outline-none focus:border-[#8C4E28] text-[#2A1A12]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-serif uppercase tracking-wider text-[#2A1A12]/80 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@example.com"
                    className="w-full px-4 py-2.5 text-base sm:text-sm bg-[#EFE4CF]/60 border border-[#B8964F]/50 rounded-xl focus:outline-none focus:border-[#8C4E28] text-[#2A1A12]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-serif uppercase tracking-wider text-[#2A1A12]/80 block">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 pr-10 text-base sm:text-sm bg-[#EFE4CF]/60 border border-[#B8964F]/50 rounded-xl focus:outline-none focus:border-[#8C4E28] text-[#2A1A12]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-[#2A1A12]/60 hover:text-[#2A1A12]"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Choose Avatar Motif */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-serif uppercase tracking-wider text-[#2A1A12]/80 block">
                    Select Your Atelier Emblem
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {AVATAR_OPTIONS.map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setSelectedAvatar(opt.id)}
                        className={`p-1.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                          selectedAvatar === opt.id
                            ? 'border-[#8C4E28] bg-[#FAF4E8] ring-2 ring-[#8C4E28]/30 shadow-sm'
                            : 'border-[#B8964F]/30 bg-[#EFE4CF]/40 hover:border-[#B8964F]'
                        }`}
                        title={opt.label}
                      >
                        <AvatarIcon styleName={opt.id} size="sm" variant="light" />
                        <span className="text-[9px] font-serif text-[#2A1A12]/70 truncate max-w-[40px] mt-0.5">
                          {opt.label.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-6 rounded-xl bg-[#8C4E28] hover:bg-[#723F20] text-[#FAF4E8] font-serif text-xs uppercase tracking-widest transition-colors shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isLoading ? <span>Signing in...</span> : <span>Sign In to Account</span>}
                </button>
              </form>
            )}

            {/* Alternative One-Click Auth */}
            <div className="pt-2 space-y-3">
              <div className="relative text-center">
                <span className="bg-[#FAF4E8] px-3 text-[11px] text-[#2A1A12]/60 font-serif relative z-10">
                  or authenticate via
                </span>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#B8964F]/20" />
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleMock}
                className="w-full py-2.5 px-4 rounded-xl border border-[#B8964F]/50 bg-[#EFE4CF]/40 hover:bg-[#EFE4CF] text-xs font-serif text-[#2A1A12] flex items-center justify-center gap-2.5 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </div>

          {/* Guest Checkout Fallback */}
          <div className="pt-6 border-t border-[#B8964F]/20 text-center">
            <Link
              href={redirectUrl.includes('checkout') ? redirectUrl : '/checkout'}
              className="text-xs text-[#8C4E28] hover:text-[#723F20] font-serif underline tracking-wide"
            >
              Prefer not to sign in? Continue as Guest at Checkout →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF4E8] flex items-center justify-center font-serif text-sm text-[#8C4E28]">
          Opening Patron Sanctuary…
        </div>
      }
    >
      <LoginContent />
    </React.Suspense>
  );
}

