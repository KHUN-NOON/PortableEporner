import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { persistStore, persistReducer } from 'redux-persist'
import persistConfig from './persistStore'
import rootReducer from '../redux/reducers/rootReducer'
import apiSlice from '../redux/slices/apiSlice'

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(apiSlice.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)

export default store

