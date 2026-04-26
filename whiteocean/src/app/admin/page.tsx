'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, Users, Store, ShoppingBag, DollarSign, Settings,
  TrendingUp, CheckCircle, XCircle, Clock, AlertTriangle, Search,
  MoreVertical, ChevronDown, Filter, Download, RefreshCw
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { vendors, mockOrders } from '@/data/mockData'

const formatPrice = (price: number) => `₹${price.toFixed(2)}`
const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const monthlyData = [
  { name: 'Jan', revenue: 65000, orders: 420, vendors: 35 },
  { name: 'Feb', revenue: 72000, orders: 480, vendors: 38 },
  { name: 'Mar', revenue: 68000, orders: 450, vendors: 40 },
  { name: 'Apr', revenue: 85000, orders: 560, vendors: 42 },
  { name: 'May', revenue: 92000, orders: 620, vendors: 45 },
  { name: 'Jun', revenue: 88000, orders: 590, vendors: 48 },
]

const categoryData = [
  { name: 'Fruits', value: 30 },
  { name: 'Vegetables', value: 25 },
  { name: 'Dairy', value: 20 },
  { name: 'Bakery', value: 15 },
  { name: 'Other', value: 10 },
]

const COLORS = ['#00B4D8', '#0077B6', '#FF7A00', '#FFA500', '#94A3B8']

const pendingVendors = [
  { id: 'v6', name: 'Organic Greens Co.', email: 'contact@organicgreens.com', applied: '2024-01-20', status: 'pending' },
  { id: 'v7', name: 'Premium Meats Ltd', email: 'info@premium meats.com', applied: '2024-01-19', status: 'pending' },
  { id: 'v8', name: 'Fresh Dairy Farms', email: 'hello@freshdairy.com', applied: '2024-01-18', status: 'pending' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { title: 'Total Revenue', value: '₹4,70,000', change: '+15.3%', icon: DollarSign, trend: 'up' },
    { title: 'Total Orders', value: '3,120', change: '+12.8%', icon: ShoppingBag, trend: 'up' },
    { title: 'Active Vendors', value: '48', change: '+5', icon: Store, trend: 'up' },
    { title: 'Customers', value: '15,420', change: '+8.5%', icon: Users, trend: 'up' },
  ]

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'vendors', label: 'Vendors', icon: Store },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Platform overview and management</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-ocean-500 to-sunset-500 text-white hover:shadow-lg transition-all">
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl card-shadow sticky top-24 p-4">
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === item.id
                        ? 'bg-ocean-50 dark:bg-ocean-900/20 text-ocean-600 dark:text-ocean-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 p-4 bg-gradient-to-br from-ocean-500 to-sunset-500 rounded-xl text-white">
                <p className="text-sm opacity-90 mb-2">System Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-medium">All Systems Operational</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 card-shadow hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-ocean-100 dark:bg-ocean-900/30 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-ocean-500" />
                      </div>
                      <div className="text-sm text-green-500 font-medium">{stat.change}</div>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {activeTab === 'overview' && (
              <>
                {/* Revenue Chart */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl card-shadow">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Platform Performance</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Revenue, orders, and vendor growth over 6 months</p>
                  </div>
                  <div className="p-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="name" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #E5E7EB',
                              borderRadius: '12px'
                            }} 
                          />
                          <Line type="monotone" dataKey="revenue" stroke="#00B4D8" strokeWidth={2} name="Revenue (₹)" />
                          <Line type="monotone" dataKey="orders" stroke="#FF7A00" strokeWidth={2} name="Orders" />
                          <Line type="monotone" dataKey="vendors" stroke="#0077B6" strokeWidth={2} name="Vendors" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Category Distribution */}
                  <div className="bg-white dark:bg-gray-900 rounded-2xl card-shadow">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales by Category</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Revenue distribution across product categories</p>
                    </div>
                    <div className="p-6">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex flex-wrap gap-4 justify-center mt-4">
                        {categoryData.map((entry, index) => (
                          <div key={entry.name} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{entry.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pending Vendors */}
                  <div className="bg-white dark:bg-gray-900 rounded-2xl card-shadow">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Vendor Approvals</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">New vendors awaiting approval</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-sm font-medium">
                          {pendingVendors.length} pending
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {pendingVendors.map((vendor) => (
                          <div key={vendor.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{vendor.name}</p>
                              <p className="text-sm text-gray-500">{vendor.email}</p>
                              <p className="text-xs text-gray-400">Applied: {formatDate(vendor.applied)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              </button>
                              <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                <XCircle className="w-5 h-5 text-red-500" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl card-shadow">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Platform Orders</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Latest orders across all vendors</p>
                  </div>
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-800">
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Order ID</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Vendor</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockOrders.slice(0, 5).map((order) => (
                            <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                              <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">FreshFarm Organics</td>
                              <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{formatPrice(order.total)}</td>
                              <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  order.status === 'delivered' 
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'vendors' && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl card-shadow">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Vendors</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Manage platform vendors</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          placeholder="Search vendors..." 
                          className="pl-10 w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                        />
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Filter className="w-4 h-4" />
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-800">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Vendor</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Products</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Rating</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendors.map((vendor) => (
                          <tr key={vendor.id} className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ocean-500 to-sunset-500 flex items-center justify-center text-white font-bold">
                                  {vendor.name.charAt(0)}
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">{vendor.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{vendor.products}</td>
                            <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{vendor.rating} ⭐</td>
                            <td className="py-4 px-4">
                              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium">Active</span>
                            </td>
                            <td className="py-4 px-4">
                              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                                <MoreVertical className="w-4 h-4 text-gray-600" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {pendingVendors.map((vendor) => (
                          <tr key={vendor.id} className="border-b border-gray-100 dark:border-gray-800 bg-yellow-50/50 dark:bg-yellow-900/10">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 font-bold">
                                  {vendor.name.charAt(0)}
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900 dark:text-white">{vendor.name}</span>
                                  <p className="text-xs text-gray-500">Pending approval</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-400">-</td>
                            <td className="py-4 px-4 text-sm text-gray-400">-</td>
                            <td className="py-4 px-4">
                              <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs font-medium">Pending</span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                </button>
                                <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                                  <XCircle className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
