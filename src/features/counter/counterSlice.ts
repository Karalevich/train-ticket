import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchDate = createAsyncThunk('counter/fetchDate', async () => {
  const res = await fetch('https://students.netoservices.ru/fe-diplom/routes/cities?name=мос')
  const data = await res.json()
  return JSON.stringify(data) // or extract any other field
})

const initialState = {
  value: 0,
  date: '',
  loading: false,
  error: null as string | null,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDate.fulfilled, (state, action) => {
        state.loading = false
        state.date = action.payload
      })
      .addCase(fetchDate.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch date'
      })
  }
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
