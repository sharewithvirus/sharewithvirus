
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CompleteClass from './CmpleteClass';
import axios from "axios";
import { requestURL } from "./ReqUrl";




function ClassSetting(props) {
  const [index, setIndex] = useState(1);
  const [deptBatchData, setDeptBatchData] = useState();
  const [deptData, setDeptData] = useState();
  const [classData, setClassData] = useState();
  const [batchList, setBatchList] = useState();
  

useEffect(() => {

  setClassData(props.classData);
          axios
          .get(`${requestURL}/department-batch-detail/${props.classData ? props.classData.batch.department: "" }`)
          .then((res) => {
            setDeptData(res.data.department)
            setBatchList(res.data.department.batches)

          })
          .catch((e) => {
            console.log("Something Went Wrong");
          });
  }, [props.classData]);


  return (
    <>

                {index === 1 && 
                    <div className={styles.outer2}>
                    <form className="row mt-0">
                      <div className="d-flex justify-content-between">
                        <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                        
                        <div className="col-4 mx-auto my-4">
                          <select class="form-select" aria-label="Default select example">
                          <option selected desable>Previous Classes</option>
                          {batchList &&
                            batchList.map((c) => (
                              <option value={c._id} key={c._id}>{c.batchName}</option>
                            ))
                          }
                          </select>
                        </div>

                        <div className="col-4 mx-auto my-4">
                          <h5>{`${props.classData.className}-${props.classData.classTitle}`}</h5>
                          <p> ({props.classData ? props.classData.batch.batchName: ""})</p>
                        </div>

                        <div className="col-4 mx-auto my-4"></div>
                        </div>
                      </div>
                      
                      <hr />
                      <div className="col-12 col-md-6 mb-2">
                        {/* <label for="cteacher" className="form-label">
                          Class Teacher
                        </label> */}
                        <input
                          type="text"
                          name="cteacher"
                          className="form-control"
                          id="cteacher"
                          placeholder={`${props.classData.classHeadTitle}:- ${props.classData ? props.classData.classTeacher.staffFirstName : ""} ${props.classData ? props.classData.classTeacher.staffMiddleName: ""} ${props.classData ? props.classData.classTeacher.staffLastName: ""}`}
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        {/* <label for="dadmin" className="form-label">
                          Operating Admin
                        </label> */}
                        <input
                          type="text"
                          name="ccode"
                          className="form-control"
                          id="ccode"
                          placeholder={`Class Code: ${props.classData.classCode}`}
                        
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        {/* <label for="dstaff" className="form-label">
                          Total Staff
                        </label> */}
                        <input
                          type="text"
                          name="srepresentative"
                          className="form-control"
                          id="srepresentative"
                          placeholder="Student Representative"
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        {/* <label for="dstudents" className="form-label">
                          Total Students
                        </label> */}
                        <input
                          type="text"
                          name="rname"
                          className="form-control"
                          id="rname"
                          placeholder="Report Name"
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <input
                          type="number"
                          name="tstaff"
                          className="form-control"
                          id="tstaff"
                          placeholder="Total Staff"
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <input
                          type="number"
                          name="tstudents"
                          className="form-control"
                          id="tstudents"
                          placeholder="Total Students"
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <input
                          type="date"
                          name="csdate"
                          className="form-control"
                          id="csdate"
                          placeholder="Class Start Date"
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <select class="form-select" aria-label="Default select example">
                          <option selected>Final Report Options</option>
                              <option value="2019-20">Final Report</option>
                              <option value="2020-21">Attendence</option>
                              <option value="2020-21">Behaviour</option>
                          </select>
                      </div>

                      <div className=" d-flex col-10 flex-row justify-content-center  mt-5 mx-auto">
                        <button
                          type="button"
                          className="btn btn-outline-success mt-2 mx-2"
                          onClick={()=> setIndex(2)}
                        >
                          Complete Batch
                        </button>
                      </div>
                    </form>
                  </div>
                }

                {index === 2 && 
                classData && deptData &&
                    <CompleteClass showComplete={val => setIndex(val)} classdData={classData} deptData={deptData}/>
                
                }
    </>
  )
}

export default ClassSetting