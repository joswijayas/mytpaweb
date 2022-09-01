import React, { createContext, useContext, useState } from 'react'

const userCtx = createContext({} as any)

const UserContext = ({children}: {children: any}) => {
  const [user, setUser] = useState(Object)
  
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
  }

  function getUser(){
    if(user === undefined || Object.keys(user).length == 0 || user === null){
      const gettingUser = getUserFromLocalStorage()
      setUser(gettingUser)
      return gettingUser
    }

    return user
  }

  return <userCtx.Provider value={{getUser, user, setUserToLocalStorage}}>
    {children}
  </userCtx.Provider>

}

export default UserContext
export function UseCurrentUser(){
  return useContext(userCtx)
}