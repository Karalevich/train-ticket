import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import TicketList from '@/components/order/TicketList/TicketList';
import BookingStepper from '@/components/order/BookingStepper/BookingStepper';
import FilterSidebar from '@/components/order/FilterSidebar/FilterSidebar';
import RecentTickets from '@/components/order/RecentTickets/RecentTickets';

export default function TicketsPage() {
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
            <Suspense fallback={<TicketListSkeleton/>}>
              <TicketList/>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

function TicketListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-32"/>
        <Skeleton className="h-8 w-48"/>
      </div>
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-64 w-full rounded-md"/>
      ))}
    </div>
  )
}
