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
import { Success } from "../SnackBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";
const StaffDepartmentFees = () => {
  const navigate = useNavigate();
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  const params = useParams();
  const [staffIns, setStaffIns] = useState("");
  const [dBatchData, setDBatchData] = useState("");

  const [departmentData, setDepartmentData] = useState("");
  const [batchData, setBatchData] = useState([]);
  const [batchClassData, setBatchClassData] = useState([]);

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
        // setStaffDesignation(dStaff);
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
        setDBatchData(res.data.department.userBatch);
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

  const [feesText, setFeesText] = useState({
    ClassId: "",
    feeName: "",
    feeAmount: "",
    feeDate: "",
  });

  const FeesHandler = (e) => {
    const { name, value } = e.target;
    setFeesText({
      ...feesText,
      [name]: value,
    });
  };

  const FeesHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/department-class/fee/${params.did}`, feesText)
      .then((res) => {
        setAdminMsg({ showMessages: true, msg: res.data.message });
        navigate(
          `/user/${params.id}/staff/${params.sid}/department/fee/history/${params.did}/batch/${dBatchData._id}`
        )
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
                  <h4 className="my-3">Activity</h4>
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                    <div className="col-3">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department/functions/${params.did}/batch/${dBatchData._id}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/examination-icon.svg" title="Examination" />{" "}
                          <p className={styles.ttext}> &nbsp; Examination </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-3">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department/checklist/${params.did}/batch/${dBatchData._id}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/checklist-icon.svg" title="Checklist" />{" "}
                          <p className={styles.ttext}>&nbsp; Checklist</p>
                        </span>
                      </div>
                      </div>
                      <div className="col-3">
                      <div className={`${styles.dTab} my-2`}>
                        <span>
                        <img src="/images/finance-icon.svg" title="Finance" />{" "}
                          <p className={styles.ttext}> &nbsp; Fees </p>
                        </span>
                      </div>
                      </div>
                      
                      <div className="col-3">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department/holiday/${params.did}/batch/${dBatchData._id}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/s-attendence-icon.svg" title="Attendence" />{" "}
                          <p className={styles.ttext}>  &nbsp; Holidays </p>
                        </span>
                      </div>
                      </div>
                    </div>

                    <form className="row mt-5" onSubmit={FeesHandlerChange}>
                      <div className="col-12 col-md-6 mb-4">
                        <label for="dhead" className="form-group mb-1">
                          Select Classes
                          <span className="text-danger mx-1" style={{fontSize: 'large'}}>*</span>
                        </label>
                        <select
                          name="ClassId"
                          className="form-control"
                          id="dhead"
                          onChange={FeesHandler}
                          required
                        >
                          <option value="Select Classes" selected disabled>Select Classes</option>
                          {batchClassData &&
                            batchClassData.map((st) => (
                              <option value={st._id}>{st.className}</option>
                            ))}
                        </select>
                      </div>
                      <div className="col-12 col-md-6 mb-4">
                        <label for="dname" className="form-group mb-1">
                          Name / Purpose
                          <span className="text-danger mx-1" style={{fontSize: 'large'}}>*</span>
                        </label>
                        <input
                          type="text"
                          name="feeName"
                          className="form-control"
                          id="dname"
                          placeholder="Enter Name / Purpose"
                          onChange={FeesHandler}
                          required
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-4">
                        <label for="dabout" className="form-group mb-1">
                          Amount (in Rs.)
                          <span className="text-danger mx-1" style={{fontSize: 'large'}}>*</span>
                        </label>
                        <input
                          type="tel"
                          name="feeAmount"
                          className="form-control"
                          id="dabout"
                          placeholder="Enter Amount"
                          onChange={FeesHandler}
                          required
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-4">
                        <label for="demail" className="form-group mb-1">
                          Due Date / Last Date
                          <span className="text-danger mx-1" style={{fontSize: 'large'}}>*</span>
                        </label>
                        <input
                          type="date"
                          name="feeDate"
                          className="form-control"
                          id="demail"
                          placeholder="Enter Last Date"
                          onChange={FeesHandler}
                          required
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        {departmentData.ApproveStudent && departmentData.ApproveStudent.length >=1 ?
                        <button
                          type="submit"
                          className="btn btn-outline-primary my-4 px-5 mx-auto"
                        >
                          Add Fee
                        </button>
                        : 
                        <button
                          type="submit"
                          className="btn btn-outline-primary my-4 px-5 mx-auto"
                          disabled
                        >
                          Add Fee
                        </button>
                        }
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                          <button
                            type="button"
                            className="btn btn-outline-secondary my-4 px-5 mx-auto"
                            onClick={() =>
                              navigate(
                                `/user/${params.id}/staff/${params.sid}/department/fee/history/${params.did}/batch/${dBatchData._id}`
                              )
                            }
                          >
                            Fee History
                          </button>
                        </div>
                    </form>
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

export default StaffDepartmentFees;
