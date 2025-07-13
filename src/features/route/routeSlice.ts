import { createSlice, } from '@reduxjs/toolkit'
import RouteStateInterface from '@/features/route/types';
import { ArrivalDepartureInfo } from '@/lib/api';

const initialState: RouteStateInterface = {
  departure: null,
  arrival: null,
}

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setDeparture: (state, action: { payload: ArrivalDepartureInfo }) => {
      state.departure = action.payload
    },
    setArrival: (state, action: { payload: ArrivalDepartureInfo }) => {
      state.arrival = action.payload
    },
  },
})

export const { setDeparture, setArrival } = routeSlice.actions
export default routeSlice.reducer
