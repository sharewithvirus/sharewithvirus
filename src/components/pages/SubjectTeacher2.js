import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import TeacherCard from "../TeacherCard";

import axios from "axios";
import { requestURL } from "../ReqUrl";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import UserStaffSideBar from "../UserStaffSideBar";
import UserStaffAboutSection from "../UserStaffAboutSection";
import CataCard from "../CataCard";
import InstituteRoleTab from "../InstituteRoleTab";

const SubjectTeacher = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [userStaffMemberData, setUserStaffMemberData] = useState([]);
  const [staffDesignation, setStaffDesignation] = useState([]);
  const [staffIns, setStaffIns] = useState("");

  const [catalogStudent, setCatalogStudent] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [staffSubjects, setStaffSubjects] = useState([]);
  const [first, setFirst] = useState(false)
  const [index, setIndex] = useState();

  function subjectLock(){
    axios
      .post(`${requestURL}/subject/status/${params.suid}`)
      .then((res) => {
        if(res.data.message === "Subject Successfully Locked" ){
          console.log("Subject Locked")
        } else{
          console.log("Something Went Wrong")
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }

  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) => {
        const userstaff = res.data.user.staff;
        const userstudent = res.data.user.student;
        setUserStaffMemberData(userstaff);
        // setUserStudentData(userstudent);
        // console.log(userstudent)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        const dStaff = res.data.staff;
        const institute = res.data.staff.institute;
        const staffSubjects = res.data.staff.staffSubject;
        setStaffDesignation(dStaff);
        setStaffIns(institute);
        setStaffSubjects(staffSubjects);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/subject-detail/${params.suid}`)
      .then((res) => {
        const subjectDetails = res.data.subData;
        const classStudent = res.data.classData.ApproveStudent;
        const classDetails = res.data.classData;
        setSubjectData(subjectDetails);
        setCatalogStudent(classStudent);
        setClassData(classDetails);
        setFirst(true)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  return (
    <>
        <NavbarTopUser uid={params.id} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <InstituteRoleTab uid={params.id}/>
              <div className={styles.leftBar}>
                <UserStaffAboutSection sid={params.sid} uid={params.id}/>
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
                <div className={` row ${styles.insTitle}`}>
                  <h3 className="mt-3 mb-3">
                    {subjectData.subjectName} - {classData.className} -{" "}
                    {classData.classTitle}
                  </h3>
                  <img src="/images/icon-setting.svg" alt="setting" onClick={() => setIndex(1)} />
                </div>
                <div
                  className={`my-5 ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <form className="row g-3">
                    <div className={`my-4 ${styles.ddetail}`}>
                      <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-4">
                        <div className={`${styles.dTab}`}>
                          <span>
                          <img src="/images/catalog-icon.svg" alt="Register" />
                            <p className={styles.ttext}>  &nbsp; Catalog </p>
                          </span>
                        </div>
                        </div>
                        <div className="col-4">
                        <div
                          className={`${styles.dTab} ${styles.active}`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/subject/score/${params.suid}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/score-icon.svg" title="Score"/> 
                          <p className={styles.ttext}> &nbsp; Score </p>
                          </span>
                        </div>
                        </div>
                        
                    <div className="col-4">
                        <div
                          className={`${styles.dTab} ${styles.active}`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/subject/attendence/${params.suid}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/s-attendence-icon.svg" title="Attendence"/> 
                            <p className={styles.ttext}>  &nbsp;Attendence </p>
                          </span>
                        </div>
                        </div>
                      </div>
                      <div className="row my-3">
                        <div className="col-12 col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="search subject here"
                          />
                        </div>
                      </div>
                      <CataCard cataData={catalogStudent} first={first}/>
                    </div>
                    {index === 1 && 
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
                                  onClick={()=> {setIndex(0); subjectLock();}}
                                >
                                  Complete Subject
                              </button>
                            </div>
                          </div>

                        </div>
                      }
                  </form>
                  
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

export default SubjectTeacher;
