import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, Train, Wifi, Snowflake, Zap } from 'lucide-react'
import { formatTime, formatDuration, cn } from '@/lib/utils'
import { ArrivalDepartureInfo, PriceRange, Ticket, TicketFilters } from '@/lib/api'
import { Fragment } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { Separator } from "@/components/ui/separator";

interface TicketCardProps {
  ticket: Ticket
  filters: TicketFilters
}

export default function TicketCard({ ticket, filters }: TicketCardProps) {
  const params = new URLSearchParams(Array.from(Object.entries(filters)))
  const arrivalTrainId = ticket.arrival?.train?._id ? `/${ticket.arrival.train._id}` : '';
  const path = `/order/tickets/${ticket.departure.train._id}${arrivalTrainId}?${params.toString()}`

  return (
    <div className="bg-white rounded-md border overflow-hidden grid grid-cols-12 gap-0">
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
        <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
          <Link href={path}>Select seats - from ${ticket.min_price}</Link>
        </Button>
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
      <JourneyStationInfo
        datetime={from?.datetime}
        cityName={from?.city.name}
        stationName={from?.railway_station_name}
        isArrival={false}
        className="text-left"
      />

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

      <JourneyStationInfo
        datetime={to?.datetime}
        cityName={to?.city.name}
        stationName={to?.railway_station_name}
        isArrival={true}
        className="text-right"
      />
    </div>
  )
}

function JourneyStationInfo({
                              datetime,
                              cityName,
                              stationName,
                              isArrival,
                              className
                            }: {
  datetime: number
  cityName: string
  stationName: string
  isArrival: boolean
  className?: string
}) {
  return (
    <div className={cn('flex flex-col md:text-center flex-1 justify-between', className)}>
      <div>
        <p className={`font-bold text-xs${isArrival ? ' text-xs' : ''}`}>{formatTime(datetime)[0]}</p>
        <p className="text-lg font-bold">{formatTime(datetime)[1]}</p>
      </div>
      <p className="text-sm">{cityName}</p>
      <p className="text-xs text-gray-500">{stationName}</p>
    </div>
  )
}

function ClassOptions({ direction }: { direction: ArrivalDepartureInfo }) {
  const {
    available_seats_info,
    price_info,
    have_first_class,
    have_second_class,
    have_third_class,
    have_fourth_class
  } = direction

  function getAvailableSeatsInfo(seats: PriceRange) {
    return Object.entries(seats).map(([key, value]) => ({ [key.split('_')[0]]: value }))
  }

  const classes = [
    {
      label: 'First Class',
      available: have_first_class,
      seats: available_seats_info?.first,
      price: price_info?.first?.price,
    },
    {
      label: 'Second Class',
      available: have_second_class,
      seats: available_seats_info?.second,
      price: price_info?.second?.top_price,
      tooltip: getAvailableSeatsInfo(price_info?.second || {}),
    },
    {
      label: 'Third Class',
      available: have_third_class,
      seats: available_seats_info?.third,
      price: price_info?.third?.top_price,
      tooltip: getAvailableSeatsInfo(price_info?.third || {}),

    },
    {
      label: 'Fourth Class',
      available: have_fourth_class,
      seats: available_seats_info?.fourth,
      price: price_info?.fourth?.bottom_price,
    },
  ]

  return (
    <div className="grid grid-cols-3 md:grid-cols-[2fr_1fr_1fr] gap-2 items-start">
      {classes.map(
        (cls) =>
          cls.available &&
          cls.seats && (
            <Fragment key={cls.label}>
              <span>{cls.label}</span>
              <Tooltip>
                <TooltipTrigger className="text-gray-500 justify-self-center">{cls.seats}</TooltipTrigger>
                {cls.tooltip && <TooltipContent>
                  <ul className="flex flex-col gap-2">
                    {cls.tooltip.map((t, i) => {
                      return (
                        <li key={i} className="flex justify-between">
                          <span className="capitalize">{Object.keys(t)[0]}:&nbsp;&nbsp;&nbsp;</span>
                          <span className="font-bold text-amber-500">${Object.values(t)[0]}</span>
                        </li>
                      )
                    })}
                  </ul>
                </TooltipContent>}
              </Tooltip>

              <div className="justify-self-end">
                {cls.tooltip?.length && <span className="text-xs">from&nbsp;</span>}
                <span className="font-bold text-amber-500 justify-self-end">${cls.price}</span>
              </div>
            </Fragment>
          )
      )}
    </div>
  )
}