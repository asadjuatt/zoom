import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ApiRequests } from '../Services/ApiRequests'
import { appSecretKey } from '../utils/constants'
import { detectError } from '../utils/handleErrors/handleError'
import { appReducerInterface, loginInterface, registerInterface } from '../utils/interfaces/interfaces'
import { setError } from './ErrorSlice'

const initialState: appReducerInterface = { isLogin: false, user: null, loading: false, token: null }

// use this thunk to login user
export const loginThunk = createAsyncThunk(
  'user/login',
  async ({ email, password }: loginInterface, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      return await ApiRequests.login({ email, password }).then(({ data }) => {
        localStorage.setItem(appSecretKey, data.token)
        return fulfillWithValue(data);
      })
        .catch(error => detectError(error, dispatch, rejectWithValue))
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// use this thunk to authenticte user
export const authenticateThunk = createAsyncThunk(
  'user/authenticate',
  async () => {
    try {
      const res = await ApiRequests.authenticate()
      console.log("res", res)
    } catch (error) {
      console.log("authenticateThunk error:", error);
    }
  }
)

// use this thunk to register new user
export const registerThunk = createAsyncThunk(
  'user/register',
  async ({ email, password, full_Name }: registerInterface, {fulfillWithValue, rejectWithValue, dispatch}) => {
    try {
      await ApiRequests.register({ email, password, full_Name }).then(({ data }) => {
        localStorage.setItem(appSecretKey, data.token)
        return fulfillWithValue(data);
      })
        .catch(error => detectError(error, dispatch, rejectWithValue))
    } catch (error) {
      console.log("registerThunk error:", error);
    }
  }
)

// reducer
const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(loginThunk.pending, (state, action) => {
        state.loading = true;
        state.token = null;
        state.user = null;
      }).addCase(loginThunk.fulfilled, (state, action: any) => {
        state.token = action.payload?.token;
        state.isLogin = true;
        state.loading = false;
        state.user = {
          name: "asad",
          email: "asadiqbal791@gmail.com"
        }
      }).addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        console.log("rejected with ", action.payload)
      })
  },
})

// export const {  } = counterSlice.actions
export default counterSlice.reducer