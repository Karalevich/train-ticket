'use client'

import { Button } from '@/components/ui/button';
import Search from '@/components/ui/search';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { DatePicker } from '@/components/ui/datePicker';
import { useRouter, useSearchParams } from 'next/navigation';
import { CityInterface } from '@/features/ticket/types';
import { disabled } from '@/lib/utils';
import { parseSearchParams } from '@/lib/api';

const citiesEndpoint = 'https://students.netoservices.ru/fe-diplom/routes/cities?name=';

const FormSchema = z.object({
  from: z.string().min(2, 'Required least 2 characters'),
  to: z.string().min(2, 'Required least 2 characters'),
  departure: z.optional(z.date()),
  return: z.optional(z.date()),
  departureCity: z.optional(z.custom<CityInterface>()),
  returnCity: z.optional(z.custom<CityInterface>()),
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

export default function HeroSection() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const {
    date_start,
    date_end,
    from_city_name,
    to_city_name,
    from_city_id,
    to_city_id
  } = parseSearchParams(searchParams)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      from: from_city_name || '',
      to: to_city_name || '',
      departureCity: { name: from_city_name, _id: from_city_id },
      returnCity: { name: to_city_name, _id: to_city_id },
      departure: date_start ? new Date(`${date_start}T00:00:00`) : undefined,
      return: date_end ? new Date(`${date_end}T00:00:00`) : undefined,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const filters = {
      from_city_id: data?.departureCity?._id || '',
      to_city_id: data?.returnCity?._id || '',
      from_city_name: data?.departureCity?.name || '',
      to_city_name: data?.returnCity?.name || '',
      date_start: data?.departure ? data.departure.toISOString().split('T')[0] : undefined,
      date_end: data?.return ? data.return.toISOString().split('T')[0] : undefined,
      limit: 5,
    };

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value as string);
    })
    router.push(`/order/tickets?${params.toString()}`);
  }

  return (
    <section
      className="bg-[url('@/assets/images/hero-section.png')]
      bg-cover bg-center -mt-20 mx-auto px-2 lg:px-16 items-center grid md:grid-cols-[1fr_1.5fr] lg:justify-items-end"
    >
      <h1 className="text-6xl font-bold mb-8 mt-52 md:mb-52 md:mt-64 text-white">
        All Live -<br/>
        <span className="text-amber-200">just Traveling!</span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
              className="bg-black/30 backdrop-blur-sm p-6 lg:w-[40vw] max-w-[700px] rounded-lg self-end justify-end space-y-8 ">
          <div>
            <div className="grid sm:grid-cols-2 gap-2 items-end">
              <Search form={form} apiEndpoint={citiesEndpoint} placeholder='From'
                      name='from' label='Direction' minSearchLength={2} fullDataName='departureCity'/>
              <Search form={form} apiEndpoint={citiesEndpoint} placeholder='To'
                      name='to' minSearchLength={2} fullDataName='returnCity'/>
            </div>
          </div>
          <div>
            <div className="grid sm:grid-cols-2 gap-2">
              <DatePicker form={form} disabled={disabled} label='Departure' name='departure'/>
              <DatePicker form={form} disabled={disabled} label='Return' name='return'/>
            </div>

          </div>
          <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3">
            FIND TICKETS
          </Button>
        </form>
      </Form>
    </section>
  )
}