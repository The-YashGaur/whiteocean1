import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  vendor: string
  vendorId: string
  rating: number
  reviews: number
  stock: number
  unit: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  estimatedDelivery: string
}

interface StoreState {
  // Cart
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartByVendor: () => Record<string, CartItem[]>
  getCartCount: () => number

  // User
  user: { id: string; name: string; email: string; role: 'customer' | 'vendor' | 'admin' } | null
  setUser: (user: StoreState['user']) => void
  logout: () => void

  // Theme
  darkMode: boolean
  toggleDarkMode: () => void

  // Orders
  orders: Order[]
  addOrder: (order: Order) => void

  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (product) => {
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id)
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] }
        })
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }))
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          cart: quantity <= 0
            ? state.cart.filter((item) => item.id !== productId)
            : state.cart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
              ),
        }))
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      getCartByVendor: () => {
        const grouped: Record<string, CartItem[]> = {}
        get().cart.forEach((item) => {
          if (!grouped[item.vendor]) {
            grouped[item.vendor] = []
          }
          grouped[item.vendor].push(item)
        })
        return grouped
      },
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0)
      },

      // User
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, cart: [] }),

      // Theme
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // Orders
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'whiteocean-storage',
      partialize: (state) => ({ cart: state.cart, user: state.user, darkMode: state.darkMode, orders: state.orders }),
    }
  )
)
