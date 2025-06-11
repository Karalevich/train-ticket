'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

export default function FilterSidebar() {
  const [departureDate, setDepartureDate] = useState<Date | undefined>(new Date())
  const [returnDate, setReturnDate] = useState<Date | undefined>()
  const [priceRange, setPriceRange] = useState([1920, 7000])

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md space-y-4">
      <div className="space-y-2">
        <Label htmlFor="departure-date" className="text-white">
          Travel Date
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white text-black hover:bg-gray-100"
            >
              <CalendarIcon className="mr-2 h-4 w-4"/>
              {departureDate ? format(departureDate, 'PP') : 'Select date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white">
            <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus/>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="return-date" className="text-white">
          Return Date
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white text-black hover:bg-gray-100"
            >
              <CalendarIcon className="mr-2 h-4 w-4"/>
              {returnDate ? format(returnDate, 'PP') : 'Select date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white">
            <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus/>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="coupe" className="text-white">
            Coupe
          </Label>
          <Switch id="coupe"/>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="platzcard" className="text-white">
            Platzcard
          </Label>
          <Switch id="platzcard"/>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="sitting" className="text-white">
            Sitting
          </Label>
          <Switch id="sitting"/>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="luxe" className="text-white">
            Luxe
          </Label>
          <Switch id="luxe"/>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="wifi" className="text-white">
            Wi-Fi
          </Label>
          <Switch id="wifi" defaultChecked/>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="express" className="text-white">
            Express
          </Label>
          <Switch id="express"/>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <h3 className="text-lg font-medium">Price</h3>
        <div className="flex justify-between text-sm">
          <span>from {priceRange[0]}</span>
          <span>to {priceRange[1]}</span>
        </div>
        <Slider
          defaultValue={[1920, 7000]}
          max={7000}
          min={1000}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
          className="py-4"
        />
        <div className="bg-orange-500/20 h-2 rounded-full relative">
          <div
            className="absolute h-full bg-orange-500 rounded-full"
            style={{
              left: `${((priceRange[0] - 1000) / 6000) * 100}%`,
              width: `${((priceRange[1] - priceRange[0]) / 6000) * 100}%`,
            }}
          />
        </div>
      </div>

      <Tabs defaultValue="oneway" className="w-full pt-2">
        <TabsList className="grid w-full grid-cols-2 bg-gray-700">
          <TabsTrigger value="oneway" className="data-[state=active]:bg-orange-500">
            One Way
          </TabsTrigger>
          <TabsTrigger value="return" className="data-[state=active]:bg-orange-500">
            Return
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
