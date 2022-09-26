import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseCurrentUser } from '../Context/UserContext'
import { QUERY_REMOVE_CONNECTION } from '../queris'
import "./myconnect.scss"
function MyConnection (props:any)  {
  const {getUser} = UseCurrentUser()
//   console.log(props.item)
const navigate = useNavigate()
  const [viewRemoveConnect, setViewRemoveConnect] = useState(false)
  const [functionRemoveConnection, {data: dataRC, loading: loadingRC, error: errorRC}] = useMutation(QUERY_REMOVE_CONNECTION)
  const friendData = ()=>{
    return props.item.user1.id == getUser().id ? props.item.user2 : props.item.user1
  }
//   console.log(props.item.user1.id)
//   console.log(friendData.id)

  useEffect(()=>{
    props.fetch()
  },[])

  const ViewRemoveConnect = ()=>{
    const handleRemoveConnection = ()=>{
        console.log('gotchu remove' + props.item.id)
        functionRemoveConnection({
            variables: {
                id: props.item.id
            }
        }).then(()=>{
            props.fetch().then(
                setViewRemoveConnect(!viewRemoveConnect)
            )
        })
    }
    return (
        <>
            {
                viewRemoveConnect == false ? null :
                <div className="popup">
                    <div className="popup-box">
                    <div className="popup-top">
                        <label htmlFor="">Are you sure want remove this connection?</label>
                        <button onClick={()=>{setViewRemoveConnect(!viewRemoveConnect)}}>&#10006;</button>
                    </div>
                    <div className="popup-main">
                        
                    </div>
                    <div className="popup-bottom">
                        <button className='all-button' onClick={handleRemoveConnection}>Remove</button>
                    </div>
                    </div>  
                </div>
            }
        </>
    )
  }

  return (
    <>
    <ViewRemoveConnect/>
    <div className='connect-box'>
        <div className="connect-box-left">
            <div className="connect-box-photoProfile" onClick={()=>navigate(`/MainPage/Profile/${friendData().id}`)}>
                <img src={friendData().profilePicture} alt="" />
            </div>
            <div className="connect-box-detail" onClick={()=>navigate(`/MainPage/Profile/${friendData().id}`)}>
                <h5>{friendData().name}</h5>
                <p>{friendData().email}</p>
                <p>{friendData().headline}</p>
                <p>{friendData().region}</p>
            </div>
        </div>
        <div className="connect-box-right">
            <button onClick={()=>setViewRemoveConnect(!viewRemoveConnect)}>&#10006;</button>
        </div>
    </div>
    </>
  )
}

export default MyConnection