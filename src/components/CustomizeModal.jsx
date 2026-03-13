import { useState, useEffect } from 'react'
import { SIZES, MILKS, SWEETNESS } from '../data/options'

export default function CustomizeModal({ item, onClose, onAddToCart }) {
  const [size, setSize]           = useState(SIZES[1])     // default: Medium
  const [milk, setMilk]           = useState(MILKS[0])     // default: Oat
  const [sweetness, setSweetness] = useState(SWEETNESS[2]) // default: Regular

  const totalPrice = item.basePrice + size.mod

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="modal-header">
          <div>
            <p className="modal-item-category">{item.category}</p>
            <h2 id="modal-title" className="modal-item-name">{item.name}</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">

          {/* Size */}
          <fieldset className="option-group">
            <legend className="option-label">Size</legend>
            <div className="option-pills">
              {SIZES.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  className={`option-pill${size.label === s.label ? ' selected' : ''}`}
                  onClick={() => setSize(s)}
                >
                  {s.label}
                  {s.mod > 0 && <span className="option-mod"> +${s.mod.toFixed(2)}</span>}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Milk */}
          <fieldset className="option-group">
            <legend className="option-label">Milk</legend>
            <div className="option-pills">
              {MILKS.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`option-pill${milk === m ? ' selected' : ''}`}
                  onClick={() => setMilk(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Sweetness */}
          <fieldset className="option-group">
            <legend className="option-label">Sweetness</legend>
            <div className="option-pills">
              {SWEETNESS.map((sw) => (
                <button
                  key={sw}
                  type="button"
                  className={`option-pill${sweetness === sw ? ' selected' : ''}`}
                  onClick={() => setSweetness(sw)}
                >
                  {sw}
                </button>
              ))}
            </div>
          </fieldset>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <span className="modal-price">${totalPrice.toFixed(2)}</span>
          <button
            type="button"
            className="submit-button"
            onClick={() => onAddToCart({
              itemId:    item.id,
              name:      item.name,
              size:      size.label,
              milk,
              sweetness,
              price:     totalPrice,
              quantity:  1,
            })}
          >
            Add to Order
          </button>
        </div>

      </div>
    </div>
  )
}
