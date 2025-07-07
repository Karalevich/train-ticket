import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Clock, Wifi, Snowflake, Bed, Coffee, User, Users } from 'lucide-react'
import { fetchSeats, TicketFilters } from '@/lib/api';
import PassengerSelection from '@/components/order/PassengerSelection';


const carTypes = [
  { id: 'sitting', name: 'Sitting', icon: '🪑', available: false },
  { id: 'platzkart', name: 'Platzkart', icon: '🛏️', available: true },
  { id: 'coupe', name: 'Coupe', icon: '🚪', available: true },
  { id: 'lux', name: 'Lux', icon: '⭐', available: false },
]

export default async function TicketPage({
                                     params,
                                     searchParams
                                   }: {
  params: { slug: string[] }
  searchParams: TicketFilters
}) {
  const { slug } = await params
  const filters = await searchParams

  const data = await Promise.all(slug.map((id: string) => fetchSeats(id, filters)))

  const [passengers, setPassengers] = useState({
    adults: 2,
    children: 0,
    babies: 0,
  })

  const [selectedCarType, setSelectedCarType] = useState('platzkart')
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])



  const toggleSeat = (seatIndex: number) => {
    if (!mockTrainData.seats[seatIndex - 1]?.available) return

    setSelectedSeats((prev) => (prev.includes(seatIndex) ? prev.filter((s) => s !== seatIndex) : [...prev, seatIndex]))
  }

  const renderSeatMap = (carNumber: number) => {
    const seats = mockTrainData.seats
    const rows = []

    for (let i = 0; i < seats.length; i += 4) {
      const rowSeats = seats.slice(i, i + 4)
      rows.push(
        <div key={i} className="flex items-center gap-1 mb-1">
          <div className="w-6 text-xs text-center text-muted-foreground">{Math.floor(i / 4) + 1}</div>
          {rowSeats.map((seat, idx) => {
            const seatNumber = i + idx + 1
            const isSelected = selectedSeats.includes(seatNumber)
            const isAvailable = seat.available

            return (
              <button
                key={seatNumber}
                onClick={() => toggleSeat(seatNumber)}
                disabled={!isAvailable}
                className={`
                  w-8 h-8 text-xs border rounded flex items-center justify-center
                  ${isSelected ? 'bg-orange-400 text-white border-orange-400' : ''}
                  ${isAvailable && !isSelected ? 'bg-white border-gray-300 hover:bg-gray-50' : ''}
                  ${!isAvailable ? 'bg-gray-300 border-gray-300 cursor-not-allowed' : ''}
                `}
              >
                {seatNumber}
              </button>
            )
          })}
          {i + 4 < seats.length && i % 8 === 4 && <div className="w-4" />}
        </div>,
      )
    }

    return rows
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <PassengerSelection/>


      {/* Seat Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">SEAT SELECTION</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Train Info */}
          <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
            <div className="w-8 h-8 bg-orange-400 rounded flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
            <Button variant="outline" size="sm">
              Choose different train
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold">🚂</span>
              </div>
              <div>
                <div className="font-semibold">{mockTrainData.name}</div>
                <div className="text-sm text-muted-foreground">Express</div>
                <div className="text-sm text-muted-foreground">Moscow → Saint Petersburg</div>
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold">00:10</div>
              <div className="text-sm text-muted-foreground">Moscow</div>
              <div className="text-sm text-muted-foreground">Kursky station</div>
            </div>
            <ArrowRight className="w-6 h-6 text-orange-400" />
            <div className="text-center">
              <div className="font-semibold">09:52</div>
              <div className="text-sm text-muted-foreground">Saint Petersburg</div>
              <div className="text-sm text-muted-foreground">Ladozhsky station</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">9 hours</span>
              </div>
              <div className="text-sm text-muted-foreground">42 minutes</div>
            </div>
          </div>

          {/* Ticket Quantity */}
          <div>
            <h3 className="font-semibold mb-4">Number of tickets</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="font-medium">Adults — {passengers.adults}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Can add {3 - passengers.adults} more passengers
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="font-medium">Children — {passengers.children}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Can add up to 3 children aged 10 years (same seat as adult, but cheaper by 50-65%)
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="font-medium">Children &#34;no seat&#34; — {passengers.babies}</div>
              </div>
            </div>
          </div>

          {/* Car Type Selection */}
          <div>
            <h3 className="font-semibold mb-4">Car Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {carTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => type.available && setSelectedCarType(type.id)}
                  disabled={!type.available}
                  className={`
                    p-4 border rounded-lg text-center transition-colors
                    ${selectedCarType === type.id ? 'border-orange-400 bg-orange-50' : 'border-gray-200'}
                    ${!type.available ? 'opacity-50 cursor-not-allowed' : 'hover:border-orange-300'}
                  `}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="font-medium">{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Car 12 */}
          <div className="space-y-4">
            <div className="bg-orange-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm">car</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Seats 21</div>
                  <div className="font-semibold">Upper 10</div>
                  <div className="font-semibold">Lower 11</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Cost</div>
                  <div className="font-semibold">2 020 ₽</div>
                  <div className="font-semibold">3 030 ₽</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    <Snowflake className="w-4 h-4" />
                    <Wifi className="w-4 h-4" />
                    <Bed className="w-4 h-4 bg-orange-400 text-white rounded p-0.5" />
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-muted-foreground">Service</div>
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                {selectedSeats.length} people choose seats in this train
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-[auto_1fr] gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Users className="w-3 h-3" />
                    <span>WC</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <User className="w-3 h-3" />
                    <span>3</span>
                  </div>
                </div>
                <div className="space-y-1">{renderSeatMap(12)}</div>
              </div>
            </div>
          </div>

          {/* Car 10 */}
          <div className="space-y-4">
            <div className="bg-orange-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">10</div>
                  <div className="text-sm">car</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Seats 22</div>
                  <div className="font-semibold">Upper 10</div>
                  <div className="font-semibold">Lower 12</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Cost</div>
                  <div className="font-semibold">2 020 ₽</div>
                  <div className="font-semibold">3 030 ₽</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    <Snowflake className="w-4 h-4" />
                    <Wifi className="w-4 h-4" />
                    <Bed className="w-4 h-4 bg-orange-400 text-white rounded p-0.5" />
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-muted-foreground">Service</div>
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                {selectedSeats.length} people choose seats in this train
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-[auto_1fr] gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span>10</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Users className="w-3 h-3" />
                    <span>WC</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <User className="w-3 h-3" />
                    <span>3</span>
                  </div>
                </div>
                <div className="space-y-1">{renderSeatMap(10)}</div>
              </div>
            </div>
          </div>

          {selectedSeats.length > 0 && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="font-semibold text-green-800">Selected seats: {selectedSeats.join(', ')}</div>
              <div className="text-sm text-green-600 mt-1">
                Total cost: {selectedSeats.length * mockTrainData.bottom_price!} ₽
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
