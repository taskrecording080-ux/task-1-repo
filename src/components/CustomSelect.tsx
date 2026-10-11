import { useState } from 'react'
import type { Region } from '../data/mock'

interface CustomSelectProps {
  options: Region[]
  value: string
  onChange: (id: string) => void
}

export default function CustomSelect({ options, value, onChange }: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const selected = options.find((option) => option.id === value)

  return (
    <div className="custom-select">
      <div className="custom-select-display" onClick={() => setOpen((prev) => !prev)}>
        {selected ? selected.name : 'Select region'}
      </div>
      {open && (
        <div className="custom-select-options">
          {options.map((option) => (
            <div
              key={option.id}
              className="custom-select-option"
              onClick={() => {
                onChange(option.id)
                setOpen(false)
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
