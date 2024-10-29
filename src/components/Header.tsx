import { useState } from 'react'
import { useCartTotalItems } from '../hooks/useCart'
import { Modal } from '../ui/Modal'
import { Cart } from './Cart'

const CartButton = (function CartButton() {
  console.log('CartButton render');
  const [isOpen, setIsOpen] = useState(false)
  const totalItems = useCartTotalItems()

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        Cart ({totalItems})
      </button>
      {isOpen && <Modal onClose={() => setIsOpen(false)}>
        <Cart />
      </Modal>}
    </div>
  )
})

export function Header() {
  console.log('Header render')
  
  return (
    <header style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>LOGO</div>
        <CartButton />
      </div>
    </header>
  )
}