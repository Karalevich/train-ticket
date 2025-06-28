import { fetchLastRoutes } from '@/lib/api';

export default async function RecentTickets() {
  const data = await fetchLastRoutes()

  return (
    <div className="bg-white p-4 rounded-md border">
      <h3 className="text-lg font-medium mb-4">Recent Tickets</h3>
      <div className="space-y-4">
        {data.map((ticket, index) => (
          <div key={index} className="border-b pb-3 last:border-0">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{ticket.departure.from.city.name}</p>
                <p className="text-sm text-gray-500">Euston Station</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{ticket.departure.to.city.name}</p>
                <p className="text-sm text-gray-500">Central Station</p>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <p className="text-orange-500 font-bold">{ticket.departure.min_price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}