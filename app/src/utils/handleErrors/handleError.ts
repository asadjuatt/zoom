import { setError } from "../../slices/ErrorSlice"

export const detectError = (error: any, dispatch: (props: any) => {}, rejectWithValue: (props: any) => {},) => {
    console.log("error :>>>", error)
    if (error?.response) {
        console.log("error.response", error.response)
        // dispatch(setError({
        //     errorCode: error.response.status,
        //     errorMessage: error.response.data.error,
        //     errorFields: Object.keys(error.response.data)}))

    }else if(error?.request){
        console.log("error.request", error.request)
    }else{
        console.log("error", error);
    }
    return rejectWithValue(error)
}