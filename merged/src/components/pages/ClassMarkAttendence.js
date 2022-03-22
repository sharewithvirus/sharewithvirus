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
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import moment from "moment";
import staffStyle from "./StaffAttendencMark.module.css";

const ClassMarkAttendence = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [catalogIns, setCatalogIns] = useState("");
  const [classData, setClassData] = useState("");
  const [catalogStudent, setCatalogStudent] = useState([]);
  const [cAttendDate, setCAttendDates] = useState("");
  const [cAttendReg, setCAttendRegs] = useState("");
  const [date, setDate] = useState(new Date());
  const [present, setPresent] = useState(false);
  const [absent, setAbsent] = useState(false);

  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  useEffect(() => {
    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        const institute = res.data.staff.institute;
        setCatalogIns(institute);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/staffclass/${params.cid}`)
      .then((res) => {
        const Cdata = res.data.classes;
        const studentData = res.data.classes.ApproveStudent;
        setClassData(Cdata);
        setCatalogStudent(studentData);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  useEffect(() => {
    axios
      .post(`${requestURL}/class/${params.cid}/student/attendence`, {
        attendDate: `${date.getFullYear()}-${
          date.getMonth() >= 10
            ? `${date.getMonth() + 1}`
            : `0${date.getMonth() + 1}-${date.getDate()}`
        }`,
        attendTime: `${date.getHours()}:${date.getMinutes()}`,
      })
      .then((res) => {
        setCAttendDates(res.data.attendDate);
        setCAttendRegs(res.data.attendReg);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);

  const [studentText, setStudentText] = useState("");

  const StudentStatusHandler = (id) => {
    axios
      .post(`${requestURL}/student/status`, {
        studentId: id,
      })
      .then((res) => {
        setStudentText(res.data.student);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const PresentHandler = (id) => {
    axios
      .post(
        `${requestURL}/student/${id}/attendence/${cAttendDate._id}/present/${cAttendReg._id}`,
        {
          status: "present",
        }
      )
      .then((res) => {
        setAdminMsg({ showMessages: true, msg: res.data.message });
        // console.log(res);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const AbsentHandler = (id) => {
    axios
      .post(
        `${requestURL}/student/${id}/attendence/${cAttendDate._id}/absent/${cAttendReg._id}`,
        {
          status: "absent",
        }
      )
      .then((res) => {
        setAdminMsg({ showMessages: true, msg: res.data.message });
        // console.log(res);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  return (
    <>
      <NavbarTopUser uid={params.id} />
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
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
                  <h3>{classData.className} Class Catalog</h3>
                </div>
                <div className={`${styles.outer2} mt-4`}>
                  {/* <h4 className="my-3">Class Catalog</h4> */}
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-2">
                        <div
                          className={`${styles.dTab} ${styles.active} my-2`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/class/catalog/${params.cid}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/catalog-icon.svg" alt="Register" />
                            <p className={styles.ttext}> &nbsp; Catalog </p>
                          </span>
                        </div>
                      </div>
                      <div className="col-2">
                        <div
                          className={`${styles.dTab} my-2`}
                          // onClick={() =>
                          //   navigate(
                          //     `/user/${params.id}/staff/${params.sid}/class/mark/attendence/${params.cid}`
                          //   )
                          // }
                        >
                          <span>
                          <img src="/images/s-attendence-icon.svg" title="Attendence"/> 
                            <p className={styles.ttext}> &nbsp; Attendence </p>
                          </span>
                        </div>
                      </div>
                      <div className="col-2">
                        <div
                          className={`${styles.dTab} ${styles.active} my-2`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/class/fee/${params.cid}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/finance-icon.svg" title="Finance"/> 
                            <p className={styles.ttext}> &nbsp; Fee </p>
                          </span>
                        </div>
                      </div>
                      <div className="col-2">
                        <div
                          className={`${styles.dTab} ${styles.active} my-2`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/class/behaviour/${params.cid}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/behaviour-icon.svg" title="Behaviour"/>
                            <p className={styles.ttext}> &nbsp; Behaviour </p>
                          </span>
                        </div>
                      </div>
                      <div className="col-2">
                        <div
                          className={`${styles.dTab} ${styles.active} my-2`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/class/finalreport/${params.cid}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/final-report-icon.svg" title="Final Report"/>
                            <p className={styles.ttext}>
                              {" "}
                              &nbsp; Final Report{" "}
                            </p>
                          </span>
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
                            cAttendDate
                              ? moment(cAttendDate.attendDate).format(
                                  "DD-MM-YYYY"
                                )
                              : ""
                          }
                          disabled
                          readOnly
                        />
                      </div>
                      <div className="col-12 col-md-6">
                      <div id="btnGroup" className="btn-group col-xl-3 col-lg-4 col-md-6 mx-auto" role="group"
                        >
                          <button type="button" class={`btn btn-primary px-5`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/class/leave-transfer/${params.cid}`
                            )
                          }
                          >
                            Leave
                          </button>
                          <button type="button" class={`btn btn-secondary px-5`}
                            onClick={() =>
                              navigate(
                                `/user/${params.id}/staff/${params.sid}/class/attendence/${params.cid}`
                              )
                            }
                          >
                            Previous Attendence
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className={`${styles.dlogoText} mt-5`}>All Students</p>

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
                                  `/user/${params.id}/staff/${params.sid}/class/attendence/history/${params.cid}`
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
                                <th>Student Name</th>
                                <th>Marked Present</th>
                                <th>Marked Absent</th>
                              </tr>
                            </thead>

                            <tbody>
                              {catalogStudent.map((ct, index) => (
                                <tr
                                  key={ct.studentGRNO}
                                  className={
                                    (index + 1) % 2 === "0"
                                      ? staffStyle.activeRow
                                      : staffStyle.rowHight
                                  }
                                >
                                  <td>{ct.studentGRNO}</td>
                                  <td>
                                    {" "}
                                    {`${ct.studentFirstName} ${
                                      ct.studentMiddleName
                                        ? ct.studentMiddleName
                                        : ""
                                    } ${ct.studentLastName}`}
                                  </td>
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
                                        PresentHandler(ct._id);
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
                                        AbsentHandler(ct._id);
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

export default ClassMarkAttendence;