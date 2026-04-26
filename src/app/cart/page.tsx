'use client'

import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCartStore } from '@/lib/store'
import { useMemo } from 'react'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getItemsByVendor, getTotalPrice } = useCartStore()

  // Group items by vendor
  const vendorGroups = useMemo(() => {
    const groups: Record<string, typeof items> = {}
    items.forEach((item) => {
      if (!groups[item.vendorId]) {
        groups[item.vendorId] = []
      }
      groups[item.vendorId].push(item)
    })
    return groups
  }, [items])

  const totalPrice = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-24 pb-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center py-20">
              <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-gray-600" />
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Your cart is empty</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-ocean-500 to-sunset-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-ocean-50 to-sunset-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Shopping Cart</h1>
          <p className="text-gray-600 dark:text-gray-400">{items.length} items in your cart</p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {Object.entries(vendorGroups).map(([vendorId, vendorItems], groupIndex) => (
                <motion.div
                  key={vendorId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: groupIndex * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 card-shadow"
                >
                  {/* Vendor Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {vendorItems[0].vendor}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{vendorItems.length} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        ${vendorItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-4">
                    {vendorItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-ocean-100 to-sunset-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-3xl">🛒</span>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                          <p className="text-lg font-bold gradient-text mt-1">${item.price.toFixed(2)}</p>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900 dark:text-gray-100">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Clear Cart */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                Clear Cart
              </motion.button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 card-shadow sticky top-24"
              >
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Delivery Fee</span>
                    <span>$4.99</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-gray-100">
                      <span>Total</span>
                      <span>${(totalPrice + 4.99 + totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full text-center bg-gradient-to-r from-ocean-500 to-sunset-500 text-white py-4 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/products"
                  className="block w-full text-center mt-4 text-ocean-500 hover:text-ocean-600 font-medium transition-colors"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
