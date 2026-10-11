import type { Product, DeliveryOption } from '../data/mock'

interface OrderSummaryProps {
  items: { product: Product; quantity: number }[]
  subtotal: number
  delivery: DeliveryOption | null
  total: number
}

export default function OrderSummary({ items, subtotal, delivery, total }: OrderSummaryProps) {
  return (
    <aside aria-labelledby="order-summary-heading" className="order-summary">
      <h2 id="order-summary-heading">Order summary</h2>
      <ul className="order-summary-list">
        {items.map((item) => (
          <li key={item.product.id}>
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <p className="order-summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </p>
      <p className="order-summary-row">
        <span>Delivery</span>
        <span>{delivery ? (delivery.price > 0 ? `$${delivery.price.toFixed(2)}` : 'Free') : '—'}</span>
      </p>
      <p className="order-summary-row order-summary-total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </p>
    </aside>
  )
}
