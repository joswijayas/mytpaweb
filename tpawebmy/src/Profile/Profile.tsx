import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavbarComponent from '../components/navigationbar/navbarcomponent/NavbarComponent'
import Education from './Education'
import Experience from './Experience'
import { UseCurrentUser } from '../Context/UserContext'
import { GET_USER } from '../getquery'
import { QUERY_ADD_EDUCATION, QUERY_ADD_EXPERIENCE, QUERY_CONNECT_REQUEST, QUERY_DELETE_CONNECTION_REQUEST, QUERY_GET_CONNECTIONS, QUERY_GET_EDUCATION, QUERY_GET_EXPERIENCE, QUERY_GET_USER, QUERY_PENDING_OR_NO, QUERY_UPDATE_ABOUT, QUERY_UPDATE_BACKGROUND_IMG, QUERY_UPDATE_PROFILE, QUERY_UPDATE_PROFILE_IMG } from '../queris'
import '../styles/profile.scss'
import "../styles/_variable.scss";
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { updateDoc } from '@firebase/firestore'

const Profile = () => {
  const {getUser} = UseCurrentUser()
  const {id} = useParams()
  const [editAbout, setEditAbout] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [viewAddExperience, setViewAddExperience] = useState(false)
  const [viewAddEducation, setViewAddEducation] = useState(false)
  const [newAbout, setNewAbout] = useState('')
  const [functionUpdateAbout, {data, loading, error}] = useMutation(QUERY_UPDATE_ABOUT)
  const [functionUpdateProfileImg, {data: dataPImg, loading: loadingPImg, error: errorPImg}] = useMutation(QUERY_UPDATE_PROFILE_IMG)
  const [functionUpdateBgImg, {data: dataBgImg, loading: loadingBgImg, error: errorBgImg}] = useMutation(QUERY_UPDATE_BACKGROUND_IMG)
  const [functionUpdateProf, {data: dataProf, loading: loadingProf, error: errorProf}] = useMutation(QUERY_UPDATE_PROFILE)
  const navigate = useNavigate()
  // console.log(getUser().id)
  const [functionAddExperience, {data: dataExp, loading: loadingExp, error: errorExp}] = useMutation(QUERY_ADD_EXPERIENCE)
  const [functionAddEducation, {data: dataEdu, loading: loadingEdu, error: errorEdu}] = useMutation(QUERY_ADD_EDUCATION)
  const [functionConnectRequest, {data: dataCR, loading: loadingCR, error: errorCR}] = useMutation(QUERY_CONNECT_REQUEST)
  const [functionDeleteConnectRequest, {data: dataDCR, loading: loadingDCR, error: errorDCR}] = useMutation(QUERY_DELETE_CONNECTION_REQUEST)
  const paramsID = useParams()
  const {loading: loadingV, error: errorV, data: dataV, called, refetch : currentUserRefecth} = useQuery(QUERY_GET_USER, {variables : {id: paramsID.id},})
  const {loading: loadingGetExp, error: errorGetExp, data: dataGetExp, refetch : expRefetch} = useQuery(QUERY_GET_EXPERIENCE, {variables : {id: paramsID.id},})
  const {loading: loadingEd, error: errorEd, data: dataEd, refetch: edRefetch} = useQuery(QUERY_GET_EDUCATION, {variables : {id: paramsID.id},})
  const {loading: loadingUserID, error: errorUserID, data: dataUserID, refetch: userIDRefetch} = useQuery(QUERY_GET_USER, {variables : {id: paramsID.id},})
  const {loading: loadingPON, error: errorPON, data: dataPON, refetch: PONRefetch} = useQuery(QUERY_PENDING_OR_NO, {variables : {id: paramsID.id},})
  const {loading: loadingCon, error: errorCon, data: dataCon, refetch: ConRefetch} = useQuery(QUERY_GET_CONNECTIONS, {variables : {id: getUser().id},})
  const {checkLoginToken, setUserToLocalStorage, setUserToLocalStorageAfterRefetch} = UseCurrentUser()
  const [viewUpdateProfileImg, setUpdateProfileImg] = useState(false)
  const [viewUpdateBgImage, setUpdateBgImage] = useState(false)
  const [viewEditProfile, setViewEditProfile] = useState(false)
  const [viewCancelPending, setViewCancelPending] = useState(false)

  // console.log(paramsID.id)
  if(loadingUserID || loadingPON || loadingCon){
    return <h1>Fetching...</h1>
  }
  if(getUser() == null){
    return <h1>Fetching...</h1>
  }
  console.log((dataCon.user.Connections.filter((e:any)=>e.user1.id === paramsID.id)).length > 0 || (dataCon.user.Connections.filter((e:any)=>e.user2.id === paramsID.id)).length > 0)
  // console.log(dataUserID.user)
  // console.log(dataPON.user.ConnectionRequests)
  // console.log((dataPON.user.ConnectionRequests.filter((e:any)=>e.sender.id === getUser().id)).length > 0)
  const userData = ()=>{
    return paramsID.id == getUser().id ? getUser() : dataUserID.user
  }

  if(!loadingGetExp){
    // console.log(dataGetExp)
  }
  if(loadingEd){
    return <h1>Fetching...</h1>
  }

  // useEffect(()=>{
  //   // PONRefetch()
  //   // ConRefetch()
  // })

  const handleUpdateAbout = (aboutNew:any)=>{
      // console.log("aaa")

        functionUpdateAbout({
            variables: {
                id: getUser().id,
                about: aboutNew,
            }
        }).then(()=>{
            currentUserRefecth().then((x)=>{
              // console.log(x)
              setUserToLocalStorageAfterRefetch(x.data.user)
            })
            
        }).catch((e)=>{
            console.log(e.message)
        })

      setEditAbout(!editAbout)
        
  }

  const ViewUpdateAbout = ()=>{
    const [aa, setAa] = useState("")
    const handleChangeAbout = (e:any)=>{
      setAa(e)
      // console.log(aa)
    }
    return(
      <>
        {
          editAbout == false ? 
          null :
          <div className="popup">
            <div className="popup-box">
              <div className="popup-top">
                <label htmlFor="">Edit about</label>
                <button onClick={()=>{setEditAbout(!editAbout)}}>&#10006;</button>
              </div>
              <div className="popup-main">
                <label htmlFor="">*Indicates required</label>
                <br />
                <label htmlFor="">You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.
                </label>
                <br />
                <textarea onChange={(e)=>handleChangeAbout(e.target.value)} 
                 ></textarea>
              </div>
              <div className="popup-bottom">
                <button className='all-button' onClick={()=>{handleUpdateAbout(aa)}}>Save</button>
              </div>
            </div>  
          </div>
        }
      </>
    )
  }


  const ViewAddExperience = ()=>{
    const [titleExp, setTitleExp] = useState('')
    const [companyExp, setCompanyExp] = useState('')
    const [empType, setEmpType] = useState('')
    const [locExp, setLocExp] = useState('')
    const [industryExp, setIndustryExp] = useState('')
    const [descExp, setDescExp] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [profileImg, setProfileImg] = useState('')

    const handleTitleExp = (e:any)=>{
      setTitleExp(e)
      }

    const handleAddExp = ()=>{
      const [aS, bS] = startDate.split('-')
      const [aE, bE] = endDate.split('-')
      var yStart = parseInt(aS)
      var mStart = parseInt(bS)
      var yEnd = parseInt(aE)
      var mEnd = parseInt(bE)
      if((yEnd - yStart) < 0){
        setErrorMsg('Check you date correctly')
      }else if((yEnd - yStart)==0 && mEnd-mStart < 0){
        setErrorMsg('Check you date correctly')
      }else{
        setErrorMsg('')
      }
      var yStartName = yStart.toString()
      var yEndName = yEnd.toString()
      // console.log(mStart, yStartName, mEnd, yEndName)
      var mStartName;
      var mEndName;

      if(mStart == 1){
        mStartName = "January"
      }else if(mStart == 2){
        mStartName = "February"
      }else if(mStart == 3){
        mStartName = "March"
      }else if(mStart == 4){
        mStartName = "April"
      }else if(mStart == 5){
        mStartName = "May"
      }else if(mStart == 6){
        mStartName = "June"
      }else if(mStart == 7){
        mStartName = "July"
      }else if(mStart == 8){
        mStartName = "August"
      }else if(mStart == 9){
        mStartName = "September"
      }else if(mStart == 10){
        mStartName = "October"
      }else if(mStart == 11){
        mStartName = "November"
      }else if(mStart == 12){
        mStartName = "December"
      }

      if(mEnd == 1){
        mEndName = "January"
      }else if(mEnd == 2){
        mEndName = "February"
      }else if(mEnd == 3){
        mEndName = "March"
      }else if(mEnd == 4){
        mEndName = "April"
      }else if(mEnd == 5){
        mEndName = "May"
      }else if(mEnd == 6){
        mEndName = "June"
      }else if(mEnd == 7){
        mEndName = "July"
      }else if(mEnd == 8){
        mEndName = "August"
      }else if(mEnd == 9){
        mEndName = "September"
      }else if(mEnd == 10){
        mEndName = "October"
      }else if(mEnd == 11){
        mEndName = "November"
      }else if(mEnd == 12){
        mEndName = "December"
      }

      


      const input = {
        "userId": getUser().id,
        "title": titleExp,
        "employmentType": empType,
        "companyName": companyExp,
        "location": locExp,
        "isActive": false,
        "industry": industryExp,
        "monthStartDate": mStartName,
        "monthEndDate": mEndName,
        "yearStartDate": yStartName,
        "yearEndDate": yEndName,
        "profileHeadline": profileImg,
        "description": descExp
      }

      console.log(input.profileHeadline)

      try {
        functionAddExperience({
          variables: {
            input: input
        }}).then(()=>{
          // console.log("aaaaalksaxhjcljkwdhclikwhdc")
          try {
            expRefetch()
          } catch (error) {
            console.log(error)
          }
          setViewAddExperience(!viewAddExperience)
        })
      } catch (error) {
        // console.log('jajaja')
        console.log(error)
      }

    }

    const handleUploadImage = (e:any)=>{
      const fileName = e.files[0].name
      if(e.files[0].type == "image/png" || e.files[0].type == "image/jpeg" || e.files[0].type == "image/jpg"){
        const docRef = ref(storage, `/image/${fileName}`)
        const metadata = {
          contentType: 'image'
        }
        try {
          uploadBytes(docRef, e.files[0], metadata).then((e)=>{
            getDownloadURL(docRef).then((uploadUrl)=>{
                console.log(uploadUrl)
                setProfileImg(uploadUrl)
            })
        })
        } catch (error:any) {
          console.log(error.message)
        }
      }else{
        setErrorMsg('Make sure file is image!')
      }
    }

    return(
      <>
        {
          viewAddExperience == false ? 
          null :
          <div className="popup">
            <div className="popup-box">
              <div className="popup-top">
                <label htmlFor="">Add experience</label>
                <button onClick={()=>{setViewAddExperience(!viewAddExperience)}}>&#10006;</button>
              </div>
              <div className="popup-main">
                  <input onChange={(e)=>{handleUploadImage(e.target)}}type="file" name="" id="" />
                  <div className="tag-input">
                    <label htmlFor="">Title*</label>
                    <input value={titleExp} type="text" className='title-experience' onChange={(e)=>{handleTitleExp(e.target.value)}}/>
                    {/* <br /> */}
                  </div>
                  
                  <label htmlFor="">Employment type</label>
                  <select name="employment-type" id="employment-type" onChange={(e)=>{setEmpType(e.target.value)}}>
                    <option value="-">-</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                    <option value="Seasonal">Seasonal</option>
                    <option value="Self-employed">Self-employed</option>
                  </select>
                  
                  <label htmlFor="">Company name*</label>
                  <input value={companyExp} type="text" className='title-experience' onChange={(e)=>{setCompanyExp(e.target.value)}}/>
                  
                  <label htmlFor="">Location*</label>
                  <input value={locExp} type="text" className='title-experience' onChange={(e)=>{setLocExp(e.target.value)}}/>
                  
                  <label htmlFor="">Industry*</label>
                  <input value={industryExp} type="text" className='title-experience' onChange={(e)=>{setIndustryExp(e.target.value)}}/>
                  
                  <label htmlFor="">Description*</label>
                  <textarea value={descExp} className='exp-desc' onChange={(e)=>{setDescExp(e.target.value)}}></textarea>
                  <label htmlFor="" className='error-msg'>{errorMsg}</label>
                  <label htmlFor="">Start date*</label>
                  <input type="month" onChange={(e)=>{setStartDate(e.target.value)}}/>

                  <label htmlFor="">End date*</label>
                  <input type="month" onChange={(e)=>{setEndDate(e.target.value)}}/>  
              </div>
              <div className="popup-bottom">
                <button className='all-button' onClick={handleAddExp}>Add</button>
              </div>
            </div>  
          </div>
        }
      </>
    )
  }

  const handleLogout = ()=>{
    navigate('/Login')
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  const ViewAddEducation = ()=>{
    const [school, setSchool] = useState('')
    const [degree, setDegree] = useState('')
    const [fieldOfStudy, setFieldOfStudy] = useState('')
    const [startYear, setStartYear] = useState(2022)
    const [endYear, setEndYear] = useState(2022)

    const handleSchool = (e:any)=>{
      setSchool(e)
    }

    const input = {
      "userId": getUser().id,
      "school": school,
      "degree": degree,
      "fieldOfStudy": fieldOfStudy,
      "startYear": startYear,
      "endYear": endYear
    }

    const handleAddEdu = ()=>{
      try {
        functionAddEducation({
          variables: {
            input: input
        }}).then(()=>{
          try {
            edRefetch()
          } catch (error) {
            console.log(error)
          }
          setViewAddEducation(!viewAddEducation)
        })
      } catch (error) {
        console.log(error)
      }
    }

    return(
      <>
        {
          viewAddEducation == false ? 
          null :
          <div className="popup">
            <div className="popup-box">
              <div className="popup-top">
                <label htmlFor="">Add education</label>
                <button onClick={()=>{setViewAddEducation(!viewAddEducation)}}>&#10006;</button>
              </div>
              <div className="popup-main">
                  {/* <input onChange={(e)=>{handleUploadImage(e.target)}}type="file" name="" id="" /> */}
                  <div className="tag-input">
                    <label htmlFor="">School</label>
                    <input value={school} type="text" className='title-experience' onChange={(e)=>{handleSchool(e.target.value)}}/>
                    {/* <br /> */}
                  </div> 
                  
                  <label htmlFor="">Degree</label>
                  <input value={degree} type="text" className='title-experience' onChange={(e)=>{setDegree(e.target.value)}}/>
                  
                  <label htmlFor="">Field of Study</label>
                  <input value={fieldOfStudy} type="text" className='title-experience' onChange={(e)=>{setFieldOfStudy(e.target.value)}}/>
                  
                  <label htmlFor="">Start Year</label>
                  <input value={startYear} type="number" id="quantity" name="quantity" min="1950" max="3000" onChange={(e)=>{setStartYear(parseInt(e.target.value))}}></input>

                  <label htmlFor="">End Year</label>
                  <input value={endYear} type="number" id="quantity2" name="quantity2" min="1950" max="3000" onChange={(e)=>{setEndYear(parseInt(e.target.value))}}></input>

              </div>
              <div className="popup-bottom">
                <button className='all-button' onClick={handleAddEdu}>Add</button>
              </div>
            </div>  
          </div>
        }
      </>
    )
  }

  if(loadingGetExp){
    return(
      <h1>Fetching...</h1>
    )
  }

  

  const ViewUpdateProfileImage = ()=>{

    const [profileImage, setProfileImage] = useState('')

    const handleUpdateProfileImg = async (e:any)=>{
      console.log(e.files[0].name)
      console.log(e.files[0].type)

      const fileName = e.files[0].name
      if(e.files[0].type == "image/png" || e.files[0].type == "image/jpeg" || e.files[0].type == "image/jpg"){
        const docRef = ref(storage, `/image/${fileName}`)
        const metadata = {
          contentType: 'image'
        }
        try {
          await uploadBytes(docRef, e.files[0], metadata).then(async (e:any)=>{
            await getDownloadURL(docRef).then((uploadUrl:any)=>{
                console.log(uploadUrl)
                setProfileImage(uploadUrl)
            })
        })
        } catch (error:any) {
          console.log(error.message)
        }
      }else{
        setErrorMsg('Make sure file is image!')
      }
    }

    const handleChangeProfileImg = ()=>{
      console.log(profileImage)
      functionUpdateProfileImg({
          variables: {
              "id": getUser().id,
              "profilePicture": profileImage,
          }
      }).then(()=>{
          currentUserRefecth().then((x)=>{
            // console.log(x)
            setUserToLocalStorageAfterRefetch(x.data.user)
          })
          
      }).catch((e)=>{
          console.log(e.message)
      })

      setUpdateProfileImg(!viewUpdateProfileImg)
    }

    return (
      <>
        {
          viewUpdateProfileImg == false ? null :
          <div className="popup">
            <div className="popup-box">
              <div className="popup-top">
                <label htmlFor="">Upload Profile Picture</label>
                <button onClick={()=>{setUpdateProfileImg(!viewUpdateProfileImg)}}>&#10006;</button>
              </div>
              <div className="popup-main">
                  <input onChange={(e)=>{handleUpdateProfileImg(e.target)}} type="file" name="" id="" />
              </div>
              <div className="popup-bottom">
                <button className='all-button' onClick={handleChangeProfileImg}>Add</button>
              </div>
            </div>  
          </div>
        }
      </>
    )
  }

  const ViewUpdateBgImg = ()=>{

    const [bgImage, setBgImage] = useState('')

    const handleUpdateBgImg = async (e:any)=>{
      console.log(e.files[0].name)
      console.log(e.files[0].type)

      const fileName = e.files[0].name
      if(e.files[0].type == "image/png" || e.files[0].type == "image/jpeg" || e.files[0].type == "image/jpg"){
        const docRef = ref(storage, `/image/${fileName}`)
        const metadata = {
          contentType: 'image'
        }
        try {
          await uploadBytes(docRef, e.files[0], metadata).then(async (e:any)=>{
            await getDownloadURL(docRef).then((uploadUrl:any)=>{
                console.log(uploadUrl)
                setBgImage(uploadUrl)
            })
        })
        } catch (error:any) {
          console.log(error.message)
        }
      }else{
        setErrorMsg('Make sure file is image!')
      }
    }

    const handleChangeBgImg = ()=>{
      console.log(bgImage)
      functionUpdateBgImg({
          variables: {
              "id": getUser().id,
              "backgroundPicture": bgImage,
          }
      }).then(()=>{
          currentUserRefecth().then((x)=>{
            // console.log(x)
            setUserToLocalStorageAfterRefetch(x.data.user)
          })
          
      }).catch((e)=>{
          console.log(e.message)
      })

      setUpdateBgImage(!viewUpdateBgImage)
    }
    // console.log('hahahahaha')
    return (
      <>
        {
          viewUpdateBgImage == false ? null :
          <div className="popup">
            <div className="popup-box">
              <div className="popup-top">
                <label htmlFor="">Upload Background Picture</label>
                <button onClick={()=>{setUpdateBgImage(!viewUpdateBgImage)}}>&#10006;</button>
              </div>
              <div className="popup-main">
                  <input onChange={(e)=>{handleUpdateBgImg(e.target)}} type="file" name="" id="" />
              </div>
              <div className="popup-bottom">
                <button className='all-button' onClick={handleChangeBgImg}>Add</button>
              </div>
            </div>  
          </div>
        }
      </>
    )
  }
  
  // console.log(getUser().backgroundPicture)
  
  const ViewEditProfile = ()=>{
    const [name, setName] = useState(getUser().name)
    const [firstName, setFirstName] = useState(getUser().firstName)
    const [lastName, setLastName] = useState(getUser().lastName)
    const [position, setPosition] = useState(getUser().position)
    const [region, setRegion] = useState(getUser().region)
    const [headline, setHeadline] = useState(getUser().headline)
    const [pronoun, setPronoun] = useState(getUser().pronoun)

    const handleEditProfile = ()=>{
      console.log(name, pronoun, firstName, lastName, position, region, headline)
      
      const input = {
          "name": name,
          "firstName": firstName,
          "lastName": lastName,
          "pronoun": pronoun,
          "headline": headline,
          "position": position,
          "region": region
      }

      console.log(input)

        functionUpdateProf({
          variables: {
              "id": getUser().id,
              "input": input
          }
      }).then(()=>{
          currentUserRefecth().then((x)=>{
            setUserToLocalStorageAfterRefetch(x.data.user)
          })
          
      }).catch((e)=>{
          console.log(e.message)
      })
        setViewEditProfile(!viewEditProfile)
      }

    return(
      <>
        {
          viewEditProfile == false ? null :
          <div className="popup">
            <div className="popup-box">
              <div className="popup-top">
                <label htmlFor="">Add education</label>
                <button onClick={()=>{setViewEditProfile(!viewEditProfile)}}>&#10006;</button>
              </div>
              <div className="popup-main">
                  {/* <input onChange={(e)=>{handleUploadImage(e.target)}}type="file" name="" id="" /> */}
                  <div className="tag-input">
                    <label htmlFor="">Name</label>
                    <input value={name} type="text" className='title-experience' onChange={(e)=>setName(e.target.value)}/>
                    {/* <br /> */}
                  </div> 
                  
                  <label htmlFor="">First Name</label>
                  <input  value={firstName} type="text" className='title-experience' onChange={(e)=>setFirstName(e.target.value)}/>
                  
                  <label htmlFor="">Last Name</label>
                  <input value={lastName} type="text" className='title-experience' onChange={(e)=>setLastName(e.target.value)} />
                  
                  <label htmlFor="">Pronoun</label>
                  <select value={pronoun} name="pronoun" id="pronoun" onChange={(e)=>setPronoun(e.target.value)}>
                    <option value="-">-</option>
                    <option value="He/Him">He/Him</option>
                    <option value="She/Her">She/her</option>
                  </select>

                  <label htmlFor="">Position</label>
                  <input value={position} type="text" className='title-experience' onChange={(e)=>setPosition(e.target.value)} />
                  
                  <label htmlFor="">Region</label>
                  <input value={region} type="text" className='title-experience' onChange={(e)=>setRegion(e.target.value)} />

                  <label htmlFor="">Headline</label>
                  <input value={headline} type="text" className='title-experience' onChange={(e)=>setHeadline(e.target.value)} />

              </div>
              <div className="popup-bottom">
                <button className='all-button' onClick={handleEditProfile}>Edit</button>
              </div>
            </div>
          </div>
        }
      </>
    )
  }

  const handleConnectRequest = ()=>{
      functionConnectRequest({
        variables: {
            "senderId": getUser().id,
            "receiverId": paramsID.id,
            "message": "Hi dear, I would like to connect with you!"
        }
    }).then(async()=>{
        await PONRefetch().then((x)=>{
          console.log(x.data.user.ConnectionRequests)
        })
    }).catch((e)=>{
        console.log(e.message)
    })
  }

  const ViewCancelPending = ()=>{

    const handleCancelPending = ()=>{
      functionDeleteConnectRequest({
        variables:{
          "senderId": getUser().id,
          "receiverId": paramsID.id
        }
      }).then(async()=>{
        await PONRefetch()
      })
      setViewCancelPending(!viewCancelPending)
    }

    return(
      <>
        {
          viewCancelPending == false ? null : 
          <div className="popup">
          <div className="popup-box">
            <div className="popup-top">
              <label htmlFor="">Withdraw invitation</label>
              <button onClick={()=>{setViewCancelPending(!viewCancelPending)}}>&#10006;</button>
            </div>
            <div className="popup-main">
                {/* <input onChange={(e)=>{handleUploadImage(e.target)}}type="file" name="" id="" /> */}
                <button className = "all-button" onClick={handleCancelPending}>Withdraw</button> 

            </div>
            <div className="popup-bottom">
              {/* <button className='all-button' onClick={handleEditProfile}>Edit</button> */}
            </div>
          </div>
        </div>
        }
      </>
    )
  }

  return (
    <div className='top-0'>
        <NavbarComponent/>
        {
          !editAbout ? null :  
          <ViewUpdateAbout/>
        }
        <ViewAddExperience/>
        <ViewAddEducation/>
        <ViewUpdateProfileImage/>
        <ViewUpdateBgImg/>
        <ViewEditProfile/>
        <ViewCancelPending/>
        {/* <React.Fragment><EditAboutShow/></React.Fragment> */}
        <div className="main-profile">
          <div className="left">
            <div className='profile-head'>
              <div className="profileImage">
                {
                  getUser().id == paramsID.id ? 
                  (userData().profilePicture == "" || userData().profilePicture == undefined || userData().profilePicture == null) ?
                    <img onClick={()=>{console.log('zzzzzz');setUpdateProfileImg(!viewUpdateProfileImg)}}src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="" className='profile-img'/>:
                   <img onClick={()=>{setUpdateProfileImg(!viewUpdateProfileImg)}}src={userData().profilePicture} alt="" className='profile-img'/> 
                   
                   :
                   
                   (userData().profilePicture == "" || userData().profilePicture == undefined || userData().profilePicture == null) ?
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="" className='profile-img'/>:
                   <img src={userData().profilePicture} alt="" className='profile-img'/>
                }
                
                {
                  getUser().id == paramsID.id ? 
                  (userData().backgroundPicture == undefined || userData().backgroundPicture == "" || userData().backgroundPicture == null) ?  
                  <img onClick={()=>{console.log('aaaa');setUpdateBgImage(!viewUpdateBgImage)}} src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/workstation-linkedin-background-template-design-508687cf99e73da09225be280ee6eaf4_screen.jpg?ts=1597995086" alt="" className='background-img'/>
                  :
                  <img onClick={()=>{console.log('bbbbb');setUpdateBgImage(!viewUpdateBgImage)}} src={userData().backgroundPicture} alt="" className='background-img'/>
                   
                   :
                   
                   (userData().backgroundPicture == undefined || userData().backgroundPicture == "" || userData().backgroundPicture == null) ?  
                  <img  src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/workstation-linkedin-background-template-design-508687cf99e73da09225be280ee6eaf4_screen.jpg?ts=1597995086" alt="" className='background-img'/>
                  :
                  <img src={userData().backgroundPicture} alt="" className='background-img'/>
                  
                }
              </div>
              {
                getUser().id == paramsID.id ? <button onClick={()=>setViewEditProfile(!viewEditProfile)} className='edit-user-detail'>Edit</button> : null
              }
              <h3>{userData().name}</h3>
              <p>{userData().email} {userData().pronoun}</p>
              <p>{userData().headline}</p>
              <p>{userData().position}</p>
              <p>{userData().region}</p>
              {
                getUser().id != paramsID.id ? <> 
                <button className = "follow" onClick={handleLogout}>Follow +</button>
                {
                  (dataPON.user.ConnectionRequests.filter((e:any)=>e.sender.id === getUser().id)).length > 0 ? 
                  <button className = "connect" onClick={()=>setViewCancelPending(!viewCancelPending)}>Pending</button> :
                  
                    (dataCon.user.Connections.filter((e:any)=>e.user1.id === paramsID.id)).length > 0 || (dataCon.user.Connections.filter((e:any)=>e.user2.id === paramsID.id)).length > 0 == true ?
                    <button className = "connect">Connected</button> :
                    <button className = "connect" onClick={handleConnectRequest}>Connect</button>
                  
                }
              </>
                :
                <button className = "logout" onClick={handleLogout}>Logout</button>
              }
              
            </div>
            <div className="about">
              <div className="about-head">
                <h2>About</h2>
                
                {
                  getUser().id == paramsID.id ? <button onClick={()=>setEditAbout(true)}>Edit</button> : null
                }
                
              </div>
              <div className="about-desc">
                {userData().about}
              </div>
              
            </div>
            <div className='education'>
              <div className='education-head'>
                <h2>Education</h2>
                {
                  getUser().id == paramsID.id ? <button onClick={()=>setViewAddEducation(!viewAddEducation)}>Add</button> : null
                }
                
              </div>
              {
                dataEd.Educations.map((e:any)=>{
                  return <Education item={e} fetch={edRefetch}/>
                })
              }
            </div>
            <div className='experience'>
              <div className='experience-head'>
                <h2>Experience</h2>
                {
                  getUser().id == paramsID.id ? <button onClick={()=>{setViewAddExperience(!viewAddExperience)}}>Add</button> : null
                }
                
              </div>
              {
                dataGetExp.Experiences.map((e:any)=>{
                  
                  return <Experience item={e} fetch={expRefetch}/>
                })
              }
                
            </div>
          </div>
          <div className="right">
            <img src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png" alt="" />
          </div>

          <footer className='footer-register-profile'>
            <div className="footer-component-register">
              <div className="left-register">
                  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="54.000000pt" height="12.000000pt" viewBox="0 0 2586.000000 564.000000"
        preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,564.000000) scale(0.100000,-0.100000)"
        fill="#000000" stroke="none">
        <path d="M20447 5619 c-95 -22 -193 -94 -244 -180 -68 -113 -63 80 -63 -2599
        0 -2121 2 -2433 15 -2483 33 -126 99 -208 213 -264 l76 -38 2490 0 2491 0 66
        32 c80 39 159 120 197 200 l27 58 0 2495 0 2495 -33 67 c-41 84 -128 167 -209
        200 l-58 23 -2465 2 c-1409 0 -2481 -3 -2503 -8z m1018 -760 c174 -32 324
        -164 376 -330 26 -82 25 -207 -1 -290 -69 -222 -306 -369 -532 -331 -248 42
        -421 259 -405 507 14 221 173 401 392 445 59 12 104 11 170 -1z m2714 -1274
        c288 -55 483 -202 596 -449 42 -91 69 -183 97 -327 21 -111 21 -139 25 -1026
        l4 -913 -415 0 -415 0 -4 793 c-3 708 -5 800 -21 867 -37 159 -105 257 -215
        309 -52 24 -65 26 -196 26 -122 -1 -147 -4 -198 -24 -156 -62 -245 -198 -276
        -424 -7 -51 -11 -339 -11 -813 l0 -734 -420 0 -420 0 0 1335 0 1335 400 0 400
        0 0 -180 c0 -99 3 -180 8 -180 4 0 20 21 37 47 65 104 208 229 330 290 59 30
        191 72 260 83 83 13 333 4 434 -15z m-2379 -1380 l0 -1335 -420 0 -420 0 0
        1335 0 1335 420 0 420 0 0 -1335z"/>
        <path d="M18487 4803 c-4 -3 -7 -350 -7 -770 0 -502 -3 -763 -10 -763 -5 0
        -10 4 -10 8 0 18 -129 138 -192 179 -158 102 -334 151 -583 160 -184 6 -289
        -8 -440 -58 -408 -136 -705 -507 -817 -1022 -20 -90 -22 -131 -22 -342 0 -211
        2 -252 22 -342 137 -626 583 -1008 1212 -1039 329 -16 643 116 846 356 26 30
        50 56 55 58 5 2 9 -75 9 -172 l0 -176 380 0 380 0 0 1965 0 1965 -408 0 c-225
        0 -412 -3 -415 -7z m-462 -1918 c256 -45 434 -210 502 -465 24 -91 24 -320 -1
        -410 -33 -122 -82 -208 -165 -290 -132 -131 -265 -182 -476 -182 -284 0 -489
        119 -596 347 -51 108 -64 176 -64 335 0 163 17 238 81 360 126 241 406 359
        719 305z"/>
        <path d="M3138 4660 c-21 -5 -66 -24 -100 -41 -286 -145 -347 -531 -119 -760
        187 -186 485 -186 672 0 91 91 139 207 139 336 0 188 -104 350 -276 432 -70
        33 -85 37 -178 39 -55 2 -118 -1 -138 -6z"/>
        <path d="M10430 2665 l0 -1965 420 0 420 0 0 853 c0 699 3 861 14 905 32 118
        127 232 242 289 64 31 85 36 168 41 77 4 106 1 162 -17 166 -51 262 -187 293
        -416 7 -49 11 -360 11 -866 l0 -789 421 0 420 0 -4 903 c-4 875 -5 905 -26
        1017 -96 509 -365 787 -811 841 -298 35 -607 -80 -819 -306 -33 -36 -63 -65
        -66 -65 -3 0 -5 347 -5 770 l0 770 -420 0 -420 0 0 -1965z"/>
        <path d="M7140 2650 l0 -1970 410 0 410 0 0 660 c0 363 4 660 8 660 5 0 206
        -297 448 -660 l439 -659 514 -1 c412 0 512 3 508 13 -2 7 -239 329 -526 716
        -287 386 -521 707 -519 711 2 6 907 1037 1047 1193 l33 37 -505 0 -505 0 -469
        -542 -468 -541 -3 1176 -2 1177 -410 0 -410 0 0 -1970z"/>
        <path d="M2 2648 l3 -1963 1228 -3 1227 -2 0 395 0 395 -797 2 -798 3 -3 1568
        -2 1567 -430 0 -430 0 2 -1962z"/>
        <path d="M14710 3610 c-523 -61 -943 -336 -1154 -756 -90 -180 -133 -354 -142
        -579 -17 -398 108 -747 364 -1016 279 -294 664 -448 1117 -449 403 0 760 146
        1043 428 l93 93 -23 18 c-113 87 -549 401 -558 401 -5 0 -10 -4 -10 -8 0 -19
        -118 -137 -183 -183 -129 -90 -309 -139 -460 -125 -91 8 -217 52 -289 100 -79
        52 -166 149 -210 231 -36 69 -71 179 -60 189 3 3 437 6 964 6 l958 0 0 108
        c-1 472 -71 768 -242 1033 -164 254 -414 422 -732 490 -105 22 -359 33 -476
        19z m221 -594 c97 -21 184 -69 254 -140 91 -93 145 -212 145 -323 l0 -43 -544
        0 c-300 0 -547 3 -549 8 -2 4 1 34 8 68 46 221 224 394 445 434 72 12 170 11
        241 -4z"/>
        <path d="M5472 3385 c-114 -30 -216 -78 -302 -143 -76 -57 -164 -150 -206
        -216 -16 -25 -32 -46 -36 -46 -5 0 -8 83 -8 185 l0 185 -395 0 -395 0 0 -1330
        0 -1330 410 0 410 0 0 668 c0 697 7 859 40 980 53 192 159 302 327 337 172 37
        335 2 427 -90 78 -77 119 -194 136 -380 5 -60 10 -426 10 -812 l0 -703 410 0
        410 0 0 808 c0 444 -5 861 -10 927 -57 695 -348 986 -985 984 -125 0 -166 -4
        -243 -24z"/>
        <path d="M2840 2020 l0 -1330 415 0 415 0 0 1330 0 1330 -415 0 -415 0 0
        -1330z"/>
        </g>
                  </svg>              
                  <a href="">&copy; 2022</a>
              </div>
              <div className="center-right-register">
                <div className="center-register">
                    <a target="#" href="https://about.linkedin.com/?trk=registration_footer-about">About</a>
                    <a target="#" href="https://www.linkedin.com/accessibility?trk=registration_footer-accessibility">Accessbility</a>
                    <a target="#" href="https://www.linkedin.com/legal/user-agreement?trk=registration-frontend_join-form-user-agreement">User Agreement</a>
                    <a target="#" href="https://www.linkedin.com/legal/privacy-policy?trk=registration-frontend_join-form-privacy-policy">Privacy Policy</a>
                    <a target="#" href="https://www.linkedin.com/legal/cookie-policy?trk=registration-frontend_join-form-cookie-policy">Cookie Policy</a>
                </div>
                <div className="right-register">
                    <a target="#" href="https://www.linkedin.com/legal/copyright-policy?trk=registration_footer-copyright-policy">Copyright Policy</a>
                    <a target="#" href="https://brand.linkedin.com/policies?trk=registration_footer-brand-policy">Brand Policy</a>
                    <a target="#" href="https://www.linkedin.com/psettings/guest-controls?trk=registration_footer-guest-controls">Guest Controls</a>
                    <a target="#" href="https://www.linkedin.com/legal/professional-community-policies?trk=registration_footer-community-guide">Community Guidelines</a>
                    <a target="#" href="https://www.linkedin.com/legal/cookie-policy?trk=registration_footer-cookie-policy">Language</a>
                </div>
              </div>
            </div>
          </footer>
        </div>

    </div>
  )
}

export default Profile