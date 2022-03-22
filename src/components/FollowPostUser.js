import React, { useState } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "./ReqUrl";
import { format } from "timeago.js";
import ReactPlayer from 'react-player'

const FollowPostUser = (props) => {
  const [showComment, setShowComment] = useState(true);
  const [insLogin, setInsLogin] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

  const LikeHandler = (id) => {
    axios
      .post(`${requestURL}/post/like`, {
        postId: id,
      })
      .then((res) => {
        if (res.data.message) {
          props.onShowPost(true);
          setInsLogin({ showMessages: true, msg: res.data.message });
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const UnLikeHandler = (id) => {
    axios
      .post(`${requestURL}/post/unlike`, {
        postId: id,
      })
      .then((res) => {
        props.onShowPost(true);
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
      .then((res) => {
        if (res.data.message) {
          setInsLogin({ showMessages: true, msg: res.data.message });
          props.onShowPost(true);
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const UserUnLikeHandler = (id) => {
    axios
      .post(`${requestURL}/user/post/unlike`, {
        postId: id,
      })
      .then((res) => {
        props.onShowPost(true);
      })
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
    axios
      .post(`${requestURL}/user/post/comments/${cid}`, userCommentData)
      .then((res) => {
        if (
          res.data.message === "Successfully Commented" &&
          res.status == 200
        ) {
          props.onShowPost(true);
        } else {
          alert("something went wrong");
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    const usercomment = document.querySelector(`#usercomment${cid}`);
    usercomment.value = "";
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
    axios
      .post(`${requestURL}/post/comments/${ccid}`, commentData)
      .then((res) => {
        if (
          res.data.message === "Successfully Commented" &&
          res.status == 200
        ) {
          props.onShowPost(true);
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
        props.onShowPost(true);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  };

  const InsSaveHandler = (id) => {
    axios
      .post(`${requestURL}/ins/save/post`, {
        postId: id,
      })
      .then((res) => {
        props.onShowPost(true);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  };

  return (
    <>
      {/* {insLogin.showMessages ? <Success msg={insLogin.msg} /> : null} */}
      {props.instituteFollow 
        ? props.instituteFollow &&
          props.instituteFollow.map((at) =>
            at.posts.map((st) => (
            st.CreatePostStatus === "Private" ? (
              ""
            ) : (
              <div
                className={`${styles.about}`}
                style={{ marginBottom: "30px" }}
                key={st._id}
              >
                <p className={styles.dashIcon}>
                  <div className={`mx-3 ${styles.topcell}`}>
                    <div className="d-flex">
                      <div className="postUserImg">
                        <img
                          className={styles.insUserProfile}
                          src={
                            at.photoId === "1"
                              ? "/images/institute-avatar.jpeg"
                              : `${requestURL}/insprofileabout/photo/${at.insProfilePhoto}`
                          }
                          alt="institute avatar"
                        />
                      </div>
                      <div className={`d-flex flex-column text-left`}>
                        <small className={`col ${styles.insUserName}`}>
                          {at.insName}
                        </small>
                        <p className={`my-0 ${styles.dashIcon}`}>
                          <span>
                            <small className={`col ${styles.insUserAt}`}>
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
                <p className={` px-3 ${styles.dashIcon}`} style={{wordBreak: 'break-all', whiteSpace: 'break-spaces'}}>
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
                    st.insLike.some((et) => et._id === at._id) ? (
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
                  // id={"commentDot"}
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
                      
                    { at &&
                    at.saveInsPost.some((et) => et._id === st._id) ? (
                    <button >
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
                        src={
                          at.photoId === "1"
                            ? "/images/institute-avatar.jpeg"
                            : `${requestURL}/insprofileabout/photo/${at.insProfilePhoto}`
                        }                        
                        alt="not found"
                      />
                    </div>
                    <div className={styles.commentInput}>
                      <form>
                        <div className="row">
                          <div className="col-10">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
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
                              <img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/000000/external-send-user-interface-kmg-design-glyph-kmg-design.png" alt="not found" />
                            </a>
                          </div>
                        </div>
                        {/* <button type="button" className="btn btn-danger" >Send</button> */}
                      </form>
                    </div>
                  </div>
                  <div className="d-flex justify-content-start px-4 my-2">
                    {/* <button type="button"> */}
                      {/* Most Recent <i className="fas fa-sort-down mx-1"></i> */}
                    {/* </button> */}
                  </div>
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
                                    : props.first
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
                                        {et.institutes ? et.institutes : ""}
                                      </h6>
                                      <p>
                                        {format(et ? et.createdAt : "")} &nbsp;{" "}
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
                                  <div className={`${styles.commentBody} mx-2`}>
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
                                  src={
                                    et.instituteUser.photoId === "1"
                                    ? "/images/profile.jpeg"
                                    : props.first
                                    ? `${requestURL}/userprofileabout/photo/${et.instituteUser.profilePhoto}`
                                    : null
                                  }
                                  alt="not found"
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
                                        {format(et ? et.createdAt : "")} &nbsp;{" "}
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
          )
            ))
        : props.userFollow ?
          // props.userFollow &&
          props.parentalData && props.parentalData >= 13 ? 
          props.userFollow.map((ut) =>
            ut.userPosts.map((st) => (
            st.userPostStatus === "Private" ? (
              ""
            ) : (
              <div className={styles.about} style={{ marginBottom: "30px" }} key={st._id}>
                <p className={styles.dashIcon}>
                  <div className={`mx-3 ${styles.topcell}`}>
                    <div className="d-flex">
                      <div className="postUserImg">
                        <img
                          className={styles.insUserProfile}
                          src={
                            ut.photoId === "1"
                              ? "/images/image-boy2.png"
                              : `${requestURL}/userprofileabout/photo/${ut.profilePhoto}`
                          }
                          alt="not found"
                        />
                      </div>
                      <div className={`d-flex flex-column text-left`}>
                        <small className={`col ${styles.insUserName}`}>
                          {ut.userLegalName}
                        </small>
                        <p className={`my-0 ${styles.dashIcon}`}>
                          <span>
                            <small className={`col ${styles.insUserAt}`}>
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
                </p>
                
                <p className={` px-3 ${styles.dashIcon}`} style={{wordBreak: 'break-all', whiteSpace: 'break-spaces'}}>
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
                  <p>{st.userComment ? st.userComment.length : ""} comments</p>
                </div>
                <div className={styles.socialReactions}>
                  {st.userlike &&
                  st.userlike.length >= 1 &&
                  st.userlike.some((et) => et._id === ut._id) ? (
                    // 'liked' : 'like'
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
                  {ut &&
                  ut.saveUsersPost.some(
                    (et) => et._id === st._id
                  ) ? (
                    <button >
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
                        src={
                          ut.photoId === "1"
                            ? "/images/image-boy2.png"
                            : `${requestURL}/userprofileabout/photo/${ut.profilePhoto}`
                        }
                        alt="not found"
                      />
                    </div>
                    <div className={styles.commentInput}>
                      <form>
                        <div className="row">
                          <div className="col-10">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                name="userCommentDesc"
                                id={`usercomment${st._id}`}
                                placeholder="Leave your thoughts here"
                                onChange={UserCommentDataHandler}
                                required
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
                              <img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/000000/external-send-user-interface-kmg-design-glyph-kmg-design.png" alt="not found"/>
                            </a>
                          </div>
                        </div>
                        {/* <button type="button" className="btn btn-danger" >Send</button> */}
                      </form>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end px-4 my-2">
                    {/* <button type="button">
                      Most Recent <i className="fas fa-sort-down mx-1"></i>
                    </button> */}
                  </div>
                  <div className={`${styles.commentCollections} mt-3`}>
                    {st.userComment && st.userComment.length >= 1
                      ? st.userComment.map((et) =>
                          
                            et.users && et.users ? (
                            <article className={styles.commentItem}>
                              <div className={styles.postUserImg}>
                              <img
                                  className={styles.insUserProfile}
                                  src={
                                    et.users.photoId === "1"
                                    ? "/images/profile.jpeg"
                                    : props.first
                                    ? `${requestURL}/userprofileabout/photo/${et.users.profilePhoto}`
                                    : null
                                  }
                                  alt="not found"
                                />
                              </div>
                              <div>
                                <div className={styles.postUserComment}>
                                  <div>
                                    <div className=" w-100 d-flex justify-content-between">
                                      <h6>{et.users ? et.users : ""}</h6>
                                      <p>
                                        {format(et ? et.createdAt : "")} &nbsp;{" "}
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
                                    <p>{et ? et.userCommentDesc : ""}</p>
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
            )))
          ) : 
          ''
          : ''}
    </>
  );
};

export default FollowPostUser;
