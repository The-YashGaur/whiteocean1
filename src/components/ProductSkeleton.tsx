'use client'

import { motion } from 'framer-motion'

export default function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden card-shadow">
      {/* Image Skeleton */}
      <div className="h-48 bg-gradient-to-br from-ocean-100 to-sunset-100 dark:from-gray-700 dark:to-gray-600 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
        <div className="flex items-center space-x-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20" />
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}
