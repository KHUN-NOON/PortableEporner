import { IGetParams, ISearchParams } from "../../types/apiParams"
import apiSlice from "./apiSlice"
import Toast from 'react-native-toast-message'

const url = 'video/'

const videoApi = apiSlice.enhanceEndpoints({
    addTagTypes: ['Videos', 'Video']
})
.injectEndpoints({
    overrideExisting: true,
    endpoints: build => ({
        searchVideos: build.query<any, ISearchParams>({
            query: obj => ({
                url: url + '/search',
                method: 'GET',
                params: obj
            }),
            providesTags: ['Videos'],
            serializeQueryArgs: ({endpointName}) => {
                return endpointName
            },
            merge: (currentCache, newItems) => {
                currentCache.start = newItems?.start

                currentCache.page = newItems?.page

                currentCache?.videos?.push(...newItems?.videos)
            },
            forceRefetch: ({currentArg, previousArg}) => {
                return currentArg !== previousArg
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled
                } catch (e: any) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error Fetching Data',
                        position: 'bottom',
                        bottomOffset: 2
                    })
                }
            }
        }),
        getVideo: build.query({
            query: obj => ({
                url: url + 'id/',
                method: 'GET',
                params: obj
            }),
            providesTags: ['Video'],
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled
                } catch (e: any) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error Fetching Data',
                        position: 'bottom',
                        bottomOffset: 2
                    })
                }
            }
        }),
        getRelatedVideos: build.query({
            query: obj => ({
                url: url + '/search',
                method: 'GET',
                params: obj
            }),
            // serializeQueryArgs: ({endpointName}) => {
            //     return endpointName
            // },
            // merge: (currentCache, newItems) => {
            //     currentCache.start = newItems?.start

            //     currentCache.page = newItems?.page

            //     currentCache?.videos?.push(...newItems?.videos)
            // },
            // forceRefetch: ({currentArg, previousArg}) => {
            //     return currentArg !== previousArg
            // },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled
                } catch (e: any) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error Fetching Data',
                        position: 'bottom',
                        bottomOffset: 2
                    })
                }
            }
        })
    })
})

export const {
    useSearchVideosQuery,
    useGetVideoQuery,
    useGetRelatedVideosQuery
} = videoApi

export default videoApi