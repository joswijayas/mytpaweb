import { useMutation } from '@apollo/client'
import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import logo from '../assets/logo.png'
import { QUERY_ACTIVATE_USER } from '../queris'
import '../styles/_verification.scss'

const Verification = () => {
    const {id} = useParams()
    const [functionActivate] = useMutation(QUERY_ACTIVATE_USER)
    const navigate = useNavigate()

    const activateAccount = ()=>{
        console.log(id)
        functionActivate({
            variables: {
                id: id
            }
        }).then(()=>{
            navigate('/Login')
        }).catch((e: any)=>{
            console.log(e)
        })
    }

    return (
    <div>
        <div className="header">
            <img src={logo} alt="" className='logo-img'/>
            <h3 className='form-headtitle'>Please click below button to activate your account!</h3>
            <div className="button">
              <button onClick={activateAccount}
                type="button"
                >
                  Activate My Account
              </button>
            </div>
        </div>
    </div>
  )
}

export default Verification