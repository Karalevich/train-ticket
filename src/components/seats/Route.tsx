'use client'

import { ArrowRight, Clock } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { formatDurationInHoursAndMinutes, formatTime } from '@/lib/utils';

export default function Route() {
  const departure = useSelector((state: RootState) => state.route.departure);

  return (
    <section className="flex items-center justify-between p-4 border">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <span className="text-orange-600 font-semibold">🚂</span>
        </div>
        <div>
          <div className="font-semibold">{departure?.train?.name}</div>
          {departure?.is_express && <div className="text-sm text-muted-foreground">Express</div>}
          <div className="text-sm text-muted-foreground">{departure?.from.city.name} → {departure?.to.city.name}</div>
        </div>
      </div>
      <div className="text-center">
        <div className="font-semibold">{formatTime(departure?.from.datetime)[1]}</div>
        <div className="text-sm text-muted-foreground">{departure?.from?.city.name}</div>
        <div className="text-sm text-muted-foreground">{departure?.from?.railway_station_name}</div>
      </div>
      <ArrowRight className="w-6 h-6 text-orange-400"/>
      <div className="text-center">
        <div className="font-semibold">{formatTime(departure?.to.datetime)[1]}</div>
        <div className="text-sm text-muted-foreground">{departure?.to?.city.name}</div>
        <div className="text-sm text-muted-foreground">{departure?.to?.city.name}</div>
      </div>
      <div className="text-center">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4"/>
          <span className="text-sm">{formatDurationInHoursAndMinutes(departure?.duration)[0]}hours</span>
        </div>
        <div className="text-sm text-muted-foreground">{formatDurationInHoursAndMinutes(departure?.duration)[1]}minutes</div>
      </div>
    </section>
  )
}