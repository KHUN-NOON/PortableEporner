import { createSlice } from "@reduxjs/toolkit"
import { ISearchParams } from "../../types/apiParams"
import { RootState } from "../../store/store"

const initialSearchParams: ISearchParams = {
    query: 'all',
    per_page: 10,
    page: 1,
    thumbsize: 'medium',
    order: 'latest',
    gay: 0,
    lq: 1,
    format: 'json'
}

const searchParamSlice = createSlice({
    name: 'search_params',
    initialState: initialSearchParams,
    reducers: {
        querychange: (state, action) => {
            state.query = action.payload?.query
        },
        pagechange: (state, action) => {
            state.page = action.payload?.page
        },
        orderchange: (state, action) => {
            state.order = action.payload?.order
        },
        resetparams: () => {
            return initialSearchParams
        }
    }
})

export const { querychange, pagechange, orderchange, resetparams } = searchParamSlice.actions 

export const selectSearchParams = (state: RootState) => state.searchParams

export default searchParamSlice.reducer