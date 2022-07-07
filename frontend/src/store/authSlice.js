<<<<<<< HEAD
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

=======
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalIsOpen: false,
    isSignedIn: false,
    signupForm: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setModalIsOpen: (state, action) => {
            state.modalIsOpen = action.payload
        },
        setIsSignedIn: (state, action) => { 
            state.isSignedIn = action.payload
        },
        setSignupForm: (state, action) => {
            state.signupForm = action.payload
        }
    }
})

export const { setModalIsOpen, setIsSignedIn, setSignupForm } = authSlice.actions;
>>>>>>> f940dcf79733de21b0438a1d07223bc26e408e93
export default authSlice.reducer;