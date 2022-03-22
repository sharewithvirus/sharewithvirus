import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";

import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserStaffAboutSection from "../UserStaffAboutSection";
import moment from "moment";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";

const StaffDepartmentFeeHistory = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [staffIns, setStaffIns] = useState("");

  const [departmentData, setDepartmentData] = useState("");
  const [batchData, setBatchData] = useState([]);
  const [feeText, setFeeText] = useState([]);
  const [dBatchData, setDBatchData] = useState("");
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
        const check = res.data.department.fees;
        setDepartmentData(ddata);
        setBatchData(bData);
        setFeeText(check);
        setDBatchData(res.data.department.userBatch);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  function handleChange(value) {
    navigate(`/${value}`);
  }

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
                <div className={styles.insTitle}>
                  <h3>{departmentData.dName} Department</h3>
                </div>
                <div className={`${styles.outer2} mt-4`}>
                  <h4 className="my-3">Activity</h4>
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row">
                      <div
                        className={`${styles.dhTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department/functions/${params.did}/batch/${dBatchData._id}`
                          )
                        }
                      >
                        <span>
                          <img
                            src="/images/examination-icon.svg"
                            title="Examination"
                          />{" "}
                          &nbsp; Examination
                        </span>
                      </div>
                      <div
                        className={`${styles.dhTab} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department/checklist/${params.did}/batch/${dBatchData._id}`
                          )
                        }
                      >
                        <span>
                          <img
                            src="/images/checklist-icon.svg"
                            title="Checklist"
                          />{" "}
                          &nbsp; Checklist
                        </span>
                      </div>
                      <div
                        className={`${styles.dhTab} ${styles.active} my-2`}
                        // onClick={() =>
                        //   navigate(
                        //     `/user/${params.id}/staff/${params.sid}/department/fee/${params.did}/batch/${dBatchData._id}`
                        //   )
                        // }
                      >
                        <span>
                          <img src="/images/finance-icon.svg" title="Finance" />{" "}
                          &nbsp; Fee History
                        </span>
                      </div>
                      <div
                        className={`${styles.dhTab} ${styles.active} my-2`}
                        // onClick={() => navigate("/departmentholidays")}
                      >
                        <span>
                          <img
                            src="/images/s-attendence-icon.svg"
                            title="Attendence"
                          />{" "}
                          &nbsp; Holidays
                        </span>
                      </div>
                    </div>
                    {/* <div className=" col-12 my-5 d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn btn-outline-primary justify-content-center col-4 px-3"
                        onClick={() => navigate("/departmentnewexam")}
                      >
                        Create New
                      </button>
                    </div> */}
                    <hr />
                    <div className="row mt-5">
                      {feeText &&
                        feeText.map((ct) => (
                          <div className="col-12 col-md-6 mb-2">
                            <div
                              className={` ${styles.dlogo} ${styles.cardView}`}
                              // onClick={() => navigate("/studentattendence")}
                            >
                              <p className={styles.dlogoText}>
                                <img
                                  className={styles.dlogoImages}
                                  src="/images/icon-examcolor.svg"
                                  alt="examcolor"
                                />
                                <br />
                                <small>{ct.feeName}</small>
                                <br />
                                <small>
                                  {" "}
                                  Due Date - 
                                  {moment(ct.createdAt).format("DD-MM-YYYY")}
                                </small>
                              </p>
                            </div>
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
      <NavbarBottomUser uid={params.id} />
    </>
  );
};

export default StaffDepartmentFeeHistory;
