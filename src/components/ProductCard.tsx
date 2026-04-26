'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { Product } from '@/lib/store'
import { useCartStore } from '@/lib/store'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const [isLiked, setIsLiked] = useState(false)

  const handleAddToCart = () => {
    addItem(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden card-shadow group"
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-ocean-100 to-sunset-100 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-ocean-400 to-sunset-400 opacity-20 animate-float" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="w-24 h-24 rounded-xl bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center">
            <span className="text-4xl">🛒</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`}
            />
          </button>
        </div>

        {/* Stock Badge */}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-3 left-3 bg-sunset-500 text-white text-xs px-2 py-1 rounded-full">
            Only {product.stock} left
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Vendor */}
        <p className="text-xs text-ocean-500 font-medium mb-1">{product.vendor}</p>

        {/* Name */}
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <Star className="w-4 h-4 fill-sunset-400 text-sunset-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold gradient-text">${product.price.toFixed(2)}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`p-2 rounded-full ${
              product.stock === 0
                ? 'bg-gray-200 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-ocean-500 to-sunset-500 hover:shadow-lg'
            } transition-all`}
          >
            <ShoppingCart className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
