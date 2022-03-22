import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserAboutSection from "../UserAboutSection";
// import NewUserAnnouncement from "../NewUserAnnouncement";
// import BackButton from "../BackButton";
import { requestURL } from "../ReqUrl";
import axios from "axios";
import NavbarBottomUser from "../NavbarBottomUser";
import NavbarTopUser from "../NavbarTopUser";
import UserSideBar from "../UserSideBar";

const UserRandomSection = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userData, setUserData] = useState([]);
  const [first, setFirst] = useState(false);

  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard`)
      .then((res) => {
        setUserData(res.data.users);
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
                <h4 className="my-5">All User</h4>
                <div className="mb-3 d-flex justify-content-center">
                    <div className="w-50">
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        placeholder="Search User..."
                      />
                    </div>
                  </div>
                <div className={` gx-0  ${styles.cardContainer} `}>
                  {userData &&
                    userData.map(
                      (at) =>
                        // userData && userData.some((st) =>(
                        at._id === params.uid ? (
                          ""
                        ) : (
                          <div
                            className={` ${styles.dlogo} ${styles.cardView}`}
                            onClick={() =>
                              navigate(
                                `/search/${params.uid}/user-search-profile/${at._id}`
                              )
                            }
                          >
                            <img
                              className={styles.dlogoImages}
                              src={
                                at.photoId === "1"
                                  ? "/images/image-boy2.png"
                                  : first
                                  ? `${requestURL}/userprofileabout/photo/${at.profilePhoto}`
                                  : null
                              }
                              alt=""
                            />
                            <p className={styles.dlogoText}>
                              <small>
                                {at.userLegalName ? at.userLegalName : ""} - (
                                {at.username})
                              </small>
                            </p>
                          </div>
                        )
                      // ))
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

export default UserRandomSection;
