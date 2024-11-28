import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nameEntered:false,
  userId:"",
  id:""
}

export const userslice = createSlice({
  name: 'score',
  
  initialState,
  reducers: {
    score: (state, action) => {
        state.user = action.payload.user
        state.nameEntered = action.payload.nameEntered  
        state.id = action.payload.id
    },
  },
})

export const { score } = userslice.actions
export default userslice.reducer;   