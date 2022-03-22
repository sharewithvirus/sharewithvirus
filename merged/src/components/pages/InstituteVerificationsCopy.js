import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useGlobal, setGlobal } from 'reactn'
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SigninHeader from "../SigninHeader";
import axios from "axios";
import { Success, Danger } from "../SnackBar";
import { requestURL } from "../ReqUrl";

const InstituteVerificationsCopy = () => {
  const navigate = useNavigate();
  const params = useParams();
  
  const [globalIns, setGlobalIns] = useGlobal('instituteId')
  const [globalUser, setGlobalUser] = useGlobal('userId')
  const [pageData, setPageData] = useGlobal('page')

  const [insCreatePassword, setInsCreatePassword] = useState({
    insPassword: "",
    insRePassword: "",
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

  const passwordHandleChange = (e) => {
    const { name, value } = e.target;
    setInsCreatePassword({
      ...insCreatePassword,
      [name]: value,
    });
  };

  const CreatePasswordHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/create-password/${params.id}`, insCreatePassword)
      .then((res) => {
        if (res.data.message) {
          setInsCreatePassword({ showMessages: true, msg: res.data.message });
          if(globalIns){
            if(pageData === 'Institute'){
              axios.post(`${requestURL}/ins/${globalIns}/add/ins/${params.id}`)
              .then((res) =>{
                  setGlobal({
                    userId: '',
                    instituteId: '',
                    page: ''
                  })
                  navigate(`/insdashboard/${res.data.institute._id}`);
              })
            }
          }
          else if(globalUser){
            if(pageData === 'Institute'){
              axios.post(`${requestURL}/user/${globalUser}/add/ins/${params.id}`)
              .then((res) =>{
                  setGlobal({
                    userId: '',
                    instituteId: '',
                    page: ''
                  })
                  navigate(`/insdashboard/${res.data.institute._id}`);
              })
            }
          }
          else {
            navigate(`/insdashboard/${res.data.institute._id}`);
          }
        
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong...");
      });
  };

  const InstCreateEyeHandler = () => {
    const loginPassword = document.querySelector(".createPassword");
    const loginEye = document.querySelector(".InstCreateEye");
    const loginOpenEye = document.querySelector(".InstCreateOpenEye");
    loginPassword.type = "text";
    loginEye.style.display = "block";
    loginOpenEye.style.display = "none";
  };

  const InstCreateOpenEyeHandler = () => {
    const loginPassword = document.querySelector(".createPassword");
    const loginEye = document.querySelector(".InstCreateEye");
    const loginOpenEye = document.querySelector(".InstCreateOpenEye");
    loginPassword.type = "password";
    loginEye.style.display = "none";
    loginOpenEye.style.display = "block";
  };

  const InstReCreateEyeHandler = () => {
    const loginPassword = document.querySelector(".reCreatePassword");
    const loginEye = document.querySelector(".InstReCreateEye");
    const loginOpenEye = document.querySelector(".InstReCreateOpenEye");
    loginPassword.type = "text";
    loginEye.style.display = "block";
    loginOpenEye.style.display = "none";
  };

  const InstReCreateOpenEyeHandler = () => {
    const loginPassword = document.querySelector(".reCreatePassword");
    const loginEye = document.querySelector(".InstReCreateEye");
    const loginOpenEye = document.querySelector(".InstReCreateOpenEye");
    loginPassword.type = "password";
    loginEye.style.display = "none";
    loginOpenEye.style.display = "block";
  };

  
  return (
    <>
      <SigninHeader />
      {insCreatePassword.showMessages ? (
        <Success msg={insCreatePassword.msg} />
      ) : null}
      {/* {insLogin.showMessagesDanger ? <Danger msg={insLogin.msg} /> : null} */}
      <div className={styles.loginPage}>
        <div className={styles.login}>
          <div className={styles.row}>
            <div className={`col col-6 ${styles.signupImg}`}>
              <img src="/images/signup2.png" alt="img" />
            </div>
            <div className="col col-xl-6 col-lg-7 col-md-10 col-12 m-auto">
              <div className={styles.loginForm}>
                <div className={styles.loginInner}>
                  <h4>Create Login Password</h4>
                  <p>At least 8 Characters, One</p>
                  <p>Special, One Uppercase, One Lowercase, Digit Required</p>
                  <form onSubmit={CreatePasswordHandler}>
                    <label htmlFor="crpassword" className="form-group">
                      Create Password
                      <span className="text-danger mx-1 " style={{fontSize: 'large'}}>*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control createPassword"
                      name="insPassword"
                      id="crpassword"
                      minLength="8"
                      placeholder="Enter password"
                      onChange={passwordHandleChange}
                      required
                    />

                    <img
                      src="/images/open-eye-icon.svg"
                      className={`${styles.userCredentials} InstCreateEye`}
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Password"
                      style={{
                        left: '458px',
                        cursor: "pointer",
                        display: "none",
                      }}
                      onClick={InstCreateOpenEyeHandler}
                    />
                    <img
                      src="/images/close-eye-icon.svg"
                      className={`${styles.userCredentials} InstCreateOpenEye`}
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Password"
                      style={{
                        left: '458px',
                        cursor: "pointer",
                        marginTop: "6px",
                      }}
                      onClick={InstCreateEyeHandler}
                    />
                    <label htmlFor="repassword" className="form-group">
                      Re-Enter Password
                      <span className="text-danger mx-1 " style={{fontSize: 'large'}}>*</span>

                    </label>
                    <input
                      type="password"
                      className="form-control reCreatePassword"
                      name="insRePassword"
                      id="repassword"
                      minLength="8"
                      placeholder="Re-enter password"
                      onChange={passwordHandleChange}
                      required
                    />

                    <img
                      src="/images/open-eye-icon.svg"
                      className={`${styles.userCredentials} InstReCreateEye`}
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Password"
                      style={{
                        left: '458px',
                        cursor: "pointer",
                        display: "none",
                      }}
                      onClick={InstReCreateOpenEyeHandler}
                    />
                    <img
                      src="/images/close-eye-icon.svg"
                      className={`${styles.userCredentials} InstReCreateOpenEye`}
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Password"
                      style={{
                        left: '458px',
                        cursor: "pointer",
                        marginTop: "6px",
                      }}
                      onClick={InstReCreateEyeHandler}
                    />
                    {/* <span className={styles.tc}><a href="">By Signing Up You Must Agree Terms and Conditions</a></span> */}
                    <button
                      className="btn btn-primary text-center mt-4"
                      type="submit"
                    >
                      Continue
                    </button>
                    <p>
                      <small className="mt-3">
                        By Signing Up You Must Agree All{" "}
                        <a href="">Terms and Conditions </a>
                      </small>
                    </p>
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

export default InstituteVerificationsCopy;
