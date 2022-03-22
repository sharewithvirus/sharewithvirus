import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserStaffAboutSection from "../UserStaffAboutSection";
import { Link } from "react-router-dom";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";

const StaffClassRequest = (props) => {
  const navigate = useNavigate();

  const params = useParams();
  const [userStaffMemberData, setUserStaffMemberData] = useState([]);
  const [staffIns, setStaffIns] = useState("");
  const [classData, setClassData] = useState("");
  const [classStudentData, setClassStudentData] = useState([]);
  const [first, setFirst] = useState(false);

  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) => {
        const userstaff = res.data.user.staff;
        const userstudent = res.data.user.student;
        setUserStaffMemberData(userstaff);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        // console.log(res);
        const dStaff = res.data.staff;
        const institute = res.data.staff.institute;
        // setStaffDesignation(dStaff);
        setStaffIns(institute);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/staffclass/${params.cid}`)
      .then((res) => {
        // console.log(res);
        const Cdata = res.data.classes;
        const classSt = res.data.classes.student;
        setClassData(Cdata);
        setClassStudentData(classSt);
        setFirst(true);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);
  // }, [classData]);

  const StudentApproveHandler = (id) => {
    axios
      .post(
        `${requestURL}/ins/${classData.institute._id}/student/${params.cid}/approve/${id}/depart/${classData.department._id}/batch/${classData.batch._id}`,
        {
          status: "Approved",
        }
      )
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const StudentRejectHandler = (id) => {
    axios
      .post(
        `${requestURL}/ins/${classData.institute._id}/student/${params.cid}/reject/${id}`,
        {
          status: "Rejected",
        }
      )
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopUser uid={params.id} />
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
                {/* <BackButton /> */}
                <div className={styles.insTitle}>
                  <h3>{classData.className} Class Student Request</h3>
                </div>
                <div className={`my-4 ${styles.ddetail}`}>
                  <div className="row d-flex justify-content-between align-items-center mb-4 mx-4">
                    <div
                      className={`col-6 col-xl-3 ${styles.barInnersLeft} ${styles.countSection}`}
                    >
                      <p>{classStudentData.length}</p>
                      <p>Action Pending</p>
                    </div>
                  </div>
                  {classStudentData.length >= 1
                    ? classStudentData &&
                      classStudentData.map((ct) => (
                        <div className={` ${styles.dUser}`}>
                          <div className="col-xl-9 col-lg-8 col-md-12 d-flex justify-content-between align-items-center">
                            <div>
                              <img
                                className={styles.insUserProfiles}
                                src={
                                  ct.photoId === "1"
                                    ? "/images/image-boy2.png"
                                    : `${requestURL}/search/insdashboard/staffdata/photo/${ct.studentProfilePhoto}`
                                }
                              />
                              <span className="mt-3 mx-3">{`${
                                ct.studentFirstName
                              } ${
                                ct.studentMiddleName ? ct.studentMiddleName : ""
                              } ${ct.studentLastName}`}</span>
                            </div>
                            <Link
                              to={`/classrequest/application/${ct._id}`}
                              className="mx-3"
                            >
                              View
                            </Link>
                          </div>
                          <div
                            id="btnGroup"
                            className="btn-group col-xl-3 col-lg-4 col-md-6 mx-auto"
                            role="group"
                          >
                            <button
                              type="button"
                              class={`btn btn-primary  `}
                              onClick={() => {
                                StudentApproveHandler(ct._id);
                              }}
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              class={`btn btn-secondary`}
                              onClick={() => {
                                StudentRejectHandler(ct._id);
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))
                    : "No More Request"}
                  {/* {classStudentData &&
                        classStudentData.map((ct) => (
                          <div className={` ${styles.dUser}`}>
                            <div className="col-xl-9 col-lg-8 col-md-12 d-flex justify-content-around align-items-start">
                              <div>
                                <img
                                  className={styles.insUserProfiles}
                                  src={
                                    ct.photoId === "1"
                                      ? "/images/image-boy2.png"
                                      : first 
                                      ? `${requestURL}/search/insdashboard/studentdata/photo/${ct.studentProfilePhoto}`
                                      : null
                                  }
                                />
                                <span className="mt-1 mx-1">
                                  {`${ct.studentFirstName} ${
                                    ct.studentMiddleName
                                      ? ct.studentMiddleName
                                      : ""
                                  } ${ct.studentLastName}`}{" "}
                                  
                                </span>
                              </div>
                            </div>
                            <Link to={`/classrequest/application/${ct._id}`} className="mx-3">
                              View
                            </Link>   
                            <div
                              id="btnGroup"
                              className="btn-group col-xl-3 col-lg-4 col-md-6 mx-auto"
                              role="group"
                            >
                              <button
                                type="button"
                                class={`btn btn-primary  `}
                                onClick={() => {
                                  StudentApproveHandler(ct._id);
                                }}
                              >
                                Approve
                              </button>
                              <button
                                type="button"
                                class={`btn btn-info`}
                                onClick={() => {
                                  StudentRejectHandler(ct._id);
                                }}
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        ))} */}
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
        <NavbarBottomUser uid={params.id} />
      </div>
    </>
  );
};

export default StaffClassRequest;
