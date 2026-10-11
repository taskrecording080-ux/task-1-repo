import { useState } from 'react'
import type { DeliveryOption } from '../data/mock'

interface ShippingDialogProps {
  isOpen: boolean
  options: DeliveryOption[]
  selectedId: string | null
  onSave: (id: string) => void
  onCancel: () => void
}

export default function ShippingDialog({ isOpen, options, selectedId, onSave, onCancel }: ShippingDialogProps) {
  const [tempId, setTempId] = useState<string | null>(selectedId)

  if (!isOpen) {
    return null
  }

  return (
    <div className="dialog-backdrop" onClick={onCancel}>
      <div className="dialog-panel" onClick={(event) => event.stopPropagation()}>
        <h2>Choose delivery method</h2>
        <div className="dialog-options">
          {options.map((option) => (
            <div key={option.id} className="dialog-option">
              <input
                type="radio"
                id={`delivery-${option.id}`}
                name="delivery-method"
                value={option.id}
                checked={tempId === option.id}
                onChange={() => setTempId(option.id)}
              />
              <label htmlFor={`delivery-${option.id}`}>
                {option.name} — {option.etaLabel}
                {option.price > 0 ? ` ($${option.price.toFixed(2)})` : ' (free)'}
              </label>
            </div>
          ))}
        </div>
        <div className="dialog-actions">
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              if (tempId) {
                onSave(tempId)
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
