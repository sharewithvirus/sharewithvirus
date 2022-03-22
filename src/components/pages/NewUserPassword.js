import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SigninHeader from "../SigninHeader";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Success } from "../SnackBar";
const NewUserPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  // const [userData, setUserData] = useState("");
  // const [insData, setInsData] = useState("");

  const [newPassword, setNewPassword] = useState({
    userPassword: "",
    userRePassword: "",
  });
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  const userNewPassword = (e) => {
    const { name, value } = e.target;
    setNewPassword({
      ...newPassword,
      [name]: value,
    });
  };

  const userNewPasswordChange = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/user/reset/password/${params.rid}`, newPassword)
      .then((res) => {
        setAdminMsg({ showMessages: true, msg: res.data.message });

        setTimeout(() => {
          navigate(`/login`);
        }, 100);
      })
      .catch((e) => {
        console.log("Something Went Wrong...");
      });
  };

  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.fid}`)
      .then((res) => {
        // setUserData(res.data.user);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/insdashboard/${params.fid}`)
      .then((res) => {
        // setInsData(res.data.institute);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

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
                  <h4>Forgot Password</h4>
                  <p>Hello Everyone, Welcome Back</p>
                  <p>OTP will sent to registered mobile number</p>
                  <form onSubmit={userNewPasswordChange}>
                    <label htmlFor="cpassword" className="form-group">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="userPassword"
                      id="cpassword"
                      minLength="8"
                      placeholder="new password"
                      onChange={userNewPassword}
                      required
                    />

                    <label htmlFor="rpassword" className="form-group">
                      Re-Enter Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="userRePassword"
                      id="rpassword"
                      minLength="8"
                      placeholder="Re-Enter Password "
                      onChange={userNewPassword}
                      required
                    />

                    {/* <i class={`fas fa-eye ${styles.userCredentials}`}></i> */}
                    {/* <label htmlFor="rpassword" className="form-group">
                    Re-Type Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="rpassword"
                    id="rpassword"
                    placeholder="Re-enter password"
                  /> */}
                    {/* <i class={`fas fa-eye ${styles.userCredentials}`}></i> */}
                    {/* <span className={styles.tc}><a href="">By Signing Up You Must Agree Terms and Conditions</a></span> */}
                    <button
                      className="btn btn-primary text-center mt-4"
                      type="submit"
                    >
                      Change Password
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

export default NewUserPassword;
