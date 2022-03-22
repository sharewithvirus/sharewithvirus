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
import NewClass from "./NewClass";
import Ccard from "../Ccard";
// import BackButton from "../BackButton";
import InstituteStatsSection from "../InstituteStatsSection";
import axios from "axios";
import { requestURL } from "../ReqUrl";

const DepartmentsNewBatch = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [addClass, setAddClass] = useState(false);

  const [departmentClassData, setDepartmentClassData] = useState([]);
  const [batchClassData, setBatchClassData] = useState([]);
  const [dBatchData, setDBatchData] = useState("");
  const [data, setData] = useState(true);

  useEffect(() => {
    if (data) {
      axios
        .get(`${requestURL}/batch/class/${params.bid}`)
        .then((res) => {
          setBatchClassData(res.data.batch.classroom);
        })
        .catch((e) => {
          console.log("Something Went Wrong");
        });
      axios
        .get(`${requestURL}/department/${params.did}`)
        .then((res) => {
          setDepartmentClassData(res.data.department);
          setDBatchData(res.data.department.departmentSelectBatch);
          setData(false);
        })
        .catch((e) => {
          console.log("Something Went Wrong");
        });
    }
  }, []);
  // }, [data]);

  const setAddClassFunction = () => {
    setAddClass(false);
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
                >
                  <ProfileDisplaySection
                    coverPicSrc={"/images/other-places-cover-photo.jpg"}
                    profilePicSrc={"/images/department-avatar.jpeg"}
                  />
                  <NewDetailsBar
                    dData={departmentClassData}
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

                      <div className="col-3">
                        <div className={`${styles.dTab}`}>
                          <span>
                            <img src="/images/class-icon.svg" title="Class" />
                          </span>
                        </div>
                      </div>
                      <div className="col-3">
                        <div
                          className={`${styles.dTab} ${styles.active} `}
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
                      <div className="col-6 col-lg-8  mb-2">
                        <input
                          type="text"
                          className="form-control"
                          id="firstname"
                          placeholder="Search Classrooms..."
                        />
                      </div>
                      <div className="mb-3 col col-6 col-lg-4 d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-outline-primary "
                          onClick={() => {
                            setAddClass(true);
                          }}
                        >
                          <i class="far fa-plus-square mt-1 mx-2"></i> Add Class
                        </button>
                      </div>
                    </div>
                    <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                      <Ccard classData={batchClassData} />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <NewClass
              setAddClassFunction={setAddClassFunction}
              trigger={addClass}
              setTrigger={setAddClass}
            />
          </div>
        </div>
      </div>
      <NavbarBottomInstitute id={params.id} />
    </>
  );
};

export default DepartmentsNewBatch;
