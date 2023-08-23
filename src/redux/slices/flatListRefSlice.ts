import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store/store"

export const flatListRefState = {
    scrollToTop: false
}

const flatListRefSlice = createSlice({
    name: 'flatListRef',
    initialState: flatListRefState,
    reducers: {
        loadFlatListRef: (state, action) => {
            state.scrollToTop = action.payload
        },
        clearFlatListRef: () => {
            return flatListRefState
        }
    }
})

export const {
    loadFlatListRef,
    clearFlatListRef
} = flatListRefSlice.actions

export const selectFlatListRef = (state: RootState) => state.flatListRef

export default flatListRefSlice.reducer