import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import AboutSection from "../AboutSection";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import BackButton from "../BackButton";
import axios from 'axios'

const Certificates = () => {
  const navigate = useNavigate();
  const params = useParams()
  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopInstitute id={params.id}/>
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
              <AboutSection id={params.id}/>
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
                      Students
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
                        <div
                          className={`${styles.dTab} ${styles.active}`}
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
                        <div className={`${styles.dTab} `}>
                        <span>
                          <img
                          src="/images/s-certificate-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Certificate"
                        /> Certificates
                          </span>
                        </div>
                        </div>
                      <div className="col-12 col-md-3"> 
                        <div
                          className={`${styles.dTab} ${styles.active} `}
                          onClick={() => navigate(`/studentcomplaints/${params.id}`)}
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
                    <div className="row d-flex justify-content-center">
                      <div className=" mt-4 col-11 col-md-9 col-lg-8 mb-2">
                        <div
                          className={`${styles.dCert}`}
                          onClick={() => navigate(`/certificatesdetail/${params.id}`)}
                        >
                          <p>
                          <img
                          src="/images/s-certificate-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Certificate"
                        /> Bonafide Certificates
                          </p>
                        </div>
                      </div>
                      <div className=" mt-4 col-11 col-md-9 col-lg-8 mb-2">
                        <div className={`${styles.dCert}`}
                        onClick={() => navigate(`/leaving/certificate/${params.id}`)}
                        >
                          <p>
                          <img
                          src="/images/s-certificate-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Certificate"
                        /> School Leaving Certificates
                          </p>
                        </div>
                      </div>
                      {/* <div className="col-11 col-md-9 col-lg-8 mb-2">
                        <div className={`${styles.dCert}`}>
                          <p>
                            <img
                              src="/images/icon-certificate2.svg"
                              alt="file"
                            />
                            &nbsp; Transfer Certificates
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomInstitute id={params.id}/>
      </div>
    </>
  );
};

export default Certificates;
