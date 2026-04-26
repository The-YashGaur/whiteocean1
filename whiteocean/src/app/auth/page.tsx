'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Sparkles, CheckCircle } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { toast } from 'sonner'

type AuthMode = 'login' | 'register' | 'otp' | 'forgot'

export default function AuthPage() {
  const router = useRouter()
  const { setUser } = useStore()
  const [mode, setMode] = useState<AuthMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (mode === 'login') {
      setUser({
        id: '1',
        name: 'Demo User',
        email: formData.email,
        role: 'customer',
      })
      toast.success('Welcome back!')
      router.push('/')
    } else if (mode === 'register') {
      setMode('otp')
      toast.success('OTP sent to your phone!')
    } else if (mode === 'otp') {
      setUser({
        id: '1',
        name: formData.name,
        email: formData.email,
        role: 'customer',
      })
      toast.success('Account created successfully!')
      router.push('/')
    }

    setIsLoading(false)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 to-sunset-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-8">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col justify-center"
        >
          <Link href="/" className="flex items-center space-x-2 mb-8">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-ocean-500 to-sunset-500 rounded-xl" />
              <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center m-1">
                <span className="text-2xl">🌊</span>
              </div>
            </div>
            <span className="text-2xl font-bold font-display bg-gradient-to-r from-ocean-600 to-sunset-500 bg-clip-text text-transparent">
              WhiteOcean
            </span>
          </Link>
          
          <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
            Ride the Wave of Smart Shopping
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Join thousands of satisfied customers and experience the future of grocery shopping.
          </p>

          <div className="space-y-4">
            {[
              'Fresh products from trusted vendors',
              'Fast delivery to your doorstep',
              'Easy returns and refunds',
              'Secure payment options',
            ].map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-ocean-500" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8"
        >
          <AnimatePresence mode="wait">
            {mode === 'otp' ? (
              <motion.div
                key="otp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-ocean-100 dark:bg-ocean-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-ocean-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verify your phone</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Enter the 6-digit code sent to +91 {formData.phone}
                </p>

                <div className="flex justify-center gap-2 mb-8">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-ocean-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  ))}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading || otp.some(d => !d)}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-ocean-500 to-sunset-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <p className="mt-4 text-sm text-gray-500">
                  Did not receive code?{' '}
                  <button className="text-ocean-500 hover:underline">Resend</button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {mode === 'login' && 'Welcome back'}
                    {mode === 'register' && 'Create account'}
                    {mode === 'forgot' && 'Reset password'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {mode === 'login' && 'Sign in to continue shopping'}
                    {mode === 'register' && 'Join our community today'}
                    {mode === 'forgot' && 'Enter your email to reset password'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'register' && (
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-ocean-500 focus:outline-none"
                        required
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-ocean-500 focus:outline-none"
                      required
                    />
                  </div>

                  {mode === 'register' && (
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-ocean-500 focus:outline-none"
                        required
                      />
                    </div>
                  )}

                  {mode !== 'forgot' && (
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-10 pr-10 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-ocean-500 focus:outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  )}

                  {mode === 'login' && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <input type="checkbox" className="rounded border-gray-300" />
                        Remember me
                      </label>
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-sm text-ocean-500 hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-ocean-500 to-sunset-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      'Please wait...'
                    ) : (
                      <>
                        {mode === 'login' && 'Sign In'}
                        {mode === 'register' && 'Create Account'}
                        {mode === 'forgot' && 'Send Reset Link'}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  {mode === 'login' ? (
                    <p className="text-gray-600 dark:text-gray-400">
                      Don't have an account?{' '}
                      <button
                        onClick={() => setMode('register')}
                        className="text-ocean-500 font-medium hover:underline"
                      >
                        Sign up
                      </button>
                    </p>
                  ) : mode === 'register' ? (
                    <p className="text-gray-600 dark:text-gray-400">
                      Already have an account?{' '}
                      <button
                        onClick={() => setMode('login')}
                        className="text-ocean-500 font-medium hover:underline"
                      >
                        Sign in
                      </button>
                    </p>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      Remember your password?{' '}
                      <button
                        onClick={() => setMode('login')}
                        className="text-ocean-500 font-medium hover:underline"
                      >
                        Sign in
                      </button>
                    </p>
                  )}
                </div>

                {/* Social Login */}
                {mode !== 'forgot' && (
                  <>
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-2 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </button>
                      <button className="flex items-center justify-center gap-2 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.684.8-1.77 1.404-2.692 1.404-1.315 0-2.404-.89-2.404-2.06 0-1.17 1.09-2.06 2.404-2.06.922 0 2.008.604 2.692 1.404.684.81 1.177 1.94 1.177 3.08zm4.86 15.04c-.023.053-.047.106-.071.158-.655 1.38-1.967 2.98-3.565 2.98-1.155 0-1.84-.667-2.628-.667-.837 0-1.544.668-2.632.668-1.59 0-2.97-1.45-3.648-2.858-.995-2.11-1.235-4.69-.514-6.27.533-1.16 1.493-1.93 2.556-1.93 1.19 0 1.876.758 2.624.758.704 0 1.79-.758 3.038-.758.998 0 1.937.48 2.503 1.21-1.667.978-1.396 3.75.336 4.48-.414 1.32-.953 2.52-1.499 3.47z"/>
                        </svg>
                        Apple
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
