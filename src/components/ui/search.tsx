'use client'

import React, { useRef } from 'react'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { debounce } from '@/lib/utils';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Suggester, { ItemInterface } from '@/components/ui/suggester';

export interface SearchProps {
  form: any
  placeholder?: string
  apiEndpoint?: string
  disabled?: boolean
  name: string
  label?: string
  minSearchLength: number
  fullDataName: string
}

export default function Search({
                                 placeholder = 'Search...',
                                 apiEndpoint,
                                 disabled = false,
                                 form,
                                 name,
                                 label,
                                 minSearchLength,
                                 fullDataName
                               }: SearchProps) {
  const [searchList, setSearchList] = useState<ItemInterface[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isValueSelected = useRef(false)

  const [debounced] = debounce(async (searchTerm: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${apiEndpoint}${encodeURIComponent(searchTerm)}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setSearchList(data.cities || data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cities')
      setSearchList([])
    } finally {
      setIsLoading(false)
    }
  }, 300)

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: string) => void
  ) {
    const newValue = e.target.value
    fieldOnChange(newValue)
    setIsOpen(true)

    if (!newValue.trim() || newValue.length < minSearchLength) {
      setSearchList([])
      setIsLoading(false)
      setError(null)
      return
    }

    debounced(newValue.trim())
  }

  function handleInputFocus() {
    if (searchList.length > 0) {
      setIsOpen(true)
    }
  }

  function handleInputBlur(fieldOnChange: (...event: any[]) => void) {
    if (!isValueSelected.current) {
      setSearchList([])
      fieldOnChange('') // Clear the input if no value is selected
    }
    setIsOpen(false)
    isValueSelected.current = false
  }

  function handleItemClick(fieldOnChange: (...event: any[]) => void) {
    return (selectedValue: ItemInterface) => {
      fieldOnChange(selectedValue.name)
      isValueSelected.current = true
      setIsOpen(false)
      setSearchList([])

      form.setValue(fullDataName, selectedValue);
    }
  }

  const shouldShowDropdown = isOpen && (searchList.length > 0 || isLoading || error)

  return (
    <div className="relative">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <>
            <FormItem>
              {label && <FormLabel className="text-white">{label}</FormLabel>}
              <FormControl>
                <Input
                  type="text"
                  value={field.value}
                  onChange={(e) => handleInputChange(e, field.onChange)}
                  onFocus={handleInputFocus}
                  onBlur={() => handleInputBlur(field.onChange)}
                  placeholder={placeholder}
                  disabled={disabled}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage className="absolute -bottom-6"/>
            </FormItem>

            {shouldShowDropdown &&
              <Suggester searchList={searchList} isLoading={isLoading} error={error}
                         onItemClickAction={handleItemClick(field.onChange)}/>
            }
          </>
        )}
      />
    </div>
  )
}