'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { ArrivalDepartureInfo } from '@/lib/api';

export default function TicketCardAction({ path, minPrice, departure, arrival }: {
  path: string,
  minPrice: number,
  departure: ArrivalDepartureInfo,
  arrival?: ArrivalDepartureInfo
}) {
  const dispatch = useDispatch();

  function setTrainData() {
    dispatch({ type: 'route/setDeparture', payload: departure });
    if (arrival) {
      dispatch({ type: 'route/setArrival', payload: arrival });
    }
  }

  return (
    <Button asChild onClick={setTrainData} className="w-full bg-orange-500 hover:bg-orange-600">
      <Link href={path}>Select seats - from ${minPrice}</Link>
    </Button>
  )
}