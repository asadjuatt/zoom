import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ApiRequests } from '../Services/ApiRequests'
import { appSecretKey } from '../utils/constants'
import { detectError } from '../utils/handleErrors/handleError'
import { meetinsSlice, } from '../utils/interfaces/interfaces'
import { setError } from './ErrorSlice'

const initialState: meetinsSlice = { meetings: [], loading: false, next_page_token: "", total_records: 0, page_size: 0 }

// fetch meetings
export const getMeetingThunk = createAsyncThunk(
  'meeting/getMeeting',
  async (_, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      return await ApiRequests.getMeetings().then(({ data }) => {
        console.log("data in getMeetings", data);
        if (data.meetings) console.log("meetings", data.meetings)
        return fulfillWithValue(data);
      })
        .catch(error => detectError(error, dispatch, rejectWithValue))
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
// delete meeting
export const deleteMeetingThunk = createAsyncThunk(
  'meeting/deleteMeeting',
  async ({ id }: { id: string; }, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      return await ApiRequests.deleteMeetings({id}).then(({ data }) => {
        dispatch(getMeetingThunk());
        return fulfillWithValue(data);
      })
        .catch(error => detectError(error, dispatch, rejectWithValue))
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
// fetch meetings
export const createmeetingThunk = createAsyncThunk(
  'meeting/createMeeting',
  async ({navigate, meetingData}:{navigate :(props:string) => void; meetingData:any}, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      console.log("meetingData :", meetingData)
      return await ApiRequests.createMeetings(meetingData).then(({ data }) => {
        if (data.meetings) console.log("meetings", data)
        navigate("/")
        return fulfillWithValue(data);
      })
        .catch(error => detectError(error, dispatch, rejectWithValue))
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)


// reducer
const meeting = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getMeetingThunk.pending, (state, action) => {
        state.loading = true;
      }).addCase(getMeetingThunk.fulfilled, (state, action: any) => {
        console.log("action.payload:", action.payload)
        state.meetings = action.payload?.meetings;
        state.next_page_token = action.payload?.next_page_token;
        state.total_records = action.payload?.total_records;
        state.page_size = action.payload?.page_size;
        state.loading = false;
      }).addCase(getMeetingThunk.rejected, (state, action) => {
        state.loading = false;
        console.log("rejected with ", action.payload)
      })
      .addCase(createmeetingThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createmeetingThunk.fulfilled, (state, action: any) => {
        console.log("action.payload:", action.payload)
        state.loading = false;
      })
      .addCase(createmeetingThunk.rejected, (state, action) => {
        state.loading = false;
        console.log("rejected with ", action.payload)
      })
  },
})

// export const { } = meeting.actions
export default meeting.reducer