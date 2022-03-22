import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import { format } from "timeago.js";
import UserAnnouncementCard from "../UserAnnouncementCard";
import NewUserReportPopUp from '../NewUserReportPopUp'
import ReactPlayer from "react-player";

const SearchUserProfile = () => {
  const params = useParams();
  const [searchFollowers, setSearchFollowers] = useState([]);
  const [searchFollowing, setSearchFollowing] = useState([]);
  const [searchprofileData, setSearchProfileData] = useState("");
  const [addClass, setAddClass] = useState(false);
  const [searchprofilePostData, setSearchProfilePostData] = useState([]);
  const [searchCircle, setSearchCircle] = useState([]);
  const [searchInsprofileData, setInsProfileData] = useState("");
  const [first, setFirst] = useState(false);
  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.sid}`)
      .then((res) => {
        setInsProfileData(res.data.user);
      })
      .catch((e) => {
        console.log("something went wrong");
      });
    axios
      .get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) => {
        setSearchProfileData(res.data.user);
        setSearchProfilePostData(res.data.user.userPosts);
        setSearchFollowers(res.data.user.userFollowers);
        setSearchFollowing(res.data.user.userFollowing);
        setSearchCircle(res.data.user.userCircle);
        setFirst(true);
      })
      .catch((e) => {
        console.log("something went wrong");
      });
  // }, []);
  }, [searchprofileData]);

  const UserFollowHandler = (id) => {
    axios
      .put(`${requestURL}/user/follow-ins`, {
        userFollowId: id,
      })
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const UserCircleHandler = (id) => {
    axios
      .put(`${requestURL}/user/circle-ins`, {
        followId: id,
      })
      .then((res) => {
        setTimeout(() => {}, 100);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const UserUnCircleHandler = (id) => {
    axios
      .put(`${requestURL}/user/uncircle-ins`, {
        followId: id,
      })
      .then((res) => {
        setTimeout(() => {}, 100);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const UserLikeHandler = (id) => {
    axios
      .post(`${requestURL}/user/post/like`, {
        postId: id,
      })
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const UserUnLikeHandler = (id) => {
    axios
      .post(`${requestURL}/user/post/unlike`, {
        postId: id,
      })
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const [userCommentData, setUserCommentData] = useState({
    userCommentDesc: "",
  });

  const UserCommentDataHandler = (e) => {
    const { name, value } = e.target;
    setUserCommentData({
      ...userCommentData,
      [name]: value,
    });
  };

  const UserCommentDataHandlerChange = (cid) => {
    // e.preventDefault()
    axios
      .post(`${requestURL}/user/post/comments/${cid}`, userCommentData)
      .then((res) => {
        if (
          res.data.message === "Successfully Commented" &&
          res.status == 200
        ) {
          // navigate(`/userdashboard/${params.id}`)
        } else {
          console.log("something went wrong");
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    const usercomment = document.querySelector(`#usercomment${cid}`);
    usercomment.value = "";
  };

  const CommentListHandler = (id) => {
    const commentInput = document.querySelector(`#commentListInput${id}`);
    commentInput.style.display = "block";
  };

  const UserSaveHandler = (id) => {
    axios
      .post(`${requestURL}/user/save/post`, {
        postId: id,
      })
      .then((res) => {
        // alert(res.data.message)
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  };

  const UserUnSaveHandler = (id) => {
    axios
      .post(`${requestURL}/user/unsave/post`, {
        postId: id,
      })
      .then((res) => {
        // alert(res.data.message)
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  };

  const setAddClassFunction = () => {
    setAddClass(false);
  };

  const UnHideVisibilty = (id) =>{
    const div = document.querySelector(`#edit${id}`)
    const image = document.querySelector(`#image${id}`)
    const images = document.querySelector(`#images${id}`)
    images.style.display = 'none'
    div.style.display = 'block'
    image.style.display = 'inline'
  }
  const HideVisibilty = (id) =>{
    const div = document.querySelector(`#edit${id}`)
    const image = document.querySelector(`#image${id}`)
    const images = document.querySelector(`#images${id}`)
    images.style.display = 'inline'
    div.style.display = 'none'
    image.style.display = 'none'
  }

  const PostDataDivHandler = (id) =>{
    const div = document.querySelector(`#edit${id}`)
    div.style.display = 'none'
  }

  return (
    <>
      <div className={`${styles.mainScreen} ${styles.profilePage}`}>
        <NavbarTopUser uid={params.sid} />
        <div className={styles.mainContent}>
          {/* <BackButton /> */}
          <div className={styles.profileDisplay}>
            <div className="mt-4">
              <div className={`${styles.profilecover} `}>
                <img
                  src={
                    searchprofileData.coverId === "2"
                      ? "/images/user-ins-cover-photo.jpg"
                      : first
                      ? `${requestURL}/userprofileabout/coverphoto/${searchprofileData.profileCoverPhoto}`
                      : null
                  }
                  alt="cover-image"
                  className={`img-fluid ${styles.imageDiaplayCover}`}
                />
              </div>
              <div className={styles.profilecoverImage}>
                <img
                  className={`img-fluid`}
                  src={
                    searchprofileData.photoId === "1"
                      ? "/images/image-boy2.png"
                      : first
                      ? `${requestURL}/userprofileabout/photo/${searchprofileData.profilePhoto}`
                      : null
                  }
                  alt="profile"
                />
              </div>
              <div className={styles.additionalProfileBtn}>
                {searchFollowers.length >= 1 &&
                searchFollowers.some(
                  (et) => et._id === searchInsprofileData._id
                ) ? (
                  <button className="btn btn-secondary px-5">Following</button>
                ) : (
                  <button type="submit" className="btn btn-primary ">
                    {searchFollowing.length >= 1 &&
                    searchFollowing.some(
                      (et) => et._id === searchInsprofileData._id
                    ) ? (
                      searchCircle.some(
                        (et) => et._id === searchInsprofileData._id
                      ) ? (
                        <a
                        
                        >
                          Circled
                        </a>
                      ) : (
                        <a
                          onClick={() => {
                            UserCircleHandler(searchprofileData._id);
                          }}
                        >
                          Add To Circle
                        </a>
                      )
                    ) : searchCircle.some(
                        (et) => et._id === searchInsprofileData._id
                      ) ? (
                        <a
                        onClick={() => {
                          UserUnCircleHandler(searchprofileData._id);
                        }}
                        >Circled</a>

                    ) : (
                      <a
                        onClick={() => {
                          UserFollowHandler(searchprofileData._id);
                        }}
                      >
                        Follow
                      </a>
                    )}
                  </button>
                )}
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
                    <p>{searchCircle.length}</p>
                    <p>Circle</p>
                  </div>
                </div>
                <div
                  className={`col col-xl-4   ${styles.barOrder1} ${styles.barInner} `}
                >
                  <div className={`w-100 ${styles.barInnerCenter}`}>
                    <p className={` ${styles.profileName}`}>
                      {searchprofileData.userLegalName}
                    </p>
                    <p>
                      <span style={{ fontSize: "15px" }}>
                        <span>{searchprofileData.username}</span>
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className={`col col-xl-4 ${styles.barOrder3} ${styles.barInner}`}
                >
                  {searchprofileData.userAbout ? (
                    <div className={`${styles.barInnersRight}`}>
                      <p>
                        {searchprofileData.userAbout
                          ? searchprofileData.userAbout.substr(0, 138)
                          : "About"}
                      </p>
                    </div>
                  ) : (
                    <div className={`${styles.barInnersRight} mx-auto`}>
                      <p>
                        {searchprofileData.userAbout
                          ? searchprofileData.userAbout.substr(0, 138)
                          : "About"}
                      </p>
                    </div>
                  )}
                  {/* <div className={styles.barInnersRight}>
                    <p>
                      <i class="fas fa-landmark mt-1 mx-2"></i>
                    </p>
                    <p>KYC</p>
                  </div> */}
                  {/* <div className={styles.barInnersRight}>
                    <p>
                      <i class="fas fa-chalkboard-teacher mt-1 mx-1"></i>
                    </p>
                    <p>Joined</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className={`col col-lg-4 col-xl-3  ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <div className={`${styles.about} ${styles.leftMenu}`}>
                <div className={styles.dabout}>
            <img
              src="/images/favourites-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Favourites"
            /> Saved Post
        </div>
          <div className={styles.dabout}>
            <img
              src="/images/language-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Language"
            /> Language
        </div>
        <div className={styles.dabout}>
            <img
              src="/images/support-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Support"
            /> Support
        </div>
        <div className={styles.dabout}>
            <img
              src="/images/about-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="About Us"
            /> About Us
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
                {/* <ProfileSections id={params.id}/> */}

                {searchprofilePostData &&
                  searchprofilePostData.map((st) =>
                    st.userPostStatus === "Private" ? (
                      ""
                    ) : (
                      <div
                        className={styles.about}
                        style={{ marginBottom: "30px" }}
                      >
                        <p className={styles.dashIcon}>
                          <div className={`mx-3 ${styles.topcell}`}>
                            <div className="d-flex"
                            onClick={() => {PostDataDivHandler(st._id)}}
                            >
                              <div className="postUserImg">
                                {searchprofileData && (
                                  <img
                                    className={styles.insUserProfile}
                                    src={
                                      searchprofileData.photoId === "1"
                                        ? "/images/image-boy2.png"
                                        : `${requestURL}/userprofileabout/photo/${searchprofileData.profilePhoto}`
                                    }
                                    // src="/images/blank-profile.png"
                                  />
                                )}
                              </div>
                              <div className={`d-flex flex-column text-left`}>
                                <small className={`col ${styles.insUserName}`}>
                                  {searchprofileData.userLegalName}
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
                            <div id={`edit${st._id}`} className={styles.postEditDeleteData}
                    style={{display: 'none',position: 'absolute',backgroundColor: 'lightgray',top: 'inherit',left: 'inherit',padding: '3px',
                      marginLeft: '-88px',marginTop: '2px',borderRadius: '7px',width: '7%',textAlign: 'center'
                    }}
                    >
                      <ul className={styles.postEditDelete}>
                        <li className={styles.postEditDeleteText} style={{margin: '10px'}}
                        onClick={() => {
                          setAddClass(true);
                        }}
                        >Report</li>
                        {
                          <NewUserReportPopUp 
                          setAddClassFunction={setAddClassFunction}
                          trigger={addClass}
                          setTrigger={setAddClass}
                          uid={params.sid} 
                          userPostId={st._id}
                          />
                        }
                      </ul>
                    </div>

                    <img
                      src="/images/ecllipse-icon.svg"
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      id={`images${st._id}`}
                      title="Menu"
                      onClick={() => {UnHideVisibilty(st._id)}}
                    />
                    <img
                      src="/images/ecllipse-icon.svg"
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      id={`image${st._id}`}
                      title="Menu"
                      style={{display: 'none'}}
                      onClick={() => {HideVisibilty(st._id)}}
                    /> 
                            </span>
                          </div>
                        </p>
                        <p
                          className={` px-3 ${styles.dashIcon}`}
                          style={{
                            wordBreak: "break-all",
                            whiteSpace: "break-spaces",
                          }}
                        >
                          {st.userCreateInsPost ? st.userCreateInsPost : null}
                        </p>
                        {st.imageId === "0" ? (
                  <div className={`${styles.dashIcon} ${styles.imageBox}`}>
                    <img
                      className={`img-fluid`}
                      src={`${requestURL}/userdashboard/user-post/images/${st.userCreateImage}`}
                    />
                  </div>
                ) : st.userCreateVideo ? (
                  <div className={`${styles.dashIcon} ${styles.imageBox}`} style={{width: '810px'}}>
                    <ReactPlayer
                      url={`${requestURL}/userdashboard/user-post/video/${st.userCreateVideo}`}
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
                            {st.userlike
                              ? ` ${st.userlike.length + st.userlikeIns}`
                              : ""}
                          </p>
                          <p>
                            {st.userComment ? st.userComment.length : ""}{" "}
                            comments
                          </p>
                        </div>
                        <div className={styles.socialReactions}>
                          {st.userlike &&
                          st.userlike.length >= 1 &&
                          st.userlike.some(
                            (et) => et._id === searchInsprofileData._id
                          ) ? (
                            <button
                              onClick={() => {
                                UserUnLikeHandler(st._id);
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
                              id={`userLike${st._id}`}
                              onClick={() => {
                                UserLikeHandler(st._id);
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
                              CommentListHandler(st._id);
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
                          searchInsprofileData.saveUsersPost.some(
                            (et) => et._id === st._id
                          ) ? (
                            <button
                              onClick={() => {
                                UserUnSaveHandler(st._id);
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
                              onClick={() => {
                                UserSaveHandler(st._id);
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
                        {/* <p >Post</p> */}

                        <div
                          className={` ${styles.commentsContainer}`}
                          id={`commentListInput${st._id}`}
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
                                        name="userCommentDesc"
                                        id={`usercomment${st._id}`}
                                        placeholder="Leave your thoughts here"
                                        onChange={UserCommentDataHandler}
                                        onKeyDown={(e) =>
                                          e.key === "Enter" &&
                                          UserCommentDataHandlerChange(st._id)
                                        }

                                        // required
                                      />
                                    </div>
                                  </div>
                                  <div className="col-1">
                                    <a
                                      onClick={() => {
                                        UserCommentDataHandlerChange(st._id);
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
                          <div className="d-flex justify-content-end px-4 my-2"></div>
                          <div className={`${styles.commentCollections} mt-3`}>
                            {st.userComment && st.userComment.length >= 1
                              ? st.userComment.map((et) =>
                                  et.userInstitute && et.userInstitute ? (
                                    <article
                                      className={styles.commentItem}
                                      style={{ marginLeft: "100px" }}
                                    >
                                      <div className={styles.postUserImg}>
                                      <img
                                        className={styles.insUserProfile}
                                        src={
                                          et.userInstitute.photoId === "1"
                                          ? "/images/profile.jpeg"
                                          : first
                                          ? `${requestURL}/userprofileabout/photo/${et.userInstitute.profilePhoto}`
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
                                                {et.userInstitute
                                                  ? et.userInstitute
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
                                            <p>
                                              {et ? et.userCommentDesc : ""}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </article>
                                  ) : et.users && et.users ? (
                                    <article className={styles.commentItem}>
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
                                                {et.users ? et.users : ""}
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
                                            <p>
                                              {et ? et.userCommentDesc : ""}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </article>
                                  ) : (
                                    ""
                                  )
                                )
                              : "View"}
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
                alt="user"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Announcement"
                style={{ marginTop: "40px" }}
              />{" "}
              <UserAnnouncementCard uid={params.id} />
            </div>
          </div>
        </div>
        <NavbarBottomUser uid={params.sid} />
      </div>
    </>
  );
};

export default SearchUserProfile;
