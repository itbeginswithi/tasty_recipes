import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isOpen: false
}; 

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setSidebarIsOpen: (state, action) => {
            state.isOpen = action.payload;
        },
        toggleSidebarIsOpen: (state) => {
            state.isOpen = !state.isOpen;
        }
    },
})

export const { setSidebarIsOpen, toggleSidebarIsOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;