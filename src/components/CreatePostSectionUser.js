import React, { useState } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import { requestURL } from "./ReqUrl";
import axios from "axios";

const CreatePostSectionUser = (props) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const [userCreateInsPost, setUserCreateInsPost] = useState("");
  const [userPostStatus, setUserPostStatus] = useState("");
  const navigate = useNavigate();

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const videoChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedVideo(e.target.files[0]);
    }
  };

  const [userPostData, setUserPostData] = useState({
    userCreateInsPost: "",
    userPostStatus: "",
  });

  const userPostDataHandler = (e) => {
    const { name, value } = e.target;
    setUserPostData({
      ...userPostData,
      [name]: value,
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    if (selectedVideo) {
      const myform = document.getElementById("myForm");
      const formData = new FormData(myform);
      axios
        .post(
          `${requestURL}/userdashboard/${props.userId}/user-post/video`,
          formData
        )
        .then((res) => {
          if (res.data.message) {
            props.changeShow(false);
            props.onShowPost(true);
            setSelectedVideo("");
            navigate(`/userdashboard/${props.userId}`);
          }
        })
        .catch((e) => {
          console.log("Something Went Wrong");
        });
    } else if (selectedImage) {
      const myform = document.getElementById("myForm");
      const formData = new FormData(myform);
      axios
        .post(
          `${requestURL}/userdashboard/${props.userId}/user-post/image`,
          formData
        )
        .then((res) => {
          if (res.data.message) {
            props.changeShow(false);
            props.onShowPost(true);
            setSelectedImage("");
            navigate(`/userdashboard/${props.userId}`);
          }
        })
        .catch((e) => {
          console.log("Something Went Wrong");
        });
    } else {
      // console.log("This is value : ", userCreateInsPost);
      axios
        .post(
          `${requestURL}/userdashboard/${props.userId}/user-post`,
          userPostData
        )
        .then((res) => {
          if (res.data.message) {
            props.changeShow(false);
            props.onShowPost(true);
            navigate(`/userdashboard/${props.userId}`);
          }
        })
        .catch((e) => {
          console.log("Something Went Wrong");
        });
    }
  };
  return props.trigger ? (
    <>
      <div className={`${styles.popupbg}`}>
        <div className={`${styles.createpostContainer}`}>
          <div className={styles.createpostheader}>
            <h4>Create Post</h4>
            <img
              onClick={() => props.changeShow(false) && setSelectedImage()}
              src="/images/close.png"
              alt="not found"
            />
          </div>
          <hr />
          <form onSubmit={formSubmitHandler} id="myForm">
            <div className={styles.createpostbody2}>
              <div className={styles.createpostbody2top}>
                <img
                  src={
                    props.userData.photoId === "1"
                      ? "/images/image-boy2.png"
                      : `${requestURL}/userprofileabout/photo/${props.userData.profilePhoto}`
                  }
                  // src="/images/image-boy2.png"
                  alt="Avatar"
                />
                <div className={styles.createpostitem2}>
                  <h5>{props.userData.userLegalName}</h5>
                  <select
                    className="mt-1"
                    name="userPostStatus"
                    id="visibility"
                    onChange={userPostDataHandler}
                  >
                    <option value="Anyone">Anyone</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.createpostbody2top2}>
              <p className={styles.dashIcons}>
                <textarea
                  className={styles.postTextarea}
                  rows="4"
                  type="text"
                  name="userCreateInsPost"
                  onChange={userPostDataHandler}
                  placeholder="What are you want to talk about?..."
                />
              </p>
            </div>
            {selectedImage && (
              <div className={styles.previewImage}>
                <img src={URL.createObjectURL(selectedImage)} alt="Avatar" />
              </div>
            )}
            <div className="d-flex justify-content-center">
              <div className={styles.createpostfooter}>
                <div className={styles.createpostfooter1}>
                  <label htmlFor="img" style={{ cursor: "pointer" }}>
                    <img src="/images/images-post-icon.svg" alt="Avatar" />
                  </label>
                  <input
                    className={styles.upload}
                    id="img"
                    name="file"
                    onChange={imageChange}
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                  />

                  <label htmlFor="video" style={{ cursor: "pointer" }}>
                    <img src="/images/video-post-icon.svg" alt="vatar" />
                  </label>
                  <input
                    className={styles.upload}
                    id="video"
                    onChange={videoChange}
                    name="file"
                    type="file"
                    accept="video/mp4,video/x-m4v,video/*"
                  />
                </div>

                <div
                  className={styles.createpostfooter2}
                  style={{ cursor: "pointer" }}
                >
                  <p>
                    <button
                      type="submit"
                      style={{ border: "none", backgroundColor: "#cdd3da" }}
                    >
                      Post
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export default CreatePostSectionUser;
