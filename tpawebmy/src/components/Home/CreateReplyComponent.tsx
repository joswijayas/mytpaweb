import { useMutation, useQuery } from '@apollo/client'
import React, {useState} from 'react'
import { UseCurrentUser } from '../../Context/UserContext'
import { QUERY_ADD_HASHTAG, QUERY_GET_CONNECTIONS, QUERY_GET_HASHTAGS } from '../../queris'
import './createreplycomponentstyle.scss'
import { MentionsInput, Mention, SuggestionDataItem } from "react-mentions";
import { mentionInputPostStyle, mentionStyle } from './stylehelp'
import { HashtagRichText1, HashtagRichText2 } from './helpRT'
import { QUERY_GET_COMMENT_REPLY, QUERY_REPLY_COMMENT } from '../../getquery'
import ReplyComponent from './ReplyComponent'
const CreateReplyComponent = (props:any) => {
    // console.log(props.props.id)
    const {getUser}=UseCurrentUser()
    const [inputText, setInputText] = useState('')
    const {loading: loadingCon, error: errorCon, data: dataCon, refetch: ConRefetch} = useQuery(QUERY_GET_CONNECTIONS, {variables : {id: getUser().id},})
    const {loading: loadingHashtag, data: dataHashtag, error: errorHashtag, refetch: refetchHashtag} = useQuery(QUERY_GET_HASHTAGS);
    const [functionAddHashtag] = useMutation(QUERY_ADD_HASHTAG)
    const [hasMoreComment, setHasMoreComment] = useState(true);
    const [functionAddReplyComment] = useMutation(QUERY_REPLY_COMMENT)
    const {loading: loadingCR, data: dataCR, error: errorCR, refetch: refetchCR, fetchMore: fetchMoreCR} = useQuery(QUERY_GET_COMMENT_REPLY, {
        variables : {
            "Limit": 2,
            "Offset": 0,
            "commentId": props.props.id
        },
    })
    const [msg, setMsg] = useState('')
    if(loadingCon || loadingHashtag || loadingCR){
        return <h1>Fetching...</h1>
    }

    console.log(dataCR)

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

    const handleReplyComment = ()=>{
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
            functionAddReplyComment({
                variables:{
                    commentSenderId: getUser().id,
                    postId: props.props.postId,
                    replyCommentId: props.props.id,
                    comment: inputText
                }
            }).then(()=>{
                props.fetch()
                refetchHashtag()
                setInputText('')
            }).then(()=>{
                refetchCR()
                // setMsg('')
            }).then(()=>{
                props.fetch()
            }).then(()=>{
                props.fetch2()
            })
        }
    }

    const clickMoreReply = ()=>{
        // console.log("jaijws")
        fetchMoreCR({
            
            variables: {Offset: dataCR.commentReply.length},
            updateQuery: (previousResult, {fetchMoreResult})=>{
                // console.log('wdwd')
                // console.log((fetchMoreResult.commentReply.length +
                //     previousResult.commentReply.length))
                // console.log(dataCR.commentReply.length)
                if (
                    fetchMoreResult.commentReply.length +
                      previousResult.commentReply.length ===
                      dataCR.commentReply.length
                  ) {
                    // console.log('alalal')
                    setHasMoreComment(false);
                  }

                if(!fetchMoreResult.commentReply.length){
                    return previousResult;
                }
                else {
                    console.log(fetchMoreResult.commentReply.length +
                        previousResult.commentReply.length)
                   
                    return {
                        
                        commentReply: [
                          ...previousResult.commentReply,
                          ...fetchMoreResult.commentReply,
                        ],
                      
                    };
                  }
            }
        }).catch((e)=>{
            console.log(e.message)
            setMsg(e.message)
        })
    }
    
    return (
    <div className='reply-component'>
        <div className="create-reply-comment">
            <img className='reply-profile-picture' src={getUser().profilePicture} alt="" />
            <MentionsInput 
                id="create-comment-input"
                value={inputText}
                style={{
                width: "175px",
                height: "40px",
                ...mentionInputPostStyle,
                }}
                onChange={(e:any)=>setInputText(e.target.value)} 
                placeholder="Add a reply...">
                    <Mention trigger="@" data={mentionDatas} style={mentionStyle} />
                    <Mention trigger="#" data={hashtagDatas} style={mentionStyle} />
            </MentionsInput>
            <button onClick={handleReplyComment}>Send</button>
        </div>
        <div className="all-reply-comment">
        {
                dataCR === (null||undefined) ?
                null:
               
                dataCR.commentReply.map((e:any)=>{
                //    return <PostComment props={e} fetch={PCRefetch}/>
                    return <ReplyComponent props={e} fetch={refetchCR} fetch2 = {props.fetch} fetch3 = {props.fetch2}/>
                })
            }
            {/* <h5>eheh</h5> */}
            {
                
                    // (dataPC == "undefined" || dataPC.postComments == "undefined") == true ?
                    // null :
                    // null
                (msg === "comment empty" || dataCR === "undefined" ) == true ?
                null :
                (dataCR === "undefined" || hasMoreComment === false?
                null:
                <button onClick={clickMoreReply} className='see-more'>See more</button>)
                // (msg != "comment empty" &&  dataPC !== "undefined" && dataPC.postComments !== "undefined") == true?
                // <button className='see-more' onClick={clickMoreComment}>See more</button>:
                // null    
            }
        </div>
    </div>
  )
}

export default CreateReplyComponent