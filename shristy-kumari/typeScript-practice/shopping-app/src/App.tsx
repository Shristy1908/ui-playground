import { useState } from 'react'
import ProductCard from './components/ProductCard'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Product, CartItem } from './types'
import './App.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedPriceRange, setPriceRange] = useState('all')
  const [selectedRating, setRating] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const products: Product[] = [
    {
      id: 1,
      name: "Fjallraven - Foldsack No. 1 Backpack",
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday essentials in the main compartment.",
      price: 109.95,
      rating: 4.5,
      reviews: 1000,
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    },
    {
      id: 2,
      name: "Mens Casual Premium Slim Fit T-Shirts",
      description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket. Made with soft and comfortable material.",
      price: 22.3,
      rating: 4.5,
      reviews: 2500,
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
    },
    {
      id: 3,
      name: "John Hardy Women's Legends Gold Bracelet",
      description: "From our Legends Collection, the Naga was inspired by the mythical water dragon. A symbol of protection and prosperity.",
      price: 695,
      rating: 4.6,
      reviews: 400,
      category: "jewelry",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
    },
    {
      id: 4,
      name: "Solid Gold Petite Micropave",
      description: "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center.",
      price: 168,
      rating: 4.8,
      reviews: 750,
      category: "jewelry",
      image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
    },
    {
      id: 5,
      name: "Samsung 49-Inch Gaming Monitor",
      description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY.",
      price: 999.99,
      rating: 4.8,
      reviews: 750,
      category: "electronics",
      image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
    },
    {
      id: 6,
      name: "WD 2TB Portable External Hard Drive",
      description: "USB 3.0 and USB 2.0 Compatibility. Fast data transfers. Improve PC Performance. High Capacity.",
      price: 64,
      rating: 4.2,
      reviews: 1200,
      category: "electronics",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
    },
    {
      id: 7,
      name: "SanDisk SSD PLUS 1TB Internal SSD",
      description: "Easy upgrade for faster boot up, shutdown, application load and response. Boosts burst write performance.",
      price: 109,
      rating: 4.7,
      reviews: 3000,
      category: "electronics",
      image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
    },
    {
      id: 8,
      name: "Lock and Love Women's Removable Hooded Jacket",
      description: "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER).",
      price: 29.95,
      rating: 4.3,
      reviews: 800,
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg"
    },
    {
      id: 9,
      name: "Rain Jacket Women Windbreaker",
      description: "Lightweight perfect for trip or casual wear. Long sleeve with hooded, adjustable drawstring waist design.",
      price: 39.99,
      rating: 4.3,
      reviews: 800,
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg"
    }
  ]

  const clearFilters = () => {
    setSelectedCategory('All Categories')
    setPriceRange('all')
    setRating(0)
    setSearchQuery('')
  }

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All Categories' || 
                          product.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesRating = selectedRating === 0 || product.rating >= selectedRating

    let matchesPrice = true
    if (selectedPriceRange !== 'all') {
      const [min, max] = selectedPriceRange.split('-').map(Number)
      if (max) {
        matchesPrice = product.price >= min && product.price <= max
      } else {
        matchesPrice = product.price >= min
      }
    }

    return matchesSearch && matchesCategory && matchesRating && matchesPrice
  })

  return (
    <>
      <Navbar cartItems={cartItems} />
      <div className="app">
        <Sidebar 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPriceRange={selectedPriceRange}
          setPriceRange={setPriceRange}
          selectedRating={selectedRating}
          setRating={setRating}
          clearFilters={clearFilters}
        />
        <main className="product-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  )
}

export default App