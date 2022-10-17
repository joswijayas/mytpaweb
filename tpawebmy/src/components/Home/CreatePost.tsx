import { useMutation, useQuery } from '@apollo/client'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseCurrentUser } from '../../Context/UserContext'
import { storage } from '../../firebase'
import { QUERY_ADD_HASHTAG, QUERY_CREATE_POST, QUERY_GET_CONNECTIONS, QUERY_GET_HASHTAGS } from '../../queris'
import { MentionsInput, Mention, SuggestionDataItem } from "react-mentions";
import './home.scss'
import { mentionInputPostStyle, mentionStyle } from './stylehelp'
import { HashtagRichText1, HashtagRichText2 } from './helpRT'
function CreatePost  (props:any) {
  const {getUser} = UseCurrentUser()
  const navigate = useNavigate()
  const [viewCreatePost, setViewCreatePost] = useState(false)
  const [error, setError] = useState('')
  const [functionCreatePost, {data: dataCP, loading: loadingCP, error: errorCP}] = useMutation(QUERY_CREATE_POST)
  const {loading: loadingCon, error: errorCon, data: dataCon, refetch: ConRefetch} = useQuery(QUERY_GET_CONNECTIONS, {variables : {id: getUser().id},})
  const {loading: loadingHashtag, data: dataHashtag, error: errorHashtag, refetch: refetchHashtag} = useQuery(QUERY_GET_HASHTAGS);
  const [functionAddHashtag] = useMutation(QUERY_ADD_HASHTAG)
  if(getUser()==null || loadingCon || loadingHashtag){
    return <h1>Fetching...</h1>
  }

  // console.log(dataCon.user.Connections)
  // console.log(dataHashtag)

  const ViewCreatePost = ()=>{
    const [text, setText] = useState("");
    const [localUrl, setLocalUrl] = useState({
      type: "",
      url: "",
    });
    const [removeFileStyle, setRemoveFileStyle] = useState("none");
    const [file, setFile] = useState<File>();
    const [textAreaField, setTextAreaField] = useState('')
    const handleInputFile = (e: any, inputType: string)=>{
      console.log(e.target.file)
      const fileUrl = URL.createObjectURL(e.target.files[0])
      let type = e.target.files[0].type
      let splitting = type.split("/")
      if(inputType === splitting[0]){
        setLocalUrl({
          type: inputType,
          url: fileUrl
        });
        if (localUrl.url === "") {
          setRemoveFileStyle("none");
        } else {
          setRemoveFileStyle("block");
        }

        setFile((e.target.files as FileList)[0] as File)
      }
      else{
        setError('Please input vidio/image!')
      }

    }

    useEffect(() => {
      if (localUrl.url === "") {
        setRemoveFileStyle("none");
      } else {
        setRemoveFileStyle("block");
      }
    }, [localUrl.url]);
    const handleRemovePost = ()=>{
      console.log('masuk')
      setLocalUrl({ type: "", url: "" });
      setFile(undefined);
    }
    const handleCreatePost =async ()=>{
      if(textAreaField == ""){
        console.log('hjahahaaaiai')
        setError('Text must be filled');
      }
      else{
          let url = ""

          const texts = textAreaField.split(" ")
          texts.map((inputText)=>{
            if(inputText.match(HashtagRichText1) && !inputText.match(HashtagRichText2)){
              const hashtagSubstring = inputText.substring(1, inputText.length)
              console.log(hashtagSubstring)
              functionAddHashtag({
                variables:{
                  hashtag: hashtagSubstring
                }
              })
            }
          })

          if( file !== undefined){
            const docRef = ref(storage, `/image/${(file as File).name}`)
            const metadata = {
              contentType: 'image'
            }
            try {
              await uploadBytes(docRef, file as File, metadata).then(async (e)=>{
                await getDownloadURL(docRef).then((uploadUrl)=>{
                    console.log(uploadUrl)
                    url = uploadUrl
                })
            })
            } catch (error:any) {
              console.log(error.message)
            }
          }

          if(localUrl.type === "image"){
            const input={
              "senderId": getUser().id,
              "text": textAreaField,
              "photoUrl": url,
              "videoUrl": ""
            }
            functionCreatePost({
              variables:{
                "input": input
              }
            }).catch((e)=>{
              console.log(e.message)
            })
          }else{
            const input={
              "senderId": getUser().id,
              "text": textAreaField,
              "photoUrl": "",
              "videoUrl": url
            }
            functionCreatePost({
              variables:{
                "input": input
              }
            }).catch((e)=>{
              console.log(e.message)
            })
          }
          setViewCreatePost(!viewCreatePost)
          props.fetch()
          refetchHashtag()
          window.location.reload();
        }
    }

    const mentionDatas: SuggestionDataItem[] = [];
    dataCon.user.Connections.map((data: any)=>{
      let dataM: SuggestionDataItem = {id: "", display: ""}
      let at: string = "@"
      if(data.user1.id != getUser().id){
        dataM.id = data.user1.id;
        dataM.display = at.concat(data.user1.firstName).concat(data.user1.lastName)
        mentionDatas.push(dataM)
      }else if(data.user2.id != getUser().id){
        dataM.id = data.user2.id;
        dataM.display = at.concat(data.user2.firstName).concat(data.user2.lastName)
        mentionDatas.push(dataM)
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

    const handleChangeText = (e: any, newValue: any) => {
      setText(e.target.value);
      setTextAreaField(newValue);
    };

    useEffect(()=>{

    }, [text])

    return(
      <>
        {
          viewCreatePost == false ? null :
                <div className="popup">
                    <div className="popup-box">
                    <div className="popup-top">
                        <label htmlFor="">Create a Post</label>
                        <button onClick={()=>{setViewCreatePost(!viewCreatePost)}}>&#10006;</button>
                    </div>
                    <div className="popup-main">
                      <div className="popup-main-component">
                          <h5 className='error-message'>{error}</h5>
                      </div>
                      <div className="popup-main-component">
                          <img src={getUser().profilePicture} alt="" className="home-photo-profile" />
                          <h4>{getUser().name}</h4>
                      </div>
                      
                      {/* <textarea onChange={(e)=>setTextAreaField(e.target.value)} placeholder='What do you want to talk about?' className='exp-desc-c' ></textarea> */}
                      
                        <div>
                        <MentionsInput 
                      id="test-rich-text"
                      value={text}
                      style={{
                        width: "100%",
                        height: "150px",
                        ...mentionInputPostStyle,
                      }}
                      onChange={handleChangeText} 
                        placeholder="What do you want to talk about?">
                          <Mention trigger="@" data={mentionDatas} style={mentionStyle} />
                          <Mention trigger="#" data={hashtagDatas} style={mentionStyle} />
                      </MentionsInput>
                        </div>

                        {localUrl.url === "" ? null : localUrl.type === "image" ? (
                          <img src={localUrl.url} className="preview-img" alt="" />
                        ) : (
                          <video controls={true} className='preview-vidio' src={localUrl.url}></video>
                        )}
                    </div>
                    <div className="bottom-popup">
                        <div>
                          <label htmlFor="input-image"><i className="fa-solid fa-image"/></label>
                          <input onChange={(e)=>handleInputFile(e, "image")} type="file" name="" id="input-image" style={{ display: "none" }}/>
                        </div>
                        <div>
                          <label htmlFor="input-vidio"><i className="fa-solid fa-film"></i></label>
                          <input onChange={(e)=>handleInputFile(e, "video")} type="file" name="" id="input-vidio" style={{ display: "none" }}/>
                        </div>
                        <button className='all-button' onClick={handleRemovePost}>Remove</button>
                        <button className='all-button' onClick={handleCreatePost}>Post</button>
                        
                    </div>
                    </div>  
                </div>
        }
      </>
    )
  }

  return (
    <div>
        <ViewCreatePost/>
        <div className="create-post-component">
            <img src={getUser().profilePicture} alt="" className="home-photo-profile" onClick={()=>{navigate(`/MainPage/Profile/${getUser().id}`)}} />
            <button  onClick={()=>setViewCreatePost(!viewCreatePost)} className='create-post-button'>Have a topic that excites you? Post about it</button>
        </div>
    </div>
  )
}

export default CreatePost