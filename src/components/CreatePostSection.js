import React, { useState } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import { requestURL } from "./ReqUrl";
import axios from "axios";

const CreatePostSection = (props) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const [userCreateInsPost, setUserCreateInsPost] = useState("");
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

  const [insPostData, setInsPostData] = useState({
    CreateInsPost: "",
    CreatePostStatus: "",
  });

  const InsPostDataHandler = (e) => {
    const { name, value } = e.target;
    setInsPostData({
      ...insPostData,
      [name]: value,
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (selectedVideo) {
      const myform = document.getElementById("myForm");
      const formData = new FormData(myform);
      axios
        .post(
          `${requestURL}/insdashboard/${props.insId}/ins-post/video`,
          formData
        )
        .then((res) => {
          if (res.data.message) {
            props.changeShow(false);
            props.onShowPost(true);
            setSelectedVideo("");
            navigate(`/insdashboard/${props.insId}`);
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
          `${requestURL}/insdashboard/${props.insId}/ins-post/image`,
          formData
        )
        .then((res) => {
          if (res.data.message) {
            props.changeShow(false);
            props.onShowPost(true);
            setSelectedImage("");
            navigate(`/insdashboard/${props.insId}`);
          }
        })
        .catch((e) => {
          console.log("Something Went Wrong");
        });
    } else {
      console.log("This is value : ", userCreateInsPost);
      axios
        .post(`${requestURL}/insdashboard/${props.insId}/ins-post`, insPostData)
        .then((res) => {
          if (res.data.message) {
            props.changeShow(false);
            props.onShowPost(true);
            navigate(`/insdashboard/${props.insId}`);
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
                  // src="/images/image-boy2.png"
                  src={
                    props.insdata.photoId === "1"
                      ? "/images/institute-avatar.jpeg"
                      : `${requestURL}/insprofileabout/photo/${props.insdata.profilePhoto}`
                  }
                  alt="Avatar"
                />
                <div className={styles.createpostitem2}>
                  <h5>{props.insdata.insName}</h5>
                  <select
                    className="mt-1"
                    name="CreatePostStatus"
                    id="visibility"
                    onChange={InsPostDataHandler}
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
                  name="CreateInsPost"
                  onChange={InsPostDataHandler}
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

export default CreatePostSection;
