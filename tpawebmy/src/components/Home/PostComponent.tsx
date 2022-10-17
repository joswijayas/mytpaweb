import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUERY_GET_CONNECTIONS, QUERY_GET_POST_COMMENTS, QUERY_LIKE_POST, QUERY_UNLIKE_POST } from '../../queris'
import './post_component.scss'
import { BeakerIcon } from '@heroicons/react/24/solid'
import { UseCurrentUser } from '../../Context/UserContext'
import RichTextTemplate from './TemplateRichText'
import CommentComponent from './CommentComponent'
import { QUERY_ADD_NOTIF } from '../../getquery'



const PostComponent = (props:any) => {
    const {getUser, setUserToLocalStorage, getToken} = UseCurrentUser()
    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false)
    // console.log(props.props.Likes.length)
    const {loading: loadingCon, error: errorCon, data: dataCon, refetch: ConRefetch} = useQuery(QUERY_GET_CONNECTIONS, {variables : {id: props.props.Sender.id},})
    const [functionLike, {data: dataLP, loading: loadingLP, error: errorLP}] = useMutation(QUERY_LIKE_POST)
    const [functionUnlike, {data: dataUP, loading: loadingUP, error: errorUP}] = useMutation(QUERY_UNLIKE_POST)
    const [functionAddNotif, {data: dataAN, loading: loadingAN, error: errorAN}] = useMutation(QUERY_ADD_NOTIF)
    const [viewComment, setViewComment] = useState(false)
    // const {loading: loadingPC, error: errorPC, data: dataPC, refetch: PCRefetch, fetchMore: fetchMorePC} = useQuery(QUERY_GET_POST_COMMENTS, {
    //     variables : {
    //         "Limit": 1000,
    //         "Offset": 0,
    //         "postId": props.props.id
    //     },
    // })
    if(loadingCon){
        return <h1>Fetching...</h1>
    }
    
// console.log(props.props)
    // console.log(dataCon.user.Connections.length)

    const ForHover = ()=>{
        return(
            <>
            {
                isHover == false ?
                    null:
                <div className="post-container-header-hover" onMouseOver={()=>{setIsHover(true)}} onMouseOut={()=>{setIsHover(false)}} onClick={()=>navigate(`/MainPage/Profile/${props.props.Sender.id}`)}>
                    <img className="post-photo-profile-hover" src={props.props.Sender.profilePicture} alt="" />
                    <div className="post-container-detail-hover">
                        <span>{props.props.Sender.name}</span>
                        <span>{props.props.Sender.headline}</span>
                        <span>{props.props.Sender.position}</span>
                        {/* <span>{props.props.Sender.email}</span> */}
                        <span>{dataCon.user.Connections.length} connection</span>
                    </div>
                </div>
            }
            </>
        )
    }

    const handleLike = ()=>{
        functionLike({
            variables:{
                postId: props.props.id,
                userId: getUser().id
            }
        }).then(()=>{
            props.fetch()
        }).then(()=>{
            functionAddNotif({
                variables:{
                    toUserId: props.props.Sender.id,
                    fromUserId: getUser().id,
                    message: ' Like you post!'
                }
            })
        })
    }

    const handleUnlike = ()=>{
        functionUnlike({
            variables:{
                postId: props.props.id,
                userId: getUser().id
            }
        }).then(()=>{
            props.fetch()
        })
    }
    const texts = props.props.description?.split(" ");

  return (
    <div className='main-home'>
      <div className='post-container'>
        <div className="testers">
        <ForHover/>
            <div className="post-container-header" onMouseOver={()=>{setIsHover(true)}} onMouseOut={()=>{setIsHover(false)}} onClick={()=>navigate(`/MainPage/Profile/${props.props.Sender.id}`)}>
                <img className="post-photo-profile" src={props.props.Sender.profilePicture} alt="" />
                <div className="post-container-detail">
                    <span>{props.props.Sender.name}</span>
                    <span>{props.props.Sender.headline}</span>
                </div>
            </div>
        </div>
        <div className="post-main">
            <div className='post-main-desc'>
            {/* {props.props.description} */}
            <RichTextTemplate texts={texts}/>
            </div>
            {         
                props.props.videoUrl == "" ? 
                props.props.photoUrl == "" ?
                <div></div>
                :
                <img className="post-main-image" src={props.props.photoUrl} alt="" />
                :
                <video controls={true} className='post-main-vidios' src={props.props.videoUrl}></video>
            }

            <div className="icon">
                {
                    (props.props.Likes.filter((e:any)=>e.userId === getUser().id)).length > 0 ? 
                    
                    <svg className='like-button' onClick={handleUnlike} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{width:"30px", height:"30px", color:"red"}}>
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  
                    :
                    <svg className='like-button' onClick={handleLike}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:"30px", height:"30px"}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>

                }
                <div className="count">
                    {props.props.Likes.length}
                </div>
                <svg onClick={()=>setViewComment(!viewComment)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{width:"30px", height:"30px"}}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <div className="count">
                    {props.props.Comments.length}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:"30px", height:"30px"}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
                <div className="count">
                    {props.props.shareCount}
                </div>
            </div>
        </div>
        <div className="post-footer">
            {
                viewComment == false ? null : 
                <CommentComponent props={props.props} fetch={props.fetch}/>
            }
        </div>        
    </div>
    </div>
  )
}

export default PostComponent