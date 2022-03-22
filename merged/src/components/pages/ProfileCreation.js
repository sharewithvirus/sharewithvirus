import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SigninHeader from '../SigninHeader'
import { Success } from "../SnackBar";
import { useTranslation } from "react-i18next";
import { requestURL } from "../ReqUrl";

const ProfileCreation = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [date, setDate] = useState(new Date())

  var p_date = date.getDate()
  var p_month = date.getMonth() + 1
  var p_year = date.getFullYear()
  if(p_month <= 10){
    p_month = `0${p_month}`
  }
  var DOB = `${p_year}-${p_month}-${p_date}`

  
  const [userProfile, setUserProfile] = useState({
    userLegalName: "",
    username: "",
    userDateOfBirth: "",
    userAddress: "",
    userBio: "",
    userGender: "",
    status: `${params.uid}`,
  });
  const { t } = useTranslation();

  const userProfileHandler = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  const userProfileHandlerChange = (e) => {
    e.preventDefault();
    if (userProfile.username.includes(" ")) {
      setAdminMsg({
        showMessages: true,
        msg: "username must include _.@# (no spaces allowed)",
      });
    }
    else if(userProfile.userDateOfBirth >= DOB){
      setAdminMsg({
        showMessages: true,
        msg: "Invalid Date of Birth",
      });
    }
    else {
      axios
        .post(`${requestURL}/profile-creation/${params.id}`, userProfile)
        .then((res) => {
          setAdminMsg({ showMessages: true, msg: res.data.message });
          if (
            res.data.message === "Username already exists" &&
            res.status(200)
          ) {
            navigate(`/userprofile/${params.id}`);
          } else {
            navigate(`/user/create-password/${res.data.user._id}`);
          }
        })
        .catch((e) => {
          console.log("Something Went Wrong...");
        });
    }
  };

  return (
    <>
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}
      <SigninHeader />
      <div className={styles.profileCreationPage}>
        <div
          className={styles.registrationPage}
          style={{ height: "100vh", display: "flex", alignItems: "center" }}
        >
          <div className={`col col-md-10 col-sm-12 ${styles.registrationForm}`}>
            <div
              className={`mx-auto ${styles.outer2} 
          ${styles.profilecoverName} mt-4`}
              style={{ width: "80%", padding: '28px' }}
            >
              <form
                className="row g-4 my-4"
                onSubmit={userProfileHandlerChange}
              >
                <h4 className="my-4">Profile Creation</h4>
                <div className="col-md-6 col-sm-12 mt-3">
                  <label htmlFor="legalname" className="form-group mb-2">
                    {t("legal-name-label")}
                    <span className={styles.requireField}>*</span>
                  </label>
                  <input
                    type="text"
                    name="userLegalName"
                    className="form-control"
                    id="legalname"
                    placeholder="Enter Legal Name"
                    onChange={userProfileHandler}
                    required
                  />
                </div>
                <div className="col-md-6 col-sm-12 mt-3">
                  <label htmlFor="legalname" className="form-group mb-2">
                    <b>{t("your-name-label")}
                    <span className={styles.requireField}>*</span>
                    </b>
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="legalname"
                    minLength="6"
                    placeholder="Enter Unique Username"
                    onChange={userProfileHandler}
                    autoFocus
                    required
                  />
                </div>
                <div className="col-md-6 col-sm-12 mt-3">
                  <label htmlFor="dob" className="form-group mb-2">
                    {t("dob-label")}
                    <span className={styles.requireField}>*</span>
                  </label>
                  <input
                    type="date"
                    name="userDateOfBirth"
                    className="form-control"
                    id="dob"
                    placeholder="01-01-2001"
                    onChange={userProfileHandler}
                    required
                  />
                </div>
                <div className="col-md-6 col-sm-12 mt-4">
                  <label htmlFor="gender" className="form-group mb-2">
                    {t("gender-label")}
                    <span className={styles.requireField}>*</span>
                  </label>
                  <select
                    id="gender"
                    className="form-control"
                    name="userGender"
                    onChange={userProfileHandler}
                    required
                  >
                    <option value="Select Gender">{t("gender0-label")}</option>
                    <option value="Male">{t("gender1-label")}</option>
                    <option value="Female">{t("gender2-label")}</option>
                    <option value="Other">{t("gender3-label")}</option>
                  </select>
                </div>
                <div className="col-md-6 col-sm-12 mt-4">
                  <label htmlFor="address" className="form-group mb-2">
                    {t("address-label")}
                    (optional)
                  </label>
                  <textarea
                    type="text"
                    name="userAddress"
                    className="form-control"
                    id="address"
                    rows="2"
                    cols="30"
                    placeholder="Write Your Address Here"
                    onChange={userProfileHandler}
                    // required
                  ></textarea>
                </div>
                <div className="col-md-6 col-sm-12 mt-4">
                  <label htmlFor="bio" className="form-group mb-2">
                    {t("bio-label")}
                    (optional)
                  </label>
                  <textarea
                    type="text"
                    name="userBio"
                    className="form-control"
                    id="bio"
                    rows="2"
                    cols="30"
                    placeholder="Write Something About Here"
                    onChange={userProfileHandler}
                    // required
                  ></textarea>
                </div>
                <div className="col-12 mt-4 justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-outline-primary mx-auto px-5 "
                  >
                    {t("save-label")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCreation;
