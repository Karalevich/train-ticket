'use client'

import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { fetchTickets, parseSearchParams } from '@/lib/api';
import OrderPagination from '@/components/order/OrderPagination/OrderPagination';
import TicketCard from '@/components/order/TicketCard/TicketCard';


export default function TicketList() {
  const searchParams = useSearchParams()
  const filters = parseSearchParams(searchParams)


  const { data } = useSuspenseQuery({
    queryKey: ['tickets', filters],
    queryFn: () => fetchTickets(filters),
  });

  return (
    <>
      {data?.items.map((ticket, index) => (
        <TicketCard key={index} ticket={ticket}/>
      ))}

      <div className="flex justify-center mt-8">
        <OrderPagination
          totalCount={data.total_count}
        />
      </div>
    </>
  )
}
