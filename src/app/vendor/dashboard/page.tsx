'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAddProduct, setShowAddProduct] = useState(false)

  // Mock data
  const stats = [
    { label: 'Total Sales', value: '$12,459', change: '+12.5%', icon: TrendingUp },
    { label: 'Total Orders', value: '234', change: '+8.2%', icon: ShoppingCart },
    { label: 'Products', value: '45', change: '+3', icon: Package },
    { label: 'Rating', value: '4.8', change: '+0.2', icon: TrendingUp },
  ]

  const recentOrders = [
    { id: '#1234', customer: 'John Doe', items: 3, total: '$45.99', status: 'Delivered' },
    { id: '#1235', customer: 'Jane Smith', items: 2, total: '$32.50', status: 'Processing' },
    { id: '#1236', customer: 'Bob Johnson', items: 5, total: '$78.25', status: 'Pending' },
    { id: '#1237', customer: 'Alice Brown', items: 1, total: '$12.99', status: 'Delivered' },
  ]

  const products = [
    { id: 1, name: 'Fresh Organic Apples', price: '$4.99', stock: 50, category: 'Fruits', status: 'Active' },
    { id: 2, name: 'Organic Bananas', price: '$2.99', stock: 100, category: 'Fruits', status: 'Active' },
    { id: 3, name: 'Fresh Spinach Bundle', price: '$3.49', stock: 30, category: 'Vegetables', status: 'Active' },
    { id: 4, name: 'Organic Carrots', price: '$2.49', stock: 80, category: 'Vegetables', status: 'Low Stock' },
  ]

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
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
                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Vendor Portal</h2>
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

                  {/* Recent Orders */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Recent Orders</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Order ID</th>
                            <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Customer</th>
                            <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Items</th>
                            <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Total</th>
                            <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700">
                              <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{order.id}</td>
                              <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{order.customer}</td>
                              <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{order.items}</td>
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

              {activeTab === 'products' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Products</h1>
                    <button
                      onClick={() => setShowAddProduct(true)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-ocean-500 to-sunset-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add Product</span>
                    </button>
                  </div>

                  {/* Search and Filter */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Filter className="w-5 h-5" />
                      <span>Filter</span>
                    </button>
                  </div>

                  {/* Products Table */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Product</th>
                          <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Price</th>
                          <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Stock</th>
                          <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Category</th>
                          <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b border-gray-100 dark:border-gray-700">
                            <td className="py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">
                              {product.name}
                            </td>
                            <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{product.price}</td>
                            <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{product.stock}</td>
                            <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{product.category}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  product.status === 'Active'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                }`}
                              >
                                {product.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                  <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                </button>
                                <button className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Orders</h1>

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
                              <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer}</p>
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
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
