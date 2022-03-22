import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutSection from "../AboutSection";
import InstituteStats from "../InstituteStatsSection";
import NavbarTopInstitute from "../NavbarTopInstitute";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Success } from "../SnackBar";
import { Link } from "react-router-dom";
import InstituteAnnouncementCard from "../InstituteAnnouncementCard";
import InstituteSidebar from "../InstituteSidebar";

const InstituteNotification = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [insData, setInsData] = useState("");
  const [userFollowData, setUserFollowData] = useState([]);
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [first, setFirst] = useState(false);
  const [userStaff, setUserStaff] = useState([]);
  const [userApproveStaff, setUserApproveStaff] = useState([]);
  const [userStudent, setUserStudent] = useState([]);
  const [batchData, setBatchdata] = useState([])
  const [support, setSupport] = useState([])
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

  useEffect(() => {
    axios.get(`${requestURL}/insdashboard/${params.id}`).then((res) => {
      const data = res.data.institute;
      setInsData(data);
      setUserStaff(res.data.institute.staff);
      setUserApproveStaff(res.data.institute.ApproveStaff);
      setUserStudent(res.data.institute.ApproveStudent);
      setFollowersData(res.data.institute.followers);
      setFollowingData(res.data.institute.following);
      setUserFollowData(res.data.institute.userFollowersList);
      setSupport(res.data.institute.supportIns)
      setBatchdata(res.data.institute.idCardBatch)
      setFirst(true);
    });
  }, []);
  const StaffApproveHandler = (id) => {
    axios
      .post(`${requestURL}/ins/${params.id}/staff/approve/${id}`, {
        status: "Approved",
      })
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const StaffRejectHandler = (id) => {
    axios
      .post(`${requestURL}/ins/${params.id}/staff/reject/${id}`, {
        status: "Rejected",
      })
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  return (
    <>
      <NavbarTopInstitute id={params.id} />
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}
      <div className={styles.mainScreen}>
        {/* <NavbarTopInstitute uid={params.id}/> */}

        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection id={params.id} />
                <div className={`${styles.about} ${styles.leftMenu}`}>
                  <InstituteSidebar id={params.id} />
                </div>
                <div className={styles.rightCols}></div>
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
              <div className={`${styles.notify1}`}>
                {insData ? (
                  <>
                    {insData.status === "Not Approved" ? (
                      <>
                        <div className={`mt-2 ${styles.notifycontent}`}>
                          <Link
                            to={`/insuserprofile/${insData._id}`}
                            className="mx-1"
                            style={{ textDecoration: "none" }}
                          >
                            <img
                              src={
                                insData.photoId === "1"
                                  ? "/images/institute-avatar.jpeg"
                                  : first
                                  ? `${requestURL}/insprofileabout/photo/${insData.insProfilePhoto}`
                                  : null
                              }
                              height="50px"
                              width="50px"
                              // className="img-fluid"
                            />
                          </Link>

                          <p style={{ letterSpacing: "1px" }}>
                            You will be
                            <strong className="mx-1">Not Approved</strong> by
                            Super Admin
                          </p>
                          <div className={styles.notifyright}>
                            <p>10m</p>
                            <img src="https://img.icons8.com/material-rounded/25/000000/menu-2.png" />
                          </div>
                        </div>
                        <hr />
                      </>
                    ) : (
                      <>
                        <div className={`mt-2 ${styles.notifycontent}`}>
                          <Link
                            to={`/insuserprofile/${insData._id}`}
                            className="mx-1"
                            style={{ textDecoration: "none" }}
                          >
                            <img
                              src={
                                insData.photoId === "1"
                                  ? "/images/institute-avatar.jpeg"
                                  : first
                                  ? `${requestURL}/insprofileabout/photo/${insData.insProfilePhoto}`
                                  : null
                              }
                              height="50px"
                              width="50px"
                              // className="img-fluid"
                            />
                          </Link>

                          <p style={{ letterSpacing: "1px" }}>
                            You will be
                            <strong className="mx-1">Approved</strong> by Super
                            Admin
                          </p>
                          <div className={styles.notifyright}>
                            <p>10m</p>
                            <img src="https://img.icons8.com/material-rounded/25/000000/menu-2.png" />
                          </div>
                        </div>
                        <hr />
                      </>
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>

              {userStaff.length === 0 &&
              userStudent.length === 0 &&
              followersData.length === 0 &&
              userApproveStaff.length === 0 &&
              userFollowData.length === 0 &&
              batchData.length === 0 &&
              followingData.length === 0 && 
              support.length === 0 ? (
                ""
              ) : (
                <div className={`${styles.notify1}`}>
                  {userStaff.length >= 1 ? (
                    <>
                      {userStaff &&
                        userStaff.map((st) => (
                          <>
                            <div className={`mt-2 ${styles.notifycontent}`}>
                              <img
                                src={
                                  st.photoId === "1"
                                    ? "/images/image-boy2.png"
                                    : first
                                    ? `${requestURL}/search/insdashboard/staffdata/photo/${st.staffProfilePhoto}`
                                    : null
                                }
                                height="50px"
                                width="50px"
                              />
                              <p style={{ letterSpacing: "1px" }}>
                                <strong>
                                  <Link
                                    to={`/staffrequest/application/${st._id}`}
                                    className="mx-1"
                                    style={{ textDecoration: "none" }}
                                  >
                                    {`${st.staffFirstName} ${
                                      st.staffMiddleName
                                        ? st.staffMiddleName
                                        : ""
                                    } ${st.staffLastName}`}
                                  </Link>
                                </strong>{" "}
                                requested for staff
                                <br />
                                <span
                                  type="button"
                                  class={`btn btn-primary mx-2 `}
                                  onClick={() => {
                                    StaffApproveHandler(st._id);
                                  }}
                                >
                                  Accept
                                </span>
                                <span
                                  type="button"
                                  class={`btn btn-secondary mx-2`}
                                  onClick={() => {
                                    StaffRejectHandler(st._id);
                                  }}
                                >
                                  Reject
                                </span>
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

                  {userApproveStaff.length >= 1 ? (
                    <>
                      {userApproveStaff &&
                        userApproveStaff.map((st) => (
                          <>
                            <div className={`mt-2 ${styles.notifycontent}`}>
                              <Link
                                to={`/${params.id}/user/${st.user._id}/staff/view/profile/${st._id}`}
                                className="mx-1"
                                style={{ textDecoration: "none" }}
                              >
                                <img
                                  src={
                                    st.photoId === "1"
                                      ? "/images/image-boy2.png"
                                      : first
                                      ? `${requestURL}/search/insdashboard/staffdata/photo/${st.staffProfilePhoto}`
                                      : null
                                  }
                                  height="50px"
                                  width="50px"
                                />
                              </Link>

                              <p style={{ letterSpacing: "1px" }}>
                                <strong>
                                  {`${st.staffFirstName} ${
                                    st.staffMiddleName ? st.staffMiddleName : ""
                                  } ${st.staffLastName}`}
                                </strong>{" "}
                                joined as a staff
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

                  {userStudent.length >= 1 ? (
                    <>
                      {userStudent &&
                        userStudent.map((st) => (
                          <>
                            <div className={`mt-2 ${styles.notifycontent}`}>
                              <Link
                                to={`/${params.id}/user/${st.user._id}/student/view/profile/${st._id}`}
                              >
                                <img
                                  src={
                                    st.photoId === "1"
                                      ? "/images/image-boy2.png"
                                      : first
                                      ? `${requestURL}/search/insdashboard/staffdata/photo/${st.studentProfilePhoto}`
                                      : null
                                  }
                                  height="50px"
                                  width="50px"
                                />
                              </Link>
                              <p>
                                <strong>{`${st.studentFirstName} ${
                                  st.studentMiddleName
                                    ? st.studentMiddleName
                                    : ""
                                } ${st.studentLastName}`}</strong>{" "}
                                joined as a student of class{" "}
                                <strong>{st.studentClass.className}</strong>
                              </p>

                              <div className={styles.notifyright}>
                                <p>10m</p>
                                <img src="https://img.icons8.com/material-rounded/25/000000/menu-2.png" />
                              </div>
                            </div>
                          </>
                        ))}
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
                                to={`/search/${params.id}/ins-search-profile/${st._id}`}
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
                              <p style={{ letterSpacing: "1px" }}>
                                <strong className="mx-1">{`${st.insName}`}</strong>{" "}
                                started following you
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
                                to={`/search/${params.id}/ins-search-profile/${st._id}`}
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
                              <p style={{ letterSpacing: "1px" }}>
                                you started following
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

                  {userFollowData.length >= 1 ? (
                    <>
                      {userFollowData &&
                        userFollowData.map((st) => (
                          <>
                            <div className={`mt-2 ${styles.notifycontent}`}>
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
                              <p style={{ letterSpacing: "1px" }}>
                                <strong className="mx-1">
                                  {st.userLegalName}
                                </strong>{" "}
                                started following you
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

                  {support.length >= 1 ? (
                    <>
                      <div className={`mt-2 ${styles.notifycontent}`}>
                        {support &&
                          support.map((st) =>
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

                  {batchData.length >= 1 ? (
                    <>
                      {batchData &&
                        batchData.map((st) => (
                          <>
                            <div className={`mt-2 ${styles.notifycontent}`}>
                              <Link
                                to={`/insuserprofile/${params.id}`}
                              >
                                <img
                                  src={
                                    insData.photoId === "1"
                                      ? "/images/institute-avatar.jpeg"
                                      : first
                                      ? `${requestURL}/insprofileabout/photo/${insData.insProfilePhoto}`
                                      : null
                                  }
                                  height="50px"
                                  width="50px"
                                  // className="img-fluid"
                                />
                              </Link>
                              <p style={{ letterSpacing: "1px" }}>
                                Id Card For 
                                <strong className="mx-1">
                                  {` ${st.batchName} `}
                                </strong>
                                is 
                                <strong className="mx-1">
                                  {` ${st.idCardStatus ? st.idCardStatus : 'Pending'} `}
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
                </div>
              )}
            </div>
            <div className={`col col-xl-3 ${styles.rightside}`}>
              <InstituteStats id={params.id} />
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
              <InstituteAnnouncementCard id={params.id} />
            </div>
          </div>
        </div>
      </div>
      <NavbarBottomInstitute id={params.id} />
    </>
  );
};

export default InstituteNotification;