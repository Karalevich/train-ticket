import { cn, formatTime } from '@/lib/utils';

export default function JourneyStationInfo({
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