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
import NewFinanceDetailBar from "../NewFinanceDetailBar";

const FinanceDepartmentProfile = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [financeData, setFinanceData] = useState([])

  useEffect(() => {
    axios
      .get(`${requestURL}/finance/detail/${params.fid}`)
      .then((res) => {
        setFinanceData(res.data.finance);
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
                  <NewFinanceDetailBar
                    financeText={financeData}
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
                              `/ins/${params.id}/finance/${financeData._id}/balance-status`
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
                    <div className="col-12 mb-4">
                      <label htmlFor="dhead" className="form-label">
                        Finance Head
                      </label>
                      <input
                        type="text"
                        name="dhead"
                        className="form-control"
                        id="dhead"
                        value={
                          financeData.financeHead
                            ? `${financeData.financeHead.staffFirstName} ${
                                financeData.financeHead.staffMiddleName
                                  ? financeData.financeHead.staffMiddleName
                                  : ""
                              } ${financeData.financeHead.staffLastName}`
                            :
                             "Finance Head"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label htmlFor="dabout" className="form-label">
                        About Finance
                      </label>
                      <input
                        type="text"
                        name="dabout"
                        className="form-control"
                        id="dabout"
                        value={
                          financeData.financeAbout
                            ? financeData.financeAbout
                            : "About Finance"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label htmlFor="demail" className="form-label">
                        Finance Email
                      </label>
                      <input
                        type="email"
                        name="demail"
                        className="form-control"
                        id="demail"
                        value={
                          financeData.financeEmail
                            ? financeData.financeEmail
                            : "Finance Email"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label htmlFor="dnumber" className="form-label">
                        Finance Phone No.
                      </label>
                      <input
                        type="tel"
                        name="dnumber"
                        className="form-control"
                        id="dnumber"
                        value={
                          financeData.financePhoneNumber
                            ? financeData.financePhoneNumber
                            : "Finance Phone Number"
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

export default FinanceDepartmentProfile;
