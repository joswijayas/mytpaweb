import { useQuery } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { QUERY_GET_JOBS } from '../queris'

function AllJobs (props:any)  {
  const navigate = useNavigate()
  return (
    <div>
        <div className="job-detail">
            <div className="job-detail-detail" onClick={()=>{window.open('https://www.linkedin.com/jobs/',
  '_blank')}}>
                <h3>{props.item.title}</h3>
                <p>{props.item.companyName}</p>
                <p>{props.item.city}, {props.item.country}</p>
                <p>{props.item.status}</p>
                <p>{props.item.description}</p>
            </div>
        </div>
        <hr className="solid"/>
    </div>
  )
}

export default AllJobs