import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import NavbarComponent from '../components/navigationbar/navbarcomponent/NavbarComponent'
import { UseCurrentUser } from '../Context/UserContext'
import { QUERY_UPDATE_ABOUT } from '../queris'
import '../styles/profile.scss'

const Profile = () => {
  const {getUser} = UseCurrentUser()
  const [editAbout, setEditAbout] = useState(false)
  const [currAbout, setCurrAbout] = useState(getUser().about)
  const [newAbout, setNewAbout] = useState('')
  const [functionUpdateAbout, {data, loading, error}] = useMutation(QUERY_UPDATE_ABOUT)
  const handleChangeAbout = (e)=>{
    setNewAbout(e.target.value)
    console.log(newAbout)
  }

  const handleUpdateAbout = ()=>{
    console.log("aaa")
        functionUpdateAbout({
            variables: {
                id: getUser().id,
                about: newAbout,
            }
        }).then(()=>{
            getUser().about = newAbout
            setCurrAbout(newAbout)
        }).catch((e)=>{
            console.log(e.message)
        })
  }

  const EditAboutShow = ()=>{
    if(editAbout === true){
      return (
        <>
        <div className="popup">
          <div className="component">
            <button onClick={(e)=>{setEditAbout(!editAbout)}}>
              Close
            </button>
            <div className="edit-about-component">
              <label htmlFor="">About you</label>
              <input type="text" onChange={(e)=>{handleChangeAbout(e)}}/>
              <button onClick={()=>{handleUpdateAbout}}>
                Update about
              </button>
            </div>
          </div>
        </div>
        </>
      )
    }
  }

  return (
    <div className='top-0'>
        <NavbarComponent/>
        {/* <React.Fragment><EditAboutShow/></React.Fragment> */}
        <div className="main">
          <div className="left">
            <div className='profile-head'>
              <img src={getUser().profile_picture} alt="" className='profile-img'/>
              <h3>{getUser().email}</h3>
            </div>
            <div className="about">
              <div className="about-head">
                <h2>About</h2>
                <input type="text" onChange={(e)=>{handleChangeAbout(e)}}/>
                <button onClick={handleUpdateAbout}>Edit</button>
              </div>
              <div className="about-desc">
                {currAbout}
              </div>
              
            </div>
          </div>
          <div className="right">
            <img src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png" alt="" />
          </div>
        </div>
    </div>
  )
}

export default Profile