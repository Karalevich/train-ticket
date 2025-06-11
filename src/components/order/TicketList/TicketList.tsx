'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowRight, ArrowLeft, Train, Wifi, Coffee, Utensils } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export default function TicketList() {
  const [sortBy, setSortBy] = useState('time')
  const [perPage, setPerPage] = useState('10')

  // Mock data for tickets
  const tickets = [
    {
      id: '116C',
      departureTime: '00:10',
      departureStation: 'London',
      departureTerminal: 'Euston Station',
      arrivalTime: '09:52',
      arrivalStation: 'Edinburgh',
      arrivalTerminal: 'Waverley Station',
      duration: '9:42',
      direction: 'outbound',
      seats: {
        sitting: { available: 88, price: 1920 },
        platzcard: { available: 52, price: 2530 },
        coupe: { available: 24, price: 3820 },
        luxe: { available: 15, price: 4950 },
      },
      amenities: ['wifi', 'food', 'luggage'],
    },
    {
      id: '020Y',
      departureTime: '00:20',
      departureStation: 'London',
      departureTerminal: 'Paddington Station',
      arrivalTime: '08:59',
      arrivalStation: 'Edinburgh',
      arrivalTerminal: 'Waverley Station',
      duration: '8:39',
      direction: 'outbound',
      seats: {
        coupe: { available: 90, price: 3950 },
        luxe: { available: 31, price: 4950 },
      },
      amenities: ['wifi', 'food', 'luggage'],
    },
    {
      id: '116C',
      departureTime: '00:41',
      departureStation: 'London',
      departureTerminal: 'King\'s Cross Station',
      arrivalTime: '09:13',
      arrivalStation: 'Edinburgh',
      arrivalTerminal: 'Waverley Station',
      duration: '8:32',
      direction: 'outbound',
      seats: {
        platzcard: { available: 57, price: 2530 },
        coupe: { available: 24, price: 3820 },
        luxe: { available: 15, price: 4950 },
      },
      amenities: ['wifi', 'food', 'luggage'],
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-md border">
        <div className="text-sm text-gray-500 mb-2 sm:mb-0">Found: 20</div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm whitespace-nowrap">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="time">Time</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm whitespace-nowrap">Show:</span>
            <Select value={perPage} onValueChange={setPerPage}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {tickets.map((ticket) => (
        <div key={ticket.id + ticket.departureTime} className="bg-white rounded-md border overflow-hidden">
          <div className="grid grid-cols-12 gap-0">
            {/* Train info column */}
            <div className="col-span-3 bg-gray-100 p-4 flex flex-col items-center justify-center">
              <div className="mb-4">
                <Train className="h-12 w-12 text-gray-500" />
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{ticket.id}</p>
                <p className="text-sm text-gray-500">
                  {ticket.departureStation} → {ticket.arrivalStation}
                </p>
              </div>
            </div>

            {/* Schedule column */}
            <div className="col-span-9 p-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Time and route info */}
                <div className="space-y-4">
                  {/* Outbound journey */}
                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <p className="text-lg font-bold">{ticket.departureTime}</p>
                      <p className="text-sm">{ticket.departureStation}</p>
                      <p className="text-xs text-gray-500">{ticket.departureTerminal}</p>
                    </div>
                    <div className="flex-1 px-2">
                      <div className="relative">
                        <div className="border-t border-gray-300 w-full absolute top-1/2"></div>
                        <div className="flex justify-end">
                          <ArrowRight className="text-orange-500 bg-white relative" />
                        </div>
                        <p className="text-xs text-center text-gray-500 mt-1">{ticket.duration}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{ticket.arrivalTime}</p>
                      <p className="text-sm">{ticket.arrivalStation}</p>
                      <p className="text-xs text-gray-500">{ticket.arrivalTerminal}</p>
                    </div>
                  </div>

                  {/* Return journey */}
                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <p className="text-lg font-bold">{ticket.departureTime}</p>
                      <p className="text-sm">{ticket.departureStation}</p>
                      <p className="text-xs text-gray-500">{ticket.departureTerminal}</p>
                    </div>
                    <div className="flex-1 px-2">
                      <div className="relative">
                        <div className="border-t border-gray-300 w-full absolute top-1/2"></div>
                        <div className="flex justify-start">
                          <ArrowLeft className="text-orange-500 bg-white relative" />
                        </div>
                        <p className="text-xs text-center text-gray-500 mt-1">{ticket.duration}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{ticket.arrivalTime}</p>
                      <p className="text-sm">{ticket.arrivalStation}</p>
                      <p className="text-xs text-gray-500">{ticket.arrivalTerminal}</p>
                    </div>
                  </div>
                </div>

                {/* Seat availability and pricing */}
                <div className="grid grid-cols-2 gap-2">
                  {ticket.seats.sitting && (
                    <div className="flex justify-between items-center">
                      <span>Sitting</span>
                      <span className="text-gray-500">{ticket.seats.sitting.available}</span>
                      <span className="font-bold text-orange-500">£{ticket.seats.sitting.price}</span>
                    </div>
                  )}

                  {ticket.seats.platzcard && (
                    <div className="flex justify-between items-center">
                      <span>Platzcard</span>
                      <span className="text-gray-500">{ticket.seats.platzcard.available}</span>
                      <span className="font-bold text-orange-500">£{ticket.seats.platzcard.price}</span>
                    </div>
                  )}

                  {ticket.seats.coupe && (
                    <div className="flex justify-between items-center">
                      <span>Coupe</span>
                      <span className="text-gray-500">{ticket.seats.coupe.available}</span>
                      <span className="font-bold text-orange-500">£{ticket.seats.coupe.price}</span>
                    </div>
                  )}

                  {ticket.seats.luxe && (
                    <div className="flex justify-between items-center">
                      <span>Luxe</span>
                      <span className="text-gray-500">{ticket.seats.luxe.available}</span>
                      <span className="font-bold text-orange-500">£{ticket.seats.luxe.price}</span>
                    </div>
                  )}

                  <div className="col-span-2 mt-2">
                    <div className="flex gap-2 justify-end mb-2">
                      {ticket.amenities.includes('wifi') && <Wifi className="h-4 w-4 text-gray-500" />}
                      {ticket.amenities.includes('food') && <Utensils className="h-4 w-4 text-gray-500" />}
                      {ticket.amenities.includes('luggage') && <Coffee className="h-4 w-4 text-gray-500" />}
                    </div>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">Select seats</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
