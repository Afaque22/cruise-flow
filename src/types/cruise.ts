export type CabinType =
  | 'interior'
  | 'oceanview'
  | 'balcony'
  | 'suite'

export interface ItineraryDay {
  day: number
  port: string
  arrival?: string
  departure?: string
  description?: string
}

export interface Ship {
  name: string
  yearBuilt: number
  guests: number
  crew: number
  decks: number
  length: number
}

export interface Cruise {
  id: string
  name: string
  cruiseLine: string
  ship: Ship

  destination: string
  departurePort: string
  // departureDate: string
  departureDates : string[]
  duration: number

  rating: number
  reviewCount: number

  priceFrom: number
  image: string

  description: string
  itinerary: ItineraryDay[]
  amenities: string[]

  cabinPrices: {
    type: CabinType
    price: number
  }[]
}