import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-md border overflow-hidden"
        >
          <div className="grid grid-cols-12 gap-0">
            {/* Train info column */}
            <div className="col-span-3 bg-gray-100 p-4 flex flex-col items-center justify-center">
              <Skeleton className="h-12 w-12 mb-4 rounded-full bg-gray-200" />
              <Skeleton className="h-6 w-20 mb-2 bg-gray-200" />
              <Skeleton className="h-4 w-24 bg-gray-200" />
            </div>
            {/* Schedule and seat/pricing */}
            <div className="col-span-9 p-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Time and route info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-16 bg-gray-200" />
                    <Skeleton className="h-2 w-20 flex-1 bg-gray-200" />
                    <Skeleton className="h-8 w-16 bg-gray-200" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-16 bg-gray-200" />
                    <Skeleton className="h-2 w-20 flex-1 bg-gray-200" />
                    <Skeleton className="h-8 w-16 bg-gray-200" />
                  </div>
                </div>
                {/* Seat availability and pricing */}
                <div className="space-y-2">
                  {[...Array(2)].map((_, j) => (
                    <div className="flex justify-between items-center" key={j}>
                      <Skeleton className="h-4 w-20 bg-gray-200" />
                      <Skeleton className="h-4 w-8 bg-gray-200" />
                      <Skeleton className="h-4 w-12 bg-gray-200" />
                    </div>
                  ))}
                  <div className="flex gap-2 justify-end mb-2 mt-4">
                    <Skeleton className="h-4 w-4 rounded bg-gray-200" />
                    <Skeleton className="h-4 w-4 rounded bg-gray-200" />
                    <Skeleton className="h-4 w-4 rounded bg-gray-200" />
                  </div>
                  <Skeleton className="h-4 w-40 mb-2 bg-gray-200" />
                  <Skeleton className="h-10 w-full rounded bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}