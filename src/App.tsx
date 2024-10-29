import { Header } from './components/Header'
import { ProductCard } from './components/ProductCard'
import { Product } from './types'

const products: Product[] = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
]

function App() {
  return (
    <div>
      <Header />
      <main style={{ 
        padding: 20,
        display: 'grid', 
        gap: 20,
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))'
      }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  )
}

export default App