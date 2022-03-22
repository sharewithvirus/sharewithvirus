import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import ProfileDisplaySection from "../ProfileDisplaySection";
import NewDepartmentDetailBar from "../NewDepartmentDetailBar";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import UserStaffAboutSection from "../UserStaffAboutSection";
import InstituteRoleTab from "../InstituteRoleTab";

const StaffDepartmentProfile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [staffIns, setStaffIns] = useState("");
  const [userBatchData, setUserBatchData] = useState("");

  const [departmentData, setDepartmentData] = useState("");
  const [userClassData, setUserClassData] = useState("");

  useEffect(() => {
    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        const institute = res.data.staff.institute;
        setStaffIns(institute);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/staffdepartment/${params.did}`)
      .then((res) => {
        const ddata = res.data.department;
        setDepartmentData(ddata);
        setUserBatchData(res.data.department.userBatch);
        setUserClassData(res.data.department.userBatch.classroom);
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
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection
                    profilePicSrc={"/images/department-avatar.jpeg"}
                  />
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
                      <div className={`${styles.dhTab}`}>
                        <span>
                        <img src="/images/department-menu-icon.svg" title="Menu" />{" "}
                        </span>
                      </div>
                      {userBatchData ? (
                        <div
                          className={`${styles.dhTab} ${styles.active}`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/department-info/${params.did}/batch/${userBatchData._id}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/info-icon.svg" title="Info" />{" "}
                          </span>
                        </div>
                      ) : (
                        <div className={`${styles.dhTab} ${styles.active}`}>
                          <span>
                          <img src="/images/info-icon.svg" title="Info" />{" "}
                          </span>
                        </div>
                      )}
                      {userBatchData ? (
                        <div
                          className={`${styles.dhTab} ${styles.active}`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/department-class/${params.did}/batch/${userBatchData._id}`
                            )
                          }
                        >
                          <span>
                            <img src="/images/class-icon.svg" alt="class" title="Class" />
                          </span>
                        </div>
                      ) : (
                        <div className={`${styles.dhTab} ${styles.active}`}>
                          <span>
                            <img src="/images/class-icon.svg" alt="class" title="Class" />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                    {userBatchData ? (
                      <div
                        className={styles.ddetailInner}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department/staff/room/${params.did}/batch/${userBatchData._id}`
                          )
                        }
                      >
                        <img src="/images/icon-staffroom.svg" alt="staffroom" />
                        <p className="my-2">Staff Room</p>
                      </div>
                    ) : (
                      <div className={styles.ddetailInner}>
                        <img src="/images/icon-staffroom.svg" alt="staffroom" />
                        <p className="my-2">Staff Room</p>
                      </div>
                    )}
                    {userBatchData ? (
                      <div
                        className={styles.ddetailInner}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department/functions/${params.did}/batch/${userBatchData._id}`
                          )
                        }
                      >
                        <img src="/images/icon-functions.svg" alt="functions" />
                        <p className="my-2">Functions</p>
                      </div>
                    ) : (
                      <div className={styles.ddetailInner}>
                        <img src="/images/icon-functions.svg" alt="functions" />
                        <p className="my-2">Functions</p>
                      </div>
                    )}
                    <div className={styles.ddetailInner}>
                      <img
                        src="/images/icon-competition.svg"
                        alt="competition"
                      />
                      <p className="my-2">Competitions</p>
                    </div>
                    <div
                      className={styles.ddetailInner}
                      onClick={() =>
                        navigate(
                          `/user/${params.id}/staff/${params.sid}/department/batch/setting/${params.did}`
                        )
                      }
                    >
                      <img
                        src="/images/icon-gearsetting.svg"
                        alt="gearsetting"
                      />
                      <p className="my-2">Settings</p>
                    </div>
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

export default StaffDepartmentProfile;
