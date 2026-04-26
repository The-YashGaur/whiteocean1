'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react'
import { Product } from '@/store/useStore'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 dark:shadow-black/20 hover:shadow-2xl hover:shadow-ocean-500/10 transition-all duration-300 border border-gray-100 dark:border-gray-800">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
              <Link href={`/products/${product.id}`}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-ocean-500 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Stock Badge */}
          {product.stock < 10 && (
            <Badge variant="warning" className="absolute top-4 left-4">
              Only {product.stock} left
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Vendor */}
          <p className="text-xs text-ocean-500 font-medium mb-1">{product.vendor}</p>
          
          {/* Title */}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-ocean-500 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-sunset-500 fill-sunset-500'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({product.reviews})
            </span>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">/ {product.unit}</span>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="icon" className="rounded-xl">
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
