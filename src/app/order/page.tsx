import { Suspense } from 'react'
import TicketList from '@/components/order/TicketList/TicketList';
import BookingStepper from '@/components/order/BookingStepper/BookingStepper';
import FilterSidebar from '@/components/order/FilterSidebar/FilterSidebar';
import RecentTickets from '@/components/order/RecentTickets/RecentTickets';
import TicketListSkeleton from '@/app/order/loading';
import TicketListControls from '@/components/order/TicketListControls/TicketListControls';
import { TicketFilters } from '@/lib/api';
import { TotalTickets } from '@/components/order/TotalTickets/TotalTickets';


export default async function TicketsPage({ searchParams }: { searchParams: TicketFilters }) {
  const filters = await searchParams

  return (
    <div className="min-h-screen bg-gray-50">
      <BookingStepper currentStep={1}/>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4 space-y-6">
            <FilterSidebar/>
            <RecentTickets/>
          </div>

          <div className="w-full lg:w-3/4">

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

          </div>
        </div>
      </div>
    </div>
  )
}