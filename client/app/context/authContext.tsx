"use client"
import { createContext, useState, useContext, useEffect } from "react";

type User = {
    role: string;
}
type authcontextype = {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    getRole: () => string | undefined;
}
const Authcontext = createContext<authcontextype | undefined>(undefined)
export const Authprovider = ({children} : any) => {
    const [user, setUser] = useState<string | null>(null)
    useEffect(() => {
         const getRole = async() => {
            try {
                const res = await fetch("/api/auth/whoami",{credentials: "include"})
                if(res.ok){
                    const data = await res.json()
                    setUser(data.role)
                }
                else{
                    setUser(null)
                }
            } catch (error) {
                console.error(error)
                setUser(null)
            }
        }
        getRole()
    },[])
   
    const login = (userData: any) => {
        
        setUser(userData.role)
    }
    const logout = () => {
        setUser(null)
    }
    const getRole = () => {
        return user
    }
    useEffect(() => {
        console.log(`new state value ${user}`)
    },[user])
   
     return (
        <Authcontext.Provider value={{user, login, logout, getRole}}>
            {children}
        </Authcontext.Provider>
    )
}
export const useAuth = () => useContext(Authcontext)