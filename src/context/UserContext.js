import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

const UserContextProvider = (props) => {
    const [userInfo, setUserInfo] = useState({
        uid:'',
        displayName:"",
        email:"asd@be.com",
        password:"$2b$12$wwrJBMrEv88YxzkB1GxHD.0OaCegOoO1vvDXjf5aWmrqFqWmo.E4a",
        aboutme:"About me",
        role:"inflencer",
        avatar:"https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avata...",
    })

    useEffect(() => {
        
    })
}