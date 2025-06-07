'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/ui/dataRangePicker';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { setDate } from '@/features/ticket/ticketSlice';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import Search from '@/components/ui/search';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';

const FormSchema = z.object({
  from: z.string().min(2, {
    message: 'Required at field',
  }),
  to: z.string().min(2, {
    message: 'Required at field',
  }),
})


export default function HeroSection() {
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      from: '',
      to: '',
    },
  })

  const [date, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })


  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('Form submitted', data);
  }

  function handleSetDate(dateRange: DateRange | undefined) {
    setDateRange(dateRange);

    const serializedDate = {
      from: JSON.stringify(dateRange?.from || ''),
      to: JSON.stringify(dateRange?.to || ''),
    }
    dispatch(setDate(serializedDate));
  }

  return (
    <section
      className="bg-[url('@/assets/images/hero-section.png')]
      bg-cover bg-center -mt-20 mx-auto px-16  items-center grid md:grid-cols-2 gap-8 w-full"
    >
      <h1 className="text-6xl font-bold mb-8 mt-52 md:mb-52 md:mt-64 text-white">
        All Live -<br/>
        <span className="text-amber-200">just Traveling!</span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
              className="bg-black/30 backdrop-blur-sm p-6 rounded-lg self-end space-y-8">
          <div>
            <div className="grid grid-cols-2 gap-2">
              <Search form={form}
                      apiEndpoint={'https://students.netoservices.ru/fe-diplom/routes/cities?name='}
                      placeholder='From' name='from' label='Direction'/>
              <Search form={form}
                      apiEndpoint={'https://students.netoservices.ru/fe-diplom/routes/cities?name='}
                      placeholder={'To'} name='to' label='Direction'/>
            </div>
          </div>
          <div>
            <label className="text-white text-sm mb-2 block">Date</label>
            <div className="grid grid-cols-2 gap-2">
              <DatePickerWithRange date={date} setDateAction={handleSetDate}/>
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