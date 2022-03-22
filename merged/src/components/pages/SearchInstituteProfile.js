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
import ReactPlayer from "react-player";

const SearchInstituteProfile = () => {
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

  const InsUnFollowHandler = (id) => {
    axios
      .put(`${requestURL}/unfollow-ins`, {
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

  const InsUnSaveHandler = (id) => {
    axios
      .post(`${requestURL}/ins/unsave/post`, {
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
                      <a
                        onClick={() => {
                          InsUnFollowHandler(searchprofileData._id);
                        }}
                      >
                        UnFollow
                      </a>
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
                  <span>
                  <img
                    src="/images/department-menu-icon.svg"
                    alt="user"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Menu"
                  />                   
            </span>
                  <span
                    onClick={() =>
                      navigate(
                        `/search/${params.sid}/ins-search-profile/info/${params.id}`
                      )
                    }
                  >
                <img src="/images/info-icon.svg" title="Info" />
                  </span>
                </p>
                {searchprofilePostData &&
                  searchprofilePostData.map((st) =>
                    st.CreatePostStatus === "Private" ? (
                      ""
                    ) : (
                      <div
                        className={`${styles.about}`}
                        style={{ marginBottom: "30px" }}
                      >
                        <p className={styles.dashIcon}>
                          <div className={`mx-3 ${styles.topcell}`}>
                            <div className="d-flex">
                              <div className="postUserImg">
                                {searchprofileData && (
                                  <img
                                    className={styles.insUserProfile}
                                    src={
                                      searchprofileData.photoId === "1"
                                        ? "/images/institute-avatar.jpeg"
                                        : `${requestURL}/insprofileabout/photo/${searchprofileData.insProfilePhoto}`
                                    }
                                    // src="/images/blank-profile.png"
                                  />
                                )}
                              </div>
                              <div className={`d-flex flex-column text-left`}>
                                <small className={`col ${styles.insUserName}`}>
                                  {searchprofileData.insName}
                                </small>
                                <p className={`my-0 ${styles.dashIcon}`}>
                                  <span>
                                    <small
                                      className={`col ${styles.insUserAt}`}
                                    >
                                      {format(st.createdAt)}
                                    </small>
                                  </span>
                                </p>
                              </div>
                            </div>
                            <span className={styles.threes}>
                              <img
                                src="/images/ecllipse-icon.svg"
                                alt="user"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Menu"
                              />
                            </span>
                          </div>
                          {/* <span className="mx-3">Name of the User</span> */}
                        </p>
                        <p
                          className={` px-3 ${styles.dashIcon}`}
                          style={{
                            wordBreak: "break-all",
                            whiteSpace: "break-spaces",
                          }}
                        >
                          {st.CreateInsPost ? st.CreateInsPost : null}
                        </p>

                        {st.imageId === "0" ? (
                  <div className={`${styles.dashIcon} ${styles.imageBox}`}>
                    <img
                      className={`img-fluid`}
                      src={`${requestURL}/insdashboard/ins-post/images/${st.CreateImage}`}
                      alt="not found"
                    />
                  </div>
                ) : st.CreateVideo ? (
                  <div className={`${styles.dashIcon} ${styles.imageBox}`} style={{width: '810px'}}>
                    <ReactPlayer
                      url={`${requestURL}/insdashboard/ins-post/video/${st.CreateVideo}`}
                      controls={true}
                    />
                  </div>
                ) : (
                  ""
                )}
                        <div
                          className={` d-flex  mx-3 justify-content-between ${styles.reactionsCount}`}
                        >
                          <p>
                            <img
                              src="/images/like-icon.svg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Like"
                            />
                            {st.insLike
                              ? ` ${st.insLike.length + st.insUserLike.length}`
                              : ""}
                          </p>
                          <p>{st.comment ? st.comment.length : ""} comments</p>
                        </div>
                        <div className={styles.socialReactions}>
                          {st.insLike &&
                          st.insLike.length >= 1 &&
                          st.insLike.some(
                            (et) => et._id === searchInsprofileData._id
                          ) ? (
                            <button
                              onClick={() => {
                                UnLikeHandler(st._id);
                              }}
                            >
                              <img
                                src="/images/liked-icon.svg"
                                alt="user"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Liked"
                              />
                              <span>Liked</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                LikeHandler(st._id);
                              }}
                            >
                              <img
                                src="/images/like-icon.svg"
                                alt="user"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Like"
                              />
                              <span>Like</span>
                            </button>
                          )}
                          <button
                            onClick={() => {
                              InstCommentListHandler(st._id);
                            }}
                          >
                            <img
                              src="/images/comment-icon.svg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Comment"
                            />
                            <span>Comment</span>
                          </button>
                          <button>
                            <img
                              src="/images/share-icon.svg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Share"
                            />
                            <span>Share</span>
                          </button>
                          {searchInsprofileData &&
                          searchInsprofileData.saveInsPost.some(
                            (et) => et._id === st._id
                          ) ? (
                            <button
                              onClick={() => {
                                InsUnSaveHandler(st._id);
                              }}
                            >
                              <img
                                src="/images/saved-icon.svg"
                                alt="user"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Saved"
                              />
                              <span>Saved</span>
                            </button>
                          ) : (
                            <button
                              id={`saveIns${st._id}`}
                              onClick={() => {
                                InsSaveHandler(st._id);
                              }}
                            >
                              <img
                                src="/images/save-icon.svg"
                                alt="user"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Save"
                              />
                              <span>Save</span>
                            </button>
                          )}
                        </div>

                        <div
                          className={` ${styles.commentsContainer}`}
                          id={`commentInstListInput${st._id}`}
                          style={{ display: "none" }}
                        >
                          <div className={styles.commentBox}>
                            <div className={styles.postUserImg}>
                              <img
                                className={styles.insUserProfile}
                                src="https://themes.pixelstrap.com/friendbook/assets/images/user/3.jpg"
                              />
                            </div>
                            <div className={styles.commentInput}>
                              <form>
                                <div className="row">
                                  <div className="col-10">
                                    <div class="form-group">
                                      <input
                                        type="text"
                                        class="form-control"
                                        name="commentDesc"
                                        id={`comment${st._id}`}
                                        placeholder="Leave your thoughts here"
                                        onChange={CommentDataHandler}
                                        onKeyDown={(e) =>
                                          e.key === "Enter" &&
                                          CommentDataHandlerChange(st._id)
                                        }
                                        // required
                                      />
                                    </div>
                                  </div>
                                  <div className="col-1">
                                    <a
                                      onClick={() => {
                                        CommentDataHandlerChange(st._id);
                                      }}
                                      style={{ display: "flex" }}
                                    >
                                      <img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/000000/external-send-user-interface-kmg-design-glyph-kmg-design.png" />
                                    </a>
                                  </div>
                                </div>
                                {/* <button type="button" className="btn btn-danger" >Send</button> */}
                              </form>
                            </div>
                          </div>
                          <div className="d-flex justify-content-start px-4 my-2"></div>
                          <div className={`${styles.commentCollections} mt-3`}>
                            {st.comment && st.comment.length >= 1
                              ? st.comment.map((et) =>
                                  et.institutes && et.institutes ? (
                                    <article className={styles.commentItem}>
                                      <div className={styles.postUserImg}>
                                      <img
                                        className={styles.insUserProfile}
                                        src={
                                          et.institutes.photoId === "1"
                                          ? "/images/institute-avatar.jpeg"
                                          : first
                                          ? `${requestURL}/insprofileabout/photo/${et.institutes.insProfilePhoto}`
                                          : null
                                        }
                                        alt="not found"
                                      />
                                      </div>
                                      <div>
                                        <div className={styles.postUserComment}>
                                          <div>
                                            <div className=" w-100 d-flex justify-content-between mx-2">
                                              <h6>
                                                {et.institutes
                                                  ? et.institutes
                                                  : ""}
                                              </h6>
                                              <p>
                                                {format(et ? et.createdAt : "")}{" "}
                                                &nbsp;{" "}
                                                <img
                                                  src="/images/ecllipse-icon.svg"
                                                  alt="user"
                                                  data-toggle="tooltip"
                                                  data-placement="bottom"
                                                  title="Menu"
                                                />
                                              </p>
                                            </div>
                                            {/* <small>Institute name and location</small> */}
                                          </div>
                                          <div
                                            className={`${styles.commentBody} mx-2`}
                                          >
                                            <p>{et ? et.commentDesc : ""}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </article>
                                  ) : et.instituteUser && et.instituteUser ? (
                                    <article
                                      className={`${styles.commentItem}`}
                                      style={{ marginLeft: "100px" }}
                                    >
                                      <div className={styles.postUserImg}>
                                        <img
                                          className={styles.insUserProfile}
                                          src="/images/image-boy2.png"
                                        />
                                      </div>
                                      <div>
                                        <div className={styles.postUserComment}>
                                          <div>
                                            <div className=" w-100 d-flex justify-content-between">
                                              <h6>
                                                {et.instituteUser
                                                  ? et.instituteUser
                                                  : ""}
                                              </h6>
                                              <p>
                                                {format(et ? et.createdAt : "")}{" "}
                                                &nbsp;{" "}
                                                <img
                                                  src="/images/ecllipse-icon.svg"
                                                  alt="user"
                                                  data-toggle="tooltip"
                                                  data-placement="bottom"
                                                  title="Menu"
                                                />
                                              </p>
                                            </div>
                                            {/* <small>Institute name and location</small> */}
                                          </div>
                                          <div className={styles.commentBody}>
                                            <p>{et ? et.commentDesc : ""}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </article>
                                  ) : (
                                    ""
                                  )
                                )
                              : ""}
                          </div>
                        </div>
                      </div>
                    )
                  )}
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

export default SearchInstituteProfile;
