import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext, { UseCurrentUser } from '../../Context/UserContext'
import NavbarIcon from './NavbarIcon'
import './navbar_style/_navbarrighttemplate.scss'

const NavbarRightTemplate = () => {
  const {getUser} = UseCurrentUser()
  // console.log(getUser().profile_picture)
  // const currUser = localStorage.getItem("user")
  // console.log(currUser)
  const navigate = useNavigate()
    return (
    <div className="navbar-right-component">
        <NavbarIcon type='fa-solid fa-house-chimney' text='Home' onClick={()=> navigate('/Home')}/>
        <NavbarIcon type='fa-solid fa-user-group' text='My Network' onClick={()=> navigate('/mynetwork')}/>
        <NavbarIcon type='fa-solid fa-briefcase' text='Jobs'  onClick={()=> navigate('/jobs')}/>
        <NavbarIcon type='fa-solid fa-comment-dots' text='Messaging' onClick={()=> navigate('/messages')}/>
        <NavbarIcon type='fa-solid fa-bell' text='Notifications'  onClick={()=> navigate('/notifications')}/>
        <NavbarIcon text='Me' onClick={()=> navigate(`/Profile/${getUser().id}`)}>
            <img src={getUser().profile_picture} alt="" />
        </NavbarIcon>
    </div>
  )
}

export default NavbarRightTemplate