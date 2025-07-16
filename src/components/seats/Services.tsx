'use client'

import { useState } from 'react'
import { Snowflake, Wifi, Sheet } from 'lucide-react'

export default function Services({
                                   cooling,
                                   wifi,
                                   sheets,
                                   toggleService
                                 }: {
  cooling?: boolean,
  wifi?: boolean,
  sheets?: boolean,
  toggleService?: (service: string) => void
}) {
  const [checkedItems, setCheckedItems] = useState({
    cooling: cooling,
    wifi: wifi,
    sheets: sheets
  })

  const toggleItem = (item: keyof typeof checkedItems) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }))

  }

  const iconItems = [
    {
      id: 'cooling',
      icon: Snowflake,
      label: 'Air Conditioning',
      checked: checkedItems.cooling,
    },
    {
      id: 'wifi',
      icon: Wifi,
      label: 'WiFi',
      checked: checkedItems.wifi,
    },
    {
      id: 'sheets',
      icon: Sheet,
      label: 'Sheets',
      checked: checkedItems.sheets,
    }
  ]

  return (
    <div className="flex justify-center">
      <div className="flex gap-2">
        {iconItems.map((item) => {
          const IconComponent = item.icon
          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id as keyof typeof checkedItems)}
              className={`
                relative w-8 h-8 rounded-sm border-1 transition-all duration-200 
                flex items-center justify-center group
                ${
                item.checked
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'bg-white border-gray-500 text-gray-600 hover:border-gray-700'
              }
                hover:scale-105 active:scale-95
              `}
              aria-label={`Toggle ${item.label}`}
              title={item.label}
            >
              <IconComponent
                className={`w-4 h-4 transition-all duration-200 ${
                  item.checked ? 'scale-110' : 'group-hover:scale-105'
                }`}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
