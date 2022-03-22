import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Success } from "../SnackBar";
import UserStaffAboutSection from "../UserStaffAboutSection";
import UserStaffSideBar from "../UserStaffSideBar";
import staffStyle from "./StaffAttendencMark.module.css";
import InstituteRoleTab from '../InstituteRoleTab'
import StaffSelectInstituteRole from '../StaffSelectInstituteRole'

const StaffDepartmentAttendence = () => {
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
  const [staffAttendDate, setStaffAttendDate] = useState("");
  const [staffAttendReg, setStaffAttendReg] = useState("");
  const [present, setPresent] = useState(false);
  const [absent, setAbsent] = useState(false);
  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) => {
        const userstaff = res.data.user.staff;
        const userstudent = res.data.user.student;
        setUserStaffMemberData(userstaff);
        // setUserStudentData(userstudent);
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

  const [staffAttendenceData, setStaffAttendenceData] = useState({
    staffAttendDate: "",
    staffAttendTime: `${date.getHours()}:${date.getMinutes()}`,
  });
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  const StaffAttendenceHandler = (e) => {
    const { name, value } = e.target;
    setStaffAttendenceData({
      ...staffAttendenceData,
      [name]: value,
    });
  };

  const StaffAttendenceHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(
        `${requestURL}/department/${params.did}/staff/attendence`,
        staffAttendenceData
      )
      .then((res) => {
        setStaffAttendDate(res.data.staffAttendDate);
        setStaffAttendReg(res.data.staffAttendReg);
        setAdminMsg({ showMessages: true, msg: res.data.message });
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    const sheet = document.querySelector(".attendenceSheet");
    sheet.style.display = "block";
  };

  const StaffPresentHandler = (id) => {
    axios
      .post(
        `${requestURL}/staff/${id}/attendence/${staffAttendDate._id}/present/${staffAttendReg._id}`,
        {
          status: "present",
        }
      )
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const StaffAbsentHandler = (id) => {
    axios
      .post(
        `${requestURL}/staff/${id}/attendence/${staffAttendDate._id}/absent/${staffAttendReg._id}`,
        {
          status: "absent",
        }
      )
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  function handleChange(value) {
    navigate(`/${value}`);
  }
  return (
    <>
      <NavbarTopUser uid={params.id} />
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
            <InstituteRoleTab uid={params.id}/>
              <div className={styles.leftBar}>
                <UserStaffAboutSection sid={params.sid} />
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
              <div className={`${styles.about}`}>
                {/* <BackButton /> */}
                <div className={styles.insTitle}>
                  <h3>{`${departmentData.dName} Department`}</h3>
                </div>
                <div className={` ${styles.outer2}`}>
                  {/* <h4 className="my-3">Staff Room</h4> */}
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row">
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
                  </div>
                  <hr />
                  <h4 className="my-3">Staff Attendence</h4>
                  <form onSubmit={StaffAttendenceHandlerChange}>
                    <div className="row d-flex justify-content-between align-items-center mb-4">
                      <div className="col-12 col-md-6 mt-4">
                        <label htmlFor="staffAttendDate" className="mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="staffAttendDate"
                          id="staffAttendDate"
                          placeholder="Enter date"
                          onChange={StaffAttendenceHandler}
                          required
                        />
                      </div>
                      
                      <div className="col-12 col-md-6 mt-4">
                        <button
                          type="submit"
                          className="btn btn-outline-primary mx-auto mt-4 px-5"
                        >
                          Make Previous
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="attendenceSheet" style={{ display: "none" }}>
                    <div class="d-flex justify-content-center">
                      <div className={staffStyle.attendenceContainer}>
                        <div className={staffStyle.attendenceinput}>
                          <div className={staffStyle.flexitem}>
                            <label
                              htmlFor="fdate"
                              className={`form-group ${staffStyle.flexitemlabel}`}
                              style={{ color: "white" }}
                            >
                              Date:{" "}
                            </label>
                            <input
                              type="date"
                              name="fdate"
                              placeholder="Date"
                              required
                            />
                          </div>
                          <div className={staffStyle.flexitem}>
                            <button
                              className="btn btn-outline-secondary px-5"
                              onClick={() =>
                                navigate(
                                  `/user/${params.id}/staff/${params.sid}/department/attendence/history/${params.did}/batch/${params.bid}`
                                )
                              }
                            >
                              Check Attendence History
                            </button>
                          </div>
                        </div>

                        <div
                          class="d-flex justify-content-center"
                          style={{ marginTop: "-32px" }}
                        >
                          <table className={staffStyle.attendenceTable}>
                            <thead>
                              <tr style={{ lineHeight: "50px" }}>
                                <th>Roll No.</th>
                                <th>Staff Name</th>
                                <th>Marked Present</th>
                                <th>Marked Absent</th>
                              </tr>
                            </thead>

                            <tbody>
                              {batchClassData.map((ct) => (
                                <tr
                                  key={batchClassData.indexOf(ct) + 1}
                                  className={
                                    (batchClassData.indexOf(ct) + 1) % 2 === "0"
                                      ? staffStyle.activeRow
                                      : staffStyle.rowHight
                                  }
                                >
                                  <td>{batchClassData.indexOf(ct) + 1}</td>
                                  <td>{`${ct.staffFirstName} ${
                                    ct.staffMiddleName ? ct.staffMiddleName : ""
                                  } ${ct.staffLastName}`}</td>
                                  <td>
                                    <i
                                      className={`fa fa-check fa-sm ${staffStyle.present}`}
                                      aria-hidden="true"
                                      style={
                                        present
                                          ? { color: "green" }
                                          : { color: "grey" }
                                      }
                                      onClick={() => {
                                        StaffPresentHandler(ct._id);
                                        setPresent(true);
                                        setAbsent(false);
                                      }}
                                    ></i>
                                  </td>
                                  <td>
                                    <i
                                      className={`fas fa-times fa-sm ${staffStyle.absent}`}
                                      style={
                                        absent
                                          ? { color: "red" }
                                          : { color: "grey" }
                                      }
                                      onClick={() => {
                                        StaffAbsentHandler(ct._id);
                                        setPresent(false);
                                        setAbsent(true);
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
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
    </>
  );
};

export default StaffDepartmentAttendence;