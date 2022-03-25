import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../slices/AppSlice'
import mainReducer from '../slices/mainReducer'
import { combineReducers } from 'redux'
import { AxiosInstance } from '../midleware/saga'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'
import ErrorSlice from '../slices/ErrorSlice'
import meetings from '../slices/meetings'
const reducer =  combineReducers({
    user: appReducer,
    mainReducer:mainReducer,
    ErrorSlice: ErrorSlice,
    meetings
})
const store = configureStore({
    reducer,
    middleware: [thunk, AxiosInstance],
})
// The store now has redux-thunk added and the Redux DevTools Extension is turned on
export const { dispatch } = store
export default store;
export type RootStateReducer = ReturnType<typeof reducer>
