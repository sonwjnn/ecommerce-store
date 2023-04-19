import { createSlice } from '@reduxjs/toolkit'

export const filterStateSlice = createSlice({
  name: 'Filter State',
  initialState: {
    filterState: null
  },
  reducers: {
    setFilterState: (state, action) => {
      state.filterState = action.payload
    }
  }
})

export const { setFilterState } = filterStateSlice.actions
export default filterStateSlice.reducer
