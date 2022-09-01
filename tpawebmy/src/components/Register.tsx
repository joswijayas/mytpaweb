import React, { useState } from 'react'
import './../styles/register.scss'
import logo from '../assets/logo.png'
import { useMutation } from '@apollo/client'
import { QUERY_REGISTER } from '../queris'
import { useNavigate } from 'react-router-dom'
import emailjs from 'emailjs-com'
const Register = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [functionRegister, {loading}] = useMutation(QUERY_REGISTER)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const registerClick = (e: { preventDefault: () => void })=>{
    if(email == ""){
      setError("Email can't empty!")
    }
    else if(password == ""){
      setError("Password can't empty!")
    }
    else if(confPassword == ""){
      setError("Confirmation Password can't empty!")
    }
    else if (!(/\S+@\S+\.\S+/.test(email))) {
      setError("Bad email format!")
    }                                                                                                                                 
    else if(confPassword != password){
      setError("Confirmation Password & Password must be same!")
    }

    else{
      const input = {
        email: email,
        password: password
      }
      console.log(input)
      try {
        functionRegister(
          { variables: {
              input: input
            }
          }
        ).then(()=>{
          e.preventDefault();

          emailjs.sendForm('service_q4iha5s', 'template_fr6kx8p', email, 'yIbCAYxPN8ld3PmQN')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
          
        }).then(()=>{
          navigate('/Login')
        }).catch((err)=>{
          if(err.message === "must not be null"){
            setError("Email already used!")
          }
          console.log(err.message)
        })
      } catch (error) {
        console.log("aaaaaa")
        console.log(error)
      }
    }
      
  }

  const handleEmail = (e: React.SetStateAction<string>)=>{
    console.log(e)
    setEmail(e)
  }

  const handlePassword = (e: React.SetStateAction<string>)=>{
    console.log(e)
    setPassword(e)
  }

  const handleConfPassword = (e: React.SetStateAction<string>)=>{
    console.log(e)
    setConfPassword(e)
  }

  return (
    <div className="main">
      <div className="header">
        <img src={logo} alt="" className='logo-img'/>
      </div>
      <div className="form">
        <h3 className='form-headtitle'>Make the most of your professional life</h3>
        <div className="form-container">
            <div className="form-component">
              <label className='error-message' htmlFor="">{error}</label>
              <label htmlFor="">Email</label>
              <input onChange={(e)=>{handleEmail(e.target.value)}} type="email" name="" id="" />
            </div>
            <div className="form-component">
              <label htmlFor="">Password</label>
              <input onChange={(e)=>{handlePassword(e.target.value)}} type="password" name="" id="" />
            </div>
            <div className="form-component">
              <label htmlFor="">Confirmation Password</label>
              <input onChange={(e)=>{handleConfPassword(e.target.value)}} type="password" name="" id="" />
            </div>
            <div className="span-agreement">
              <span data-is-not-yielded="true" className="join-form__form-body-agreement">By clicking Agree &amp; Join, you agree to the LinkedIn <a target="_blank" className="join-form__form-body-agreement-item-link" href="https://www.linkedin.com/legal/user-agreement?trk=registration-frontend_join-form-user-agreement" data-tracking-will-navigate="" data-tracking-control-name="registration-frontend_join-form-user-agreement">User Agreement</a>, <a target="_blank" className="join-form__form-body-agreement-item-link" href="https://www.linkedin.com/legal/privacy-policy?trk=registration-frontend_join-form-privacy-policy" data-tracking-will-navigate="" data-tracking-control-name="registration-frontend_join-form-privacy-policy">Privacy Policy</a>, and  <a target="_blank" className="join-form__form-body-agreement-item-link" href="https://www.linkedin.com/legal/cookie-policy?trk=registration-frontend_join-form-cookie-policy" data-tracking-will-navigate="" data-tracking-control-name="registration-frontend_join-form-cookie-policy">Cookie Policy</a>. </span>
            </div>
            <div className="button">
              <button onClick={registerClick}
                type="button"
                >
                  Agree & Join
              </button>
            </div>
            <div className="span-agreement">
              <span data-is-not-yielded="true" className="join-form__form-body-agreement">Already on LinkhedIn? <span className='link-to-signin' onClick={()=>{navigate('/Login')}}>SignIn</span></span>
            </div>
        </div>
        
      </div>
      <footer className='footer'>
        <div className="footer-component">
          <div className="left">
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
          <div className="center-right">
            <div className="center">
                <a target="#" href="">About</a>
                <a target="#" href="">Accessbility</a>
                <a target="#" href="https://www.linkedin.com/legal/user-agreement?trk=registration-frontend_join-form-user-agreement">User Agreement</a>
                <a target="https://www.linkedin.com/legal/privacy-policy?trk=registration-frontend_join-form-privacy-policy" href="">Privacy Policy</a>
                <a target="https://www.linkedin.com/legal/cookie-policy?trk=registration-frontend_join-form-cookie-policy" href="">Cookie Policy</a>
            </div>
            <div className="right">
                <a target="#" href="">Copyright Policy</a>
                <a target="#" href="">Brand Policy</a>
                <a target="#" href="">Guest Controls</a>
                <a target="#" href="">Community Guidelines</a>
                <a target="#" href="">Language</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Register