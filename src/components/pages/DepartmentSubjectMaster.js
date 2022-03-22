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
// import MCcard from "../MCcard";
import NewSection from "./NewMasterSubject";

const CreateSubjectMaster = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [createdepartmentData, setCreateDepartmentData] = useState([]);
  // const [createdepartmentStaffData, setCreateDepartmentStaffData] = useState("");
  const [addMasterSubject, setaddMasterSubject] = useState(false);
  const [subjectMasterList, setSubjectMasterList] = useState("");
  const [dBatchData, setDBatchData] = useState("");
  const [data, setData] = useState(true);

  useEffect(() => {
    if (data) {
      axios
        .get(
          `${requestURL}/ins/${params.id}/departmentmastersubject/${params.did}`
        )
        .then((res) => {
          const subjectM = res.data.subjectMaster;
          setSubjectMasterList(subjectM);
          setData(false);
        })
        .catch((e) => {
          console.log("Something Went Wrong");
        });
    }

    if (data) {
      axios
        .get(`${requestURL}/department/${params.did}`)
        .then((res) => {
          const depart = res.data.department;
          setCreateDepartmentData(depart);
          // setCreateDepartmentStaffData(res.data.department.dHead);
          setDBatchData(res.data.department.departmentSelectBatch);
          setData(false);
        })
        .catch((e) => {
          console.log("Something Went Wrong");
        });
    }
  }, [data]);

  const setMasterSubjectFunction = () => {
    setaddMasterSubject(false);
    setData(true);
  };

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
                  // style={{height: '100%'}}
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

                  <form className="row mt-0">
                    <div className="row d-flex justify-content-between">
                      <div className="mx-1 col-12 col-lg-8 col-xl-6  mb-2">
                        <input
                          type="text"
                          className="form-control"
                          id="firstname"
                          placeholder="Search Classrooms..."
                        />
                      </div>
                      <div className=" mb-3 col col-12 col-lg-4 col-xl-4 d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-outline-primary "
                          onClick={() => {
                            setaddMasterSubject(true);
                          }}
                        >
                          <i class="far fa-plus-square mt-1 mx-2"></i> Add
                          Subject Master
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className={` mt-5 ${styles.cardContainer} `}>
                    {subjectMasterList &&
                      subjectMasterList.map((ct) => (
                        <div className={` ${styles.dlogo} ${styles.cardView}`}>
                          <img
                            className={styles.dlogoImages}
                            src="/images/logo-book.png"
                            alt="Subject Master"
                          />
                          <p className={styles.dlogoText}>
                            <small>
                              {ct.subjectName ? `${ct.subjectName} Master` : ""}
                            </small>
                            <p>
                              {" "}
                              <small>{`${ct.subjects.length} - Subjects`}</small>
                            </p>
                          </p>
                          {/* <p><small>{`Total Division:-${ct.classDivision}`}</small></p> */}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <NewSection
              setMasterSubjectFunction={setMasterSubjectFunction}
              trigger={addMasterSubject}
              setTrigger={setaddMasterSubject}
            />
          </div>
        </div>

      </div>
        <NavbarBottomInstitute id={params.id} />
    </>
  );
};

export default CreateSubjectMaster;
