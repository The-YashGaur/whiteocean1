'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package, Truck, AlertCircle } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { toast } from 'sonner'

const formatPrice = (price: number) => `₹${price.toFixed(2)}`

export default function CartPage() {
  const { cart, getCartByVendor, getCartTotal, updateQuantity, removeFromCart, clearCart } = useStore()
  const cartByVendor = getCartByVendor()
  const vendors = Object.keys(cartByVendor)

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md px-4"
        >
          <div className="w-32 h-32 rounded-full bg-ocean-100 dark:bg-ocean-900/30 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-16 h-16 text-ocean-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you have not added anything to your cart yet. Start shopping to fill it up!
          </p>
          <Link href="/products">
            <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-ocean-500 to-sunset-500 text-white font-semibold hover:shadow-lg transition-all">
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-8">
          Shopping Cart ({cart.length} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {vendors.map((vendor) => (
                <motion.div
                  key={vendor}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Vendor Header */}
                  <div className="bg-ocean-50 dark:bg-ocean-900/20 px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-ocean-500" />
                      <span className="font-semibold text-gray-900 dark:text-white">{vendor}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({cartByVendor[vendor].length} items)
                      </span>
                    </div>
                  </div>

                  {/* Vendor Items */}
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {cartByVendor[vendor].map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        className="p-6 flex gap-4"
                      >
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/products/${item.id}`}>
                            <h3 className="font-semibold text-gray-900 dark:text-white hover:text-ocean-500 transition-colors line-clamp-2">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {formatPrice(item.price)} / {item.unit}
                          </p>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-lg transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-10 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                              <button
                                onClick={() => {
                                  removeFromCart(item.id)
                                  toast.success('Item removed from cart')
                                }}
                                className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Vendor Subtotal */}
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Vendor Subtotal</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatPrice(
                          cartByVendor[vendor].reduce((sum, item) => sum + item.price * item.quantity, 0)
                        )}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={() => {
                clearCart()
                toast.success('Cart cleared')
              }}
              className="text-red-500 hover:text-red-600 font-medium text-sm"
            >
              Clear entire cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Shipping
                  </span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (5%)</span>
                  <span>{formatPrice(getCartTotal() * 0.05)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-ocean-500">
                      {formatPrice(getCartTotal() * 1.05)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/checkout">
                  <button className="flex items-center justify-center gap-2 w-full h-14 rounded-xl bg-gradient-to-r from-ocean-500 to-sunset-500 text-white font-semibold hover:shadow-lg transition-all text-lg">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/products">
                  <button className="w-full h-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Continue Shopping
                  </button>
                </Link>
              </div>

              {/* Multi-vendor notice */}
              {vendors.length > 1 && (
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Your order contains items from {vendors.length} different vendors. Each vendor will ship their items separately.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
