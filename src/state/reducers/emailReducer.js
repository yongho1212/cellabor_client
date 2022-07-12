
const initialState = {
    emailcheck : false,

}

const reducer = ( state = initialState, action) => {
    switch(action.type) {
        case "EMAILCHECKED":
            return state = true;
        case "EMAILNOTCHECKED":
            return state = false;
        default:
            return state
    }
};

export default reducer;