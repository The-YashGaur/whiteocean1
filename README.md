# 🌊 WhiteOcean

**Ride the Wave of Smart Shopping**

A modern, high-end multi-vendor e-commerce platform built with Next.js, Three.js, and Tailwind CSS. WhiteOcean features a stunning ocean/sunset theme with immersive 3D visuals, smooth animations, and a premium user experience.

## ✨ Features

### Customer Features
- **Authentication**: Login/Register with OTP simulation UI
- **Product Browsing**: Search with Elasticsearch-style UI, filters (price, vendor, category)
- **Product Cards**: Hover animations with glassmorphism design
- **Multi-vendor Cart**: Items grouped by vendor with localStorage persistence
- **Checkout Flow**: Multi-step checkout (shipping → payment → confirmation)
- **Payment Options**: UPI, Card, COD support
- **Order Tracking**: Timeline-style order status

### Vendor Portal
- **Dashboard**: Analytics charts and key metrics
- **Product Management**: Add/Edit products with image preview
- **Inventory Management**: Stock tracking and alerts
- **Order Management**: View and manage orders

### Admin Panel
- **Vendor Approval**: Dashboard for approving new vendors
- **Orders Overview**: Platform-wide order management
- **Payout & Commission**: Financial tracking UI
- **Coupon Management**: Create and manage discount coupons
- **User Management**: Customer and vendor oversight

## 🎨 Design

### Theme
- **Ocean Blue**: #00B4D8, #0077B6
- **Sunset Orange**: #FF7A00, #FFA500
- **Soft White backgrounds** with dark mode support

### Visual Elements
- Wave shapes and gradients
- Fluid transitions and animations
- Subtle 3D elements (waves, floating cards, particles)
- Glassmorphism effects
- Floating cards with soft shadows

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **3D Graphics**: Three.js
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Fonts**: Inter, Poppins

## 📦 Project Structure

```
whiteocean/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── products/
│   │   │   ├── page.tsx          # Product listing
│   │   │   └── [id]/page.tsx     # Product detail
│   │   ├── cart/page.tsx         # Shopping cart
│   │   ├── checkout/page.tsx     # Checkout flow
│   │   ├── login/page.tsx        # Login/Register
│   │   ├── vendor/dashboard/     # Vendor portal
│   │   └── admin/dashboard/      # Admin panel
│   ├── components/
│   │   ├── Header.tsx            # Navigation header
│   │   ├── Footer.tsx            # Site footer
│   │   ├── ProductCard.tsx       # Product display card
│   │   ├── WaveHero.tsx          # Three.js hero animation
│   │   ├── SkeletonLoader.tsx    # Loading skeleton
│   │   ├── ProductSkeleton.tsx   # Product card skeleton
│   │   └── PageLoader.tsx        # Page transition loader
│   ├── lib/
│   │   ├── store.ts              # Zustand state management
│   │   └── mock-data.ts          # Mock product/vendor data
│   └── app/
│       ├── globals.css           # Global styles
│       └── layout.tsx             # Root layout
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Key Pages

### Landing Page (`/`)
- Three.js animated ocean waves hero section
- Feature highlights with icons
- Featured products grid
- Call-to-action sections

### Products Page (`/products`)
- Search functionality
- Category and vendor filters
- Price range slider
- Responsive product grid

### Product Detail (`/products/[id]`)
- Large product image display
- Quantity selector
- Add to cart functionality
- Related products section

### Cart (`/cart`)
- Multi-vendor grouping
- Quantity adjustment
- Real-time price calculation
- Order summary

### Checkout (`/checkout`)
- Multi-step form (Shipping → Payment → Confirmation)
- Multiple payment methods
- Secure checkout UI
- Order confirmation

### Login/Register (`/login`)
- Email/password authentication
- OTP verification simulation
- Smooth mode transitions

### Vendor Dashboard (`/vendor/dashboard`)
- Sales analytics
- Product management
- Order tracking
- Inventory overview

### Admin Dashboard (`/admin/dashboard`)
- Platform overview
- Vendor approvals
- Order management
- Coupon creation

## 🌙 Dark Mode

The platform includes a dark mode toggle that switches between:
- **Light Mode**: Soft white backgrounds with ocean/sunset accents
- **Dark Mode**: Ocean night theme with deep blues and warm oranges

Toggle dark mode using the moon/sun icon in the header.

## 📱 Responsive Design

All pages are fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop screens (1024px+)
- Large displays (1440px+)

## 🎭 Animations

- **Page Transitions**: Smooth Framer Motion animations
- **Hover Effects**: Product cards lift and scale on hover
- **Loading States**: Skeleton loaders and wave animations
- **Three.js**: Interactive 3D wave particles in hero section

## 🔧 State Management

Zustand stores for:
- **Cart**: Product items, quantities, totals, vendor grouping
- **Auth**: User authentication state
- **Theme**: Dark mode preference (persisted)

## 📝 Mock Data

The project uses mock data for:
- Products (12 sample products across categories)
- Vendors (7 sample vendors)
- Categories (7 product categories)

## 🎨 Custom Components

### WaveHero
Three.js component featuring animated ocean waves and floating particles with sunset gradient background.

### ProductCard
Interactive product card with:
- Hover animations
- Stock indicators
- Add to cart button
- Wishlist toggle

### SkeletonLoaders
- Full-page loader with wave animation
- Product card skeleton for loading states
- Page transition loader

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

ISC

## 👤 Author

WhiteOcean Development Team

---

**Built with ❤️ using Next.js, Three.js, and Tailwind CSS**
