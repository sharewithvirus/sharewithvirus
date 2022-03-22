import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import AboutSection from "../AboutSection";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import LeaveRqst from "../LeaveRqst";
import TransferRqst from '../TransferRqst'
// import BackButton from "../BackButton";
import axios from "axios";
import { requestURL } from "../ReqUrl";
// import { Success, Danger } from "../SnackBar";
const StaffLeaveAndTransfer = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [staffLeaveData, setStaffLeaveData] = useState([]);
  const [staffData, setStaffData] = useState([])
  const [staffTransferData, setStaffTransferData] = useState([])
  const [insData, setInsData] = useState("");
  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => {
        setStaffLeaveData(res.data.institute.leave);
        setStaffTransferData(res.data.institute.transfer)
        setInsData(res.data.institute);
        setStaffData(res.data.institute.ApproveStaff)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, [staffLeaveData]);
  // }, [insData]);

  const StaffApproveHandler = (id) => {
    axios
      .post(`${requestURL}/ins/${params.id}/staff/approve/${id}`, {
        status: "Approved",
      })
      .then((res) => {
        // setAdminMsg({ showMessages: true, msg: res.data.message });
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  return (
    <>
      {/* {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null} */}
      <div className={styles.mainScreen}>
        <NavbarTopInstitute id={params.id} />
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection id={params.id} />
                <div className={`${styles.about} ${styles.leftMenu}`}>
                  <div
                    className={`mt-5 ${styles.dabout} ${styles.active}`}
                    onClick={() => navigate(`/allstaff/${params.id}`)}
                  >
                    <img
                      src="/images/staff-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Staff"
                    />{" "}
                    Staff
                  </div>
                  <div
                    className={`${styles.dabout} mt-3 mb-2`}
                    onClick={() => navigate(`/allstudent/${params.id}`)}
                  >
                    <img
                      src="/images/student-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Student"
                    />{" "}
                    Students
                  </div>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={` ${styles.outer2}`}>
                  <form className="row">
                    <h4>
                      Staff Request
                      <span
                        className={styles.staffForm}
                        onClick={() => navigate(`/staffform/${params.id}`)}
                      >
                        <img
                          src="/images/s-three-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Menu"
                        />
                      </span>
                    </h4>
                    <div className={`mb-5 ${styles.ddetail}`}>
                      <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                        <div className="col-12 col-md-4">
                          <div className={`${styles.dTab}`}
                             onClick={() => navigate(`/staffrequest/${params.id}`)}
                          >
                            <span>
                              <img
                                src="/images/s-request-icon.svg"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Requests"
                              />{" "}
                              Requests
                            </span>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div
                            className={`${styles.dTab} ${styles.active}`}
                            onClick={() => navigate(`/allstaff/${params.id}`)}
                          >
                            <span>
                              <img
                                src="/images/staff-icon.svg"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Staff"
                              />{" "}
                              Staff
                            </span>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div
                            className={`${styles.dTab} ${styles.active}`}
                          >
                            <span>
                              <img
                                src="/images/s-attendence-icon.svg"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Attendence"
                              />{" "}
                              Leaves & Transfer
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row d-flex justify-content-between align-items-center mb-4">
                      <div
                        className={`col-6 col-xl-3 ${styles.barInnersLeft} ${styles.countSection}`}
                      >
                        <p>{staffLeaveData.length + staffTransferData.length}</p>
                        <p>Action Pending</p>
                      </div>
                    </div>
                    {staffLeaveData && (
                      <LeaveRqst
                        reqData={staffLeaveData}
                        name="Staff Name"
                        // imgSrc="/images/image-staff.png"
                        id={params.id}
                      />
                    )}
                    {
                        staffTransferData ? 
                        <TransferRqst 
                        reqData={staffTransferData}
                        staffDataList={staffData ? staffData : ''}
                        name="Staff Name"
                        // imgSrc="/images/image-staff.png"
                        id={params.id}
                        />
                        : ''
                    }
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomInstitute id={params.id} />
      </div>
    </>
  );
};

export default StaffLeaveAndTransfer;
