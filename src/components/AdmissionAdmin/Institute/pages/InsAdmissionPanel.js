import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../../../NavbarTopInstitute";
import AboutSection from "../../../AboutSection";
import BackButton from "../../../BackButton";
import NewDetailsBar from "../../../NewDetailsBar";
import NavbarBottomInstitute from "../../../NavbarBottomInstitute";
import InstituteSidebar from "../../../InstituteSidebar";
import InstituteStatsSection from "../../../InstituteStatsSection";
import ProfileDisplaySection from "../../../ProfileDisplaySection";
import NewFinanceBar from "../../Staff/InsAdmissionStaffDetailBar";
import DateRangeIcon from '@mui/icons-material/DateRange';
import AdmissionDetails from "../../Staff/AdmissionDetails";
import AdmissionForm from "../../Staff/AdmisionForm"
import axios from "axios";
import { requestURL } from "../../../ReqUrl";


function AdmisionPanel() {

  const navigate = useNavigate();
  const params = useParams();

    const [index, setIndex] = useState(1);

  function handleChange(value) {
    navigate(`/${value}`);
  }

  return (
    (
        <>
        <NavbarTopInstitute id={params.id} />
            <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection id={params.id} />
                <InstituteSidebar id={params.id} />
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`}>
                
                {/* <div className={styles.insTitle}>

                </div> */}
                {index === 1 && 
                  <div className={` ${styles.outer2} ${styles.profileCreationPage}`}>
                        <ProfileDisplaySection/>
                        <NewFinanceBar insId={params.id} />
                    <form className="row g-3 mt-2">
                        <div className={`my-4 ${styles.ddetail}`}>
                          <div className="row">
                                <div className="col-3">
                                  <div
                                    className={`${styles.dTab} ${styles.active}`}
                                    onClick={() => setIndex(1)}
                                  >
                                      <span>
                                      <i class="fas fa-th"></i>
                                        
                                      </span>
                                  </div>
                                </div>
                                <div className="col-3">
                                  <div className={`${styles.dTab} ${styles.active}`} 
                                  
                                  onClick={() => setIndex(2)}>
                                  
                                      <span>
                                      <i class="fas fa-info-circle"></i>
                                        
                                      </span>
                                  </div>
                                </div>
                                <div className="col-3">
                                    <div
                                      className={`${styles.dTab} ${styles.active}`}
                                      onClick={() => setIndex(3)}>
                                        <span>
                                        <i class="fas fa-university"></i>
                                          
                                        </span>
                                    </div>
                                </div>
                          </div>
                        </div>
                    </form>

                    <div className="d-flex justify-content-center">
                      <div className={styles.newAdmision}>
                        <h5>New Admision</h5>
                        <button type="button" class="btn btn-secondary" onClick={()=> setIndex(2)}>Create New Application</button>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-center">
                      <div className={`border border-dark ${styles.newAdmision} ${styles.newAdmision1} pt-3 px-3 rounded`}>
                        <h4>Junior College</h4>
                        <h4> FY Science</h4>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className={`border border-dark ${styles.newAdmision} ${styles.newAdmision1} pt-3 px-3 rounded`}>
                        <h4>Senior College</h4>
                        <h4> FY Mthematics</h4>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className={`border border-dark ${styles.newAdmision} ${styles.newAdmision1} pt-3 px-3 rounded`}>
                        <h4>Mechanical Department</h4>
                        <h4> FY BE</h4>
                      </div>
                    </div>
                    
                  </div>
                }

                {index === 2 && 
                 <>
                     <div className="d-flex justify-content-center">
                      <div className={styles.newAdmision}>
                        <div className="d-flex gap-4 align-items-center">
                          <i class="fas fa-angle-left" onClick={()=> setIndex(1)}></i>
                          <h5>Create Admision Application Form</h5>
                        </div>
                        <button type="button" className={styles.custombtn} onClick={()=> setIndex(3)}>Application Details </button>
                        </div>
                     </div>

                     <div className="d-flex justify-content-center">
                      <div className={styles.newAdmision}>
                        <div className="col-12 w-100 d-flex justify-content-between">
                          <div className="col-5">
                            <select class="form-select mb-4" aria-label="Default select example">
                                <option selected>Select Department</option>
                                <option value="Civil">Civil</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Computer Science">Computer Science</option>
                              </select>

                              <input
                                    type="text"
                                    name="name"
                                    className="form-control mb-4"
                                    id="name"
                                    placeholder="Application Title"
                                />

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control mb-4"
                                    id="name"
                                    placeholder="Available Seats"
                                />

                                <div className={`round ${styles.admisionroundTable}`}>
                                  <p className={`p-2 border-bottom ${styles.listhead}`}>Admision Process</p>
                                  <div className={styles.admisionprocess}>
                                    <ol class="list-group list-group-numbered">
                                      <li>Apply form here</li>
                                      <li>After selection, pay admission fees and confirm your side</li>
                                      <li>Submit original LC</li>
                                      <li>You will get cnfirmation from institute</li>
                                      <li>Wait for class allotment</li>
                                      <li>Contact Admission dept for more info.</li>
                                    </ol>
                                  </div>
                                </div>
                          </div>

                          <div className="col-5">
                              <select class="form-select mb-4" aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>

                                <select class="form-select mb-4" aria-label="Default select example">
                                  <option selected>Open this select menu</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>

                                <div className={styles.admisionroundTable}>
                                  <p className={`p-2 border-bottom ${styles.listhead}`}>Round 1</p>
                                  <div className="d-flex justify-content-around">
                                      <p>Application Fees: 10</p>
                                      <div className={styles.admisionLastDate}>
                                        <p>Last Date:</p>
                                        <input type="date" />
                                      </div>
                                  </div>
                                  <hr/>
                                  <div className="d-flex justify-content-around">
                                      <p>Candidate Selection</p>
                                      <div className={styles.admisionLastDate}>
                                        <p>Last Date:</p>
                                        <input type="date" />
                                      </div>
                                  </div>
                                  <hr/>
                                  <div className="d-flex justify-content-around">
                                      <p>Admision Fees: 10</p>
                                      <div className={styles.admisionLastDate}>
                                        <p>Last Date:</p>
                                        <input type="date" />
                                      </div>
                                  </div>
                                </div>
                          </div>
                        </div>
                    </div>
                    </div>

                    <div className="d-flex mt-4  justify-content-center gap-3">
                              <button className={styles.custombtn} onClick={()=> setIndex(3)}>Save</button>
                              <button className={styles.custombtn} onClick={()=> setIndex(4)}>Form Preview</button>
                          </div>
                 </>
                }

                {index === 3 && 
                  <AdmissionDetails changeShow={show => setIndex(show)}/>
                }

                {index === 4 && 
                  <AdmissionForm changeShow={show => setIndex(show)}/>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
        <NavbarBottomInstitute id={params.id} />
        </>
    )
  )
}

export default AdmisionPanel