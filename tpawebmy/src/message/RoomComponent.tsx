import React, {useState} from 'react'
import { UseCurrentUser } from '../Context/UserContext'
import "./message.scss"
import ViewMessage from './ViewMessage'
const RoomComponent = (props:any) => {
    // console.log(props.props)
    const {getUser} = UseCurrentUser()
    const [viewMessage, setViewMessage] = useState(false)
    const friend = ()=>{
       return  props.props.user1.id === getUser().id ? props.props.user2 : props.props.user1
    }

  return (
    <>
            {
                viewMessage == true ?
                <ViewMessage props={props.props} closeView={setViewMessage}/>:
                null
            }
            <div className='room-component' onClick={()=>{setViewMessage(true)}}>
                <img src={friend().profilePicture} alt="" className="room-component-img" />
                <span>{friend().name}</span>
            </div>
          
    </>
  )
}

export default RoomComponent