import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import { fetchSeats, TicketFilters } from '@/lib/api';
import PassengerSelection from '@/components/seats/PassengerSelection';
import Route from '@/components/seats/Route';
import TotalPrice from '@/components/seats/TotalPrice';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

          <Tabs defaultValue="1" className="gap-0">
            <div className="bg-orange-50 px-4 py-1 w-full">
              <span>Carts:</span>
              <TabsList className="bg-transparent">
                {there.map((cart, index) => <TabsTrigger value={`${index}`} key={index}>{index + 1}</TabsTrigger>)}
              </TabsList>
            </div>

            {there.map((cart, index) =>
              <TabsContent value={`${index}`} key={index}>
                <div className="flex">
                  <div className="bg-orange-50 flex flex-col items-center justify-between py-10 px-14">
                    <p className="text-5xl">{index + 1}</p>
                    <p className="text-xl">cart</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between p-4">
                      <span className="text-lg font-semibold">Coach: {cart.coach.name}</span>
                      <span className="text-sm text-gray-500">Price: ${cart.coach.price}</span>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600">Available Seats: {cart.coach.avaliable_seats}</p>
                      <p className="text-sm text-gray-600">Total Seats: {cart.coach.have_express}</p>
                    </div>
                  </div>

                </div>
              </TabsContent>
            )}

          </Tabs>


          {/*{selectedSeats.length > 0 && <TotalPrice price={}/>}*/}
        </CardContent>
      </Card>
    </div>
  )
}
