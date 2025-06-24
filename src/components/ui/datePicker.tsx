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
import { BaseSyntheticEvent } from 'react';

interface DatePickerProps {
  form: any
  label?: string
  disabled?: Matcher | Matcher[] | undefined
  name: string,
  onChange?: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

export function DatePicker({ form, label, disabled, name, onChange }: DatePickerProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return <DatePickerField label={label} field={field} disabled={disabled} onChange={onChange}/>
      }}
    />
  )
}

interface DatePickerFieldProps {
  label?: string
  field: any
  disabled?: Matcher | Matcher[] | undefined
  onChange?: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>

}

export function DatePickerField({ label, field, disabled, onChange }: DatePickerFieldProps) {
  return (
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
            onSelect={(date: any) => {
              field.onChange(date);
              if (typeof onChange === 'function') {
                onChange(date);
              }
            }}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
      <FormMessage className="absolute -bottom-6"/>
    </FormItem>
  )
}