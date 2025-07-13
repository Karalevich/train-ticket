import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export default function TotalPrice({ price }: { price: number }) {
  const selectedSeats = useSelector((state: RootState) => state.seats.selectedSeats);
  return (
    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="font-semibold text-green-800">Selected seats: {selectedSeats.join(', ')}</div>
      <div className="text-sm text-green-600 mt-1">
        Total cost: {selectedSeats.length * price} $
      </div>
    </div>
  )
}