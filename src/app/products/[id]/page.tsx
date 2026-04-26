'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { Star, ShoppingCart, Heart, Truck, Shield, Clock, Minus, Plus } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { mockProducts } from '@/lib/mock-data'
import { useCartStore } from '@/lib/store'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  const product = mockProducts.find((p) => p.id === params.id)
  const relatedProducts = mockProducts
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Product not found</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <section className="pt-24 pb-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-500 dark:text-gray-400">
            <button onClick={() => router.push('/products')} className="hover:text-ocean-500">
              Products
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-gray-100">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-ocean-100 to-sunset-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center overflow-hidden">
                <div className="w-64 h-64 rounded-2xl bg-white dark:bg-gray-700 shadow-2xl flex items-center justify-center">
                  <span className="text-8xl">🛒</span>
                </div>
              </div>

              {/* Stock Badge */}
              {product.stock < 10 && product.stock > 0 && (
                <div className="absolute top-4 left-4 bg-sunset-500 text-white text-sm px-3 py-1 rounded-full">
                  Only {product.stock} left
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Vendor */}
              <p className="text-ocean-500 font-medium">{product.vendor}</p>

              {/* Name */}
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-sunset-400 text-sunset-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">{product.rating} rating</span>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold gradient-text">
                ${product.price.toFixed(2)}
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-white dark:bg-gray-700 card-shadow">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-ocean-500" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Fast Delivery</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white dark:bg-gray-700 card-shadow">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-ocean-500" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Quality Assured</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white dark:bg-gray-700 card-shadow">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-ocean-500" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Fresh Stock</p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-gray-900 dark:text-gray-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-full font-semibold transition-all ${
                    product.stock === 0
                      ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-ocean-500 to-sunset-500 text-white hover:shadow-lg'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className="w-14 h-14 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`}
                  />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
