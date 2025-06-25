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
  const {
    date_start,
    date_end,
    have_first_class,
    have_second_class,
    have_third_class,
    have_fourth_class,
    have_wifi,
    have_express
  } = parseSearchParams(searchParams)

  const [priceRange, setPriceRange] = useState([1920, 7000])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      departure: date_start ? new Date(`${date_start}T00:00:00`) : undefined,
      return: date_end ? new Date(`${date_end}T00:00:00`) : undefined,
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('date_start', data?.departure ? data.departure.toISOString().split('T')[0] : '');
    params.set('date_end', data?.return ? data.return.toISOString().split('T')[0] : '');

    router.push(`/order?${params.toString()}`);
  }

  function onSwitchChange(value: boolean, id: string) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      params.set(id, 'true');
    } else {
      params.delete(id);
    }
    router.push(`/order?${params.toString()}`);
  }

  const filterOptions = [
    { id: 'have_first_class', label: 'First Class', defaultChecked: have_first_class || false },
    { id: 'have_second_class', label: 'Second Class', defaultChecked: have_second_class || false },
    { id: 'have_third_class', label: 'Third Class', defaultChecked: have_third_class || false },
    { id: 'have_fourth_class', label: 'Forth Class', defaultChecked: have_fourth_class || false },
    { id: 'have_wifi', label: 'Wi-Fi', defaultChecked: have_wifi || false },
    { id: 'have_express', label: 'Express', defaultChecked: have_express || false },
  ];

  return (
    <aside className="bg-gray-800 text-white p-4 rounded-md space-y-4">
      <Form {...form}>
        <form className="space-y-2 fles flex-col gap-2">
          <DatePicker form={form} disabled={disabled} onChange={form.handleSubmit(onSubmit)} label='Departure Date'
                      name='departure'/>
          <DatePicker form={form} disabled={disabled} onChange={form.handleSubmit(onSubmit)} label='Return Date'
                      name='return'/>
        </form>
      </Form>

      <div className="space-y-3 pt-2">
        {filterOptions.map(option => (
          <div className="flex items-center justify-between" key={option.id}>
            <Label htmlFor={option.id} className="text-white">
              {option.label}
            </Label>
            <Switch id={option.id} checked={option.defaultChecked}
                    onCheckedChange={(value) => onSwitchChange(value, option.id)}/>
          </div>
        ))}
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
