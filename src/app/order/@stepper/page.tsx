import { CreditCard, User, Ticket, FileCheck } from 'lucide-react'
import { TicketFilters } from '@/lib/api';
import BookingStepper from '@/components/order/BookingStepper/BookingStepper';

export default async function BookingStepperSlot({ searchParams }: {searchParams: TicketFilters}) {
  const filters = await searchParams
  console.log('BookingStepper filts:', filters)
  const steps = [
    { id: 1, name: 'Tickets', icon: Ticket },
    { id: 2, name: 'Passengers', icon: User },
    { id: 3, name: 'Payment', icon: CreditCard },
    { id: 4, name: 'Verification', icon: FileCheck },
  ]
  const currentStep = 1

  return (
    <BookingStepper currentStep={currentStep}/>
  )
}
