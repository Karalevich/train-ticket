'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { DatePicker } from '@/components/ui/datePicker';
import { disabled } from '@/lib/utils';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseSearchParams } from '@/lib/api';

const FormSchema = z.object({
  departure: z.optional(z.date()),
  return: z.optional(z.date()),
}).refine(
  (data) => {
    if (!data.departure || !data.return) return true; // If either date is not provided, skip validation
    return data.return >= data.departure;
  },
  {
    message: 'Return date must follow departure',
    path: ['return'],
  }
);


export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const { date_start, date_end } = parseSearchParams(searchParams)

  const [priceRange, setPriceRange] = useState([1920, 7000])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      departure: date_start ? new Date(`${date_start}T00:00:00`) : undefined,
      return: date_end ? new Date(`${date_end}T00:00:00`) : undefined,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const filters = {
      date_start: data?.departure ? data.departure.toISOString().split('T')[0] : undefined,
      date_end: data?.return ? data.return.toISOString().split('T')[0] : undefined,
      limit: 5,
    };

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value as string);
    })
   // router.push(`/order?${params.toString()}`);
  }


  return (
    <aside className="bg-gray-800 text-white p-4 rounded-md space-y-4">
      <Form {...form}>
        <form  className="space-y-2 fles flex-col gap-2">
          <DatePicker form={form} disabled={disabled} onChange={form.handleSubmit(onSubmit)} label='Departure Date' name='departure'/>
          <DatePicker form={form} disabled={disabled} onChange={form.handleSubmit(onSubmit)} label='Return Date' name='return'/>
        </form>
      </Form>

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="coupe" className="text-white">
            First Class
          </Label>
          <Switch id="coupe"/>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="platzcard" className="text-white">
            Second Class
          </Label>
          <Switch id="platzcard"/>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="sitting" className="text-white">
            Third Class
          </Label>
          <Switch id="sitting"/>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="luxe" className="text-white">
            Forth Class
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
    </aside>
  )
}
