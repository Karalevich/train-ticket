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
      <ol role="list" className="flex items-center mx-0 lg:mx-2">
        {steps.map((step) => (
          <li key={step.name} className={cn(
            'relative flex-1',
            step.id === currentStep ? '' : 'hidden sm:block',
          )}>
            <div
              className={cn(
                'flex items-center px-16 sm:px-6 lg:px-14 py-2 md:py-4 transition-all duration-200 text-white text-sm md:text-xl font-medium rounded-l-lg',
                step.id === currentStep
                  ? 'bg-gradient-to-r from-orange-500 to-amber-400'
                  : step.id < currentStep
                    ? 'bg-gradient-to-r from-orange-300 to-yellow-300'
                    : 'bg-gray-800',
              )}
              style={{
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)',
                width: step.id !== steps.length ? 'calc(100% + 16px)' : ''
              }}
            >
                    <span
                      className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-white'>
                        <span className="flex items-center justify-center">{step.id}</span>
                    </span>
              <span className='ml-1 lg:ml-4'>{step.name}</span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
