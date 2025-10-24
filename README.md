# Printeez Frontend - E-Commerce Platform

A modern, responsive Next.js e-commerce application for Printeez T-shirt store. Built with Next.js 14, TypeScript, Tailwind CSS, and Zustand for state management.

## Features

✨ **Complete E-Commerce Functionality**

- 🏠 Landing page with hero section, featured products, categories
- 🛍️ Product listing with filters (category, size, price)
- 🔍 Search functionality
- 📦 Individual product pages with detailed information
- 🛒 Shopping cart with add/remove/update quantity
- ❤️ Wishlist functionality
- ✅ Checkout process with COD payment
- 📋 Order history and tracking
- 👤 User authentication (login/signup)
- 👨‍💼 User profile management

🎨 **Modern Design**

- Responsive design for all devices
- Smooth animations with Framer Motion
- Beautiful UI with Tailwind CSS
- Loading states and skeletons
- Toast notifications
- Modern gradient effects

🚀 **Performance**

- Next.js 14 App Router
- Client-side state management with Zustand
- Optimized images
- Fast page transitions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Prerequisites

- Node.js 18+ installed
- Backend API running at `http://localhost:5000`

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/Printeez-frontend.git
   cd Printeez-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

   **Note**: The `.env` file is ignored by git for security.

   **For production deployment** (Vercel/other platforms):

   - Set environment variables in your platform's dashboard
   - Example: `NEXT_PUBLIC_API_URL=https://your-production-api.com/api`

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
Printeez-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with Navbar/Footer
│   │   ├── page.tsx            # Home page
│   │   ├── products/           # Products listing & detail
│   │   ├── cart/               # Shopping cart
│   │   ├── checkout/           # Checkout process
│   │   ├── orders/             # Order history
│   │   ├── login/              # Login page
│   │   ├── signup/             # Signup page
│   │   ├── profile/            # User profile
│   │   └── wishlist/           # Wishlist
│   ├── components/             # Reusable components
│   │   ├── layout/             # Navbar, Footer
│   │   ├── home/               # Home page sections
│   │   └── products/           # Product-related components
│   ├── store/                  # Zustand state management
│   │   ├── authStore.ts        # Authentication state
│   │   ├── cartStore.ts        # Cart state
│   │   └── wishlistStore.ts    # Wishlist state
│   ├── lib/                    # Utilities & API
│   │   └── api.ts              # API client & services
│   └── styles/
│       └── globals.css         # Global styles
├── public/                     # Static files
├── .env.local                  # Environment variables
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── package.json                # Dependencies
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Pages & Routes

| Route            | Description                                        | Auth Required |
| ---------------- | -------------------------------------------------- | ------------- |
| `/`              | Home page with hero, categories, featured products | No            |
| `/products`      | All products with filters & search                 | No            |
| `/products/[id]` | Single product detail page                         | No            |
| `/cart`          | Shopping cart                                      | Yes           |
| `/checkout`      | Checkout & place order                             | Yes           |
| `/orders`        | Order history                                      | Yes           |
| `/wishlist`      | Saved products                                     | Yes           |
| `/profile`       | User profile & settings                            | Yes           |
| `/login`         | User login                                         | No            |
| `/signup`        | User registration                                  | No            |

## Features in Detail

### 🏠 **Home Page**

- Hero section with CTA buttons
- Feature highlights (Free Shipping, Quality, etc.)
- Category cards (Urban, Typography, Abstract, Anime)
- Top selling products section
- New arrivals section

### 🛍️ **Product Pages**

- Grid/list view of products
- Filter by category, size, price range
- Sort by price, popularity, newest
- Search functionality
- Product cards with quick add to cart
- Product detail page with:
  - Large product image
  - Description, price, size
  - Quantity selector
  - Add to cart & wishlist
  - "You might also like" recommendations

### 🛒 **Shopping Cart**

- View all cart items
- Update quantities
- Remove items
- Clear cart
- Order summary with total
- Proceed to checkout button

### ✅ **Checkout**

- Delivery information form
- Order summary
- COD payment method
- Place order functionality
- Order confirmation

### 👤 **User Features**

- Login / Signup with validation
- JWT token authentication
- Protected routes
- Profile management
- Order history with status
- Wishlist management

## State Management

### Auth Store (`authStore.ts`)

- User authentication state
- Login/logout functions
- User profile data
- Persistent storage (localStorage)

### Cart Store (`cartStore.ts`)

- Cart items
- Add/remove/update items
- Calculate totals
- Synced with backend API

### Wishlist Store (`wishlistStore.ts`)

- Wishlist items
- Add/remove products
- Check if product in wishlist

## API Integration

All API calls are centralized in `src/lib/api.ts`:

```typescript
// Authentication
authAPI.signup(data);
authAPI.login(data);
authAPI.getProfile();

// Products
productAPI.getAllProducts();
productAPI.getProductById(id);
productAPI.getByCategory(category);
productAPI.getTopSelling(limit);
productAPI.getNewArrivals(limit);
productAPI.searchProducts(query);

// Cart
cartAPI.getCart();
cartAPI.addToCart(data);
cartAPI.updateCartItem(productId, quantity);
cartAPI.removeFromCart(productId);

// Orders
orderAPI.createOrder(data);
orderAPI.getOrders();
orderAPI.getOrderById(id);

// Wishlist
wishlistAPI.getWishlist();
wishlistAPI.addToWishlist(productId);
wishlistAPI.removeFromWishlist(productId);
```

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Responsive Design

The application is fully responsive with breakpoints:

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel

```bash
vercel deploy
```

### Deploy to Netlify

```bash
netlify deploy --prod
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Backend Connection Issues

Ensure the backend is running at `http://localhost:5000`:

```bash
cd ../Printeez
node server.js
```

### CORS Errors

The backend should have CORS enabled. Check `app.js` in backend.

### Build Errors

Clear Next.js cache:

```bash
rm -rf .next
npm run dev
```

## Environment Variables

This project uses the following environment variables:

- `NEXT_PUBLIC_API_URL`: The base URL for the backend API

**Configuration:**

- Create a `.env` file in the root directory (see installation step 3)
- The `.env` file is NOT committed to git for security
- For production (Vercel), set environment variables in the platform dashboard

## Deploying to GitHub

1. **Ensure sensitive files are ignored**

   - `.env` is in `.gitignore` and will not be pushed
   - Check `.gitignore` includes all necessary exclusions

2. **Create a new repository on GitHub**

3. **Push your code**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/Printeez-frontend.git
   git push -u origin main
   ```

4. **Set up environment variables in production**
   - For Vercel: Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` with your production API URL
   - For other platforms: Follow platform-specific instructions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the Printeez e-commerce platform.

## Support

For issues or questions, please contact the development team.

---

**Happy Shopping! 🛍️**
