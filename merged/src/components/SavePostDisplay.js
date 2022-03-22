import React, { useState, useEffect } from 'react'
import styles from './Home.module.css'
import { requestURL } from './ReqUrl'
import axios from 'axios'
import { format } from 'timeago.js'


const SavePostDisplay = (props) =>{
    const [first, setFirst] = useState(false)
    const [userPostData, setUserPostData] = useState("");
    const [userInsPostData, setUserInsPostData] = useState([]);

    useEffect(() => {
        axios
          .get(`${requestURL}/userdashboard/${props.uid ? props.uid : ''}`)
          .then((res) => {
            setUserPostData(res.data.user.saveUsersPost);
            setUserInsPostData(res.data.user.saveUserInsPost);
            setFirst(true)
          })
          .catch((e) => {
            console.log("Something went wrong")
          });
      }, []);

      
    return (
        <>
            { userPostData ? 
            userPostData && userPostData.map((st) => (
            <div className={styles.about} style={{ marginBottom: "30px" }} key={st._id}>
                <p className={styles.dashIcon}>
                  <div className={`mx-3 ${styles.topcell}`}>
                    <div className="d-flex">
                      <div className="postUserImg">
                        <img
                          className={styles.insUserProfile}
                          src={
                            st.user.photoId === "1"
                              ? "/images/image-boy2.png"
                              : 
                              first 
                              ? `${requestURL}/userprofileabout/photo/${st.user.profilePhoto}`
                              : null
                          }
                          alt="not found"
                        />
                      </div>
                      <div className={`d-flex flex-column text-left`}>
                        <small className={`col ${styles.insUserName}`}>
                          {st.user.userLegalName}
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
                      <img src="https://img.icons8.com/plumpy/25/000000/menu-2.png" alt="not found"/>
                    </span>
                  </div>
                </p>
                
                <p className={` px-3 ${styles.dashIcon}`}>
                  {st.userCreateInsPost ? st.userCreateInsPost : null}
                </p>
                {st.imageId === "0" ? (
                  <div className={`${styles.dashIcon} ${styles.imageBox}`}>
                    <img
                      className={`img-fluid`}
                      src={`${requestURL}/userdashboard/user-post/images/${st.userCreateImage}`}
                    />
                  </div>
                ) : null}
                {st.userCreateVideo ? (
                  <div className={`${styles.dashIcon} ${styles.imageBox}`}>
                    <iframe
                      height="400"
                      width="610"
                      src={st.userCreateVideo}
                      id={st._id}
                    ></iframe>
                  </div>
                ) : (
                  ""
                )}

                <div
                  className={` d-flex  mx-3 justify-content-between ${styles.reactionsCount}`}
                >
                  <p>
                    <i class="fas fa-thumbs-up" style={{color: 'blue'}}></i>
                    {st.userlike
                      ? ` ${st.userlike.length + st.userlikeIns}`
                      : ""}
                  </p>
                  <p>{st.userComment ? st.userComment.length : ""} comments</p>
                </div>
                <div className={styles.socialReactions}>
                    {/* <button
                    //   onClick={() => {
                    //     UserUnLikeHandler(st._id);
                    //   }}
                    >
                      <i class="fas fa-thumbs-up" style={{color: 'blue'}}></i>
                      <span>Liked</span>
                    </button>
                  ) : ( */}
                    <button
                      id={`userLike${st._id}`}
                    //   onClick={() => {
                    //     UserLikeHandler(st._id);
                    //   }}
                    >
                      <i class="far fa-thumbs-up"></i>
                      <span>Like</span>
                    </button>

                  <button
                    // onClick={() => {
                    //   CommentListHandler(st._id);
                    // }}
                  >
                    <i class="far fa-comment-dots"></i>
                    <span>Comment</span>
                  </button>
                  <button>
                  <i class="fas fa-share-alt"></i>
                    <span>Share</span>
                  </button>
                  {/* {st.user &&
                  props.userdata.saveUsersPost.some(
                    (et) => et._id === st._id
                  ) ? ( */}
                    <button >
                      <i class="fas fa-bookmark" style={{color: 'blue'}}></i>

                      <span>Saved</span>
                    </button>
                  {/* ) : ( */}
                    
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
                        // src={
                        //   props.userdata.photoId === "1"
                        //     ? "/images/image-boy2.png"
                        //     : `${requestURL}/userprofileabout/photo/${props.userdata.profilePhoto}`
                        // }
                        // alt="not found"
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
                                // onChange={UserCommentDataHandler}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-1">
                            <a
                            //   onClick={() => {
                            //     UserCommentDataHandlerChange(st._id);
                            //   }}
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
                                  src="/images/image-boy2.png"
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
                                        <i className="fas fa-ellipsis-h"></i>
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
            )) : '' }
            
            {userInsPostData ? 
            userInsPostData && userInsPostData.map((st) =>(
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
                            st.institute.photoId === "1"
                              ? "/images/institute-avatar.jpeg"
                              : 
                              first 
                              ? `${requestURL}/insprofileabout/photo/${st.institute.insProfilePhoto}`
                              : null
                          }
                          alt="institute avatar"
                        />
                      </div>
                      <div className={`d-flex flex-column text-left`}>
                        <small className={`col ${styles.insUserName}`}>
                          {st.institute.insName}
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
                      <img src="https://img.icons8.com/plumpy/25/000000/menu-2.png" alt="not found"/>
                    </span>
                  </div>
                  {/* <span className="mx-3">Name of the User</span> */}
                </p>
                <p className={` px-3 ${styles.dashIcon}`}>
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
                ) : null}
                {st.CreateVideo ? (
                  <div className={`${styles.dashIcon} ${styles.imageBox}`}>
                    <iframe
                      height="400"
                      width="610"
                      src={st.CreateVideo}
                      id={st._id}
                    ></iframe>
                  </div>
                ) : (
                  ""
                )}

                <div
                  className={` d-flex  mx-3 justify-content-between ${styles.reactionsCount}`}
                >
                  <p>
                    <i class="fas fa-thumbs-up" style={{color: 'blue'}}></i>
                    {st.insLike
                      ? ` ${st.insLike.length + st.insUserLike.length}`
                      : ""}
                  </p>
                  <p>{st.comment ? st.comment.length : ""} comments</p>
                </div>
                <div className={styles.socialReactions}>
                  
                      <button
                        // onClick={() => {
                        //   LikeHandler(st._id);
                        // }}
                      >
                        <i class="far fa-thumbs-up"></i>
                        <span>Like</span>
                      </button>
                  <button
                  // id={"commentDot"}
                    // onClick={() => {
                    //   InstCommentListHandler(st._id);
                    // }}
                  >
                  <i class="far fa-comment-dots"></i>
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
                  <i class="fas fa-share-alt"></i>
                    <span>Share</span>
                  </button>
                  {/* {props.iid ? (
                    props.userData &&
                    props.userData.saveUserInsPost.some(
                      (et) => et._id !== st._id
                    ) ? ( */}
                      <button>
                        <i class="fas fa-bookmark" style={{color: 'blue'}}></i>
                        <span>Saved</span>
                      </button>                      
                
                  
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
                        // src={
                        //   props.data.photoId === "1"
                        //     ? "/images/institute-avatar.jpeg"
                        //     : `${requestURL}/insprofileabout/photo/${props.data.insProfilePhoto}`
                        // }                        
                        // alt="not found"
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
                                // onChange={CommentDataHandler}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-1">
                            <a
                              
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
                                  src="/images/image-boy2.png"
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
                                        {/* <i className="fas fa-ellipsis-h"></i> */}
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
                                  src="/images/image-boy2.png"
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
                                        <i className="fas fa-ellipsis-h"></i>
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
            )) : ''
            }
        </>
    )
}
export default SavePostDisplay