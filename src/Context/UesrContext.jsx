import { createContext, useEffect, useState } from "react";

export let UserContext = createContext()
export default function UserContextProvider(props) {
    const [uesrLogin, setUesrLogin] = useState(null)
    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            setUesrLogin(localStorage.getItem('userToken'))
        }
    }, [])
    return <UserContext.Provider value={{ uesrLogin, setUesrLogin }}>
        {props.children}
    </UserContext.Provider>
}