import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import UserStaffAboutSection from "../UserStaffAboutSection";
import ProfileDisplaySection from "../ProfileDisplaySection";
import NewDepartmentDetailBar from "../NewDepartmentDetailBar";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";

const StaffDepartmentClass = () => {
  const navigate = useNavigate();
  const [addClass, setaddClass] = useState(false);
  const params = useParams();
  const [userStaffMemberData, setUserStaffMemberData] = useState([]);
  const [userStudentData, setUserStudentData] = useState([]);
  const [staffDesignation, setStaffDesignation] = useState([]);
  const [staffIns, setStaffIns] = useState("");

  const [departmentData, setDepartmentData] = useState("");
  const [batchData, setBatchData] = useState([]);
  const [batchClassData, setBatchClassData] = useState([]);
  const [userBatchData, setUserBatchData] = useState("");
  const [userClassData ,setUserClassData] = useState("");

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
        setUserBatchData(res.data.department.userBatch);
        setUserClassData(res.data.department.userBatch.classroom)
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
                  <UserStaffSideBar sid={params.sid} uid={params.id}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
            <StaffSelectInstituteRole id={params.id} sid={params.sid} />
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={styles.insTitle}></div>
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection />
                  <NewDepartmentDetailBar
                    name={departmentData.dName}
                    sFirst="Class"
                    sFirstCount={12}
                    batchData={userBatchData}
                    classList={userClassData}
                    sSecond="Students"
                    SSecondCount={500}
                    body1={`${
                      departmentData.dAbout
                        ? departmentData.dAbout
                        : "Description"
                    }`}
                  />
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row">
                      <div
                        className={`${styles.dhTab} ${styles.active}`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department/${params.did}/batch/${params.bid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/department-menu-icon.svg" title="Menu" />{" "}
                        </span>
                      </div>
                      <div
                        className={`${styles.dhTab} ${styles.active}  `}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department-info/${params.did}/batch/${params.bid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/info-icon.svg" title="Info" />{" "}
                        </span>
                      </div>
                      <div
                        className={`${styles.dhTab} `}
                        // onClick={() => navigate("/departmentclasscopy")}
                      >
                        <span>
                        <img src="/images/class-icon.svg" title="Class" />{" "}
                        </span>
                      </div>
                    </div>
                  </div>

                  <form className="row mt-5">
                    <div className="row d-flex justify-content-between">
                      <div className="col-6 col-lg-8  mb-2">
                        <input
                          type="text"
                          className="form-control"
                          id="firstname"
                          placeholder="Search Classrooms..."
                        />
                      </div>
                      <div className="mb-3 col col-6 col-lg-4 d-flex justify-content-end">
                        
                      </div>
                    </div>
                    <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                      {batchClassData &&
                        batchClassData.map((st) => (
                          <div
                            className={` ${styles.dlogo} ${styles.cardView}`}
                          >
                            <img
                              className={styles.dlogoImages}
                              src="/images/logo-classroom.png"
                              alt="classroom"
                            />
                            <p className={styles.dlogoText}>
                              <small>
                                {st.className ? `${st.className}- ${st.classTitle} Class` : ""}
                              </small>
                            </p>
                          </div>
                        ))}
                    </div>
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

export default StaffDepartmentClass;
