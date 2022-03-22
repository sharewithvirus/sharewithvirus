import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SigninHeader from "../SigninHeader";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { requestURL } from "../ReqUrl";
import { Success, Danger } from "../SnackBar";
import { useGlobal, setGlobal } from 'reactn'

const UserCreatePassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userData, setUserData] = useState("");
  const [userCreatePasswordData, setUserPasswordData] = useState({
    userPassword: "",
    userRePassword: "",
  });
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  const { t } = useTranslation();
  const userPasswordHandler = (e) => {
    const { name, value } = e.target;
    setUserPasswordData({
      ...userCreatePasswordData,
      [name]: value,
    });
  };

  const userPasswordHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(
        `${requestURL}/create-user-password/${params.id}`,
        userCreatePasswordData
      )
      .then((res) => {
        if(res.data.message === 'Invalid Password Combination'){
          navigate(`/user/create-password/${res.data.user._id}`)
        }
        else{
          if(globalIns){
            if(pageData === 'User'){
              axios.post(`${requestURL}/ins/${globalIns}/add/user/${params.id}`)
              .then((res) =>{
                    setGlobal({
                      userId: '',
                      instituteId: '',
                      page: ''
                    })
                    navigate(`/userdashboard/${res.data.user._id}`);
              })
            }
          }
          else if(globalUser){
            if(pageData === 'User'){
              axios.post(`${requestURL}/user/${globalUser}/add/user/${params.id}`)
              .then((res) =>{
                setGlobal({
                  userId: '',
                  instituteId: '',
                  page: ''
                })
                navigate(`/userdashboard/${res.data.user._id}`);
              })
            }
          }
          else{
            navigate(`/userdashboard/${res.data.user._id}`);
          }        
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong...");
      });
  };

  const [globalIns, setGlobalIns] = useGlobal('instituteId')
  const [globalUser, setGlobalUser] = useGlobal('userId')
  const [pageData, setPageData] = useGlobal('page')

  
  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  const UserCreateEyeHandler = () => {
    const loginPassword = document.querySelector(".usercreatePassword");
    const loginEye = document.querySelector(".UserCreateEye");
    const loginOpenEye = document.querySelector(".UserCreateOpenEye");
    loginPassword.type = "text";
    loginEye.style.display = "block";
    loginOpenEye.style.display = "none";
  };

  const UserCreateOpenEyeHandler = () => {
    const loginPassword = document.querySelector(".usercreatePassword");
    const loginEye = document.querySelector(".UserCreateEye");
    const loginOpenEye = document.querySelector(".UserCreateOpenEye");
    loginPassword.type = "password";
    loginEye.style.display = "none";
    loginOpenEye.style.display = "block";
  };

  const UserReCreateEyeHandler = () => {
    const loginPassword = document.querySelector(".reUserCreatePassword");
    const loginEye = document.querySelector(".UserReCreateEye");
    const loginOpenEye = document.querySelector(".UserReCreateOpenEye");
    loginPassword.type = "text";
    loginEye.style.display = "block";
    loginOpenEye.style.display = "none";
  };

  const UserReCreateOpenEyeHandler = () => {
    const loginPassword = document.querySelector(".reUserCreatePassword");
    const loginEye = document.querySelector(".UserReCreateEye");
    const loginOpenEye = document.querySelector(".UserReCreateOpenEye");
    loginPassword.type = "password";
    loginEye.style.display = "none";
    loginOpenEye.style.display = "block";
  };

  return (
    <>
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
                  <h4>{t("create-auth-label")}</h4>
                  {/* <p>{t("hello-back-label")}</p> */}
                  <p>{t("welcome-auth-label")}</p>
                  <form onSubmit={userPasswordHandlerChange}>
                    <label htmlFor="cpassword" className="form-group">
                      {t("password-label")}
                      <span className="text-danger mx-1 " style={{fontSize: 'large'}}>*</span>

                    </label>
                    <input
                      type="password"
                      className="form-control usercreatePassword"
                      name="userPassword"
                      id="cpassword"
                      minLength="9"
                      placeholder="Enter Password"
                      onChange={userPasswordHandler}
                      required
                    />
                    
                    <img
                      src="/images/open-eye-icon.svg"
                      className={`${styles.userCredentials} UserCreateEye`}
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Password"
                      style={{
                        left: '458px',
                        cursor: "pointer",
                        display: "none",
                        marginTop: "6px",
                      }}
                      onClick={UserCreateOpenEyeHandler}
                    />
                    
                    <img
                      src="/images/close-eye-icon.svg"
                      className={`${styles.userCredentials} UserCreateOpenEye`}
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Password"
                      style={{
                        left: '458px',
                        cursor: "pointer",
                        marginTop: "6px",
                      }}
                      onClick={UserCreateEyeHandler}
                    />
                    <label htmlFor="rpassword" className="form-group">
                      {t("re-type-auth-label")}
                      <span className="text-danger mx-1 " style={{fontSize: 'large'}}>*</span>

                    </label>
                    <input
                      type="password"
                      className="form-control reUserCreatePassword"
                      name="userRePassword"
                      id="rpassword"
                      minLength="9"
                      placeholder="Re-Enter Password"
                      onChange={userPasswordHandler}
                      required
                    />
                    <img
                      src="/images/close-eye-icon.svg"
                      className={`${styles.userCredentials} UserReCreateEye`}
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Password"
                      style={{
                        left: '458px',
                        cursor: "pointer",
                        display: "none",
                        marginTop: "6px",
                      }}
                      onClick={UserReCreateOpenEyeHandler}
                    />
                    
                    <img
                      src="/images/close-eye-icon.svg"
                      className={`${styles.userCredentials} UserReCreateOpenEye`}
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Password"
                      style={{
                        left: '458px',
                        cursor: "pointer",
                        marginTop: "6px",
                      }}
                      onClick={UserReCreateEyeHandler}
                    />
                    <button
                      className="btn btn-primary text-center mt-4"
                      type="submit"
                    >
                      {t("continue-auth-label")}
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

export default UserCreatePassword;
