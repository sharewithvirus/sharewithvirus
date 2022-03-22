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
import InstituteRoleTab from "../InstituteRoleTab";
const StaffDepartmentChecklist = () => {
  const navigate = useNavigate();

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
        // setUserStaffMemberData(userstaff);
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

  const [checklistText, setChecklistText] = useState({
    ClassId: "",
    checklistFees: "",
    checklistName: "",
    checklistAmount: "",
  });

  const ChecklistHandler = (e) => {
    const { name, value } = e.target;
    setChecklistText({
      ...checklistText,
      [name]: value,
    });
  };
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

  const ChecklistHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(
        `${requestURL}/department-class/checklist/${params.did}`,
        checklistText
      )
      .then((res) => {
        setAdminMsg({ showMessages: true, msg: res.data.message });
        navigate(
          `/user/${params.id}/staff/${params.sid}/department/checklist/history/${params.did}/batch/${dBatchData._id}`
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
                      <div className={`${styles.dTab} my-2`}>
                        <span>
                        <img src="/images/checklist-icon.svg" title="Checklist" />{" "}
                          <p className={styles.ttext}> &nbsp; Checklist </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-3">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department/fee/${params.did}/batch/${dBatchData._id}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/finance-icon.svg" title="Finance" />{" "}
                          <p className={styles.ttext}>  &nbsp; Fees </p>
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

                    <form className="mt-5" onSubmit={ChecklistHandlerChange}>
                      <div className="row d-flex justify-content-between align-items-center mb-4">
                        <div className="col-12 col-md-6 mb-4">
                          <label htmlFor="dhead" className="form-group mb-1">Select Classes
                          <span className="text-danger mx-1" style={{fontSize: 'large'}}>*</span>
                          </label>
                          <select
                            name="ClassId"
                            className="form-control"
                            id="dhead"
                            onChange={ChecklistHandler}
                            required
                          >
                            <option value="Select Classes" selected disabled>
                              Select Classes
                            </option>
                            {batchClassData &&
                              batchClassData.map((st) => (
                                <option value={st._id}>{st.className}</option>
                              ))}
                          </select>
                        </div>
                        <div className="col-12 col-md-6 mb-4">
                          <label htmlFor="dname" className="form-group mb-1">Select Fees
                          <span className="text-danger mx-1" style={{fontSize: 'large'}}>*</span>
                          </label>
                          <select
                            name="checklistFees"
                            className="form-control"
                            id="fee"
                            onChange={ChecklistHandler}
                            required
                          >
                            <option value="Select Fees" selected disabled>Select Fees</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        <div className="col-12 col-md-6 mb-4">
                          <label htmlFor="dabout" className="form-group mb-1">Checklist Name
                          <span className="text-danger mx-1" style={{fontSize: 'large'}}>*</span>
                          </label>
                          <input
                            type="text"
                            name="checklistName"
                            className="form-control"
                            id="dabout"
                            placeholder="Enter Checklist Name"
                            onChange={ChecklistHandler}
                            required
                          />
                        </div>
                        <div className="col-12 col-md-6 mb-4">
                          <label htmlFor="demail" className="form-group mb-1">Checklist Amount
                          <span className="text-danger mx-1" style={{fontSize: 'large'}}>*</span>
                          </label>
                          <input
                            type="tel"
                            name="checklistAmount"
                            className="form-control"
                            id="demail"
                            placeholder="Enter Checklist Amount"
                            onChange={ChecklistHandler}
                            required
                          />
                        </div>
                        <div className="col-12 col-md-6 mb-2">
                          {departmentData.ApproveStudent && departmentData.ApproveStudent.length >=1 ?
                          <button
                            type="submit"
                            className="btn btn-outline-primary my-4 px-5 mx-auto"
                          >
                            Add Checklist
                          </button>
                          : 
                          <button
                            type="submit"
                            className="btn btn-outline-primary my-4 px-5 mx-auto"
                            disabled
                          >
                            Add Checklist
                          </button>
                          }
                        </div>
                        <div className="col-12 col-md-6 mb-2">
                          <button
                            type="button"
                            className="btn btn-outline-secondary my-4 px-5 mx-auto"
                            onClick={() =>
                              navigate(
                                `/user/${params.id}/staff/${params.sid}/department/checklist/history/${params.did}/batch/${dBatchData._id}`
                              )
                            }
                          >
                            Checklist History
                          </button>
                        </div>
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

export default StaffDepartmentChecklist;
