'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSearchParams } from 'next/navigation';
import { parseSearchParams } from '@/lib/api';

export default function TicketListControls() {
  const searchParams = useSearchParams()
  const { sort, limit } = parseSearchParams(searchParams)
  const totalTickets = 20


  function setSortBy(value: string) {

  }

  function setPerPage(value: string) {

  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-md border">
      <div className="text-sm text-gray-500 mb-2 sm:mb-0">Found: {totalTickets}</div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm whitespace-nowrap">Sort by:</span>
          <Select value={sort} onValueChange={setSortBy}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort by"/>
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
          <Select value={`${limit}`} onValueChange={setPerPage}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Per page"/>
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
  )
}