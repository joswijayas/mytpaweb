import { useMutation } from '@apollo/client'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseCurrentUser } from '../../Context/UserContext'
import { storage } from '../../firebase'
import { QUERY_CREATE_POST } from '../../queris'

function CreatePost  () {
  const {getUser} = UseCurrentUser()
  const navigate = useNavigate()
  const [viewCreatePost, setViewCreatePost] = useState(false)
  const [error, setError] = useState('')
  const [functionCreatePost, {data: dataCP, loading: loadingCP, error: errorCP}] = useMutation(QUERY_CREATE_POST)
  if(getUser()==null){
    return <h1>Fetching...</h1>
  }

  const ViewCreatePost = ()=>{
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
      let url = ""
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
      
    }
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
                          <img src={getUser().profilePicture} alt="" className="home-photo-profile" />
                          <h4>{getUser().name}</h4>
                      </div>
                      
                      <textarea onChange={(e)=>setTextAreaField(e.target.value)} placeholder='What do you want to talk about?' className='exp-desc-c' ></textarea>
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