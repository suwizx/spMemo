'use client'

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { createContext , useState } from "react" 
const LoginContext = createContext()

const LoginProvider = ({children}) => {

    const [ user , setUser ] = useState()
    const [ isLoginPopup , setLoginPopup ] = useState(false)

    onAuthStateChanged(auth,(user) => {
        setUser(user)
        console.log("provider",user);
    })

    return(
        <LoginContext.Provider value={{ isLoginPopup , setLoginPopup , user }}>
            {children}
        </LoginContext.Provider>
    )
}

export { LoginContext }
export default LoginProvider