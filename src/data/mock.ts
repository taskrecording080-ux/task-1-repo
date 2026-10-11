export type ProductId = 'tote' | 'mug' | 'scarf'

export interface Product {
  id: ProductId
  name: string
  price: number
}

export const products: Product[] = [
  { id: 'tote', name: 'Canvas Market Tote', price: 28 },
  { id: 'mug', name: 'Ceramic Pour-Over Mug', price: 18 },
  { id: 'scarf', name: 'Woven Wool Scarf', price: 42 },
]

export interface Region {
  id: string
  name: string
}

export const regions: Region[] = [
  { id: 'northfield', name: 'Northfield' },
  { id: 'lakeside', name: 'Lakeside' },
  { id: 'harborview', name: 'Harborview' },
  { id: 'cedar-ridge', name: 'Cedar Ridge' },
  { id: 'milltown', name: 'Milltown' },
  { id: 'stonebridge', name: 'Stonebridge' },
]

export interface DeliveryOption {
  id: string
  name: string
  etaLabel: string
  price: number
}

export const deliveryOptions: DeliveryOption[] = [
  { id: 'standard', name: 'Standard', etaLabel: '3-5 business days', price: 0 },
  { id: 'express', name: 'Express', etaLabel: '1-2 business days', price: 12 },
  { id: 'pickup', name: 'Local pickup', etaLabel: 'Ready same day', price: 0 },
]

export const streetSuggestions: string[] = [
  '12 Example Street',
  '48 Example Avenue',
  '5 Example Lane',
  '91 Example Boulevard',
  '203 Example Court',
  '17 Example Way',
]
