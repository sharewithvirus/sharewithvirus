import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import ProfileDisplaySection from "../ProfileDisplaySection";
import NewDepartmentDetailBar from "../NewDepartmentDetailBar";
import NavbarBottomUser from "../NavbarBottomUser";
import UserStaffAboutSection from "../UserStaffAboutSection";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";

const StaffDepartmentBatchSetting = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userStaffMemberData, setUserStaffMemberData] = useState([]);
  const [userStudentData, setUserStudentData] = useState([]);
  const [staffDesignation, setStaffDesignation] = useState([]);
  const [staffDepartmentData, setStaffDepartmentData] = useState([]);
  const [staffClassData, setStaffClassData] = useState([]);
  const [staffSubjectData, setStaffSubjectData] = useState([]);
  const [staffIns, setStaffIns] = useState("");
  const [userBatchData, setUserBatchData] = useState("");


  const [departmentData, setDepartmentData] = useState("");
  const [batchData, setBatchData] = useState([]);

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
        const department = res.data.staff.staffDepartment;
        const classes = res.data.staff.staffClass;
        const subject = res.data.staff.staffSubject;
        setStaffDesignation(dStaff);
        setStaffIns(institute);
        setStaffDepartmentData(department);
        setStaffClassData(classes);
        setStaffSubjectData(subject);
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
        setUserBatchData(res.data.department.userBatch);
        setBatchData(bData);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  const [batchClassData, setBatchClassData] = useState([]);
  const [batchText, setBatchText] = useState({
    BatchId: "",
  });

  const BatchHandler = (e) => {
    const { name, value } = e.target;
    setBatchText({
      ...batchText,
      [name]: value,
    });
  };

  const BatchHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/${params.did}/department/batch`, batchText)
      .then((res) => {
        const bClass = res.data.batch.batchStaff;
        setBatchClassData(bClass);
        navigate(
          `/user/${params.id}/staff/${params.sid}/department/${params.did}`
        );
      })
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
                    sSecond="Students"
                    SSecondCount={500}
                    body1={`${
                      departmentData.dAbout
                        ? departmentData.dAbout
                        : "Description"
                    }`}
                  />
                  <div className={`my-4 ${styles.ddetail}`}>
                  <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                    <div className="col-4">
                      <div className={`${styles.dTab} ${styles.active}`}
                      onClick={() =>
                        navigate(
                          `/user/${params.id}/staff/${params.sid}/department/${params.did}`
                        )
                      }
                      >
                        <span>
                        <img src="/images/department-menu-icon.svg" title="Menu" />{" "}
                        </span>
                      </div>
                      </div>
                    <div className="col-4">
                      <div className={`${styles.dTab} ${styles.active}`}
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
                      </div>
                    <div className="col-4">
                      <div className={`${styles.dTab} ${styles.active}`}
                      onClick={() =>
                        navigate(
                          `/user/${params.id}/staff/${params.sid}/department-class/${params.did}/batch/${userBatchData._id}`
                        )
                      }
                      >
                        <span>
                        <img src="/images/class-icon.svg" title="Class" />{" "}
                        </span>
                      </div>
                      </div>
                    </div>
                  </div>
                  <form className="mt-5" onSubmit={BatchHandlerChange}>
                    <div className={` gx-0 my-5  ${styles.cardContainer}  `}>
                      <div className="col-12 col-md-6 mb-2">
                        <label for="chead" className="form-label">
                          Batches
                        </label>
                        <select
                          name="BatchId"
                          className="form-select"
                          id="chead"
                          onChange={BatchHandler}
                        >
                          <option value="Select Batches">Select Batches</option>
                          {batchData &&
                            batchData.map((st) => (
                              <option value={st._id}>{st.batchName}</option>
                            ))}
                        </select>
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                            <button type="button" className="btn btn-info mx-auto px-5 my-3" onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/department/batch/setting/complaint/${params.did}`)}>Tab</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomUser uid={params.id} />
      </div>
    </>
  );
};

export default StaffDepartmentBatchSetting;
