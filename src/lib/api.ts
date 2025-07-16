import { ReadonlyURLSearchParams } from 'next/dist/client/components/navigation.react-server';
import { CityInterface } from '@/features/ticket/types';
import { appendFiltersToParams } from '@/lib/utils';

export interface TicketFilters {
  from_city_id: string
  to_city_id: string
  from_city_name: string
  to_city_name: string
  date_start?: string
  date_end?: string
  date_start_arrival?: string
  date_end_arrival?: string
  have_first_class?: boolean
  have_second_class?: boolean
  have_third_class?: boolean
  have_fourth_class?: boolean
  have_wifi?: boolean
  have_air_conditioning?: boolean
  have_express?: boolean
  price_from?: number
  price_to?: number
  start_departure_hour_from?: number
  start_departure_hour_to?: number
  start_arrival_hour_from?: number
  start_arrival_hour_to?: number
  end_departure_hour_from?: number
  end_departure_hour_to?: number
  end_arrival_hour_from?: number
  end_arrival_hour_to?: number
  limit?: number
  offset?: number
  sort?: 'date' | 'min_price' | 'duration'
}

export interface StationInfo {
  datetime: number
  railway_station_name: string
  city: CityInterface
}

export interface TrainInfo {
  _id: string
  name: string
}

export interface PriceRange {
  bottom_price?: number
  price?: number
  side_price?: number
  top_price?: number
}

export interface PriceInfo {
  first?: PriceRange
  second?: PriceRange
  third?: PriceRange
  fourth?: PriceRange
}

export interface SeatsInfo {
  first?: number
  second?: number
  third?: number
  fourth?: number
}

export interface ArrivalDepartureInfo {
  _id: string
  have_first_class: boolean
  have_second_class: boolean
  have_third_class: boolean
  have_fourth_class: boolean
  have_wifi: boolean
  have_air_conditioning: boolean
  is_express: boolean
  min_price: number
  train: TrainInfo
  from: StationInfo
  to: StationInfo
  duration: number
  price_info: PriceInfo
  available_seats_info: SeatsInfo
}

export interface Ticket {
  have_first_class: boolean
  have_second_class: boolean
  have_third_class: boolean
  have_fourth_class: boolean
  have_wifi: boolean
  have_air_conditioning: boolean
  is_express: boolean
  min_price: number
  arrival?: ArrivalDepartureInfo
  departure: ArrivalDepartureInfo
  available_seats: number
}

export interface TicketsResponse {
  total_count: number
  items: Ticket[]
}

export type ClassType = 'first' | 'second' | 'third' | 'fourth';

export interface Coach {
  _id: string
  name: string
  class_type: ClassType
  have_first_class: boolean
  have_second_class: boolean
  have_third_class: boolean
  have_fourth_class: boolean
  have_wifi: boolean
  have_air_conditioning: boolean
  have_express: boolean
  price?: number
  top_price?: number
  bottom_price?: number
  side_price?: number
  linens_price?: number
  wifi_price?: number
  available_seats: number
  is_linens_included: boolean
}

export interface SeatsResponse {
  coach: Coach
  seats: Array<{
    index: number
    available: boolean
  }>
}

export async function fetchTickets(filters: TicketFilters): Promise<TicketsResponse> {
  const params = appendFiltersToParams(filters)

  const response = await fetch(`https://students.netoservices.ru/fe-diplom/routes?${params}`)

  if (!response.ok) {
    throw new Error('Failed to fetch tickets')
  }

  return response.json()
}

export async function fetchSeats(id: string, filters: TicketFilters): Promise<SeatsResponse[]> {
  const params = appendFiltersToParams(filters)
  const response = await fetch(`https://students.netoservices.ru/fe-diplom/routes/${id}/seats?${params}`)
console.log(`https://students.netoservices.ru/fe-diplom/routes/${id}/seats?${params}`)
  if (!response.ok) {
    throw new Error('Failed to fetch seats')
  }

  return response.json()
}

