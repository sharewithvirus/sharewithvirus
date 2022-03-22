import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'
import axios from 'axios'
import { requestURL } from './ReqUrl'

const InstituteSettingBar = (props) =>{
    const navigate = useNavigate()
    const [insData, setInsData] = useState('')
    useEffect(() =>{
      axios.get(`${requestURL}/insdashboard/${props.id ? props.id : ''}`)
      .then((res) =>{
        setInsData(res.data.institute)
      })
      .catch((e) =>{
        console.log('something went wrong')
      })
    },[])
return (
    <>
                <div className={`mt-5 ${styles.dabout} `}
                onClick={() => navigate(`/inssetting/${props.id}`)}
                >
                    <img
                      src="/images/personal-info-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Personal Info"
                    /> 
                    Personal Info
                  </div>
                  <div className={`${styles.dabout} mt-3 mb-2`}
                   onClick={() => navigate(`/ins/account/${props.id}`)}
                  >
                  <img
                    src="/images/account-icon.svg"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Account"
                  /> 
                  Account Setting
                  </div>
                  {insData && insData.status === 'Approved' ? 
                  <div
                    className={`${styles.dabout} mt-3 mb-2`}
                    onClick={() => navigate(`/setting/credit/${props.id}`)}
                  >
                    <img
                      src="/images/credit-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Credit"
                    /> 
                    Credit Setting
                  </div>
                  : ''}
                  <div className={`${styles.dabout} mt-3 mb-2`}>
                  <img
                    src="/images/privacy-icon.svg"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Privacy"
                  /> Privacy Setting
                  </div>
                  <div className={`${styles.dabout} mt-3 mb-2`}>
                  <img
                    src="/images/contact-us-icon.svg"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Contact Us"
                  /> Contact us
                  </div>
    </>
)
}

export default InstituteSettingBar