import { Check, CreditCard, User, Ticket, FileCheck } from 'lucide-react'
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
    <div className="bg-white border-b">
      <div className="container mx-auto">
        <nav aria-label="Progress" className="relative">
          <ol role="list" className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className={cn(stepIdx !== steps.length - 1 ? 'flex-1' : '', 'relative')}>
                <div
                  className={cn(
                    'group flex items-center',
                    stepIdx !== steps.length - 1
                      ? 'after:absolute after:right-0 after:top-1/2 after:h-0.5 after:w-full after:-translate-y-1/2 after:bg-gray-200'
                      : '',
                  )}
                >
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span
                      className={cn(
                        'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
                        step.id < currentStep
                          ? 'bg-primary text-white'
                          : step.id === currentStep
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-200 text-gray-500',
                      )}
                    >
                      {step.id < currentStep ? (
                        <Check className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <span className="flex items-center justify-center">{step.id}</span>
                      )}
                    </span>
                    <span
                      className={cn(
                        'ml-4 text-sm font-medium',
                        step.id === currentStep
                          ? 'text-orange-500'
                          : step.id < currentStep
                            ? 'text-primary'
                            : 'text-gray-500',
                      )}
                    >
                      {step.name}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}
