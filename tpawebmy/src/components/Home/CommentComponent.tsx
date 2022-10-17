import React, { useEffect, useState } from 'react'
import { UseCurrentUser } from '../../Context/UserContext'
import './comment_style.scss'
import { MentionsInput, Mention, SuggestionDataItem } from "react-mentions";
import { mentionInputPostStyle, mentionStyle } from './stylehelp'
import { HashtagRichText1, HashtagRichText2 } from './helpRT'
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ADD_COMMENT, QUERY_ADD_HASHTAG, QUERY_GET_CONNECTIONS, QUERY_GET_HASHTAGS, QUERY_GET_POST_COMMENTS } from '../../queris';
import PostComment from './PostComment';
import { QUERY_ADD_NOTIF } from '../../getquery';
const CommentComponent = (props:any) => {
    const {getUser} = UseCurrentUser()
    const [inputText, setInputText] = useState('')
    const {loading: loadingCon, error: errorCon, data: dataCon, refetch: ConRefetch} = useQuery(QUERY_GET_CONNECTIONS, {variables : {id: getUser().id},})
    const {loading: loadingHashtag, data: dataHashtag, error: errorHashtag, refetch: refetchHashtag} = useQuery(QUERY_GET_HASHTAGS);
    const [functionAddComment] = useMutation(QUERY_ADD_COMMENT)
    const [functionAddHashtag] = useMutation(QUERY_ADD_HASHTAG)
    const [hasMoreComment, setHasMoreComment] = useState(true);
    const [functionAddNotif, {data: dataAN, loading: loadingAN, error: errorAN}] = useMutation(QUERY_ADD_NOTIF)
    const [msg, setMsg] = useState('')
    const {loading: loadingPC, error: errorPC, data: dataPC, refetch: PCRefetch, fetchMore: fetchMorePC} = useQuery(QUERY_GET_POST_COMMENTS, {
        variables : {
            "Limit": 2,
            "Offset": 0,
            "postId": props.props.id
        },
    })
    const [fetchLength, setFetchLength] = useState(-1)
    if(getUser()==null || loadingCon || loadingHashtag || loadingPC ){
        return <h1>Fetching...</h1>
      }

    //   console.log(props.props)
    // console.log(dataPC.postComments)

    
    const mentionDatas: SuggestionDataItem[] = [];
    dataCon.user.Connections.map((data: any)=>{
        let dataM: SuggestionDataItem = {id: "", display: ""}
        let at: string = "@"
        if(data.user1.id != getUser().id){
            dataM.id = data.user1.id;
            dataM.display = at.concat(data.user1.firstName).concat(data.user1.lastName)
            if(dataM.display == null){

            }else{
                mentionDatas.push(dataM)
            }
        }else if(data.user2.id != getUser().id){
            dataM.id = data.user2.id;
            dataM.display = at.concat(data.user2.firstName).concat(data.user2.lastName)
            if(dataM.display == null){

            }else{
                mentionDatas.push(dataM)
            }
        }
    })
    
    const hashtagDatas: SuggestionDataItem[] = [];
    dataHashtag.Hashtags.map((hashtag: any)=>{
        let dataH: SuggestionDataItem = {id: "", display: ""}
        let at: string = "#";
        dataH.id = at.concat(hashtag.id)
      dataH.display = at.concat(hashtag.hashtag)
      hashtagDatas.push(dataH)
    })

    const handleCreateComment = ()=>{

        if(inputText === ""){

        }
        else{
            const texts = inputText.split(" ")
            texts.map((inputTexts:any)=>{
                if(inputTexts.match(HashtagRichText1) && !inputTexts.match(HashtagRichText2)){
                const hashtagSubstring = inputTexts.substring(1, inputTexts.length)
                // console.log(hashtagSubstring)
                functionAddHashtag({
                    variables:{
                    hashtag: hashtagSubstring
                    }
                })
                }
            })
            functionAddComment({
                variables:{
                    postId: props.props.id,
                    commentSenderId: getUser().id,
                    comment: inputText
                }
            }).then(()=>{
                refetchHashtag()
                setInputText('')
            }).then(()=>{
                PCRefetch()
                setMsg('')
            }).then(()=>{
                props.fetch()
            }).then(()=>{
                functionAddNotif({
                    variables:{
                        toUserId: props.props.Sender.id,
                        fromUserId: getUser().id,
                        message: ' comment you post!'
                    }
                })
            })
        }
    }

    const clickMoreComment = ()=>{
        // console.log("jaijws")
        fetchMorePC({
            
            variables: {Offset: dataPC.postComments.length},
            updateQuery: (previousResult, {fetchMoreResult})=>{
                // console.log('wdwd')
                // console.log((fetchMoreResult.postComments.length +
                //     previousResult.postComments.length))
                // console.log(dataPC.postComments.length)
                if (
                    fetchMoreResult.postComments.length +
                      previousResult.postComments.length ===
                      dataPC.postComments.length
                  ) {
                    setHasMoreComment(false);
                  }

                if(!fetchMoreResult.postComments.length){
                    return previousResult;
                }
                else {
                    console.log(fetchMoreResult.postComments.length +
                        previousResult.postComments.length)
                    setFetchLength((fetchMoreResult.postComments.length +
                        previousResult.postComments.length))
                    return {
                        
                        postComments: [
                          ...previousResult.postComments,
                          ...fetchMoreResult.postComments,
                        ],
                      
                    };
                  }
            }
        }).catch((e)=>{
            console.log(e.message)
            setMsg(e.message)
        })
    }
    // console.log(dataPC)
    // console.log(fetchLength)
    return (
    <div>
        <div className="create-comment">
            <img className='create-comment-profile-picture' src={getUser().profilePicture} alt="" />
            {/* <input onChange={(e)=>setInputText(e.target.value)} placeholder='Add a comment...' type="text" /> */}
            <MentionsInput 
                id="create-comment-input"
                value={inputText}
                style={{
                width: "100%",
                height: "40px",
                ...mentionInputPostStyle,
                }}
                onChange={(e:any)=>setInputText(e.target.value)} 
                placeholder="Add a comment...">
                    <Mention trigger="@" data={mentionDatas} style={mentionStyle} />
                    <Mention trigger="#" data={hashtagDatas} style={mentionStyle} />
            </MentionsInput>
            <button onClick={handleCreateComment}>Send</button>
        </div>
        <div className="post-comment">
           {
                dataPC === (null||undefined) ?
                null:
               
                dataPC.postComments.map((e:any)=>{
                   return <PostComment props={e} fetch={props.fetch} fetch2={PCRefetch}/>
                })
            }
            {/* <h5>eheh</h5> */}
            {
                
                    // (dataPC == "undefined" || dataPC.postComments == "undefined") == true ?
                    // null :
                    // null
                (msg === "comment empty" || dataPC === "undefined" ) == true ?
                null :
                (dataPC === "undefined" ?
                null:
                <button className='see-more' onClick={clickMoreComment}>See more</button>)
                // (msg != "comment empty" &&  dataPC !== "undefined" && dataPC.postComments !== "undefined") == true?
                // <button className='see-more' onClick={clickMoreComment}>See more</button>:
                // null    
            }
        </div>
    </div>
  )
}

export default CommentComponent