import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../../../NavbarTopUser";
import AboutSection from "../../../AboutSection";
import BackButton from "../../../BackButton";
import NavbarBottomUser from "../../../NavbarBottomUser";
import ProfileDisplaySection from "../../../ProfileDisplaySection";
import UserAdmissionDetailsBar from "../UserAdmissionDetailsBar";
import DateRangeIcon from '@mui/icons-material/DateRange';
import AdmissionDetails from "../AdmissionDetails";
import AdmissionForm from "../AdmisionForm"
import ProfileDiaplaySection from "../../../ProfileDiaplaySection";
import NewStaffDetailBar from "../../../NewStaffDetailBar";
import UserAboutSection from "../../../UserAboutSection";
import axios from "axios";
import { requestURL } from "../../../ReqUrl";
import StaffSelectInstituteRole from "../../../StaffSelectInstituteRole";
import UserStaffSideBar from "../../../UserStaffSideBar";
import UserStaffAboutSection from "../../../UserStaffAboutSection";
import InstituteRoleTab from "../../../InstituteRoleTab";
import AddRoundPopup from "../AddRoundPopup"
import { Link } from "react-router-dom";
import moment from 'moment';


function AdmisionPanel() {


    const navigate = useNavigate();
    const params = useParams();

    const  [ index, setIndex ] = useState(1);
    const  [ insData, setInsData ] = useState();
    const  [ admissionAdminData, setAdmissionAdminData ] = useState();
    const  [ applicationList, setApplicationList ] = useState();
    const  [ deptData, setDeptData ] = useState();
    const  [ deptBatchData, setDeptBatchData ] = useState();
    const  [ addRoundPopup, setAddRoundPopup ] = useState(false);
    const  [ clickedApplication, setClickedApplication ] = useState();
    // const  [ roundData, setRoundData ] = useState([])
    // const  [ batchClassData, setBatchClassData ] = useState();
    const  [ applicationData, setApplicationData ] = useState({

      applicationTitle : "",
      applicationForDepartment : "",
      availableSeats : "",
      managementSeats : "",
      // admissionProcessDetails: [
      //   { field: "Apply form here"},
      //   { field: "After selection, pay admission fees and confirm your side"},
      //   { field: "Submit original LC"},
      //   { field: "You will get confirmation from institute"},
      //   { field: "Wait for class allotment"},
      //   { field: "Contact Admission dept for more info."},
      // ],
      admissionProcessDetails: [
        "Apply form here",
        "After selection, pay admission fees and confirm your side",
        "Submit original LC",
        "You will get confirmation from institute",
        "Wait for class allotment",
        "Contact Admission dept for more info.",
      ],
      batch : "",
      rounds: [],
      formDetails : "",
    });

    const [ adProcessAdd, setAdProcessAdd ] = useState({
      processField : "",
    })

// Function Part started here


  function handleChange(value) {
    navigate(`/${value}`);
  }

  const processInputHandler = (e) => {
    const { name, value } = e.target;
    setAdProcessAdd({
      ...adProcessAdd,
      [name]: value,
    });
  };

  function onAddRoundPopupHandler(d) {
    setAddRoundPopup(d);
    // setAddRoundPopup((prv) => {
    //   return !prv;
    // });
  }

  const handleInput = (e) => {
    setApplicationData({ ...applicationData, [e.target.name]: e.target.value });
  };

  const roundHandler = (data1) => {
    applicationData.rounds.push(data1);
    // setRoundData(applicationData.rounds);
    console.log(applicationData)
  };

  const formHandler = (data2) => {
    applicationData.formDetails = data2;
    // setRoundData(applicationData.rounds);

    axios
    .post(`${requestURL}/admission-application/${params.sid}`, {applicationData} )
    .then((res) => {
      if( res.msg === "Application Save Successfully" ){

        axios
        .get(`${requestURL}/admission-applications-details/${params.sid}`)
        .then((res) => {
          setApplicationList(res.data.adAdminData.departmentApplications)

        })
        .catch((e) => {
          console.log("Something Went Wrong");
        });

        setIndex(1)

      }
    })
    .catch((e) => {
      console.log("Something Went Wrong");
    });
  };

  const admissionProcessHandler = (e)=>{
    e.preventDefault();
    let Data = applicationData;
    Data.admissionProcessDetails.push(adProcessAdd.processField)
    setApplicationData(Data)
  }

  function removeProcess(d) {
    let Data = applicationData;
    let popE = Data.admissionProcessDetails[d];
    let Data2 = remove_by_value(Data.admissionProcessDetails, popE)
    Data.admissionProcessDetails = Data2;
    setApplicationData(Data)
  }

  const remove_by_value = function(arry, val) {
    for (var i = 0; i < arry.length; i++) {
      if (arry[i] === val) {
        arry.splice(i, 1);
        i--;
      }
    }
    return arry;
  }

  function selectDeptHandler(e){
    let id = e.target.value
    applicationData.applicationForDepartment = id;
    let deptFilter = deptData.filter((e) => { return e._id === id  });
    let batchFilter = deptFilter[0].batches.filter((e) => { return e.batchStatus === "UnLocked" });
    setDeptBatchData(batchFilter);
  }


  // function selectBatchHandler(e){
  //   let id = e.target.value
  //   applicationData.batch = id;
  //   let batchFilter = deptBatchData.filter((e) => { return e._id === id  });
  //   // let classFilter = batchFilter[0].classroom.filter((e) => { return e.classStatus === "UnLocked" });
  //   // setBatchClassData(classFilter);
  // }

  function clickAdDetails(d){

    let actApp = applicationList[d];
    setClickedApplication(actApp);
    setIndex(3)

  }



// Use Effects Start
  useEffect(() => {

    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        // const institute = ;
        setInsData(res.data.staff.institute)
        setAdmissionAdminData(res.data.staff.staffAdmissionAdmin[0]);
        setDeptData(res.data.staff.staffAdmissionAdmin[0].institute.depart)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

      axios
      .get(`${requestURL}/admission-applications-details/${params.sid}`)
      .then((res) => {
        setAdmissionAdminData(res.data.adAdminData.adAdminName);

        setApplicationList(res.data.adAdminData.departmentApplications)
        console.log(res.data.adAdminData.departmentApplications)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    }, [applicationData.admissionProcessDetails]);



  return (
    (
        <>
        <NavbarTopUser uid={params.id} />
            <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
            <InstituteRoleTab uid={params.id} />
              <div className={styles.leftBar}>
              <UserStaffAboutSection sid={params.sid} uid={params.id} />
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >
                </div>
                <div className={` ${styles.about} ${styles.leftMenu}`}>
                <UserStaffSideBar />
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
            <StaffSelectInstituteRole id={params.id} sid={params.sid} />
            <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                
                <div className={styles.insTitle}>
                    {/* <StaffSelectInstituteRole id={params.id} sid={params.sid} /> */}
                </div>
                  <div className={` ${styles.outer2} ${styles.profileCreationPage}`}>
                  <ProfileDisplaySection
                    profilePicSrc={"/images/department-avatar.jpeg"}
                  />
                        <UserAdmissionDetailsBar staffId={params.sid} />
                    <form className="row g-3 mt-2">
                    <div className={`my-4 ${styles.ddetail}`}>
                      <div className="row">
                      { index === 1 ?
                      <div className="col-3">
                        <div
                          className={`${styles.dTab}`}
                          // onClick={() => setIndex(1)}
                        >
                          <span>
                          <i class="fas fa-th"></i>
                            
                          </span>
                        </div>
                        </div>
                        :
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

                      }
                      { index === 4 ?
                        <div className="col-3">
                        <div className={`${styles.dTab}`} 
                        
                        // onClick={() => setIndex(2)}
                        >
                        
                          <span>
                          <i class="fas fa-info-circle"></i>
                            
                          </span>
                        </div>
                        </div>
                        :
                        <div className="col-3">
                        <div className={`${styles.dTab} ${styles.active}`} 
                        
                        onClick={() => setIndex(4)}>
                        
                          <span>
                          <i class="fas fa-info-circle"></i>
                            
                          </span>
                        </div>
                        </div>
                      }
                      { index === 5 ?
                        <div className="col-3">
                        <div
                          className={`${styles.dTab}`}
                          // onClick={() => setIndex(3)}
                          >
                          <span>
                          <i class="fas fa-university"></i>
                            
                          </span>
                        </div>
                        </div>
                        :
                        <div className="col-3">
                        <div
                          className={`${styles.dTab} ${styles.active}`}
                          onClick={() => setIndex(5)}>
                          <span>
                          <i class="fas fa-university"></i>
                            
                          </span>
                        </div>
                        </div>
                      }
                        
                      </div>
                    </div>
                    </form>
                  </div>

                {index === 1 && 
                <>
                <div className={` ${styles.outer2} ${styles.profileCreationPage}`}>
                    <div className="d-flex justify-content-center">
                      <div className={styles.newAdmision}>
                        <h5>New Admision</h5>
                        <button type="button" class="btn btn-secondary" onClick={()=> setIndex(2)}>Create New Application</button>
                      </div>
                    </div>
                  {applicationList &&
                    applicationList.map((ct) => (
                    <div className="d-flex justify-content-center">
                      <div className={`border border-dark ${styles.newAdmision} ${styles.newAdmision1} pt-3 px-3 rounded`}
                      onClick={()=> clickAdDetails(applicationList.indexOf(ct))}
                      >
                        <h5>{ct.applicationTitle}</h5>
                        <h5> {ct.applicationForDepartment.dName}</h5>
                        <h5>{ct.availableSeats}</h5>
                      </div>
                    </div>
                    ))}

                  </div>
                  </>
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

                                <input
                                      type="text"
                                      name="applicationTitle"
                                      className="form-control mb-4"
                                      id="name"
                                      placeholder="Application Title"
                                      onChange={handleInput}
                                  />
                                  <input
                                      type="number"
                                      name="availableSeats"
                                      className="form-control mb-4"
                                      id="name"
                                      placeholder="Available Seats"
                                      onChange={handleInput}
                                  />

                                  <input
                                      type="number"
                                      name="managementSeats"
                                      className="form-control mb-4"
                                      id="name"
                                      placeholder="Management Seats"
                                      onChange={handleInput}
                                  />

                                  <div className={`round ${styles.admisionroundTable}`}>
                                    <p className={`p-2 border-bottom ${styles.listhead}`}>Admision Process</p>
                                    <div className={styles.admisionprocess}>
                                      <ol className="list-group list-group-numbered">

                                      {/* {applicationData &&
                                        applicationData.admissionProcessDetails.map((ct)=>(
                                          <li>{ct.field} <div className="d-flex justify-content-end"><i class="fas fa-times"></i></div> </li>
                                        ))} */}
                                        {applicationData &&
                                        applicationData.admissionProcessDetails.map((ct)=>(
                                          <li>{ct} <div className="d-flex justify-content-end" onClick={()=>{removeProcess(applicationData.admissionProcessDetails.indexOf(ct))}} ><i class="fas fa-times"></i></div> </li>
                                        ))}

                                        {/* <div
                                                    className={styles.closePopupBtn}
                                                    onClick={()=>{props.popupClose(false)}}
                                                >
                                                
                                                </div> */}

                                      </ol>
                                      <div className="row mt-2 mx-auto">
                                      <form 
                                      onSubmit={admissionProcessHandler}
                                      >
                                        <input
                                        type="textarea"
                                        name="processField"
                                        className="col-8 mx-auto"
                                        placeholder="Enter to add More Details"
                                        onChange={processInputHandler}
                                        />
                                        <button className="btn btn-primary px-5" type="submit">Add Process Point</button>
                                      </form>
                                      </div>
                                    </div>
                                  </div>
                            </div>

                            <div className="col-5">
                                
                            <select name="applicationForDepartment" class="form-select mb-4" aria-label="Default select example" onChange={selectDeptHandler}>
                                  <option selected disable>Select Department</option>
                                {deptData &&
                                  deptData.map((st) => (
                                  <option value={st._id} key={st._id}>{st.dName}</option>
                                  ))}
                                </select>

                                <select class="form-select mb-4" name="batch" aria-label="Default select example" onChange={handleInput}>
                                      <option selected disable>Select Department First Then Select batch here</option>
                                      
                                        {deptBatchData &&
                                          deptBatchData.map((st) => (
                                            <option value={st._id} key={st._id}>{st.batchName}</option>
                                              ))}
                                  </select>
                                  <div className="d-flex mt-4 mb-4  justify-content-center gap-3">
                                    <button className={styles.custombtn} onClick={()=>{onAddRoundPopupHandler(true)}}>Add Rounds For Application</button>
                                  </div>

                                {applicationData.rounds &&
                                  applicationData.rounds.map((ct)=>(
                                  <>
                                  <div className={`mb-4 ${styles.admisionroundTable}`}>
                                    <p className={`p-2 border-bottom ${styles.listhead}`}>{ct.roundName}</p>
                                    {/* <div className="d-flex justify-content-around">
                                        <div className={styles.admisionLastDate}>
                                          <p>Application Start Date:{ct.applicationStartData}</p>
                                        </div>
                                    </div> */}
                                    <div className="d-flex justify-content-around">
                                        <p>Application Fees: </p>
                                        {/* <div className={styles.admisionLastDate}> */}
                                          <p>{ct.applicationFee}</p>
                                        {/* </div> */}
                                    </div>
                                    <div className="d-flex justify-content-around">
                                        <p>Application Start date</p>
                                        {/* <div className={styles.admisionLastDate}> */}
                                          <p>{ct.applicationStartDate}</p>
                                        {/* </div> */}
                                    </div>
                                    <div className="d-flex justify-content-around">
                                        <p>Application Last date for Apply: </p>
                                        {/* <div className={styles.admisionLastDate}> */}
                                          <p>{ct.applicationLastDate}</p>
                                        {/* </div> */}
                                    </div>
                                    <hr/>
                                    <div className="d-flex justify-content-around">
                                        <p>Candidate Selection Last Date</p>
                                        {/* <div className={styles.admisionLastDate}> */}
                                          <p>{ct.candidateSelectionLastDate}</p>
                                        {/* </div> */}
                                    </div>
                                    <hr/>
                                    <div className="d-flex justify-content-around">
                                        <p>Admision Fees:</p>
                                        {/* <div className={styles.admisionLastDate}> */}
                                          <p>{ct.admissionFee}</p>
                                        {/* </div> */}
                                    </div>
                                    <div className="d-flex justify-content-around">
                                      <p>Admission Last date : </p>
                                        {/* <div className={styles.admisionLastDate}> */}
                                          <p>{ct.admissionLastDate}</p>
                                        {/* </div> */}
                                    </div>
                                  </div>
                                  </>
                                  ))}
                            </div>
                          </div>
                      </div>
                      </div>

                      <div className="d-flex mt-4  justify-content-center gap-3">
                          {/* <button className={styles.custombtn} onClick={()=> setIndex(3)}>Save</button> */}
                          <button className={styles.custombtn} onClick={()=> setIndex(4)}>Form Preview</button>
                      </div>
                  </>
                }

                {index === 3 && 
                  <AdmissionDetails changeShow={show => setIndex(show)} activeApp={clickedApplication} />
                }

                {index === 4 && 
                  <AdmissionForm formData={applicationData} formSave={formHandler} changeShow={(cl) => {setIndex(1)}}/>
                }
              </div>
            </div>
          </div>

          {addRoundPopup && (
              <AddRoundPopup popupClose={onAddRoundPopupHandler} addRound={roundHandler} />
      )}

        </div>
        <NavbarBottomUser />
      </div>
        </>
    )
  )
}

export default AdmisionPanel