import React, { useState } from "react";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../ReqUrl";

const NewInsPersonalInfo = (props) => {

  const [personalInfo, setPersonalInfo] = useState({
    insType: props.data.insType,
    insMode: props.data.insMode,
    insEmail: props.data.insEmail,
    insState: props.data.insState,
    insAffiliated: props.data.insAffiliated,
    insEstdDate: props.data.insEstdDate,
    insAddress: props.data.insAddress,
    insAbout: props.data.insAbout
  });


  const PersonalInfoHandlerChange = (e) => {
    e.preventDefault(); 
    axios
      .patch(
        `${requestURL}/ins/personal/info/${props.id ? props.id : ''}`, personalInfo)
      .then((res) => {
        if (res.data.message) {
         props.setAddInsClassFunction(false)
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
            onClick={() => props.setAddInsClassFunction(false)}
          >
            <i className="fas fa-times"></i>
          </div>
          <h4>Edit Personal Info</h4>
          <form onSubmit={PersonalInfoHandlerChange}>
          <div className="row mt-2">
            <div className="col-md-4 my-1">
                <label htmlFor="Date">Estd. Date</label>
                <input 
                type="date" 
                name="insEstdDate" 
                id="Date" 
                className="form-control my-1" 
                value={personalInfo.insEstdDate}
                onChange={(e) => setPersonalInfo({ ...personalInfo, insEstdDate: e.target.value})}
                />
            </div>

            <div className="col-md-4 my-1">
                <label htmlFor="Type">Inst. Type</label>
                <input 
                type="text" 
                name="insType" 
                id="Type" 
                className="form-control my-1" 
                value={personalInfo.insType}
                onChange={(e) => setPersonalInfo({ ...personalInfo, insType: e.target.value})} 
                />
            </div>
            <div className="col-md-4 my-1">
                <label htmlFor="Mode">Inst. Mode</label>
                <input 
                type="text" 
                name="insMode" 
                id="Mode" 
                className="form-control my-1" 
                value={personalInfo.insMode}
                onChange={(e) => setPersonalInfo({ ...personalInfo, insMode: e.target.value})} 
                />
            </div>
            <div className="col-md-4 my-1">
                <label htmlFor="Affliated">Affiliated</label>
                <input 
                type="text" 
                name="insAffiliated" 
                id="Affliated" 
                className="form-control my-1" 
                value={personalInfo.insAffiliated}
                onChange={(e) => setPersonalInfo({ ...personalInfo, insAffiliated: e.target.value})} 
                />
            </div>
            <div className="col-md-4 my-1">
                <label htmlFor="State">State</label>
                <input 
                type="text" 
                name="insState" 
                id="State" 
                className="form-control my-1" 
                value={personalInfo.insState}
                onChange={(e) => setPersonalInfo({ ...personalInfo, insState: e.target.value})} 
                />
            </div>
            <div className="col-md-4 my-2">
                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                name="insEmail" 
                id="email" 
                className="form-control my-1" 
                value={personalInfo.insEmail}
                onChange={(e) => setPersonalInfo({ ...personalInfo, insEmail: e.target.value})} 
                />
            </div>
            <div className="col-md-6 my-1">
                <label htmlFor="About">Inst About</label>
                <textarea 
                type="text" 
                name="insAbout" 
                id="About" 
                className="form-control my-1" 
                rows='2' 
                cols='30' 
                value={personalInfo.insAbout}
                onChange={(e) => setPersonalInfo({ ...personalInfo, insAbout: e.target.value})} 
                ></textarea>
            </div>
            <div className="col-md-6 my-1">
                <label htmlFor="Address">Address</label>
                <textarea 
                type="text" 
                name="insAddress" 
                id="Address" 
                className="form-control my-1" 
                rows='2' 
                cols='30' 
                value={personalInfo.insAddress}
                onChange={(e) => setPersonalInfo({ ...personalInfo, insAddress: e.target.value})} 
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

export default NewInsPersonalInfo;
