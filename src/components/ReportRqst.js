import React from 'react'
import styles from './Home.module.css'
import { requestURL } from './ReqUrl'
import "bootstrap/dist/css/bootstrap.min.css";
import { format } from 'timeago.js'
import moment from 'moment';

const ReportRqst = (props) =>{
    return (
        <>
        { props.rData && props.rData.map((rt) => (
            rt.reportUserPost ? 
            <div className={styles.about} style={{ marginBottom: "15px" }} key={rt.reportUserPost._id}>
                <div className={styles.dashIcon}>
                  <div className={`mx-3 ${styles.topcell}`}>
                    <div className="d-flex">
                      <div className="postUserImg">
                        <img
                          className={styles.insUserProfile}
                          src={
                            rt.reportBy.photoId === "1"
                              ? "/images/image-boy2.png"
                              : `${requestURL}/userprofileabout/photo/${rt.reportBy.profilePhoto}`
                          }
                          alt="not found"
                        />
                      </div>
                      <div className={`d-flex flex-column text-left`}>
                        <small className={`col ${styles.insUserName}`}>
                          {`${rt.reportUserPost.user.userLegalName} (Reported By - ${rt.reportBy.userLegalName} / status - ${rt.reportStatus})`}
                        </small>
                        <p className={`my-0 ${styles.dashIcon}`}>
                          <span>
                            <small className={`col ${styles.insUserAt}`}>
                              {format(rt.reportUserPost.createdAt)}
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
                      id={`image${rt.reportUserPost._id}`}
                      title="Menu"
                    /> 
                    </span>
                    
                </div>
            </div>

                <p className={` px-3 py-2 ${styles.dashIcon}`} style={{wordBreak: 'break-all', whiteSpace: 'break-spaces'}}>
                  {rt.reportUserPost.userCreateInsPost ? rt.reportUserPost.userCreateInsPost : null}
                </p>
                {rt.reportUserPost.imageId === "0" ? (
                  <div className={`${styles.dashIcon} ${styles.imageBox}`}>
                    <img
                      className={`img-fluid`}
                      src={`${requestURL}/userdashboard/user-post/images/${rt.reportUserPost.userCreateImage}`}
                    />
                  </div>
                ) : null}
                {rt.reportUserPost.userCreateVideo ? (
                  <div className={`${styles.dashIcon} ${styles.imageBox}`}>
                    <iframe
                      height="400"
                      width="610"
                      src={rt.reportUserPost.userCreateVideo}
                      id={rt.reportUserPost._id}
                    ></iframe>
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
                    {rt.reportUserPost.userlike
                      ? ` ${rt.reportUserPost.userlike.length + rt.reportUserPost.userlikeIns.length}`
                      : ""}
                  </p>
                  <p>{rt.reportUserPost.userComment ? rt.reportUserPost.userComment.length : ""} comments</p>
                </div>
                <div className={styles.socialReactions}>
                    <button
                      id={`userLike${rt.reportUserPost._id}`}
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
                  <button
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
                    <button
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
                </div>
                  </div>
             : rt.reportInsPost ? 
             <div className={styles.about} style={{ marginBottom: "15px" }} key={rt.reportInsPost._id}>
             <div className={styles.dashIcon}>
               <div className={`mx-3 ${styles.topcell}`}>
                 <div className="d-flex">
                   <div className="postUserImg">
                     <img
                       className={styles.insUserProfile}
                       src={
                         rt.reportBy.photoId === "1"
                           ? "/images/image-boy2.png"
                           : `${requestURL}/userprofileabout/photo/${rt.reportBy.profilePhoto}`
                       }
                       alt="not found"
                     />
                   </div>
                   <div className={`d-flex flex-column text-left`}>
                     <small className={`col ${styles.insUserName}`}>
                       {`${rt.reportInsPost.institute.insName} (Reported By - ${rt.reportBy.userLegalName} / status - ${rt.reportStatus})`}
                     </small>
                     <p className={`my-0 ${styles.dashIcon}`}>
                       <span>
                         <small className={`col ${styles.insUserAt}`}>
                           {format(rt.reportInsPost.createdAt)}
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
                   id={`image${rt.reportInsPost._id}`}
                   title="Menu"
                 /> 
                 </span>
                 
             </div>
         </div>

             <p className={` px-3 py-2 ${styles.dashIcon}`} style={{wordBreak: 'break-all', whiteSpace: 'break-spaces'}}>
               {rt.reportInsPost.CreateInsPost ? rt.reportInsPost.CreateInsPost : null}
             </p>
             {rt.reportInsPost.imageId === "0" ? (
               <div className={`${styles.dashIcon} ${styles.imageBox}`}>
                 <img
                   className={`img-fluid`}
                   src={`${requestURL}/insdashboard/ins-post/images/${rt.reportInsPost.CreateImage}`}
                   />
               </div>
             ) : null}
             {rt.reportInsPost.CreateVideo ? (
               <div className={`${styles.dashIcon} ${styles.imageBox}`}>
                 <iframe
                   height="400"
                   width="610"
                   src={rt.reportInsPost.CreateVideo}
                   id={rt.reportInsPost._id}
                 ></iframe>
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
                 {rt.reportInsPost.insLike
                   ? ` ${rt.reportInsPost.insLike.length + rt.reportInsPost.insUserLike.length}`
                   : ""}
               </p>
               <p>{rt.reportInsPost.comment ? rt.reportInsPost.comment.length : ""} comments</p>
             </div>
             <div className={styles.socialReactions}>
                 <button
                   id={`userLike${rt.reportInsPost._id}`}
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
               <button
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
                 <button
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
             </div>
               </div>
                

             : ''))}
        </>
    )
}

export default ReportRqst