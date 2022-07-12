
const initialState = {
    loggedin : false,

}

const reducer = ( state = initialState, action) => {
    switch(action.type) {
        case "LOGINTRUE":
            return state = true;
        case "LOGINFALSE":
            return state = false;
        default:
            return state
    }
};

export default reducer;