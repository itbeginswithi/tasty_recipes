import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open1: false,
  isSignedIn: false,
}

export const authenSlice1 = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setShowModal1: (state, action) => {
      state.open1 = action.payload;
    },
    setIsSignedIn : (state, action)=>{
      state.isSignedIn = action.payload
      }
   
  },
})

export const { setShowModal1,setIsSignedIn} = authenSlice1.actions;

export default authenSlice1.reducer;