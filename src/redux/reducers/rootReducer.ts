import apiSlice from "../slices/apiSlice"
import searchParamSlice from "../slices/searchParamSlice"
import flatListRefSlice from "../slices/flatListRefSlice"
import searchModalSlice from "../slices/searchModalSlice"
import { combineReducers } from "@reduxjs/toolkit"
import videoBottomSheetSlice from "../slices/videoBottomSheetSlice"
import bookmarkSlice from "../slices/bookmarkSlice"

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    searchParams: searchParamSlice,
    flatListRef: flatListRefSlice,
    searchModal: searchModalSlice,
    videoBottomSheet: videoBottomSheetSlice,
    bookmarks: bookmarkSlice
})

export default rootReducer