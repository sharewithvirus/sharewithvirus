import React from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { requestURL } from './ReqUrl'

const AdminSideBar = (props) =>{
    const navigate = useNavigate()

    const LogoutHandler = () => {
        axios
          .get(`${requestURL}/ins-logout`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            withCredentials: "include",
          })
          .then((res) => {
            localStorage.removeItem('adminId')
            setTimeout(() => {
              navigate("/login", { replace: true });
            }, 100);
          })
          .catch((e) => {
            alert("something went wrong");
          });
      };

return (
    <>
        <div
                    className={`${styles.dabout} `}
                    onClick={() => navigate(`/admindashboard/${props.aid}`)}
                  >
                  <img src="/images/dashboard-admin-icon.svg" title="Dashboard"/> Dashboard
                  </div>
                  <div
                    className={`${styles.dabout} `}
                    onClick={() => navigate(`/admin/insrequests/${props.aid}`)}
                  >
                  <img src="/images/institute-admin-icon.svg" title="Institute"/> Institutes
                  </div>
                  <div className={`${styles.dabout}`}
                  onClick={() => navigate(`/admin/usersrequest/${props.aid}`)}
                  >
                  <img src="/images/user-admin-icon.svg" title="Users"/> Users
                  </div>
                  <div className={`${styles.dabout}`}
                  onClick={() => navigate(`/admindashboard/${props.aid}/ins/id-card`)}
                  >
                  <img src="/images/payment-admin-icon.svg" title="Transaction"/> Id Card
                  </div>
                  <div className={`${styles.dabout}`}
                  onClick={() => navigate(`/admindashboard/${props.aid}/bank/details`)}
                  >
                  <img src="/images/payment-admin-icon.svg" title="Transaction"/> Transaction
                  </div>
                  <div className={`${styles.dabout}`}>
                  <img src="/images/support-admin-icon.svg" title="Support"/> Support
                  </div>
                  <div className={`${styles.dabout}`}>
                  <img src="/images/report-admin-icon.svg" title="Report"/> Reported Content
                  </div>

                  <div className={`${styles.dabout} `}>
                  <img src="/images/terms-admin-icon.svg" title="Terms and Condition"/> Terms &amp; Conditions
                  </div>
                  <div className={`${styles.dabout} `} onClick={LogoutHandler}>
                  <img src="/images/logout-icon.svg" title="Logout"/> Logout
                  </div>
    </>
)
}

export default AdminSideBar;