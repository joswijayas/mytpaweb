import React from 'react'
import './navbar_style/_navbaricon.scss'

const NavbarIcon = ({type, text, children, ...attr}:any) => {
  return (
    <div className="all-icon-container" {...attr}>
        <div className={type} id="icon-item">
            <div className="icon-dot"></div>
            {children}
        </div>
        <div className="icon-text-component">{text}</div>
    </div>
  )
}

export default NavbarIcon
