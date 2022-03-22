import React, { useState } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreatePostSection from "./CreatePostSection";
import CreatePostSectionUser from "./CreatePostSectionUser";
import { requestURL } from "./ReqUrl";

const AddNewButton = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const onShowPost = () => {
    props.onShowPost(true);
  };

  return (
    <>
      {props.id ? (
        <>
          <div className={` mt-4 ${styles.about}`}>
            <div className={styles.dashIcon}>
              <div className={`mx-3 ${styles.topcell}`}>
                <div
                  className={`${styles.createpostbody}`}
                  onClick={() =>
                    props.insdata.status === "Not Approved"
                      ? null
                      : setShowPopup(true)
                  }
                >
                  <div className={styles.createpositem1}>
                    <img
                      className={styles.insUserProfile}
                      src={
                        props.insdata.photoId === "1"
                          ? "/images/institute-avatar.jpeg"
                          : `${requestURL}/insprofileabout/photo/${props.insdata.insProfilePhoto}`
                      }
                      alt="not found"
                    />
                  </div>
                  <div
                    className={`d-flex flex-column text-left ${styles.desktopCreatepost2}`}
                  >
                    <button>Start a Post</button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={styles.desktopCreatepost}
              onClick={() => setShowPopup(true)}
            >
              <div className="d-flex  gap-2">
                <img src="/images/images-post-icon.svg" alt="not found" />
                <p>Image</p>
              </div>
              <div className="d-flex gap-2">
                <img src="/images/video-post-icon.svg" alt="not found" />
                <p>Video</p>
              </div>
              {/* <div className="d-flex gap-2">
                <img src="/images/video-post-icon.svg" alt="not found" />
                <p>Event</p>
              </div>
              <div className="d-flex gap-2">
                <img src="/images/video-post-icon.svg" alt="not found" />
                <p>Article</p>
              </div> */}
            </div>
          </div>

          <CreatePostSection
            insId={props.id}
            changeShow={(show) => setShowPopup(show)}
            trigger={showPopup}
            setTrigger={setShowPopup}
            onShowPost={onShowPost}
            insdata={props.insdata}
          />
        </>
      ) : (
        <>
          <div className={` mt-4 ${styles.about}`}>
            <div className={styles.dashIcon}>
              <div className={`mx-3 ${styles.topcell}`}>
                <div
                  className={`${styles.createpostbody}`}
                  onClick={() => setShowPopup(true)}
                >
                  <div className={styles.createpositem1}>
                    <img
                      className={styles.insUserProfile}
                      src={
                        props.userData.photoId === "1"
                          ? "/images/image-boy2.png"
                          : `${requestURL}/userprofileabout/photo/${props.userData.profilePhoto}`
                      }
                      alt="not found"
                    />
                  </div>
                  <div
                    className={`d-flex flex-column text-left ${styles.desktopCreatepost2}`}
                  >
                    <button>Start a Post</button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={styles.desktopCreatepost}
              onClick={() => setShowPopup(true)}
            >
              <div className="d-flex  gap-2">
                <img src="/images/images-post-icon.svg" alt="not found" />
                <p>Image</p>
              </div>
              <div className="d-flex gap-2">
                <img src="/images/video-post-icon.svg" alt="not found" />
                <p>Video</p>
              </div>
              {/* <div className="d-flex gap-2">
                <img src="/images/video-post-icon.svg" alt="not found" />
                <p>Event</p>
              </div>
              <div className="d-flex gap-2">
                <img src="/images/video-post-icon.svg" alt="not found" />
                <p>Article</p>
              </div> */}
            </div>
          </div>
          {props.parentalData && props.parentalData >= 13 ?
          <CreatePostSectionUser
            userId={props.uid}
            changeShow={(show) => setShowPopup(show)}
            trigger={showPopup}
            setTrigger={setShowPopup}
            onShowPost={onShowPost}
            userData={props.userData}
          />
          : ''}
        </>
      )}
    </>
  );
};

export default AddNewButton;
