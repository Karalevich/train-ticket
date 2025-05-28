'use client'

import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { increment, decrement, fetchDate } from '@/features/counter/counterSlice'

export default function Counter() {
  const { value, date, loading, error } = useSelector((state: RootState) => state.counter)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <p>Count: {value}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>

      <div className="mt-4">
        <button onClick={() => dispatch(fetchDate())}>
          {loading ? 'Fetching date...' : 'Fetch Date'}
        </button>
        {date && <p>Server Date: {date.toString()}</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
    </div>
  )
}
