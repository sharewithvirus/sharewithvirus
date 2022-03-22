import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Success, Danger } from "../SnackBar";
import UserStaffAboutSection from "../UserStaffAboutSection";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";

const ClassFee = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [catalogIns, setCatalogIns] = useState("");
  const [classData, setClassData] = useState("");
  const [catalogStudent, setCatalogStudent] = useState([]);
  const [feeStudentData, setFeeStudentData] = useState([]);
  const [offlineData, setOfflineData] = useState([])
  const [financeData, setFinanceData] = useState([])
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  useEffect(() => {
    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        // console.log(res);
        const institute = res.data.staff.institute;
        setCatalogIns(institute);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/staffclass/${params.cid}`)
      .then((res) => {
        // console.log(res);
        const Cdata = res.data.classes;
        const studentData = res.data.classes.ApproveStudent;
        const feeData = res.data.classes.fee;
        setClassData(Cdata);
        setFinanceData(res.data.classes.institute.financeDepart ? res.data.classes.institute.financeDepart[0] : '')
        console.log(res.data.classes.institute.financeDepart[0])
        setCatalogStudent(studentData);
        setFeeStudentData(feeData);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  const [checkData, setCheckData] = useState("");
  const [checkfeeStatus, setCheckFeeStatus] = useState("");
  const [checkDataList, setCheckDataList] = useState([]);
  const [offlineFee, setOfflineFee] = useState([])
  const Feeshandlers = (e) => {
    const fee = e.target.value;
    axios
      .get(`${requestURL}/fees/${fee}`)
      .then((res) => {
        const fee = res.data.feeData;
        setCheckData(fee);
        setCheckDataList(res.data.feeData.studentsList);
        setCheckFeeStatus(res.data.feeData.feeStudent);
        setOfflineFee(res.data.feeData.offlineStudentsList)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const [studentText, setStudentText] = useState("");
  const StudentFeeHandler = (id) => {
    axios
      .post(`${requestURL}/student/status`, {
        studentId: id,
      })
      .then((res) => {
        setStudentText(res.data.student);
        setOfflineData(res.data.student.offlineList)
        // setOfflineFeeList(res.data.student.offlineFeeList)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };
  const StudentFeeStatusHandler = (sid, id) => {
    axios
      .post(`${requestURL}/class/${params.cid}/student/${sid}/fee/${id}`, {
        status: "Paid",
      })
      .then((res) => {
        setAdminMsg({ showMessages: true, msg: res.data.message });
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };
  const [index, setIndex] = useState(1);
  const [arr, setArr] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30,
  ]);

  var TotalOnline = 0
  var onlineAmount = catalogStudent.map((ct) => (
    ct.onlineFeeList.map((et) => (
    TotalOnline = et.feeAmount + TotalOnline
    ))
  ))

  var TotalOffline = 0
  var offlineAmount = catalogStudent.map((ct) => (
    ct.offlineFeeList.map((et) => (
    TotalOffline = et.feeAmount + TotalOffline
    ))
  ))

  var TotalOnlineChecklist = 0
  var onlineAmount = catalogStudent.map((ct) => (
    ct.onlineCheckList.map((et) => (
    TotalOnline = et.checklistAmount + TotalOnline
    ))
  ))

  // var TotalOffline = offlineFeeList.length * checkData.feeAmount
  // console.log(TotalOffline)
  useEffect(() =>{
    // axios.post(`${requestURL}/class/${params.cid}/total/online/fee`,
    // {
    //   fee: TotalOnline + TotalOnlineChecklist
    // })
    // .then((res) =>{
    // })
    // .catch((e) =>{
    //   console.log('something went wrong')
    // })

    // axios.post(`${requestURL}/class/${params.cid}/total/offline/fee`,{
    //   fee: TotalOffline
    // })
    // .then((res) =>{
    // })
    // .catch((e) =>{
    //   console.log('something went wrong')
    // })

    axios.post(`${requestURL}/class/${params.cid}/total/collected/fee`,{
      fee: TotalOffline
    })
    .then((res) =>{
    })
    .catch((e) =>{
      console.log('something went wrong')
    })
  })

  var raised = catalogStudent.length * checkData.feeAmount
  var collected = checkDataList.length * checkData.feeAmount

  const SubmitClassFeeHandler = () =>{
    // alert(collected)
    if(checkData){
    axios.post(`${requestURL}/finance/${classData.institute.financeDepart ? classData.institute.financeDepart[0]._id : ''}/class/${classData ? classData._id : ''}/fee/${checkData._id}/receieve`,
    {
      amount: TotalOffline
    })
    .then((res) =>{
      alert(res.data.message)
    })
  }else{
    
  }

  }

  return (
    <>
      <NavbarTopUser uid={params.id} />
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <InstituteRoleTab uid={params.id} />
              <div className={styles.leftBar}>
                <UserStaffAboutSection sid={params.sid} uid={params.id} />
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                ></div>

                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <UserStaffSideBar sid={params.sid} uid={params.id}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
            <StaffSelectInstituteRole id={params.id} sid={params.sid} />
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                <div className={styles.insTitle}>
                  <h3>{classData.className} Class Fee</h3>
                </div>
                <div className={`${styles.outer2} mt-4`}>
                  <div
                    className={`my-4 ${styles.ddetail}`}
                    style={{ display: "block" }}
                  >
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-2">
                        <div
                          className={`${styles.dTab} ${styles.active} my-2`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/class/catalog/${params.cid}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/catalog-icon.svg" alt="Register" />
                            <p className={styles.ttext}> &nbsp; Catalog </p>
                          </span>
                        </div>
                      </div>
                      <div className="col-2">
                        <div
                          className={`${styles.dTab} ${styles.active} my-2`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/class/mark/attendence/${params.cid}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/s-attendence-icon.svg" title="Attendence"/> 
                            <p className={styles.ttext}> &nbsp; Attendence </p>
                          </span>
                        </div>
                      </div>
                      <div className="col-2">
                        <div
                          className={`${styles.dTab}  my-2`}
                          // onClick={() =>
                          //   navigate(
                          //     `/user/${params.id}/staff/${params.sid}/class/fee/${params.cid}`
                          //   )
                          // }
                        >
                          <span>
                        <img src="/images/finance-icon.svg" title="Finance"/> 
                            <p className={styles.ttext}> &nbsp; Fee </p>
                          </span>
                        </div>
                      </div>
                      <div className="col-2">
                        <div
                          className={`${styles.dTab} ${styles.active} my-2`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/class/behaviour/${params.cid}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/behaviour-icon.svg" title="Behaviour"/>
                            <p className={styles.ttext}> &nbsp; Behaviour </p>
                          </span>
                        </div>
                      </div>
                      <div className="col-2">
                        <div
                          className={`${styles.dTab} ${styles.active} my-2`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/class/finalreport/${params.cid}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/final-report-icon.svg" title="Final Report"/>
                            <p className={styles.ttext}>
                              {" "}
                              &nbsp; Final Report{" "}
                            </p>
                          </span>
                        </div>
                      </div>
                    </div>

                    {index === 1 && (
                      <div className={`${styles.examCardContainer} mt-3`}>
                        <div className={styles.feesContainer}>
                          <div className={styles.selectContainer}>
                            <select
                              //  name="FeesId"
                              id="csearch"
                              onChange={Feeshandlers}
                              class="form-select form-select-lg"
                              aria-label="Default select example"
                            >
                              <option selected disabled>
                                Select Fees{" "}
                              </option>
                              {feeStudentData &&
                                feeStudentData.map((st) => (
                                  <option value={st._id}>{st.feeName}</option>
                                ))}
                            </select>
                            <button
                              type="button"
                              class="btn btn-outline-dark"
                              onClick={() =>
                                navigate(
                                  `/user/${params.id}/staff/${params.sid}/class/fee/history/${params.cid}`
                                )
                              }
                            >
                              Check Fee Status
                            </button>
                          </div>

                          <div className={styles.examCardContainer}>
                            <div className={styles.feesCardContainer}>
                              <h5>
                                {checkData.feeName
                                  ? checkData.feeName
                                  : "Fee Name / Purpose"}
                              </h5>
                              <form>
                              <div className={styles.feesCardTop}>
                                <div className={styles.feesCardTopItems}>
                                  <input
                                    type="text"
                                    min="0"
                                    class="form-control"
                                    value={`Total Raised ${
                                      checkData &&
                                      checkData.feeAmount *
                                        catalogStudent.length
                                        ? checkData.feeAmount *
                                          catalogStudent.length
                                        : ""
                                    }`}
                                  />
                                  <select
                                    class="form-select form-select-lg"
                                    aria-label="Default select example"
                                  >
                                    <option selected disabled>
                                      Offline {checkData.offlineFee}
                                    </option>
                                    {/* <option >Offline</option> */}
                                  </select>
                                </div>
                                <div className={styles.feesCardTopItems}>
                                  <input
                                    type="text"
                                    min="0"
                                    class="form-control"
                                    value={`Total Collected ${
                                      checkDataList && checkDataList.length * checkData.feeAmount
                                    }`}
                                  ></input>
                                  { checkData.offlineFee === 0 ?
                                  <button type="button" class="btn btn-primary" disabled>Submit</button>
                                  :
                                  
                                    financeData.classRoom && financeData.classRoom.some((et) => et._id === classData._id) ? 
                                    <button type="button" class="btn btn-success">
                                    Requested
                                  </button>
                                    : 
                                  
                                  <button type="button" class="btn btn-primary" onClick={SubmitClassFeeHandler}>
                                    Submit 
                                  </button>
                                  }
                                  
                                  {/* { raised && collected ?
                                  financeData.classRoom && financeData.classRoom.some((et) => et._id === classData._id) ? 
                                  classData.receieveFee && classData.receieveFee.some((et) => et._id === checkData._id) ? 'Requested'
                                  : 
                                  <button
                                    type="button"
                                    class="btn btn-dark"
                                    onClick={SubmitClassFeeHandler}
                                  >
                                    Submit noss
                                  </button> :
                                  financeData.submitClassRoom && financeData.submitClassRoom.some((et) => et._id === classData._id) ? 
                                  classData.submitFee && classData.submitFee.some((et) => et._id === checkData._id) ? 'Submitted'
                                  : 
                                  <button
                                    type="button"
                                    class="btn btn-dark"
                                    onClick={SubmitClassFeeHandler}
                                  >
                                    Submit nos
                                  </button>
                                  :
                                  <button
                                    type="button"
                                    class="btn btn-dark"
                                    onClick={SubmitClassFeeHandler}
                                  >
                                    Submit no
                                  </button>
                                  :
                                  <button
                                    type="button"
                                    class="btn btn-dark"
                                    // onClick={SubmitClassFeeHandler}
                                  >
                                    Submit
                                  </button>
                                  } */}
                                </div>
                              </div>
                              </form>
                              <h5>
                                {studentText
                                  ? `${studentText.studentGRNO} - ${
                                      studentText.studentFirstName
                                    } 
                       ${
                         studentText.studentMiddleName
                           ? studentText.studentMiddleName
                           : ""
                       } 
                       ${studentText.studentLastName}`
                                  : "Roll No."}
                              </h5>
                              <div className={styles.feesCardMid}>
                                <i
                                  class="fa fa-angle-left"
                                  aria-hidden="true"
                                ></i>
                                {checkDataList.length >= 1 &&
                                checkDataList.some(
                                  (et) => et._id === studentText._id
                                ) ? (
                                  <button
                                    type="button"
                                    class="btn btn-outline-dark"
                                    //   onClick={() =>
                                    //    StudentFeeStatusHandler(
                                    //      studentText._id,
                                    //      checkData._id
                                    //    )
                                    //  }
                                  >
                                    Received
                                  </button>
                                ) : studentText && checkData ? (
                                  <button
                                    type="button"
                                    class="btn btn-outline-dark"
                                    onClick={() =>
                                      StudentFeeStatusHandler(
                                        studentText._id,
                                        checkData._id
                                      )
                                    }
                                  >
                                    Receive
                                  </button>
                                ) : (
                                  <button type="button" class="btn btn-dark">
                                    Receive
                                  </button>
                                )}

                                <i
                                  class="fa fa-angle-right"
                                  aria-hidden="true"
                                ></i>
                              </div>

                              <div className={styles.feesCardBottom}>
                                {catalogStudent.map((ct) => {
                                  return (
                                    <>
                                      {ct.offlineFeeList.length >=1 && ct.offlineFeeList.some((et) => (et._id === checkData._id)) 
                                      ? 
                                      <div
                                      className={`${styles.scoreEach} bg-success`}
                                      // onClick={() => {
                                      //   StudentFeeHandler(ct._id);
                                      // }}
                                    >
                                      <h6>{ct.studentGRNO}</h6>
                                    </div>
                                      : 
                                      ct.onlineFeeList.length >=1 && ct.onlineFeeList.some((et) => (et._id === checkData._id))
                                      ? 
                                      <div
                                      className={`${styles.scoreEach} bg-primary`}
                                      // onClick={() => {
                                      //   StudentFeeHandler(ct._id);
                                      // }}
                                    >
                                      <h6>{ct.studentGRNO}</h6>
                                    </div>
                                    :
                                    <div
                                      className={styles.scoreEach}
                                      onClick={() => {
                                        StudentFeeHandler(ct._id);
                                      }}
                                    >
                                      <h6>{ct.studentGRNO}</h6>
                                    </div>
                                      }                                    
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavbarBottomUser uid={params.id} />
    </>
  );
};

export default ClassFee;
