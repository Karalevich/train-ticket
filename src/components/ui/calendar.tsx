'use client'

import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

function Calendar({
                    className,
                    classNames,
                    showOutsideDays = true,
                    ...props
                  }: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-2',
        month: 'flex flex-col gap-4',
        month_caption: 'flex justify-center pt-1 relative items-center w-full',
        caption_label: 'text-sm font-medium',
        nav: 'z-1',
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1'
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'absolute right-1 size-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        month_grid: 'w-full border-collapse space-x-1',
        weekdays: 'flex',
        weekday:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent ' +
          '[&:has([aria-selected].range_end)]:rounded-r-md',
          props.mode === 'range'
            ? 'first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 p-0 font-normal aria-selected:opacity-100'
        ),
        range_start:
          'rounded-md aria-selected:bg-amber-500 aria-selected:text-primary-foreground',
        range_end:
          'rounded-md aria-selected:bg-amber-500 aria-selected:text-primary-foreground',
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        today: 'bg-accent text-accent-foreground',
        outside:
          'outside text-muted-foreground aria-selected:text-muted-foreground',
        disabled: 'text-muted-foreground opacity-50',
        range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({className, ...props}) => {
          if (props.orientation === 'left') {
            return <ChevronLeftIcon className={cn('size-4', className)} {...props} />;
          }
          return <ChevronRightIcon className={cn('size-4', className)} {...props} />;
        },
      }}
      {...props}
    />
  )
}

export { Calendar }
