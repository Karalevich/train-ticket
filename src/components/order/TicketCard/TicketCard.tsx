import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, Train, Wifi, Snowflake, Zap } from 'lucide-react'
import { formatTime, formatDuration } from '@/lib/utils'
import { Ticket } from '@/lib/api'
import { Fragment } from 'react';

interface TicketCardProps {
  ticket: Ticket
}

export default function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className="bg-white rounded-md border overflow-hidden">
      <div className="grid grid-cols-12 gap-0">
        {/* Train info column */}
        <div className="col-span-3 bg-gray-100 p-4 flex flex-col items-center justify-center">
          <Train className="h-12 w-12 text-gray-500 mb-4"/>
          <div className="text-center">
            <p className="text-xl font-bold">{ticket.departure.train.name || 'N/A'}</p>
            <p className="text-sm text-gray-500">
              {ticket.departure.from.city.name} → {ticket.departure.to.city.name}
            </p>
            {ticket.is_express && (
              <div
                className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                <Zap className="w-3 h-3 mr-1"/>
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
              <ClassOptions ticket={ticket}/>
              <div className="mt-4">
                <div className="flex gap-2 justify-end mb-2">
                  {ticket.departure.have_wifi && <Wifi className="h-4 w-4 text-blue-500"/>}
                  {ticket.departure.have_air_conditioning && (
                    <Snowflake className="h-4 w-4 text-blue-500"/>
                  )}
                  {ticket.departure.is_express && <Zap className="h-4 w-4 text-orange-500"/>}
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  Total available seats: {ticket.available_seats}
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
    <div className="flex items-stretch gap-2">
      <div className="flex flex-col text-center flex-1 justify-between">
        <div>
          <p className="font-bold text-xs">{formatTime(from?.datetime)[0]}</p>
          <p className="text-lg font-bold">{formatTime(from?.datetime)[1]}</p>
        </div>
        <p className="text-sm">{from?.city.name}</p>
        <p className="text-xs text-gray-500">{from?.railway_station_name}</p>
      </div>
      <div className="flex flex-col flex-1 px-2 relative justify-center">
        <div className='flex flex-col items-center'>
          {direction === 'outbound' ? (
            <ArrowRight className="text-orange-500 bg-white relative"/>
          ) : (
            <ArrowLeft className="text-orange-500 bg-white relative"/>
          )}
        </div>
        <p className="text-xs text-center text-gray-500 mt-1">
          {formatDuration(duration)}
        </p>
      </div>
      <div className="flex flex-col text-center flex-1 justify-between">
        <div>
          <p className="text-xs font-bold">{formatTime(to?.datetime)[0]}</p>
          <p className="text-lg font-bold">{formatTime(to?.datetime)[1]}</p>
        </div>
        <p className="text-sm">{to?.city.name}</p>
        <p className="text-xs text-gray-500">{to?.railway_station_name}</p>
      </div>
    </div>
  )
}

function ClassOptions({ ticket }: { ticket: Ticket }) {
  const { departure } = ticket
  const { available_seats_info, price_info } = departure

  const classes = [
    {
      label: 'First Class',
      available: ticket.have_first_class || departure.have_first_class,
      seats: available_seats_info?.first,
      price: price_info?.first?.bottom_price,
    },
    {
      label: 'Second Class',
      available: ticket.have_second_class || departure.have_second_class,
      seats: available_seats_info?.second,
      price: price_info?.second?.bottom_price,
    },
    {
      label: 'Third Class',
      available: ticket.have_third_class || departure.have_third_class,
      seats: available_seats_info?.third,
      price: price_info?.third?.bottom_price,
    },
    {
      label: 'Fourth Class',
      available: ticket.have_fourth_class || departure.have_fourth_class,
      seats: available_seats_info?.fourth,
      price: price_info?.fourth?.bottom_price,
    },
  ]

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] gap-2">
      {classes.map(
        (cls) =>
          cls.available &&
          cls.seats && (
            <Fragment key={cls.label}>
              <span>{cls.label}</span>
              <span className="text-gray-500 justify-self-center">{cls.seats}</span>
              <span className="font-bold text-orange-500 justify-self-end">${cls.price}</span>
            </Fragment>
          )
      )}
    </div>
  )
}