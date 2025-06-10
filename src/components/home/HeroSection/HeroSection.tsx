'use client'

import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { setDate, setDepartureCity, setReturnCity } from '@/features/ticket/ticketSlice';
import { addDays } from 'date-fns';
import Search from '@/components/ui/search';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { DatePicker } from '@/components/ui/datePicker';

const citiesEndpoint = 'https://students.netoservices.ru/fe-diplom/routes/cities?name=';

const FormSchema = z.object({
  from: z.string().min(2, 'Required least 2 characters'),
  to: z.string().min(2, 'Required least 2 characters'),
  departure: z.optional(z.date()),
  return: z.optional(z.date()),
  departureCity: z.any().optional(),
  returnCity: z.any().optional(),

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
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      from: '',
      to: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('Form submitted', data);

    const serializedDate = {
      from: JSON.stringify(data?.departure || ''),
      to: JSON.stringify(data?.return || ''),
    }

    dispatch(setDate(serializedDate));
    dispatch(setDepartureCity(data.departureCity));
    dispatch(setReturnCity(data.returnCity));
  }

  function disabled(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date < today || date > addDays(today, 90);
  }

  return (
    <section
      className="bg-[url('@/assets/images/hero-section.png')]
      bg-cover bg-center -mt-20 mx-auto px-2 lg:px-16 items-center grid md:grid-cols-[1fr_1.5fr] gap-2 lg:gap-8 w-full"
    >
      <h1 className="text-6xl font-bold mb-8 mt-52 md:mb-52 md:mt-64 text-white">
        All Live -<br/>
        <span className="text-amber-200">just Traveling!</span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
              className="bg-black/30 backdrop-blur-sm p-6 rounded-lg self-end space-y-8">
          <div>
            <div className="grid sm:grid-cols-2 gap-2 items-end">
              <Search form={form} apiEndpoint={citiesEndpoint} placeholder='From'
                      name='from' label='Direction' minSearchLength={2} fullDataName='departureCity'/>
              <Search form={form} apiEndpoint={citiesEndpoint} placeholder={'To'}
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