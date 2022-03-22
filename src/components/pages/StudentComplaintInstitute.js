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
import ComplaintRqst from '../ComplaintRqst'
// import { Success, Danger } from "../SnackBar";
const StudentComplaintInstitute = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [complaintData, setComplaintData] = useState([]);
  const [insData, setInsData] = useState("");

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => {
        setComplaintData(res.data.institute.studentComplaints);
        setInsData(res.data.institute);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, [complaintData]);
  // }, [insData]);

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
                      All Student
                      <span
                        className={styles.staffForm}
                        onClick={() => navigate(`/studentform/${params.id}`)}
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
                      <div className="col-12 col-md-3">                        
                      <div className={`${styles.dTab}`}
                      onClick={() => navigate(`/allstudent/${params.id}`)}
                      >
                          <span>
                          <img
                          src="/images/student-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Student"
                        /> Students
                          </span>
                        </div>
                        </div>
                      <div className="col-12 col-md-3">
                        <div
                          className={`${styles.dTab} ${styles.active}`}
                          onClick={() =>
                            navigate(`/studentcertificates/${params.id}`)
                          }
                        >
                          <span>
                          <img
                          src="/images/s-certificate-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Certificate"
                        /> Certificate
                          </span>
                        </div>
                        </div>
                      <div className="col-12 col-md-3">
                        <div
                          className={`${styles.dTab} ${styles.active} `}
                        >
                          <span>
                          <img
                          src="/images/s-complaint-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Complaints"
                        /> Complaints
                          </span>
                        </div>
                        </div>
                        <div className="col-12 col-md-3">
                        <div
                          className={`${styles.dTab} ${styles.active} `}
                          onClick={() => navigate(`/ins/${params.id}/student/card`)}
                        >
                          <span>
                          <img
                          src="/images/s-complaint-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Id Card"
                        /> Id Card
                          </span>
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="row d-flex justify-content-between align-items-center mb-4">
                      <div
                        className={`col-4 col-lg-3 ${styles.barInnersLeft} ${styles.countSection}`}
                      >
                        <p>{complaintData.length}</p>
                        <p>Complaint Request</p>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          name="search"
                          className="form-control"
                          placeholder="search complaint"
                        />
                      </div>
                    </div>
                    {complaintData ? 
                    <ComplaintRqst 
                    reqData={complaintData ? complaintData : ''}
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

export default StudentComplaintInstitute;
