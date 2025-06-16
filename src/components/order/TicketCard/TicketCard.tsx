import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, Train, Wifi, Snowflake, Zap } from 'lucide-react'
import { formatTime, formatDuration } from '@/lib/utils'
import { Ticket } from '@/lib/api'

interface TicketCardProps {
  ticket: Ticket
}

export default function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className="bg-white rounded-md border overflow-hidden">
      <div className="grid grid-cols-12 gap-0">
        {/* Train info column */}
        <div className="col-span-3 bg-gray-100 p-4 flex flex-col items-center justify-center">
          <div className="mb-4">
            <Train className="h-12 w-12 text-gray-500" />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{ticket.departure.train.number || 'N/A'}</p>
            <p className="text-sm text-gray-500">
              {ticket.departure.from.city.name} → {ticket.departure.to.city.name}
            </p>
            {ticket.is_express && (
              <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                <Zap className="w-3 h-3 mr-1" />
                Express
              </div>
            )}
          </div>
        </div>

        {/* Schedule column */}
        <div className="col-span-9 p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Time and route info */}
            <div className="space-y-4">
              {/* Outbound journey */}
              <JourneyInfo
                from={ticket.departure.from}
                to={ticket.departure.to}
                duration={ticket.departure.duration}
                direction="outbound"
              />

              {/* Return journey */}
              {ticket.arrival && (
                <JourneyInfo
                  from={ticket.arrival.from}
                  to={ticket.arrival.to}
                  duration={ticket.arrival.duration}
                  direction="return"
                />
              )}
            </div>

            {/* Seat availability and pricing */}
            <div className="space-y-2">
              <ClassOptions ticket={ticket} />
              <div className="mt-4">
                <div className="flex gap-2 justify-end mb-2">
                  {ticket.have_wifi && <Wifi className="h-4 w-4 text-blue-500" />}
                  {ticket.have_air_conditioning && (
                    <Snowflake className="h-4 w-4 text-blue-500"  />
                  )}
                  {ticket.is_express && <Zap className="h-4 w-4 text-orange-500" />}
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  Total available seats: {ticket.total_avaliable_seats}
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Select seats - from £{ticket.min_price}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function JourneyInfo({
                       from,
                       to,
                       duration,
                       direction,
                     }: {
  from: any
  to: any
  duration: number
  direction: 'outbound' | 'return'
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-center">
        <p className="text-lg font-bold">{formatTime(from?.datetime)}</p>
        <p className="text-sm">{from?.city.name}</p>
        <p className="text-xs text-gray-500">{from?.railway_station_name}</p>
      </div>
      <div className="flex-1 px-2">
        <div className="relative">
          <div className="border-t border-gray-300 w-full absolute top-1/2"></div>
          <div className={`flex ${direction === 'outbound' ? 'justify-end' : 'justify-start'}`}>
            {direction === 'outbound' ? (
              <ArrowRight className="text-orange-500 bg-white relative" />
            ) : (
              <ArrowLeft className="text-orange-500 bg-white relative" />
            )}
          </div>
          <p className="text-xs text-center text-gray-500 mt-1">
            {formatDuration(duration)}
          </p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold">{formatTime(to?.datetime)}</p>
        <p className="text-sm">{to?.city.name}</p>
        <p className="text-xs text-gray-500">{to?.railway_station_name}</p>
      </div>
    </div>
  )
}

function ClassOptions({ ticket }: { ticket: Ticket }) {
  const { departure } = ticket
  const { seats_info, price_info } = departure

  const classes = [
    {
      label: 'First Class',
      available: ticket.have_first_class,
      seats: seats_info?.first_class,
      price: price_info?.first_class,
    },
    {
      label: 'Second Class',
      available: ticket.have_second_class,
      seats: seats_info?.second_class,
      price: price_info?.second_class,
    },
    {
      label: 'Third Class',
      available: ticket.have_third_class,
      seats: seats_info?.third_class,
      price: price_info?.third_class,
    },
    {
      label: 'Fourth Class',
      available: ticket.have_fourth_class,
      seats: seats_info?.fourth_class,
      price: price_info?.fourth_class,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {classes.map(
        (cls) =>
          cls.available &&
          cls.seats && (
            <div className="flex justify-between items-center" key={cls.label}>
              <span>{cls.label}</span>
              <span className="text-gray-500">{cls.seats}</span>
              <span className="font-bold text-orange-500">£{cls.price}</span>
            </div>
          )
      )}
    </div>
  )
}