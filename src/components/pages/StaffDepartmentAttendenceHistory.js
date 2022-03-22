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
import StaffSelectInstituteRole from '../StaffSelectInstituteRole';
import InstituteRoleTab from "../InstituteRoleTab";

const StaffDepartmentAttendenceHistory = (props) => {
  const navigate = useNavigate();

  const params = useParams();

  const [userStaffMemberData, setUserStaffMemberData] = useState([]);
  const [userStudentData, setUserStudentData] = useState([]);
  const [staffDesignation, setStaffDesignation] = useState([]);
  const [staffDepartmentData, setStaffDepartmentData] = useState([]);
  const [staffClassData, setStaffClassData] = useState([]);
  const [staffSubjectData, setStaffSubjectData] = useState([]);
  const [staffIns, setStaffIns] = useState("");
  const [date, setDate] = useState(new Date());

  const [departmentData, setDepartmentData] = useState("");
  const [batchData, setBatchData] = useState([]);
  const [batchClassData, setBatchClassData] = useState([]);
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

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
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  const [attendText, setAttendText] = useState([]);
  const [staffPresentData, setStaffPresentData] = useState([]);
  const [staffAbsentData, setStaffAbsentData] = useState([]);
  const [staffAttendenceData, setStaffAttendenceData] = useState({
    staffAttendDate: "",
  });

  const GetStaffAttendenceHandler = (e) => {
    const { name, value } = e.target;
    setStaffAttendenceData({
      ...staffAttendenceData,
      [name]: value,
    });
  };

  const GetStaffAttendenceHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/staff/attendence`, staffAttendenceData)
      .then((res) => {
        if (res.data.message) {
          setAdminMsg({ showMessages: true, msg: res.data.message });
        }
        setAttendText(res.data.staffDates);
        setStaffPresentData(res.data.staffDates.presentStaff);
        setStaffAbsentData(res.data.staffDates.absentStaff);
        console.log(res);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  useEffect(() => {
    axios
      .post(`${requestURL}/staff/attendence`, {
        staffAttendDate: `${date.getFullYear()}-${
          date.getMonth() >= 10
            ? date.getMonth() + 1
            : `0${date.getMonth() + 1}`
        }-${date.getDate()}`,
      })
      .then((res) => {
        setStaffPresentData(res.data.staffDates.presentStaff);
        setStaffAbsentData(res.data.staffDates.absentStaff);
        console.log(res.data.staffDates);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);


  return (
    <>
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}
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
                <div className={styles.insTitle}>
                  <h3>{departmentData.dName} Department</h3>
                </div>
                <div className={`${styles.outer2} mt-4`}>
                  {/* <h4 className="my-3">Class Catalog</h4> */}
                  <div className={`my-4 ${styles.ddetail}`}>
                  <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                    <div className="col-4">                        
                    <div
                          className={`${styles.dTab}  ${styles.active}`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/department/staff/room/${params.did}/batch/${params.bid}`
                            )
                          }
                        >
                          <span>
                          <img
                              src="/images/catalog-icon.svg"
                              alt="register"
                              title="Register"
                            />
                            &nbsp; Register
                          </span>
                        </div>
                        </div>
                    <div className="col-4">
                        <div className={`${styles.dTab}`}>
                          <span>
                          <img
                              src="/images/s-attendence-icon.svg"
                              alt="attendance"
                              title="Attendence"
                            />
                            &nbsp; Attendance
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
                            &nbsp; Attendance Setting
                          </span>
                          </div>
                      </div>
                    </div>
                    <hr />
                    <form onSubmit={GetStaffAttendenceHandlerChange}>
                      <div className="row d-flex justify-content-between align-items-center mt-5 mb-4">
                        <div className="col-12 col-md-6">
                          {/* <label htmlFor="fee" className="mx-1">
                            Date
                          </label> */}
                          <input
                            type="date"
                            className="form-control"
                            id="fee"
                            name="staffAttendDate"
                            min="1"
                            max="5"
                            onChange={GetStaffAttendenceHandler}
                            required
                          />
                        </div>
                        <div className="col-12 col-md-6">
                          <button
                            type="submit"
                            className="btn btn-outline-primary"
                          >
                            Select Date
                          </button>
                        </div>
                      </div>
                    </form>
                    <p className={`${styles.dlogoText} mt-5`}>Staff List</p>
                    <div className="row">
                      <div className="col-12 col-md-6 d-flex">
                        <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                          {staffPresentData &&
                            staffPresentData.map((dt) => (
                              <div
                                className={` ${styles.dlogo} ${styles.cardView}`}
                              >
                                <p className={styles.dlogoText}>
                                  <img
                                    className={styles.insUserProfiles}
                                    src={
                                      dt.photoId === "1"
                                        ? "/images/image-boy2.png"
                                        : `${requestURL}/search/insdashboard/staffdata/photo/${dt.staffProfilePhoto}`
                                    }
                                  />
                                  <br />
                                  <small>({dt.staffROLLNO})</small>
                                  <br />
                                  <small>
                                    {" "}
                                    {`${dt.staffFirstName} ${
                                      dt.staffMiddleName
                                        ? dt.staffMiddleName
                                        : ""
                                    } ${dt.staffLastName}`}
                                  </small>
                                  <span className="text-primary">
                                    (Present)
                                  </span>
                                </p>
                              </div>
                            ))}
                        </div>
                        <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                          {staffAbsentData &&
                            staffAbsentData.map((dt) => (
                              <div
                                className={` ${styles.dlogo} ${styles.cardView}`}
                              >
                                <p className={styles.dlogoText}>
                                  <img
                                    className={styles.insUserProfiles}
                                    src={
                                      dt.photoId === "1"
                                        ? "/images/image-boy2.png"
                                        : `${requestURL}/search/insdashboard/staffdata/photo/${dt.staffProfilePhoto}`
                                    }
                                  />
                                  <br />
                                  <small>({dt.staffROLLNO})</small>
                                  <br />
                                  <small>
                                    {" "}
                                    {`${dt.staffFirstName} ${
                                      dt.staffMiddleName
                                        ? dt.staffMiddleName
                                        : ""
                                    } ${dt.staffLastName}`}
                                  </small>
                                  <span className="text-danger">(Absent)</span>
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
          </div>
        </div>
        <NavbarBottomUser uid={params.id} />
      </div>
    </>
  );
};

export default StaffDepartmentAttendenceHistory;
