'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sunset-500 to-ocean-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">WhiteOcean</h3>
                <p className="text-xs text-gray-400">Ride the Wave</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Your one-stop multi-vendor marketplace for fresh groceries and quality products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-ocean-400 transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/vendors" className="text-gray-400 hover:text-ocean-400 transition-colors text-sm">
                  Vendors
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-ocean-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-ocean-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-ocean-400 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-ocean-400 transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-ocean-400 transition-colors text-sm">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-ocean-400 transition-colors text-sm">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>support@whiteocean.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>123 Ocean Drive, CA 90210</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-400 hover:text-ocean-400 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 WhiteOcean. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
