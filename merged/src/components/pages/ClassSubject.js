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
import NewSubject from "./NewSubject";
import Scard from "../Scard";
import InstituteStatsSection from "../InstituteStatsSection";
import axios from "axios";
import { requestURL } from "../ReqUrl";

const ClassSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [newSubject, setNewSubject] = useState(false);

  const [createClassAboutData, setCreateClassAboutData] = useState([]);
  const [classAboutSubjectData, setClassAboutSubjectData] = useState([]);
  const [dBatchData, setDBatchData] = useState("");
  const [data, setData] = useState(true);

  useEffect(() => {
    if (data) {
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
          const classText = res.data.classes;
          const subject = res.data.classes.subject;
          setCreateClassAboutData(classText);
          setClassAboutSubjectData(subject);
          setData(false);
        })
        .catch((e) => {
          console.log("Something Went Wrong");
        });
    }
  }, []);
  // }, [data]);

  const setClassSubjectFunction = () => {
    setNewSubject(false);
    setData(true);
  };

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
              <div className={`${styles.about}`}>
                {/* <BackButton /> */}
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection
                    coverPicSrc={"/images/other-places-cover-photo.jpg"}
                    profilePicSrc={"/images/classroom-avatar.jpeg"}
                  />
                  <NewDetailsBar
                    cData={createClassAboutData}
                    batchData={dBatchData}
                  />

                  <div className={`mb-5 ${styles.ddetail}`}>
                    <div className="row">
                      <span
                        className={`col-6 ${styles.active}`}
                        onClick={() =>
                          navigate(
                            `/ins/${params.id}/department/${params.did}/batch/${params.bid}/class/${params.cid}`
                          )
                        }
                      >
                      <img src="/images/info-icon.svg" title="Info" />{" "}
                      </span>
                      <span className="col-6">
                      <img src="/images/subject-icon.svg" title="Subject" />{" "}
                      </span>
                    </div>
                  </div>
                  <form className="row mt-0">
                    <div className="d-flex justify-content-between">
                      <div className="col-6 mb-2">
                        <label for="chead" className="form-label">
                          Class Teacher
                        </label>
                        <input
                          readOnly
                          type="text"
                          name="chead"
                          className="form-control "
                          id="chead"
                          value={
                            createClassAboutData.classTeacher
                              ? `${
                                  createClassAboutData.classTeacher
                                    .staffFirstName
                                } ${
                                  createClassAboutData.classTeacher
                                    .staffMiddleName
                                    ? createClassAboutData.classTeacher
                                        .staffMiddleName
                                    : ""
                                } ${
                                  createClassAboutData.classTeacher
                                    .staffLastName
                                }`
                              : ""
                          }
                        />
                      </div>
                      <div className="d-flex col-6 mt-2 justify-content-end">
                        <button
                          type="button"
                          className="btn btn-outline-primary mt-4"
                          onClick={() => setNewSubject(true)}
                        >
                          <i class="far fa-plus-square mt-2 mx-2">
                            &nbsp; Add Subject
                          </i>
                        </button>
                      </div>
                    </div>
                    <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                      <Scard subjectData={classAboutSubjectData} />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <NewSubject
              setClassSubjectFunction={setClassSubjectFunction}
              trigger={newSubject}
              setTrigger={setNewSubject}
            />
          </div>
        </div>
        <NavbarBottomInstitute id={params.id} />
      </div>
    </>
  );
};

export default ClassSubject;
