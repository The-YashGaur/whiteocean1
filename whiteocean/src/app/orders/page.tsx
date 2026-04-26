'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle, Clock, ChevronRight, MapPin, Phone, AlertCircle, Download } from 'lucide-react'
import { useStore } from '@/store/useStore'

const formatPrice = (price: number) => `₹${price.toFixed(2)}`
const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const orderStatuses = [
  { id: 'pending', label: 'Pending', icon: Clock, color: 'bg-yellow-500' },
  { id: 'confirmed', label: 'Confirmed', icon: CheckCircle, color: 'bg-blue-500' },
  { id: 'processing', label: 'Processing', icon: Package, color: 'bg-purple-500' },
  { id: 'shipped', label: 'Shipped', icon: Truck, color: 'bg-ocean-500' },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle, color: 'bg-green-500' },
]

export default function OrdersPage() {
  const { orders, user } = useStore()
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Please sign in</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You need to be logged in to view your orders.</p>
          <Link href="/auth">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-ocean-500 to-sunset-500 text-white font-semibold hover:shadow-lg transition-all">Sign In</button>
          </Link>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No orders yet</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Start shopping to place your first order!</p>
          <Link href="/products">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-ocean-500 to-sunset-500 text-white font-semibold hover:shadow-lg transition-all">Browse Products</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-8">My Orders</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2 space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className={`bg-white dark:bg-gray-900 rounded-2xl card-shadow cursor-pointer transition-all ${
                    selectedOrder === order.id ? 'ring-2 ring-ocean-500' : ''
                  }`}
                  onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold text-gray-900 dark:text-white">{order.id}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">{formatPrice(order.total)}</p>
                        <p className="text-sm text-gray-500">{order.items.length} items</p>
                      </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="relative mt-6">
                      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2" />
                      <div className="relative flex justify-between">
                        {orderStatuses.map((status, i) => {
                          const isCompleted = orderStatuses.findIndex(s => s.id === order.status) >= i
                          const statusIndex = orderStatuses.findIndex(s => s.id === order.status)
                          
                          return (
                            <div key={status.id} className="flex flex-col items-center bg-white dark:bg-gray-900 px-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isCompleted ? status.color : 'bg-gray-200 dark:bg-gray-700'
                              }`}>
                                <status.icon className={`w-4 h-4 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                              </div>
                              <span className={`text-xs mt-1 ${
                                isCompleted ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-400'
                              }`}>
                                {status.label}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedOrder === order.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800"
                      >
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order Items</h3>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <Package className="w-8 h-8 text-gray-400" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                              </div>
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                            <span className="text-gray-900 dark:text-white">{formatPrice(order.total / 1.05)}</span>
                          </div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600 dark:text-gray-400">Tax (5%)</span>
                            <span className="text-gray-900 dark:text-white">{formatPrice(order.total - order.total / 1.05)}</span>
                          </div>
                          <div className="flex justify-between font-semibold text-lg">
                            <span className="text-gray-900 dark:text-white">Total</span>
                            <span className="text-ocean-500">{formatPrice(order.total)}</span>
                          </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Download className="w-4 h-4" />
                            Download Invoice
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Track Order
                          </button>
                        </div>
                      </motion.div>
                    )}

                    <div className="mt-4 flex items-center justify-center text-ocean-500">
                      <ChevronRight className={`w-5 h-5 transition-transform ${
                        selectedOrder === order.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Delivery Info */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl card-shadow sticky top-24">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delivery Address</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-ocean-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Home</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        123, Ocean View Apartments<br />
                        Marine Lines, Mumbai 400002<br />
                        Maharashtra, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-ocean-500" />
                    <p className="text-gray-900 dark:text-white">+91 98765 43210</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Need Help?</h4>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-ocean-500" />
                      <span className="text-gray-700 dark:text-gray-300">Report an Issue</span>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-3">
                      <Package className="w-5 h-5 text-ocean-500" />
                      <span className="text-gray-700 dark:text-gray-300">Return Order</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
