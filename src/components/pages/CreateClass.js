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
import axios from "axios";
import { requestURL } from "../ReqUrl";

const CreateClass = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [createClassData, setCreateClassData] = useState([]);
  const [dBatchData, setDBatchData] = useState("");
  // const [data, setData] = useState(true)

  useEffect(() => {
    axios
      .get(`${requestURL}/department/${params.did}`)
      .then((res) => {
        setDBatchData(res.data.department.departmentSelectBatch);
        // setData(true)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/class/${params.cid}`)
      .then((res) => {
        const classData = res.data.classes;
        setCreateClassData(classData);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);
  // }, [createClassData]);

  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopInstitute id={params.id} />
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
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection
                    coverPicSrc={"/images/other-places-cover-photo.jpg"}
                    profilePicSrc={"/images/classroom-avatar.jpeg"}
                  />
                  <NewDetailsBar
                    cData={createClassData}
                    batchData={dBatchData}
                  />

                  <div className={`mb-5 ${styles.ddetail}`}>
                    <div className="row">
                      <span className={`col-6 }`}>
                      <img src="/images/info-icon.svg" title="Info" />{" "}
                      </span>
                      <span
                        className={`col-6 ${styles.active}`}
                        onClick={() =>
                          navigate(
                            `/ins/${params.id}/department/${params.did}/batch/${params.bid}/classsubject/${params.cid}`
                          )
                        }
                      >
                      <img src="/images/subject-icon.svg" title="Subject" />{" "}
                      </span>
                    </div>
                  </div>
                  <form className="row mt-0">
                    <div className="col-12 mb-4">
                      <label for="chead" className="form-label">
                        Class Teacher
                      </label>
                      <input
                        type="text"
                        name="chead"
                        className="form-control"
                        id="chead"
                        value={
                          createClassData.classTeacher
                            ? `${createClassData.classTeacher.staffFirstName} ${
                                createClassData.classTeacher.staffMiddleName
                                  ? createClassData.classTeacher.staffMiddleName
                                  : ""
                              } ${createClassData.classTeacher.staffLastName}`
                            : ""
                        }
                        disabled
                        readOnly
                      />
                    </div>

                    <div className="col-12 col-md-6 mb-4">
                      <label for="cname" className="form-label">
                        Class Name
                      </label>
                      <input
                        type="text"
                        name="cname"
                        className="form-control"
                        id="cname"
                        value={
                          createClassData.className
                            ? createClassData.className
                            : "Class name"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label for="cabout" className="form-label">
                        About Class
                      </label>
                      <input
                        type="text"
                        name="cabout"
                        className="form-control"
                        id="cabout"
                        value={
                          createClassData.classAbout
                            ? createClassData.classAbout
                            : "About Class"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label for="crepr" className="form-label">
                        Class Representive
                      </label>
                      <input
                        type="text"
                        name="crepr"
                        className="form-control"
                        id="crepr"
                        value={
                          createClassData.classDisplayPerson
                            ? createClassData.classDisplayPerson
                            : "Class Representative"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label for="cstr" className="form-label">
                        Class Strength
                      </label>
                      <input
                        type="text"
                        name="cstr"
                        className="form-control"
                        id="cstr"
                        value={
                          createClassData.classStudentTotal
                            ? createClassData.classStudentTotal
                            : "Class Strength"
                        }
                        disabled
                        readOnly
                      />
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

export default CreateClass;
