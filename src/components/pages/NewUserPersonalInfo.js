import React, { useState } from "react";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../ReqUrl";

const NewUserPersonalInfo = (props) => {

  const [personalInfo, setPersonalInfo] = useState({
    userDateOfBirth: props.personal.userDateOfBirth,
    userGender: props.personal.userGender,
    userAddress: props.personal.userAddress,
    userBio: props.personal.userBio,
    userAbout: props.personal.userAbout,
    userHobbies: props.personal.userHobbies,
    userEducation: props.personal.userEducation,
    userEmail: props.personal.userEmail
  });

  const PersonalInfoChange = (e) => {
    e.preventDefault(); 
    axios
      .patch(
        `${requestURL}/user/personal/info/${props.uid ? props.uid : ''}`, personalInfo)
      .then((res) => {
        if (res.data.message) {
         props.onShowPersonalInfo(true)
         props.setAddUserClassFunction(false)
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  return props.trigger ? (
    <>
      <div className={styles.popupbg}
    //   style={{position: 'fixed'}}
      >
        <div
          className={`col col-sm-7 col-md-7 col-lg-7 col-xl-7  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setAddUserClassFunction(false)}
          >
            <i className="fas fa-times"></i>
          </div>
          <h4>Edit Personal Info</h4>
          <form onSubmit={PersonalInfoChange}>
          <div className="row mt-2">
            <div className="col-md-4 my-1">
                <label htmlFor="Date">Date</label>
                <input 
                type="date" 
                name="userDateOfBirth" 
                value={personalInfo.userDateOfBirth} 
                id="Date" 
                className="form-control my-1" 
                onChange={(e) => setPersonalInfo({...personalInfo, userDateOfBirth: e.target.value})} 
                />
            </div>

            <div className="col-md-4 my-1">
                <label htmlFor="Gender">Gender</label>
                <input 
                type="text" 
                name="userGender" 
                id="Gender" 
                value={personalInfo.userGender} 
                className="form-control my-1" 
                onChange={(e) => setPersonalInfo({...personalInfo, userGender: e.target.value})} 
                />
            </div>
            <div className="col-md-4 my-1">
                <label htmlFor="Email">Email</label>
                <input 
                type="email" 
                name="userEmail" 
                id="Email" 
                value={personalInfo.userEmail} 
                className="form-control my-1" 
                onChange={(e) => setPersonalInfo({...personalInfo, userEmail: e.target.value})} 
                />
            </div>
            <div className="col-md-4 my-1">
                <label htmlFor="Bio">Bio</label>
                <textarea 
                type="text" 
                name="userBio" 
                id="Bio" 
                value={personalInfo.userBio} 
                className="form-control my-1" 
                rows='2' 
                cols='30' 
                onChange={(e) => setPersonalInfo({...personalInfo, userBio: e.target.value})} 
                ></textarea>
            </div>
            <div className="col-md-4 my-1">
                <label htmlFor="About">About</label>
                <textarea 
                type="text" 
                name="userAbout" 
                id="About" 
                value={personalInfo.userAbout} 
                className="form-control my-1" 
                rows='2' 
                cols='30' 
                onChange={(e) => setPersonalInfo({...personalInfo, userAbout: e.target.value})} 
                ></textarea>
            </div>      
            <div className="col-md-4 my-1">
                <label htmlFor="Hobbies">Hobbies</label>
                <textarea 
                type="text" 
                name="userHobbies" 
                id="Hobbies" 
                value={personalInfo.userHobbies} 
                className="form-control my-1" 
                rows='2' 
                cols='30' 
                onChange={(e) => setPersonalInfo({...personalInfo, userHobbies: e.target.value})} 
                ></textarea>
            </div>
            <div className="col-md-6 my-1">
                <label htmlFor="Education">Education</label>
                <textarea 
                type="text" 
                name="userEducation" 
                id="Education" 
                value={personalInfo.userEducation} 
                className="form-control my-1" 
                rows='2' 
                cols='30' 
                onChange={(e) => setPersonalInfo({...personalInfo, userEducation: e.target.value})} 
                ></textarea>
            </div>
            <div className="col-md-6 my-1">
                <label htmlFor="Address">Address</label>
                <textarea 
                type="text" 
                name="userAddress" 
                id="Address" 
                value={personalInfo.userAddress} 
                className="form-control my-1" 
                rows='2' 
                cols='30' 
                onChange={(e) => setPersonalInfo({...personalInfo, userAddress: e.target.value})} 
                ></textarea>
            </div>
            
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                Update
              </button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export default NewUserPersonalInfo;
