import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";

import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import CreateExam from "../CreateExam";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import UserStaffSideBar from "../UserStaffSideBar";
import UserStaffAboutSection from "../UserStaffAboutSection";
import InstituteRoleTab from "../InstituteRoleTab";

const StaffDepartmentFunctionExam = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [userStaffMemberData, setUserStaffMemberData] = useState([]);
  const [userStudentData, setUserStudentData] = useState([]);
  const [staffDesignation, setStaffDesignation] = useState([]);
  const [staffIns, setStaffIns] = useState("");
  const [dBatchData, setDBatchData] = useState("");

  const [departmentData, setDepartmentData] = useState("");
  const [batchData, setBatchData] = useState([]);
  const [batchClassData, setBatchClassData] = useState([]);
  const [examData, setexamData] = useState([
  ]);

  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) => {
        const userstaff = res.data.user.staff;
        const userstudent = res.data.user.student;
        setUserStaffMemberData(userstaff);
        setUserStudentData(userstudent);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        const dStaff = res.data.staff;
        const institute = res.data.staff.institute;
        setStaffDesignation(dStaff);
        setStaffIns(institute);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/staffdepartment/${params.did}`)
      .then((res) => {
        const ddata = res.data.department;
        const bData = res.data.department.batches;
        setDepartmentData(ddata);
        setBatchData(bData);
        setDBatchData(res.data.department.userBatch);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/batch-detail/${params.bid}`)
      .then((res) => {
        const bClass = res.data.batch.classroom;
        setBatchClassData(bClass);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/exam/batch/${params.did}`)
      .then((res) => {
        const examData = res.data.exams;
        setexamData(examData);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  const [classSubjectData, setClassSubjectData] = useState([]);
  const [classText, setClassText] = useState({
    ClassId: "",
  });

  const ClassHandler = (e) => {
    const { name, value } = e.target;
    setClassText({
      ...classText,
      [name]: value,
    });
  };

  const ClassHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/batch/class`, classText)
      .then((res) => {
        const bClass = res.data.classes.subject;
        setClassSubjectData(bClass);
        navigate(
          `/user/${params.id}/staff/${params.sid}/department/functions/${params.did}/batch/${params.bid}`
        );
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

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
                  <UserStaffSideBar sid={params.sid} uid={params.id}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
            <StaffSelectInstituteRole id={params.id} sid={params.sid} />
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={styles.insTitle}>
                  <h3>{departmentData.dName} Department</h3>
                </div>
                <div className={`${styles.outer2} mt-4`}>
                  <h4 className="my-3">Activity</h4>
                  <div className={`my-4 ${styles.ddetailE}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                    <div className="col-2 col-lg-3">
                      <div className={`${styles.dTab} my-2`}>
                        <span>
                        <img src="/images/examination-icon.svg" title="Examination" />{" "}
                          <p className={styles.ttext}> &nbsp; Examination </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2 col-lg-3">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department/checklist/${params.did}/batch/${dBatchData._id}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/checklist-icon.svg" title="Checklist" />{" "}
                          <p className={styles.ttext}> &nbsp; Checklist </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2 col-lg-3">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department/fee/${params.did}/batch/${dBatchData._id}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/finance-icon.svg" title="Finance" />{" "}
                          <p className={styles.ttext}>  &nbsp; Fees </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2 col-lg-3">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department/holiday/${params.did}/batch/${dBatchData._id}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/s-attendence-icon.svg" title="Attendence" />{" "}
                          <p className={styles.ttext}>  &nbsp; Holidays </p>
                        </span>
                      </div>
                      </div>
                    </div>

                    {/* -------------------------------------------------------------- */}

                    <div className={`my-4 col ${styles.detailE}`}>
                    <div>
                      <CreateExam bid={dBatchData._id} />
                    </div>
                    </div>
                    {/* Card For Exam Creation */}
                
                  <div className="Row d-flex flex-wrap">
                    {examData &&
                      examData.map((st) => (
                        <div className={styles.examCard}>
                          <p className={styles.dlogoText}>
                            <img src="/images/icon-examcolor.svg" alt="exam" />
                            &nbsp; {st.examName}
                            <br />
                            <small>
                          <span className={styles.dlogodesc}>
                                  For Class {st.examForClass.className}-{st.examForClass.classTitle}
                            <br />
                          </span>
                          </small>
                          </p>
                          
                          <p className="d-flex flex-column">
                            {/* <span className={styles.dlogodesc}>
                              For Class {st.examForClass.className}-{st.examForClass.classTitle}
                            <br /> */}
                              Exam Type- {st.examType}
                            {/* </span> */}
                            {/* {const dexam = st.examDate.slice(0, 9);} */}
                            <small>
                              Exam Time - {st.examTime}
                              <br />
                              Exam Date - {st.examDate.slice(0, 10)}
                            </small>
                          </p>
                        </div>
                      ))}
                  </div>
                    {/* Card End  */}
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

export default StaffDepartmentFunctionExam;
