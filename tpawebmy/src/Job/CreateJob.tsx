import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { QUERY_CREATE_JOB } from '../queris'

function CreateJob (props:any) {
    const [viewCreateJob, setViewCreateJob] = useState(false)
    const [functionCreateJob, {data: dataCJ, loading: loadingCJ, error: errorCJ}] = useMutation(QUERY_CREATE_JOB)
    const ViewCreateJob = ()=>{
        const [title, setTitle] = useState('')
        const [companyName, setCompanyName] = useState('')
        const [city, setCity] = useState('')
        const [country, setCountry] = useState('')
        const [status, setStatus] = useState('')
        const [desc, setDesc] = useState('')

        const handleCreateJob = ()=>{
            // console.log(title + companyName + city + country + status + desc)
            functionCreateJob({
                variables:{
                    "title": title,
                    "companyName": companyName,
                    "city": city,
                    "country": country,
                    "status": status,
                    "description": desc
                }
            }).then(()=>{
                props.fetch()
                setViewCreateJob(!viewCreateJob)
            })
        }
        return(
            <>
                {
                    viewCreateJob == false ? null : 
                    <div className="popup">
                    <div className="popup-box">
                    <div className="popup-top">
                        <label htmlFor="">Add New Job</label>
                        <button onClick={()=>{setViewCreateJob(!viewCreateJob)}}>&#10006;</button>
                    </div>
                    <div className="popup-main">
                    
                    <label htmlFor="">Title</label>
                    <input type="text" className='title-experience' onChange={(e)=>{setTitle(e.target.value)}}/>

                    <label htmlFor="">Company name</label>
                    <input type="text" className='title-experience' onChange={(e)=>{setCompanyName(e.target.value)}}/>

                    <label htmlFor="">City</label>
                    <input type="text" className='title-experience' onChange={(e)=>{setCity(e.target.value)}}/>
                    
                    <label htmlFor="">Country</label>
                    <input  type="text" className='title-experience' onChange={(e)=>{setCountry(e.target.value)}} />

                    <label htmlFor="">Status</label>
                    <select name="employment-type" id="employment-type" onChange={(e)=>{setStatus(e.target.value)}}>
                        <option value="-">-</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                        <option value="Seasonal">Seasonal</option>
                        <option value="Self-employed">Self-employed</option>
                    </select>
                    
                    <label htmlFor="">Description*</label>
                    <textarea  className='exp-desc' onChange={(e)=>{setDesc(e.target.value)}}></textarea>
                    
                    
                    </div>
                    <div className="popup-bottom">
                        <button className='all-button' onClick={handleCreateJob}>Create</button>
                    </div>
                    </div>  
                </div>
                }
            </>
        )
    }

  return (
    <div>
        <ViewCreateJob/>
        <button className='all-button' onClick={()=>{setViewCreateJob(!viewCreateJob)}}>CREATE JOB +</button>
    </div>
  )
}

export default CreateJob