export async function fetchLastRoutes(): Promise<Ticket[]> {
  const response = await fetch('https://students.netoservices.ru/fe-diplom/routes/last')

  if (!response.ok) {
    throw new Error('Failed to fetch last tickets')
  }

  return response.json()
}

// Helper function to parse search params
export function parseSearchParams(searchParams: ReadonlyURLSearchParams): TicketFilters {
  return {
    from_city_id: searchParams.get('from_city_id')!,
    to_city_id: searchParams.get('to_city_id')!,
    from_city_name: searchParams.get('from_city_name')!,
    to_city_name: searchParams.get('to_city_name')!,
    date_start: searchParams.has('date_start') ? searchParams.get('date_start')! : undefined,
    date_end: searchParams.has('date_end') ? searchParams.get('date_end')! : undefined,
    date_start_arrival: searchParams.has('date_start_arrival') ? searchParams.get('date_start_arrival')! : undefined,
    date_end_arrival: searchParams.has('date_end_arrival') ? searchParams.get('date_end_arrival')! : undefined,
    have_first_class: searchParams.has('have_first_class') ? searchParams.get('have_first_class') === 'true' : undefined,
    have_second_class: searchParams.has('have_second_class') ? searchParams.get('have_second_class') === 'true' : undefined,
    have_third_class: searchParams.has('have_third_class') ? searchParams.get('have_third_class') === 'true' : undefined,
    have_fourth_class: searchParams.has('have_fourth_class') ? searchParams.get('have_fourth_class') === 'true' : undefined,
    have_wifi: searchParams.has('have_wifi') ? searchParams.get('have_wifi') === 'true' : undefined,
    have_air_conditioning: searchParams.has('have_air_conditioning') ? searchParams.get('have_air_conditioning') === 'true' : undefined,
    have_express: searchParams.has('have_express') ? searchParams.get('have_express') === 'true' : undefined,
    price_from: searchParams.has('price_from') ? Number.parseInt(searchParams.get('price_from') as string) : undefined,
    price_to: searchParams.has('price_to') ? Number.parseInt(searchParams.get('price_to') as string) : undefined,
    start_departure_hour_from: searchParams.has('start_departure_hour_from') ? Number.parseInt(searchParams.get('start_departure_hour_from') as string) : undefined,
    start_departure_hour_to: searchParams.has('start_departure_hour_to') ? Number.parseInt(searchParams.get('start_departure_hour_to') as string) : undefined,
    start_arrival_hour_from: searchParams.has('start_arrival_hour_from') ? Number.parseInt(searchParams.get('start_arrival_hour_from') as string) : undefined,
    start_arrival_hour_to: searchParams.has('start_arrival_hour_to') ? Number.parseInt(searchParams.get('start_arrival_hour_to') as string) : undefined,
    end_departure_hour_from: searchParams.has('end_departure_hour_from') ? Number.parseInt(searchParams.get('end_departure_hour_from') as string) : undefined,
    end_departure_hour_to: searchParams.has('end_departure_hour_to') ? Number.parseInt(searchParams.get('end_departure_hour_to') as string) : undefined,
    end_arrival_hour_from: searchParams.has('end_arrival_hour_from') ? Number.parseInt(searchParams.get('end_arrival_hour_from') as string) : undefined,
    end_arrival_hour_to: searchParams.has('end_arrival_hour_to') ? Number.parseInt(searchParams.get('end_arrival_hour_to') as string) : undefined,
    limit: searchParams.has('limit') ? Number.parseInt(searchParams.get('limit') as string) : undefined,
    offset: searchParams.has('offset') ? Number.parseInt(searchParams.get('offset') as string) : undefined,
    sort: searchParams.has('sort') ? (searchParams.get('sort') as 'date' | 'min_price' | 'duration') : undefined,
  }
}
