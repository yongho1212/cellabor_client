export const loginUser = (loginData) =>{
    return (dispatch) => {
        dispatch({
            type : "LOGIN",
            payload: {loginData}
        })
    }
}
export const adloginUser = (adloginData) =>{
    return (dispatch) => {
        dispatch({
            type : "ADLOGIN",
            payload: {adloginData}
        })
    }
}
export const infloginUser = (infloginData) =>{
    return (dispatch) => {
        dispatch({
            type : "INFLOGIN",
            payload: {infloginData}
        })
    }
}
export const editInfo = (userinfo) =>{
    return (dispatch) => {
        dispatch({
            type : "EDITINFO",
            payload: {userinfo}
        })
    }
}
export const adeditInfo = (userinfo) =>{
    return (dispatch) => {
        dispatch({
            type : "ADEDITINFO",
            payload: {userinfo}
        })
    }
}

export const infeditInfo = (userinfo) =>{
    return (dispatch) => {
        dispatch({
            type : "INFEDITINFO",
            payload: {userinfo}
        })
    }
}

export const addchannel = (channel) =>{
    return (dispatch) => {
        dispatch({
            type : "ADDCHANNEL",
            payload: {channel}
        })
    }
}
export const adaddchannel = (channel) =>{
    return (dispatch) => {
        dispatch({
            type : "ADADDCHANNEL",
            payload: {channel}
        })
    }
}
export const infaddchannel = (channel) =>{
    return (dispatch) => {
        dispatch({
            type : "INFADDCHANNEL",
            payload: {channel}
        })
    }
}

export const logoutUser = ( ) =>{
    return (dispatch) => {
        dispatch({
            type : "LOGOUT",
            payload : ""
        })
    }
}

export const fbuser = () =>{
    return (dispatch) => {
        dispatch({
            type : "LOGINTRUE",
            payload : true
        })
    }
}

export const nofbuser = (checker) =>{
    return (dispatch) => {
        dispatch({
            type : "LOGINFALSE",
            payload : {checker}
        })
    }
}

export const emailchecked = (emailchecker) =>{
    return (dispatch) => {
        dispatch({
            type : "EMAILCHECKED",
            payload : {emailchecker}
        })
    }
}

export const emailnotchecked = (emailchecker) =>{
    return (dispatch) => {
        dispatch({
            type : "EMAILNOTCHECKED",
            payload : {emailchecker}
        })
    }
}

export const prependprd = (prddata) =>{
    return (dispatch) => {
        dispatch({
            type : "PREPEND_PRD",
            payload : {prddata}
        })
    }
}

export const appendprd = (prddata) =>{
    return (dispatch) => {
        dispatch({
            type : "APPEND_PRD",
            payload : {prddata}
        })
    }
}