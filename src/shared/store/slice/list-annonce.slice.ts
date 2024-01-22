import { createSlice } from "@reduxjs/toolkit"

export interface ListeAnnonceState {
    scrollPosition: number
}

const initialState: ListeAnnonceState = {
    scrollPosition: 0,
}

export const listAnnonceSlice = createSlice({
    name: "list-annonce",
    initialState,
    reducers: {
        setScrollPosition: (state, action) => {
            state.scrollPosition = action.payload
        }
    }
})

export const {
    setScrollPosition
} = listAnnonceSlice.actions