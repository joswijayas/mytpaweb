import { concat, useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { QUERY_DELETE_EXPERIENCE, QUERY_GET_EXPERIENCE, QUERY_UPDATE_EXPERIENCE } from '../queris'
import './../styles/profile.scss'
import { BeakerIcon } from '@heroicons/vue/24/solid'
import { UseCurrentUser } from '../Context/UserContext'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useParams } from 'react-router-dom'

function Experience(props:any) {
  // console.log(props.item.title)
  const {getUser} = UseCurrentUser()
  const [currClick, setCurrClick] = useState(false)
  const [viewUpdateExp, setViewUpdateExp] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [functionDeleteExp, {data, loading, error}] = useMutation(QUERY_DELETE_EXPERIENCE)
  const [functionUpdateExp, {data:dataUpd, loading:loadUpd, error:errorUpd}] = useMutation(QUERY_UPDATE_EXPERIENCE)
  const paramsID = useParams()
  // console.log(props.fetch)
  const handleDeleteExp = (id:any)=>{
    try {
      functionDeleteExp({
        variables: {
          id: id
      }}).then(()=>{
        // console.log("aaaaalksaxhjcljkwdhclikwhdc")
        try {
          props.fetch()
        } catch (error) {
          console.log(error)
        }
      })
    } catch (error) {
      // console.log('jajaja')
      console.log(error)
    }
  }

  const ViewUpdateExp = ({experienceData} : {experienceData:any})=>{
    // console.log(experienceData)
    const [titleExp, setTitleExp] = useState(experienceData.title)
    const [companyExp, setCompanyExp] = useState(experienceData.companyName)

    const [empType, setEmpType] = useState(experienceData.employmentType)
    const [locExp, setLocExp] = useState(experienceData.location)
    const [industryExp, setIndustryExp] = useState(experienceData.industry)
    const [descExp, setDescExp] = useState(experienceData.description)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [profileImg, setProfileImage] = useState('')
    const aSNum = experienceData.monthStartDate
    const aENum = experienceData.monthEndDate
    const handleTitleExp = (e:any)=>{
      setTitleExp(e)
      // console.log(e)
    }  
    var monthStartNumber = "XX", monthEndNumber = "XX"
    if(aSNum == "January"){
      monthStartNumber = "01"
    }else if(aSNum == "February"){
      monthStartNumber = "02"
    }else if(aSNum == "March"){
      monthStartNumber = "03"
    }else if(aSNum == "April"){
      monthStartNumber = "04"
    }else if(aSNum == "May"){
      monthStartNumber = "05"
    }
    else if(aSNum == "June"){
      monthStartNumber = "06"
    }
    else if(aSNum == "July"){
      monthStartNumber = "07"
    }
    else if(aSNum == "August"){
      monthStartNumber = "08"
    }
    else if(aSNum == "September"){
      monthStartNumber = "09"
    }else if(aSNum == "October"){
      monthStartNumber = "10"
    }else if(aSNum == "November"){
      monthStartNumber = "11"
    }else if(aSNum == "December"){
      monthStartNumber = "12"
    }

    if(aENum == "January"){
      monthEndNumber = "01"
    }else if(aENum == "February"){
      monthEndNumber = "02"
    }else if(aENum == "March"){
      monthEndNumber = "03"
    }else if(aENum == "April"){
      monthEndNumber = "04"
    }else if(aENum == "May"){
      monthEndNumber = "05"
    }
    else if(aENum == "June"){
      monthEndNumber = "06"
    }
    else if(aENum == "July"){
      monthEndNumber = "07"
    }
    else if(aENum == "August"){
      monthEndNumber = "08"
    }
    else if(aENum == "September"){
      monthEndNumber = "09"
    }else if(aENum == "October"){
      monthEndNumber = "10"
    }else if(aENum == "November"){
      monthEndNumber = "11"
    }else if(aENum == "December"){
      monthEndNumber = "12"
    }
      
      const [aS, bS] = (experienceData.yearStartDate + "-" + monthStartNumber).split('-')
      const [aE, bE] = (experienceData.yearEndDate + "-" + monthEndNumber).split('-')

      // console.log(aS, bS, aE, bE)
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

      

    const handleUpdateExp = ()=>{
      // console.log(input)
      try {
        functionUpdateExp({
          variables: {
            id: experienceData.id,
            input: input
        }}).then(()=>{
          // console.log("aaaaalksaxhjcljkwdhclikwhdc")
          try {
            props.fetch()
          } catch (error) {
            console.log(error)
          }
          setViewUpdateExp(!viewUpdateExp)
        })
      } catch (error) {
        // console.log('jajaja')
        console.log(error)
      }
    }

    const handleUploadImage =  async (e:any)=>{
      console.log(e.files[0].name)
      console.log(e.files[0].type)

      const fileName = e.files[0].name
      if(e.files[0].type == "image/png" || e.files[0].type == "image/jpeg" || e.files[0].type == "image/jpg"){
        const docRef = ref(storage, `/image/${fileName}`)
        const metadata = {
          contentType: 'image'
        }
        try {
          uploadBytes(docRef, e.files[0], metadata).then((e:any)=>{
            getDownloadURL(docRef).then((uploadUrl:any)=>{
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

    return(
      <>
      {
        viewUpdateExp == false ? null:
        <div className="popup">
        <div className="popup-box">
          <div className="popup-top">
            <label htmlFor="">Add experience</label>
            <button onClick={()=>{setViewUpdateExp(!viewUpdateExp)}}>&#10006;</button>
          </div>
          <div className="popup-main">
              <input onChange={(e)=>{handleUploadImage(e.target)}}type="file" name="" id="" />
              <div className="tag-input">
                <label htmlFor="">Title*</label>
                <input value={titleExp} type="text" className='title-experience' onChange={(e)=>{handleTitleExp(e.target.value)}}/>
                {/* <br /> */}
              </div>
              
              <label htmlFor="">Employment type</label>
              <select value={empType} name="employment-type" id="employment-type" onChange={(e)=>{console.log(e.target.value);setEmpType(e.target.value)}}>
                <option value="-">-</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
                <option value="SeasNumonal">SeasNumonal</option>
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
              <input  type="month" onChange={(e)=>{setStartDate(e.target.value)}}/>

              <label htmlFor="">End date*</label>
              <input  type="month" onChange={(e)=>{setEndDate(e.target.value)}}/>  
          </div>
          <div className="popup-bottom">
            <button onClick={handleUpdateExp}className='all-button' >Update</button>
          </div>
        </div>  
      </div>
      }
      </>
    )
  }

  // console.log(props)
  return (
    <div className='experience-child'>
          <ViewUpdateExp experienceData={props.item}/>
          <div className='experience-box'>
              <img src={props.item.profileHeadline} alt='experienceLogo' />
              <div className='experience-body'>
                  <h4>{props.item.title}</h4>
                  <p>{props.item.companyName} - {props.item.employmentType} </p>
                  <p className='time-span'>{props.item.monthStartDate} {props.item.yearStartDate} - {props.item.monthEndDate} {props.item.yearEndDate}</p>
                  <p className='time-span'>{props.item.location}</p>
                  <br />
                  <p className='time-span'>{props.item.description}</p>
              </div>
              
            <div className="icon-delete-update">
            {
                getUser().id == paramsID.id ? 
                <>
                <button className='icon-button' onClick={()=>handleDeleteExp(props.item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
              </button>
                
              <button onClick={()=>{setCurrClick(props.item.id); setViewUpdateExp(!viewUpdateExp)}} className='icon-button'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              </button>
                </>
                : null
              }
              

            </div>


            </div>
     </div>
  )
}

export default Experience