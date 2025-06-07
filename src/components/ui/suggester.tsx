'use client'

import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'


export interface ItemInterface {
  _id: number
  name: string
}

export interface SuggesterProps {
  searchList: ItemInterface[]
  isLoading: boolean
  error: string | null
  onItemClickAction: (value: string) => void
}

export default function Suggester({
                                    searchList,
                                    isLoading,
                                    error,
                                    onItemClickAction
                                  }: SuggesterProps) {


  const handleItemClick = (item: ItemInterface) => {
    onItemClickAction(item.name)
  }

  return (
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
              onClick={() => handleItemClick(item)}
              type="button"
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors"
            >
              <div className="font-medium">{item.name}</div>
            </button>
          ))}
      </div>
    </Card>
  )
}