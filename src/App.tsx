import { useState } from 'react'
import Header from './components/Header'
import StepIndicator from './components/StepIndicator'
import CartStep from './components/CartStep'
import ShippingStep from './components/ShippingStep'
import DeliveryStep from './components/DeliveryStep'
import PaymentStep from './components/PaymentStep'
import ConfirmStep from './components/ConfirmStep'
import OrderSummary from './components/OrderSummary'
import { products, deliveryOptions, type ProductId } from './data/mock'

export type StepId = 'cart' | 'shipping' | 'delivery_method' | 'payment' | 'confirm'

export const STEPS: { id: StepId; label: string }[] = [
  { id: 'cart', label: 'Cart' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'delivery_method', label: 'Delivery' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirm', label: 'Confirmation' },
]

export interface ShippingDetails {
  fullName: string
  email: string
  street: string
  city: string
  postalCode: string
  regionId: string
}

const initialQuantities: Record<ProductId, number> = {
  tote: 1,
  mug: 2,
  scarf: 1,
}

const initialShipping: ShippingDetails = {
  fullName: '',
  email: '',
  street: '',
  city: '',
  postalCode: '',
  regionId: '',
}

export default function App() {
  const [step, setStep] = useState<StepId>('cart')
  const [quantities, setQuantities] = useState<Record<ProductId, number>>(initialQuantities)
  const [shipping, setShipping] = useState<ShippingDetails>(initialShipping)
  const [deliveryMethodId, setDeliveryMethodId] = useState<string | null>(null)

  const cartItems = products
    .map((product) => ({ product, quantity: quantities[product.id] }))
    .filter((item) => item.quantity > 0)

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const selectedDelivery = deliveryOptions.find((option) => option.id === deliveryMethodId) ?? null
  const total = subtotal + (selectedDelivery?.price ?? 0)

  function increaseQuantity(id: ProductId) {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }))
  }

  function decreaseQuantity(id: ProductId) {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }))
  }

  function removeItem(id: ProductId) {
    setQuantities((prev) => ({ ...prev, [id]: 0 }))
  }

  return (
    <div className="app-shell">
      <Header />
      <nav aria-label="Checkout progress">
        <StepIndicator steps={STEPS} currentStepId={step} />
      </nav>
      <main className="checkout-main">
        <div className="checkout-content">
          {step === 'cart' && (
            <CartStep
              items={cartItems}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeItem}
              onContinue={() => setStep('shipping')}
            />
          )}
          {step === 'shipping' && (
            <ShippingStep
              details={shipping}
              onChange={setShipping}
              onBack={() => setStep('cart')}
              onContinue={() => setStep('delivery_method')}
            />
          )}
          {step === 'delivery_method' && (
            <DeliveryStep
              selectedId={deliveryMethodId}
              onSelect={setDeliveryMethodId}
              onBack={() => setStep('shipping')}
              onContinue={() => setStep('payment')}
            />
          )}
          {step === 'payment' && (
            <PaymentStep onBack={() => setStep('delivery_method')} onPlaceOrder={() => setStep('confirm')} />
          )}
          {step === 'confirm' && <ConfirmStep onBackToCart={() => setStep('cart')} />}
        </div>
        <OrderSummary items={cartItems} subtotal={subtotal} delivery={selectedDelivery} total={total} />
      </main>
    </div>
  )
}
