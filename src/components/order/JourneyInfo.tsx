import { ArrowLeft, ArrowRight } from 'lucide-react';
import { formatDuration } from '@/lib/utils';
import JourneyStationInfo from '@/components/order/JourneyStationInfo';

export default function JourneyInfo({
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