import { useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../Context/CheckToken'
import { UseCurrentUser } from '../Context/UserContext'
import { QUERY_ADD_CONNECTION, QUERY_DELETE_CONNECTION_REQUEST } from '../queris'

function PendingConnectionRequest (props: any) {
    const {getUser} = UseCurrentUser()
    const navigate = useNavigate()
    const [functionDeleteConnectRequest, {data: dataDCR, loading: loadingDCR, error: errorDCR}] = useMutation(QUERY_DELETE_CONNECTION_REQUEST)
    const [functionAddConnection, {data: dataCon, loading: loadingCon, error: errorCon}] = useMutation(QUERY_ADD_CONNECTION)
    // console.log(props.item.sender)
    const handleAcceptConnection = ()=>{
        functionAddConnection({
            variables:{
                "user1ID": getUser().id,
                "user2ID": props.item.sender.id
            }
        }).then(()=>{
            functionDeleteConnectRequest({
                variables:{
                  "senderId": props.item.sender.id,
                  "receiverId": getUser().id
                }
              }).then(async()=>{
                await props.fetch()
              })
        })
    }

    const handleIgnoreConnection = ()=>{
        functionDeleteConnectRequest({
            variables:{
              "senderId": props.item.sender.id,
              "receiverId": getUser().id
            }
          }).then(async()=>{
            await props.fetch()
          })
    }
    useEffect(()=>{
        props.fetch()
    }, [])
    return (
    <>
        <div className="home-left-container">
            <div className="home-profile-image" onClick={()=>{navigate(`/MainPage/Profile/${props.item.sender.id}`)}}>
                <div className="home-profile-image-bg">
                    {
                        (props.item.sender.backgroundPicture == "" || props.item.sender.backgroundPicture == undefined || props.item.sender.backgroundPicture == null) ?
                        <img className='home-profile-bg-image' src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/workstation-linkedin-background-template-design-508687cf99e73da09225be280ee6eaf4_screen.jpg?ts=1597995086" alt="" /> :
                        <img className='home-profile-bg-image' src={props.item.sender.backgroundPicture} alt="" />
                    }
                </div>
                <div className="home-profile-image-pp">
                    <img className='home-profile-pp' src={props.item.sender.profilePicture} alt="" />
                </div>
            </div>
            <div className="home-left-card-detail">
                <p onClick={()=>{navigate(`/MainPage/Profile/${props.item.sender.id}`)}}>{props.item.sender.name}</p>
                <p onClick={()=>{navigate(`/MainPage/Profile/${props.item.sender.id}`)}}>{props.item.sender.email}</p>
                <div className="button-pending-request">
                    <button className = "accept" onClick={handleAcceptConnection}>Accept</button>
                    <button className = "ignore" onClick={handleIgnoreConnection}>Ignore</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default PendingConnectionRequest