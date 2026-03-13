import { useState, useEffect } from 'react'
import './App.css'
import { CATEGORIES, MENU_ITEMS } from './data/menu'
import CustomizeModal from './components/CustomizeModal'
import PickupForm from './components/PickupForm'
import { loadJSON, saveJSON } from './utils/storage'

const CART_KEY      = 'moonlight_cart'
const ORDER_KEY     = 'moonlight_recent_order'
const FAVORITES_KEY = 'moonlight_favorites'

const DRINK_CATEGORIES = ['Matcha', 'Coffee']

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedItem, setSelectedItem]     = useState(null)
  const [cart, setCart]                     = useState(() => loadJSON(CART_KEY, []))
  const [orderPlaced, setOrderPlaced]       = useState(false)
  const [favorites, setFavorites]           = useState(() => new Set(loadJSON(FAVORITES_KEY, [])))

  useEffect(() => { saveJSON(CART_KEY, cart) },           [cart])
  useEffect(() => { saveJSON(FAVORITES_KEY, [...favorites]) }, [favorites])

  function toggleFavorite(id) {
    setFavorites((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function addToCart(cartItem) {
    setCart((prev) => [...prev, { ...cartItem, id: crypto.randomUUID() }])
    setSelectedItem(null)
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  function placeOrder(customer) {
    saveJSON(ORDER_KEY, {
      savedAt:  new Date().toISOString(),
      customer,
      items:    cart,
      total:    cartTotal,
    })
    setCart([])
    setOrderPlaced(true)
  }

  function updateQuantity(id, delta) {
    setCart((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
        .filter((item) => item.quantity > 0)
    )
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const visibleItems =
    activeCategory === 'All'       ? MENU_ITEMS :
    activeCategory === 'Favorites' ? MENU_ITEMS.filter((item) => favorites.has(item.id)) :
    MENU_ITEMS.filter((item) => item.category === activeCategory)

  return (
    <div className="app">

      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="header-icon">🍵</span>
            <span className="header-title">Moonlight Matcha</span>
          </div>
          <button className="cart-button" type="button">
            Cart <span className="cart-badge">{cart.reduce((n, item) => n + item.quantity, 0)}</span>
          </button>
        </div>
      </header>

      <main className="app-main">

        {/* ── Left: Menu ── */}
        <div className="menu-section">

          {/* Category filter */}
          <div className="category-filter">
            <h2 className="section-label">Menu</h2>
            <div className="category-tabs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-tab${cat === activeCategory ? ' active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu grid */}
          <div className="menu-grid">
            {visibleItems.length === 0 && (
              <p className="empty-favorites">No favorites yet. Tap ♡ on any item to save it here.</p>
            )}
            {visibleItems.map((item) => (
              <div key={item.id} className="menu-card">
                <div className="menu-card-image">
                  <button
                    type="button"
                    className={`fav-btn${favorites.has(item.id) ? ' fav-btn--active' : ''}`}
                    onClick={() => toggleFavorite(item.id)}
                    aria-label={favorites.has(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {favorites.has(item.id) ? '♥' : '♡'}
                  </button>
                </div>
                <div className="menu-card-body">
                  <span className="item-category">{item.category}</span>
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="item-footer">
                    <span className="item-price">${item.basePrice.toFixed(2)}</span>
                    {DRINK_CATEGORIES.includes(item.category) && (
                      <button
                        type="button"
                        className="add-button"
                        onClick={() => setSelectedItem(item)}
                      >
                        Customize
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Sidebar ── */}
        <aside className="app-sidebar">

          {/* Cart / order summary */}
          <section className="sidebar-card">
            <h2 className="section-label">Your Order</h2>
            {cart.length === 0 ? (
              <div className="empty-state">No items yet</div>
            ) : (
              <ul className="cart-list">
                {cart.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-details">
                        {item.size} · {item.milk} · {item.sweetness}
                      </span>
                      <div className="cart-item-controls">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                        >−</button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >+</button>
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >Remove</button>
                      </div>
                    </div>
                    <span className="cart-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="order-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </section>

          {/* Pickup form */}
          <section className="sidebar-card">
            <h2 className="section-label">Pickup Details</h2>
            {orderPlaced ? (
              <div className="order-confirmation">
                <p className="confirmation-heading">Order placed!</p>
                <p className="confirmation-sub">We'll have it ready at your selected time.</p>
                <button
                  type="button"
                  className="new-order-btn"
                  onClick={() => setOrderPlaced(false)}
                >
                  Start a new order
                </button>
              </div>
            ) : (
              <PickupForm
                onSubmit={placeOrder}
                disabled={cart.length === 0}
              />
            )}
          </section>

        </aside>
      </main>

      {selectedItem && (
        <CustomizeModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={addToCart}
        />
      )}

      <footer className="app-footer">
        <p>Moonlight Matcha &mdash; crafted with care</p>
      </footer>

    </div>
  )
}

export default App
