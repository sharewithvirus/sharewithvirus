import React, { useState, useEffect } from 'react'
import styles from './Home.module.css'
import { requestURL } from './ReqUrl'
import axios from 'axios'
import { format } from 'timeago.js'


const SaveInsPostDisplay = (props) =>{
    const [first, setFirst] = useState(false)
    const [userInsPostData, setUserInsPostData] = useState([]);

    useEffect(() => {
        axios
          .get(`${requestURL}/insdashboard/${props.id ? props.id : ''}`)
          .then((res) => {
            setUserInsPostData(res.data.institute.saveInsPost);
            setFirst(true)
          })
          .catch((e) => {
            console.log("Something went wrong")
          });
      }, []);

    return (
        <>  
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
                      >
                        <i class="far fa-thumbs-up"></i>
                        <span>Like</span>
                      </button>
                  <button
                  >
                  <i class="far fa-comment-dots"></i>
                    <span>Comment</span>
                  </button>
                  <button>
                  <i class="fas fa-share-alt"></i>
                    <span>Share</span>
                  </button>
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
                      </form>
                    </div>
                  </div>
                  <div className="d-flex justify-content-start px-4 my-2">
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
                                      </p>
                                    </div>
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
export default SaveInsPostDisplay