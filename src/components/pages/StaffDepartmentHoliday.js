import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import DCalendar from "../DCalendar";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserStaffAboutSection from "../UserStaffAboutSection";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";
const StaffDepartmentHoliday = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [staffIns, setStaffIns] = useState("");
  const [dBatchData, setDBatchData] = useState("");

  const [departmentData, setDepartmentData] = useState("");

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
        setDepartmentData(ddata);
        setDBatchData(res.data.department.userBatch);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/batch-detail/${params.bid}`)
      .then((res) => {
        const bClass = res.data.batch.classroom;
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
                          <p className={styles.ttext}>  &nbsp; Examination </p>
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
                          <p className={styles.ttext}>  &nbsp; Checklist </p>
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
                      <div className={`${styles.dTab} my-2`}>
                        <span>
                        <img src="/images/s-attendence-icon.svg" title="Attendence" />{" "}
                          <p className={styles.ttext}>&nbsp; Holidays </p>
                        </span>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-auto">
                <DCalendar
                  departId={params.did}
                  userId={params.id}
                  staffId={params.sid}
                  batchId={params.bid}
                />
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

export default StaffDepartmentHoliday;
