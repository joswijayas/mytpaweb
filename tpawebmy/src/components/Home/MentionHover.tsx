import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { QUERY_GET_USER } from '../../queris';

const MentionHover = ({text} : {text: string}) => {
    const navigate = useNavigate()
    let firstIndexMentionTag = text.indexOf('[');
    let lastIndexMentionTag = text.indexOf(']');
    let mentionTagSubString = text.substring(firstIndexMentionTag + 1, lastIndexMentionTag)

    let firstIndexUserId = text.indexOf('(')
    let lastIndexUserId = text.indexOf(')')
    let userIdSubString = text.substring(firstIndexUserId + 1, lastIndexUserId)
    const [isHover, setIsHover] = useState(false)

    const {loading: loadingUserID, error: errorUserID, data: dataUserID, refetch: userIDRefetch} = useQuery(QUERY_GET_USER, {variables : {id: userIdSubString},})

    if(loadingUserID){
        return <h1>Fetching...</h1>
    }

    // console.log(dataUserID)

    const ForHover = ()=>{
        return(
            <>
            {
                isHover == false ?
                    null:
                <div className="post-container-header-hover" onMouseOver={()=>{setIsHover(true)}} onMouseOut={()=>{setIsHover(false)}} onClick={()=>navigate(`/MainPage/Profile/${dataUserID.user.id}`)}>
                    <img className="post-photo-profile-hover" src={dataUserID.user.profilePicture} alt="" />
                    <div className="post-container-detail-hover">
                        <span>{dataUserID.user.name}</span>
                        <span>{dataUserID.user.headline}</span>
                        <span>{dataUserID.user.position}</span>
                        {/* <span>{props.props.Sender.email}</span> */}
                        {/* <span>{dataCon.user.Connections.length} connection</span> */}
                    </div>
                </div>
            }
            </>
        )
    }


  return (
    <>
        <ForHover/>
        <Link onMouseOver={()=>{setIsHover(true)}} onMouseOut={()=>{setIsHover(false)}}  className="richText-a" to={`/MainPage/Profile/${userIdSubString}`}>{mentionTagSubString} &nbsp;</Link>
    </>
    )
}

export default MentionHover