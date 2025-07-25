import { fetchTickets, TicketFilters } from '@/lib/api';
import OrderPagination from '@/components/order/OrderPagination';
import TicketCard from '@/components/order/TicketCard';

export default async function TicketList({ filters }: { filters: TicketFilters }) {
  const data = await fetchTickets(filters)

  return (
    <>
      {data?.items.map((ticket, index) => (
        <TicketCard key={index} ticket={ticket} filters={filters} />
      ))}

      <div className="flex justify-center mt-8">
        <OrderPagination
          totalCount={data.total_count}
        />
      </div>
    </>
  )
}
