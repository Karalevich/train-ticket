'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { DatePicker } from '@/components/ui/datePicker';
import { disabled } from '@/lib/utils';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseSearchParams } from '@/lib/api';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
    have_express,
    price_from,
    price_to,
    start_departure_hour_from,
    start_departure_hour_to,
    start_arrival_hour_from,
    start_arrival_hour_to,
    end_departure_hour_from,
    end_departure_hour_to,
    end_arrival_hour_from,
    end_arrival_hour_to,
  } = parseSearchParams(searchParams)

  const [price, setPrice] = useState([price_from || 500, price_to || 7000])
  const [thereDeparture, setThereDeparture] = useState([start_departure_hour_from || 0, start_departure_hour_to || 24])
  const [backDeparture, setBackDeparture] = useState([start_arrival_hour_from || 0, start_arrival_hour_to || 24])
  const [thereArrival, setThereArrival] = useState([end_departure_hour_from || 0, end_departure_hour_to || 24])
  const [backArrival, setBackArrival] = useState([end_arrival_hour_from || 0, end_arrival_hour_to || 24])
  const [filterOptions, setFilterOptions] = useState([
    { id: 'have_first_class', label: 'First Class', defaultChecked: have_first_class || false },
    { id: 'have_second_class', label: 'Second Class', defaultChecked: have_second_class || false },
    { id: 'have_third_class', label: 'Third Class', defaultChecked: have_third_class || false },
    { id: 'have_fourth_class', label: 'Forth Class', defaultChecked: have_fourth_class || false },
    { id: 'have_wifi', label: 'Wi-Fi', defaultChecked: have_wifi || false },
    { id: 'have_express', label: 'Express', defaultChecked: have_express || false },
  ])

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

    router.push(`/order/tickets?${params.toString()}`);
  }

  function setPriceRange(range: number[]) {
    updateParams('price_from', range[0], 'price_to', range[1]);
  }

  function setThereDepartureRange(range: number[]) {
    updateParams('start_departure_hour_from', range[0], 'start_departure_hour_to', range[1]);
  }

  function setThereArrivalRange(range: number[]) {
    updateParams('start_arrival_hour_from', range[0], 'start_arrival_hour_to', range[1]);
  }

  function setBackDepartureRange(range: number[]) {
    updateParams('end_departure_hour_from', range[0], 'end_departure_hour_to', range[1]);
  }

  function setBackArrivalRange(range: number[]) {
    updateParams('end_arrival_hour_from', range[0], 'end_arrival_hour_to', range[1]);
  }

  function updateParams(key1: string, value1: number, key2: string, value2: number) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set(key1, value1.toString());
    params.set(key2, value2.toString());
    params.delete('offset'); // Reset offset to avoid stale data
    router.push(`/order/tickets?${params.toString()}`);
  }

  function onSwitchChange(value: boolean, id: string) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      params.set(id, 'true');
    } else {
      params.delete(id);
    }
    setFilterOptions(prev => prev.map(option => option.id === id ? { ...option, defaultChecked: value } : option));
    router.push(`/order/tickets?${params.toString()}`)
  }


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

      <Separator/>

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

      <Separator/>

      <div className="pt-2">
        <h3 className="text-lg font-medium mb-2">Price range</h3>
        <div className="flex justify-between text-sm">
          <span>Min</span>
          <span>Max</span>
        </div>
        <Slider
          defaultValue={[500, 7000]}
          max={7000}
          min={500}
          step={100}
          value={price}
          onValueChange={setPrice}
          onValueCommit={setPriceRange}
          className="py-2"
        />
        <div className="flex justify-between text-xs">
          <span>{price[0]}$</span>
          <span>{price[1]}$</span>
        </div>
      </div>

      <Separator/>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-medium py-2">There</AccordionTrigger>
          <AccordionContent>
            <div className="mb-2">
              <span className="flex justify-between text-sm">Departure time</span>
              <Slider
                defaultValue={[0, 24]}
                max={24}
                min={0}
                step={1}
                value={thereDeparture}
                onValueChange={setThereDeparture}
                onValueCommit={setThereDepartureRange}
                className="py-2"
              />
              <div className="flex justify-between text-xs">
                <span>{thereDeparture[0]}:00</span>
                <span>{thereDeparture[1]}:00</span>
              </div>
            </div>

            <div className="mb-2">
              <span className="flex justify-between text-sm">Arrival time</span>
              <Slider
                defaultValue={[0, 24]}
                max={24}
                min={0}
                step={1}
                value={thereArrival}
                onValueChange={setThereArrival}
                onValueCommit={setThereArrivalRange}
                className="py-2"
              />
              <div className="flex justify-between text-xs">
                <span>{thereArrival[0]}:00</span>
                <span>{thereArrival[1]}:00</span>
              </div>
            </div>

          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator/>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-medium py-2">Back</AccordionTrigger>
          <AccordionContent>
            <div className="mb-2">
              <span className="flex justify-between text-sm">Departure time</span>
              <Slider
                defaultValue={[0, 24]}
                max={24}
                min={0}
                step={1}
                value={backDeparture}
                onValueChange={setBackDeparture}
                onValueCommit={setBackDepartureRange}
                className="py-2"
              />
              <div className="flex justify-between text-xs">
                <span>{backDeparture[0]}:00</span>
                <span>{backDeparture[1]}:00</span>
              </div>
            </div>

            <div className="mb-2">
              <span className="flex justify-between text-sm">Arrival time</span>
              <Slider
                defaultValue={[0, 24]}
                max={24}
                min={0}
                step={1}
                value={backArrival}
                onValueChange={setBackArrival}
                onValueCommit={setBackArrivalRange}
                className="py-2"
              />
              <div className="flex justify-between text-xs">
                <span>{backArrival[0]}:00</span>
                <span>{backArrival[1]}:00</span>
              </div>
            </div>

          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </aside>
  )
}
