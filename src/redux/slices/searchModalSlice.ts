import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store/store"

const initialState: { visible: boolean, searchValue: string, recentSearches: string[] } = {
    visible: false,
    searchValue: '',
    recentSearches: []
}

const searchModalSlice = createSlice({
    name: 'searchModal',
    initialState,
    reducers: {
        searchModalVisible: (state) => {
            state.visible = true
        },
        searchModalHidden: (state) => {
            state.visible = false
        },
        searchValueChange: (state, action) => {
            state.searchValue = action.payload
        },
        clearSearchValue: (state) => {
            state.searchValue = ''
        },
        pushToRecentSearches: (state, action) => {
            if ( state.recentSearches.length > 20 ) {
                state.recentSearches.shift()
            } 

            if ( state.recentSearches.includes(action.payload)) {
                return
            }

            const new_arr = [...state.recentSearches, action.payload]

            state.recentSearches = new_arr
        },
        rmFromRecentSearches: (state, action) => {
            const rm_val = state.recentSearches.indexOf(action.payload)

            state.recentSearches.splice(rm_val, 1)
        }
    }
})

export const {
    searchModalHidden,
    searchModalVisible,
    searchValueChange,
    clearSearchValue,
    pushToRecentSearches,
    rmFromRecentSearches
} = searchModalSlice.actions

export const selectSearchModalState = (state: RootState) => state.searchModal

export default searchModalSlice.reducer