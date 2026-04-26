'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Store, Mail, Phone, MapPin, FileText, CheckCircle, Upload, ArrowRight, X } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function BecomeVendorPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Business Info
    businessName: '',
    businessType: '',
    description: '',
    // Step 2: Contact Info
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    // Step 3: Product Categories
    categories: [] as string[],
    // Step 4: Documents
    businessLicense: null as File | null,
    taxId: null as File | null,
    termsAccepted: false,
  })

  const categories = [
    'Fruits & Vegetables',
    'Dairy & Eggs',
    'Bakery',
    'Meat & Poultry',
    'Seafood',
    'Pantry Items',
    'Beverages',
    'Frozen Foods',
  ]

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const handleFileUpload = (field: 'businessLicense' | 'taxId', file: File) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submission
    console.log('Vendor registration:', formData)
    setStep(5) // Success step
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-ocean-50 to-sunset-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Become a Vendor</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join WhiteOcean and start selling your products to thousands of customers
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      {step !== 5 && (
        <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step >= stepNumber
                          ? 'bg-gradient-to-r from-ocean-500 to-sunset-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      }`}
                    >
                      {step > stepNumber ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="font-semibold">{stepNumber}</span>
                      )}
                    </motion.div>
                    <span className="text-xs mt-2 text-gray-600 dark:text-gray-400 hidden md:block">
                      {stepNumber === 1 && 'Business Info'}
                      {stepNumber === 2 && 'Contact Info'}
                      {stepNumber === 3 && 'Categories'}
                      {stepNumber === 4 && 'Documents'}
                    </span>
                  </div>
                  {stepNumber < 4 && (
                    <div className="w-16 md:w-24 h-0.5 bg-gray-200 dark:border-gray-700 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Form Content */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {step !== 5 ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 card-shadow"
              >
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Business Information
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                        placeholder="Your Business Name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Business Type *
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                        required
                      >
                        <option value="">Select business type</option>
                        <option value="sole">Sole Proprietorship</option>
                        <option value="partnership">Partnership</option>
                        <option value="llc">LLC</option>
                        <option value="corporation">Corporation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Business Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                        placeholder="Tell us about your business and products..."
                        required
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Contact Information
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Business Address *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                          placeholder="123 Business Street"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                          placeholder="City"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-500"
                          placeholder="12345"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Product Categories
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Select the categories of products you plan to sell
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categories.map((category) => (
                        <motion.button
                          key={category}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCategoryToggle(category)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            formData.categories.includes(category)
                              ? 'border-ocean-500 bg-ocean-50 dark:bg-ocean-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-ocean-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900 dark:text-gray-100">{category}</span>
                            {formData.categories.includes(category) && (
                              <CheckCircle className="w-5 h-5 text-ocean-500" />
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Document Upload
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Upload your business documents for verification
                    </p>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Business License *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-ocean-500 transition-colors">
                        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {formData.businessLicense?.name || 'Upload your business license'}
                        </p>
                        <input
                          type="file"
                          onChange={(e) => e.target.files && handleFileUpload('businessLicense', e.target.files[0])}
                          className="hidden"
                          id="businessLicense"
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <label
                          htmlFor="businessLicense"
                          className="inline-block px-4 py-2 bg-ocean-500 text-white rounded-lg cursor-pointer hover:bg-ocean-600 transition-colors"
                        >
                          Choose File
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tax ID Document *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-ocean-500 transition-colors">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {formData.taxId?.name || 'Upload your tax ID document'}
                        </p>
                        <input
                          type="file"
                          onChange={(e) => e.target.files && handleFileUpload('taxId', e.target.files[0])}
                          className="hidden"
                          id="taxId"
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <label
                          htmlFor="taxId"
                          className="inline-block px-4 py-2 bg-ocean-500 text-white rounded-lg cursor-pointer hover:bg-ocean-600 transition-colors"
                        >
                          Choose File
                        </label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                        className="mt-1 rounded border-gray-300 dark:border-gray-600"
                        required
                      />
                      <label className="text-sm text-gray-600 dark:text-gray-400">
                        I agree to the WhiteOcean vendor terms and conditions, and I confirm that all information provided is accurate.
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  {step > 1 && (
                    <button
                      onClick={handleBack}
                      className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <div className="ml-auto">
                    {step < 4 ? (
                      <button
                        onClick={handleNext}
                        className="flex items-center space-x-2 bg-gradient-to-r from-ocean-500 to-sunset-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={!formData.termsAccepted}
                        className="flex items-center space-x-2 bg-gradient-to-r from-ocean-500 to-sunset-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>Submit Application</span>
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Success Step */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 card-shadow text-center"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Application Submitted!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Thank you for your interest in becoming a vendor on WhiteOcean. Our team will review your application within 2-3 business days and get back to you.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">What happens next?</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-ocean-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        1
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">Our team reviews your application</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-ocean-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        2
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">We verify your business documents</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-ocean-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        3
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">You receive approval via email</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-ocean-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        4
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">Start selling on WhiteOcean!</p>
                    </div>
                  </div>
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-ocean-500 to-sunset-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  <span>Back to Home</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
