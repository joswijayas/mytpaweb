import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UseCurrentUser } from '../../Context/UserContext'

const HomePost = () => {
  const {getUser} = UseCurrentUser()
  const navigate = useNavigate()
  return (
    <>
        <div className="home-left-container">
            <div className="home-profile-image">
                <div className="home-profile-image-bg">
                    <img className='home-profile-bg-image' src={getUser().backgroundPicture} alt="" />
                </div>
                <div className="home-profile-image-pp">
                    <img className='home-profile-pp' src={getUser().profilePicture} alt="" />
                </div>
            </div>
            <div className="home-left-card-detail">
                <p>{getUser().name}</p>
                <p>{getUser().headline}</p>
            </div>
        </div>
    </>
  )
}

export default HomePost