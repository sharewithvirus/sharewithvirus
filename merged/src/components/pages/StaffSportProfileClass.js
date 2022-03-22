import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import UserStaffAboutSection from "../UserStaffAboutSection";
import ProfileDisplaySection from "../ProfileDisplaySection";
import NewSportHeadDetailBar from "../NewSportHeadDetailBar";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";

const StaffSportProfileClass = () => {
  const navigate = useNavigate();
  const [sportData, setSportData] = useState('')
  const params = useParams();

  useEffect(() => {
    axios.get(`${requestURL}/sport/detail/${params.ssid}`)
      .then((res) => {
         setSportData(res.data.sport)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, [params.ssid]);
  return (
    <>
        <NavbarTopUser uid={params.id} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <InstituteRoleTab uid={params.id}/>
              <div className={styles.leftBar}>
              <UserStaffAboutSection sid={params.sid} uid={params.id}/>
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >
                
                </div>

                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <UserStaffSideBar />
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
            <StaffSelectInstituteRole id={params.id} sid={params.sid} />
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={styles.insTitle}></div>
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection />
                  <NewSportHeadDetailBar
                    name={sportData.sportName}
                    eData={sportData ? sportData.sportClass :''}
                    body1={`${
                      sportData.sportAbout
                        ? sportData.sportAbout
                        : ""
                    }`}
                  />
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row">
                      <div
                        className={`${styles.dhTab} ${styles.active}`}
                        onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/sport/${params.ssid}`
                            )
                          }
                      >
                        <span>
                        <img src="/images/department-menu-icon.svg" title="Menu" />{" "}
                        </span>
                      </div>
                      <div
                        className={`${styles.dhTab} ${styles.active}  `}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/sport/info/${params.ssid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/info-icon.svg" title="Info" />{" "}
                        </span>
                      </div>
                      <div
                        className={`${styles.dhTab}`}
                      >
                        <span>
                        <img src="/images/class-icon.svg" title="Class" />{" "}
                        </span>
                      </div>
                    </div>
                  </div>

                  <form className="row mt-5">
                      <h4 className="my-2">Sport Classes</h4>
                    <div className="row d-flex justify-content-between">
                      <div className="col-6 col-lg-8  mb-2">
                        <input
                          type="text"
                          className="form-control"
                          id="firstname"
                          placeholder="Search Sport Classes"
                        />
                      </div>
                      <div className="mb-3 col col-6 col-lg-4 d-flex justify-content-end">
                      
                      </div>
                    </div>
                    <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                      {sportData.sportClass &&
                        sportData.sportClass.map((st) => (
                          <div
                            className={` ${styles.dlogo} ${styles.cardView}`}
                          >
                            <img
                              className={styles.dlogoImages}
                              src="/images/logo-classroom.png"
                              alt="classroom"
                            />
                            <p className={styles.dlogoText}>
                              <small>
                                {st.sportClassName ? `${st.sportClassName} Class` : ""}
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
        <NavbarBottomUser uid={params.id} />
    </>
  );
};

export default StaffSportProfileClass;
