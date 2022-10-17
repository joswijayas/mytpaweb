import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './navbar_style/_navbarsearch.scss'
const NavbarSearch = ({...attr}:any) => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const handleChangeSearch=(e:any)=>{
    setSearch(e)
    console.log(e)
  }

  const handleRedirect = ()=>{
    if(search == ""){

    }else{
      console.log(search)
      navigate(`/MainPage/search/${search}`)
    }
  }

  return (
    <div className='navbar-search'>
        <input onChange={(e)=>{handleChangeSearch(e.target.value)}} {...attr} type="text" className='navbar-input' name="" id="" placeholder='Search...'/>
        <button onClick={handleRedirect}>&#128269;</button>
    </div>
  )
}

export default NavbarSearch
