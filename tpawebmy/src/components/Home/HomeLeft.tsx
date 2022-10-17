import { useQuery } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UseCurrentUser } from '../../Context/UserContext'
import { QUERY_GET_POST } from '../../queris'
import '../../styles/homeleft.scss'

const HomeLeft = () => {
  const {getUser} = UseCurrentUser()
  const {loading: loadingP, error: errorP, data: dataP, refetch: refetchP} = useQuery(QUERY_GET_POST)
  const navigate = useNavigate()

  if(loadingP){
    return <h1>Fetching...</h1>
  }

  console.log(dataP)

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

export default HomeLeft