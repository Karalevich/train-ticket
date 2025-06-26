import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit'
import TicketStateInterface from '@/features/ticket/types';


// export const fetchDate = createAsyncThunk('ticket/fetchDate', async () => {
//   const res = await fetch('https://students.netoservices.ru/fe-diplom/routes/cities?name=мос')
//   return await res.json() // or extract any other field
// })

const initialState: TicketStateInterface = {
  totalCount: 0,
}

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTotalCount: (state, action: {payload: number}) => {
      state.totalCount = action.payload
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchDate.pending, (state) => {
  //       state.loading = true
  //       state.error = null
  //     })
  //     .addCase(fetchDate.rejected, (state, action) => {
  //       state.loading = false
  //       state.error = action.error.message || 'Failed to fetch date'
  //     })
  //     .addMatcher(isPending, (state) => {
  //       state.loading = true
  //       state.error = null
  //     })
  //     .addMatcher(isRejected, (state, action) => {
  //       state.loading = false
  //       state.error = action.error.message || 'Request failed'
  //     })
  // }
})

export const { setTotalCount } = ticketSlice.actions
export default ticketSlice.reducer
