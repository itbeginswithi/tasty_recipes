import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
  isSignedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.open = action.payload;
    },
    setIsSignedIn : (state, action)=>{
      state.isSignedIn = action.payload
      }
  },
})

export const { setShowModal,setIsSignedIn} = authSlice.actions;

export default authSlice.reducer;