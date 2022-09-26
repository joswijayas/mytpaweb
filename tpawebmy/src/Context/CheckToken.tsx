import React, { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseCurrentUser } from './UserContext'

type props = {
    children: React.ReactNode | React.ReactNode[]
}

type UserContextType = {}

export const useUserContext = () => useContext(CheckToken)

let CheckToken = createContext<UserContextType>({})

export function ParseJwt (token : string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  };

export const UserProvider : React.FC<props> = ({ children }) => {
    const navigate = useNavigate()
    const {getUser, setUserToLocalStorage} = UseCurrentUser()

    if(getUser().id == "" || getUser().id == undefined){
        navigate("/Login")
    }
     

    return (
        <CheckToken.Provider value={{}} >
            {children}
        </CheckToken.Provider>
    )
}