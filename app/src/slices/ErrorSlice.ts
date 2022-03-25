const initialState = {
    errorCode: null,
    errorMessage: "",
    errorFields: [],
}

export interface ActionInterface {
        readonly errorCode: number;
        readonly errorMessage: string;
        readonly errorFields: Array<any>;
}
export const setError = (props: ActionInterface) => {
    return {
        type: "error_occure",
        payload: { ...props },
    }
}


const ErrorSlice = (state = initialState, action: any) => {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        // Do something here based on the different types of actions
        case "error_occure":
            console.log("caled vry happy")
            return { ...state, ...action.payload };
        case "clearError":
            console.log("called clear error")
            return { ...initialState };
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}
export default ErrorSlice