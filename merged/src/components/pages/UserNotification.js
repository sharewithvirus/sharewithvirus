import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserAboutSection from "../UserAboutSection";
import UserStatsSection from "../UserStatsSection";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Success } from "../SnackBar";
import UserSideBar from "../UserSideBar";
import { Link } from "react-router-dom";
import UserAnnouncementCard from "../UserAnnouncementCard";

const UserNotification = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userData, setUserData] = useState("");
  const [userAnnData, setUserAnnData] = useState([]);
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [circleData, setCircleData] = useState([]);
  const [first, setFirst] = useState(false);
  const [userStaff, setUserStaff] = useState([]);
  const [userStudent, setUserStudent] = useState([]);
  const [support, setSupport] = useState([]);
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

  useEffect(() => {
    axios.get(`${requestURL}/userdashboard/${params.id}`).then((res) => {
      const data = res.data.user;
      setUserData(data);
      setUserStaff(res.data.user.staff);
      setUserStudent(res.data.user.student);
      setFollowersData(res.data.user.userFollowers);
      setFollowingData(res.data.user.userFollowing);
      setCircleData(res.data.user.userCircle);
      setUserAnnData(res.data.user.userInstituteFollowing);
      setSupport(res.data.user.support)
      setFirst(true);
    });
  // }, []);
  }, [circleData]);

  const UserCircleHandler = (id) => {
    axios
      .put(`${requestURL}/user/circle-ins`, {
        followId: id,
      })
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  return (
    <>
      <NavbarTopUser uid={params.id} />
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}
      <div className={styles.mainScreen}>
        {/* <NavbarTopInstitute uid={params.id}/> */}

        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <UserAboutSection uid={params.id} />
                <div className={`${styles.about} ${styles.leftMenu}`}>
                  <UserSideBar uid={params.id} />
                </div>
                <div className={styles.rightCols}>
                  <UserStatsSection id={params.id} />
                </div>
              </div>
            </div>
            <div
              className={`col col-md-11 col-lg-8 col-xl-6 m-auto ${styles.midside}`}
            >
              <h4
                className={`${styles.dlogoText}`}
                style={{ marginTop: "24px", marginBottom: "0.5rem" }}
              >
                Notifications
              </h4>
              {userStaff.length === 0 &&
              userStudent.length === 0 &&
              followersData.length === 0 &&
              circleData.length === 0 &&
              userAnnData.length === 0 &&
              followingData.length === 0 && 
              support.length === 0 ? (
                "No New Notification"
              ) : (
                <div className={`${styles.notify1}`}>
                  {userStaff.length >= 1 ? (
                    <>
                      <div className={`mt-2 ${styles.notifycontent}`}>
                        {userStaff &&
                          userStaff.map((st) =>
                            st.staffStatus === "Approved" ? (
                              <>
                                <img
                                  src={
                                    st.institute.photoId === "1"
                                      ? "/images/institute-avatar.jpeg"
                                      : first
                                      ? `${requestURL}/insprofileabout/photo/${st.institute.insProfilePhoto}`
                                      : null
                                  }
                                  height="50px"
                                  width="50px"
                                  // className="img-fluid"
                                />
                                <p>
                                  <strong>{st.institute.insName}</strong>{" "}
                                  accepted your request. You are now staff of{" "}
                                  <strong>{st.institute.insName}</strong> in
                                  member Tab
                                </p>
                                <div className={styles.notifyright}>
                                  <p>10m</p>
                                  <img src="https://img.icons8.com/material-rounded/25/000000/menu-2.png" />
                                </div>
                              </>
                            ) : (
                              ""
                            )
                          )}
                      </div>
                      <hr />
                    </>
                  ) : (
                    ""
                  )}

                  {userStudent.length >= 1 ? (
                    <>
                      <div className={`mt-2 ${styles.notifycontent}`}>
                        {userStudent &&
                          userStudent.map((st) =>
                            st.studentStatus === "Approved" ? (
                              <>
                                <img
                                  src={
                                    st.institute.photoId === "1"
                                      ? "/images/institute-avatar.jpeg"
                                      : first
                                      ? `${requestURL}/insprofileabout/photo/${st.institute.insProfilePhoto}`
                                      : null
                                  }
                                  height="50px"
                                  width="50px"
                                  // className="img-fluid"
                                />
                                <p>
                                  <strong>{st.institute.insName}</strong>{" "}
                                  accepted your request. You are now student of{" "}
                                  <strong>{st.studentClass.className}</strong>
                                </p>

                                <div className={styles.notifyright}>
                                  <p>10m</p>
                                  <img src="https://img.icons8.com/material-rounded/25/000000/menu-2.png" />
                                </div>
                              </>
                            ) : (
                              ""
                            )
                          )}
                      </div>
                      <hr />
                    </>
                  ) : (
                    ""
                  )}

                  {followersData.length >= 1 ? (
                    <>
                      {followersData &&
                        followersData.map((st) => (
                          <>
                            <div className={`mt-2 ${styles.notifycontent}`}>
                              <Link
                                to={`/search/${params.id}/user-search-profile/${st._id}`}
                              >
                                <img
                                  src={
                                    st.photoId === "1"
                                      ? "/images/image-boy2.png"
                                      : first
                                      ? `${requestURL}/userprofileabout/photo/${st.profilePhoto}`
                                      : null
                                  }
                                  height="50px"
                                  width="50px"
                                />
                              </Link>
                              <p
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  letterSpacing: "1px",
                                }}
                              >
                                <strong className="mx-1">{`${st.userLegalName}`}</strong>{" "}
                                started following you
                                {followersData.length >= 1 &&
                                followersData.some(
                                  (et) => et._id === st._id
                                ) ? (
                                  circleData.some((et) => et._id === st._id) ? (
                                    "circled"
                                  ) : (
                                    <button
                                      type="submit"
                                      id={`userId${st._id}`}
                                      className="btn btn-outline-primary mx-2 px-2"
                                      onClick={() => {
                                        UserCircleHandler(st._id);
                                      }}
                                    >
                                      Add To Circle
                                    </button>
                                  )
                                ) : (
                                  ""
                                )}
                                {/* Posts: {st.userPosts.length} Followers: {st.userFollowers.length} */}
                              </p>
                              <div className={styles.notifyright}>
                                <p>10m</p>
                                <img src="https://img.icons8.com/material-rounded/25/000000/menu-2.png" />
                              </div>
                            </div>
                            <hr />
                          </>
                        ))}
                    </>
                  ) : (
                    ""
                  )}

                  {followingData.length >= 1 ? (
                    <>
                      {followingData &&
                        followingData.map((st) => (
                          <>
                            <div className={`mt-2 ${styles.notifycontent}`}>
                              <Link
                                to={`/search/${params.id}/user-search-profile/${st._id}`}
                              >
                                <img
                                  src={
                                    st.photoId === "1"
                                      ? "/images/image-boy2.png"
                                      : first
                                      ? `${requestURL}/userprofileabout/photo/${st.profilePhoto}`
                                      : null
                                  }
                                  height="50px"
                                  width="50px"
                                />
                              </Link>
                              <p
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  letterSpacing: "1px",
                                }}
                              >
                                you started following
                                <strong className="mx-1">{`${st.userLegalName}`}</strong>
                              </p>
                              <div className={styles.notifyright}>
                                <p>10m</p>
                                <img src="https://img.icons8.com/material-rounded/25/000000/menu-2.png" />
                              </div>
                            </div>
                            <hr />
                          </>
                        ))}
                    </>
                  ) : (
                    ""
                  )}
                  {circleData.length >= 1 ? (
                    <>
                      {circleData &&
                        circleData.map((st) => (
                          <>
                            <div className={`mt-2 ${styles.notifycontent}`}>
                              <Link
                                to={`/search/${params.id}/user-search-profile/${st._id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <img
                                  src={
                                    st.photoId === "1"
                                      ? "/images/image-boy2.png"
                                      : first
                                      ? `${requestURL}/userprofileabout/photo/${st.profilePhoto}`
                                      : null
                                  }
                                  height="50px"
                                  width="50px"
                                />
                              </Link>

                              <p
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  letterSpacing: "1px",
                                }}
                              >
                                you are{" "}
                                <strong className="mx-1">circled</strong> with
                                the{" "}
                                <strong className="mx-1">
                                  {`${st.userLegalName}`}
                                </strong>
                              </p>
                              <div className={styles.notifyright}>
                                <p>10m</p>
                                <img src="https://img.icons8.com/material-rounded/25/000000/menu-2.png" />
                              </div>
                            </div>
                            <hr />
                          </>
                        ))}
                    </>
                  ) : (
                    ""
                  )}

                  {userAnnData.length >= 1 ? (
                    <>
                      {userAnnData &&
                        userAnnData.map((st) => (
                          <>
                            <div className={`mt-2 ${styles.notifycontent}`}>
                              <Link
                                to={`/user/${params.id}/search/insdashboard/${st._id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <img
                                  src={
                                    st.photoId === "1"
                                      ? "/images/institute-avatar.jpeg"
                                      : first
                                      ? `${requestURL}/insprofileabout/photo/${st.insProfilePhoto}`
                                      : null
                                  }
                                  height="50px"
                                  width="50px"
                                  // className="img-fluid"
                                />
                              </Link>
                              <p
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  letterSpacing: "1px",
                                }}
                              >
                                you are started following{" "}
                                <strong className="mx-1">
                                  {`${st.insName}`}
                                </strong>
                              </p>
                              <div className={styles.notifyright}>
                                <p>10m</p>
                                <img src="https://img.icons8.com/material-rounded/25/000000/menu-2.png" />
                              </div>
                            </div>
                            <hr />
                          </>
                        ))}
                    </>
                  ) : (
                    ""
                  )}
                  {userAnnData.length >= 1 ? (
                    <>
                      {userAnnData &&
                        userAnnData.map((st) =>
                          st
                            ? st.announcement.map((et) => (
                                <>
                                  <div
                                    className={`mt-2 ${styles.notifycontent}`}
                                  >
                                    <Link
                                      to={`/user/${params.id}/search/insdashboard/${st._id}`}
                                      style={{ textDecoration: "none" }}
                                    >
                                      <img
                                        src={
                                          st.photoId === "1"
                                            ? "/images/institute-avatar.jpeg"
                                            : first
                                            ? `${requestURL}/insprofileabout/photo/${st.insProfilePhoto}`
                                            : null
                                        }
                                        height="50px"
                                        width="50px"
                                        // className="img-fluid"
                                      />
                                    </Link>
                                    <p>
                                      New Announcement by{" "}
                                      <strong className="mx-1">
                                        {st.insName}
                                      </strong>
                                      <Link
                                        to={`/${params.id}/user/announcementdetail/${et._id}`}
                                        style={{ textDecoration: "none" }}
                                      >
                                        Read More
                                      </Link>
                                    </p>
                                    <div className={styles.notifyright}>
                                      <p>10m</p>
                                      <img src="https://img.icons8.com/material-rounded/25/000000/menu-2.png" />
                                    </div>
                                  </div>
                                  <hr />
                                </>
                              ))
                            : ""
                        )}
                    </>
                  ) : (
                    ""
                  )}

