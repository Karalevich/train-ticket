'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import * as React from 'react';
import { Matcher } from 'react-day-picker';

interface DatePickerProps {
  form: any
  label?: string
  disabled?: Matcher | Matcher[] | undefined
  name: string
}

export function DatePicker({ form, label, disabled, name }: DatePickerProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col relative">
          {label && <FormLabel className="text-white">{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='secondary'
                  className={cn(
                    'w-auto justify-start text-left font-normal',
                    !!field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={disabled}
              />
            </PopoverContent>
          </Popover>
          <FormMessage className="absolute -bottom-6"/>
        </FormItem>
      )}
    />
  )
}
