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

const StudentjoinformSetup = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [insData, setInsData] = useState('')

  useEffect(() =>{
    axios.get(`${requestURL}/insdashboard/${params.id}`)
    .then((res) =>{
       setInsData(res.data.institute)
    })
    .catch((e) =>{
      console.log("Something went wrong")
    })
  },[]) 
  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopInstitute id={params.id}/>
        <div className={`${styles.mainContent}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
              <AboutSection id={params.id}/>
                <div className={`${styles.about} ${styles.leftMenu}`}>
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
                  <h4>Setup Joining Details</h4>
                  <div className={styles.formFields}>
                    <h6 className="text-left">
                      *Please select the fields to add in the application form:
                    </h6>
                    <form className="row my-5">
                      <div class="col col-12 col-md-6  form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckCheckedDisabled"
                          checked
                          disabled
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckCheckedDisabled"
                        >
                          Full Name
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckCheckedDisabled"
                          checked
                          disabled
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckCheckedDisabled"
                        >
                          Date of Birth
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckCheckedDisabled"
                          checked
                          disabled
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckCheckedDisabled"
                        >
                          Gender
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckCheckedDisabled"
                          checked
                          disabled
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckCheckedDisabled"
                        >
                          Phone Number
                        </label>
                      </div>

                      <div class=" col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Passport size Photo
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Nationality
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Mother tongue
                        </label>
                      </div>

                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Caste
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Caste Category
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Religion
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Birth Place
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Address
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          District
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          State
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          PIN Code
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Aadhaar Number
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          PAN Number
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Bank Account Number
                        </label>
                      </div>
                      <div class="col col-12 col-md-6 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Highest Qualification
                        </label>
                      </div>
                      <div class=" col col-12 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Document for Aadhaar Verfication
                        </label>
                      </div>
                      <div class="col col-12 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Document for Qualification
                        </label>
                      </div>
                      <div class="col col-12 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Document for Address Varification
                        </label>
                      </div>
                      <div class="col col-12 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckChecked"
                        >
                          Document for Prior Work Experience
                        </label>
                      </div>
                      <div class="col col-12 form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckDefault"
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckDefault"
                        >
                          Document for Bank Details Verification
                        </label>
                      </div>

                      <div className="col-12 d-flex my-5 justify-content-center">
                        <button
                          type="submit"
                          className=" col-6 btn btn-primary justify-content-center"
                        >
                          Apply Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomInstitute />
      </div>
    </>
  );
};

export default StudentjoinformSetup;
