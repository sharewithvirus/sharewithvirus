import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserStaffAboutSection from "../UserStaffAboutSection";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";

const StaffDepartmentRoom = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [staffIns, setStaffIns] = useState("");

  const [departmentData, setDepartmentData] = useState("");
  const [batchData, setBatchData] = useState([]);
  const [batchClassData, setBatchClassData] = useState([]);
  const [first, setFirst] = useState(false)

  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) => {
        const userstaff = res.data.user.staff;
        const userstudent = res.data.user.student;
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        const dStaff = res.data.staff;
        const institute = res.data.staff.institute;
        const department = res.data.staff.staffDepartment;
        const classes = res.data.staff.staffClass;
        const subject = res.data.staff.staffSubject;
 
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
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/batch-detail/${params.bid}`)
      .then((res) => {
        const bClass = res.data.batch.batchStaff;
        setBatchClassData(bClass);
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
                  <UserStaffSideBar sid={params.sid} uid={params.id}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
            <StaffSelectInstituteRole id={params.id} sid={params.sid} />
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={`${styles.insTitle} mt-3`}>
                  <h3>{`${
                    departmentData ? departmentData.dName : ""
                  } Department Staff Room`}</h3>
                </div>
                <div className={` ${styles.outer2}`}>
                  {/* <h4 className="my-3">Staff Room</h4> */}
                  <div className={`my-4 ${styles.ddetail}`}>
                  <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                    <div className="col-4">
                      <div
                        className={`${styles.dTab} `}
                        // onClick={() => navigate("/staffrequest")}
                      >
                        <span>
                          <img src="/images/catalog-icon.svg" alt="Register" />
                          <p className={styles.ttext}>&nbsp; Register </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-4">
                      <div
                        className={`${styles.dTab} ${styles.active}`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department/mark/attendence/${params.did}/batch/${params.bid}`
                          )
                        }
                      >
                        <span>
                          <img
                            src="/images/s-attendence-icon.svg"
                            alt="attendance"
                            title="Attendence"
                          />
                          <p className={styles.ttext}>&nbsp; Attendance</p>
                        </span>
                      </div>
                      </div>
                      <div className="col-4">
                      <div
                        className={`${styles.dTab} ${styles.active}`}
                        // onClick={() => navigate("/staffattendencecopy")}
                      >
                        <span>
                          <img
                            src="/images/s-attendence-setting-icon.svg"
                            alt="setting"
                            title="Attendence Setting"
                          />
                         <p className={styles.ttext}> &nbsp; Attendance Setting </p>
                        </span>
                      </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row d-flex justify-content-between align-items-center mt-5 mb-4">
                    <div
                      className={`col-4 col-lg-3 ${styles.barInnersLeft} ${styles.countSection}`}
                    >
                      <p>{batchClassData.length}</p>
                      <p>Total Staff</p>
                    </div>
                    <div className="col-7">
                      <input
                        type="text"
                        name="search"
                        className="form-control"
                        placeholder="search staff..."
                      />
                    </div>
                  </div>

                  <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                    {batchClassData &&
                      batchClassData.map((st) => (
                        <div className={` ${styles.dlogo} ${styles.cardView}`}>
                          <img
                            className={styles.dlogoImages}
                            src={
                              st.photoId === "1"
                                ? "/images/image-boy2.png"
                                : first
                                ? `${requestURL}/search/insdashboard/staffdata/photo/${st.staffProfilePhoto}`
                                : null
                            }
                            alt="Profile"
                          />
                          <p className={styles.dlogoText}>
                            <small>{`(${batchClassData.indexOf(st) + 1}) ${
                              st.staffFirstName
                            } ${st.staffMiddleName ? st.staffMiddleName : ""} ${
                              st.staffLastName
                            }`}</small>
                          </p>
                        </div>
                      ))}
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

export default StaffDepartmentRoom;
