const initialState = {
    name: "",
    status: "",
}

interface Action {
    readonly type: string;
}


const appReducer = (state = initialState, action: Action) => {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        // Do something here based on the different types of actions
        case "name":
            return { ...state, name: "asad" };
        case "status":
            return { ...state, status: "dev" };
        case "logout":
            return { ...state, status: "dev" };
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state
    }
}
export default appReducer