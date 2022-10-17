import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import { UserProvider } from './Context/CheckToken'
import MyJob from './Job/MyJob'
import Message from './message/Message'
import Network from './MyNetwork/Network'
import Notification from './notification/Notification'
import Profile from './Profile/Profile'
import SearchPage from './search/SearchPage'
import SearchPageHastag from './search/SearchPageHastag'

const MainPage = () => {
  return (
    <UserProvider >
        <Routes> 
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/Profile/:id" element={<Profile/>}/>
            <Route path="/mynetwork" element={<Network/>}/>
            <Route path="/jobs" element={<MyJob/>}/>
            <Route path="/messages" element={<Message/>}/>
            <Route path="/notifications" element={<Notification/>}/>
            <Route path="/search/:keyword" element={<SearchPage/>}/>
            <Route path="/SearchTags/:keyword" element={<SearchPageHastag/>}/>
        </Routes>
    </UserProvider>
  )
}

export default MainPage