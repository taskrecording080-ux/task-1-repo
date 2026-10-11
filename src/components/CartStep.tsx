import { useEffect, useRef, useState } from 'react'
import type { Product, ProductId } from '../data/mock'
import CartToast from './CartToast'
import PromoAccordion from './PromoAccordion'

interface CartLineItem {
  product: Product
  quantity: number
}

interface CartStepProps {
  items: CartLineItem[]
  onIncrease: (id: ProductId) => void
  onDecrease: (id: ProductId) => void
  onRemove: (id: ProductId) => void
  onContinue: () => void
}

export default function CartStep({ items, onIncrease, onDecrease, onRemove, onContinue }: CartStepProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const hideTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (hideTimer.current) {
        window.clearTimeout(hideTimer.current)
      }
    }
  }, [])

  function showToast(message: string) {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current)
    }
    setToastMessage(message)
    hideTimer.current = window.setTimeout(() => setToastMessage(null), 6000)
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <section aria-labelledby="cart-heading" className="step-panel">
      <h1 id="cart-heading">Your cart</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.product.id} className="cart-line-item">
            <span className="product-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" width="48" height="48">
                <rect x="6" y="10" width="36" height="30" rx="4" fill="#1F3A5F" />
                <rect x="14" y="4" width="20" height="10" rx="5" fill="none" stroke="#1F3A5F" strokeWidth="3" />
              </svg>
            </span>
            <div className="cart-line-details">
              <p className="cart-line-name">{item.product.name}</p>
              <p className="cart-line-price">${item.product.price.toFixed(2)}</p>
            </div>
            <div className="quantity-stepper">
              <button
                type="button"
                aria-label={`Decrease quantity for ${item.product.name}`}
                onClick={() => {
                  onDecrease(item.product.id)
                  showToast('Cart updated')
                }}
              >
                −
              </button>
              <span className="quantity-value">{item.quantity}</span>
              <button
                type="button"
                aria-label={`Increase quantity for ${item.product.name}`}
                onClick={() => {
                  onIncrease(item.product.id)
                  showToast('Cart updated')
                }}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="remove-button"
              onClick={() => {
                onRemove(item.product.id)
                showToast('Item removed')
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="cart-subtotal">Subtotal: ${subtotal.toFixed(2)}</p>
      <PromoAccordion />
      <div className="step-actions">
        <button type="button" className="primary-button" onClick={onContinue}>
          Continue to shipping
        </button>
      </div>
      <CartToast message={toastMessage} />
    </section>
  )
}
