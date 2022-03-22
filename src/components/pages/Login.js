import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SigninHeader from "../SigninHeader";
import { Success, Danger } from "../SnackBar";
import { useTranslation } from "react-i18next";
import { requestURL } from "../ReqUrl";
import axios from "axios";
import Loading from "../Loading";

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [insLogin, setInsLogin] = useState({
    insUserName: "",
    insPassword: "",
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

  const [insLoginError, setInsLoginError] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

  const passwordHandleChange = (e) => {
    const { name, value } = e.target;
    setInsLogin({
      ...insLogin,
      [name]: value,
    });
  };

  const instituteLoginHandler = (e) => {
    e.preventDefault();
    setOpen(true);
    axios
      .post(`${requestURL}/ins-login`, insLogin)
      .then((res) => {
        if (res.data.message === "Successfully LoggedIn as a Institute") {
          if (res.data.message) {
            setOpen(false);
            setInsLogin({ showMessages: true, msg: res.data.message });
            localStorage.setItem('instituteId', res.data.institute._id)
          }
          setTimeout(() => {
            navigate(`/insdashboard/${res.data.institute._id}`);
          }, 100);
        } else if (res.data.message === "Successfully LoggedIn as a User") {
          if (res.data.message) {
            setOpen(false);
            setInsLogin({ showMessages: true, msg: res.data.message });
            localStorage.setItem('userId', res.data.user._id)
          }
          setTimeout(() => {
            navigate(`/userdashboard/${res.data.user._id}`);
          }, 100);
        } else if (
          res.data.message === "Successfully LoggedIn as a Super Admin"
        ) {
          if (res.data.message) {
            setOpen(false);
            setInsLogin({ showMessages: true, msg: res.data.message });
            localStorage.setItem('adminId', res.data.admin._id)
          }
          setTimeout(() => {
            navigate(`/admindashboard/${res.data.admin._id}`);
          }, 100);
        }

        if (res.data.message === "Invalid Credentials") {
          if (res.data.message) {
            setOpen(false);
            setInsLoginError({ showMessagesDanger: true, msg: res.data.message });
          }
          setTimeout(() => {
            navigate(`/login`);
          }, 100);
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong...");
      });
  };
  const { t } = useTranslation();

  const LoginEyeHandler = () => {
    const loginPassword = document.querySelector(".LoginPassword");
    const loginEye = document.querySelector(".LoginEye");
    const loginOpenEye = document.querySelector(".LoginOpenEye");
    loginPassword.type = "text";
    loginEye.style.display = "block";
    loginOpenEye.style.display = "none";
  };

  const LoginOpenEyeHandler = () => {
    const loginPassword = document.querySelector(".LoginPassword");
    const loginEye = document.querySelector(".LoginEye");
    const loginOpenEye = document.querySelector(".LoginOpenEye");
    loginPassword.type = "password";
    loginEye.style.display = "none";
    loginOpenEye.style.display = "inline";
  };

  // function isDate(val) {
  //   // Cross realm comptatible
  //   return Object.prototype.toString.call(val) === '[object Date]'
  // }
  
  // function isObj(val) {
  //   return typeof val === 'object'
  // }
  
  //  function stringifyValue(val) {
  //   if (isObj(val) && !isDate(val)) {
  //     return JSON.stringify(val)
  //   } else {
  //     return val
  //   }
  // }
  
  // function buildForm({ action, params }) {
  //   const form = document.createElement('form')
  //   form.setAttribute('method', 'post')
  //   form.setAttribute('action', action)
  
  //   Object.keys(params).forEach(key => {
  //     const input = document.createElement('input')
  //     input.setAttribute('type', 'hidden')
  //     input.setAttribute('name', key)
  //     input.setAttribute('value', stringifyValue(params[key]))
  //     form.appendChild(input)
  //   })
  
  //   return form
  // }
  
  //  function post(details) {
  //   const form = buildForm(details)
  //   document.body.appendChild(form)
  //   form.submit()
  //   form.remove()
  // }


// const data = {
//   amount: '100',
//   email: 'yelpcamp44@gmail.com'
// }

// const makePayment = () =>{

//   axios.post(`${requestURL}/api/payment`, data)
//   .then((res) =>{
//     console.log(res)
//   //   var information={
//   //     action:"https://securegw-stage.paytm.in/order/process",
//   //     params:res.data
//   // }
//   // post(information)
//   })
//   .catch((e) =>{
//     console.log('something went wrong')
//   })

// }

  return (
    <>
      <SigninHeader />
      {insLoginError.showMessagesDanger ? (
        <Danger msg={insLoginError.msg} />
      ) : null}
      <div className={styles.loginPage}>
        <div className={styles.login}>
          <div className={styles.row}>
            <div className={`col col-6 ${styles.signupImg}`}>
              <img src="/images/signup2.png" alt="img" />
            </div>
            <div className="col col-xl-6 col-lg-7 col-md-10 col-12 m-auto">
              <div className={styles.loginForm}>
                <div className={styles.loginInner}>
                  <h4>{t("login-label")}</h4>
                  {/* <p>{t("hello-back-label")}</p> */}
                  <p>{t("mithkal-label")}</p>
                  <form onSubmit={instituteLoginHandler}>
                    <label htmlFor="email" className="form-group">
                      {t("your-name-label")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="insUserName"
                      id="email"
                      maxLength="30"
                      placeholder="Enter Username"
                      onChange={passwordHandleChange}
                      required
                    />
                    <img
                      src="/images/login-user-icon.svg"
                      className={styles.userCredentials}
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Username"
                      style={{marginRight: '-211px'}}
                    /> 
                    <label htmlFor="password" className="form-group">
                      {t("password-label")}
                    </label>
                    <input
                      type="password"
                      className="form-control LoginPassword"
                      name="insPassword"
                      id="password"
                      minLength="8"
                      placeholder="Enter password"
                      onChange={passwordHandleChange}
                      required
                    />
                    <img
                      src="/images/open-eye-icon.svg"
                      className={`${styles.userCredentials} LoginEye`}
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Password"
                      style={{marginRight: "-229px",
                      cursor: "pointer",
                      display: "none",
                      left: '454px'}}
                      onClick={LoginOpenEyeHandler}
                    />
                    <img
                      src="/images/close-eye-icon.svg"
                      className={`${styles.userCredentials} LoginOpenEye`}
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Password"
                      style={{marginRight: "-212px", cursor: "pointer",marginTop: "-4px", left: '112px'}}
                      onClick={LoginEyeHandler}
                    />
                   
                    <div>
                      <span>
                        <a onClick={() => navigate("/forgot")} style={{cursor: 'pointer'}}>
                          {t("password-forgot-label")}
                        </a>
                      </span>
                    </div>

                    <button
                      className="btn btn-primary text-center"
                      type="submit"
                    >
                      {t("login-label")}
                    </button>
                    <small className="mt-2">{t("or-label")}</small>
                    <button
                      className="btn btn-primary text-center"
                      type="submit"
                      onClick={() => navigate("/signup")}
                    >
                      {t("cretae-account-label")}
                    </button>
                  </form>
                  {/* <button onClick={makePayment}>Pay using Paytm</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
