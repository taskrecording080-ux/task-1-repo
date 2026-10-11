import { useState } from 'react'
import { streetSuggestions } from '../data/mock'

interface AddressAutocompleteProps {
  id: string
  value: string
  onChange: (value: string) => void
}

export default function AddressAutocomplete({ id, value, onChange }: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  function handleChange(nextValue: string) {
    onChange(nextValue)
    if (nextValue.trim().length === 0) {
      setSuggestions([])
      setHighlightedIndex(-1)
      return
    }
    const matches = streetSuggestions.filter((entry) =>
      entry.toLowerCase().includes(nextValue.toLowerCase()),
    )
    setSuggestions(matches)
    setHighlightedIndex(-1)
  }

  function selectSuggestion(suggestion: string) {
    onChange(suggestion)
    setSuggestions([])
    setHighlightedIndex(-1)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (suggestions.length === 0) {
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length)
    } else if (event.key === 'Enter' && highlightedIndex >= 0) {
      event.preventDefault()
      selectSuggestion(suggestions[highlightedIndex])
    }
  }

  return (
    <div className="address-autocomplete">
      <label htmlFor={id}>Street address</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul className="address-suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={index === highlightedIndex ? 'address-suggestion is-highlighted' : 'address-suggestion'}
              onClick={() => selectSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
