import { configureStore } from '@reduxjs/toolkit'
import ticketSlice from '@/features/ticket/ticketSlice'
import routeSlice from '@/features/route/routeSlice';

export const store = configureStore({
  reducer: {
    tickets: ticketSlice,
    route: routeSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
