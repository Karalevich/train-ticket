import { CreditCard, User, Ticket, FileCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BookingStepperProps {
  currentStep: number
}

export default function BookingStepper({ currentStep }: BookingStepperProps) {
  const steps = [
    { id: 1, name: 'Tickets', icon: Ticket },
    { id: 2, name: 'Passengers', icon: User },
    { id: 3, name: 'Payment', icon: CreditCard },
    { id: 4, name: 'Verification', icon: FileCheck },
  ]

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center mx-6">
        {steps.map((step) => (
          <li key={step.name} className='flex-1'>
            <div
              className={cn(
                'relative flex items-center px-14 py-4 transition-all duration-200 text-white rounded-l-lg',
                step.id === currentStep
                  ? 'bg-gradient-to-r from-orange-500 to-amber-400'
                  : step.id < currentStep
                    ? 'bg-gradient-to-r from-orange-300 to-yellow-300'
                    : 'bg-gray-800',
              )}
              style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)' }}
            >
                    <span
                      className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-white'>
                        <span className="text-xl flex items-center justify-center">{step.id}</span>
                    </span>
              <span className='ml-4 text-xl font-medium'>{step.name}</span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
