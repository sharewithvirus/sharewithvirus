import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import AboutSection from "../AboutSection";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import StaffCard from "../StaffCard";
import { requestURL } from "../ReqUrl";
import axios from "axios";

const AllStaff = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [allStaffData, setAllStaffData] = useState("");
  const [allStaffApprove, setAllStaffApprove] = useState([]);
  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => {
        setAllStaffData(res.data.institute);
        setAllStaffApprove(res.data.institute.ApproveStaff);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopInstitute id={params.id} />
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection id={params.id} />
                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <div
                    className={`mt-5 ${styles.dabout} ${styles.active}`}
                    onClick={() => navigate(`/allstaff/${params.id}`)}
                  >
                    <img
                    src="/images/staff-icon.svg"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Staff"
                  /> Staff
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
                  /> Students
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
                      All Staff
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
                        <div
                          className={`${styles.dTab} ${styles.active}`}
                          onClick={() => navigate(`/staffrequest/${params.id}`)}
                        >
                          <span>
                          <img
                            src="/images/s-request-icon.svg"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Requests"
                          /> Requests
                          </span>
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div className={`${styles.dTab} `}>
                          <span>
                          <img
                            src="/images/staff-icon.svg"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Staff"
                          /> Staff
                          </span>
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div
                          className={`${styles.dTab} ${styles.active}`}
                          onClick={() => navigate(`/staffattendencecopy/${params.id}`)}
                        >
                          <span>
                          <img
                            src="/images/s-attendence-icon.svg"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Attendence"
                          /> 
                           Leaves & Transfer
                          </span>
                        </div>
                        </div>
                      </div>
                    </div>

                    <div className="row d-flex justify-content-between align-items-center mb-4">
                      <div
                        className={`col-4 col-lg-3 ${styles.barInnersLeft} ${styles.countSection}`}
                      >
                        <p>{allStaffApprove.length}</p>
                        <p>Action Approved</p>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          name="search"
                          className="form-control"
                          placeholder="search staff here"
                        />
                      </div>
                    </div>

                    <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                      {allStaffApprove && (
                        <StaffCard
                          approveData={allStaffApprove}
                          id={params.id}
                        />
                      )}
                    </div>
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

export default AllStaff;
