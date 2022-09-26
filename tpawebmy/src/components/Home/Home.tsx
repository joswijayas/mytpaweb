import React from 'react'
import NavbarComponent from '../navigationbar/navbarcomponent/NavbarComponent'
import './home.scss'
import { UseCurrentUser } from '../../Context/UserContext'
import HomeLeft from './HomeLeft'
import HomePost from './HomePost'
import HomeRight from './HomeRight'
import CreatePost from './CreatePost'
const Home = () => {

  const {getUser, setUserToLocalStorage, getToken} = UseCurrentUser()
  console.log(getUser().id);
  

  return (
    <div className='top-0-home'>
      <NavbarComponent/>
      {/* <div className="home-component">
        <HomeLeft/>
        <HomePost/>
        <HomeRight/>
      </div> */}
      <div className="home-all-component">
        <div className="home-upper">
          <CreatePost/>
        </div>
        <div className="home-post">
          
        </div>
      </div>
    </div>
  )
}

export default Home