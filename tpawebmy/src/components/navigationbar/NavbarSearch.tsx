import React from 'react'
import './navbar_style/_navbarsearch.scss'
const NavbarSearch = ({...attr}:any) => {
  return (
    <div className='navbar-search'>
        <input {...attr} type="text" className='navbar-input' name="" id="" placeholder='Search...'/>
    </div>
  )
}

export default NavbarSearch
