import { NetworkStatus, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { UseCurrentUser } from '../Context/UserContext'
import { QUERY_CONNECT_REQUEST, QUERY_GET_CONNECTIONS, QUERY_PENDING_OR_NO } from '../queris'

const SearchUser = (props:any) => {
    const {getUser} = UseCurrentUser()
    // console.log(props.props)
    const {loading: loadingCon, error: errorCon, data: dataCon, refetch: ConRefetch} = useQuery(QUERY_GET_CONNECTIONS, {variables : {id: getUser().id},})
    const navigate = useNavigate()
    const [validateConnect, setValidateConnect] = useState(false)
    const [functionConnectRequest, {data: dataCR, loading: loadingCR, error: errorCR}] = useMutation(QUERY_CONNECT_REQUEST)
    const {loading: loadingPON, error: errorPON, data: dataPON, refetch: PONRefetch} = useQuery(QUERY_PENDING_OR_NO, {variables : {id: props.props.id},})
    if(loadingCon || loadingPON){
        return <h1>Loading...</h1>
    }
    if(loadingCR){
        return <h1>Loading</h1>
    }
    
    const ValidateConnect = ()=>{
        const [customeMessage, setCustomMessage] = useState('Hi dear, I would like to connect with you!')

        const handleConnect = ()=>{
            functionConnectRequest({
                variables: {
                    "senderId": getUser().id,
                    "receiverId": props.props.id,
                    "message": customeMessage
                }
            }).then(async()=>{
                await PONRefetch().then((x)=>{
                  console.log(x.data.user.ConnectionRequests)
                })
            }).catch((e)=>{
                console.log(e.message)
            }).then(()=>{
                setValidateConnect(!validateConnect)
            })
        }

        return(
            <>
              {
                validateConnect == false ? null :
                      <div className="popup">
                          <div className="popup-box">
                          <div className="popup-top">
                              <label htmlFor="">Are you want to connect?</label>
                              <button onClick={()=>{setValidateConnect(!validateConnect)}}>&#10006;</button>
                          </div>
                          <div className="popup-main">
                            
                            
                            <textarea value={customeMessage} onChange={(e)=>{setCustomMessage(e.target.value)}}  className='exp-desc-c' ></textarea>
                              
                          </div>
                          <div className="bottom-popup">
   
                              <button className='all-button' onClick={handleConnect}>Connect</button>
                              
                          </div>
                          </div>  
                      </div>
              }
            </>
          )
    }
    // console.log(dataCon)
    // console.log((dataCon.user.Connections.filter((e:any)=>e.user1.id === getUser().id)).length > 0)
    return (
    <div className='search-box'>
        <ValidateConnect/>
        <div className="search-box-left" onClick={()=>{navigate(`/MainPage/Profile/${props.props.id}`)}}>
            <div className="search-box-photoProfile" >
                <img src={props.props.profilePicture} alt="" />
            </div>
            <div className="search-box-detail">
                <h5>{props.props.name}</h5>
                <p>{props.props.position}</p>
                <p>{props.props.headline}</p>
                <p>{props.props.Connections.length} Connection</p>
            </div>
        </div>
        <div className="search-box-right">
            {
                (dataCon.user.Connections.filter((e:any)=>e.user1.id === props.props.id)).length > 0 || (dataCon.user.Connections.filter((e:any)=>e.user2.id === props.props.id)).length > 0 == true ? 
                null 
                :(
                  (dataPON.user.ConnectionRequests.filter((e:any)=>e.sender.id === getUser().id)).length > 0 ? 
                  <button id='hide' >Pending</button> :
                  <button onClick={()=>{setValidateConnect(!validateConnect)}}>Connect</button>
                )
            }
        </div>
        
    </div>
  )
}

export default SearchUser