{support.length >= 1 ? (
                    <>
                      <div className={`mt-2 ${styles.notifycontent}`}>
                        {support &&
                          support.map((st) =>
                              <>
                                <img
                                  src={
                                    st.user.photoId === "1"
                                    ? "/images/profile.jpeg"
                                    : first
                                      ? `${requestURL}/userprofileabout/photo/${st.user.profilePhoto}`
                                      : null
                                  }
                                  height="50px"
                                  width="50px"
                                  // className="img-fluid"
                                />
                                <p>
                                  {st.queryReply} - (Support)
                                </p>

                                <div className={styles.notifyright}>
                                  <p>10m</p>
                                  <img src="https://img.icons8.com/material-rounded/25/000000/menu-2.png" />
                                </div>
                              </>
                            
                          )}
                      </div>
                      <hr />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
            <div className={`col col-xl-3 ${styles.rightside}`}>
              <UserStatsSection />
              <p
                className={styles.dlogoText}
                // onClick={() => navigate(`/user/announcement/${params.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src="/images/announcement-icon.svg"
                  // className={`${style.userimg} ${style.svgIcon}`}
                  alt="user"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Joined"
                />{" "}
                Announcements / Notices
              </p>
              <UserAnnouncementCard uid={params.id} />
            </div>
          </div>
        </div>
      </div>
      <NavbarBottomUser uid={params.id} />
    </>
  );
};

export default UserNotification;