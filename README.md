# React Shopping Cart

A simple shopping cart implementation in React using TypeScript and custom store management with `useSyncExternalStore`.

## Demo

![Shopping Cart Demo](https://i.imgur.com/5svrln0.gif)

The demo shows the main features:
- Adding/removing products
- Opening cart modal
- Updating quantities
- Real-time total calculation
- Smooth re-renders optimization

## Features

- Add/remove products to cart
- Update product quantities
- Real-time total calculation
- Optimized re-renders using selector pattern
- Modal cart view
- TypeScript support

## Technical Stack

- React 18+
- TypeScript
- Vite
- Custom store implementation using `useSyncExternalStore`

## Project Structure

```
src/
├── components/
│   ├── Cart.tsx         # Cart component with items list
│   ├── Header.tsx       # Header with cart button
│   └── ProductCard.tsx  # Product display with add to cart
├── hooks/
│   └── useCart.ts       # Custom cart store & hooks
├── ui/
│   └── Modal.tsx        # Reusable modal component
├── types/
│   └── index.ts         # TypeScript interfaces
└── App.tsx              # Main application component
```

## Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Store Implementation

The project uses a custom store implementation with `useSyncExternalStore` and follows the selector pattern for optimized re-renders. The store is split into several specialized hooks:

- `useCartItems()` - Get cart items
- `useCartTotal()` - Get total sum
- `useCartTotalItems()` - Get total items count
- `useIsInCart(productId)` - Check if product is in cart
- `useCartActions()` - Get cart manipulation methods

## Performance Optimizations

- Separate selectors for different parts of the state
- Action-only hooks that don't trigger re-renders
- Atomic state updates
- Memoized components

## License

MIT
