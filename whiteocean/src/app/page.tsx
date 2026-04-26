'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShoppingBag, Truck, Shield, Clock, Sparkles } from 'lucide-react'
import { OceanWaves } from '@/components/three/OceanWaves'
import { ProductCard } from '@/components/product/ProductCard'
import { products, categories, vendors } from '@/data/mockData'

export default function LandingPage() {
  const featuredProducts = products.slice(0, 8)
  const featuredVendors = vendors.slice(0, 3)

  return (
    <div className="relative">
      {/* Hero Section with Three.js Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <OceanWaves />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-6"
              >
                <Sparkles className="w-4 h-4 text-sunset-400" />
                <span className="text-sm font-medium">New Vendors Joining Daily</span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-bold font-display text-white mb-6 leading-tight">
                Ride the Wave of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset-400 to-sunset-300">
                  Smart Shopping
                </span>
              </h1>
              
              <p className="text-xl text-white/80 mb-8 max-w-lg">
                Discover fresh groceries from trusted local vendors. Quality products, competitive prices, delivered to your doorstep.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-ocean-500 to-sunset-500 text-white font-semibold hover:shadow-lg transition-all text-lg">
                    <ShoppingBag className="w-5 h-5" />
                    Shop Now
                  </button>
                </Link>
                <Link href="/become-vendor">
                  <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all text-lg">
                    Become a Vendor
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20">
                {[
                  { value: '50+', label: 'Local Vendors' },
                  { value: '10K+', label: 'Products' },
                  { value: '25K+', label: 'Happy Customers' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-ocean-500/30 to-sunset-500/30 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                  <Image
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=60"
                    alt="Fresh groceries"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-2xl"
                  />
                  
                  {/* Floating Cards */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -left-8 top-1/4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <span className="text-2xl">🥬</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Fresh Veggies</p>
                        <p className="text-xs text-gray-500">Just arrived</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -right-8 bottom-1/4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                        <span className="text-2xl">🚚</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Fast Delivery</p>
                        <p className="text-xs text-gray-500">30 mins</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
              Why Choose <span className="text-gradient">WhiteOcean</span>?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We connect you with the best local vendors for fresh, quality products delivered to your doorstep.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShoppingBag, title: 'Wide Selection', desc: '10,000+ products from 50+ vendors' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Same-day delivery on all orders' },
              { icon: Shield, title: 'Quality Assured', desc: '100% fresh & authentic products' },
              { icon: Clock, title: '24/7 Support', desc: 'Round the clock customer service' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean-100 to-sunset-100 dark:from-ocean-900/30 dark:to-sunset-900/30 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-ocean-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
              Shop by <span className="text-gradient">Category</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our wide range of categories and find exactly what you need.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link href={`/products?category=${category.id}`}>
                  <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.color} p-6 h-40 flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transition-all cursor-pointer`}>
                    <span className="text-4xl mb-2">{category.icon}</span>
                    <span className="text-lg font-semibold text-center">{category.name}</span>
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
                Featured <span className="text-gradient">Products</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                Handpicked selection of our best-selling and most popular items.
              </p>
            </div>
            <Link href="/products">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
              Trusted <span className="text-gradient">Vendors</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Partner with the best local vendors committed to quality and freshness.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredVendors.map((vendor, i) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ocean-500 to-sunset-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">{vendor.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{vendor.name}</h3>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-sunset-500" />
                    {vendor.rating} rating
                  </span>
                  <span>{vendor.products} products</span>
                </div>
                <Link href={`/products?vendor=${vendor.id}`}>
                  <button className="w-full px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    View Products
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-600 to-sunset-600" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-display text-white mb-6">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and experience the future of grocery shopping.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/products">
                <button className="px-8 py-4 rounded-2xl bg-white text-ocean-600 font-semibold hover:bg-gray-100 transition-all text-lg">
                  Start Shopping
                </button>
              </Link>
              <Link href="/become-vendor">
                <button className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all text-lg">
                  Become a Vendor
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
