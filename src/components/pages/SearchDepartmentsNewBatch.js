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
import BackButton from "../BackButton";
import InstituteStatsSection from "../InstituteStatsSection";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import SearchCcard from "../SearchCcard";

const SearchDepartmentsNewBatch = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [addClass, setaddClass] = useState(false);

  const [departmentClassData, setDepartmentClassData] = useState([]);
  const [batchClassData, setBatchClassData] = useState([]);

  useEffect(() => {
    axios
      .get(`${requestURL}/batch/class/${params.bid}`)
      .then((res) => {
        const batchclass = res.data.batch.classroom;
        setBatchClassData(batchclass);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/department/${params.did}`)
      .then((res) => {
        const dClass = res.data.department;
        setDepartmentClassData(dClass);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);
  // }, [departmentClassData, batchClassData]);

  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopInstitute id={params.sid} />
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
                  <ProfileDisplaySection />
                  <NewDetailsBar dData={departmentClassData} />
                  <div className={`mb-5 ${styles.ddetail}`}>
                  <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-3">
                      <div
                        className={`${styles.dTab} ${styles.active}`}
                        onClick={() =>
                          navigate(
                            `/${params.sid}/${params.id}/department/${departmentClassData._id}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/info-icon.svg" title="Info" />
                        </span>
                      </div>
                      </div>
                      <div className="col-3">
                      <div className={`${styles.dTab} `}>
                        <span>
                        <img src="/images/class-icon.svg" title="Class" />
                        </span>
                      </div>
                      </div>
                      <div className="col-3">
                      <div
                        className={`${styles.dTab} ${styles.active}`}
                        onClick={() =>
                          navigate(
                            `/${params.sid}/${params.id}/currentbatch/${departmentClassData._id}`
                          )
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
                      <div className="mb-3 col col-6 col-lg-4 d-flex justify-content-end"></div>
                    </div>
                    <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                      <SearchCcard
                        classData={batchClassData}
                        sid={params.sid}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomInstitute id={params.sid} />
      </div>
    </>
  );
};

export default SearchDepartmentsNewBatch;
