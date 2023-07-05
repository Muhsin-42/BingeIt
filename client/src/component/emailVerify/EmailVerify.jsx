import axios from '../../utils/axios'
import './emailVerify.scss';
import React, { useState } from 'react'
import {Link, useParams} from 'react-router-dom' 
function EmailVerify() {
    const [ validUrl, setValidUrl] = useState(false);
    const [invalidUrl,setInvalidUrl] = useState(false);
    const param = useParams();


    const handleOnclick = ()=>{
        const verifyEmailUrl = async()=>{
            try {
                const url = `/api/auth/${param.id}/verify/${param.token}`
                const {data} = await axios.get(url)
                setValidUrl(true)
                setInvalidUrl(false)
            } catch (error) {
                console.log(error)
                setInvalidUrl(true)
                setValidUrl(false)
            }
        }
        verifyEmailUrl();
    }

  return (
        <div className='emailVerify'>
        {validUrl ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
            <img src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg" alt="" />
            <h1>Email Verified Successfully</h1>

            <Link to="/login"> <button className='btn btn-outline-success'>Login</button></Link>

            </div>
        ) : (
            <div>
                {invalidUrl ? <><h1>404 not found</h1> <h2>Invalid Url</h2></>    : 
                    <button className="btn btn-outline-success verify-email-button" onClick={handleOnclick}>
                        Verify Login
                    </button>
                }
            </div>
        )}
        </div>
  )
}

export default EmailVerify