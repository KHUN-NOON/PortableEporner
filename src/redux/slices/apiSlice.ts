import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { baseUrl } from "../../constants/endpoint"

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
        return headers
    }
})

const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: () => ({})  
})

export default apiSlice