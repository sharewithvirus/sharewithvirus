import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { format } from "timeago.js";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import NavbarTopInstitute from "../NavbarTopInstitute";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import InstituteAnnouncementCard from "../InstituteAnnouncementCard";
import moment from "moment";

const SearchInstituteProfileInfo = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [searchFollowers, setSearchFollowers] = useState([]);
  const [searchFollowing, setSearchFollowing] = useState([]);
  const [searchprofileData, setSearchProfileData] = useState("");
  const [searchprofilePostData, setSearchProfilePostData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [studentData, setStudentData] = useState([]);

  const [searchInsprofileData, setInsProfileData] = useState("");
  const [first, setFirst] = useState(false);

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.sid}`)
      .then((res) => {
        setInsProfileData(res.data.institute);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => {
        setSearchProfileData(res.data.institute);
        setSearchProfilePostData(res.data.institute.posts);
        setSearchFollowers(res.data.institute.followers);
        setSearchFollowing(res.data.institute.following);
        setStaffData(res.data.institute.ApproveStaff);
        setStudentData(res.data.institute.ApproveStudent);
        setFirst(true);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);
  // }, [searchprofileData]);

  const InsFollowHandler = (id) => {
    axios
      .put(`${requestURL}/follow-ins`, {
        followId: id,
      })
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const LikeHandler = (id) => {
    axios
      .post(`${requestURL}/post/like`, {
        postId: id,
      })
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const UnLikeHandler = (id) => {
    axios
      .post(`${requestURL}/post/unlike`, {
        postId: id,
      })
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const [commentData, setCommentData] = useState({
    commentDesc: "",
  });

  const CommentDataHandler = (e) => {
    const { name, value } = e.target;
    setCommentData({
      ...commentData,
      [name]: value,
    });
  };

  const CommentDataHandlerChange = (ccid) => {
    // e.preventDefault()
    axios
      .post(`${requestURL}/post/comments/${ccid}`, commentData)
      .then((res) => {
        if (
          res.data.message === "Successfully Commented" &&
          res.status == 200
        ) {
          // navigate(`/insdashboard/${params.id}`)
        } else {
          alert("something went wrong");
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    const comment = document.querySelector(`#comment${ccid}`);
    comment.value = "";
  };

  const InstCommentListHandler = (id) => {
    const commentInput = document.querySelector(`#commentInstListInput${id}`);

    commentInput.style.display = "block";
  };

  const InsSaveHandler = (id) => {
    axios
      .post(`${requestURL}/ins/save/post`, {
        postId: id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  };

  return (
    <>
      <div className={`${styles.mainScreen} ${styles.profilePage}`}>
        <NavbarTopInstitute id={params.sid} />
        <div className={styles.mainContent}>
          <div className={styles.profileDisplay}>
            <div className="mt-4">
              <div className={`${styles.profilecover} `}>
                <img
                  src={
                    searchprofileData.coverId === "2"
                      ? "/images/user-ins-cover-photo2.jpg"
                      : first
                      ? `${requestURL}/insprofileabout/coverphoto/${searchprofileData.insProfileCoverPhoto}`
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
                    searchprofileData.photoId === "1"
                      ? "/images/institute-avatar.jpeg"
                      : first
                      ? `${requestURL}/insprofileabout/photo/${searchprofileData.insProfilePhoto}`
                      : null
                  }
                  alt="profile"
                />
              </div>
              <div className={styles.additionalProfileBtn}>
                <button type="submit" className="btn btn-primary ">
                  {
                    searchFollowers.length >= 1 &&
                    searchFollowers.some(
                      (et) => et._id === searchInsprofileData._id
                    ) ? (
                      "Following"
                    ) : (
                      <a
                        onClick={() => {
                          InsFollowHandler(searchprofileData._id);
                        }}
                      >
                        Follow
                      </a>
                    )
                    // <i>Follow</i>
                  }
                </button>
              </div>
            </div>
            <div className={styles.bar}>
              <div className={styles.barMainrow}>
                <div
                  className={`col col-xl-4  ${styles.barOrder2} ${styles.barInner} `}
                >
                  <div className={` ${styles.barInnersLeft}`}>
                    <p>{searchprofilePostData.length}</p>
                    <p>Posts</p>
                  </div>
                  <div
                    className={` ${styles.barInnersLeft} ${styles.barLeftShort}`}
                  >
                    <p>{searchFollowers.length}</p>
                    <p>Followers</p>
                  </div>
                  <div
                    className={` ${styles.barInnersLeft} ${styles.barRightShort} `}
                  >
                    <p>{searchFollowing.length}</p>
                    <p>Following</p>
                  </div>
                  <div className={`${styles.barInnersLeft}`}>
                    <p>{staffData.length + studentData.length}</p>
                    <p>Joined</p>
                  </div>
                </div>
                <div
                  className={`col col-xl-4   ${styles.barOrder1} ${styles.barInner} `}
                >
                  <div className={`w-100 ${styles.barInnerCenter}`}>
                    <p className={` ${styles.profileName}`}>
                      {searchprofileData.insName}
                    </p>
                    <p>
                      <span>
                        <span style={{ fontSize: "15px" }}>
                          {searchprofileData.name}
                        </span>
                      </span>
                    </p>
                  </div>
                  {/* <div className={styles.barInners}><i class="fas fa-search mt-1 mx-2"></i><input type="text" name="search" placeholder="Search Here..."/></div> */}
                </div>
                <div
                  className={`col col-xl-4 ${styles.barOrder3} ${styles.barInner}`}
                >
                  <div
                    className={styles.barInnersRight}
                    onClick={() =>
                      navigate(`/${params.sid}/insdepartment/${params.id}`)
                    }
                  >
                    <p>
                    <img
                      src="/images/department-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Department"
                    />                    
                    </p>
                    <p>Departments</p>
                  </div>
                  <div className={styles.barInnersRight}>
                    <p>
                    <img
                      src="/images/admission-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Admission"
                    />
                    </p>
                    <p>Admissions</p>
                  </div>
                  <div
                    className={styles.barInnersRight}
                    onClick={() =>
                      navigate(`/${params.sid}/allstaff/${params.id}`)
                    }
                  >
                    <p>
                    <img
                      src="/images/staff-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Staff"
                    />
                    </p>
                    <p>Staff</p>
                  </div>
                  <div className={styles.barInnersRight}>
                    <p>
                    <img
                      src="/images/student-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Student"
                    />
                    </p>
                    <p>Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className={`col col-lg-4 col-xl-3  ${styles.leftside}`}>
              {/* <ProfileSidebar /> */}
              <div className={styles.leftBar}>
                <div className={`${styles.about} ${styles.leftMenu}`}>
                  <div className={styles.dabout}>
                    <img
                      src="/images/operating-admin-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Operating Admin"
                    />
                    {searchprofileData.insOperatingAdmin
                      ? searchprofileData.insOperatingAdmin
                      : "Operating Admin"}
                  </div>
                  <div className={styles.dabout}>
                    <img
                      src="/images/principal-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Principal"
                    />
                    {searchprofileData.insPrinciple
                      ? searchprofileData.insPrinciple
                      : "Principal"}
                  </div>
                  <div className={styles.dabout}>
                    <img
                      src="/images/student-president-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Student President"
                    />
                    {searchprofileData.insStudentPresident
                      ? searchprofileData.insStudentPresident
                      : "Student President"}
                  </div>
                  <div className={styles.dabout}>
                    <img
                      src="/images/chairman-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Chairman"
                    />
                    {searchprofileData.insTrusty
                      ? searchprofileData.insTrusty
                      : "Chairman"}
                  </div>
                  <div className={styles.dabout}>
                    <img
                      src="/images/admin-clerk-icon.svg"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Admin Clerk"
                    />
                    {searchprofileData.insAdminClerk
                      ? searchprofileData.insAdminClerk
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
                  <span
                    onClick={() =>
                      navigate(
                        `/search/${params.sid}/ins-search-profile/${params.id}`
                      )
                    }
                  >
                    <img
                    src="/images/department-menu-icon.svg"
                    alt="user"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Menu"
                  />  
                  </span>
                  <span>
                  <img src="/images/info-icon.svg" title="Info" />

                  </span>
                </p>
                <div className={styles.about}>
                  <form>
                    <div className="m-4">
                      <div className="col-12 mb-3">
                        <label htmlFor="pestdate" className="form-group mb-1">
                          Institute Registration Date
                        </label>
                        <input
                          type="text"
                          name="insEstdDate"
                          className="form-control"
                          id="pestdate"
                          value={moment(searchprofileData.insRegDate).format(
                            "DD-MM-YYYY"
                          )}
                          disabled
                          readonly
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="pestdate" className="form-group mb-1">
                          Institute Establishment Date
                        </label>
                        <input
                          type="text"
                          name="insEstdDate"
                          className="form-control"
                          id="pestdate"
                          value={moment(searchprofileData.insEstdDate).format(
                            "DD-MM-YYYY"
                          )}
                          disabled
                          readonly
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="paffliated" className="form-group mb-1">
                          Affliated University/Autonomous
                        </label>
                        <input
                          type="text"
                          name="insAffiliated"
                          className="form-control"
                          id="paffliated"
                          value={searchprofileData.insAffiliated}
                          disabled
                          readonly
                        />
                      </div>

                      <div className="col-12 mb-3">
                        <label htmlFor="pachieve" className="form-group mb-1">
                          Achievements
                        </label>
                        <textarea
                          type="text"
                          name="insAchievement"
                          className="form-control"
                          id="pachieve"
                          rows="2"
                          cols="30"
                          value={searchprofileData.insAchievement}
                          disabled
                          readonly
                          style={{ resize: "none" }}
                        ></textarea>
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="pregdates" className="form-group mb-1">
                          Institute Mobile No.
                        </label>
                        <input
                          type="text"
                          name="insEditableText"
                          className="form-control"
                          id="pregdates"
                          value={searchprofileData.insPhoneNumber}
                          disabled
                          readonly
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label
                          htmlFor="pregdateText"
                          className="form-group mb-1"
                        >
                          Institute Email Id
                        </label>
                        <input
                          type="text"
                          name="insEditableTexts"
                          className="form-control"
                          id="pregdateText"
                          value={searchprofileData.insEmail}
                          disabled
                          readonly
                        />
                      </div>
                    </div>
                  </form>
                </div>
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
              <InstituteAnnouncementCard id={params.id} />
            </div>
          </div>
        </div>
        <NavbarBottomInstitute id={params.sid} />
      </div>
    </>
  );
};

export default SearchInstituteProfileInfo;
