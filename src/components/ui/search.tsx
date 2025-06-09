'use client'

import type React from 'react'

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
}

const minSearchLength = 1

export default function Search({
                                 placeholder = 'Search...',
                                 apiEndpoint,
                                 disabled = false,
                                 form,
                                 name,
                                 label
                               }: SearchProps) {
  const [searchList, setSearchList] = useState<ItemInterface[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: string) => void
  ) => {
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

  const handleInputFocus = () => {
    if (searchList.length > 0) {
      setIsOpen(true)
    }
  }

  const handleInputBlur = () => {
    setTimeout(() => setIsOpen(false), 150)
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
                  onBlur={handleInputBlur}
                  placeholder={placeholder}
                  disabled={disabled}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage className="absolute -bottom-6"/>
            </FormItem>

            {shouldShowDropdown &&
              <Suggester searchList={searchList} isLoading={isLoading} error={error}
                         onItemClickAction={field.onChange}/>
            }
          </>
        )}
      />
    </div>
  )
}