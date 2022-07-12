
const initialState = {
    advertiser : {
        uid: "",
        brand_name: "",
        email: "",
        about: "",
        tags: [],
        role: "advertiser",
        logo: "",
        insta: "" ,
        facebook: "",
        twitter: "",
        youtube: "",
        website: "",
        mobile:"",
        location: "",
        progress_prd:[],
        history_prd:[],
        joined_channel:[]
    }
}

const reducer = ( state = initialState, action) => {
    switch(action.type) {
        case "ADLOGIN":
            return { ...state,
                state : action.payload
            }
        case "ADEDITINFO" :
            return {
                ...state,
                auth :  action.payload
            }
        case "ADADDCHANNEL" :
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