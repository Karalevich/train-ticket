'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation';

export default function TicketListControls() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const sort = searchParams.get('sort') || undefined
  const limit = searchParams.get('limit') || undefined

  function setSortBy(value: string) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('sort', value || 'min_price');
    router.push(`/order?${params.toString()}`);
  }

  function setPerPage(value: string) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('limit', value || '5');
    params.delete('offset')
    router.push(`/order?${params.toString()}`);
  }

  return (
    <article className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
      <div className="flex items-center gap-2">
        <span className="text-sm whitespace-nowrap">Sort by:</span>
        <Select value={sort} onValueChange={setSortBy}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Sort by"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="min_price">Price</SelectItem>
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
    </article>
  )
}