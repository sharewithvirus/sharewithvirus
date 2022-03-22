import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import AboutSection from "../AboutSection";
import InstituteSidebar from "../InstituteSidebar";
import ProfileDisplaySection from "../ProfileDiaplaySection";
import InstituteStatsSection from "../InstituteStatsSection";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import NewSportDetailBar from "../NewSportDetailBar";
import NewSportClass from './NewSportClass'

const SportDepartmentClass = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [sportData, setSportData] = useState([])
  const [addClass, setAddClass] = useState(false);
  const [showPost, setShowPost] = useState(true);

  useEffect(() => {
    if (showPost) {
    axios
      .get(`${requestURL}/sport/detail/${params.sid}`)
      .then((res) => {
        setSportData(res.data.sport);
        setShowPost(false);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    }
  }, [params.sid]);

  const setAddClassFunction = () => {
    setAddClass(false);
  };

  const onShowPost = () => {
    setShowPost(true);
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
                  className={`mt-1 ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection
                    coverPicSrc={"/images/other-places-cover-photo.jpg"}
                    profilePicSrc={"/images/department-avatar.jpeg"}
                  />
                  <NewSportDetailBar
                    sportText={sportData}
                  />
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-6">
                        <div className={`${styles.dTab} ${styles.active}`}
                        onClick={() =>
                            navigate(
                              `/ins/${params.id}/sport/profile/${params.sid}`
                            )
                          }
                        >
                          <span>
                            <img src="/images/info-icon.svg" title="Info" />
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div
                          className={`${styles.dTab} `}
                          
                        >
                          <span>
                            <img src="/images/class-icon.svg" title="Class" />
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
                      {/* <Ccard classData={batchClassData} /> */}
                      {sportData.sportClass &&
                        sportData.sportClass.map((ct) => (
                        <div
                            className={` ${styles.dlogo} ${styles.cardView}`}
                            // onClick={() =>
                            // navigate(
                            //     `/ins/${params.id}/department/${params.did}/batch/${params.bid}/class/${ct._id}`
                            // )
                            // }
                        >
                            <img
                            className={styles.dlogoImages}
                            src='/images/logo-classroom.png'
                            alt="not found"
                            />
                            <p className={styles.dlogoText}>
                            <small>
                                {ct.sportClassName ? `${ct.sportClassName} Sport Class` : ""}
                            </small>
                            </p>
                        </div>
                        ))}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <NavbarBottomInstitute id={params.id} />
        <NewSportClass
              setAddClassFunction={setAddClassFunction}
              trigger={addClass}
              setTrigger={setAddClass}
              sid={params.sid}
              onShowPost={onShowPost}
            />
    </>
  );
};

export default SportDepartmentClass;
