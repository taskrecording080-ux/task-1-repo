import { useState } from 'react'

interface PaymentStepProps {
  onBack: () => void
  onPlaceOrder: () => void
}

export default function PaymentStep({ onBack, onPlaceOrder }: PaymentStepProps) {
  const [nameOnCard, setNameOnCard] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [securityCode, setSecurityCode] = useState('')

  return (
    <section aria-labelledby="payment-heading" className="step-panel">
      <h1 id="payment-heading">Payment</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onPlaceOrder()
        }}
      >
        <div className="field">
          <label htmlFor="name-on-card">Name on card</label>
          <input
            id="name-on-card"
            type="text"
            value={nameOnCard}
            onChange={(event) => setNameOnCard(event.target.value)}
            placeholder="Alex Sample"
          />
        </div>
        <div className="field">
          <label htmlFor="card-number">Card number</label>
          <input
            id="card-number"
            type="text"
            value={cardNumber}
            onChange={(event) => setCardNumber(event.target.value)}
            placeholder="0000 0000 0000 0000"
          />
        </div>
        <div className="field">
          <label htmlFor="expiry">Expiry</label>
          <input
            id="expiry"
            type="text"
            value={expiry}
            onChange={(event) => setExpiry(event.target.value)}
            placeholder="00/00"
          />
        </div>
        <div className="field">
          <label htmlFor="security-code">Security code</label>
          <input
            id="security-code"
            type="text"
            value={securityCode}
            onChange={(event) => setSecurityCode(event.target.value)}
            placeholder="000"
          />
        </div>
        <div className="step-actions">
          <button type="button" className="secondary-button" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="primary-button">
            Place order
          </button>
        </div>
      </form>
    </section>
  )
}
