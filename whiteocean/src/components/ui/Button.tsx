import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-ocean-500 text-white hover:bg-ocean-600 shadow-lg shadow-ocean-500/25',
        destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25',
        outline: 'border-2 border-ocean-500 text-ocean-500 hover:bg-ocean-50 dark:hover:bg-ocean-950',
        secondary: 'bg-sunset-500 text-white hover:bg-sunset-600 shadow-lg shadow-sunset-500/25',
        ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
        link: 'text-ocean-500 underline-offset-4 hover:underline',
        gradient: 'bg-gradient-to-r from-ocean-500 to-sunset-500 text-white hover:opacity-90 shadow-lg shadow-ocean-500/25',
        glass: 'glass text-white hover:bg-white/20',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-xl px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
