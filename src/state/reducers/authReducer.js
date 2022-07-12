
const initialState = {
    auth : {
        age: "",
        avatar: "",
        displayName: "",
        email: "",
        insta: "",
        joinedChannel: [],
        mobile: "",
        role: "" ,

    } 
    
}

const reducer = ( state = initialState, action) => {
    switch(action.type) {
        case "LOGIN":
            return { ...state,
                state : action.payload
            }
        case "EDITINFO" :
            return {
                ...state,
                auth :  action.payload
            }
        case "ADDCHANNEL" :
            return {
                ...state,
                joinedChannel : action.newItem
            }
        case "LOGOUT":
            return state = '';
        default:
            return state
    }
};

export default reducer;