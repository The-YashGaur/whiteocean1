'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, CreditCard, MapPin, Truck, ArrowRight, Lock } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCartStore } from '@/lib/store'

type Step = 'shipping' | 'payment' | 'confirmation'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [currentStep, setCurrentStep] = useState<Step>('shipping')
  const [formData, setFormData] = useState({
    // Shipping
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    // Payment
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  })

  const totalPrice = getTotalPrice()
  const totalWithFees = totalPrice + 4.99 + totalPrice * 0.08

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleNext = () => {
    if (currentStep === 'shipping') setCurrentStep('payment')
    else if (currentStep === 'payment') setCurrentStep('confirmation')
  }

  const handleBack = () => {
    if (currentStep === 'payment') setCurrentStep('shipping')
  }

  const handlePlaceOrder = () => {
    // Simulate order placement
    clearCart()
    setCurrentStep('confirmation')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-ocean-50 to-sunset-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Checkout</h1>
          <p className="text-gray-600 dark:text-gray-400">Complete your order</p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {[
              { step: 'shipping' as Step, label: 'Shipping', icon: MapPin },
              { step: 'payment' as Step, label: 'Payment', icon: CreditCard },
              { step: 'confirmation' as Step, label: 'Confirmation', icon: Check },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentStep === item.step
                        ? 'bg-gradient-to-r from-ocean-500 to-sunset-500 text-white'
                        : currentStep === 'confirmation' || 
                          (currentStep === 'payment' && item.step === 'shipping')
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}
                  >
                    {currentStep === 'confirmation' && item.step !== 'confirmation' ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <item.icon className="w-6 h-6" />
                    )}
                  </motion.div>
                  <span className="text-sm mt-2 text-gray-600 dark:text-gray-400">{item.label}</span>
                </div>
                {index < 2 && (
                  <div className="w-16 md:w-24 h-0.5 bg-gray-200 dark:bg-gray-700 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 card-shadow"
              >
                {currentStep === 'shipping' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Shipping Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                          placeholder="New York"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                          placeholder="123 Ocean Drive"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                          placeholder="10001"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 'payment' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Payment Method
                    </h2>

                    <div className="space-y-4">
                      <label className="flex items-center p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-ocean-500 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="mr-4"
                        />
                        <CreditCard className="w-6 h-6 mr-4 text-ocean-500" />
                        <span className="font-medium text-gray-900 dark:text-gray-100">Credit/Debit Card</span>
                      </label>

                      <label className="flex items-center p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-ocean-500 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={formData.paymentMethod === 'upi'}
                          onChange={handleInputChange}
                          className="mr-4"
                        />
                        <Truck className="w-6 h-6 mr-4 text-ocean-500" />
                        <span className="font-medium text-gray-900 dark:text-gray-100">UPI</span>
                      </label>

                      <label className="flex items-center p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-ocean-500 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={handleInputChange}
                          className="mr-4"
                        />
                        <MapPin className="w-6 h-6 mr-4 text-ocean-500" />
                        <span className="font-medium text-gray-900 dark:text-gray-100">Cash on Delivery</span>
                      </label>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="space-y-4 pt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cardCvv"
                              value={formData.cardCvv}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 'confirmation' && (
                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                    >
                      <Check className="w-12 h-12 text-green-500" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      Order Placed Successfully!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Thank you for your order. You will receive a confirmation email shortly.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Order ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </p>
                  </div>
                )}

                {/* Navigation Buttons */}
                {currentStep !== 'confirmation' && (
                  <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    {currentStep === 'payment' && (
                      <button
                        onClick={handleBack}
                        className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Back
                      </button>
                    )}
                    <div className="ml-auto">
                      <button
                        onClick={currentStep === 'payment' ? handlePlaceOrder : handleNext}
                        className="flex items-center space-x-2 bg-gradient-to-r from-ocean-500 to-sunset-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                      >
                        <span>{currentStep === 'payment' ? 'Place Order' : 'Continue'}</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 'confirmation' && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      href="/products"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-ocean-500 to-sunset-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                    >
                      <span>Continue Shopping</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                )}
              </motion.div>
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
                    <span>Subtotal ({items.length} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Delivery Fee</span>
                    <span>$4.99</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax (8%)</span>
                    <span>${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-gray-100">
                      <span>Total</span>
                      <span>${totalWithFees.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Lock className="w-4 h-4" />
                  <span>Secure checkout powered by WhiteOcean</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
