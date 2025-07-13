import { ArrivalDepartureInfo, PriceRange } from '@/lib/api';
import { Fragment } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function ClassOptions({ direction }: { direction: ArrivalDepartureInfo }) {
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