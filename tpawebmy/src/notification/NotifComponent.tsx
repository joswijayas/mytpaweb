import React from 'react'
import './notification.scss'
const NotifComponent = (props:any) => {
  return (
    <div className="notif-big">

    <div className='notif-component'>
        <h3>{props.props.fromUser.name} {props.props.message} to You!</h3>
        <h5>at {props.props.createdAt}</h5>
    </div>
    </div>
  )
}

export default NotifComponent