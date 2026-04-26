'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, User, Search, Menu, X, Sun, Moon, Store, Package, LayoutDashboard } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { cart, getCartCount, user, logout, darkMode, toggleDarkMode, setSearchQuery } = useStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(searchValue)
    setIsSearchOpen(false)
    if (searchValue) {
      window.location.href = `/products?search=${encodeURIComponent(searchValue)}`
    }
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    ...(user?.role === 'vendor' ? [{ href: '/vendor', label: 'Vendor Dashboard' }] : []),
    ...(user?.role === 'admin' ? [{ href: '/admin', label: 'Admin Panel' }] : []),
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-500 to-sunset-500 rounded-xl transform rotate-3 group-hover:rotate-6 transition-transform" />
                <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🌊</span>
                </div>
              </div>
              <span className="text-xl font-bold font-display bg-gradient-to-r from-ocean-600 to-sunset-500 bg-clip-text text-transparent">
                WhiteOcean
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-ocean-500 dark:hover:text-ocean-400 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden sm:flex"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="hidden sm:flex"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-sunset-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {getCartCount()}
                    </span>
                  )}
                </Button>
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="hidden sm:flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{user.name}</span>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/auth" className="hidden sm:block">
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            >
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto px-4 py-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search products, vendors, categories..."
                    className="pl-12 pr-4 h-12 text-lg"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    autoFocus
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-2xl">
              <div className="p-6 pt-20 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-lg font-medium text-gray-900 dark:text-white hover:text-ocean-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-gray-200 dark:border-gray-800" />
                <button
                  onClick={() => {
                    toggleDarkMode()
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex items-center space-x-3 text-gray-900 dark:text-white"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                {user ? (
                  <button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="block text-lg font-medium text-red-500"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/auth"
                    className="block text-lg font-medium text-ocean-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login / Register
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
