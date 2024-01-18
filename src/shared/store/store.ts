import { configureStore } from "@reduxjs/toolkit";
import { listAnnonceSlice } from "./slice/list-annonce.slice";

export const store = configureStore({
    reducer: {
        listAnnonceReducer: listAnnonceSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;