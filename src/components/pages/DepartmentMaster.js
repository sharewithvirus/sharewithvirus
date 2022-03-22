import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import AboutSection from "../AboutSection";
import InstituteSidebar from "../InstituteSidebar";
import ProfileDisplaySection from "../ProfileDiaplaySection";
import NewDetailsBar from "../NewDetailsBar";
import InstituteStatsSection from "../InstituteStatsSection";
// import BackButton from "../BackButton";
import axios from "axios";
import { requestURL } from "../ReqUrl";

const CreateDepartment = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [createdepartmentData, setCreateDepartmentData] = useState([]);
  const [subjectMasterList, setsubjectMasterList] = useState("");
  const [classMasterList, setclassMasterList] = useState("");
  const [dBatchData, setDBatchData] = useState("");

  useEffect(() => {
    axios
      .get(`${requestURL}/ins/${params.id}/departmentmasterclass/${params.did}`)
      .then((res) => {
        const classM = res.data.classMaster;
        setclassMasterList(classM);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(
        `${requestURL}/ins/${params.id}/departmentmastersubject/${params.did}`
      )
      .then((res) => {
        const subM = res.data.subjectMaster;
        setsubjectMasterList(subM);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/department/${params.did}`)
      .then((res) => {
        const depart = res.data.department;
        setCreateDepartmentData(depart);
        // setCreateDepartmentStaffData(res.data.department.dHead);
        setDBatchData(res.data.department.departmentSelectBatch);
        // setData(false)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  return (
    <>
        <NavbarTopInstitute id={params.id} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection id={params.id} />

                <InstituteSidebar id={params.id} />
                <div className={styles.rightCols}>
                  <InstituteStatsSection />
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection
                    coverPicSrc={"/images/other-places-cover-photo.jpg"}
                    profilePicSrc={"/images/department-avatar.jpeg"}
                  />
                  <NewDetailsBar
                    dData={createdepartmentData}
                    batchData={dBatchData}
                  />
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-3">
                        <div
                          className={`${styles.dTab} ${styles.active} `}
                          onClick={() =>
                            navigate(`/${params.id}/department/${params.did}/`)
                          }
                        >
                          <span>
                            <img src="/images/info-icon.svg" title="Info" />
                          </span>
                        </div>
                      </div>
                      {dBatchData ? (
                        <div className="col-3">
                          <div
                            className={`${styles.dTab} ${styles.active} `}
                            onClick={() =>
                              navigate(
                                `/${params.id}/departmentclass/${params.did}/batch/${dBatchData._id}`
                              )
                            }
                          >
                            <span>
                              <img src="/images/class-icon.svg" title="Class" />
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="col-3">
                          <div className={`${styles.dTab} ${styles.active} `}>
                            <span>
                              <img src="/images/class-icon.svg" title="Class" />{" "}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="col-3">
                        <div
                          className={`${styles.dTab} `}
                          onClick={() =>
                            navigate(
                              `/${params.id}/departmentmaster/${params.did}/batch/${dBatchData._id}`
                            )
                          }
                        >
                          <span>
                            <img src="/images/master-icon.svg" title="Master" />{" "}
                          </span>
                        </div>
                      </div>
                      <div className="col-3">
                        <div
                          className={`${styles.dTab} ${styles.active}`}
                          onClick={() =>
                            navigate(`/${params.id}/currentbatch/${params.did}`)
                          }
                        >
                          <span>
                            <img src="/images/batch-icon.svg" title="Batch" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                    <div
                      className={` ${styles.dlogo} ${styles.cardView}`}
                      onClick={() =>
                        navigate(
                          `/${params.id}/departmentmasterclass/${params.did}/batch/${params.bid}`
                        )
                      }
                    >
                      <img
                        className={styles.dlogoImages}
                        src="/images/logo-classroom.png"
                        alt="Class Icon"
                      />
                      <p className={styles.dlogoText}>Class Masters</p>
                      <p className={styles.dlogoText}>
                        <small>Total Class:- {classMasterList.length}</small>
                      </p>
                    </div>
                    <div
                      className={` ${styles.dlogo} ${styles.cardView}`}
                      onClick={() =>
                        navigate(
                          `/${params.id}/departmentmastersubject/${params.did}/batch/${params.bid}`
                        )
                      }
                    >
                      <img
                        className={styles.dlogoImages}
                        src="/images/logo-book.png"
                        alt="Subject Icon"
                      />
                      <p className={styles.dlogoText}>Subject Masters</p>
                      <p className={styles.dlogoText}>
                        <small>
                          Total Subjects:- {subjectMasterList.length}
                        </small>
                      </p>
                    </div>
                  </div>
                  {/* <NewDepartment
                //   trigger={department}
                //   setTrigger={setDepartment}
                  id={params.id}
                /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <NavbarBottomInstitute id={params.id} />
    </>
  );
};

export default CreateDepartment;
