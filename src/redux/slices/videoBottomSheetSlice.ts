import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store/store"

const initialState = {
    isOpen: false
}

const videoBottomSheetSlice = createSlice({
    name: 'videoBottomSheet',
    initialState,
    reducers: {
        openvideobottomsheet: (state) => {
            state.isOpen = true
        },
        closevideobottomsheet: (state) => {
            state.isOpen = false
        }
    }
})

export const {
    openvideobottomsheet,
    closevideobottomsheet
} = videoBottomSheetSlice.actions

export const selectVideoBottomSheetState = (state: RootState) => state.videoBottomSheet

export default videoBottomSheetSlice.reducer