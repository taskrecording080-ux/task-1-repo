import { useState } from 'react'

export default function PromoAccordion() {
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')

  return (
    <div className="promo-accordion">
      <button type="button" className="promo-toggle" onClick={() => setOpen((prev) => !prev)}>
        {open ? 'Hide promo code' : 'Add promo code'}
      </button>
      <div className="promo-panel" style={{ display: open ? 'block' : 'none' }}>
        <label htmlFor="promo-code">Promo code</label>
        <input id="promo-code" type="text" value={code} onChange={(event) => setCode(event.target.value)} />
        <button type="button" className="promo-apply">
          Apply
        </button>
      </div>
    </div>
  )
}
