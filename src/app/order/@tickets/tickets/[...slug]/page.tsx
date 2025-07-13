import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import { fetchSeats, TicketFilters } from '@/lib/api';
import PassengerSelection from '@/components/seats/PassengerSelection';
import Route from '@/components/seats/Route';
import TotalPrice from '@/components/seats/TotalPrice';

export default async function TicketPage({
                                           params,
                                           searchParams
                                         }: {
  params: { slug: string[] }
  searchParams: TicketFilters
}) {
  const { slug } = await params
  const filters = await searchParams

  const [there, back] = await Promise.all(slug.map((id: string) => fetchSeats(id, filters)))

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <CardTitle className="text-xl font-semibold">SEAT SELECTION</CardTitle>

      {/* Seat Selection */}
      <Card>
        <CardContent className="space-y-6 px-0">

          {/* Train Info */}
          <div className="flex items-center gap-4 p-4 bg-orange-50">
            <div className="w-8 h-8 bg-orange-400 rounded flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white"/>
            </div>
            <Button variant="outline" size="sm">
              Choose different train
            </Button>
          </div>
          <Route/>

          <PassengerSelection/>


          {/*{selectedSeats.length > 0 && <TotalPrice price={}/>}*/}
        </CardContent>
      </Card>
    </div>
  )
}
