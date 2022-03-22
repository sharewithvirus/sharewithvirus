import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import ProfileSidebar from "../ProfileSidebar";
import PostDisplay from "../PostDisplay";
// import ProfileSections from "../ProfileSections";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Success } from "../SnackBar";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import ProfileDetailsSearchBar from "../ProfileDetailsSearchBar";
import InstituteAnnouncementCard from "../InstituteAnnouncementCard";

const InstituteSearchCopy = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [searchInsData, setSearchInsData] = useState("");
  const [searchInsPostData, setSearchInsPostData] = useState([]);
  const [searchInsAnnData, setSearchInsAnnData] = useState([]);
  const [searchInsFollowers, setSearchInsFollowers] = useState([]);
  const [searchInsFollowing, setSearchInsFollowing] = useState([]);
  const [searchUserList, setSearchUserList] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [userStaffData, setUserStaffData] = useState([]);
  const [userStudentData, setUserStudentData] = useState([]);
  const [usersData, setUsersData] = useState("");
  const [first, setFirst] = useState(false);
  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.iid}`)
      .then((res) => {
        setSearchInsData(res.data.institute);
        setSearchInsPostData(res.data.institute.posts);
        setSearchInsAnnData(res.data.institute.announcement);
        setSearchInsFollowers(res.data.institute.followers);
        setSearchInsFollowing(res.data.institute.following);
        setSearchUserList(res.data.institute.userFollowersList);
        setStaffData(res.data.institute.ApproveStaff);
        setStudentData(res.data.institute.ApproveStudent);
        setFirst(true);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  // }, []);
  }, [searchInsData]);

  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) => {
        setUsersData(res.data.user);
        setUserStaffData(res.data.user.staff);
        setUserStudentData(res.data.user.student);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  // }, []);
  }, [usersData]);

  const UserInsFollowHandler = (id) => {
    axios
      .put(`${requestURL}/user/follow-ins/institute`, {
        InsfollowId: id,
      })
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const UserInsUnFollowHandler = (id) => {
    axios
      .put(`${requestURL}/user/unfollow/institute`, {
        InsfollowId: id,
      })
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  return (
    <>
      <div className={`${styles.mainScreen} ${styles.profilePage}`}>
        <NavbarTopUser uid={params.id} />
        <div className={styles.mainContent}>
          {/* <BackButton /> */}
          <div className={styles.profileDisplay}>
            <div className="mt-4">
              <div className={`${styles.profilecover} `}>
                <img
                  src={
                    searchInsData.coverId === "2"
                      ? "/images/user-ins-cover-photo2.jpg"
                      : first
                      ? `${requestURL}/insprofileabout/coverphoto/${searchInsData.insProfileCoverPhoto}`
                      : null
                  }
                  alt="cover-image"
                  className={`img-fluid ${styles.imageDiaplayCover}`}
                />
              </div>
              <div className={styles.profilecoverImage}>
                <img
                  className={`img-fluid `}
                  src={
                    searchInsData.photoId === "1"
                      ? "/images/institute-avatar.jpeg"
                      : first
                      ? `${requestURL}/insprofileabout/photo/${searchInsData.insProfilePhoto}`
                      : null
                  }
                  alt="profile"
                />
              </div>
              <div className={styles.additionalProfileBtn}>
                {userStaffData.length !== 0 || userStudentData.length !== 0 ? (
                  <button type="submit" className="btn btn-primary ">
                    {userStaffData.length >= 0
                      ? userStaffData.map((st) =>
                          st.staffStatus === "Not Approved" ? (
                            "Requested"
                          ) : userStaffData.length >= 1 &&
                            userStaffData.some(
                              (et) => et.institute._id === params.iid
                            ) ? (
                            "Joined"
                          ) : (
                            <a
                              onClick={() =>
                                navigate(
                                  `/user/${params.id}/insjoinandapply/${params.iid}`
                                )
                              }
                            >
                              Join / Apply
                            </a>
                          )
                        )
                      : ""}

                    {userStudentData.length >= 0
                      ? userStudentData.map((st) =>
                          st.studentStatus === "Not Approved" ? (
                            "Requested"
                          ) : userStudentData.length >= 1 &&
                            userStudentData.some(
                              (et) => et.institute._id === params.iid
                            ) ? (
                            "Joined"
                          ) : (
                            <a
                              onClick={() =>
                                navigate(
                                  `/user/${params.id}/insjoinandapply/${params.iid}`
                                )
                              }
                            >
                              Join / Apply
                            </a>
                          )
                        )
                      : ""}
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    <a
                      onClick={() =>
                        navigate(
                          `/user/${params.id}/insjoinandapply/${params.iid}`
                        )
                      }
                    >
                      Join / Apply
                    </a>
                  </button>
                )}

                <button type="submit" className="btn btn-primary ">
                  {searchUserList.length >= 1 &&
                  searchUserList.some((et) => et._id === params.id) ? (
                    <a
                      onClick={() => {
                        UserInsUnFollowHandler(params.iid);
                      }}
                    >
                      Unfollow
                    </a>
                  ) : (
                    <a
                      onClick={() => {
                        UserInsFollowHandler(params.iid);
                      }}
                    >
                      Follow
                    </a>
                  )}
                </button>
              </div>
            </div>

            <ProfileDetailsSearchBar
              followers={searchInsFollowers}
              following={searchInsFollowing}
              profilePost={searchInsPostData}
              profileText={searchInsData}
              userFollow={searchUserList}
              joinedStaff={staffData.length >= 1 ? staffData.length : ""}
              joinedStudent={studentData.length >= 1 ? studentData.length : 0}
              id={params.iid}
              uuid={params.id}
            />
          </div>

          <div className="row">
            <div className={`col col-lg-4 col-xl-3  ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <div className={`${styles.about} ${styles.leftMenu}`}>
                  <div className={styles.dabout}>
                    <img
                      src="/images/operating-admin-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Operating Admin"
                    />
                    {searchInsData.insOperatingAdmin
                      ? searchInsData.insOperatingAdmin
                      : "Operating Admin"}
                  </div>
                  <div className={styles.dabout}>
                    <img
                      src="/images/principal-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Principal"
                    />
                    {searchInsData.insPrinciple
                      ? searchInsData.insPrinciple
                      : "Principal"}
                  </div>
                  <div className={styles.dabout}>
                    <img
                      src="/images/student-president-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Student President"
                    />
                    {searchInsData.insStudentPresident
                      ? searchInsData.insStudentPresident
                      : "Student President"}
                  </div>
                  <div className={styles.dabout}>
                    <img
                      src="/images/chairman-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Chairman"
                    />
                    {searchInsData.insTrusty
                      ? searchInsData.insTrusty
                      : "Chairman"}
                  </div>
                  <div className={styles.dabout}>
                    <img
                      src="/images/admin-clerk-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Admin Clerk"
                    />
                    {searchInsData.insAdminClerk
                      ? searchInsData.insAdminClerk
                      : "Admin Clerk"}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`col col-md-11 col-lg-8 col-xl-6 mx-auto ${styles.midside}`}
            >
              <div
                className={`${styles.about} ${styles.wrapper}`}
                style={{ marginTop: "0" }}
              >
                <p
                  className={` mt-4 ${styles.dashIcon} ${styles.dashIconsInner}`}
                >
                  <span>
                  <img
                    src="/images/department-menu-icon.svg"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Department"
                  />                  
              </span>
                  <span
                    onClick={() =>
                      navigate(
                        `/user/${params.id}/search/insdashboard/info/${params.iid}`
                      )
                    }
                  >
                    <img
                      src="/images/info-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Info"
                    />
                  </span>
                </p>
                <PostDisplay
                  postData={searchInsPostData ? searchInsPostData : ""}
                  data={searchInsData ? searchInsData : ""}
                  userData={usersData}
                  first={first}
                  iid={params.iid}
                  uuid={params.id}
                />
              </div>
            </div>
            <div className={`col col-xl-3 ${styles.rightside}`}>
              <img
                src="/images/announcement-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Announcement"
                style={{ marginTop: "40px" }}
              />
              <InstituteAnnouncementCard id={params.iid} />
            </div>
          </div>
        </div>
        <NavbarBottomUser uid={params.id} />
      </div>
    </>
  );
};

export default InstituteSearchCopy;
