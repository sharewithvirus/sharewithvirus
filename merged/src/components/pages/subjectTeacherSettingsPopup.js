// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import { Success, Danger } from "../SnackBar";
// import { requestURL } from "../ReqUrl";

const subjectTeacherSettings = (props) => {



  return (
      <>
      {/* {msg ? <Success msg={classData.msg} /> : null} */}
      <div className={`${styles.popupbg}`}>
        <div className={`${styles.createpostContainer}`} >
                        <div className="d-flex justify-content-center mt-5" >
                          <div className="w-50  p-3" style={{background: '#fff', height: '150px'}}>
                            <select class="form-select " aria-label="Default select example">
                              <option selected>Select Attendence</option>
                                <option value="on">Turn On</option>
                                <option value="off">Turn Off</option>
                            </select>

                            <div className="d-flex justify-content-center">
                              <button
                                  type="button"
                                  className="btn btn-outline-success mt-3 p-0"
                                  onClick={()=>props.onsubmitClick()}
                                >
                                  Complete Subject
                              </button>
                            </div>
                          </div>
                        </div>
                  </div>
              </div>
        </>
    );
};

export default subjectTeacherSettings;
