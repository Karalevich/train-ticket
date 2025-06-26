'use client'

import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { fetchTickets, parseSearchParams } from '@/lib/api';
import OrderPagination from '@/components/order/OrderPagination/OrderPagination';
import TicketCard from '@/components/order/TicketCard/TicketCard';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import { setTotalCount } from '@/features/ticket/ticketSlice';


export default function TicketList() {
  const searchParams = useSearchParams()
  const filters = parseSearchParams(searchParams)
  const dispatch = useDispatch()


  const { data } = useSuspenseQuery({
    queryKey: ['tickets', filters],
    queryFn: () => fetchTickets(filters),
  })

  useLayoutEffect(() => {
    dispatch(setTotalCount(Number(data.total_count)));
  }, [data, dispatch]);

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
