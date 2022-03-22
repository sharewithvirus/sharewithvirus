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

const SportDepartmentProfile = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [sportData, setSportData] = useState([])

  useEffect(() => {
    axios
      .get(`${requestURL}/sport/detail/${params.sid}`)
      .then((res) => {
        setSportData(res.data.sport);
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
                        <div className={`${styles.dTab} `}>
                          <span>
                            <img src="/images/info-icon.svg" title="Info" />
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div
                          className={`${styles.dTab} ${styles.active} `}
                          onClick={() =>
                            navigate(
                              `/ins/${params.id}/sport/profile/${params.sid}/class`
                            )
                          }
                        >
                          <span>
                            <img src="/images/class-icon.svg" title="Batch" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form className="row mt-0">
                    <div className="col-12 mb-4">
                      <label htmlFor="dhead" className="form-label">
                        Sport Head
                      </label>
                      <input
                        type="text"
                        name="dhead"
                        className="form-control"
                        id="dhead"
                        value={
                          sportData.sportHead
                            ? `${sportData.sportHead.staffFirstName} ${
                                sportData.sportHead.staffMiddleName
                                  ? sportData.sportHead.staffMiddleName
                                  : ""
                              } ${sportData.sportHead.staffLastName}`
                            :
                             "Sport Head"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label htmlFor="dabout" className="form-label">
                        About Sport
                      </label>
                      <input
                        type="text"
                        name="dabout"
                        className="form-control"
                        id="dabout"
                        value={
                          sportData.sportAbout
                            ? sportData.sportAbout
                            : "About Sport"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label htmlFor="demail" className="form-label">
                        Sport Email
                      </label>
                      <input
                        type="email"
                        name="demail"
                        className="form-control"
                        id="demail"
                        value={
                          sportData.sportEmail
                            ? sportData.sportEmail
                            : "Sport Email"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label htmlFor="dnumber" className="form-label">
                        Sport Phone No.
                      </label>
                      <input
                        type="tel"
                        name="dnumber"
                        className="form-control"
                        id="dnumber"
                        value={
                          sportData.sportPhoneNumber
                            ? sportData.sportPhoneNumber
                            : "Sport Phone Number"
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
      </div>
        <NavbarBottomInstitute id={params.id} />
    </>
  );
};

export default SportDepartmentProfile;
