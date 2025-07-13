'use client'

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export default function PassengerSelection() {
  const [passengers, setPassengers] = useState({
    adults: 0,
    children: 0,
    babies: 0,
  })

  const updatePassengerCount = (type: keyof typeof passengers, increment: boolean) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (increment ? 1 : -1)),
    }))
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Specify Passengers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="font-medium">Adults</div>
            <div className="text-sm text-muted-foreground">and children over 10 years</div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updatePassengerCount('adults', false)}
                disabled={passengers.adults <= 0}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-medium">{passengers.adults}</span>
              <Button variant="outline" size="sm" onClick={() => updatePassengerCount('adults', true)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-medium">Children up to 10 years</div>
            <div className="text-sm text-muted-foreground">with seat, cheaper</div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updatePassengerCount('children', false)}
                disabled={passengers.children <= 0}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-medium">{passengers.children}</span>
              <Button variant="outline" size="sm" onClick={() => updatePassengerCount('children', true)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-medium">Babies up to 5 years</div>
            <div className="text-sm text-muted-foreground">no seat, free</div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updatePassengerCount('babies', false)}
                disabled={passengers.babies <= 0}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-medium">{passengers.babies}</span>
              <Button variant="outline" size="sm" onClick={() => updatePassengerCount('babies', true)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
}