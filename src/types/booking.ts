import type { Cabin, } from './cabin'
import type { Cruise } from './cruise'

export interface Guest {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  dateOfBirth: string
}

export interface Booking {
  id: string
  cruise: Cruise
  cabin: Cabin
  guests: Guest[]
  total: number
  createdAt: string
}