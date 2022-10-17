import { useMutation, useQuery } from '@apollo/client'
import React,{useState, useEffect} from 'react'
import { UseCurrentUser } from '../Context/UserContext'
import { QUERY_ROOM_MESSAGES, QUERY_SEND_MESSAGES } from '../getquery'
import "./message.scss"
const ViewMessage = (props:any) => {
    // console.log(props.props)
    const {getUser} = UseCurrentUser()
    const {loading: loadingRM, error: errorRM, data: dataRM, refetch: GRRefetch, startPolling} = useQuery(QUERY_ROOM_MESSAGES, {
        variables:{roomId: props.props.id}
    })
    const [functionSendMessage] = useMutation(QUERY_SEND_MESSAGES)
    const [text, setText] = useState('')


    useEffect(()=>{
        startPolling(500)
    })

    if(loadingRM){
        return <h1>Fetching...</h1>
    }

    // console.log(dataRM)

    const handleSendMessages = ()=>{
        functionSendMessage({
            variables:{
                senderId: getUser().id,
                text: text,
                imageUrl: "",
                roomId: props.props.id
            }
        }).then(()=>{
            GRRefetch()
        }).then(()=>{
            setText('')
        })
    }

  return (
    <div>
        <div className="popup">
                    <div className="popup-box">
                    <div className="popup-top">
                        <label htmlFor="">Messages</label>
                        <button onClick={()=>props.closeView(false)}>&#10006;</button>
                    </div>
                    <div className="popup-main">
                        {
                            dataRM.room.messages.map((e:any)=>{
                                return (
                                    <div className="msg-template">
                                        <img className='msg-pp' src={e.sender.profilePicture} alt="" />
                                        <div className="msg-detail">
                                            <span className='msg-span'>{e.sender.name}</span>
                                            <span className='msg-msg'>{e.text}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="bottom-popup">
                    <input onChange={(e)=>{setText(e.target.value)}} type="text" name="" id="" />
                        <button onClick={handleSendMessages}>&gt;</button>
                    </div>
                    </div>  
                </div>
    </div>
  )
}

export default ViewMessage