import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import AboutSection from "../AboutSection";
import NavbarBottomUser from "../NavbarBottomUser";
import Calendars from "../Calender";
import StudentProgress from "../StudentProgress";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserStudentAboutSection from "../UserStudentAboutSection";
import UserStudentSideBar from "../UserStudentSideBar";
import InstituteRoleTab from "../InstituteRoleTab";

const StudentMemberProgress = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userStaffMemberData, setUserStaffMemberData] = useState([]);
  const [userStudentData, setUserStudentData] = useState([]);
  const [studentDesignation, setStudentDesignation] = useState([]);
  const [studentClassData, setStudentClassData] = useState("");
  const [studentIns, setStudentIns] = useState("");
  const [studentAttendData, setStudentAttendData] = useState([]);

  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) => {
        // console.log(res)
        const userstaff = res.data.user.staff;
        const userstudent = res.data.user.student;
        setUserStaffMemberData(userstaff);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    axios
      .get(`${requestURL}/studentdesignationdata/${params.sid}`)
      .then((res) => {
        // console.log(res)
        const dStudent = res.data.student;
        const classes = res.data.student.studentClass;
        const institute = res.data.student.institute;
        setStudentDesignation(dStudent);
        setStudentClassData(classes);
        setStudentIns(institute);
        setStudentAttendData(res.data.student.studentAttendence);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/student/${params.sid}/attendence`)
      .then((res) => {
        // console.log(res)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  const selectChange = (value) => {
    navigate(`/${value}`);
  };

  return (
    <>
      <NavbarTopUser uid={params.id} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <InstituteRoleTab uid={params.id} />
              <div className={styles.leftBar}>
                <UserStudentAboutSection sid={params.sid} uid={params.id} />
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                ></div>

                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <UserStudentSideBar sid={params.sid} uid={params.id} data={studentClassData ? studentClassData : ''}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div
                className={`h-100 ${styles.about}`}
                style={{ marginTop: "24px" }}
              >
                {/* <BackButton /> */}
                <div className={styles.insTitle}>
                  <div className={styles.insTitle}>
                    <h3>
                      Student of ({studentClassData.className}-
                      {studentClassData.classTitle})
                    </h3>
                  </div>
                  <div className={`${styles.outer2} mt-4`}>
                    {/* <h4 className="my-3">Class Catalog</h4> */}
                    <div className={`my-4 ${styles.ddetail}`}>
                      <div className="row">
                        <div className="col-2">
                          <div
                            className={`${styles.dTab} ${styles.active} my-2`}
                            onClick={() =>
                              navigate(
                                `/user/${params.id}/studentdetail/${params.sid}`
                              )
                            }
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
                            className={`${styles.dTab}  my-2`}
                            // onClick={() => navigate(`/user/${params.id}/student/progress-report/${params.sid}`)}
                          >
                            <span>
                              <img src="/images/score-icon.svg" title="Score" />
                              <p className={styles.ttext}> &nbsp; Progress </p>
                            </span>
                          </div>
                        </div>
                        <div className="col-2">
                          <div
                            className={`${styles.dTab} ${styles.active} my-2`}
                            onClick={() =>
                              navigate(
                                `/user/${params.id}/student/ins/${studentIns._id}/activity/${params.sid}`
                              )
                            }
                          >
                            <span>
                              <img
                                src="/images/department-menu-icon.svg"
                                title="Menu"
                              />{" "}
                              <p className={styles.ttext}>&nbsp; Activity </p>
                            </span>
                          </div>
                        </div>
                        <div className="col-2">
                          <div
                            className={`${styles.dTab} ${styles.active} my-2`}
                            onClick={() =>
                              navigate(
                                `/user/${params.id}/student/fee/${params.sid}`
                              )
                            }
                          >
                            <span>
                              <img
                                src="/images/finance-icon.svg"
                                title="Finance"
                                style={{ width: "1.5rem" }}
                              />{" "}
                              <p className={styles.ttext}>&nbsp; Fee </p>
                            </span>
                          </div>
                        </div>
                        <div className="col-2">
                          <div
                            className={`${styles.dTab} ${styles.active} my-2`}
                            onClick={() => navigate(`/user/${params.id}/library`)}
                            >
                            <span>
                              <img
                                src="/images/library-icon.svg"
                                title="Library"
                              />{" "}
                              <p className={styles.ttext}> &nbsp; Library </p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <StudentProgress studentId={params.sid} />
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

export default StudentMemberProgress;
