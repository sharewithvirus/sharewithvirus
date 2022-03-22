import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import AboutSection from "../AboutSection";
import BackButton from "../BackButton";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from 'axios'
import { requestURL } from "../ReqUrl";
import UserStudentAboutSection from "../UserStudentAboutSection";
import moment from 'moment'
import UserStudentSideBar from "../UserStudentSideBar";
import InstituteRoleTab from "../InstituteRoleTab";

const StudentMemberFee = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [userStaffMemberData, setUserStaffMemberData] = useState([])
  const [userStudentData, setUserStudentData] = useState([])
  const [studentDesignation, setStudentDesignation] = useState([])
  const [studentClassData, setStudentClassData] = useState('')
  const [studentIns, setStudentIns] = useState('')
  const [studentFeeData, setStudentFeeData] = useState([])
  const [departmentData, setDepartmentData] = useState('')
  useEffect(() =>{
      axios.get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) =>{
          // console.log(res)
          const userstaff = res.data.user.staff
          const userstudent = res.data.user.student
          setUserStaffMemberData(userstaff)
          setUserStudentData(userstudent)
      })
      .catch((e) =>{
          console.log("Something Went Wrong")
      })
      axios.get(`${requestURL}/studentdesignationdata/${params.sid}`)
      .then((res) =>{
          // console.log(res)
          const dStudent = res.data.student
          const classes = res.data.student.studentClass
          const institute = res.data.student.institute
          const fee = res.data.student.studentFee
          console.log(res.data.student)
          setStudentDesignation(dStudent)
          setStudentClassData(classes)
          setStudentIns(institute)
          setStudentFeeData(fee)
          setDepartmentData(res.data.student.department)
      })
      .catch((e) =>{
          console.log("Something Went Wrong")
      })

  },[])

  const OnlineFeeHandler = (id) =>{
    axios
      .post(`${requestURL}/student/${params.sid}/fee/${id}/online`, {
        status: "Paid",
      })
      .then((res) => {
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }

  const OnlineChecklistHandler = (id) =>{
    axios
      .post(`${requestURL}/student/${params.sid}/checklist/${id}/online`, {
        status: "Paid",
      })
      .then((res) => {
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }

  return (
    <>
        <NavbarTopUser uid={params.id}/>
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
            <InstituteRoleTab uid={params.id}/>
              <div className={styles.leftBar}>
              <UserStudentAboutSection sid={params.sid} uid={params.id}/>
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >
                                    
                </div>

                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <UserStudentSideBar sid={params.sid} uid={params.id} data={studentClassData ? studentClassData : ''}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`h-100 ${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={styles.insTitle}>
                <div className={styles.insTitle}>
                    <h3>Student of ({studentClassData.className}-{studentClassData.classTitle})</h3>
                  
                </div>
                <div className={`${styles.outer2} mt-4`}>
                  {/* <h4 className="my-3">Class Catalog</h4> */}
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row mb-5">
                    <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() => navigate(`/user/${params.id}/studentdetail/${params.sid}`)}
                      >
                        <span>
                        <img
                            src="/images/s-attendence-setting-icon.svg"
                            alt="setting"
                            title="Attendence Setting"
                          />
                          <p className={styles.ttext}>&nbsp; Attendence </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                      >
                        <span>
                        <img src="/images/score-icon.svg" title="Score"/> 
                          <p className={styles.ttext}>&nbsp; Progress </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() => navigate(`/user/${params.id}/student/ins/${studentIns._id}/activity/${params.sid}`)}
                      >
                        <span>
                        <img src="/images/department-menu-icon.svg" title="Menu" />{" "}
                          <p className={styles.ttext}>&nbsp; Activity </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2">
                      <div
                        className={`${styles.dTab} my-2`}
                      >
                        <span>
                        <img src="/images/finance-icon.svg" title="Finance" />{" "}
                          <p className={styles.ttext}> &nbsp; Fee </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() => navigate(`/user/${params.id}/library`)}
                      >
                        <span>
                        <img src="/images/library-icon.svg" title="Library" />{" "}
                          <p className={styles.ttext}> &nbsp; Library </p>
                        </span>
                      </div>
                      </div>
                    </div>
                    <div className="row">
                    {
                      departmentData && departmentData.fees.map((ft) => (
                        <div className="col-12 mt-2" style={{backgroundColor: 'lightgray'}}>
                          <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          <p>{ft.feeName}</p>
                          {studentDesignation.offlineFeeList.includes(`${ft._id}`) ? 
                          <p><button className="btn btn-success px-5"><a>Paid Offline</a></button></p> 
                          :
                          studentDesignation.onlineFeeList.includes(`${ft._id}`) ? 
                          <p><button className="btn btn-primary px-5"><a>Paid Online</a></button></p>
                          :
                          <p><button type="button" className="btn btn-secondary px-5" onClick={() => {OnlineFeeHandler(ft._id)}}><a>Pay Online</a></button></p>  
                          } 
                          </div>
                          <div>
                          <p style={{textAlign: 'justify'}}>
                           {moment(ft.createdAt).format('DD-MM-YYYY')}
                          </p>
                          </div>
                        </div>
                      ))
                    }

                    {
                      departmentData && departmentData.checklists.map((ft) => (
                        ft.checklistFees === 'Yes' ? 
                        <div className="col-12 mt-2" style={{backgroundColor: 'lightgray'}}>
                          <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          <p>{ft.checklistName}</p>
                          {studentDesignation.offlineCheckList.includes(`${ft._id}`) ? 
                          <p><button className="btn btn-success px-5"><a>Paid Offline</a></button></p> 
                          :
                          studentDesignation.onlineCheckList.includes(`${ft._id}`) ? 
                          <p><button className="btn btn-primary px-5"><a>Paid Online</a></button></p>
                          :
                          <p><button type="button" className="btn btn-secondary px-5" onClick={() => {OnlineChecklistHandler(ft._id)}}><a>Pay Online</a></button></p>  
                          } 
                          </div>
                          <div>
                          <p style={{textAlign: 'justify'}}>
                           {moment(ft.createdAt).format('DD-MM-YYYY')}
                          </p>
                          </div>
                        </div>
                       : ''))
                    }
                    </div>
                    {/* <div className="row">
                    {studentFeeData && studentFeeData.map((st) =>(
                      <div className="col-12 ;874 mt-3">
                    <div className={styles.examCard}>
                      <p className={styles.dlogoText}>
                        <img src="/images/icon-examcolor.svg" alt="exam" />
                        &nbsp; {st.feeName}
                      </p>
                      <hr />
                      <p className="d-flex flex-column">
                        <span className={`${styles.dlogodesc} text-success`}>
                          {`${st.feeStatus} offline`}
                        </span>
                        <small> Updated At - {moment(st.createdAt).format('DD-MM-YYYY')}</small>
                      </p>
                    </div>
                    </div>
                    ))}
                    </div> */}
                    </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <NavbarBottomUser uid={params.id}/>
    </>
  );
};

export default StudentMemberFee;
