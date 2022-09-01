import React, { useState } from 'react'
import NavbarRightTemplate from './NavbarRightTemplate'
import './navbar_style/_navbarright.scss'
const NavbarRight = () => {
    const [burger, setBurger] = useState(false)
    const BurgerTemplate = ()=>{
        return (
            <div className="navbar-burger">
                <NavbarRightTemplate/>
            </div>
        )
    }
    return (
    <div>
        <div className="navbar-right">
            <NavbarRightTemplate/>
        </div>
       <div className="navbar-right-mobile">
            <div className="fa-solid fa-bars" onClick={()=>setBurger(!burger)}></div>
            {burger === true ? <BurgerTemplate/> : null}
        </div> 
    </div>
  )
}

export default NavbarRight