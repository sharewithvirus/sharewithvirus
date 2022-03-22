import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserAboutSection from "../UserAboutSection";
import { requestURL } from "../ReqUrl";
import axios from "axios";
import NavbarBottomUser from "../NavbarBottomUser";
import NavbarTopUser from "../NavbarTopUser";
import UserSideBar from "../UserSideBar";

const UserStaffSection = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [userStaffData, setUserStaffData] = useState([]);
  const [first, setFirst] = useState(false);
  useEffect(() => {
    axios
      .get(`${requestURL}/allstaff`)
      .then((res) => {
        setUserStaffData(res.data.staff);
        setFirst(true);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);

  return (
    <>
        <NavbarTopUser uid={params.uid} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <UserAboutSection uid={params.uid} />
                <div className={`${styles.about} ${styles.leftMenu}`}>
                  <UserSideBar uid={params.uid} />
                </div>
                <div className={styles.rightCols}></div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={` h-100 ${styles.about}`} style={{ marginTop: "24px" }}>
                <h4 className="my-5">All Mentors</h4>
                <div class='mb-3 d-flex justify-content-center'>
                    <div className="w-50">
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        placeholder="Search Staff..."
                      />
                    </div>
                  </div>
                <div className="row">
                  {userStaffData &&
                    userStaffData.map((at) =>
                      params.uid === at.user ? (
                        ""
                      ) : (
                        <div
                          className={`col-sm-6 col-md-4 col-lg-3 gx-0  ${styles.cardContainer} `}
                        >
                          <div
                            className={` ${styles.dlogo} ${styles.cardView}`}
                            onClick={() =>
                              navigate(
                                `/search/${params.uid}/user-search-profile/${
                                  at.user ? at.user : ""
                                }`
                              )
                            }
                          >
                            <img
                              className={styles.dlogoImages}
                              src={
                                at.photoId === "1"
                                  ? "/images/image-boy2.png"
                                  : first
                                  ? `${requestURL}/search/insdashboard/staffdata/photo/${at.staffProfilePhoto}`
                                  : null
                              }
                              alt="not found"
                            />
                            <p className={styles.dlogoText}>
                              <small>{`${at.staffFirstName} ${
                                at.staffMiddleName ? at.staffMiddleName : ""
                              } ${at.staffLastName}`}</small>
                            </p>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
        <NavbarBottomUser uid={params.uid} />
    </>
  );
};

export default UserStaffSection;
