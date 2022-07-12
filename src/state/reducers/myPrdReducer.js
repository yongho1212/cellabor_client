
const initialState = {
    myPrd : [
       {
        name:"",
        brand:"",
        targetPlatform:"",
        category:"",
        period:"",
        postType:"",
        point:"",
        applicationConditions:"",
        qualification:"",
        isCheck:"",
        detailPage:"",
        offersAndMissions:"",
        photo:[],
        mobile:"",
        authorUid:"",
        joinInf:[],
        createdAt:"",
        updatedAt:"",
        prdfsidDb:"",

        }
    ]
    
}

const reducer = ( state = initialState, action) => {
    switch(action.type) {
        case "PREPEND_PRD":
            return { ...state,
                myPrd : [action.payload]
            }
        case "APPEND_PRD":
            return { ...state,
                myPrd : [action.payload]
            }
        default:
            return state;
    }
};

export default reducer;