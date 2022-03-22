import React, { useState } from "react";
import { useGlobal, setGlobal } from 'reactn'
import { useNavigate } from "react-router-dom";
import styles from "../Home.module.css";
import "./SignUp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SigninHeader from "../SigninHeader";
import { useTranslation } from "react-i18next";
const SignUp = () => {
  const navigate = useNavigate();
  const [splashOn, setSplashOn] = useState(true);
  const { t } = useTranslation();
  const [userData, setUserData] = useGlobal('id')
  const [insData, setInsData] = useGlobal('iid')
  const UserSignUpHandler = () =>{
    var page = insData || userData ? 'User' : ''
    setGlobal({
      userId: `${userData ? userData : ''}`,
      instituteId: `${insData ? insData : ''}`,
      page: page
    })
    navigate("/usersignup")
  }

  const InstituteSignUpHandler = () =>{
    var page = userData || insData ? 'Institute' : ''
    setGlobal({
      instituteId: `${insData ? insData : ''}`,
      userId: `${userData ? userData : ''}`,
      page: page
    })
    navigate("/insenquiry")
  }

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
                  <h4>{t("sing-up")}</h4>
                  <div className={styles.signup}>
                    <div
                      className={styles.signupInner}
                      onClick={InstituteSignUpHandler}
                      style={{ cursor: "pointer" }}
                    >
                      {t("as-institution")}
                    </div>
                    <div
                      className={styles.signupInner}
                      onClick={UserSignUpHandler}
                      style={{ cursor: "pointer" }}
                    >
                      {t("as-user")}
                    </div>
                  </div>
                  <p className="my-2">
                    <small>
                      {t("alread-have-an-account")}
                      <a href="" onClick={() => navigate("/login")}>
                        {t("login-first-label")}
                      </a>
                    </small>
                  </p>
                  <p className="mt-4">
                    <small className="mt-3">
                      {t("sign-up-term-condition")}
                      <a
                        className="text-primary"
                        onClick={() => navigate(`/terms/and/condition`)}
                      >
                        {t("sign-up-term1-condition")}
                      </a>
                    </small>
                    <small className="mt-3">
                      {t("and-label")}
                      <a
                        className="text-primary"
                        onClick={() => navigate(`/privacy/policy`)}
                      >
                        {" "}
                        {t("privacy-policy-label")}{" "}
                      </a>
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
