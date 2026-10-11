import { useState } from 'react'

interface ConfirmStepProps {
  onBackToCart: () => void
}

function generateOrderNumber() {
  const digits = Math.floor(10000 + Math.random() * 89999)
  return `NG-${digits}`
}

export default function ConfirmStep({ onBackToCart }: ConfirmStepProps) {
  const [orderNumber] = useState(generateOrderNumber)

  return (
    <section aria-labelledby="confirm-heading" className="step-panel">
      <h1 id="confirm-heading">Order confirmed</h1>
      <p>Thank you for your order. A confirmation email has been sent.</p>
      <p className="order-number">Order number: {orderNumber}</p>
      <div className="step-actions">
        <button type="button" className="secondary-button" onClick={onBackToCart}>
          Back to cart
        </button>
      </div>
    </section>
  )
}
