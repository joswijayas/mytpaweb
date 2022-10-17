import { useMutation, useQuery } from '@apollo/client';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { UseCurrentUser } from '../../Context/UserContext';
import { QUERY_GET_COMMENT_REPLY, QUERY_LIKE_COMMENT, QUERY_UNLIKE_COMMENT } from '../../getquery';
import CreateReplyComponent from './CreateReplyComponent';
import './postcommentstyle.scss'
import RichTextTemplate from './TemplateRichText'
const PostComment = (props:any) => {
    // console.log(props.props)
    const texts = props.props.commentText?.split(" ");
    const navigate = useNavigate()
    const [functionLikeComment] = useMutation(QUERY_LIKE_COMMENT)
    const [functionUnlikeComment] = useMutation(QUERY_UNLIKE_COMMENT)

    const {getUser} = UseCurrentUser()
    const [viewReply, setViewReply] = useState(false)
    const {loading: loadingRC, error: errorRC, data: dataRC, refetch: RCRefetch, fetchMore: fetchMoreRC} = useQuery(QUERY_GET_COMMENT_REPLY, {
        variables : {
            "Limit": 2,
            "Offset": 0,
            "commentId": props.props.id
        },
    })

    if(loadingRC){
        return <h1>Fetching...</h1>
    }
    // console.log(props.props)
    // console.log(dataRC.commentReply.length)

    const handleLikeComment = ()=>{
        functionLikeComment({
            variables:{
                commentId: props.props.id,
                userId: getUser().id
            }
        }).then(()=>{
            props.fetch2()
        })
    }

    const handleUnlikeComment = ()=>{
        functionUnlikeComment({
            variables: {
                commentId: props.props.id,
                userId: getUser().id
            }
        }).then(()=>{
            props.fetch()
        }).then(()=>{
            props.fetch2()
        })
    }

  return (
    <div className='post-comment-template'>
        <img src={props.props.userComment.profilePicture} alt="" className="post-comment-img" onClick={()=>{navigate(`/MainPage/Profile/${props.props.userComment.id}`)}} />
        <div className="comment-right">
            <div className="comment-right-upper" onClick={()=>{navigate(`/MainPage/Profile/${props.props.userComment.id}`)}}>
                <span className='bold'>{props.props.userComment.name}</span>
                <span className='headline'>{props.props.userComment.headline} || {props.props.userComment.position}</span>
            </div>
            <div className="comment-right-lower">
                <RichTextTemplate texts={texts}/>
            </div>
            <div className="icon-comment">
        
            {
                (props.props.Likes.filter((e:any)=>e.User.id === getUser().id)).length > 0 ? 
                <svg onClick={handleUnlikeComment} className='icons' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{width:"30px", height:"30px", color:"red"}}>
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                :
                <svg onClick={handleLikeComment} className='icons'  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:"30px", height:"30px"}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            
            }
                    
                <div className="count">
                {props.props.Likes.length}
                </div>
                    
            <svg onClick={()=>{setViewReply(!viewReply)}} className='icons' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{width:"30px", height:"30px"}}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>
                {/* <div className="count">
                {props.props.Replies.length}
                </div> */}

            </div>
            {
                viewReply == false ? null:
                <CreateReplyComponent props={props.props} fetch={props.fetch}/>
            }
        </div>
    </div>
  )
}

export default PostComment