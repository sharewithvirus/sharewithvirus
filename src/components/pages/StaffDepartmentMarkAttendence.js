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
import moment from "moment";
import staffStyle from "./StaffAttendencMark.module.css";
import UserStaffSideBar from "../UserStaffSideBar";
import InstituteRoleTab from '../InstituteRoleTab'
import StaffSelectInstituteRole from '../StaffSelectInstituteRole'

const StaffDepartmentMarkAttendence = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [staffIns, setStaffIns] = useState("");
  const [date, setDate] = useState(new Date());
  const [staffAttendDates, setStaffAttendDates] = useState("");
  const [staffAttendRegs, setStaffAttendRegs] = useState("");

  const [departmentData, setDepartmentData] = useState("");
  const [batchData, setBatchData] = useState([]);
  const [batchClassData, setBatchClassData] = useState([]);
  const [present, setPresent] = useState(false);
  const [absent, setAbsent] = useState(false);
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
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  useEffect(() => {
    axios
      .post(`${requestURL}/department/${params.did}/staff/attendence`, {
        staffAttendDate: `${date.getFullYear()}-${
          date.getMonth() >= 10
            ? `${date.getMonth() + 1}`
            : `0${date.getMonth() + 1}-${date.getDate()}`
        }`,
        staffAttendTime: `${date.getHours()}:${date.getMinutes()}`,
      })
      .then((res) => {
        console.log(res);
        setStaffAttendDates(res.data.staffAttendDate);
        setStaffAttendRegs(res.data.staffAttendReg);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);

  const StaffPresentHandler = (id) => {
    axios
      .post(
        `${requestURL}/staff/${id}/attendence/${staffAttendDates._id}/present/${staffAttendRegs._id}`,
        {
          status: "present",
        }
      )
      .then((res) => {
        setAdminMsg({ showMessages: true, msg: res.data.message });
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const StaffAbsentHandler = (id) => {
    axios
      .post(
        `${requestURL}/staff/${id}/attendence/${staffAttendDates._id}/absent/${staffAttendRegs._id}`,
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
                          <img src="/images/catalog-icon.svg" alt="Register" />
                            <p className={styles.ttext}> &nbsp; Register </p>
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
                            <p className={styles.ttext}> &nbsp; Attendance </p>
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
                            <p className={styles.ttext}>
                              {" "}
                              &nbsp; Attendance Setting{" "}
                            </p>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-12 col-md-6 mt-4">
                      <input
                        type="text"
                        className="form-control"
                        value={
                          staffAttendDates
                            ? moment(staffAttendDates.staffAttendDate).format(
                                "DD-MM-YYYY"
                              )
                            : ""
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <button
                        type="submit"
                        className="btn btn-outline-primary px-5 mx-auto mt-4"
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department/staff/attendence/${params.did}/batch/${params.bid}`
                          )
                        }
                      >
                        Previous Attendence
                      </button>
                    </div>
                  </div>
                  <p className={`${styles.dlogoText} mt-5`}>All Staffs</p>
                  <div className="attendenceSheet">
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
                                        setAbsent(true);
                                        setPresent(false);
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

export default StaffDepartmentMarkAttendence;