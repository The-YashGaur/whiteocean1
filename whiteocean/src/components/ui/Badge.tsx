import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-ocean-500 text-white hover:bg-ocean-600',
        secondary:
          'border-transparent bg-sunset-100 text-sunset-900 hover:bg-sunset-200 dark:bg-sunset-900 dark:text-sunset-100',
        destructive:
          'border-transparent bg-red-100 text-red-900 hover:bg-red-200 dark:bg-red-900 dark:text-red-100',
        outline: 'text-foreground border-gray-300 dark:border-gray-600',
        success:
          'border-transparent bg-green-100 text-green-900 hover:bg-green-200 dark:bg-green-900 dark:text-green-100',
        warning:
          'border-transparent bg-yellow-100 text-yellow-900 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
