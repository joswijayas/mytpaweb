import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { UseCurrentUser } from '../Context/UserContext'
import { QUERY_DELETE_EDUCATION, QUERY_UPDATE_EDUCATION } from '../queris'
import './../styles/profile.scss'

function Education(props:any) {
  // console.log(props.item)
  const {getUser} = UseCurrentUser()
  const [functionDeleteEdu, {data, loading, error}] = useMutation(QUERY_DELETE_EDUCATION)
  const [functionUpdateEdu, {data: dataEdu, loading: loadingEdu, error: errorEdu}] = useMutation(QUERY_UPDATE_EDUCATION)
  const [viewUpdateEdu, setViewUpdateEdu] = useState(false)
  const paramsID = useParams()
  if(loading){
    return <h1>Fetching...</h1>
  }
  if(loadingEdu){
    return <h1>Fetching...</h1>
  }

  const handleDeleteEdu = (id: any)=>{
    try {
      functionDeleteEdu({
        variables: {
          id: id
      }}).then(()=>{
        try {
          props.fetch()
        } catch (error) {
          console.log(error)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const ViewUpdateEducation = ({eduData} : {eduData:any})=>{
    const [school, setSchool] = useState(eduData.school)
    const [degree, setDegree] = useState(eduData.degree)
    const [fieldOfStudy, setFieldOfStudy] = useState(eduData.fieldOfStudy)
    const [startYear, setStartYear] = useState(eduData.startYear)
    const [endYear, setEndYear] = useState(eduData.endYear)

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

    const handleUpdateEdu = ()=>{
      try {
        functionUpdateEdu({
          variables: {
            id: eduData.id,
            input: input
        }}).then(()=>{
          try {
            props.fetch()
          } catch (error) {
            console.log(error)
          }
          setViewUpdateEdu(!viewUpdateEdu)
        })
      } catch (error) {
        console.log(error)
      }
    }

    return(
      <>
        {
          viewUpdateEdu == false ? 
          null :
          <div className="popup">
            <div className="popup-box">
              <div className="popup-top">
                <label htmlFor="">Add education</label>
                <button onClick={()=>{setViewUpdateEdu(!viewUpdateEdu)}}>&#10006;</button>
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
                <button className='all-button' onClick={handleUpdateEdu}>Update</button>
              </div>
            </div>  
          </div>
        }
      </>
    )
  }

  return (
    <div className='experience-child'>
    <ViewUpdateEducation eduData={props.item}/>
    <div className='experience-box'>
        {/* <img src="" alt='experienceLogo' /> */}
        <div className='experience-body'>
            <h4>{props.item.school}</h4>
            <p>{props.item.degree}, {props.item.fieldOfStudy} </p>
            <p className='time-span'>{props.item.startYear} - {props.item.endYear}</p>
        </div>
        
      <div className="icon-delete-update">
      {
                getUser().id == paramsID.id ? 
                <>
                   <button id='hide' className='icon-button' onClick={()=>handleDeleteEdu(props.item.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                      
                    <button id='hide' onClick={()=>{setViewUpdateEdu(!viewUpdateEdu)}} className='icon-button'>
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

export default Education