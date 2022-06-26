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
export default authSlice.reducer;