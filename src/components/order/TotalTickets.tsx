import { fetchTickets, TicketFilters } from '@/lib/api';

export async function TotalTickets({ filters }: { filters: TicketFilters }) {
  const data = await fetchTickets(filters)

  return(
    <span className="text-sm text-gray-500 mb-2 sm:mb-0">Found: {data.total_count}</span>
  )
}