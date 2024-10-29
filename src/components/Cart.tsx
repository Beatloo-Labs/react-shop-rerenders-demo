import { useCartItems, useCartTotal, useCartActions } from '../hooks/useCart'

export function Cart() {
  const items = useCartItems()
  const total = useCartTotal()
  const { updateQuantity, removeFromCart } = useCartActions()

  if (items.length === 0) {
    return <div>Cart is empty</div>
  }

  return (
    <div style={{ padding: 20 }}>
      {items.map((item) => (
        <div 
          key={item.id} 
          style={{ 
            display: 'flex', 
            gap: 20, 
            marginBottom: 10,
            alignItems: 'center' 
          }}
        >
          <div>
            <div>{item.name}</div>
            <div>${item.price}</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
            <button onClick={() => removeFromCart(item.id)}>×</button>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 20 }}>
        Total: ${total.toFixed(2)}
      </div>
    </div>
  )
}