import { Suspense } from 'react'
import TicketList from '@/components/order/TicketList';
import TicketListSkeleton from '@/app/order/@tickets/tickets/loading';
import TicketListControls from '@/components/order/TicketListControls';
import { TicketFilters } from '@/lib/api';
import { TotalTickets } from '@/components/order/TotalTickets';


export default async function TicketsPage({ searchParams }: { searchParams: TicketFilters }) {
  const filters = await searchParams

  return (
    <div className="space-y-4">
      <section
        className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-md border">
        <TotalTickets filters={filters}/>
        <TicketListControls/>
      </section>
      <Suspense fallback={<TicketListSkeleton/>}>
        <TicketList filters={filters}/>
      </Suspense>
    </div>
  )
}