import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import AboutSection from "../AboutSection";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import BackButton from "../BackButton";
import axios from 'axios'
import { requestURL } from "../ReqUrl";

const StudentJoiningInfo = () => {
  const navigate = useNavigate();
  const params = useParams()

  const [insData, setInsData] = useState('')
  const [randData, setRandData] = useState('')
  useEffect(() =>{
    axios.get(`${requestURL}/insdashboard/${params.id}`)
    .then((res) =>{
       setInsData(res.data.institute)
    })
    .catch((e) =>{
      console.log("Something went wrong")
    })
  },[]) 

  const RandomCodeHandler = () =>{
    let rand1 = Math.floor(Math.random() * 5) + 1
    let rand2 = Math.floor(Math.random() * 5) + 1
    let rand3 = Math.floor(Math.random() * 5) + 1
    let rand4 = Math.floor(Math.random() * 5) + 1
    let rand5 = Math.floor(Math.random() * 5) + 1

    setRandData(`${rand1}${rand2}${rand3}${rand4}${rand5}`)
  }

  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopInstitute id={params.id}/>
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
              <AboutSection id={params.id}/>
                <div className={` ${styles.about} ${styles.leftMenu}`}>
                <div
                    className={`mt-5 ${styles.dabout} ${styles.active}`}
                    onClick={() => navigate(`/allstaff/${params.id}`)}
                  >
                    <img
                    src="/images/staff-icon.svg"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Staff"
                  /> Staff
                  </div>
                  <div
                    className={`${styles.dabout} mt-3 mb-2`}
                    onClick={() => navigate(`/allstudent/${params.id}`)}
                  >
                    <img
                    src="/images/student-icon.svg"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Student"
                  /> Students
                  </div>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={` ${styles.outer2}`}>
                  <form className="row">
                    <h4>Student Joining Form</h4>
                    <div className="w-100 d-flex justify-content-end ml-5">
                      <button
                        type="button"
                        className="btn btn-outline-info ml-5"
                        onClick={() => navigate(`/studentformSetup/${params.id}`)}
                      >
                        <i class="far fa-plus-square mt-1 mx-2"></i>Joining
                        Details
                      </button>
                    </div>

                    <div className="col-12 col-lg-10 col-xl-7 my-4">
                      <div className={styles.hint}>
                        <h5>
                          Joining Process{" "}
                          <img
                          src="/images/s-edit-icon.svg"
                          className={styles.editHint}
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Edit"
                        /> 
                        </h5>
                        <hr />
                        <ol>
                          <li>Must be a Existing Student of Institute</li>
                          <li>Aval Institute Code from Institute</li>
                          <li>Fill Joining Form and Submit</li>
                          <li>Wait For Approval or Contact Institute</li>
                        </ol>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12  col-md-6 mt-4">
                        <label htmlFor="atitle" className="form-group mb-2">
                          Application Title
                        </label>
                        <input
                          type="text"
                          name="atitle"
                          className="form-control"
                          id="atitle"
                          value="Student Joining Form"
                          disabled
                          readOnly
                        />
                      </div>
                      <div className="col-12 col-md-6 mt-4">
                        <label htmlFor="aicode" className="form-group mb-2">
                          Institute Code <span onClick={RandomCodeHandler} style={{cursor: 'pointer'}}>&nbsp;</span>
                          <img
                          src="/images/s-refresh-icon.svg"
                          className={styles.editHint}
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Refresh"
                        /> 
                        </label>
                        <input
                          readOnly
                          type="text"
                          name="aicode"
                          className={`form-control `}
                          id="aicode"
                          value={`INST-STU-${randData}`}
                        />
                      </div>
                      <div className="col-12  col-md-6 my-4">
                        <label htmlFor="akyc" className="form-group mb-2">
                          Mandatory KYC
                        </label>
                        <select id="akyc" className="form-control" disabled>
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                      <div className="col-12 d-flex my-4 justify-content-center">
                        <button
                          type="submit"
                          className=" col-2 btn btn-primary justify-content-center"
                        >
                          Save
                        </button>
                        <button
                          type="submit"
                          className=" col-2 btn btn-info px-5 mx-3 justify-content-center"
                          onClick={() => navigate(`/studentapplication/${params.id}`)}
                        >
                          Preview
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomInstitute id={params.id}/>
      </div>
    </>
  );
};

export default StudentJoiningInfo;
