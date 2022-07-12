
const initialState = {
    influencer : {
        uid: '',
        nickname: '',
        email: '',
        password: '',
        tags: [],
        about: '',
        role: 'influencer',
        avatar: '',
        sex: '',
        birthday: '', 
        location:'',
        insta: '',
        facebook: '',
        tiktok: '',
        twitter: '',
        youtube: '',
        mobile: '',
        wait_prd:[],
        denied_prd:[],
        progress_prd:[],
        history_prd:[],
        joined_channel:[] 
    } 
    
}

const reducer = ( state = initialState, action) => {
    switch(action.type) {
        case "INFLOGIN":
            return { ...state,
                state : action.payload
            }
        case "INFEDITINFO" :
            return {
                ...state,
                state : action.payload
            }
        case "INFADDCHANNEL" :
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