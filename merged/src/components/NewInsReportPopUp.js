import React, { useState } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "./ReqUrl";

const NewInsReportPopUp = (props) => {

  const [reportData, setReportData] = useState({
    reportStatus: ''
  });

  const ReportHandler = (e) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value,
    });
  };

  const ReportHandlerChange = (e) => {
    e.preventDefault();  
    if(reportData.reportStatus === ''){
        alert('Report content must')
    } 
    else{
    axios
      .post(
        `${requestURL}/ins/${props.id ? props.id : ''}/ins-post/${props.PostId ? props.PostId : ''}/report`, reportData)
      .then((res) => {
        if (res.data.message) {
            props.setAddUsersClassFunction(false)        
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    }
  };


  return props.trigger ? (
    <>
      <div className={styles.popupbg}
      style={{position: 'fixed'}}
      >
        <div
          className={`col col-sm-8 col-md-8 my-2 col-lg-6 col-xl-6  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setAddUsersClassFunction(false)}
          >
            <i className="fas fa-times"></i>
          </div>
          <h4>Report Post Image / Title</h4>
          <form onSubmit={ReportHandlerChange}>
          <div className="row mt-2">
          <div className="col-md-6 my-2" style={{display: 'flex', alignItems: 'center'}}>
                <input type="radio" name="reportStatus" className="mx-2" id="sContent" value="Sexual Content"  onChange={ReportHandler}/>
                <label htmlFor="sContent">Sexual Content</label>
            </div>
            <div className="col-md-6 my-2" style={{display: 'flex', alignItems: 'center'}}>
                <input type="radio" name="reportStatus" className="mx-2" id="vContent" value="Violent or repulsive content"  onChange={ReportHandler}/>
                <label htmlFor="vContent">Violent or repulsive content</label>
            </div>
            <div className="col-md-6 my-2" style={{display: 'flex', alignItems: 'center'}}>
                <input type="radio" name="reportStatus" className="mx-2" id="hContent" value="Hateful or abusive content"  onChange={ReportHandler}/>
                <label htmlFor="hContent">Hateful or abusive content</label>
            </div>
            <div className="col-md-6 my-2" style={{display: 'flex', alignItems: 'center'}}>
                <input type="radio" name="reportStatus" className="mx-2" id="dContent" value="Harmful or dangerous act"  onChange={ReportHandler}/>
                <label htmlFor="dContent">Harmful or dangerous act</label>
            </div>
            <div className="col-md-6 my-2" style={{display: 'flex', alignItems: 'center'}}>
                <input type="radio" name="reportStatus" className="mx-2" id="mContent" value="Spam or misleading"  onChange={ReportHandler}/>
                <label htmlFor="mContent">Spam or misleading</label>
            </div>
            <div className="col-md-6 my-2" style={{display: 'flex', alignItems: 'center'}}>
                <input type="radio" name="reportStatus" className="mx-2" id="oContent" value="Other"  onChange={ReportHandler}/>
                <label htmlFor="oContent">Other</label>
            </div>
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                Report
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

export default NewInsReportPopUp;
