'use client'

import { motion } from 'framer-motion'

export default function SkeletonLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-50 via-white to-sunset-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="text-center">
        {/* Wave Animation */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full border-4 border-ocean-200 dark:border-gray-700"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute inset-2 rounded-full border-4 border-sunset-200 dark:border-gray-600"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean-500 to-sunset-500" />
          </div>
        </div>

        {/* Loading Text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-2xl font-bold gradient-text"
        >
          WhiteOcean
        </motion.div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          className="text-gray-500 dark:text-gray-400 mt-2"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  )
}
