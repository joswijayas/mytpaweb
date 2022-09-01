import React from 'react'
import './navbar_style/_allnavbar.scss'
const AllNavbar = ({children, ...attr}:any) => {
  return (
    <div {...attr} className='all-navbar'>{children}</div>
  )
}

export default AllNavbar