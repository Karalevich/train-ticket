import { fetchLastRoutes } from '@/lib/api';
import { Snowflake, Wifi, Zap } from 'lucide-react';

export default async function RecentTickets() {
  const data = await fetchLastRoutes()

  return (
    <section className="space-y-2">
      <h3 className="text-lg font-medium mb-4">Recent Tickets</h3>

      {data.map((ticket, index) => (
        <div key={index}
             className="bg-white rounded-md border grid grid-cols-2 grid-rows-[auto_auto] gap-y-4 px-3 py-2">
          <div>
            <p className="font-medium capitalize">{ticket.departure.from.city.name}</p>
            <p className="text-sm text-gray-500 capitalize">{ticket.departure.from.railway_station_name}</p>
          </div>
          <div className="text-right">
            <p className="font-medium capitalize">{ticket.departure.to.city.name}</p>
            <p className="text-sm text-gray-500 capitalize">{ticket.departure.to.railway_station_name}</p>
          </div>

          <div className="self-end align-bottom flex gap-2">
            {ticket.departure.have_wifi && <Wifi className="h-4 w-4 text-blue-500"/>}
            {ticket.departure.have_air_conditioning && (
              <Snowflake className="h-4 w-4 text-blue-500"/>
            )}
            {ticket.departure.is_express && <Zap className="h-4 w-4 text-orange-500"/>}
          </div>

          <div className="self-end flex justify-end items-end">
            <span className="text-sm text-gray-500 leading-none">from&nbsp;</span>
            <span className="text-orange-500 font-medium text-xl leading-none">{ticket.departure.min_price}$
          </span>
          </div>
        </div>
      ))}

    </section>
  )
}