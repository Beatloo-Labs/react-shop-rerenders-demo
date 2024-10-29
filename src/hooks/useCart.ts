import { useSyncExternalStore } from 'react'
import { Product, CartItem } from '../types'

interface CartState {
  items: CartItem[];
  itemsInCart: Set<number>;
}

const createStore = (initialState: CartState) => {
  let state = initialState
  const listeners = new Set<() => void>()

  return {
    subscribe: (listener: () => void) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    getSnapshot: () => state,
    setState: (newState: CartState) => {
      state = newState
      listeners.forEach((l) => l())
    }
  }
}

const store = createStore({ 
  items: [], 
  itemsInCart: new Set()
})

// Отдельные селекторы для разных частей состояния
const selectItems = (state: CartState) => state.items
const selectItemsInCart = (state: CartState) => state.itemsInCart
const selectTotal = (state: CartState) => 
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
const selectTotalItems = (state: CartState) => 
  state.items.reduce((sum, item) => sum + item.quantity, 0)

// Разделяем хуки на более мелкие
export function useCartItems() {
  return useSyncExternalStore(
    store.subscribe,
    () => selectItems(store.getSnapshot())
  )
}

export function useCartTotal() {
  return useSyncExternalStore(
    store.subscribe,
    () => selectTotal(store.getSnapshot())
  )
}

export function useCartTotalItems() {
  return useSyncExternalStore(
    store.subscribe,
    () => selectTotalItems(store.getSnapshot())
  )
}

export function useIsInCart(productId: number) {
  return useSyncExternalStore(
    store.subscribe,
    () => selectItemsInCart(store.getSnapshot()).has(productId)
  )
}

// Хук для действий с корзиной (не содержит состояния)
export function useCartActions() {
  const addToCart = (product: Product) => {
    const state = store.getSnapshot()
    const newItems = state.items.filter(item => item.id !== product.id)
    const newItemsInCart = new Set(state.itemsInCart)
    newItemsInCart.add(product.id)
    
    store.setState({
      items: [...newItems, { ...product, quantity: 1 }],
      itemsInCart: newItemsInCart
    })
  }

  const removeFromCart = (productId: number) => {
    const state = store.getSnapshot()
    const newItemsInCart = new Set(state.itemsInCart)
    newItemsInCart.delete(productId)
    
    store.setState({
      items: state.items.filter(item => item.id !== productId),
      itemsInCart: newItemsInCart
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }

    const state = store.getSnapshot()
    store.setState({
      ...state,
      items: state.items.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    })
  }

  const toggleCart = (product: Product) => {
    const state = store.getSnapshot()
    const exists = state.itemsInCart.has(product.id)
    exists ? removeFromCart(product.id) : addToCart(product)
  }

  return {
    toggleCart,
    updateQuantity,
    removeFromCart,
    addToCart
  }
}