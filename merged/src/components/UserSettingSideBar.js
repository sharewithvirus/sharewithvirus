import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Home.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import { requestURL } from './ReqUrl'

const UserSettingSideBar = (props) =>{
    const navigate = useNavigate()
    const [userData, setUserData] = useState('')
    useEffect(() =>{
      axios.get(`${requestURL}/userdashboard/${props.id ? props.id : ''}`)
      .then((res) =>{
        setUserData(res.data.user.InstituteReferals)
      })
      .catch((e) =>{
        console.log('something went wrong')
      })
    },[])
return (
    <>
        <div
                    className={`${styles.dabout} mt-3 mb-2`}
                    onClick={() => navigate(`/personal/${props.id}`)}
                  >
                    <img
                      src="/images/personal-info-icon.svg"
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Personal Info"
                    /> Personal Info
                  </div>
                  <div
                    className={`${styles.dabout} mt-3 mb-2`}
                    onClick={() => navigate(`/account/${props.id}`)}
                  >
                    <img
                      src="/images/account-icon.svg"
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Account"
                    /> Account
                  </div>
                  <div
                    className={`${styles.dabout} mt-3 mb-2`}
                    onClick={() => navigate(`/privacy/${props.id}`)}
                  >
                    <img
                      src="/images/privacy-icon.svg"
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Privacy"
                    /> Privacy
                  </div>
                  <div
                    className={`${styles.dabout} mt-3 mb-2`}
                    onClick={() => navigate(`/notifications/${props.id}`)}
                  >
                    <img
                      src="/images/setting-notification-icon.svg"
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Notification"
                    /> Notification
                  </div>
                  {userData && userData.length >= 1 ?
                  <div
                    className={`${styles.dabout} mt-3 mb-2`}
                    onClick={() => navigate(`/referals/${props.id}`)}
                  >
                    <img
                      src="/images/referrals-icon.svg"
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Referrals"
                    /> Referrals
                  </div>
                  : ''}
    </>
)
}

export default UserSettingSideBar
