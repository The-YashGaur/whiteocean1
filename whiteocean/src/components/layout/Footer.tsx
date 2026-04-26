'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowUp, Globe, Video, Camera, MessageCircle } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
    vendors: [
      { label: 'Sell on WhiteOcean', href: '/vendor/join' },
      { label: 'Vendor Portal', href: '/vendor' },
      { label: 'Vendor Guidelines', href: '/vendor/guidelines' },
      { label: 'Success Stories', href: '/vendor/stories' },
    ],
  }

  const socialLinks = [
    { icon: Globe, href: '#', label: 'Facebook' },
    { icon: MessageCircle, href: '#', label: 'Twitter' },
    { icon: Camera, href: '#', label: 'Instagram' },
    { icon: Video, href: '#', label: 'Youtube' },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-black text-white relative overflow-hidden">
      {/* Wave Decoration */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-ocean-500/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-500 to-sunset-500 rounded-xl" />
                <div className="absolute inset-0 bg-gray-900 rounded-xl flex items-center justify-center m-0.5">
                  <span className="text-xl">🌊</span>
                </div>
              </div>
              <span className="text-xl font-bold font-display bg-gradient-to-r from-ocean-400 to-sunset-400 bg-clip-text text-transparent">
                WhiteOcean
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Ride the Wave of Smart Shopping. Your one-stop destination for fresh groceries from trusted local vendors.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-ocean-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-ocean-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-ocean-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vendors Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Vendors</h3>
            <ul className="space-y-3">
              {footerLinks.vendors.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-ocean-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>support@whiteocean.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+91 1800-123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Mumbai, India</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} WhiteOcean. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            className="mt-4 md:mt-0 flex items-center space-x-2 text-gray-400 hover:text-ocean-400 transition-colors"
          >
            <span className="text-sm">Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
