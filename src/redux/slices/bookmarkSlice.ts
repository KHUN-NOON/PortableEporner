import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface IPayload {
    id: string,
    title: string,
    thumbnail: string,
}

const initialState: { bookmarks: IPayload[] } = {
    bookmarks: []
}

const bookmarkSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        addnewbookmark: (state, action: PayloadAction<IPayload>) => {
            const bms = state.bookmarks

            const find = bms.find(item => item.id === action.payload.id)

            if (find) {
                return 
            }

            state.bookmarks = [...bms, action.payload]
        },
        removebookmark: (state, action) => {

        },
        removeallbookmarks: (state) => {
            state.bookmarks = []
        }
    }
})

export const {
    addnewbookmark,
    removebookmark,
    removeallbookmarks
} = bookmarkSlice.actions

export const selectBookmarks = (state: RootState) => state.bookmarks

export default bookmarkSlice.reducer