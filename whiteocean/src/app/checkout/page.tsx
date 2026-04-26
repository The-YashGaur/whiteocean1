'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronRight, CreditCard, Truck, Check, MapPin, Phone, User, Building2 } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { toast } from 'sonner'

const formatPrice = (price: number) => `₹${price.toFixed(2)}`

const steps = [
  { id: 1, name: 'Delivery', icon: MapPin },
  { id: 2, name: 'Payment', icon: CreditCard },
  { id: 3, name: 'Review', icon: Check },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, getCartTotal, getCartByVendor, clearCart, addOrder } = useStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
  })
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card')
  const [upiId, setUpiId] = useState('')

  const cartByVendor = getCartByVendor()
  const vendors = Object.keys(cartByVendor)
  const subtotal = getCartTotal()
  const tax = subtotal * 0.05
  const total = subtotal + tax

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h1>
          <Link href="/products">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-ocean-500 to-sunset-500 text-white font-semibold hover:shadow-lg transition-all">Continue Shopping</button>
          </Link>
        </div>
      </div>
    )
  }

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create orders for each vendor
    vendors.forEach(vendor => {
      const vendorItems = cartByVendor[vendor]
      const vendorTotal = vendorItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      
      addOrder({
        id: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`,
        items: vendorItems,
        total: vendorTotal * 1.05,
        status: 'pending',
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      })
    })
    
    clearCart()
    toast.success('Order placed successfully!')
    router.push('/orders')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-4">Checkout</h1>
          
          {/* Stepper */}
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    currentStep >= step.id
                      ? 'bg-ocean-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                  }`}
                >
                  <step.icon className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-gray-400 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6"
            >
              {/* Step 1: Delivery Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Delivery Information</h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={deliveryInfo.fullName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeliveryInfo({ ...deliveryInfo, fullName: e.target.value })}
                          placeholder="John Doe"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-ocean-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={deliveryInfo.phone}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-ocean-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                      type="email"
                      value={deliveryInfo.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-ocean-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        value={deliveryInfo.address}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                        placeholder="Enter your full address"
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-ocean-500 focus:outline-none resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={deliveryInfo.city}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                          placeholder="Mumbai"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-ocean-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">PIN Code</label>
                      <input
                        type="text"
                        value={deliveryInfo.pincode}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeliveryInfo({ ...deliveryInfo, pincode: e.target.value })}
                        placeholder="400001"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-ocean-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Payment Method</h2>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        paymentMethod === 'card'
                          ? 'border-ocean-500 bg-ocean-50 dark:bg-ocean-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Credit / Debit Card</p>
                          <p className="text-sm text-gray-500">Pay securely with your card</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-ocean-500 bg-ocean-50 dark:bg-ocean-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold text-xs">
                          UPI
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">UPI Payment</p>
                          {paymentMethod === 'upi' && (
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpiId(e.target.value)}
                              placeholder="yourname@upi"
                              className="mt-2 w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-ocean-500 focus:outline-none"
                            />
                          )}
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('cod')}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-ocean-500 bg-ocean-50 dark:bg-ocean-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-ocean-500 rounded flex items-center justify-center text-white font-bold text-xs">
                          COD
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Cash on Delivery</p>
                          <p className="text-sm text-gray-500">Pay when you receive</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Review Order</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Delivery Address</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {deliveryInfo.fullName}<br />
                        {deliveryInfo.address}<br />
                        {deliveryInfo.city}, {deliveryInfo.pincode}<br />
                        Phone: {deliveryInfo.phone}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Payment Method</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {paymentMethod === 'card' && 'Credit / Debit Card'}
                        {paymentMethod === 'upi' && `UPI: ${upiId}`}
                        {paymentMethod === 'cod' && 'Cash on Delivery'}
                      </p>
                    </div>

                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        Your order will be split into {vendors.length} separate orders from {vendors.length} different vendors.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                {currentStep > 1 && (
                  <button onClick={handleBack} className="flex-1 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Back
                  </button>
                )}
                {currentStep < 3 ? (
                  <button onClick={handleNext} className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-ocean-500 to-sunset-500 text-white font-semibold hover:shadow-lg transition-all">
                    Continue
                  </button>
                ) : (
                  <button 
                    onClick={handlePlaceOrder} 
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-ocean-500 to-sunset-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Place Order - ${formatPrice(total)}`}
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {vendors.map(vendor => (
                  <div key={vendor} className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-white mb-1">{vendor}</p>
                    <p className="text-gray-500">
                      {cartByVendor[vendor].reduce((sum, item) => sum + item.quantity, 0)} items
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (5%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-800">
                  <span>Total</span>
                  <span className="text-ocean-500">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
