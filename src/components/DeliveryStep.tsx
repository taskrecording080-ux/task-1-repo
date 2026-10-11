import { useState } from 'react'
import { deliveryOptions } from '../data/mock'
import ShippingDialog from './ShippingDialog'

interface DeliveryStepProps {
  selectedId: string | null
  onSelect: (id: string) => void
  onBack: () => void
  onContinue: () => void
}

export default function DeliveryStep({ selectedId, onSelect, onBack, onContinue }: DeliveryStepProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const selected = deliveryOptions.find((option) => option.id === selectedId) ?? null

  return (
    <section aria-labelledby="delivery-heading" className="step-panel">
      <h1 id="delivery-heading">Delivery method</h1>
      <p className="delivery-summary">
        {selected ? `${selected.name} — ${selected.etaLabel}` : 'No delivery method chosen yet'}
      </p>
      <button type="button" className="secondary-button" onClick={() => setDialogOpen(true)}>
        Choose delivery method
      </button>
      <div className="step-actions">
        <button type="button" className="secondary-button" onClick={onBack}>
          Back
        </button>
        <button type="button" className="primary-button" disabled={!selected} onClick={onContinue}>
          Continue to payment
        </button>
      </div>
      <ShippingDialog
        isOpen={dialogOpen}
        options={deliveryOptions}
        selectedId={selectedId}
        onSave={(id) => {
          onSelect(id)
          setDialogOpen(false)
        }}
        onCancel={() => setDialogOpen(false)}
      />
    </section>
  )
}
