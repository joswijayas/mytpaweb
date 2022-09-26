import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const userCtx = createContext({} as any)

const UserContext = ({children}: {children: any}) => {
  const [user, setUser] = useState(Object)
  const [token, setToken] = useState('')

  function getUserFromLocalStorage(){
    const userLoad = localStorage.getItem('user') || ""
    if (userLoad === ""){
      return {
        id: ""
      }
    }
    const user = JSON.parse(userLoad)
    if(user === undefined || user === null){
      return {
        id: ""
      }
    }
    return user
  }

  function setUserToLocalStorage(user: Object){
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', user.token)
  }

  function setUserToLocalStorageAfterRefetch(user: Object){
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  function getUser(){
    if(user === undefined || Object.keys(user).length == 0 || user === null){
      const gettingUser = getUserFromLocalStorage()
      setUser(gettingUser)
      return gettingUser
    }

    return user
  }

  function getTokenFromLocalStorage(){
    const tokenLoad = localStorage.getItem('token') || ""
    if (tokenLoad === ""){
      return ""
    }
    setToken(tokenLoad)
      return token
    
  }

  function getToken(){
    return getTokenFromLocalStorage()
  }

  return <userCtx.Provider value={{getUser, user, setUserToLocalStorage, getToken, setUserToLocalStorageAfterRefetch}}>
    {children}
  </userCtx.Provider>

}

export default UserContext
export function UseCurrentUser(){
  return useContext(userCtx)
}