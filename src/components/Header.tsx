'use client'

import Link from 'next/link'
import { ShoppingCart, Search, User, Menu, Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCartStore } from '@/lib/store'
import { useThemeStore } from '@/lib/store'
import { useState } from 'react'

export default function Header() {
  const { getTotalItems } = useCartStore()
  const { isDark, toggleTheme } = useThemeStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const totalItems = getTotalItems()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sunset-500 to-ocean-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">WhiteOcean</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ride the Wave</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-ocean-500 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 dark:text-gray-300 hover:text-ocean-500 transition-colors">
              Products
            </Link>
            <Link href="/become-vendor" className="text-gray-700 dark:text-gray-300 hover:text-ocean-500 transition-colors">
              Become a Vendor
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-ocean-500 transition-colors">
              About
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-sunset-500 text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User */}
            <Link href="/login" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-ocean-500 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 dark:text-gray-300 hover:text-ocean-500 transition-colors">
                Products
              </Link>
              <Link href="/vendors" className="text-gray-700 dark:text-gray-300 hover:text-ocean-500 transition-colors">
                Vendors
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-ocean-500 transition-colors">
                About
              </Link>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
