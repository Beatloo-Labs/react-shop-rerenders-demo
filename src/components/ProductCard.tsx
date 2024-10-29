import { Product } from '../types'
import { useCartActions, useIsInCart } from '../hooks/useCart'

interface ProductProps {
  product: Product
}

const AddToCartButton = (function AddToCartButton({ product }: ProductProps) {
  console.log('AddToCartButton render:', product.name)
  const { toggleCart } = useCartActions()
  const isInCart = useIsInCart(product.id)

  return (
    <button 
      onClick={() => toggleCart(product)}
      style={{ 
        marginTop: 10,
        width: '100%',
        background: isInCart ? '#e2e2e2' : '#007bff',
        color: isInCart ? '#333' : 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: 4,
        cursor: 'pointer'
      }}
    >
      {isInCart ? 'In cart' : 'Add to Cart'}
    </button>
  )
})

export const ProductCard = (function ProductCard({ product }: ProductProps) {
  console.log('ProductCard render:', product.name)

  return (
    <div style={{ 
      border: '1px solid #eee',
      padding: 20,
      borderRadius: 4
    }}>
      <div>
        <h3>{product.name}</h3>
        <div>${product.price}</div>
      </div>
      <AddToCartButton product={product} />
    </div>
  )
})