import { useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext, { UseCurrentUser } from '../../Context/UserContext'
import { QUERY_GET_USER } from '../../queris'
import NavbarIcon from './NavbarIcon'
import './navbar_style/_navbarrighttemplate.scss'

const NavbarRightTemplate = () => {
  const {getUser} = UseCurrentUser()
  const paramsID = useParams()
  const {loading: loadingUserID, error: errorUserID, data: dataUserID, refetch: userIDRefetch} = useQuery(QUERY_GET_USER, {variables : {id: paramsID.id},})

  // console.log(getUser().profile_picture)
  // const currUser = localStorage.getItem("user")
  // console.log(currUser)
  const navigate = useNavigate()
    return (
    <div className="navbar-right-component">
        <NavbarIcon type='fa-solid fa-house-chimney' text='Home' onClick={()=> navigate('/MainPage')}/>
        <NavbarIcon type='fa-solid fa-user-group' text='My Network' onClick={()=> navigate('/MainPage/mynetwork')}/>
        <NavbarIcon type='fa-solid fa-briefcase' text='Jobs'  onClick={()=> navigate('/MainPage/jobs')}/>
        <NavbarIcon type='fa-solid fa-comment-dots' text='Messaging' onClick={()=> navigate('/MainPage/messages')}/>
        <NavbarIcon type='fa-solid fa-bell' text='Notifications'  onClick={()=> navigate('/MainPage/notifications')}/>
        <NavbarIcon text='Me' onClick={()=> navigate(`/MainPage/Profile/${getUser().id}`)}>
            <img src={getUser().profilePicture} alt="" />
        </NavbarIcon>
    </div>
  )
}

export default NavbarRightTemplate