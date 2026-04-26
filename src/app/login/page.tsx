'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuthStore } from '@/lib/store'

type AuthMode = 'login' | 'register' | 'otp'

export default function LoginPage() {
  const { login } = useAuthStore()
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      login({
        id: '1',
        name: 'John Doe',
        email,
        role: 'customer',
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate sending OTP
    setTimeout(() => {
      setMode('otp')
      setIsLoading(false)
    }, 1000)
  }

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate OTP verification
    setTimeout(() => {
      login({
        id: '1',
        name,
        email,
        role: 'customer',
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      nextInput?.focus()
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-ocean-50 via-white to-sunset-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 card-shadow"
            >
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-ocean-500 to-sunset-500 flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-2xl">W</span>
                </div>
                <h1 className="text-2xl font-bold gradient-text">WhiteOcean</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {mode === 'login' ? 'Welcome back!' : mode === 'register' ? 'Create your account' : 'Verify your phone'}
                </p>
              </div>

              {mode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded border-gray-300 dark:border-gray-600" />
                      <span className="text-gray-600 dark:text-gray-400">Remember me</span>
                    </label>
                    <a href="#" className="text-ocean-500 hover:text-ocean-600">
                      Forgot password?
                    </a>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-ocean-500 to-sunset-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </motion.button>

                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="text-ocean-500 hover:text-ocean-600 font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                </form>
              )}

              {mode === 'register' && (
                <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-ocean-500 to-sunset-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </motion.button>

                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-ocean-500 hover:text-ocean-600 font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              )}

              {mode === 'otp' && (
                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div className="text-center mb-6">
                    <p className="text-gray-600 dark:text-gray-400">
                      We've sent a 6-digit code to {email}
                    </p>
                  </div>

                  <div className="flex justify-center space-x-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        className="w-12 h-12 text-center text-2xl font-bold rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                      />
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading || otp.join('').length !== 6}
                    className="w-full bg-gradient-to-r from-ocean-500 to-sunset-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Verifying...' : 'Verify'}
                  </motion.button>

                  <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                    Didn't receive code?{' '}
                    <button type="button" className="text-ocean-500 hover:text-ocean-600 font-medium">
                      Resend
                    </button>
                  </p>
                </form>
              )}

              {/* Back to Home */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/"
                  className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-ocean-500 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
