'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { debounce } from '@/lib/utils';

export interface ItemInterface {
  _id: number
  name: string
}

export interface SearchProps {
  value: string
  onChangeAction: (value: string) => void
  onItemSelect?: (item: ItemInterface) => void
  placeholder?: string
  apiEndpoint?: string
  disabled?: boolean
}

const minSearchLength = 1

export default function Search({
                                 value,
                                 onChangeAction,
                                 onItemSelect,
                                 placeholder = 'Search...',
                                 apiEndpoint,
                                 disabled = false,
                               }: SearchProps) {
  const [searchList, setSearchList] = useState<ItemInterface[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    if (!value.trim() || value.length < minSearchLength) {
      setSearchList([])
      setIsLoading(false)
      setError(null)
      return
    }

    const [debounced, cancel] = debounce(async (searchTerm: string) => {
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

    debounced(value.trim())

    return () => {
      cancel()
    }

  }, [value, apiEndpoint])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChangeAction(newValue)
    setIsOpen(true)
  }

  const handleCitySelect = (city: ItemInterface) => {
    onChangeAction(city.name)
    onItemSelect?.(city)
    setIsOpen(false)
  }

  const handleInputFocus = () => {
    if (searchList.length > 0 || value.length >= minSearchLength) {
      setIsOpen(true)
    }
  }

  const handleInputBlur = () => {
    // Delay closing to allow for city selection
    setTimeout(() => setIsOpen(false), 150)
  }

  const shouldShowDropdown = isOpen && (searchList.length > 0 || isLoading || error)

  return (
    <div className="relative">
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        showErrorIcon={true}
        className="bg-white"
      />

      {shouldShowDropdown && (
        <Card
          className="absolute left-0 right-0 z-10 mt-1 border border-gray-300 rounded-none bg-white max-h-64 overflow-y-auto py-0">
          <div className="">
            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin mr-2"/>
                <span className="text-sm text-gray-500">Search...</span>
              </div>
            )}

            {error && <div className="px-4 py-3 text-sm text-red-600">Error: {error}</div>}

            {!isLoading &&
              searchList.map((item, index) => (
                <button
                  key={item._id || index}
                  onClick={() => handleCitySelect(item)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors"
                >
                  <div className="font-medium">{item.name}</div>
                </button>
              ))}
          </div>
        </Card>
      )}
    </div>
  )
}