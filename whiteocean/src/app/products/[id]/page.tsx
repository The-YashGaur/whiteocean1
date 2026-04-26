'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Minus, Plus, Store, ChevronRight } from 'lucide-react'
import { products } from '@/data/mockData'
import { useStore } from '@/store/useStore'
import { ProductCard } from '@/components/product/ProductCard'
import { toast } from 'sonner'

const formatPrice = (price: number) => `₹${price.toFixed(2)}`

export default function ProductDetailPage() {
  const params = useParams()
  const { addToCart } = useStore()
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const product = products.find((p) => p.id === params.id)
  const relatedProducts = products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h1>
          <Link href="/products">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-ocean-500 to-sunset-500 text-white font-semibold hover:shadow-lg transition-all">Browse Products</button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    toast.success(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-ocean-500">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/products" className="hover:text-ocean-500">Products</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 dark:text-white">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.stock < 10 && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs font-medium">
                  Only {product.stock} left
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[product.image, product.image, product.image, product.image].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square rounded-xl overflow-hidden ${
                    activeImage === i ? 'ring-2 ring-ocean-500' : ''
                  }`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Vendor */}
            <div className="flex items-center gap-2 text-sm">
              <Store className="w-4 h-4 text-ocean-500" />
              <span className="text-gray-600 dark:text-gray-400">Sold by</span>
              <Link href={`/products?vendor=${product.vendorId}`} className="text-ocean-500 hover:underline font-medium">
                {product.vendor}
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold font-display text-gray-900 dark:text-white">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-sunset-500 fill-sunset-500'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              <span className="text-gray-500 dark:text-gray-400">/ {product.unit}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200 dark:border-gray-800">
              {[
                { icon: Truck, label: 'Free Delivery', desc: 'Orders over ₹500' },
                { icon: Shield, label: 'Quality Assured', desc: '100% Authentic' },
                { icon: RotateCcw, label: 'Easy Returns', desc: '7-day returns' },
              ].map((feature) => (
                <div key={feature.label} className="text-center">
                  <feature.icon className="w-6 h-6 text-ocean-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{feature.label}</p>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
                <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-xl transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-xl transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {product.stock} available
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 h-14 rounded-xl bg-gradient-to-r from-ocean-500 to-sunset-500 text-white font-semibold hover:shadow-lg transition-all text-lg flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  className={`h-14 w-14 rounded-xl flex items-center justify-center transition-all ${
                    isWishlisted 
                      ? 'bg-red-100 text-red-500 dark:bg-red-900/30' 
                      : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button
                  className="h-14 w-14 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-8">
              Related Products
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
