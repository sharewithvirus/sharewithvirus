import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SigninHeader from "../SigninHeader";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { requestURL } from "../ReqUrl";
import { Success, Danger } from "../SnackBar";
const UserOtp = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { search } = useLocation()
  const [userData, setUserData] = useState("");
  const [userVerify, setUserVerify] = useState({
    userOtpCode: "",
  });
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  const { t } = useTranslation();

  const userOtpHandler = (e) => {
    const { name, value } = e.target;
    setUserVerify({
      ...userVerify,
      [name]: value,
    });
  };

  const userOtpHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/user-detail-verify/${params.id}`, userVerify)
      .then((res) => {
          if(res.data.userStatus === 'approved'){
            navigate(`/userprofile/${params.id}/status/${res.data.userStatus}`);
          }
          else{
            navigate('/usersignup')
          }
      })
      .catch((e) => {
        console.log("Something Went Wrong...");
      });
  };

  const handleSession = () =>{
    localStorage.setItem('userPhoneNumber', params.id)
  }

  // useEffect(() => {
  //   axios
  //     .get(`${requestURL}/userdashboard/${params.id}`)
  //     .then((res) => {
  //       setUserData(res.data.user);
  //     })
  //     .catch((e) => {
  //       console.log("Something Went Wrong");
  //     });
  // }, []);

  return (
    <>
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}
      <SigninHeader />
      <div className={styles.loginPage}>
        <div className={styles.login}>
          <div className={styles.row}>
            <div className={`col col-6 ${styles.signupImg}`}>
              <img src="/images/signup2.png" alt="img" />
            </div>
            <div className="col col-xl-6 col-lg-7 col-md-10 col-12 m-auto">
              <div className={styles.loginForm}>
                <div className={styles.loginInner}>
                  <h4>{t("otp-auth-label")}</h4>
                  {/* <p>{t("hello-back-label")}</p> */}
                  <p>{t("enter-auth-label")}</p>
                  <form onSubmit={userOtpHandlerChange}>
                    <label htmlFor="cpassword" className="form-group">
                      {t("contact-no-label")}
                      <span className="text-danger mx-1 " style={{fontSize: 'large'}}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="userPhoneNumber"
                      id="cpassword"
                      value={params.id}
                    />
                    {/* <i class={`fas fa-eye ${styles.userCredentials}`}></i> */}
                    <label htmlFor="rpassword" className="form-group">
                      {t("enter-otp-label")}
                      <span className="text-danger mx-1 " style={{fontSize: 'large'}}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="userOtpCode"
                      id="rpassword"
                      maxLength="6"
                      minLength="6"
                      placeholder="Enter 6 Digit OTP here"
                      onChange={userOtpHandler}
                      required
                    />
                    {/* <i class={`fas fa-eye ${styles.userCredentials}`}></i> */}
                    {/* <span className={styles.tc}><a href="">By Signing Up You Must Agree Terms and Conditions</a></span> */}
                    <button
                      className="btn btn-primary text-center mt-4"
                      type="submit"
                      onClick={handleSession}
                    >
                      {t("enter-otp-continue-label")}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOtp;
