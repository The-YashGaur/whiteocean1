'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Store, 
  CheckCircle, 
  Clock, 
  XCircle,
  TrendingUp,
  Package,
  Percent,
  Plus
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Mock data
  const stats = [
    { label: 'Total Revenue', value: '$124,590', change: '+15.3%', icon: DollarSign },
    { label: 'Total Orders', value: '2,345', change: '+12.1%', icon: ShoppingCart },
    { label: 'Active Vendors', value: '156', change: '+8', icon: Store },
    { label: 'Total Users', value: '12,459', change: '+234', icon: Users },
  ]

  const pendingVendors = [
    { id: 1, name: 'Fresh Farms Co', email: 'contact@freshfarms.com', products: 12, applied: '2 days ago' },
    { id: 2, name: 'Ocean Harvest', email: 'info@oceanharvest.com', products: 8, applied: '3 days ago' },
    { id: 3, name: 'Green Valley', email: 'hello@greenvalley.com', products: 15, applied: '5 days ago' },
  ]

  const recentOrders = [
    { id: '#12345', vendor: 'Green Valley Farms', customer: 'John Doe', total: '$89.99', status: 'Delivered' },
    { id: '#12346', vendor: 'Ocean Greens', customer: 'Jane Smith', total: '$45.50', status: 'Processing' },
    { id: '#12347', vendor: 'Dairy Fresh Co', customer: 'Bob Johnson', total: '$32.25', status: 'Pending' },
    { id: '#12348', vendor: 'Artisan Bakery', customer: 'Alice Brown', total: '$28.99', status: 'Delivered' },
  ]

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vendors', label: 'Vendors', icon: Store },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'coupons', label: 'Coupons', icon: Percent },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="pt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 card-shadow sticky top-24"
              >
                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Admin Panel</h2>
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-ocean-500 to-sunset-500 text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === 'dashboard' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean-100 to-sunset-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                            <stat.icon className="w-6 h-6 text-ocean-500" />
                          </div>
                          <span className="text-sm text-green-500 font-medium">{stat.change}</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pending Vendor Approvals */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Pending Vendor Approvals</h2>
                    <div className="space-y-4">
                      {pendingVendors.map((vendor) => (
                        <div
                          key={vendor.id}
                          className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-gray-100">{vendor.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{vendor.email}</p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                {vendor.products} products • Applied {vendor.applied}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                <CheckCircle className="w-4 h-4" />
                                <span>Approve</span>
                              </button>
                              <button className="flex items-center space-x-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                                <XCircle className="w-4 h-4" />
                                <span>Reject</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Recent Orders</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Order ID</th>
                            <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Vendor</th>
                            <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Customer</th>
                            <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Total</th>
                            <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700">
                              <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{order.id}</td>
                              <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{order.vendor}</td>
                              <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{order.customer}</td>
                              <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{order.total}</td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    order.status === 'Delivered'
                                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                      : order.status === 'Processing'
                                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'vendors' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Vendor Management</h1>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
                    <div className="space-y-4">
                      {[
                        { id: 1, name: 'Green Valley Farms', email: 'contact@greenvalley.com', products: 45, rating: 4.8, status: 'Active' },
                        { id: 2, name: 'Ocean Greens', email: 'info@oceangreens.com', products: 32, rating: 4.6, status: 'Active' },
                        { id: 3, name: 'Dairy Fresh Co', email: 'hello@dairyfresh.com', products: 28, rating: 4.9, status: 'Active' },
                        { id: 4, name: 'Artisan Bakery', email: 'bake@artisan.com', products: 15, rating: 4.7, status: 'Active' },
                      ].map((vendor) => (
                        <div
                          key={vendor.id}
                          className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-gray-100">{vendor.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{vendor.email}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400 dark:text-gray-500">
                                <span>{vendor.products} products</span>
                                <span>★ {vendor.rating}</span>
                                <span className={`px-2 py-1 rounded-full ${
                                  vendor.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700'
                                }`}>{vendor.status}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                                <XCircle className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Order Management</h1>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-gray-100">{order.id}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{order.vendor} → {order.customer}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900 dark:text-gray-100">{order.total}</p>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  order.status === 'Delivered'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : order.status === 'Processing'
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'users' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">User Management</h1>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
                    <p className="text-gray-500 dark:text-gray-400">User management features coming soon...</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'coupons' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Coupon Management</h1>
                    <button className="flex items-center space-x-2 bg-gradient-to-r from-ocean-500 to-sunset-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                      <Plus className="w-5 h-5" />
                      <span>Add Coupon</span>
                    </button>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { code: 'WELCOME10', discount: '10%', expiry: 'Dec 31, 2026', status: 'Active' },
                        { code: 'SUMMER20', discount: '20%', expiry: 'Aug 31, 2026', status: 'Active' },
                        { code: 'FRESH15', discount: '15%', expiry: 'Nov 30, 2026', status: 'Inactive' },
                      ].map((coupon) => (
                        <div
                          key={coupon.code}
                          className="p-6 rounded-xl bg-gradient-to-br from-ocean-50 to-sunset-50 dark:from-gray-700 dark:to-gray-600 border border-dashed border-2 border-ocean-300 dark:border-ocean-600"
                        >
                          <div className="text-center">
                            <p className="text-2xl font-bold gradient-text">{coupon.code}</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">{coupon.discount} OFF</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Expires: {coupon.expiry}</p>
                            <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                              coupon.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700'
                            }`}>{coupon.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
