import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserYouMightKnow = (props:any) => {


    const navigate = useNavigate()
    // console.log(props.props)

  return (
    <>
    <div className='connect-box'>
        <div className="connect-box-left">
            <div className="connect-box-photoProfile" onClick={()=>navigate(`/MainPage/Profile/${props.props.id}`)}>
                <img src={props.props.profilePicture} alt="" />
            </div>
            <div className="connect-box-detail" onClick={()=>navigate(`/MainPage/Profile/${props.props.id}`)}>
                <h5>{props.props.name}</h5>
                <p>{props.props.email}</p>
                <p>{props.props.headline}</p>
                <p>{props.props.region}</p>
            </div>
        </div>
        {/* <div className="connect-box-right">
            <button onClick={()=>setViewRemoveConnect(!viewRemoveConnect)}>&#10006;</button>
        </div> */}
    </div>
    </>
  )
}

export default UserYouMightKnow