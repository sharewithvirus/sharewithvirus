import React, { useState } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "./ReqUrl";
import { format } from "timeago.js";
import NewUserVisibityPopUp from './NewUserVisibilityPopUp';
import NewInsVisibityPopUp from './NewInsVisibilityPopUp'
import NewInsReportPopUp from './NewInsReportPopUp'
import ReactPlayer from 'react-player'

const PostDisplay = (props) => {
  const [showComment, setShowComment] = useState(true);
  const [data, setData] = useState(true);
  const [addClass, setAddClass] = useState(false);
  const [addUsersClass, setAddUsersClass] = useState(false);
  const [dataIns, setInsData] = useState(true);
  const [addInsClass, setAddInsClass] = useState(false);
  const [insLogin, setInsLogin] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

  const setAddClassFunction = () => {
    setAddClass(false);
    setData(true);
  };

  const setAddUsersClassFunction = () => {
    setAddUsersClass(false);
  };

  const setAddInsClassFunction = () => {
    setAddInsClass(false);
    setInsData(true);
  };


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
    // const commentDot = document.querySelector('#commentDot')
    // const commentFill = document.querySelector('#commentFill')
    commentInput.style.display = "block";
    // commentDot.style.display = 'none'
    // commentFill.style.display = 'block'
  };

  // const InstCommentListHideHandler = (id) => {
  //   const commentInput = document.querySelector(`#commentInstListInput${id}`);
  //   const commentDot = document.querySelector('#commentDot')
  //   const commentFill = document.querySelector('#commentFill')
  //   commentInput.style.display = "none";
  //   commentDot.style.display = 'block'
  //   commentFill.style.display = 'none'
  // };

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

  const UserUnSaveHandler = (id) => {
    axios
      .post(`${requestURL}/user/unsave/post`, {
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

  const InsUnSaveHandler = (id) => {
    axios
      .post(`${requestURL}/ins/unsave/post`, {
        postId: id,
      })
      .then((res) => {
        props.onShowPost(true);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
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

  const DeleteUserPostHandler = (id) =>{
    axios.delete(`${requestURL}/userdashboard/${props.uid ? props.uid : ''}/user-post/${id}`)
    .then((res) =>{
      props.onShowPost(true);
    })
  }

  const InsPostDataDivHandler = (id) =>{
    const div = document.querySelector(`#editIns${id}`)
    div.style.display = 'none'
  }

  const UnHideInsVisibilty = (id) =>{
    const div = document.querySelector(`#editIns${id}`)
    const image = document.querySelector(`#imageIns${id}`)
    const images = document.querySelector(`#imagesIns${id}`)
    images.style.display = 'none'
    div.style.display = 'block'
    image.style.display = 'inline'
  }
  const HideInsVisibilty = (id) =>{
    const div = document.querySelector(`#editIns${id}`)
    const image = document.querySelector(`#imageIns${id}`)
    const images = document.querySelector(`#imagesIns${id}`)
    images.style.display = 'inline'
    div.style.display = 'none'
    image.style.display = 'none'
  }

  const DeleteInsPostHandler = (id) =>{
    axios.delete(`${requestURL}/insdashboard/${props.id ? props.id : ''}/ins-post/${id}`)
    .then((res) =>{
      props.onShowPost(true);
    })
  }
  
  return (
    <>
      {/* {insLogin.showMessages ? <Success msg={insLogin.msg} /> : null} */}
      {props.postData && props.data
        ? props.postData &&
          props.postData.map((st) =>
            st.CreatePostStatus === "Private" ? (
              ""
            ) : (
              <div
                className={`${styles.about}`}
                style={{ marginBottom: "15px" }}
                key={st._id}
              >
                <div className={styles.dashIcon}>
                  <div className={`mx-3 ${styles.topcell}`}
                  >
                    <div className="d-flex"
                    onClick={() => {InsPostDataDivHandler(st._id)}}
                    >
                      <div className="postUserImg">
                        <img
                          className={styles.insUserProfile}
                          src={
                            props.data.photoId === "1"
                              ? "/images/institute-avatar.jpeg"
                              : `${requestURL}/insprofileabout/photo/${props.data.insProfilePhoto}`
                          }
                          alt="institute avatar"
                        />
                      </div>
                      <div className={`d-flex flex-column text-left`}>
                        <small className={`col ${styles.insUserName}`}>
                          {props.data.insName}
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
                    {/* <span className={styles.threes}> */}
                    {props.iid && props.uuid ? 
                    <>
                   <span className={styles.threes}>
                    <div id={`edit${st._id}`} className={styles.postEditDeleteData}
                    style={{display: 'none',position: 'absolute',backgroundColor: 'lightgray',top: 'inherit',left: 'inherit',padding: '3px',
                      marginLeft: '-88px',marginTop: '2px',borderRadius: '7px',width: '7%',textAlign: 'center'
                    }}
                    >
                      <ul className={styles.postEditDelete}>
                        <li className={styles.postEditDeleteText} style={{margin: '10px'}}
                        onClick={() => {
                          setAddUsersClass(true);
                        }}
                        >Report</li>
                        {
                          <NewInsReportPopUp 
                          setAddUsersClassFunction={setAddUsersClassFunction}
                          trigger={addUsersClass}
                          setTrigger={setAddUsersClass}
                          id={props.uuid} 
                          PostId={st._id}
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
                    </>
                    : 
                    <>
                    <span className={styles.threes}>
                    <div id={`editIns${st._id}`} className={styles.postEditInsDeleteData}
                    style={{display: 'none',position: 'absolute',backgroundColor: 'lightgray',top: 'inherit',left: 'inherit',padding: '3px',
                      marginLeft: '-88px',marginTop: '2px',borderRadius: '7px',width: '7%',height: '83px',textAlign: 'center'
                    }}
                    >
                      <ul className={styles.postEditInsDelete}>
                        <li className={styles.postEditInsDeleteText} style={{margin: '10px'}}
                        onClick={() => {
                          setAddInsClass(true);
                        }}
                        >Edit</li>
                        {
                          <NewInsVisibityPopUp 
                          setAddInsClassFunction={setAddInsClassFunction}
                          trigger={addInsClass}
                          setTrigger={setAddInsClass}
                          id={props.id} 
                          postId={st._id}
                          onShowInsPost={props.onShowPost}
                          />
                        }
                        <hr style={{margin: '0px'}}/>
                        <li className={styles.postEditDeleteText} style={{margin: '10px'}}
                        onClick={() => {DeleteInsPostHandler(st._id)}}
                        >Delete</li>
                      </ul>
                    </div>

                    <img
                      src="/images/ecllipse-icon.svg"
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      id={`imagesIns${st._id}`}
                      title="Menu"
                      onClick={() => {UnHideInsVisibilty(st._id)}}
                    />
                    <img
                      src="/images/ecllipse-icon.svg"
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      id={`imageIns${st._id}`}
                      title="Menu"
                      style={{display: 'none'}}
                      onClick={() => {HideInsVisibilty(st._id)}}
                    /> 
                    {/* </span> */}
                    </span>
                    </>
                  }
                  </div>
                  {/* <span className="mx-3">Name of the User</span> */}
                </div>
                <p className={` mt-3 px-3 ${styles.dashIcon}`} style={{wordBreak: 'break-all', whiteSpace: 'break-spaces'}}>
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
                  {props.iid ? (
                    st.insUserLike &&
                    st.insUserLike.length >= 1 &&
                    st.insUserLike.some((et) => et._id === props.uuid) ? (
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
                    )
                  ) : st.insLike &&
                    st.insLike.length >= 1 &&
                    st.insLike.some((et) => et._id === props.data._id) ? (
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
                  {/* <button 
                  id={"commentFill"}
                            onClick={() => {
                              InstCommentListHideHandler(st._id);
                            }}
                            style={{display: 'none !important'}}
                          >
                          <i class="fas fa-comment-dots"></i>
                            <span>Comment</span>
                          </button> */}
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
                  {props.iid ? (
                    props.userData &&
                    props.userData.saveUserInsPost.some(
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
                    )
                  ) : props.data &&
                    props.data.saveInsPost.some((et) => et._id === st._id) ? (
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
                        src={
                          props.data.photoId === "1"
                            ? "/images/institute-avatar.jpeg"
                            : `${requestURL}/insprofileabout/photo/${props.data.insProfilePhoto}`
                        }
                        alt="not found"
                      />
                    </div>
                    <div className={styles.commentInput}>
                      <form>
                        <div className="row">
                          <div
                            className="col-11"
                            style={{ width: "99.66666667%" }}
                          >
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
                          <div
                            className={`col-1 ${styles.postDisplayCommentIcon}`}
                          >
                            <a
                              onClick={() => {
                                CommentDataHandlerChange(st._id);
                              }}
                              style={{ display: "flex" }}
                            >
                              <img
                                src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/000000/external-send-user-interface-kmg-design-glyph-kmg-design.png"
                                alt="not found"
                              />
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
                              <div style={{ width: "100%" }}>
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
                              <div style={{ width: "100%" }}>
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
        : props.userPostData &&
          props.userPostData.map((st) =>
            st.userPostStatus === "Private" ? (
              ""
            ) : (
              <div
                className={styles.about}
                style={{ marginBottom: "15px" }}
                key={st._id}
              >
                <div className={styles.dashIcon}>
                  <div className={`mx-3 ${styles.topcell}`}
                  >
                    <div className="d-flex"
                    onClick={() => {PostDataDivHandler(st._id)}}
                    >
                      <div className="postUserImg">
                        <img
                          className={styles.insUserProfile}
                          src={
                            props.userdata.photoId === "1"
                              ? "/images/image-boy2.png"
                              : `${requestURL}/userprofileabout/photo/${props.userdata.profilePhoto}`
                          }
                          alt="not found"
                        />
                      </div>
                      <div className={`d-flex flex-column text-left`}>
                        <small className={`col ${styles.insUserName}`}>
                          {props.userdata.userLegalName}
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
                    <div id={`edit${st._id}`} className={styles.postEditDeleteData}
                    style={{display: 'none',position: 'absolute',backgroundColor: 'lightgray',top: 'inherit',left: 'inherit',padding: '3px',
                      marginLeft: '-88px',marginTop: '2px',borderRadius: '7px',width: '7%',height: '83px',textAlign: 'center'
                    }}
                    >
                      <ul className={styles.postEditDelete}>
                        <li className={styles.postEditDeleteText} style={{margin: '10px'}}
                        onClick={() => {
                          setAddClass(true);
                        }}
                        >Edit</li>
                        {
                          <NewUserVisibityPopUp 
                          setAddClassFunction={setAddClassFunction}
                          trigger={addClass}
                          setTrigger={setAddClass}
                          uid={props.uid} 
                          userPostId={st._id}
                          onShowPost={props.onShowPost}
                          />
                        }
                        <hr style={{margin: '0px'}}/>
                        <li className={styles.postEditDeleteText} style={{margin: '10px'}}
                        onClick={() => {DeleteUserPostHandler(st._id)}}
                        >Delete</li>
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
                </div>

                <p className={` px-3 py-2 ${styles.dashIcon}`} style={{wordBreak: 'break-all', whiteSpace: 'break-spaces'}}>
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
                      ? ` ${st.userlike.length + st.userlikeIns.length}`
                      : ""}
                  </p>
                  <p>{st.userComment ? st.userComment.length : ""} comments</p>
                </div>
                <div className={styles.socialReactions}>
                  {st.userlike &&
                  st.userlike.length >= 1 &&
                  st.userlike.some((et) => et._id === props.userdata._id) ? (
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
                      title="Liked"
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
                  {props.userdata &&
                  props.userdata.saveUsersPost.some(
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
                        src={
                          props.userdata.photoId === "1"
                            ? "/images/image-boy2.png"
                            : `${requestURL}/userprofileabout/photo/${props.userdata.profilePhoto}`
                        }
                        alt="not found"
                      />
                    </div>
                    <div className={styles.commentInput}>
                      <form>
                        <div className="row">
                          <div
                            className="col-11"
                            style={{ width: "99.66666667%" }}
                          >
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                name="userCommentDesc"
                                id={`usercomment${st._id}`}
                                placeholder="Leave your thoughts here"
                                onChange={UserCommentDataHandler}
                                onKeyPress={(e) =>{
                                  e.key === "Enter" &&
                                  UserCommentDataHandlerChange(st._id)
                                }}
                                // required
                              />
                            </div>
                          </div>
                          <div
                            className={`col-1 ${styles.postDisplayCommentIcon}`}
                          >
                            <a
                              onClick={() => {
                                UserCommentDataHandlerChange(st._id);
                              }}
                              style={{ display: "flex" }}
                            >
                              <img
                                src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/000000/external-send-user-interface-kmg-design-glyph-kmg-design.png"
                                alt="not found"
                              />
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
                              <div style={{ width: "100%" }}>
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
            )
          )}
    </>
  );
};

export default PostDisplay;
