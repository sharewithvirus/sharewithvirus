import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SigninHeader from "../SigninHeader";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { requestURL } from "../ReqUrl";

const UserSignUp = () => {
  const navigate = useNavigate();

  const [userRegister, setUserRegister] = useState({
    userPhoneNumber: "",
    status: "Not Verified",
  });
  const { t } = useTranslation();

  const userRegisterHandler = (e) => {
    const { name, value } = e.target;
    setUserRegister({
      ...userRegister,
      [name]: value,
    });
  };

  const userRegisterHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/user-detail`, userRegister)
      .then((res) => {
        // if (res.data.message) {
        navigate(`/userotp/${res.data.userPhoneNumber}`);
        // }
      })
      .catch((e) => {
        console.log("Something Went Wrong...");
      });
  };

  return (
    <>
      <SigninHeader />
      {/* {userRegister.showMessages ? <Success msg={userRegister.msg} /> : null} */}
      <div className={styles.loginPage}>
        <div className={styles.login}>
          <div className={styles.row}>
            <div className={`col col-6 ${styles.signupImg}`}>
              <img src="/images/signup2.png" alt="img" />
            </div>
            <div className=" col col-xl-6 col-lg-7 col-md-10 col-12 m-auto">
              <div className={styles.loginForm}>
                <div className={styles.loginInner}>
                  <h4>{t("sing-up")}</h4>
                  <p>{t("be-an-user")}</p>
                  <p>{t("verify-yourself-label")}</p>
                  <form onSubmit={userRegisterHandlerChange}>
                    <label htmlFor="contactIns" className="form-group">
                      {t("contact-no-label")}
                      <span className="text-danger mx-1 " style={{fontSize: 'large'}}>*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="userPhoneNumber"
                      id="contactIns"
                      maxLength="10"
                      minLength="10"
                      placeholder="Enter 10 Digit Mobile No."
                      onChange={userRegisterHandler}
                      required
                    />
                    {/* <span className={styles.tc}><a href="">By Signing Up You Must Agree Terms and Conditions</a></span> */}
                    <button className="btn btn-primary ms-auto" type="submit">
                      {t("enter-otp-continue-label")}
                    </button>
                    <p>
                      <small className="mt-3">
                        {t("sign-up-term-condition")}
                        <a href="#">{t("sign-up-term1-condition")}</a>
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

export default UserSignUp;
