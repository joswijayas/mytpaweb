import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import NavbarSearch from './NavbarSearch'
import './navbar_style/_navbarleft.scss'
const NavbarLeft = () => {
    const navigate = useNavigate()

    return (
        <div className="navbar-left">
            <img src="https://static-exp1.licdn.com/sc/h/akt4ae504epesldzj74dzred8" alt="logos" onClick={()=>navigate('/Home')}/>
            <NavbarSearch/>
        </div>
    )
}

export default NavbarLeft