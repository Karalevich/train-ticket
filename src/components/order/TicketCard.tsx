import { Train, Wifi, Snowflake, Zap } from 'lucide-react'
import { Ticket, TicketFilters } from '@/lib/api'
import { Separator } from '@/components/ui/separator';
import JourneyInfo from '@/components/order/JourneyInfo';
import ClassOptions from '@/components/order/ClassOptions';
import TicketCardAction from '@/components/order/TicketCardAction';

interface TicketCardProps {
  ticket: Ticket
  filters: TicketFilters
}

export default function TicketCard({ ticket, filters }: TicketCardProps) {
  const params = new URLSearchParams(Array.from(Object.entries(filters)))
  const arrivalTrainId = ticket.arrival?._id ? `/${ticket.arrival._id}` : '';
  const path = `/order/tickets/${ticket.departure._id}${arrivalTrainId}?${params.toString()}`

  return (
    <article className="bg-white rounded-md border overflow-hidden grid grid-cols-12 gap-0">
      {/* Train info column */}
      <div className="col-span-3 row-span-2 bg-gray-100 p-4 flex flex-col items-center justify-center">
        <Train className="h-12 w-12 text-gray-500 mb-4"/>
        <div className="text-center">
          <p className="text-xl font-bold">{ticket.departure.train.name || 'N/A'}</p>
          <p className="text-sm text-gray-500">
            {ticket.departure.from.city.name} → {ticket.departure.to.city.name}
          </p>
        </div>
      </div>

      {/* Schedule column */}
      <div className="col-span-9 p-4 grid gap-4">
        {/* Time and route info */}
        <div className=" grid md:grid-cols-2 gap-4">
          {/* Outbound journey */}
          <JourneyInfo
            from={ticket.departure.from}
            to={ticket.departure.to}
            duration={ticket.departure.duration}
            direction="outbound"
          />

          {/* Seat availability and pricing */}
          <ClassOptions direction={ticket.departure}/>
        </div>

        {/* Return journey */}
        {ticket.arrival && (
          <>
            <Separator/>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Outbound journey */}
              <JourneyInfo
                from={ticket.arrival.from}
                to={ticket.arrival.to}
                duration={ticket.arrival.duration}
                direction="return"
              />

              {/* Seat availability and pricing */}
              <ClassOptions direction={ticket.arrival}/>
            </div>
          </>
        )}
      </div>

      {/* Amenities and actions column */}
      <div className="col-start-9 col-span-4 p-4">
        <div className="flex gap-2 justify-end mb-2">
          {ticket.departure.have_wifi && <Wifi className="h-4 w-4 text-blue-500"/>}
          {ticket.departure.have_air_conditioning && (
            <Snowflake className="h-4 w-4 text-blue-500"/>
          )}
          {ticket.departure.is_express && <Zap className="h-4 w-4 text-blue-500"/>}
        </div>
        <div className="text-sm text-gray-500 mb-2">
          Total available seats: {ticket.available_seats}
        </div>
        <TicketCardAction path={path} minPrice={ticket.min_price} departure={ticket.departure}
                          arrival={ticket.arrival}/>
      </div>
    </article>
  )
}