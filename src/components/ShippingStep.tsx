import type { ShippingDetails } from '../App'
import { regions } from '../data/mock'
import AddressAutocomplete from './AddressAutocomplete'
import CustomSelect from './CustomSelect'

interface ShippingStepProps {
  details: ShippingDetails
  onChange: (details: ShippingDetails) => void
  onBack: () => void
  onContinue: () => void
}

export default function ShippingStep({ details, onChange, onBack, onContinue }: ShippingStepProps) {
  function update<K extends keyof ShippingDetails>(key: K, value: ShippingDetails[K]) {
    onChange({ ...details, [key]: value })
  }

  return (
    <section aria-labelledby="shipping-heading" className="step-panel">
      <h1 id="shipping-heading">Shipping details</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onContinue()
        }}
      >
        <div className="field">
          <label htmlFor="full-name">Full name</label>
          <input
            id="full-name"
            type="text"
            value={details.fullName}
            onChange={(event) => update('fullName', event.target.value)}
            placeholder="Alex Sample"
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={details.email}
            onChange={(event) => update('email', event.target.value)}
            placeholder="alex.sample@example.com"
          />
        </div>
        <div className="field">
          <AddressAutocomplete id="street" value={details.street} onChange={(value) => update('street', value)} />
        </div>
        <div className="field">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={details.city}
            onChange={(event) => update('city', event.target.value)}
            placeholder="Example City"
          />
        </div>
        <div className="field">
          <label htmlFor="postal-code">Postal code</label>
          <input
            id="postal-code"
            type="text"
            value={details.postalCode}
            onChange={(event) => update('postalCode', event.target.value)}
            placeholder="00000"
          />
        </div>
        <div className="field">
          <span className="field-label">Region</span>
          <CustomSelect options={regions} value={details.regionId} onChange={(id) => update('regionId', id)} />
        </div>
        <div className="step-actions">
          <button type="button" className="secondary-button" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="primary-button">
            Continue to delivery
          </button>
        </div>
      </form>
    </section>
  )
}
