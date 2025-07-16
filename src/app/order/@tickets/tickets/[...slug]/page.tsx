import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import { ClassType, Coach, fetchSeats, TicketFilters } from '@/lib/api';
import PassengerSelection from '@/components/seats/PassengerSelection';
import Route from '@/components/seats/Route';
import TotalPrice from '@/components/seats/TotalPrice';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Services from '@/components/seats/Services';

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

  function toggleService(service: string) {
    // This function will handle toggling services like cooling, wifi, etc.
    // You can implement the logic to update the state or make API calls as needed.
    console.log(`Toggling service: ${service}`);
  }

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
            <div className="bg-orange-200 px-4 py-1 w-full">
              <span>Carts:</span>
              <TabsList className="bg-transparent">
                {there.map((cart, index) => <TabsTrigger value={`${index}`} key={index}>{index + 1}</TabsTrigger>)}
              </TabsList>
            </div>

            {there.map((cart, index) =>
              <TabsContent value={`${index}`} key={index}>
                <div className="flex">
                  <div className="bg-orange-200 flex flex-col items-center justify-between py-10 px-14 relative">
                    <p className="text-5xl">{index + 1}</p>
                    <p className="text-xl">cart</p>
                    <div className="absolute flex flex-col text-sm text-gray-500 right-1 top-2 capitalize">
                      <span>{cart.coach.class_type}</span>
                      <span>class</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 grid-rows-[1fr_3fr] p-4 w-full justify-between">
                    <div className="text-sm text-gray-500">
                      Available Seats: <span className="text-primary">{cart.coach.available_seats}</span>
                    </div>
                    <div className="text-sm text-gray-500">Price</div>
                    <div className="text-sm text-gray-500 justify-self-center">Service</div>
                    <ClassPriceInfo classType={cart.coach.class_type} coach={cart.coach}/>
                    <Services cooling={cart.coach.have_air_conditioning} wifi={cart.coach.have_wifi}
                              sheets={cart.coach.is_linens_included} />
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

function ClassPriceInfo({ classType, coach }: { classType: ClassType, coach: Coach }) {
  if (classType === 'first' || classType === 'fourth') {
    return (
      <div className="col-start-2">
        <span className="font-bold">{coach.price}</span><span>$</span>
      </div>
    )
  }

  if (classType === 'second') {
    return (
      <div className="col-span-2">
        <div className="grid grid-cols-2">
          <div>
            <span className="me-2">Top shelf</span>
            <span className="font-bold">{Math.floor(coach.available_seats / 2)}</span>
          </div>
          <div>
            <span className="font-bold">{coach.top_price}</span><span>$</span>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <span className="me-2">Bottom shelf</span>
            <span className="font-bold">{Math.floor(coach.available_seats / 2)}</span>
          </div>
          <div>
            <span className="font-bold">{coach.bottom_price}</span><span>$</span>
          </div>
        </div>
      </div>
    )
  }

  if (classType === 'third') {
    return (
      <div className="col-span-2">
        <div className="grid grid-cols-2">
          <div>
            <span className="me-2">Top shelf</span>
            <span className="font-bold">{Math.floor(coach.available_seats / 3)}</span>
          </div>
          <div>
            <span className="font-bold">{coach.top_price}</span><span>$</span>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <span className="me-2">Bottom shelf</span>
            <span className="font-bold">{Math.floor(coach.available_seats / 3)}</span>
          </div>
          <div>
            <span className="font-bold">{coach.bottom_price}</span><span>$</span>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <span className="me-2">Side shelf</span>
            <span className="font-bold">{Math.floor(coach.available_seats / 3)}</span>
          </div>
          <div>
            <span className="font-bold">{coach.side_price}</span><span>$</span>
          </div>
        </div>
      </div>
    )
  }
}
