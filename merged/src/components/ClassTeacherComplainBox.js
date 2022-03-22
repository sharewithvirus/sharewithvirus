import React from 'react'
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ClassTeacherComplainBox(props) {
  return (
    <>
        <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row">
                      <div className={`${styles.dTab} ${styles.active} my-2`} onClick={()=>props.changeIndex(1)}>
                        <span>
                          <i className={`fas fa-user`}></i>
                          &nbsp; Profile Info
                        </span>
                      </div>
                      <div 
                      className={`my-2 ${styles.dTab} ${styles.active}`}
                      
                      >
                        <span>
                          <i className={`fas fa-user-friends `}></i>
                          &nbsp; Auto Attendance
                        </span>
                      </div>
                      <div className={`my-2 ${styles.dTab} ${styles.active}`}
                      onClick={()=>props.changeIndex(3)}>
                        <span>
                          <i className={`fas fa-id-card-alt `}></i>
                          &nbsp; ID Cards
                        </span>
                      </div>
                      <div className={`my-2 ${styles.dTab} `}
                      onClick={()=>props.changeIndex(4)}>
                        <span>
                          <i className={`fas fa-mail-bulk `}></i>
                          &nbsp; Complaints Box
                        </span>
                      </div>
                      <div
                        className={`my-2 ${styles.dTab} ${styles.active}`}
                        onClick={()=>props.changeIndex(5)}
                      >
                        <span>
                          <i className={`fas fa-user-cog `}></i>
                          &nbsp; Batch Settings
                        </span>
                      </div>
                    </div>
                  </div>

        <div className={styles.outer2}>
                  <div className="col-12 mt-4 d-flex justify-content-space-evenly">
                    <button
                      type="submit"
                      className="btn btn-secondary justify-content-center col-4 py-3 px-3"
                      
                    >
                      Solved 60%
                    </button>
                    <div className="col-3 ">
                         <h4>Complain Box</h4>
                    </div>
                    <select name="fmode"  className={`form-control  ${styles.sselect}`}>
                            <option value="" disabled selected>Filter Solved/Unsolved</option>
                            <option value="Offline">Offline</option>
                            <option value="Online">Online</option>
                    </select>
                    
                </div>
        </div>

        <hr />

                <div className={`col-10 d-flex ${styles.complainCard}`}>
                  <div></div> 
                  <p>Content of Complain</p>
                  <div className={styles.complainCardInner}>
                    <h6>By:Name</h6>
                    <h6>Date:DD-MM-YYYY</h6>
                  </div>
                </div>

                <div className={`col-10 d-flex ${styles.complainCard}`}>
                  <div></div> 
                  <p>Content of Complain</p>
                  <div className={styles.complainCardInner}>
                    <h6>By:Name</h6>
                    <h6>Date:DD-MM-YYYY</h6>
                  </div>
                </div>

                <div className={`col-10 d-flex ${styles.complainCard}`}>
                  <div></div> 
                  <p>Content of Complain</p>
                  <div className={styles.complainCardInner}>
                    <h6>By:Name</h6>
                    <h6>Date:DD-MM-YYYY</h6>
                  </div>
                </div>

                <div className={`col-10 d-flex ${styles.complainCard}`}>
                  <div></div> 
                  <p>Content of Complain</p>
                  <div className={styles.complainCardInner}>
                    <h6>By:Name</h6>
                    <h6>Date:DD-MM-YYYY</h6>
                  </div>
                </div>
    </>
  )
}

export default ClassTeacherComplainBox