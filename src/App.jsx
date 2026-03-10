import './App.css'

const features = [
  {
    icon: '🍵',
    title: 'Browse the Menu',
    description: 'Explore a curated selection of matcha lattes, ceremonial teas, and seasonal specials.',
  },
  {
    icon: '✏️',
    title: 'Customize Your Order',
    description: 'Choose your milk, sweetness level, and temperature for the perfect cup.',
  },
  {
    icon: '📦',
    title: 'Real-Time Order Tracking',
    description: 'Follow your order from preparation through to pickup — no guessing required.',
  },
  {
    icon: '♡',
    title: 'Save Favorites',
    description: 'Bookmark your go-to drinks and reorder them in seconds.',
  },
  {
    icon: '🌿',
    title: 'Sourcing & Nutrition Info',
    description: 'Learn where your matcha comes from and view detailed nutritional information.',
  },
]

function App() {
  return (
    <div className="page">
      <header className="hero">
        <div className="hero-badge">Coming Soon</div>
        <h1 className="hero-title">Moonlight Matcha</h1>
        <p className="hero-subtitle">Order App</p>
        <p className="hero-description">
          A calm, thoughtful way to order your favorite matcha drinks. Built for
          matcha lovers who appreciate quality, simplicity, and a little ritual in
          their day. Place your order ahead, customize every detail, and pick it
          up when it's ready.
        </p>
      </header>

      <main className="main">
        <section className="features-section">
          <h2 className="section-title">Planned Features</h2>
          <p className="section-subtitle">Here's what we're building</p>
          <ul className="features-list">
            {features.map((feature) => (
              <li key={feature.title} className="feature-card">
                <span className="feature-icon">{feature.icon}</span>
                <div className="feature-text">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>Moonlight Matcha &mdash; crafted with care</p>
      </footer>
    </div>
  )
}

export default App
