import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserAboutSection from "../UserAboutSection";
import { requestURL } from "../ReqUrl";
import axios from "axios";
import NavbarBottomUser from "../NavbarBottomUser";
import NavbarTopUser from "../NavbarTopUser";
import UserSideBar from "../UserSideBar";

const UserInstituteSection = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userInsData, setUserInsData] = useState([]);
  const [first, setFirst] = useState(false);
  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard`)
      .then((res) => {
        setUserInsData(res.data.institute);
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
                <h4 className="my-5">All Institute</h4>
                <div class='mb-3 d-flex justify-content-center'>
                    <div class='w-50'>
                    <input
                    type="text"
                    className={`form-control ${styles.userinsinput}`}
                    id="firstname"
                    placeholder="Search Institute..."
                    />
                    </div>
                    </div>
                <div className={`mb-5 ${styles.dsearch} `}>
                  {/* <div className="mb-3 col col-8 ">
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      placeholder="Search Institute..."
                    />
                  </div> */}
                  <div className=" mb-3 col col-3"></div>
                </div>
                <div className={` gx-0  ${styles.cardContainer} `}>
                  {userInsData &&
                    userInsData.map((at) =>
                      at.status === "Approved" ? (
                        <div
                          className={` ${styles.dlogo} ${styles.cardView}`}
                          onClick={() =>
                            navigate(
                              `/user/${params.uid}/search/insdashboard/${at._id}`
                            )
                          }
                        >
                          <img
                            className={styles.dlogoImages}
                            src={
                              at.photoId === "1"
                                ? "/images/institute-avatar.jpeg"
                                : first
                                ? `${requestURL}/insprofileabout/photo/${at.insProfilePhoto}`
                                : null
                            }
                          />
                          <p className={styles.dlogoText}>
                            <small>{at.insName}</small>
                          </p>
                        </div>
                      ) : (
                        ""
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

export default UserInstituteSection;
